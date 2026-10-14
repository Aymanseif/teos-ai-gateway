<#
.SYNOPSIS
    Builds the TEOS Free AI offline Windows distribution bundle.

.DESCRIPTION
    Builds a wheel + sdist from the (rebranded) free-claude-code checkout, then
    assembles a self-contained ZIP containing:
      - Install-TEOSFreeAI.ps1   (offline installer)
      - dist\<wheel>, dist\<sdist>
      - source\<name>-source.zip (full Corresponding Source, AGPL-3.0 §4/§6)
      - LICENSE (AGPL-3.0-only, verbatim)
      - NOTICE.md (modification notice, AGPL-3.0 §5a)
      - README-INSTALL.txt
      - app-icon.ico

.PARAMETER RepoPath
    Path to the free-claude-code checkout to build from.
    Default: ..\free-claude-code relative to this script.

.PARAMETER Version
    Product version stamped into the build (default 1.0.0). This overrides the
    git-derived development version so the sold product has a clean version.

.PARAMETER OutDir
    Output directory. Default: .\dist next to this script.

.PARAMETER SkipBuild
    Reuse an existing build\ directory instead of rebuilding.

.EXAMPLE
    powershell -ExecutionPolicy Bypass -File .\Build-OfflineBundle.ps1 -Version 1.0.0
#>
[CmdletBinding()]
param(
    [string] $RepoPath,
    [string] $Version = "1.0.0",
    [string] $OutDir,
    [switch] $SkipBuild
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

$ProductSlug = "TEOS-Free-AI-Windows"
$InstallerDir = Join-Path $PSScriptRoot "installer"

if (-not (Test-Path -LiteralPath (Join-Path $RepoPath "pyproject.toml"))) {
    throw "RepoPath does not look like the free-claude-code checkout: $RepoPath"
}
foreach ($required in @("Install-TEOSFreeAI.ps1", "NOTICE.md", "README-INSTALL.txt")) {
    if (-not (Test-Path -LiteralPath (Join-Path $InstallerDir $required))) {
        throw "Missing installer asset: $required"
    }
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
New-Item -ItemType Directory -Force -Path (Join-Path $stage "source") | Out-Null

# --- Guard: the source ZIP is built from committed HEAD ---------------------
Push-Location $RepoPath
try {
    $dirty = git status --porcelain
    if ($dirty) {
        Write-Warn "Working tree has uncommitted changes; source\ will reflect the last commit only."
    }
    $baseVersion = (git describe --tags --always 2>$null)
    Write-Ok "Source commit: $baseVersion"
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

# --- Assemble ---------------------------------------------------------------
Write-Step "Assembling bundle contents"
Copy-Item -LiteralPath (Join-Path $InstallerDir "Install-TEOSFreeAI.ps1") -Destination $stage
Copy-Item -LiteralPath (Join-Path $InstallerDir "NOTICE.md") -Destination $stage
Copy-Item -LiteralPath (Join-Path $InstallerDir "README-INSTALL.txt") -Destination $stage
Copy-Item -LiteralPath (Join-Path $RepoPath "LICENSE") -Destination $stage
Copy-Item -LiteralPath (Join-Path $RepoPath "src\free_claude_code\assets\app-icon.ico") -Destination $stage
Copy-Item -LiteralPath $wheel.FullName -Destination (Join-Path $stage "dist")
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
Write-Host "Ship this ZIP. Buyers extract it and run Install-TEOSFreeAI.ps1." -ForegroundColor DarkGray
