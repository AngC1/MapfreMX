#!/usr/bin/env bash
set -euo pipefail

# Script para detener Backstage.io

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "🛑 Deteniendo Backstage.io..."
echo ""

# Usar docker compose (nuevo) o docker-compose (legacy)
if docker compose version &> /dev/null 2>&1; then
    docker compose down
else
    docker-compose down
fi

echo ""
echo "✅ Backstage.io detenido"
echo ""
