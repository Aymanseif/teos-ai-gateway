@echo off
setlocal
cd /d "%~dp0"
echo ==================================================
echo    TEOS AI Gateway  -  one-click installer
echo ============================================
echo.
echo This will install TEOS AI Gateway (Lifetime License).
echo Keep this window open until it says Done.
echo.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0Install-TEOS-AI-Gateway.ps1" %*
echo.
echo Finished. You can close this window.
pause
