@echo off
:: Run from the directory where this script lives (project root)
cd /d "%~dp0"

:: Check backend and frontend folders exist
if not exist "%~dp0backend" (
    echo Error: backend folder not found.
    pause
    exit /b 1
)
if not exist "%~dp0frontend" (
    echo Error: frontend folder not found.
    pause
    exit /b 1
)

:: Backend: Spring Boot on port 8080 (server.port in application.properties)
start "Backend (8080)" cmd /k "cd /d ""%~dp0backend"" && call mvnw.cmd spring-boot:run"

:: Brief delay so backend begins before frontend
timeout /t 3 /nobreak > nul

:: Frontend: React on port 3000, API points to backend on 8080
start "Frontend (3000)" cmd /k "cd /d ""%~dp0frontend"" && set PORT=3000 && set REACT_APP_API_BASE_URL=http://localhost:8080 && call npm start"

echo.
echo Backend  : http://localhost:8080
echo Frontend : http://localhost:3000
echo.
echo Both windows will stay open. Close them to stop the servers.
pause
