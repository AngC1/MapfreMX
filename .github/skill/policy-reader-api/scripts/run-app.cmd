@echo off
REM run-app.cmd - Application execution script
REM Starts the Spring Boot application

echo [APP] Starting Policy Reader API...
.\mvnw.cmd spring-boot:run

echo [APP] Application stopped.
