# Dockerfile - Runtime container para ROX Java Demo (Java 21 LTS)
# Multi-stage build para minimizar tamaño de imagen

# Stage 1: Build
FROM eclipse-temurin:21-jdk-alpine as builder

WORKDIR /app

# Copiar Maven Wrapper
COPY .mvn ./.mvn
COPY mvnw mvnw.cmd ./

# Copiar archivos de dependencias
COPY pom.xml ./

# Copiar código fuente
COPY src ./src

# Build
RUN chmod +x mvnw && \
    ./mvnw clean package -Dmaven.compiler.source=21 -Dmaven.compiler.target=21 -DskipTests

# Stage 2: Runtime
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Copiar JAR compilado del stage anterior
COPY --from=builder /app/target/rox-java-demo-*.jar app.jar

# Crear directorio de logs
RUN mkdir -p /app/logs

# Exponer puerto
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=5 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/actuator/health || exit 1

# Metadata
LABEL maintainer="AYESA DevSecOps Team" \
      version="1.0.0" \
      description="ROX Java Demo - Java 21 LTS" \
      java.version="21"

# Ejecutar aplicación
ENTRYPOINT ["java", "-XX:+UseContainerSupport", "-XX:MaxRAMPercentage=75.0", "-jar", "app.jar"]
