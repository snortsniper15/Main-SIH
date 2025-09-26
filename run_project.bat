@echo off
title Dropout Prediction & Counseling System
echo 🚀 Starting Backend and Frontend...

REM --- Start Backend ---
cd dropout-backend
call venv\Scripts\activate.bat
start cmd /k "uvicorn main:app --reload --host 127.0.0.1 --port 8000"

REM --- Start Frontend ---
cd ..\dropout-frontend
start cmd /k "npm start"

echo ✅ All servers started. Backend on port 8000, Frontend will choose free port.
pause
