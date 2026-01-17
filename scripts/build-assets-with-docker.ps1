$ErrorActionPreference = "Stop"

Set-Location (Split-Path -Parent $PSScriptRoot) | Out-Null

$image = "bpannone-site-assets:local"
$container = "bpannone-site-assets-tmp"

Write-Host "Building site (Docker)..." -ForegroundColor Cyan
docker build -t $image .

if (docker ps -a --format "{{.Names}}" | Select-String -SimpleMatch $container) {
  docker rm -f $container | Out-Null
}

Write-Host "Extracting built assets to repo root (css/, js/)..." -ForegroundColor Cyan
docker create --name $container $image | Out-Null

docker cp "$($container):/usr/share/nginx/html/css/." ".\css"
docker cp "$($container):/usr/share/nginx/html/js/." ".\js"

if (Test-Path ".\CNAME") {
  # keep existing CNAME
} else {
  try { docker cp "$($container):/usr/share/nginx/html/CNAME" ".\CNAME" } catch {}
}

docker rm $container | Out-Null

Write-Host "Done. You can now commit/push the updated built files." -ForegroundColor Green


