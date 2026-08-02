#!/usr/bin/env bash

echo "========================================="
echo "MeetingIQ Launcher"
echo "========================================="
echo ""
echo "Checking Environment..."

OS="$(uname -s)"

if command -v python3 &>/dev/null; then
    echo "✓ Python"
else
    echo "✗ Python is missing."
    if [ "$OS" = "Darwin" ]; then echo "Install via: brew install python3"; fi
    if [ "$OS" = "Linux" ]; then echo "Install via: sudo apt install python3"; fi
    exit 1
fi

if command -v node &>/dev/null; then
    echo "✓ Node"
else
    echo "✗ Node.js is missing."
    if [ "$OS" = "Darwin" ]; then echo "Install via: brew install node"; fi
    if [ "$OS" = "Linux" ]; then echo "Install via: curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && sudo apt install -y nodejs"; fi
    exit 1
fi

if command -v npm &>/dev/null; then
    echo "✓ npm"
else
    echo "✗ npm is missing."
    exit 1
fi

if command -v git &>/dev/null; then
    echo "✓ Git"
else
    echo "✗ Git is missing."
    exit 1
fi

if command -v ffmpeg &>/dev/null; then
    echo "✓ ffmpeg"
else
    echo "✗ ffmpeg is missing."
    if [ "$OS" = "Darwin" ]; then echo "Install via: brew install ffmpeg"; fi
    if [ "$OS" = "Linux" ]; then echo "Install via: sudo apt install ffmpeg (Ubuntu) OR sudo dnf install ffmpeg (Fedora) OR sudo pacman -S ffmpeg (Arch)"; fi
    exit 1
fi

echo ""
echo "Checking Backend..."

cd backend || exit

if [ ! -d "venv" ]; then
    python3 -m venv venv
    echo "✓ Virtual Environment Created"
else
    echo "✓ Virtual Environment"
fi

source venv/bin/activate
pip install -q -r requirements.txt
echo "✓ Dependencies"

echo ""
echo "Checking Frontend..."
cd ../frontend || exit

if [ ! -d "node_modules" ]; then
    npm install --silent
    echo "✓ Dependencies Installed"
else
    echo "✓ Dependencies"
fi

cd ..

echo ""
echo "Starting Backend..."
cd backend || exit
uvicorn app.main:app --port 8000 --reload > ../backend.log 2>&1 &
BACKEND_PID=$!
echo $BACKEND_PID > ../.backend.pid
cd ..
echo "✓ Running"

echo ""
echo "Waiting for Backend..."
while ! curl -s http://localhost:8000/health > /dev/null; do
    sleep 1
done
echo "✓ Ready"

echo ""
echo "Starting Frontend..."
cd frontend || exit
npm run dev -- --port 5173 > ../frontend.log 2>&1 &
FRONTEND_PID=$!
echo $FRONTEND_PID > ../.frontend.pid
cd ..
echo "✓ Running"

echo ""
echo "-----------------------------------------"
echo "Frontend:"
echo "http://localhost:5173"
echo ""
echo "Backend:"
echo "http://localhost:8000"
echo ""
echo "Swagger:"
echo "http://localhost:8000/docs"
echo "-----------------------------------------"
echo "MeetingIQ is ready."
