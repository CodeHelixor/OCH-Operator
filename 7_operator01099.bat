@echo off
powershell -Command "(Get-Content ICH_APP\frontend\build\env.js) -replace 'http://192.168.1.32:8080', 'http://192.168.1.33:8080' | Set-Content ICH_APP\frontend\build\env.js"

call scp -r ICH_APP/ root@192.168.1.33:/home/adison