@echo off
:: OCH-Operator (01098): Run backend on 8082, frontend on 3002
setlocal
set "ROOT=%~dp0"
set "BACKEND_PORT=8082"
set "FRONTEND_PORT=3002"
set "API_URL=http://localhost:%BACKEND_PORT%"

echo.
echo OCH-Operator (01098) - Starting backend and frontend...
echo   Backend:  http://localhost:%BACKEND_PORT%
echo   Frontend: http://localhost:%FRONTEND_PORT%
echo.

:: Start Spring Boot backend on port 8082 in a new CMD window
start "Spring Boot Backend (%BACKEND_PORT%)" cmd /k "cd /d "%ROOT%backend" && call .\mvnw.cmd spring-boot:run -Dspring-boot.run.arguments=--server.port=%BACKEND_PORT%"

:: Brief delay so backend begins starting before frontend
timeout /t 2 /nobreak > nul

:: Start frontend on port 3002; API base URL points to backend 8082
start "Frontend App (%FRONTEND_PORT%)" cmd /k "cd /d "%ROOT%frontend" && set PORT=%FRONTEND_PORT% && set REACT_APP_API_BASE_URL=%API_URL% && npm start"

echo.
echo Both processes started in new windows.
echo Open frontend at: http://localhost:%FRONTEND_PORT%
echo.
endlocal