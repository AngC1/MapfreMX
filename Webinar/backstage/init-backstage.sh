#!/bin/bash
set -e

echo "🚀 Iniciando Backstage.io..."

# Verificar si ya existe la instalación
if [ ! -d "/app/node_modules" ]; then
    echo "📦 Primera ejecución: creando aplicación Backstage..."
    cd /tmp
    npx -y @backstage/create-app@latest --skip-install --path backstage
    
    # Mover archivos al directorio de trabajo
    cp -r /tmp/backstage/* /app/
    cd /app
    
    # Copiar configuración personalizada
    if [ -f "/config/app-config.yaml" ]; then
        cp /config/app-config.yaml /app/app-config.yaml
    fi
    
    if [ -d "/config/catalog" ]; then
        mkdir -p /app/catalog
        cp -r /config/catalog/* /app/catalog/
    fi
    
    echo "📦 Instalando dependencias (esto puede tardar varios minutos)..."
    yarn install --network-timeout 600000
    
    echo "✅ Instalación completada"
else
    echo "✅ Backstage ya está instalado"
    cd /app
fi

echo "🚀 Arrancando Backstage en modo desarrollo..."
exec yarn dev
