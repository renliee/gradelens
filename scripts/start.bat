@echo off
setlocal

cd /d "%~dp0.."

if not exist backend\.venv (
  echo No environment found. Run scripts\setup.bat first.
  exit /b 1
)

if "%PORT%"=="" set PORT=8000
echo GradeLens is running at http://127.0.0.1:%PORT%
echo Press Ctrl+C to stop.

cd backend
.venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port %PORT%
