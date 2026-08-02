#!/usr/bin/env bash

echo "Stopping MeetingIQ..."

if [ -f .backend.pid ]; then
    PID=$(cat .backend.pid)
    kill $PID 2>/dev/null
    rm .backend.pid
    echo "✓ Backend stopped"
fi

if [ -f .frontend.pid ]; then
    PID=$(cat .frontend.pid)
    kill $PID 2>/dev/null
    rm .frontend.pid
    echo "✓ Frontend stopped"
fi

echo "Done."
