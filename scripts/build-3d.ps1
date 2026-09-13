$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "THE TARUN / 3D BUILD" -ForegroundColor Cyan
Write-Host "Searching for Blender..."

$blender = Get-ChildItem "C:\Program Files\Blender Foundation" -Filter blender.exe -Recurse -ErrorAction SilentlyContinue |
  Sort-Object FullName -Descending |
  Select-Object -First 1 -ExpandProperty FullName

if (-not $blender) {
  throw "Blender was not found under C:\Program Files\Blender Foundation. Open scripts/build-3d.ps1 and set the executable path manually."
}

Write-Host "Blender: $blender" -ForegroundColor DarkGray

$repo = Split-Path -Parent $PSScriptRoot
Set-Location $repo

$script = Join-Path $repo "blender-scripts\build_tarun_entity.py"
if (-not (Test-Path $script)) {
  throw "Missing Blender generator: $script"
}

& $blender --background --python $script
if ($LASTEXITCODE -ne 0) {
  throw "Blender returned exit code $LASTEXITCODE"
}

$blend = Join-Path $repo "blender\hero\tarun-entity-v01.blend"
$glb = Join-Path $repo "public\models\tarun-entity-v01.glb"

Write-Host ""
Write-Host "3D build complete." -ForegroundColor Green
Write-Host "BLEND: $blend"
Write-Host "GLB:   $glb"
Write-Host ""
Write-Host "Open editable Blender source with:" -ForegroundColor DarkGray
Write-Host "& `"$blender`" `"$blend`""
