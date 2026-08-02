Write-Host "========================================="
Write-Host "MeetingIQ Launcher"
Write-Host "========================================="
Write-Host ""
Write-Host "Checking Environment..."

if (!(Get-Command "python" -ErrorAction SilentlyContinue)) {
    Write-Host "✗ Python is missing."
    Write-Host "Install via: https://www.python.org/downloads/"
    exit
}
Write-Host "✓ Python"

if (!(Get-Command "node" -ErrorAction SilentlyContinue)) {
    Write-Host "✗ Node.js is missing."
    Write-Host "Install via: https://nodejs.org/"
    exit
}
Write-Host "✓ Node"

if (!(Get-Command "npm" -ErrorAction SilentlyContinue)) {
    Write-Host "✗ npm is missing."
    exit
}
Write-Host "✓ npm"

if (!(Get-Command "git" -ErrorAction SilentlyContinue)) {
    Write-Host "✗ Git is missing."
    exit
}
Write-Host "✓ Git"

if (!(Get-Command "ffmpeg" -ErrorAction SilentlyContinue)) {
    Write-Host "✗ ffmpeg is missing."
    Write-Host "Install via: winget install Gyan.FFmpeg"
    exit
}
Write-Host "✓ ffmpeg"

Write-Host ""
Write-Host "Checking Backend..."
Set-Location backend

if (!(Test-Path "venv")) {
    python -m venv venv
    Write-Host "✓ Virtual Environment Created"
} else {
    Write-Host "✓ Virtual Environment"
}

& .\venv\Scripts\Activate.ps1
pip install -q -r requirements.txt
Write-Host "✓ Dependencies"

Write-Host ""
Write-Host "Checking Frontend..."
Set-Location ..\frontend

if (!(Test-Path "node_modules")) {
    npm install --silent
    Write-Host "✓ Dependencies Installed"
} else {
    Write-Host "✓ Dependencies"
}

Set-Location ..

Write-Host ""
Write-Host "Starting Backend..."
Set-Location backend
$BackendProcess = Start-Process -FilePath "uvicorn" -ArgumentList "app.main:app --port 8000 --reload" -NoNewWindow -PassThru
$BackendProcess.Id | Out-File -FilePath ..\.backend.pid
Set-Location ..
Write-Host "✓ Running"

Write-Host ""
Write-Host "Waiting for Backend..."
while ($true) {
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:8000/health" -Method Get -ErrorAction Stop
        break
    } catch {
        Start-Sleep -Seconds 1
    }
}
Write-Host "✓ Ready"

Write-Host ""
Write-Host "Starting Frontend..."
Set-Location frontend
$FrontendProcess = Start-Process -FilePath "npm" -ArgumentList "run dev -- --port 5173" -NoNewWindow -PassThru
$FrontendProcess.Id | Out-File -FilePath ..\.frontend.pid
Set-Location ..
Write-Host "✓ Running"

Write-Host ""
Write-Host "-----------------------------------------"
Write-Host "Frontend:"
Write-Host "http://localhost:5173"
Write-Host ""
Write-Host "Backend:"
Write-Host "http://localhost:8000"
Write-Host ""
Write-Host "Swagger:"
Write-Host "http://localhost:8000/docs"
Write-Host "-----------------------------------------"
Write-Host "MeetingIQ is ready."
