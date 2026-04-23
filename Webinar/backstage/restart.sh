#!/usr/bin/env bash
set -euo pipefail

# Script para reiniciar Backstage.io

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "🔄 Reiniciando Backstage.io..."
echo ""

./stop.sh
sleep 2
./start.sh
