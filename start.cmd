cd .
@echo off
cls
echo Resolving dependencies...
call npm install gulp -g
call npm install bower -g
echo Npm is running...
call npm install .
echo Bower is running...
call bower install
echo "Runinig gulpfile.js"
gulp