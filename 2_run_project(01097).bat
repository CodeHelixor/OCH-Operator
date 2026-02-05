@echo off

:: Start Spring Boot in a new CMD window
start "Spring Boot Backend" cmd /k "cd backend && call .\mvnw.cmd spring-boot:run"

:: Optional delay to ensure backend starts before frontend
timeout /t 2 > nul

:: Start frontend (React, Angular, etc.) in a new CMD window
start "Frontend App" cmd /k "cd frontend && npm start"