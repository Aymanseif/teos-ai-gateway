<#
.SYNOPSIS
    Builds the TEOS AI Gateway offline Windows distribution bundle.

.DESCRIPTION
    Builds a wheel from the (rebranded) free-claude-code checkout, then assembles
    a self-contained ZIP containing:
      - Install-TEOS-AI-Gateway.ps1   (offline installer)
      - dist\<wheel>
      - SOURCE.txt (Corresponding Source notice / AGPL-3.0 section 6)
      - LICENSE (AGPL-3.0-only, verbatim)
      - NOTICE.md (modification notice, AGPL-3.0 section 5a)
      - README-INSTALL.txt
      - app-icon.ico
      - desktop\TEOS Desktop_1.1.0_x64-setup.exe
            The native TEOS Desktop shell (Tauri), installed silently by
            Install-TEOS-AI-Gateway.ps1 unless -SkipDesktopShell is used.

    Pass -IncludeSource to bundle the full Corresponding Source inside this ZIP
    (dist\<sdist> plus source\<name>-source.zip). That is the correct mode now
    that the source repository is private: the source travels inside the paid
    ZIP (AGPL-3.0 section 6), backed by a written offer.
    Without -IncludeSource the bundle relies on the written offer alone and
    SOURCE.txt points at a repository buyers cannot reach - do not ship that.

.PARAMETER RepoPath
    Path to the free-claude-code checkout to build from.
    Default: ..\free-claude-code relative to this script.

.PARAMETER Version
    Product version stamped into the build (default 1.1.0). This overrides the
    git-derived development version so the sold product has a clean version.

.PARAMETER OutDir
    Output directory. Default: .\dist next to this script.

.PARAMETER SkipBuild
    Reuse an existing build\ directory instead of rebuilding.

.PARAMETER IncludeSource
    Also bundle the sdist and the full source ZIP inside the package. Without it
    the ZIP carries no Corresponding Source and only the written offer applies.

.PARAMETER DesktopInstaller
    Path to the TEOS Desktop (Tauri) NSIS setup.exe to bundle under desktop\.
    By default it is discovered next to the sibling teos-pharaonic-desktop
    build output; pass it explicitly when the shell was built elsewhere.

.EXAMPLE
    powershell -ExecutionPolicy Bypass -File .\Build-OfflineBundle.ps1 -Version 1.1.0
#>
[CmdletBinding()]
param(
    [string] $RepoPath,
    [string] $Version = "1.1.0",
    [string] $OutDir,
    [switch] $SkipBuild,
    [switch] $IncludeSource,
    [string] $SupportEmail = "support@teos.elmahrosa.org",
    [string] $DesktopInstaller
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

if (-not $RepoPath) {
    $candidate = Split-Path -Parent $PSScriptRoot
    if (Test-Path -LiteralPath (Join-Path $candidate "pyproject.toml")) {
        $RepoPath = $candidate
    }
    else {
        $RepoPath = Join-Path $candidate "free-claude-code"
    }
}
if (-not $OutDir) { $OutDir = Join-Path $PSScriptRoot "dist" }

function Write-Step { param([string] $Message) Write-Host "==> $Message" -ForegroundColor Cyan }
function Write-Ok { param([string] $Message) Write-Host "    $Message" -ForegroundColor Green }
function Write-Warn { param([string] $Message) Write-Host "    $Message" -ForegroundColor Yellow }

$ProductSlug = "TEOS-AI-Gateway-Windows"
$InstallerDir = Join-Path $PSScriptRoot "installer"

if (-not (Test-Path -LiteralPath (Join-Path $RepoPath "pyproject.toml"))) {
    throw "RepoPath does not look like the free-claude-code checkout: $RepoPath"
}
foreach ($required in @("Install-TEOS-AI-Gateway.ps1", "Install-TEOS.cmd", "NOTICE.md", "README-INSTALL.txt")) {
    if (-not (Test-Path -LiteralPath (Join-Path $InstallerDir $required))) {
        throw "Missing installer asset: $required"
    }
}

if (-not $IncludeSource) {
    Write-Warn "Building WITHOUT bundled source: the Corresponding Source will not travel with this ZIP. The source repository is private, so only the AGPL-3.0 section 6 written offer would apply. Pass -IncludeSource before shipping."
}

$stage = Join-Path $OutDir "staging"
$buildDist = Join-Path $OutDir "build"

Write-Step "Preparing output directory"
New-Item -ItemType Directory -Force -Path $OutDir | Out-Null
if (Test-Path -LiteralPath $stage) { Remove-Item -LiteralPath $stage -Recurse -Force }
if ((-not $SkipBuild) -and (Test-Path -LiteralPath $buildDist)) {
    Remove-Item -LiteralPath $buildDist -Recurse -Force
}
New-Item -ItemType Directory -Force -Path (Join-Path $stage "dist") | Out-Null
if ($IncludeSource) {
    New-Item -ItemType Directory -Force -Path (Join-Path $stage "source") | Out-Null
}

# --- Resolve the source commit (recorded in SOURCE.txt) ---------------------
Push-Location $RepoPath
try {
    $dirty = git status --porcelain
    if ($dirty) {
        Write-Warn "Working tree has uncommitted changes; SOURCE.txt reflects the last commit only."
    }
    $commitSha = (git rev-parse HEAD).Trim()
    $baseVersion = (git describe --tags --always 2>$null)
    Write-Ok "Source commit: $baseVersion ($commitSha)"
}
finally {
    Pop-Location
}

# --- Build wheel + sdist ----------------------------------------------------
if (-not $SkipBuild) {
    Write-Step "Building wheel + sdist (product version $Version)"
    Push-Location $RepoPath
    try {
        $env:SETUPTOOLS_SCM_PRETEND_VERSION = $Version
        uv build --out-dir $buildDist
        if ($LASTEXITCODE -ne 0) { throw "uv build failed (exit $LASTEXITCODE)." }
    }
    finally {
        Remove-Item Env:\SETUPTOOLS_SCM_PRETEND_VERSION -ErrorAction SilentlyContinue
        Pop-Location
    }
}
elseif (-not (Test-Path -LiteralPath $buildDist)) {
    throw "-SkipBuild was set but $buildDist does not exist."
}

$wheel = Get-ChildItem -LiteralPath $buildDist -Filter *.whl -ErrorAction SilentlyContinue |
    Select-Object -First 1
$sdist = Get-ChildItem -LiteralPath $buildDist -Filter *.tar.gz -ErrorAction SilentlyContinue |
    Select-Object -First 1
if (-not $wheel) { throw "No wheel was produced in $buildDist." }
Write-Ok "Wheel: $($wheel.Name)"

# --- Locate the TEOS Desktop shell installer --------------------------------
# The native shell is built by the sibling teos-pharaonic-desktop project. It is
# bundled so the product stays a single offline download: the buyer installer
# runs it silently after installing the wheel.
if (-not $DesktopInstaller) {
    $shellSearchRoots = @(
        (Join-Path $RepoPath "teos-pharaonic-desktop\src-tauri\target\release\bundle\nsis"),
        (Join-Path $env:TEMP "tauri-release\release\bundle\nsis")
    )
    foreach ($root in $shellSearchRoots) {
        if (-not (Test-Path -LiteralPath $root)) { continue }
        $candidate = Get-ChildItem -LiteralPath $root -Filter "TEOS Desktop_*_x64-setup.exe" -ErrorAction SilentlyContinue |
            Sort-Object LastWriteTime -Descending | Select-Object -First 1
        if ($candidate) { $DesktopInstaller = $candidate.FullName; break }
    }
}

# --- Assemble ---------------------------------------------------------------
Write-Step "Assembling bundle contents"
Copy-Item -LiteralPath (Join-Path $InstallerDir "Install-TEOS-AI-Gateway.ps1") -Destination $stage
Copy-Item -LiteralPath (Join-Path $InstallerDir "Install-TEOS.cmd") -Destination $stage
Copy-Item -LiteralPath (Join-Path $InstallerDir "NOTICE.md") -Destination $stage
Copy-Item -LiteralPath (Join-Path $InstallerDir "README-INSTALL.txt") -Destination $stage
Copy-Item -LiteralPath (Join-Path $RepoPath "LICENSE") -Destination $stage
Copy-Item -LiteralPath (Join-Path $RepoPath "src\free_claude_code\assets\app-icon.ico") -Destination $stage
Copy-Item -LiteralPath $wheel.FullName -Destination (Join-Path $stage "dist")

if ($DesktopInstaller -and (Test-Path -LiteralPath $DesktopInstaller)) {
    New-Item -ItemType Directory -Force -Path (Join-Path $stage "desktop") | Out-Null
    Copy-Item -LiteralPath $DesktopInstaller -Destination (Join-Path $stage "desktop")
    Write-Ok "Desktop shell: $(Split-Path -Leaf $DesktopInstaller)"
}
else {
    Write-Warn "No TEOS Desktop shell installer was bundled; buyers would get a WebView2/Edge window instead of the native dashboard."
}

# License + Corresponding Source notice (AGPL-3.0 §5, §6). With -IncludeSource
# the Corresponding Source travels inside this very ZIP (AGPL-3.0 section 6).
# The source repository is private, so the notice must never point a buyer at a
# URL they cannot reach; the standing written offer is stated in both modes.
if ($IncludeSource) {
    $srcLines = @(
        "Corresponding Source (AGPL-3.0 section 6)",
        "--------------------------------------------",
        "",
        "The complete Corresponding Source for this exact build is INCLUDED in this",
        "package. You do not need to download anything else, and no network access",
        "is required:",
        "",
        "    source\$ProductSlug-$Version-source.zip",
        "        Complete source tree for this exact build."
    )
    if ($sdist) {
        $srcLines += @(
            "",
            "    dist\$($sdist.Name)",
            "        Source distribution (sdist) of the same revision."
        )
    }
    $srcLines += @(
        "",
        "Exact commit for this build:",
        "",
        "    $commitSha",
        "",
        "Standing written offer (AGPL-3.0 section 6): for at least three years",
        "from your purchase date we will provide the Corresponding Source for this",
        "build, on request and at no charge. Email $SupportEmail quoting the commit",
        "above."
    )
}
else {
    $srcLines = @(
        "Corresponding Source (AGPL-3.0 section 6)",
        "-----------------------------------------",
        "",
        "The complete Corresponding Source for this exact build is provided with",
        "your purchase, at no additional charge.",
        "",
        "Written offer (AGPL-3.0 section 6): for at least three years from your",
        "purchase date we will provide the Corresponding Source for this build, on",
        "request and at no charge. Email $SupportEmail quoting the commit below.",
        "",
        "Exact commit for this build:",
        "",
        "    $commitSha"
    )
}
$sourceSection = $srcLines -join "`r`n"

$sourceTxt = @"
TEOS AI GATEWAY - LICENSE & SOURCE NOTICE
=========================================

TEOS AI Gateway $Version is licensed under the GNU Affero General Public
License v3.0 only (AGPL-3.0), and is a modified version of Free Claude Code
(Copyright (c) 2026 Ali Khokhar). The verbatim license text is in LICENSE.

You may use, modify and redistribute this software under the terms of the
AGPL-3.0. This commercial package is sold for the official tested build, the
offline installer and support. The license grants no exclusivity and imposes
no restrictions of its own.

Standing requirement: keep the upstream copyright/license notices intact and
make your own modifications available under the same license.

$sourceSection

See LICENSE and NOTICE.md in this bundle for details.
"@
Set-Content -LiteralPath (Join-Path $stage "SOURCE.txt") -Value $sourceTxt -Encoding UTF8

if ($IncludeSource) {
    if ($sdist) { Copy-Item -LiteralPath $sdist.FullName -Destination (Join-Path $stage "dist") }
    $sourceZip = Join-Path $stage ("source\$ProductSlug-$Version-source.zip")
    Push-Location $RepoPath
    try {
        git archive --format=zip -o $sourceZip HEAD
        if ($LASTEXITCODE -ne 0) { throw "git archive failed (exit $LASTEXITCODE)." }
    }
    finally {
        Pop-Location
    }
}

# --- Package ----------------------------------------------------------------
$zipPath = Join-Path $OutDir "$ProductSlug-$Version.zip"
if (Test-Path -LiteralPath $zipPath) { Remove-Item -LiteralPath $zipPath -Force }
Write-Step "Packaging"
Compress-Archive -Path (Join-Path $stage "*") -DestinationPath $zipPath -Force

$sizeMb = [math]::Round((Get-Item -LiteralPath $zipPath).Length / 1MB, 1)
Write-Ok "Bundle:  $zipPath"
Write-Ok "Size:    $sizeMb MB"
Write-Ok "Version: $Version"
Write-Host ""
Write-Host "Ship this ZIP. Buyers extract it and double-click Install-TEOS.cmd" -ForegroundColor DarkGray
Write-Host "(or run Install-TEOS-AI-Gateway.ps1 from PowerShell)." -ForegroundColor DarkGray
