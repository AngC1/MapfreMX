"use client";

import * as React from "react";
import { useMemo, useState } from "react";

type CloudBeesIOConfig = {
  projectName: string;
  gitRepo: string;
  gitBranch: string;
  mavenVersion: string;
  javaVersion: string;
  buildFlags: string;
  testFramework: string;
  artifactId: string;
  registryUrl: string;
  deploymentUrl: string;
  environment: string;
  useDocker: boolean;
  dockerNetwork: string;
  includePostgres: boolean;
  includeRedis: boolean;
  includeElasticsearch: boolean;
  includeRabbitMQ: boolean;
  postgresVersion: string;
  redisVersion: string;
  elasticsearchVersion: string;
  rabbitmqVersion: string;
  appPort: string;
  kubernetesNamespace: string;
  kubernetesReplicas: string;
  includeKubernetes: boolean;
};

const defaultConfig: CloudBeesIOConfig = {
  projectName: "rox-java-demo",
  gitRepo: "https://github.com/org/rox-java-demo.git",
  gitBranch: "main",
  mavenVersion: "3.9.12",
  javaVersion: "21",
  buildFlags: "-Dmaven.compiler.source=21 -Dmaven.compiler.target=21",
  testFramework: "junit5",
  artifactId: "rox-java-demo",
  registryUrl: "registry.cloudbees.io/org",
  deploymentUrl: "https://cloudbees.example.com",
  environment: "staging",
  useDocker: true,
  dockerNetwork: "rox-network",
  includePostgres: true,
  includeRedis: true,
  includeElasticsearch: false,
  includeRabbitMQ: false,
  postgresVersion: "15-alpine",
  redisVersion: "7-alpine",
  elasticsearchVersion: "8.11.0",
  rabbitmqVersion: "3.13-management-alpine",
  appPort: "8080",
  kubernetesNamespace: "rox-app",
  kubernetesReplicas: "3",
  includeKubernetes: false,
};

export default function CloudBeesIOROXBuilder() {
  const [config, setConfig] = useState<CloudBeesIOConfig>(defaultConfig);

  const dockerComposePreview = useMemo(() => {
    let services = `  app:
    build:
      context: .
      dockerfile: Dockerfile
      args:
        JAVA_VERSION: ${config.javaVersion}
    container_name: rox-app-${config.environment}
    environment:
      - SPRING_PROFILES_ACTIVE=${config.environment}
      - SERVER_PORT=${config.appPort}
      ${config.includePostgres ? `- SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/rox_db
      - SPRING_DATASOURCE_USERNAME=roxuser
      - SPRING_DATASOURCE_PASSWORD=roxpass123` : ""}
      ${config.includeRedis ? `- SPRING_REDIS_HOST=redis
      - SPRING_REDIS_PORT=6379` : ""}
    ports:
      - "${config.appPort}:${config.appPort}"
    networks:
      - ${config.dockerNetwork}
    depends_on:
      ${config.includePostgres ? "- postgres" : ""}
      ${config.includeRedis ? "- redis" : ""}
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:${config.appPort}/actuator/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    restart: unless-stopped
    volumes:
      - ./logs:/app/logs`;

    if (config.includePostgres) {
      services += `

  postgres:
    image: postgres:${config.postgresVersion}
    container_name: rox-postgres-${config.environment}
    environment:
      - POSTGRES_DB=rox_db
      - POSTGRES_USER=roxuser
      - POSTGRES_PASSWORD=roxpass123
    ports:
      - "5432:5432"
    networks:
      - ${config.dockerNetwork}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U roxuser"]
      interval: 10s
      timeout: 5s
      retries: 5
    restart: unless-stopped`;
    }

    if (config.includeRedis) {
      services += `

  redis:
    image: redis:${config.redisVersion}
    container_name: rox-redis-${config.environment}
    command: redis-server --appendonly yes
    ports:
      - "6379:6379"
    networks:
      - ${config.dockerNetwork}
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5
    restart: unless-stopped`;
    }

    if (config.includeElasticsearch) {
      services += `

  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:${config.elasticsearchVersion}
    container_name: rox-elasticsearch-${config.environment}
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
      - ES_JAVA_OPTS=-Xms512m -Xmx512m
    ports:
      - "9200:9200"
    networks:
      - ${config.dockerNetwork}
    volumes:
      - elasticsearch_data:/usr/share/elasticsearch/data
    healthcheck:
      test: ["CMD-SHELL", "curl -f http://localhost:9200/_cluster/health || exit 1"]
      interval: 30s
      timeout: 10s
      retries: 5
    restart: unless-stopped`;
    }

    if (config.includeRabbitMQ) {
      services += `

  rabbitmq:
    image: rabbitmq:${config.rabbitmqVersion}
    container_name: rox-rabbitmq-${config.environment}
    environment:
      - RABBITMQ_DEFAULT_USER=guest
      - RABBITMQ_DEFAULT_PASS=guest
    ports:
      - "5672:5672"
      - "15672:15672"
    networks:
      - ${config.dockerNetwork}
    volumes:
      - rabbitmq_data:/var/lib/rabbitmq
    healthcheck:
      test: ["CMD", "rabbitmq-diagnostics", "-q", "ping"]
      interval: 30s
      timeout: 10s
      retries: 5
    restart: unless-stopped`;
    }

    let volumes = ``;
    if (config.includePostgres) volumes += `postgres_data:\n  `;
    if (config.includeRedis) volumes += `redis_data:\n  `;
    if (config.includeElasticsearch) volumes += `elasticsearch_data:\n  `;
    if (config.includeRabbitMQ) volumes += `rabbitmq_data:\n  `;

    return `version: '3.9'

services:
${services}

networks:
  ${config.dockerNetwork}:
    driver: bridge

volumes:
  ${volumes}`;
  }, [config]);

  const jenkinsfilePreview = useMemo(() => {
    return `// CloudBees IO Pipeline para ROX Java Demo
// Ejecutar en: CloudBees Core / CloudBees IO

pipeline {
  agent any

  options {
    timestamps()
    timeout(time: 1, unit: 'HOURS')
    buildDiscarder(logRotator(numToKeepStr: '10'))
  }

  parameters {
    string(name: 'ENVIRONMENT', defaultValue: '${config.environment}', description: 'Target environment')
    string(name: 'JAVA_VERSION', defaultValue: '${config.javaVersion}', description: 'Java version to use')
  }

  environment {
    PROJECT_NAME = '${config.projectName}'
    GIT_REPO = '${config.gitRepo}'
    MAVEN_VERSION = '${config.mavenVersion}'
    JAVA_VERSION = '${config.javaVersion}'
    REGISTRY = '${config.registryUrl}'
    ARTIFACT_ID = '${config.artifactId}'
    DOCKER_NETWORK = '${config.dockerNetwork}'
  }

  stages {
    stage('Checkout') {
      steps {
        echo 'Clonando repositorio de ROX...'
        git(
          url: env.GIT_REPO,
          branch: '${config.gitBranch}',
          credentialsId: 'github-credentials'
        )
      }
    }

    ${config.useDocker ? `stage('Setup Docker Environment') {
      steps {
        echo 'Iniciando servicios Docker (Docker Compose)...'
        sh '''
          docker-compose -f docker-compose.yml up -d
          sleep 15
          docker-compose ps
        '''
      }
    }` : ""}

    stage('Build') {
      steps {
        echo "Compilando con Java \${JAVA_VERSION} y Maven \${MAVEN_VERSION}..."
        ${config.useDocker ? `sh '''
          docker run --rm \\
            --network \${DOCKER_NETWORK} \\
            -v \$(pwd):/app \\
            -v maven-cache:/root/.m2 \\
            -w /app \\
            maven:${config.mavenVersion}-openjdk-${config.javaVersion} \\
            mvn clean compile ${config.buildFlags} -DskipTests
        ''' ` : `sh '''
          export JAVA_HOME=/usr/lib/jvm/java-${config.javaVersion}-openjdk
          ./mvnw clean compile ${config.buildFlags} -DskipTests
        '''`}
      }
    }

    stage('Test') {
      steps {
        echo "Ejecutando tests con ${config.testFramework}..."
        ${config.useDocker ? `sh '''
          docker run --rm \\
            --network \${DOCKER_NETWORK} \\
            -v \$(pwd):/app \\
            -v maven-cache:/root/.m2 \\
            -w /app \\
            -e SPRING_PROFILES_ACTIVE=test \\
            maven:${config.mavenVersion}-openjdk-${config.javaVersion} \\
            mvn test -Dtest.framework=${config.testFramework} ${config.buildFlags}
        ''' ` : `sh '''
          export JAVA_HOME=/usr/lib/jvm/java-${config.javaVersion}-openjdk
          ./mvnw test -Dtest.framework=${config.testFramework} ${config.buildFlags}
        '''`}
      }
      post {
        always {
          junit '**/target/surefire-reports/*.xml'
          publishHTML([
            reportDir: 'target/site/jacoco',
            reportFiles: 'index.html',
            reportName: 'Code Coverage Report'
          ])
        }
      }
    }

    stage('Package') {
      steps {
        echo 'Empaquetando aplicación JAR...'
        ${config.useDocker ? `sh '''
          docker run --rm \\
            --network \${DOCKER_NETWORK} \\
            -v \$(pwd):/app \\
            -v maven-cache:/root/.m2 \\
            -w /app \\
            maven:${config.mavenVersion}-openjdk-${config.javaVersion} \\
            mvn package -DskipTests ${config.buildFlags}
        ''' ` : `sh '''
          export JAVA_HOME=/usr/lib/jvm/java-${config.javaVersion}-openjdk
          ./mvnw package -DskipTests ${config.buildFlags}
        '''`}
      }
    }

    stage('Build Docker Image') {
      steps {
        echo "Construyendo imagen Docker con tag: \${REGISTRY}/\${ARTIFACT_ID}:\${BUILD_NUMBER}"
        sh '''
          docker build \\
            --build-arg JAVA_VERSION=${config.javaVersion} \\
            -t \${REGISTRY}/\${ARTIFACT_ID}:\${BUILD_NUMBER} \\
            -t \${REGISTRY}/\${ARTIFACT_ID}:latest \\
            .
        '''
      }
    }

    stage('Test Docker Image') {
      steps {
        echo 'Ejecutando contenedor para validar...'
        sh '''
          docker run --rm \\
            --network \${DOCKER_NETWORK} \\
            -e SERVER_PORT=${config.appPort} \\
            --name test-rox \\
            -d \${REGISTRY}/\${ARTIFACT_ID}:latest
          
          sleep 10
          
          docker exec test-rox curl -f http://localhost:${config.appPort}/actuator/health || exit 1
          docker stop test-rox
        '''
      }
    }

    stage('Push to Registry') {
      steps {
        echo 'Enviando imagen a CloudBees IO Registry...'
        script {
          withCredentials([usernamePassword(credentialsId: 'cloudbees-registry', usernameVariable: 'REGISTRY_USER', passwordVariable: 'REGISTRY_PASS')]) {
            sh '''
              docker login -u \$REGISTRY_USER -p \$REGISTRY_PASS \${REGISTRY}
              docker push \${REGISTRY}/\${ARTIFACT_ID}:\${BUILD_NUMBER}
              docker push \${REGISTRY}/\${ARTIFACT_ID}:latest
            '''
          }
        }
      }
    }

    stage('Deploy to ' + '${config.environment}') {
      when {
        branch('${config.gitBranch}')
      }
      steps {
        echo "Desplegando a \${ENVIRONMENT}..."
        sh '''
          curl -X POST \\
            -H "Authorization: Bearer \${CLOUDBEES_TOKEN}" \\
            -H "Content-Type: application/json" \\
            -d "{\\"image\\": \\"\${REGISTRY}/\${ARTIFACT_ID}:\${BUILD_NUMBER}\\", \\"environment\\": \${ENVIRONMENT}, \\"network\\": \\"\${DOCKER_NETWORK}\\"}" \\
            ${config.deploymentUrl}/api/deploy
        '''
      }
      post {
        success {
          echo "✅ Despliegue exitoso en \${ENVIRONMENT}"
        }
        failure {
          echo "❌ Fallo en el despliegue"
        }
      }
    }

    stage('Health Check') {
      steps {
        echo 'Verificando salud de la aplicación...'
        retry(3) {
          sh 'curl -f http://rox-app-${config.environment}:${config.appPort}/actuator/health || exit 1'
        }
      }
    }
  }

  post {
    always {
      echo 'Limpiando servicios Docker...'
      ${config.useDocker ? `sh 'docker-compose -f docker-compose.yml down' ` : ""}
      echo 'Pipeline completado'
      cleanWs()
    }
    success {
      echo '✅ Pipeline exitoso'
      mail(
        to: '\${BUILD_USER_EMAIL}',
        subject: "Pipeline exitoso: \${JOB_NAME} #\${BUILD_NUMBER}",
        body: "La compilación y despliegue fue exitoso en Docker.\\n\\nVer: \${BUILD_URL}"
      )
    }
    failure {
      echo '❌ Pipeline falló'
      mail(
        to: '\${BUILD_USER_EMAIL}',
        subject: "Pipeline falló: \${JOB_NAME} #\${BUILD_NUMBER}",
        body: "Revisa los logs en: \${BUILD_URL}console"
      )
    }
  }
}
`;
  }, [config]);

  const dockerfilePreview = useMemo(() => {
    return `# Dockerfile para ROX Java Demo
# Base image con Java ${config.javaVersion}
FROM eclipse-temurin:${config.javaVersion}-jdk-alpine

WORKDIR /app

# Copiar archivos del proyecto
COPY pom.xml ./
COPY .mvn ./.mvn
COPY mvnw ./
COPY src ./src

# Compilar y empaquetar
RUN chmod +x mvnw && \\
    ./mvnw clean package -DskipTests

# Runtime stage - imagen más ligera
FROM eclipse-temurin:${config.javaVersion}-jre-alpine

WORKDIR /app

# Copiar JAR compilado
COPY --from=0 /app/target/rox-java-demo-*.jar app.jar

# Exponer puerto
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \\
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/actuator/health || exit 1

# Ejecutar aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]
`;
  }, [config]);

  const kubernetesManifestPreview = useMemo(() => {
    return `apiVersion: v1
kind: Namespace
metadata:
  name: ${config.kubernetesNamespace}
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: rox-app
  namespace: ${config.kubernetesNamespace}
  labels:
    app: rox-app
    version: ${config.javaVersion}
spec:
  replicas: ${config.kubernetesReplicas}
  selector:
    matchLabels:
      app: rox-app
  template:
    metadata:
      labels:
        app: rox-app
    spec:
      containers:
      - name: rox-app
        image: \${REGISTRY}/${config.artifactId}:latest
        imagePullPolicy: Always
        ports:
        - containerPort: ${config.appPort}
          name: http
        env:
        - name: SPRING_PROFILES_ACTIVE
          value: "kubernetes"
        - name: SERVER_PORT
          value: "${config.appPort}"
        ${config.includePostgres ? `- name: SPRING_DATASOURCE_URL
          value: "jdbc:postgresql://postgres-service:5432/rox_db"
        - name: SPRING_DATASOURCE_USERNAME
          valueFrom:
            secretKeyRef:
              name: db-credentials
              key: username
        - name: SPRING_DATASOURCE_PASSWORD
          valueFrom:
            secretKeyRef:
              name: db-credentials
              key: password` : ""}
        ${config.includeRedis ? `- name: SPRING_REDIS_HOST
          value: "redis-service"
        - name: SPRING_REDIS_PORT
          value: "6379"` : ""}
        ${config.includeElasticsearch ? `- name: SPRING_ELASTICSEARCH_URIS
          value: "http://elasticsearch-service:9200"` : ""}
        ${config.includeRabbitMQ ? `- name: SPRING_RABBITMQ_HOST
          value: "rabbitmq-service"
        - name: SPRING_RABBITMQ_PORT
          value: "5672"` : ""}
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /actuator/health/liveness
            port: ${config.appPort}
          initialDelaySeconds: 60
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /actuator/health/readiness
            port: ${config.appPort}
          initialDelaySeconds: 30
          periodSeconds: 5
      imagePullSecrets:
      - name: cloudbees-registry-secret
---
apiVersion: v1
kind: Service
metadata:
  name: rox-app-service
  namespace: ${config.kubernetesNamespace}
spec:
  selector:
    app: rox-app
  ports:
  - protocol: TCP
    port: 80
    targetPort: ${config.appPort}
  type: LoadBalancer
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: rox-app-hpa
  namespace: ${config.kubernetesNamespace}
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: rox-app
  minReplicas: ${config.kubernetesReplicas}
  maxReplicas: \${Math.max(parseInt(config.kubernetesReplicas) * 3, 9)}
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
---
${config.includePostgres ? `apiVersion: v1
kind: Secret
metadata:
  name: db-credentials
  namespace: ${config.kubernetesNamespace}
type: Opaque
stringData:
  username: roxuser
  password: roxpass123
---` : ""}
apiVersion: v1
kind: ConfigMap
metadata:
  name: rox-config
  namespace: ${config.kubernetesNamespace}
data:
  application.yml: |
    spring:
      application:
        name: rox-app
      profiles:
        active: kubernetes
    server:
      port: ${config.appPort}
`;
  }, [config]);

  const onChange = (key: keyof CloudBeesIOConfig) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setConfig((current) => ({ ...current, [key]: event.target.value }));
    };

  return (
    <div style={{ display: "grid", gap: 20, maxWidth: 1000, fontFamily: "system-ui" }}>
      <div>
        <h1>CloudBees IO - ROX Java Demo Builder</h1>
        <p style={{ color: "#666", margin: "8px 0 0" }}>
          Genera pipelines de CloudBees IO optimizadas para proyectos Java con ROX. Configura los parámetros y copia el código generado.
        </p>
      </div>

      <div style={{ backgroundColor: "#f5f5f5", padding: 16, borderRadius: 8 }}>
        <h3 style={{ marginTop: 0 }}>Configuración del Proyecto</h3>
        <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr" }}>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <strong>Nombre del Proyecto</strong>
            <input 
              value={config.projectName} 
              onChange={onChange("projectName")}
              style={{ padding: "8px", border: "1px solid #ddd", borderRadius: 4 }}
            />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <strong>Repositorio Git</strong>
            <input 
              value={config.gitRepo} 
              onChange={onChange("gitRepo")}
              style={{ padding: "8px", border: "1px solid #ddd", borderRadius: 4 }}
            />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <strong>Rama (Branch)</strong>
            <input 
              value={config.gitBranch} 
              onChange={onChange("gitBranch")}
              style={{ padding: "8px", border: "1px solid #ddd", borderRadius: 4 }}
            />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <strong>ID del Artefacto Maven</strong>
            <input 
              value={config.artifactId} 
              onChange={onChange("artifactId")}
              style={{ padding: "8px", border: "1px solid #ddd", borderRadius: 4 }}
            />
          </label>
        </div>
      </div>

      <div style={{ backgroundColor: "#f5f5f5", padding: 16, borderRadius: 8 }}>
        <h3 style={{ marginTop: 0 }}>Stack Tecnológico</h3>
        <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr" }}>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <strong>Versión de Java</strong>
            <select 
              value={config.javaVersion} 
              onChange={onChange("javaVersion")}
              style={{ padding: "8px", border: "1px solid #ddd", borderRadius: 4 }}
            >
              <option value="17">Java 17 LTS</option>
              <option value="21">Java 21 LTS</option>
            </select>
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <strong>Versión de Maven</strong>
            <select 
              value={config.mavenVersion} 
              onChange={onChange("mavenVersion")}
              style={{ padding: "8px", border: "1px solid #ddd", borderRadius: 4 }}
            >
              <option value="3.8.9">Maven 3.8.9</option>
              <option value="3.9.12">Maven 3.9.12</option>
            </select>
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <strong>Framework de Tests</strong>
            <select 
              value={config.testFramework} 
              onChange={onChange("testFramework")}
              style={{ padding: "8px", border: "1px solid #ddd", borderRadius: 4 }}
            >
              <option value="junit4">JUnit 4</option>
              <option value="junit5">JUnit 5</option>
            </select>
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <strong>Flags de Compilación</strong>
            <input 
              value={config.buildFlags} 
              onChange={onChange("buildFlags")}
              style={{ padding: "8px", border: "1px solid #ddd", borderRadius: 4, fontSize: "12px" }}
            />
          </label>
        </div>
      </div>

      <div style={{ backgroundColor: "#f5f5f5", padding: 16, borderRadius: 8 }}>
        <h3 style={{ marginTop: 0 }}>Registro y Despliegue</h3>
        <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr" }}>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <strong>URL del Registro Docker</strong>
            <input 
              value={config.registryUrl} 
              onChange={onChange("registryUrl")}
              style={{ padding: "8px", border: "1px solid #ddd", borderRadius: 4 }}
            />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <strong>URL de Despliegue</strong>
            <input 
              value={config.deploymentUrl} 
              onChange={onChange("deploymentUrl")}
              style={{ padding: "8px", border: "1px solid #ddd", borderRadius: 4 }}
            />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <strong>Ambiente</strong>
            <select 
              value={config.environment} 
              onChange={onChange("environment")}
              style={{ padding: "8px", border: "1px solid #ddd", borderRadius: 4 }}
            >
              <option value="dev">Development</option>
              <option value="staging">Staging</option>
              <option value="production">Production</option>
            </select>
          </label>
        </div>
      </div>

      <div style={{ backgroundColor: "#f5f5f5", padding: 16, borderRadius: 8 }}>
        <h3 style={{ marginTop: 0 }}>🐳 Configuración Docker</h3>
        <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr" }}>
          <label style={{ display: "flex", alignItems: "center", gap: 8, gridColumn: "1 / -1" }}>
            <input 
              type="checkbox"
              checked={config.useDocker}
              onChange={(e) => setConfig(c => ({ ...c, useDocker: e.target.checked }))}
              style={{ width: 18, height: 18 }}
            />
            <strong>Usar Docker/Docker Compose en el pipeline</strong>
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <strong>Network Docker</strong>
            <input 
              value={config.dockerNetwork} 
              onChange={onChange("dockerNetwork")}
              style={{ padding: "8px", border: "1px solid #ddd", borderRadius: 4 }}
            />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <strong>Puerto de la App</strong>
            <input 
              value={config.appPort} 
              onChange={onChange("appPort")}
              style={{ padding: "8px", border: "1px solid #ddd", borderRadius: 4 }}
            />
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: 8, gridColumn: "1 / -1", marginTop: 8 }}>
            <input 
              type="checkbox"
              checked={config.includePostgres}
              onChange={(e) => setConfig(c => ({ ...c, includePostgres: e.target.checked }))}
              style={{ width: 18, height: 18 }}
            />
            <strong>📦 Incluir PostgreSQL</strong>
          </label>
          {config.includePostgres && (
            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <strong>Versión PostgreSQL</strong>
              <select 
                value={config.postgresVersion} 
                onChange={onChange("postgresVersion")}
                style={{ padding: "8px", border: "1px solid #ddd", borderRadius: 4 }}
              >
                <option value="13-alpine">PostgreSQL 13 (Alpine)</option>
                <option value="14-alpine">PostgreSQL 14 (Alpine)</option>
                <option value="15-alpine">PostgreSQL 15 (Alpine)</option>
                <option value="16-alpine">PostgreSQL 16 (Alpine)</option>
              </select>
            </label>
          )}
          <label style={{ display: "flex", alignItems: "center", gap: 8, gridColumn: "1 / -1", marginTop: 8 }}>
            <input 
              type="checkbox"
              checked={config.includeRedis}
              onChange={(e) => setConfig(c => ({ ...c, includeRedis: e.target.checked }))}
              style={{ width: 18, height: 18 }}
            />
            <strong>🔴 Incluir Redis</strong>
          </label>
          {config.includeRedis && (
            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <strong>Versión Redis</strong>
              <select 
                value={config.redisVersion} 
                onChange={onChange("redisVersion")}
                style={{ padding: "8px", border: "1px solid #ddd", borderRadius: 4 }}
              >
                <option value="6-alpine">Redis 6 (Alpine)</option>
                <option value="7-alpine">Redis 7 (Alpine)</option>
                <option value="latest-alpine">Redis Latest (Alpine)</option>
              </select>
            </label>
          )}
          <label style={{ display: "flex", alignItems: "center", gap: 8, gridColumn: "1 / -1", marginTop: 8 }}>
            <input 
              type="checkbox"
              checked={config.includeElasticsearch}
              onChange={(e) => setConfig(c => ({ ...c, includeElasticsearch: e.target.checked }))}
              style={{ width: 18, height: 18 }}
            />
            <strong>🔍 Incluir Elasticsearch</strong>
          </label>
          {config.includeElasticsearch && (
            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <strong>Versión Elasticsearch</strong>
              <select 
                value={config.elasticsearchVersion} 
                onChange={onChange("elasticsearchVersion")}
                style={{ padding: "8px", border: "1px solid #ddd", borderRadius: 4 }}
              >
                <option value="7.17.0">Elasticsearch 7.17</option>
                <option value="8.11.0">Elasticsearch 8.11</option>
              </select>
            </label>
          )}
          <label style={{ display: "flex", alignItems: "center", gap: 8, gridColumn: "1 / -1", marginTop: 8 }}>
            <input 
              type="checkbox"
              checked={config.includeRabbitMQ}
              onChange={(e) => setConfig(c => ({ ...c, includeRabbitMQ: e.target.checked }))}
              style={{ width: 18, height: 18 }}
            />
            <strong>🐰 Incluir RabbitMQ</strong>
          </label>
          {config.includeRabbitMQ && (
            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <strong>Versión RabbitMQ</strong>
              <select 
                value={config.rabbitmqVersion} 
                onChange={onChange("rabbitmqVersion")}
                style={{ padding: "8px", border: "1px solid #ddd", borderRadius: 4 }}
              >
                <option value="3.12-management-alpine">RabbitMQ 3.12 (Management)</option>
                <option value="3.13-management-alpine">RabbitMQ 3.13 (Management)</option>
              </select>
            </label>
          )}
        </div>
      </div>

      <div style={{ display: "grid", gap: 8 }}>
        <h3>Docker Compose Generado</h3>
        <textarea
          value={dockerComposePreview}
          readOnly
          rows={30}
          style={{ 
            fontFamily: "monospace", 
            width: "100%",
            padding: 12,
            border: "1px solid #ddd",
            borderRadius: 4,
            fontSize: "11px"
          }}
        />
      </div>

      <div style={{ display: "grid", gap: 8 }}>
        <h3>Jenkinsfile Generado</h3>
        <textarea
          value={jenkinsfilePreview}
          readOnly
          rows={55}
          style={{ 
            fontFamily: "monospace", 
            width: "100%",
            padding: 12,
            border: "1px solid #ddd",
            borderRadius: 4,
            fontSize: "11px"
          }}
        />
      </div>

      <div style={{ display: "grid", gap: 8 }}>
        <h3>Dockerfile Generado</h3>
        <textarea
          value={dockerfilePreview}
          readOnly
          rows={25}
          style={{ 
            fontFamily: "monospace", 
            width: "100%",
            padding: 12,
            border: "1px solid #ddd",
            borderRadius: 4,
            fontSize: "11px"
          }}
        />
      </div>

      {config.includeKubernetes && (
        <>
          <div style={{ backgroundColor: "#f5f5f5", padding: 16, borderRadius: 8 }}>
            <h3 style={{ marginTop: 0 }}>☸️  Configuración Kubernetes</h3>
            <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr" }}>
              <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <strong>Namespace Kubernetes</strong>
                <input 
                  value={config.kubernetesNamespace} 
                  onChange={onChange("kubernetesNamespace")}
                  style={{ padding: "8px", border: "1px solid #ddd", borderRadius: 4 }}
                />
              </label>
              <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <strong>Replicas iniciales</strong>
                <input 
                  type="number"
                  min="1"
                  max="10"
                  value={config.kubernetesReplicas} 
                  onChange={onChange("kubernetesReplicas")}
                  style={{ padding: "8px", border: "1px solid #ddd", borderRadius: 4 }}
                />
              </label>
            </div>
          </div>

          <div style={{ display: "grid", gap: 8 }}>
            <h3>Manifest de Kubernetes (YAML)</h3>
            <textarea
              value={kubernetesManifestPreview}
              readOnly
              rows={50}
              style={{ 
                fontFamily: "monospace", 
                width: "100%",
                padding: 12,
                border: "1px solid #ddd",
                borderRadius: 4,
                fontSize: "11px"
              }}
            />
          </div>
        </>
      )}

      <div style={{ display: "grid", gap: 8 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input 
              type="checkbox"
              checked={config.includeKubernetes}
              onChange={(e) => setConfig(c => ({ ...c, includeKubernetes: e.target.checked }))}
              style={{ width: 18, height: 18 }}
            />
            <strong>Generar manifests de Kubernetes</strong>
          </label>
        </div>
      </div>

      <div style={{ padding: 12, backgroundColor: "#e8f4f8", borderRadius: 4, borderLeft: "4px solid #0099cc" }}>
        <strong>💡 Consejos:</strong>
        <ul style={{ margin: "8px 0", paddingLeft: 20 }}>
          <li>Copia el <strong>Jenkinsfile</strong> en la raíz de tu proyecto</li>
          <li>Copia el <strong>Dockerfile</strong> en la raíz de tu proyecto</li>
          <li>Copia el <strong>docker-compose.yml</strong> en la raíz de tu proyecto</li>
          {config.includeKubernetes && <li>Copia el <strong>kubernetes.yaml</strong> en tu repositorio de IaC</li>}
          <li>Configura las credenciales en CloudBees IO: <code>github-credentials</code> y <code>cloudbees-registry</code></li>
          <li>Ejecuta <code>docker-compose up -d</code> localmente para probar los servicios</li>
          <li>Asegúrate de que Docker esté instalado en el agente de CloudBees</li>
          {config.includeKubernetes && <li>Deploya con: <code>kubectl apply -f kubernetes.yaml</code></li>}
        </ul>
      </div>
    </div>
  );
}
