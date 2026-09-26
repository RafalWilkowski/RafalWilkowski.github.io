<#
.SYNOPSIS
  Regenerates Rafal_Wilkowski_CV.pdf from cv.html using headless Chrome or Edge.

.USAGE
  powershell -ExecutionPolicy Bypass -File tools\build-pdf.ps1
  Run it after editing assets\js\cv-data.js, then commit the PDF together with the change.
#>
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$src  = Join-Path $root 'cv.html'
$out  = Join-Path $root 'Rafal_Wilkowski_CV.pdf'

$candidates = @(
  "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
  "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
  "$env:LOCALAPPDATA\Google\Chrome\Application\chrome.exe",
  "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe",
  "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe"
)
$browser = $candidates | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $browser) { throw 'Chrome or Edge not found. Open cv.html in a browser and use Print -> Save as PDF instead.' }

$uri = ([System.Uri]$src).AbsoluteUri
& $browser --headless=new --disable-gpu --no-first-run --no-default-browser-check `
  --run-all-compositor-stages-before-draw --virtual-time-budget=8000 `
  --no-pdf-header-footer "--print-to-pdf=$out" $uri | Out-Null

if (Test-Path $out) { Write-Host "Wrote $out ($([math]::Round((Get-Item $out).Length / 1KB)) KB)" }
else { throw 'PDF was not produced.' }
