@echo off
REM run-app.cmd - Application execution script
REM Starts the Spring Boot application

setlocal enabledelayedexpansion
set "SCRIPT_DIR=%~dp0"
cd /d "%SCRIPT_DIR%.."

if exist "C:\Users\MACADIAD\.jdk\jdk-21.0.8(6)\bin\java.exe" (
	set "JAVA_HOME=C:\Users\MACADIAD\.jdk\jdk-21.0.8(6)"
	set "PATH=%JAVA_HOME%\bin;%PATH%"
) else if exist "C:\Users\MACADIAD\.jdk\jdk-21.0.2+13\bin\java.exe" (
	set "JAVA_HOME=C:\Users\MACADIAD\.jdk\jdk-21.0.2+13"
	set "PATH=%JAVA_HOME%\bin;%PATH%"
)

set "MVN_CMD="

if exist "mvnw.cmd" (
	mvnw.cmd -version >nul 2>&1
	if !errorlevel! equ 0 set "MVN_CMD=mvnw.cmd"
)

if "!MVN_CMD!"=="" (
	where mvn >nul 2>&1
	if !ERRORLEVEL! NEQ 0 (
		if exist "%USERPROFILE%\.maven\maven-3.9.12\bin\mvn.cmd" set "PATH=%USERPROFILE%\.maven\maven-3.9.12\bin;%PATH%"
		if exist "%USERPROFILE%\.maven\maven-3.9.11\bin\mvn.cmd" set "PATH=%USERPROFILE%\.maven\maven-3.9.11\bin;%PATH%"
	)

	where mvn >nul 2>&1
	if !ERRORLEVEL! EQU 0 set "MVN_CMD=mvn"
)

if "!MVN_CMD!"=="" (
	echo [APP] Maven no encontrado. Agrega Maven al PATH o usa Maven Wrapper.
	exit /b 1
)

echo [APP] Starting Policy Reader API...
call !MVN_CMD! spring-boot:run

echo [APP] Application stopped.
