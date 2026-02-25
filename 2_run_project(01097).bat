@echo off
:: Run from the directory where this script lives (project root)
cd /d "%~dp0"

:: Backend: Spring Boot on port 8080 (server.port in application.properties)
start "Backend (8080)" cmd /k "cd /d ""%~dp0backend"" && call mvnw.cmd spring-boot:run"

:: Brief delay so backend begins before frontend
timeout /t 3 /nobreak > nul

:: Frontend: React on port 3000 (PORT in frontend/.env)
start "Frontend (3000)" cmd /k "cd /d ""%~dp0frontend"" && set PORT=3000 && npm start"

echo Backend starting on http://localhost:8080
echo Frontend starting on http://localhost:3000
echo Both windows will stay open. Close them to stop the servers.
