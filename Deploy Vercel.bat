@echo off
cd /d "%~dp0"
set PATH=C:\Program Files\nodejs;C:\Users\phdia\AppData\Roaming\npm;%PATH%
set VERCEL=%APPDATA%\npm\vercel.cmd

echo === Fazendo build de producao ===
"C:\Program Files\nodejs\npm.cmd" run build
if errorlevel 1 (
  echo ERRO no build.
  pause
  exit /b 1
)

echo.
echo === Fazendo deploy para producao ===
"%VERCEL%" --prod --yes --scope phdiasx-2810s-projects

echo.
echo Deploy concluido!
pause
