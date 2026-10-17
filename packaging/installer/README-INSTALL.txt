TEOS AI Gateway - Windows Installation
===================================

TEOS AI Gateway is a local AI proxy that connects coding agents (Claude Code, Codex,
OpenCode, Cline, and others) to OpenAI-compatible AI providers.

It is a modified version of Free Claude Code (AGPL-3.0-only). See NOTICE.md and LICENSE.


REQUIREMENTS
------------
- Windows 10 or 11 (x64)
- Internet connection for the first install (downloads uv, Python 3.14.7 and
  Python dependencies). The application itself installs from the wheel in this
  bundle - it does NOT fetch the app from the internet.


INSTALL
-------
1. Extract this ZIP somewhere permanent, e.g. C:\TEOS-AI-Gateway\
2. Open PowerShell in that folder.
3. Run:

     powershell -ExecutionPolicy Bypass -File .\Install-TEOS-AI-Gateway.ps1

   Useful options:
     -Startup       Also launch TEOS AI Gateway when you sign in to Windows
     -NoShortcuts   Skip Desktop / Start Menu shortcuts
     -SkipDesktopShell  Do not install the native TEOS Desktop window
     -DryRun        Show what would happen without changing anything

4. When it finishes, launch TEOS AI Gateway from the Desktop shortcut (or run
   `teos` in a terminal). The Admin UI opens automatically.

5. In the Admin UI, paste your provider API key (for example NVIDIA NIM, Groq or
   Mistral) and click Apply.


FIRST RUN
---------
- The server listens on a local port and the Admin UI opens in the native
  "TEOS Desktop" window installed from the desktop\ folder of this bundle. That
  window shows the live status of your local Gateway.
- If the native window cannot start, it falls back to a WebView2 window, then to
  Microsoft Edge in application mode, and then to your default browser.
- Everything runs locally on your machine; only your own provider API calls leave it.
- To start it in the background at logon, re-run the installer with -Startup, or
  copy the Desktop shortcut into:
    %APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup


UPDATING
--------
Automatic updates are disabled on purpose (`teos-update` is a no-op) - the upstream
updater would overwrite this build with the original Free Claude Code release. To
update, obtain a newer TEOS AI Gateway bundle and re-run Install-TEOS-AI-Gateway.ps1.


UPGRADING FROM AN OLDER "FREE CLAUDE CODE" INSTALL
--------------------------------------------------
If an older (upstream) Free Claude Code build is already installed on the machine,
simply run this installer. It replaces that install in place:

- the old `fcc-*` commands are removed and the `teos-*` commands take their place;
- the old "Free Claude Code" Desktop / Start Menu shortcuts are removed and the
  TEOS AI Gateway shortcuts take their place;
- the stale `fcc-update` command is neutralised.

Your provider keys and settings in `%USERPROFILE%\.fcc` are kept. After installing,
verify you are on the TEOS build:

     teos-server --version      ->  TEOS AI Gateway 1.0.0

COMMANDS
--------
    teos            Launch the desktop app / server (opens the Admin UI window)
    teos-server     Run the server in the foreground
    teos-doctor     Print and copy a diagnostics report
    teos-claude     Start Claude Code through TEOS AI Gateway
    teos-codex      Start Codex through TEOS AI Gateway
    teos-opencode   Start OpenCode through TEOS AI Gateway
    (same pattern for teos-cline, teos-hermes, teos-dsh, teos-grok, teos-muse,
     teos-pi and teos-aider)


UNINSTALL
---------
    uv tool uninstall free-claude-code

Then delete the Desktop / Start Menu shortcuts and the folder you extracted.

The native TEOS Desktop window is a separate per-user install. Remove it in
Windows Settings > Apps > "TEOS Desktop", or run:

    %LOCALAPPDATA%\TEOS Desktop\unins000.exe


LICENSE & SOURCE
----------------
AGPL-3.0-only. This is a modified version of Free Claude Code by Ali Khokhar.

The complete Corresponding Source (AGPL-3.0 section 6) for this exact build is
included in this bundle:

    source\TEOS-AI-Gateway-Windows-1.0.0-source.zip

Written offer (AGPL-3.0 section 6): for at least three years we will provide the
Corresponding Source on request at no charge - email support@elmahrosa.org, quoting
the build commit recorded in SOURCE.txt. See NOTICE.md for details.
