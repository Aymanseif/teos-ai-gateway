"""Native Admin window: backend selection and helper process lifecycle."""

import sys
from pathlib import Path
from unittest.mock import MagicMock, patch

from free_claude_code.cli import desktop_window

ADMIN_URL = "http://127.0.0.1:8082/admin"


def test_window_helper_command_uses_the_running_interpreter() -> None:
    command = desktop_window.window_helper_command(ADMIN_URL)

    assert command[0] == sys.executable
    assert command[1:3] == ["-m", "free_claude_code.cli.desktop_window"]
    assert command[3:] == ["--url", ADMIN_URL]


def test_parse_url_requires_the_flag_and_a_value() -> None:
    assert desktop_window._parse_url(["--url", ADMIN_URL]) == ADMIN_URL
    assert desktop_window._parse_url(["--url", "   "]) is None
    assert desktop_window._parse_url([ADMIN_URL]) is None
    assert desktop_window._parse_url([]) is None


def test_webview_data_dir_lives_under_the_product_config_dir(
    tmp_path: Path,
) -> None:
    with patch.object(desktop_window, "config_dir_path", return_value=tmp_path):
        assert desktop_window.webview_data_dir() == tmp_path / "webview"


def test_edge_executable_returns_none_off_windows() -> None:
    with patch.object(desktop_window.sys, "platform", "linux"):
        assert desktop_window.edge_executable() is None


def test_open_admin_ui_prefers_the_native_window() -> None:
    with (
        patch.object(desktop_window, "native_window_supported", return_value=True),
        patch.object(desktop_window, "_spawn", return_value=True) as spawn,
        patch.object(desktop_window, "open_edge_app_window") as edge,
        patch.object(desktop_window.webbrowser, "open") as browser,
    ):
        assert desktop_window.open_admin_ui(ADMIN_URL) is True

    spawn.assert_called_once_with(desktop_window.window_helper_command(ADMIN_URL))
    edge.assert_not_called()
    browser.assert_not_called()


def test_open_admin_ui_uses_edge_when_pywebview_is_missing() -> None:
    with (
        patch.object(desktop_window, "native_window_supported", return_value=False),
        patch.object(desktop_window, "_spawn") as spawn,
        patch.object(desktop_window, "open_edge_app_window", return_value=True) as edge,
        patch.object(desktop_window.webbrowser, "open") as browser,
    ):
        assert desktop_window.open_admin_ui(ADMIN_URL) is True

    spawn.assert_not_called()
    edge.assert_called_once_with(ADMIN_URL)
    browser.assert_not_called()


def test_open_admin_ui_falls_back_to_the_default_browser() -> None:
    with (
        patch.object(desktop_window, "native_window_supported", return_value=False),
        patch.object(desktop_window, "open_edge_app_window", return_value=False),
        patch.object(desktop_window.webbrowser, "open", return_value=True) as browser,
    ):
        assert desktop_window.open_admin_ui(ADMIN_URL) is True

    browser.assert_called_once_with(ADMIN_URL)


def test_open_admin_ui_reports_failure_when_nothing_can_open() -> None:
    with (
        patch.object(desktop_window, "native_window_supported", return_value=False),
        patch.object(desktop_window, "open_edge_app_window", return_value=False),
        patch.object(desktop_window.webbrowser, "open", return_value=False),
    ):
        assert desktop_window.open_admin_ui(ADMIN_URL) is False


def test_main_rejects_a_missing_url() -> None:
    assert desktop_window.main([]) == 2


def test_main_reuses_an_existing_window(tmp_path: Path) -> None:
    lock = MagicMock()
    lock.acquire.return_value = False
    with (
        patch.object(desktop_window, "config_dir_path", return_value=tmp_path),
        patch.object(desktop_window, "InterprocessFileLock", return_value=lock),
        patch.object(desktop_window, "_show_window") as show,
    ):
        assert desktop_window.main(["--url", ADMIN_URL]) == 0

    show.assert_not_called()
    lock.release.assert_not_called()


def test_main_shows_the_window_and_releases_the_lock(tmp_path: Path) -> None:
    lock = MagicMock()
    lock.acquire.return_value = True
    with (
        patch.object(desktop_window, "config_dir_path", return_value=tmp_path),
        patch.object(desktop_window, "InterprocessFileLock", return_value=lock),
        patch.object(desktop_window, "_show_window", return_value=0) as show,
    ):
        assert desktop_window.main(["--url", ADMIN_URL]) == 0

    show.assert_called_once_with(ADMIN_URL)
    lock.release.assert_called_once_with()


def test_main_falls_back_to_edge_when_the_native_window_fails(
    tmp_path: Path,
) -> None:
    lock = MagicMock()
    lock.acquire.return_value = True
    with (
        patch.object(desktop_window, "config_dir_path", return_value=tmp_path),
        patch.object(desktop_window, "InterprocessFileLock", return_value=lock),
        patch.object(desktop_window, "_run_webview_window", return_value=False),
        patch.object(desktop_window, "open_edge_app_window", return_value=True) as edge,
    ):
        assert desktop_window.main(["--url", ADMIN_URL]) == 0

    edge.assert_called_once_with(ADMIN_URL)
    lock.release.assert_called_once_with()


def test_show_window_reports_success_even_when_only_the_browser_opens() -> None:
    with (
        patch.object(desktop_window, "_run_webview_window", return_value=False),
        patch.object(desktop_window, "open_edge_app_window", return_value=False),
        patch.object(desktop_window.webbrowser, "open", return_value=True),
    ):
        assert desktop_window._show_window(ADMIN_URL) == 0


def test_run_webview_window_is_false_without_pywebview() -> None:
    real_import = __import__

    def fake_import(name: str, *args: object, **kwargs: object) -> object:
        if name == "webview":
            raise ImportError("pywebview is not installed")
        return real_import(name, *args, **kwargs)

    with patch("builtins.__import__", side_effect=fake_import):
        assert desktop_window._run_webview_window(ADMIN_URL) is False
