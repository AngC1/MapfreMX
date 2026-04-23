@echo off
REM run-tests.cmd - Unit tests execution script
REM Runs all unit tests using Maven

echo [TESTS] Running unit tests...
.\mvnw.cmd clean test

if %ERRORLEVEL% EQU 0 (
    echo [TESTS] All tests passed!
    exit /b 0
) else (
    echo [TESTS] Some tests failed!
    exit /b 1
)
