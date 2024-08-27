@echo off
setlocal enabledelayedexpansion

@REM Ensure CrispyCrumbs server is running
set "serverPort=1324"
set pid=
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :%serverPort%') do set "pid=%%a"
if not "[%pid%]"=="[]" (
    echo CrispyCrumbs server already running
) else (
    cd ..\CrispyCrumbsServer

    @REM Start the server in a new CMD window
    start .\init_server.cmd -silent
    
    cd ..\CrispyCrumbsWeb
)

CALL npm install
npm start
