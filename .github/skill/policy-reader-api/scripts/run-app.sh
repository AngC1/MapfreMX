#!/bin/bash
# run-app.sh - Application execution script
# Starts the Spring Boot application

if ! command -v mvn >/dev/null 2>&1; then
	echo "[APP] Maven global no encontrado en PATH"
	exit 1
fi

echo "[APP] Starting Policy Reader API..."
mvn spring-boot:run

echo "[APP] Application stopped."
