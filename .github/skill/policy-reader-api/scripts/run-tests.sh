#!/bin/bash
# run-tests.sh - Unit tests execution script
# Runs all unit tests using Maven

echo "[TESTS] Running unit tests..."
./mvnw clean test

if [ $? -eq 0 ]; then
    echo "[TESTS] All tests passed!"
    exit 0
else
    echo "[TESTS] Some tests failed!"
    exit 1
fi
