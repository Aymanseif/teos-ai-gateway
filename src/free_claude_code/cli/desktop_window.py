"""Native window host for the TEOS Admin UI.

The desktop shell keeps its tray loop on the main thread, so a WebView2 window
cannot live in that same process: pywebview wants the main thread for its own
event loop. This module therefore hosts the window in a small detached helper
process. That separation also means a window that fails to appear can never take
the tray, or the running server, down with it.

Windows are opened in this order, best first:

1. The installed TEOS Desktop shell (Tauri) - the pharaonic dashboard.
2. pywebview over the Edge WebView2 runtime - a real native window.
3. Microsoft Edge in application mode - a chromeless window.
4. The default browser - always available.
"""

import importlib.util
import os
import shutil
import subprocess
import sys
import threading
import webbrowser
from collections.abc import Sequence
from pathlib import Path

from loguru import logger

from free_claude_code.config.paths import config_dir_path
from free_claude_code.core.interprocess_lock import InterprocessFileLock

WINDOW_TITLE = "TEOS AI Gateway"
WINDOW_WIDTH = 1280
WINDOW_HEIGHT = 860
WINDOW_MIN_SIZE = (900, 600)

_WINDOW_LOCK_FILENAME = "desktop-window.lock"
_WEBVIEW_DATA_DIRNAME = "webview"
_HELPER_MODULE = "free_claude_code.cli.desktop_window"
_USAGE = "usage: python -m free_claude_code.cli.desktop_window --url URL\n"

_EDGE_LOCATIONS = (
    ("ProgramFiles(x86)", r"Microsoft\Edge\Application\msedge.exe"),
    ("ProgramFiles", r"Microsoft\Edge\Application\msedge.exe"),
    ("LOCALAPPDATA", r"Microsoft\Edge\Application\msedge.exe"),
)

# The NSIS installer ships the Tauri shell for the current user by default, so
# the binary lands beneath %LOCALAPPDATA%. The per-machine folders are checked
# too, in case a build is later configured for an all-users install.
_DESKTOP_EXE_NAME = "teos-pharaonic-desktop.exe"
_DESKTOP_LOCATIONS = (
    ("LOCALAPPDATA", rf"TEOS Desktop\{_DESKTOP_EXE_NAME}"),
    ("ProgramFiles", rf"TEOS Desktop\{_DESKTOP_EXE_NAME}"),
    ("ProgramFiles(x86)", rf"TEOS Desktop\{_DESKTOP_EXE_NAME}"),
)


def webview_data_dir() -> Path:
    """Return the stable WebView2 profile folder owned by the product."""

    return config_dir_path() / _WEBVIEW_DATA_DIRNAME


def native_window_supported() -> bool:
    """Report whether the optional native window backend can be imported."""

    try:
        return importlib.util.find_spec("webview") is not None
    except ImportError, ValueError:
        return False


def edge_executable() -> Path | None:
    """Locate Microsoft Edge, the browser shipping the WebView2 engine."""

    if sys.platform != "win32":
        return None
    for variable, relative in _EDGE_LOCATIONS:
        base = os.environ.get(variable)
        if not base:
            continue
        candidate = Path(base) / relative
        if candidate.is_file():
            return candidate
    found = shutil.which("msedge")
    return None if found is None else Path(found)


def tauri_desktop_executable() -> Path | None:
    """Locate the installed TEOS Desktop shell, if this machine has one.

    The Tauri dashboard talks to the same Gateway the browser window would, so
    it is preferred when present. Nothing needs to be passed to it: the shell
    already targets the local admin API on its own.
    """

    if sys.platform != "win32":
        return None
    override = os.environ.get("TEOS_DESKTOP_EXE")
    if override:
        candidate = Path(override)
        if candidate.is_file():
            return candidate
    for variable, relative in _DESKTOP_LOCATIONS:
        base = os.environ.get(variable)
        if not base:
            continue
        candidate = Path(base) / relative
        if candidate.is_file():
            return candidate
    found = shutil.which(_DESKTOP_EXE_NAME)
    return None if found is None else Path(found)


def window_helper_command(url: str) -> list[str]:
    """Build the detached command that hosts one native window."""

    return [sys.executable, "-m", _HELPER_MODULE, "--url", url]


def _creation_flags() -> int:
    """Keep a helper windowless even when launched from a console command."""

    return getattr(subprocess, "CREATE_NO_WINDOW", 0)


def _spawn(command: Sequence[str]) -> bool:
    """Start a detached helper, reporting whether the OS accepted it."""

    try:
        subprocess.Popen(
            list(command),
            stdin=subprocess.DEVNULL,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            creationflags=_creation_flags(),
        )
    except OSError as exc:
        logger.debug("Could not start {}: {}", command[0], exc)
        return False
    return True


def open_edge_app_window(url: str) -> bool:
    """Open the Admin UI in a chromeless Edge application window."""

    executable = edge_executable()
    if executable is None:
        return False
    return _spawn(
        [
            str(executable),
            f"--app={url}",
            f"--window-size={WINDOW_WIDTH},{WINDOW_HEIGHT}",
            "--no-first-run",
        ]
    )


def open_admin_ui(url: str) -> bool:
    """Open the Admin UI in the best window this machine can provide."""

    desktop = tauri_desktop_executable()
    if desktop is not None and _spawn([str(desktop)]):
        return True
    if native_window_supported() and _spawn(window_helper_command(url)):
        return True
    if open_edge_app_window(url):
        return True
    try:
        return bool(webbrowser.open(url))
    except Exception as exc:
        logger.warning("Could not open the Admin UI at {}: {}", url, exc)
        return False


def _parse_url(arguments: Sequence[str]) -> str | None:
    args = list(arguments)
    if len(args) == 2 and args[0] == "--url":
        url = args[1].strip()
        if url:
            return url
    return None


def _run_webview_window(url: str) -> bool:
    """Show the Admin UI in a native WebView2 window.

    Returns ``False`` when pywebview is missing, its profile cannot be prepared,
    or the window never became visible, so the caller can fall back to Edge.
    """

    try:
        import webview
    except Exception as exc:
        logger.debug("pywebview is unavailable: {}", exc)
        return False

    data_dir = webview_data_dir()
    try:
        data_dir.mkdir(parents=True, exist_ok=True)
    except OSError as exc:
        logger.warning("Could not create the WebView2 data folder: {}", exc)
        return False

    # WebView2 must own a writable profile. Its default location is unreliable
    # for a tool installed beneath a transient or read-only directory.
    os.environ["WEBVIEW2_USER_DATA_FOLDER"] = str(data_dir)

    shown = threading.Event()
    try:
        window = webview.create_window(
            WINDOW_TITLE,
            url,
            width=WINDOW_WIDTH,
            height=WINDOW_HEIGHT,
            min_size=WINDOW_MIN_SIZE,
            text_select=True,
        )
        window.events.shown += shown.set
        webview.start(private_mode=False, storage_path=str(data_dir))
    except Exception as exc:
        logger.warning("The native window could not start: {}", exc)
        return False
    return shown.is_set()


def _show_window(url: str) -> int:
    """Open a window with the best backend available; return an exit code."""

    if _run_webview_window(url):
        return 0
    if open_edge_app_window(url):
        return 0
    try:
        return 0 if webbrowser.open(url) else 1
    except Exception as exc:
        logger.warning("Could not open the Admin UI at {}: {}", url, exc)
        return 1


def main(argv: Sequence[str] | None = None) -> int:
    """Host one Admin UI window and return the helper process exit code."""

    url = _parse_url(sys.argv[1:] if argv is None else argv)
    if url is None:
        sys.stderr.write(_USAGE)
        return 2

    lock = InterprocessFileLock(config_dir_path() / _WINDOW_LOCK_FILENAME)
    try:
        acquired = lock.acquire()
    except OSError as exc:
        logger.debug("Desktop window lock unavailable: {}", exc)
        acquired = True
    if not acquired:
        # A window is already open for this user; reuse it rather than stacking
        # a second copy of the Admin UI on top of it.
        return 0
    try:
        return _show_window(url)
    finally:
        lock.release()


if __name__ == "__main__":
    raise SystemExit(main())
