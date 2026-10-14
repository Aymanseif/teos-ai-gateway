<#
.SYNOPSIS
    Offline Windows installer for TEOS AI Gateway.

.DESCRIPTION
    Installs TEOS AI Gateway from the wheel bundled with this package, using uv.
    Disables the upstream (Free Claude Code) auto-update mechanism so this build
    is never silently replaced by an upstream release, adds a `teos`
    command, and creates Desktop / Start Menu shortcuts.

    TEOS AI Gateway is a modified version of Free Claude Code (AGPL-3.0-only).
    See NOTICE.md and LICENSE in this bundle.

.PARAMETER Startup
    Also create a shortcut in the user's Startup folder (launch at sign-in).

.PARAMETER NoShortcuts
    Do not create Desktop / Start Menu / Startup shortcuts.

.PARAMETER KeepUpdater
    Do NOT disable the upstream auto-update command (not recommended).

.PARAMETER DryRun
    Print the planned actions without changing the machine.

.EXAMPLE
    powershell -ExecutionPolicy Bypass -File .\Install-TEOS-AI-Gateway.ps1
#>
#Requires -Version 5.1
[CmdletBinding()]
param(
    [switch] $Startup,
    [switch] $NoShortcuts,
    [switch] $KeepUpdater,
    [switch] $DryRun,
    [switch] $Help
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

# The internal distribution name is the upstream AGPL package name and is
# intentionally NOT renamed (see NOTICE.md). The product name is TEOS AI Gateway.
$ToolName = "free-claude-code"
$ProductName = "TEOS AI Gateway"
$PythonRequest = "cpython-3.14.7-windows-x86_64-none"
$UvInstallUrl = "https://astral.sh/uv/install.ps1"

function Write-Step { param([string] $Message) Write-Host "==> $Message" -ForegroundColor Cyan }
function Write-Ok { param([string] $Message) Write-Host "    $Message" -ForegroundColor Green }
function Write-Warn { param([string] $Message) Write-Host "    $Message" -ForegroundColor Yellow }
function Write-Plain { param([string] $Message) Write-Host "    $Message" }

function Show-Usage {
    Write-Host @"
$ProductName - offline Windows installer

Usage:
  powershell -ExecutionPolicy Bypass -File .\Install-TEOS-AI-Gateway.ps1 [options]

Options:
  -Startup        Also launch $ProductName at sign-in
  -NoShortcuts    Skip Desktop / Start Menu / Startup shortcuts
  -KeepUpdater    Do not disable the upstream auto-update command
  -DryRun         Show what would happen, change nothing
  -Help           Show this text
"@
}

if ($Help) {
    Show-Usage
    return
}

if ($env:OS -ne "Windows_NT") {
    throw "$ProductName supports Windows only."
}

$BundleRoot = $PSScriptRoot
$DistDir = Join-Path $BundleRoot "dist"
$IconPath = Join-Path $BundleRoot "app-icon.ico"

Write-Host ""
Write-Host "  $ProductName - offline installer" -ForegroundColor White
Write-Host "  ============================================================" -ForegroundColor DarkGray
Write-Host "  Modified version of Free Claude Code (AGPL-3.0-only)." -ForegroundColor DarkGray
Write-Host ""

# --- 1. Locate the bundled package -----------------------------------------
Write-Step "Locating bundled package"
$wheel = Get-ChildItem -LiteralPath $DistDir -Filter *.whl -ErrorAction SilentlyContinue |
    Select-Object -First 1
if (-not $wheel) {
    throw "No wheel found in $DistDir. This bundle is incomplete."
}
Write-Ok "Wheel: $($wheel.Name)"

# --- 2. Ensure uv ----------------------------------------------------------
Write-Step "Checking for uv"
$uvCommand = Get-Command uv -ErrorAction SilentlyContinue
if (-not $uvCommand) {
    Write-Warn "uv not found on PATH."
    if ($DryRun) {
        Write-Plain "Would install uv from $UvInstallUrl"
    }
    else {
        Write-Plain "Installing uv from $UvInstallUrl ..."
        Invoke-RestMethod $UvInstallUrl | Invoke-Expression
        $env:Path = "$env:USERPROFILE\.local\bin;$env:Path"
        $uvCommand = Get-Command uv -ErrorAction SilentlyContinue
    }
}
if (-not $uvCommand) {
    throw "uv is required. Install it from https://docs.astral.sh/uv/ and re-run."
}
$uvExe = $uvCommand.Source
Write-Ok "uv: $uvExe"

# --- 3. Install the tool ---------------------------------------------------
Write-Step "Installing $ProductName"
$uvArgs = @("tool", "install", "--force", "--python", $PythonRequest, $wheel.FullName)
if ($DryRun) {
    Write-Plain "uv $($uvArgs -join ' ')"
}
else {
    & $uvExe @uvArgs
    if ($LASTEXITCODE -ne 0) {
        throw "uv tool install failed (exit $LASTEXITCODE). Quit $ProductName from the tray and retry."
    }
}

# --- 4. Resolve install locations -----------------------------------------
$toolsBase = (& $uvExe tool dir).Trim()
$binDir = (& $uvExe tool dir --bin).Trim()
if (-not (Test-Path -LiteralPath $binDir)) {
    $binDir = Join-Path $env:USERPROFILE ".local\bin"
}
$toolScripts = Join-Path $toolsBase "$ToolName\Scripts"
Write-Ok "Tool dir: $toolScripts"
Write-Ok "Command dir: $binDir"

$desktopExe = Join-Path $binDir "fcc-desktop.exe"
$serverExe = Join-Path $binDir "fcc-server.exe"

# --- 5. Disable the upstream auto-updater ----------------------------------
if (-not $KeepUpdater) {
    Write-Step "Disabling upstream auto-update"
    $updateStubCmd = @"
@echo off
echo ${ProductName}: upstream auto-update is disabled.
echo Reinstall the latest $ProductName bundle to update.
exit /b 0
"@
    $updateStubSh = @"
#!/bin/sh
echo "${ProductName}: upstream auto-update is disabled. Reinstall the latest bundle to update."
exit 0
"@
    $updateTargets = @(
        (Join-Path $binDir "fcc-update"),
        (Join-Path $binDir "fcc-update.cmd"),
        (Join-Path $toolScripts "fcc-update"),
        (Join-Path $toolScripts "fcc-update.cmd")
    )
    if ($DryRun) {
        foreach ($target in $updateTargets) { Write-Plain "stub: $target" }
    }
    else {
        foreach ($target in $updateTargets) {
            $parent = Split-Path -Parent $target
            if (-not (Test-Path -LiteralPath $parent)) { continue }
            if ($target.EndsWith(".cmd")) {
                Set-Content -LiteralPath $target -Value $updateStubCmd -Encoding ASCII
            }
            else {
                Set-Content -LiteralPath $target -Value $updateStubSh -Encoding ASCII
            }
        }
        Write-Ok "Upstream auto-update disabled (fcc-update is a no-op)."
    }
}

# --- 6. Add the `teos` command ---------------------------------------
Write-Step "Adding the 'teos' command"
$shims = @{
    "teos.cmd" = "@echo off`r`n`"%~dp0fcc-desktop.exe`" %*`r`n"
    "teos-server.cmd" = "@echo off`r`n`"%~dp0fcc-server.exe`" %*`r`n"
}
if ($DryRun) {
    foreach ($name in $shims.Keys) { Write-Plain "write: $(Join-Path $binDir $name)" }
}
else {
    foreach ($name in $shims.Keys) {
        Set-Content -LiteralPath (Join-Path $binDir $name) -Value $shims[$name] -Encoding ASCII
    }
    Write-Ok "Commands: teos, teos-server"
}

# --- 7. Shortcuts ----------------------------------------------------------
if (-not $NoShortcuts) {
    Write-Step "Creating shortcuts"
    $shell = New-Object -ComObject WScript.Shell
    $shortcutDefs = @(
        @{ Path = (Join-Path $env:USERPROFILE "Desktop\$ProductName.lnk"); Target = $desktopExe }
    )
    $startMenuDir = Join-Path $env:APPDATA "Microsoft\Windows\Start Menu\Programs"
    $shortcutDefs += @{ Path = (Join-Path $startMenuDir "$ProductName.lnk"); Target = $desktopExe }
    if ($Startup) {
        $startupDir = Join-Path $env:APPDATA "Microsoft\Windows\Start Menu\Programs\Startup"
        $shortcutDefs += @{ Path = (Join-Path $startupDir "$ProductName.lnk"); Target = $desktopExe }
    }
    foreach ($def in $shortcutDefs) {
        if ($DryRun) {
            Write-Plain "shortcut: $($def.Path) -> $($def.Target)"
            continue
        }
        New-Item -ItemType Directory -Force -Path (Split-Path -Parent $def.Path) | Out-Null
        $shortcut = $shell.CreateShortcut($def.Path)
        $shortcut.TargetPath = $def.Target
        $shortcut.WorkingDirectory = $env:USERPROFILE
        if (Test-Path -LiteralPath $IconPath) {
            $shortcut.IconLocation = "$IconPath,0"
        }
        $shortcut.Description = "$ProductName - local AI proxy"
        $shortcut.Save()
        Write-Ok $def.Path
    }
}

# --- 8. Summary ------------------------------------------------------------
Write-Host ""
Write-Step "Done"
Write-Plain "Launch $ProductName from the Desktop shortcut, or run: teos"
Write-Plain "The Admin UI opens automatically; add your provider API keys there."
Write-Host ""
Write-Host "  License: AGPL-3.0-only (see LICENSE and NOTICE.md in this bundle)." -ForegroundColor DarkGray
Write-Host "  This is a modified version of Free Claude Code by Ali Khokhar." -ForegroundColor DarkGray
Write-Host ""
