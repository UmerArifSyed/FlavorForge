@echo off
REM This batch file starts the backend and frontend servers for the FlavorForge application.

ECHO Starting FlavorForge servers...

REM Start the backend server in a new, minimized command prompt window.
start "FlavorForge Backend" /min cmd /k "cd /d C:\Users\Winters-PC\Desktop\Projects\FlavorForge\back && npm start"

REM Start the frontend server in a new, minimized command prompt window.
start "FlavorForge Frontend" /min cmd /k "cd /d C:\Users\Winters-PC\Desktop\Projects\FlavorForge\front\app && npm start"

ECHO Both server windows have been launched and minimized.
