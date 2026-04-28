@echo off
REM build.cmd - Build script for Policy Reader API (Windows)
REM Compiles the project using Maven Wrapper or global Maven
REM Works on Windows for local development and CI/CD

setlocal enabledelayedexpansion

set "SCRIPT_DIR=%~dp0"
cd /d "%SCRIPT_DIR%.."

REM Ensure a JDK that supports --release 17 is used
if exist "C:\Users\MACADIAD\.jdk\jdk-21.0.8(6)\bin\java.exe" (
    set "JAVA_HOME=C:\Users\MACADIAD\.jdk\jdk-21.0.8(6)"
    set "PATH=%JAVA_HOME%\bin;%PATH%"
) else if exist "C:\Users\MACADIAD\.jdk\jdk-21.0.2+13\bin\java.exe" (
    set "JAVA_HOME=C:\Users\MACADIAD\.jdk\jdk-21.0.2+13"
    set "PATH=%JAVA_HOME%\bin;%PATH%"
)

echo [BUILD] Script directory: %SCRIPT_DIR%
echo [BUILD] Project directory: %cd%

REM Try Maven Wrapper first
set "MVN_CMD="

if exist "mvnw.cmd" (
    echo [BUILD] Maven Wrapper found at mvnw.cmd
    mvnw.cmd -version >nul 2>&1
    if !errorlevel! equ 0 (
        echo [BUILD] Maven Wrapper is executable
        set "MVN_CMD=mvnw.cmd"
    )
)

REM Fallback to global Maven if wrapper not available
if "!MVN_CMD!"=="" (
    echo [BUILD] Maven Wrapper unavailable, trying global Maven...
    where mvn >nul 2>&1
    if !errorlevel! equ 0 (
        set "MVN_CMD=mvn"
        echo [BUILD] Using global Maven at: 
        where mvn
    ) else (
        echo [BUILD] ERROR: Neither Maven Wrapper nor global Maven found
        echo [BUILD] Please ensure Maven is installed or Maven Wrapper is available
        exit /b 1
    )
)

echo [BUILD] Using Maven command: !MVN_CMD!
echo [BUILD] Starting compilation...

call !MVN_CMD! -B -ntp clean compile

if !errorlevel! equ 0 (
    echo [BUILD] Compilation successful!
    exit /b 0
) else (
    echo [BUILD] Compilation failed!
    exit /b 1
)
