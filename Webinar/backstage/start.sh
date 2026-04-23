#!/usr/bin/env bash
set -euo pipefail

# Script para iniciar Backstage.io en Docker

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "================================================"
echo "  Iniciando Backstage.io (AYESA IDP Platform)  "
echo "================================================"
echo ""

# Verificar que Docker está disponible
if ! command -v docker &> /dev/null; then
    echo "❌ Error: Docker no está instalado o no está en el PATH"
    exit 1
fi

# Verificar que docker-compose está disponible
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo "❌ Error: docker-compose no está instalado"
    exit 1
fi

echo "✓ Docker detectado"
echo ""

# Detener contenedores existentes si los hay
echo "🧹 Limpiando contenedores previos..."
docker-compose down 2>/dev/null || docker compose down 2>/dev/null || true
echo ""

# Iniciar servicios
echo "🚀 Iniciando servicios Backstage..."
echo ""

# Usar docker compose (nuevo) o docker-compose (legacy)
if docker compose version &> /dev/null; then
    docker compose up -d
else
    docker-compose up -d
fi

echo ""
echo "⏳ Esperando que los servicios estén listos..."
echo "   (Esto puede tomar 30-60 segundos)"
echo ""

# Esperar a que Backstage esté listo
max_attempts=60
attempt=0
while [ $attempt -lt $max_attempts ]; do
    if curl -sf http://localhost:7007/healthcheck > /dev/null 2>&1; then
        echo ""
        echo "================================================"
        echo "  ✅ Backstage.io está listo!                  "
        echo "================================================"
        echo ""
        echo "  🌐 Accede a Backstage en tu navegador:"
        echo ""
        echo "     http://localhost:7007"
        echo ""
        echo "================================================"
        echo ""
        echo "📋 Comandos útiles:"
        echo "   - Ver logs:    docker-compose logs -f backstage"
        echo "   - Detener:     ./stop.sh"
        echo "   - Reiniciar:   ./restart.sh"
        echo ""
        exit 0
    fi
    
    attempt=$((attempt + 1))
    printf "."
    sleep 2
done

echo ""
echo "⚠️  Backstage está tardando más de lo esperado."
echo "   Verifica los logs con: docker-compose logs backstage"
echo ""

exit 0
