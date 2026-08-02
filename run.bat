@echo off
setlocal

echo =========================================
echo MeetingIQ Launcher
echo =========================================
echo.
echo Checking Environment...

python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo X Python is missing.
    echo Install via: https://www.python.org/downloads/
    exit /b 1
)
echo Y Python

node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo X Node.js is missing.
    echo Install via: https://nodejs.org/
    exit /b 1
)
echo Y Node

call npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo X npm is missing.
    exit /b 1
)
echo Y npm

git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo X Git is missing.
    exit /b 1
)
echo Y Git

ffmpeg -version >nul 2>&1
if %errorlevel% neq 0 (
    echo X ffmpeg is missing.
    echo Install via: winget install Gyan.FFmpeg
    exit /b 1
)
echo Y ffmpeg

echo.
echo Checking Backend...
cd backend

if not exist "venv\" (
    python -m venv venv
    echo Y Virtual Environment Created
) else (
    echo Y Virtual Environment
)

call venv\Scripts\activate.bat
pip install -q -r requirements.txt
echo Y Dependencies

echo.
echo Checking Frontend...
cd ..\frontend

if not exist "node_modules\" (
    call npm install --silent
    echo Y Dependencies Installed
) else (
    echo Y Dependencies
)

cd ..

echo.
echo Starting Backend...
cd backend
start /B uvicorn app.main:app --port 8000 --reload > ..\backend.log 2>&1
cd ..
echo Y Running

echo.
echo Waiting for Backend...
:wait_backend
curl -s http://localhost:8000/health >nul 2>&1
if %errorlevel% neq 0 (
    timeout /t 1 /nobreak >nul
    goto wait_backend
)
echo Y Ready

echo.
echo Starting Frontend...
cd frontend
start /B npm run dev -- --port 5173 > ..\frontend.log 2>&1
cd ..
echo Y Running

echo.
echo -----------------------------------------
echo Frontend:
echo http://localhost:5173
echo.
echo Backend:
echo http://localhost:8000
echo.
echo Swagger:
echo http://localhost:8000/docs
echo -----------------------------------------
echo MeetingIQ is ready.
