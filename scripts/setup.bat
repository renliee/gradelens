@echo off
setlocal

cd /d "%~dp0.."

echo ==^> Creating Python environment in backend\.venv
python -m venv backend\.venv
if errorlevel 1 goto :error
call backend\.venv\Scripts\python.exe -m pip install --upgrade pip
call backend\.venv\Scripts\python.exe -m pip install -r backend\requirements.txt
if errorlevel 1 goto :error

echo ==^> Building the frontend
cd frontend
call npm install
if errorlevel 1 goto :error
call npm run build
if errorlevel 1 goto :error
cd ..

echo.
echo Setup done. Start the app with:  scripts\start.bat
goto :eof

:error
echo.
echo Setup failed. Check that Python and Node.js are installed.
exit /b 1
