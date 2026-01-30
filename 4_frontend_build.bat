@echo off
echo Running npm run..
call cd frontend
call npm run build

IF %ERRORLEVEL% NEQ 0 (
    echo npm build failed. Exiting.
    exit /b %ERRORLEVEL%
)

cd ../
echo Copying jar file to ICH_APP/backend...
robocopy frontend\build ICH_APP\frontend\build /E /MT /R:0 /W:0
echo Done.