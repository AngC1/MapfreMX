@echo off
setlocal
set "MAVEN_PROJECTBASEDIR=%~dp0"
set "WRAPPER_DIR=%MAVEN_PROJECTBASEDIR%.mvn\wrapper"
set "WRAPPER_JAR=%WRAPPER_DIR%\maven-wrapper.jar"

if not exist "%WRAPPER_JAR%" (
  echo Maven Wrapper jar not found at %WRAPPER_JAR%
  echo Please download it or run mvnw.cmd after the jar is available.
  exit /b 1
)

set "JAVA_CMD=java"
if not "%JAVA_HOME%"=="" set "JAVA_CMD=%JAVA_HOME%\bin\java"

set "MAVEN_WRAPPER_PROPERTIES=%WRAPPER_DIR%\maven-wrapper.properties"

"%JAVA_CMD%" ^
  -Dmaven.multiModuleProjectDirectory="%MAVEN_PROJECTBASEDIR%" ^
  -classpath "%WRAPPER_JAR%" ^
  org.apache.maven.wrapper.MavenWrapperMain ^
  -Dwrapper.properties="%MAVEN_WRAPPER_PROPERTIES%" %*

endlocal
