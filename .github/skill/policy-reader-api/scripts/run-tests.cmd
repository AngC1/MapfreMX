@echo off
REM run-tests.cmd - Unit tests execution script (Windows)
REM Runs all unit tests using Maven Wrapper or global Maven
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

echo [TESTS] Script directory: %SCRIPT_DIR%
echo [TESTS] Project directory: %cd%

REM Try Maven Wrapper first
set "MVN_CMD="

if exist "mvnw.cmd" (
    echo [TESTS] Maven Wrapper found at mvnw.cmd
    mvnw.cmd -version >nul 2>&1
    if !errorlevel! equ 0 (
        echo [TESTS] Maven Wrapper is executable
        set "MVN_CMD=mvnw.cmd"
    )
)

REM Fallback to global Maven if wrapper not available
if "!MVN_CMD!"=="" (
    echo [TESTS] Maven Wrapper unavailable, trying global Maven...
    where mvn >nul 2>&1
    if !errorlevel! equ 0 (
        set "MVN_CMD=mvn"
        echo [TESTS] Using global Maven at: 
        where mvn
    ) else (
        echo [TESTS] ERROR: Neither Maven Wrapper nor global Maven found
        echo [TESTS] Please ensure Maven is installed or Maven Wrapper is available
        exit /b 1
    )
)

echo [TESTS] Using Maven command: !MVN_CMD!
echo [TESTS] Running unit tests...

call !MVN_CMD! -B -ntp test

if !errorlevel! equ 0 (
    echo [TESTS] All tests passed!
    exit /b 0
) else (
    echo [TESTS] Some tests failed!
    exit /b 1
)
