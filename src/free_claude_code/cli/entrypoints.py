"""Lightweight entry points for installed Free Claude Code commands."""

import sys
from collections.abc import Sequence

from free_claude_code.core.version import package_version


def serve(argv: Sequence[str] | None = None) -> None:
    """Start the FastAPI server (registered as ``teos-server``)."""
    if _print_version_if_requested(argv):
        return

    # Keep the server composition root off metadata-only command paths.
    from free_claude_code.cli.commands import serve as run_server

    run_server()


def _print_version_if_requested(argv: Sequence[str] | None) -> bool:
    args = sys.argv[1:] if argv is None else argv
    if "--version" not in args:
        return False
    print(f"TEOS AI Gateway {package_version()}")
    return True


def doctor(argv: Sequence[str] | None = None) -> None:
    """Print and copy a local diagnostic report (registered as ``teos-doctor``)."""
    if _print_version_if_requested(argv):
        return
    from free_claude_code.cli.doctor import main

    main(argv)


def teos(argv: Sequence[str] | None = None) -> None:
    """Umbrella: ``teos <command>`` -> dispatch to the matching ``teos-*`` script."""
    import sys
    from importlib.metadata import entry_points

    args = list(sys.argv[1:] if argv is None else argv)
    table = {
        ep.name[len("teos-"):]: ep
        for group in ("console_scripts", "gui_scripts")
        for ep in entry_points(group=group)
        if ep.name.startswith("teos-")
    }

    if not args or args[0] in ("-h", "--help", "help"):
        print("TEOS AI Gateway\n")
        print("Usage: teos <command> [args]\n")
        print("Commands: " + ", ".join(sorted(table)))
        return

    name, rest = args[0], args[1:]
    ep = table.get(name)
    if ep is None:
        print(f"teos: unknown command '{name}'")
        print("Available: " + ", ".join(sorted(table)))
        sys.exit(2)

    ep.load()(rest)  # every teos-* target takes argv
