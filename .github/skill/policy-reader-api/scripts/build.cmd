@echo off
REM build.ps1 - Build script for Policy Reader API
REM Compiles the project using Maven Wrapper

echo [BUILD] Starting compilation...
.\mvnw.cmd clean compile

if %ERRORLEVEL% EQU 0 (
    echo [BUILD] Compilation successful!
    exit /b 0
) else (
    echo [BUILD] Compilation failed!
    exit /b 1
)
