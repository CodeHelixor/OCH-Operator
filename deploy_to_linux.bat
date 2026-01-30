@echo off
echo Running 3_backend_build.bat...
call 3_backend_build.bat

echo Running 4_frontend_build.bat...
call 4_frontend_build.bat

echo Running 5_operator01097.bat...
call 5_operator01097.bat

echo Running 6_operator01098.bat...
call 6_operator01098.bat

echo Running 7_operator01099.bat...
call 7_operator01099.bat

echo All scripts executed successfully.