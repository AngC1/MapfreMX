#!/bin/bash
# build.sh - Build script for Policy Reader API
# Compiles the project using Maven Wrapper

echo "[BUILD] Starting compilation..."
./mvnw clean compile

if [ $? -eq 0 ]; then
    echo "[BUILD] Compilation successful!"
    exit 0
else
    echo "[BUILD] Compilation failed!"
    exit 1
fi
