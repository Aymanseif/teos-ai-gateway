# TEOS AI Gateway - Modifications

This project is a **modified version** of
[Free Claude Code](https://github.com/Alishahryar1/free-claude-code),
Copyright (c) 2026 Ali Khokhar, licensed under **AGPL-3.0-only**.

TEOS AI Gateway is an independent project. It is **not affiliated with, endorsed by,
or sponsored by** Anthropic, nor by the authors of Free Claude Code. "Claude" is a
trademark of Anthropic.

## Modifications made by TEOS

- Rebranded the user-visible surface to **TEOS AI Gateway** (Admin UI, desktop tray,
  the `--version` banner, and coding-agent provider names).
- Renamed the installed commands from the upstream `fcc-*` names to `teos-*` (`teos`,
  `teos-server`, `teos-doctor`, `teos-claude`, `teos-codex`, ...). The Python package,
  distribution name and `~/.fcc` data directory are unchanged.
- Added an offline Windows bundle and installer (`packaging/`).
- Disabled the bundled auto-update command (`teos-update` is a no-op) so this build is
  not silently replaced by an upstream release.
- Carried provider-routing, retry-budget, model-fallback, and crash-recovery hardening.
- Added a native Admin UI window (`teos-desktop` opens the Admin UI in a WebView2 window
  via pywebview, falling back to Microsoft Edge in application mode, then to the default
  browser).
- Added a second, standalone desktop application ("TEOS - بوابة المحروسة", built with
  Tauri 2 + Rust + SvelteKit) that shows live Gateway status. Its localhost HTTP calls
  are issued from the Rust side (`reqwest`) rather than from the webview, because the
  Gateway's Admin API answers `{"detail":"Admin UI is local-only"}` to any request that
  carries an `Origin` header. All numbers it displays are read from the Gateway at
  runtime; none are hardcoded. The pywebview window above remains available as a
  fallback.
- Made the TEOS Desktop (Tauri) shell the preferred window: the Admin UI launcher first
  looks for the installed shell and opens it, and only then falls back to the pywebview
  window, Edge in application mode, and finally the default browser. The offline installer
  bundles the shell's per-user NSIS installer under `desktop\` and runs it silently after
  installing the wheel (`-SkipDesktopShell` opts out).

Date of modification: 2026-10-16 (Tauri desktop application added 2026-10-17; the native
window became the primary window and was bundled in the offline package 2026-10-17).

## Hardening your `.fcc` directory (Windows)

Your provider API keys are stored in plaintext in `%USERPROFILE%\.fcc\.env`. By
default that folder inherits the permissions of your user profile, which is usually
fine on a single-user machine, but it is worth tightening - and worth checking - on a
shared or multi-account PC.

To see the current permissions:

```powershell
icacls "$env:USERPROFILE\.fcc"
```

To restrict the folder to your account only, while keeping your own access intact:

```powershell
$me = "$env:USERDOMAIN\$env:USERNAME"
icacls "$env:USERPROFILE\.fcc" /inheritance:r
icacls "$env:USERPROFILE\.fcc" /grant:r "${me}:(OI)(CI)F"
icacls "$env:USERPROFILE\.fcc\.env" /inheritance:r
icacls "$env:USERPROFILE\.fcc\.env" /grant:r "${me}:F"
```

Two details matter here:

- `${me}` needs the braces. In `"$env:USERNAME:(OI)(CI)F"` PowerShell reads the
  variable name as `USERNAME:` and splices a malformed value, and `icacls` then fails.
- `/inheritance:r` removes the inherited entries; the `/grant:r` lines replace them
  with a single grant for your account. Using `/inheritance:d` instead only converts
  the inherited entries to explicit ones and leaves other accounts with access, so it
  does not actually restrict anything.

If you ever need to undo this, reset the folder and restore inheritance:

```powershell
icacls "$env:USERPROFILE\.fcc" /reset /T
icacls "$env:USERPROFILE\.fcc" /inheritance:e
```

Do not commit or sync `.fcc` to git or to a shared/cloud folder: it holds credentials
in plaintext.

## Planned (not yet implemented)

The following are planned and are **not** part of this build yet:

- Subscription and usage-credit (points) architecture.
- Multi-user accounts and quota management.
- Payment processing.
- Arabic user interface for the main Admin UI (the separate Tauri desktop shell is
  already Arabic).

## License

This project remains licensed under **AGPL-3.0-only** (see `LICENSE`). The LICENSE
text is unchanged; line 1 only notes the TEOS modification. The complete Corresponding
Source is shipped with every distribution (bundle `source/`).
