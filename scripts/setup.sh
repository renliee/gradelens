#!/usr/bin/env bash
set -e

cd "$(dirname "$0")/.."
ROOT="$(pwd)"
echo "Project: $ROOT"

PY=python3
command -v $PY >/dev/null 2>&1 || PY=python

echo "==> Creating Python environment in backend/.venv"
$PY -m venv backend/.venv
backend/.venv/bin/python -m pip install --upgrade pip
backend/.venv/bin/python -m pip install -r backend/requirements.txt

echo "==> Building the frontend"
cd frontend
npm install
npm run build
cd "$ROOT"

echo ""
echo "Setup done. Start the app with:  ./scripts/start.sh"
