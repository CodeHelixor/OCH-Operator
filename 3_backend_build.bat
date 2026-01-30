@echo off
echo Running Maven build...
call cd backend
call ./mvnw clean package

IF %ERRORLEVEL% NEQ 0 (
    echo Maven build failed. Exiting.
    exit /b %ERRORLEVEL%
)

cd ../
echo Copying jar file to ICH_APP/backend...
xcopy /Y backend\target\*.jar ICH_APP\backend\

echo Done.