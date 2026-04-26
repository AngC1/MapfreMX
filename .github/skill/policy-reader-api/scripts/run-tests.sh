#!/bin/bash
# run-tests.sh - Unit tests execution script (Linux/macOS)
# Runs all unit tests using Maven Wrapper or global Maven
# Works in CI/CD environments (Linux agents) and local development

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

echo "[TESTS] Script directory: ${SCRIPT_DIR}"
echo "[TESTS] Project directory: ${PROJECT_DIR}"

cd "${PROJECT_DIR}"

# Try to use Maven Wrapper (mvnw) with multiple fallbacks for permission issues
MVN_CMD=""

if [ -f "./mvnw" ]; then
    echo "[TESTS] Maven Wrapper found at ./mvnw"
    
    # Attempt 1: Try to execute directly
    if ./mvnw -version >/dev/null 2>&1; then
        echo "[TESTS] Maven Wrapper is directly executable"
        MVN_CMD="./mvnw"
    else
        # Attempt 2: Fix permissions and try again
        echo "[TESTS] Attempting to fix permissions on mvnw..."
        chmod +x ./mvnw 2>/dev/null || true
        
        if ./mvnw -version >/dev/null 2>&1; then
            echo "[TESTS] Maven Wrapper is now executable after chmod"
            MVN_CMD="./mvnw"
        else
            # Attempt 3: Try with bash/sh explicitly
            echo "[TESTS] Trying to run mvnw with explicit bash interpreter..."
            if bash ./mvnw -version >/dev/null 2>&1; then
                echo "[TESTS] Maven Wrapper works with explicit bash"
                MVN_CMD="bash ./mvnw"
            fi
        fi
    fi
fi

# Fallback to global Maven if wrapper failed
if [ -z "${MVN_CMD}" ]; then
    echo "[TESTS] Maven Wrapper unavailable, trying global Maven..."
    if command -v mvn >/dev/null 2>&1; then
        MVN_CMD="mvn"
        echo "[TESTS] Using global Maven at: $(which mvn)"
    else
        echo "[TESTS] ERROR: Neither Maven Wrapper nor global Maven found"
        echo "[TESTS] Please ensure Maven is installed or Maven Wrapper is available"
        exit 1
    fi
fi

echo "[TESTS] Using Maven command: ${MVN_CMD}"
echo "[TESTS] Running unit tests..."

if ${MVN_CMD} -B -ntp test; then
    echo "[TESTS] ✅ All tests passed!"
    exit 0
else
    echo "[TESTS] ❌ Some tests failed!"
    exit 1
fi
