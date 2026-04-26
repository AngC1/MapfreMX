@echo off
REM run-app.cmd - Application execution script
REM Starts the Spring Boot application

if exist "C:\Users\MACADIAD\.jdk\jdk-21.0.2+13\bin\java.exe" (
	set "JAVA_HOME=C:\Users\MACADIAD\.jdk\jdk-21.0.2+13"
	set "PATH=%JAVA_HOME%\bin;%PATH%"
)

where mvn >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
	if exist "%USERPROFILE%\.maven\maven-3.9.12\bin\mvn.cmd" set "PATH=%USERPROFILE%\.maven\maven-3.9.12\bin;%PATH%"
	if exist "%USERPROFILE%\.maven\maven-3.9.11\bin\mvn.cmd" set "PATH=%USERPROFILE%\.maven\maven-3.9.11\bin;%PATH%"
)

where mvn >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
	echo [APP] Maven global no encontrado. Agrega Maven al PATH.
	exit /b 1
)

echo [APP] Starting Policy Reader API...
mvn spring-boot:run

echo [APP] Application stopped.
