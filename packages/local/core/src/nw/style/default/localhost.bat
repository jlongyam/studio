@echo off
title %~n0
set "FILE=.php"
start http://localhost
php -S localhost:80  %FILE%
pause