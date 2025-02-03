@echo off
setlocal

call conda activate OC_Finder

python main.py --mode=0 -F=%3 -M=best_model/ema_best.pth.tar --choose=0 --type=0 --class=2 --height=%1 --width=%2

endlocal
