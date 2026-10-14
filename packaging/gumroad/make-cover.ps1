# Generates the Gumroad cover images for TEOS AI Gateway.
#   powershell -ExecutionPolicy Bypass -File .\make-cover.ps1
Add-Type -AssemblyName System.Drawing

$OutDir = $PSScriptRoot

function New-Cover {
    param([int] $W, [int] $H, [string] $Path, [double] $Scale = 1.0)

    $bmp = New-Object System.Drawing.Bitmap($W, $H)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit

    $rect = New-Object System.Drawing.Rectangle(0, 0, $W, $H)
    $bg1 = [System.Drawing.Color]::FromArgb(255, 8, 11, 22)
    $bg2 = [System.Drawing.Color]::FromArgb(255, 30, 20, 66)
    $bg = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, $bg1, $bg2, 40)
    $g.FillRectangle($bg, $rect)

    $accent = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 99, 102, 241))
    $barW = [int](14 * $Scale)
    $g.FillRectangle($accent, 0, 0, $barW, $H)

    $white = [System.Drawing.Brushes]::White
    $light = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 199, 210, 254))
    $muted = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 148, 163, 184))

    $x = [float](60 * $Scale)
    $fTitle = New-Object System.Drawing.Font("Segoe UI", [float](64 * $Scale), [System.Drawing.FontStyle]::Bold)
    $fTag = New-Object System.Drawing.Font("Segoe UI", [float](26 * $Scale))
    $fSub = New-Object System.Drawing.Font("Segoe UI", [float](18 * $Scale))
    $fSmall = New-Object System.Drawing.Font("Segoe UI", [float](15 * $Scale))

    $g.DrawString("TEOS AI Gateway", $fTitle, $white, $x, [float]($H * 0.22))
    $g.DrawString("One gateway. Every AI provider. Every coding agent.", $fTag, $light, $x, [float]($H * 0.42))
    $g.DrawString("Windows offline installer   |   Bring your own keys   |   AGPL-3.0", $fSub, $light, $x, [float]($H * 0.54))
    $g.DrawString("Claude Code  .  Codex  .  OpenCode  .  Cline  .  Aider", $fSmall, $muted, $x, [float]($H * 0.66))
    $g.DrawString("OpenAI  .  Anthropic  .  Gemini  .  OpenRouter  .  Groq  .  Ollama  .  +50 more", $fSmall, $muted, $x, [float]($H * 0.72))

    $bmp.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose(); $bmp.Dispose()
    Write-Host "wrote $Path"
}

New-Cover -W 1280 -H 720 -Path (Join-Path $OutDir "cover-1280x720.png") -Scale 1.0
New-Cover -W 600  -H 600 -Path (Join-Path $OutDir "thumbnail-600x600.png") -Scale 0.62
New-Cover -W 1200 -H 628 -Path (Join-Path $OutDir "og-1200x628.png") -Scale 0.92
