#!/bin/bash
# build.sh - Build script for Policy Reader API (Linux/macOS)
# Compiles the project using Maven Wrapper or global Maven
# Works in CI/CD environments (Linux agents) and local development

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

echo "[BUILD] Script directory: ${SCRIPT_DIR}"
echo "[BUILD] Project directory: ${PROJECT_DIR}"

cd "${PROJECT_DIR}"

# Try to use Maven Wrapper (mvnw) with multiple fallbacks for permission issues
MVN_CMD=""

if [ -f "./mvnw" ]; then
    echo "[BUILD] Maven Wrapper found at ./mvnw"
    
    # Attempt 1: Try to execute directly
    if ./mvnw -version >/dev/null 2>&1; then
        echo "[BUILD] Maven Wrapper is directly executable"
        MVN_CMD="./mvnw"
    else
        # Attempt 2: Fix permissions and try again
        echo "[BUILD] Attempting to fix permissions on mvnw..."
        chmod +x ./mvnw 2>/dev/null || true
        
        if ./mvnw -version >/dev/null 2>&1; then
            echo "[BUILD] Maven Wrapper is now executable after chmod"
            MVN_CMD="./mvnw"
        else
            # Attempt 3: Try with bash/sh explicitly
            echo "[BUILD] Trying to run mvnw with explicit bash interpreter..."
            if bash ./mvnw -version >/dev/null 2>&1; then
                echo "[BUILD] Maven Wrapper works with explicit bash"
                MVN_CMD="bash ./mvnw"
            fi
        fi
    fi
fi

# Fallback to global Maven if wrapper failed
if [ -z "${MVN_CMD}" ]; then
    echo "[BUILD] Maven Wrapper unavailable, trying global Maven..."
    if command -v mvn >/dev/null 2>&1; then
        MVN_CMD="mvn"
        echo "[BUILD] Using global Maven at: $(which mvn)"
    else
        echo "[BUILD] ERROR: Neither Maven Wrapper nor global Maven found"
        echo "[BUILD] Please ensure Maven is installed or Maven Wrapper is available"
        exit 1
    fi
fi

echo "[BUILD] Using Maven command: ${MVN_CMD}"
echo "[BUILD] Starting compilation..."

if ${MVN_CMD} -B -ntp clean compile; then
    echo "[BUILD] ✅ Compilation successful!"
    exit 0
else
    echo "[BUILD] ❌ Compilation failed!"
    exit 1
fi
