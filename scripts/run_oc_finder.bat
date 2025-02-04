@echo off
setlocal

:: Activate Conda Environment
call "%~5" OC_Finder || exit /b 1

:: Change directory to script location
cd /d "%~4" || exit /b 1

:: Run Python script
python main.py --mode=0 -F="%~3" -M="best_model/ema_best.pth.tar" --choose=-1 --type=0 --class=2 --height=%~1 --width=%~2

endlocal
