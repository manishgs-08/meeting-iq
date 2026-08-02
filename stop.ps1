Write-Host "Stopping MeetingIQ..."

if (Test-Path .backend.pid) {
    $pidStr = Get-Content .backend.pid
    Stop-Process -Id $pidStr -ErrorAction SilentlyContinue
    Remove-Item .backend.pid
    Write-Host "✓ Backend stopped"
}

if (Test-Path .frontend.pid) {
    $pidStr = Get-Content .frontend.pid
    Stop-Process -Id $pidStr -ErrorAction SilentlyContinue
    Remove-Item .frontend.pid
    Write-Host "✓ Frontend stopped"
}

Write-Host "Done."
