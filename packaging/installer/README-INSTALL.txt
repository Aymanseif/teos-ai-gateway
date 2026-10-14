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
     -DryRun        Show what would happen without changing anything

4. When it finishes, launch TEOS AI Gateway from the Desktop shortcut (or run
   `teos` in a terminal). The Admin UI opens automatically.

5. In the Admin UI, paste your provider API key (for example NVIDIA NIM, Groq or
   Mistral) and click Apply.


FIRST RUN
---------
- The server listens on a local port and the Admin UI opens in your browser.
- Everything runs locally on your machine; only your own provider API calls leave it.
- To start it in the background at logon, re-run the installer with -Startup, or
  copy the Desktop shortcut into:
    %APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup


UPDATING
--------
Automatic updates are disabled on purpose (`teos-update` is a no-op) - the upstream
updater would overwrite this build with the original Free Claude Code release. To
update, obtain a newer TEOS AI Gateway bundle and re-run Install-TEOS-AI-Gateway.ps1.

COMMANDS
--------
    teos            Launch the desktop app / server (opens the Admin UI)
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


LICENSE & SOURCE
----------------
AGPL-3.0-only. This is a modified version of Free Claude Code by Ali Khokhar.

The complete Corresponding Source (AGPL-3.0 section 6) for this exact build is
included in this bundle:

    source\TEOS-AI-Gateway-Windows-1.0.0-source.zip

Written offer (AGPL-3.0 section 6b): for at least three years we will provide the
Corresponding Source on request at no charge - email AYMAN@TEOSEGYPT.COM, quoting
the build commit recorded in SOURCE.txt. See NOTICE.md for details.
