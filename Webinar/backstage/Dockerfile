# Multi-stage Dockerfile para Backstage.io
FROM node:18-bullseye-slim AS base

# Instalar dependencias del sistema
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    python3 \
    g++ \
    build-essential \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Instalar yarn globalmente
RUN npm install -g yarn

WORKDIR /app

# Stage para construir el backend
FROM base AS backend-build

# Copiar archivos de configuración de Backstage
COPY package.json yarn.lock ./
COPY packages packages

# Instalar dependencias
RUN yarn install --frozen-lockfile --network-timeout 600000

# Construir el backend
RUN yarn tsc
RUN yarn build:backend --config ../../app-config.yaml

# Stage para la imagen final
FROM node:18-bullseye-slim

# Instalar dependencias runtime necesarias
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    python3 \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Crear usuario no-root
RUN useradd -m -u 1000 backstage

WORKDIR /app

# Copiar el backend compilado
COPY --from=backend-build --chown=backstage:backstage /app/packages/backend/dist/bundle.tar.gz .

# Extraer el bundle
RUN tar xzf bundle.tar.gz && rm bundle.tar.gz

# Copiar configuración
COPY --chown=backstage:backstage app-config*.yaml ./

# Instalar dependencias de producción
RUN yarn install --frozen-lockfile --production --network-timeout 600000

USER backstage

EXPOSE 7007

CMD ["node", "packages/backend", "--config", "app-config.yaml"]
