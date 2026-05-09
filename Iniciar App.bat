@echo off
cd /d "%~dp0"
set PATH=C:\Program Files\nodejs;%PATH%

echo Iniciando servidor... aguarde ate aparecer "Ready in"
echo Depois abra: http://localhost:3000
echo.

start "Plano Biblico - Servidor" cmd /k ""C:\Program Files\nodejs\npm.cmd" run dev"

echo Aguardando servidor iniciar (30 segundos)...
timeout /t 30 /nobreak > nul

start "" http://localhost:3000
