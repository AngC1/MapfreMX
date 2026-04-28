@ECHO OFF
SETLOCAL

set "MVNW_PROJECTBASEDIR=%~dp0"
if "%MVNW_PROJECTBASEDIR:~-1%"=="\" set "MVNW_PROJECTBASEDIR=%MVNW_PROJECTBASEDIR:~0,-1%"
set "WRAPPER_DIR=%MVNW_PROJECTBASEDIR%\.mvn\wrapper"
set "WRAPPER_JAR=%WRAPPER_DIR%\maven-wrapper.jar"
set "WRAPPER_PROPERTIES=%WRAPPER_DIR%\maven-wrapper.properties"

if not exist "%WRAPPER_PROPERTIES%" (
  echo Maven wrapper properties not found: %WRAPPER_PROPERTIES%
  exit /b 1
)

if "%JAVA_HOME%"=="" (
  set "JAVA_EXE=java"
) else (
  set "JAVA_EXE=%JAVA_HOME%\bin\java.exe"
)

if not exist "%JAVA_EXE%" (
  echo Java executable not found. Set JAVA_HOME or add java to PATH.
  exit /b 1
)

if not exist "%WRAPPER_JAR%" (
  powershell -NoProfile -ExecutionPolicy Bypass -Command ^
    "$ErrorActionPreference='Stop';" ^
    "$props = Get-Content '%WRAPPER_PROPERTIES%' | Where-Object { $_ -match '^wrapperUrl=' };" ^
    "if (-not $props) { throw 'wrapperUrl not found in maven-wrapper.properties'; }" ^
    "$url = ($props -replace '^wrapperUrl=', '').Trim();" ^
    "New-Item -ItemType Directory -Force -Path '%WRAPPER_DIR%' | Out-Null;" ^
    "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12;" ^
    "Invoke-WebRequest -UseBasicParsing -Uri $url -OutFile '%WRAPPER_JAR%'"
  if errorlevel 1 (
    echo Failed to download Maven wrapper jar.
    exit /b 1
  )
)

"%JAVA_EXE%" -classpath "%WRAPPER_JAR%" "-Dmaven.multiModuleProjectDirectory=%MVNW_PROJECTBASEDIR%" org.apache.maven.wrapper.MavenWrapperMain %*

ENDLOCAL