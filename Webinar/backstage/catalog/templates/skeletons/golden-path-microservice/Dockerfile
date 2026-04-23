# Imagen base multi-stage para ${{ values.service_name }}
# Stack: ${{ values.language }}

{%- if values.language == "java-springboot" %}
# ── Stage 1: Build ──────────────────────────────────────────────────────────
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /workspace
COPY pom.xml .
COPY src ./src
RUN mvn package -DskipTests -B

# ── Stage 2: Runtime ─────────────────────────────────────────────────────────
FROM eclipse-temurin:21-jre-alpine AS runtime
{%- elif values.language == "node-express" or values.language == "node-nestjs" %}
# ── Stage 1: Build ──────────────────────────────────────────────────────────
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --prefer-offline
COPY . .
RUN npm run build

# ── Stage 2: Runtime ─────────────────────────────────────────────────────────
FROM node:20-alpine AS runtime
{%- elif values.language == "python-fastapi" or values.language == "python-flask" %}
# ── Stage 1: Build ──────────────────────────────────────────────────────────
FROM python:3.12-slim AS build
WORKDIR /app
COPY requirements.txt .
RUN pip install --user --no-cache-dir -r requirements.txt

# ── Stage 2: Runtime ─────────────────────────────────────────────────────────
FROM python:3.12-slim AS runtime
{%- elif values.language == "golang" %}
# ── Stage 1: Build ──────────────────────────────────────────────────────────
FROM golang:1.22-alpine AS build
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o /app/bin/${{ values.service_name }} ./cmd/...

# ── Stage 2: Runtime ─────────────────────────────────────────────────────────
FROM gcr.io/distroless/static:nonroot AS runtime
{%- endif %}

# Etiquetas de metadatos estándar OCI
LABEL org.opencontainers.image.title="${{ values.service_name }}"
LABEL org.opencontainers.image.description="${{ values.description }}"
LABEL org.opencontainers.image.source="https://github.com/${{ values.repo_org }}/${{ values.service_name }}"
LABEL org.opencontainers.image.vendor="AYESA"
LABEL io.backstage.component="${{ values.service_name }}"
LABEL io.backstage.system="${{ values.system }}"

# Usuario sin privilegios (seguridad)
{%- if values.language != "golang" %}
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser
{%- endif %}

WORKDIR /app

{%- if values.language == "java-springboot" %}
COPY --from=build /workspace/target/*.jar app.jar
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD wget -qO- http://localhost:8080/actuator/health || exit 1
ENTRYPOINT ["java", "-jar", "app.jar"]
{%- elif values.language == "node-express" or values.language == "node-nestjs" %}
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1
CMD ["node", "dist/main.js"]
{%- elif values.language == "python-fastapi" or values.language == "python-flask" %}
COPY --from=build /root/.local /home/appuser/.local
COPY src/ ./src/
ENV PATH=/home/appuser/.local/bin:$PATH
EXPOSE 8000
HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD wget -qO- http://localhost:8000/health || exit 1
{%- if values.language == "python-fastapi" %}
CMD ["uvicorn", "src.app.main:app", "--host", "0.0.0.0", "--port", "8000"]
{%- else %}
CMD ["gunicorn", "src.app.main:app", "--bind", "0.0.0.0:8000"]
{%- endif %}
{%- elif values.language == "golang" %}
COPY --from=build /app/bin/${{ values.service_name }} /${{ values.service_name }}
EXPOSE 8080
ENTRYPOINT ["/${{ values.service_name }}"]
{%- endif %}
