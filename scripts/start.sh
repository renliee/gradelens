#!/usr/bin/env bash
set -e

cd "$(dirname "$0")/.."

if [ ! -d backend/.venv ]; then
  echo "No environment found. Run ./scripts/setup.sh first."
  exit 1
fi

PORT="${PORT:-8000}"
echo "GradeLens is running at http://127.0.0.1:$PORT"
echo "Press Ctrl+C to stop."

cd backend
exec .venv/bin/python -m uvicorn app.main:app --host 127.0.0.1 --port "$PORT"
