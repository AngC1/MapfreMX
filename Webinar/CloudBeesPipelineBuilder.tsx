"use client";

import * as React from "react";
import { useMemo, useState } from "react";

type PipelineConfig = {
  appName: string;
  repoUrl: string;
  branch: string;
  buildCommand: string;
  testCommand: string;
  dockerImage: string;
  registry: string;
  deployEnv: string;
  useDocker: boolean;
  dockerNetwork: string;
  appPort: string;
  nodeVersion: string;
  includePostgres: boolean;
  includeRedis: boolean;
  includeElasticsearch: boolean;
  includeRabbitMQ: boolean;
  includeKubernetes: boolean;
  kubernetesNamespace: string;
  kubernetesReplicas: string;
  postgresVersion: string;
  redisVersion: string;
  elasticsearchVersion: string;
  rabbitmqVersion: string;
};

const defaultConfig: PipelineConfig = {
  appName: "webinar-app",
  repoUrl: "https://github.com/org/repo.git",
  branch: "main",
  buildCommand: "npm ci; npm run build",
  testCommand: "npm run test",
  dockerImage: "org/webinar-app",
  registry: "registry.example.com",
  deployEnv: "staging",
  useDocker: true,
  dockerNetwork: "webinar-network",
  appPort: "3000",
  nodeVersion: "20-alpine",
  includePostgres: false,
  includeRedis: false,
  includeElasticsearch: false,
  includeRabbitMQ: false,
  includeKubernetes: false,
  kubernetesNamespace: "webinar-app",
  kubernetesReplicas: "2",
  postgresVersion: "15-alpine",
  redisVersion: "7-alpine",
  elasticsearchVersion: "8.11.0",
  rabbitmqVersion: "3.13-management-alpine",
};

export default function CloudBeesPipelineBuilder() {
  const [config, setConfig] = useState<PipelineConfig>(defaultConfig);

  const dockerComposePreview = useMemo(() => {
    let services = `  app:
    build:
      context: .
      dockerfile: Dockerfile
      args:
        NODE_VERSION: ${config.nodeVersion}
    container_name: ${config.appName}
    environment:
      - NODE_ENV=${config.deployEnv}
      - PORT=${config.appPort}
    ports:
      - "${config.appPort}:${config.appPort}"
    networks:
      - ${config.dockerNetwork}
    depends_on:
      ${config.includePostgres ? "- postgres" : ""}
      ${config.includeRedis ? "- redis" : ""}
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:${config.appPort}/health"]
      interval: 30s
      timeout: 10s
      retries: 3
    restart: unless-stopped
    volumes:
      - ./logs:/app/logs`;

    if (config.includePostgres) {
      services += `

  postgres:
    image: postgres:${config.postgresVersion}
    container_name: ${config.appName}-postgres
    environment:
      - POSTGRES_DB=app_db
      - POSTGRES_USER=appuser
      - POSTGRES_PASSWORD=apppass123
    ports:
      - "5432:5432"
    networks:
      - ${config.dockerNetwork}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U appuser"]
      interval: 10s
      timeout: 5s
      retries: 5
    restart: unless-stopped`;
    }

    if (config.includeRedis) {
      services += `

  redis:
    image: redis:${config.redisVersion}
    container_name: ${config.appName}-redis
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
    container_name: ${config.appName}-elasticsearch
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
      - ES_JAVA_OPTS=-Xms256m -Xmx256m
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
      retries: 3
    restart: unless-stopped`;
    }

    if (config.includeRabbitMQ) {
      services += `

  rabbitmq:
    image: rabbitmq:${config.rabbitmqVersion}
    container_name: ${config.appName}-rabbitmq
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
      retries: 3
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

  const dockerfilePreview = useMemo(() => {
    return `# Dockerfile para ${config.appName}
# Base image con Node.js
FROM node:${config.nodeVersion}

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production

# Copiar código de la aplicación
COPY . .

# Build
RUN npm run build

# Exponer puerto
EXPOSE ${config.appPort}

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \\
    CMD node -e "require('http').get('http://localhost:${config.appPort}/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Ejecutar aplicación
CMD ["npm", "start"]
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
  name: ${config.appName}
  namespace: ${config.kubernetesNamespace}
  labels:
    app: ${config.appName}
    version: 1.0.0
spec:
  replicas: ${config.kubernetesReplicas}
  selector:
    matchLabels:
      app: ${config.appName}
  template:
    metadata:
      labels:
        app: ${config.appName}
    spec:
      containers:
      - name: ${config.appName}
        image: \${REGISTRY}/${config.dockerImage}:latest
        imagePullPolicy: Always
        ports:
        - containerPort: ${config.appPort}
          name: http
        env:
        - name: NODE_ENV
          value: "production"
        - name: PORT
          value: "${config.appPort}"
        ${config.includePostgres ? `- name: DATABASE_URL
          value: "postgresql://appuser:apppass123@postgres-service:5432/app_db"` : ""}
        ${config.includeRedis ? `- name: REDIS_URL
          value: "redis://redis-service:6379"` : ""}
        ${config.includeElasticsearch ? `- name: ELASTICSEARCH_NODES
          value: "http://elasticsearch-service:9200"` : ""}
        ${config.includeRabbitMQ ? `- name: RABBITMQ_URL
          value: "amqp://guest:guest@rabbitmq-service:5672"` : ""}
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "250m"
        livenessProbe:
          httpGet:
            path: /health
            port: ${config.appPort}
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: ${config.appPort}
          initialDelaySeconds: 10
          periodSeconds: 5
      imagePullSecrets:
      - name: registry-secret
---
apiVersion: v1
kind: Service
metadata:
  name: ${config.appName}-service
  namespace: ${config.kubernetesNamespace}
spec:
  selector:
    app: ${config.appName}
  ports:
  - protocol: TCP
    port: 80
    targetPort: ${config.appPort}
  type: LoadBalancer
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: ${config.appName}-hpa
  namespace: ${config.kubernetesNamespace}
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: ${config.appName}
  minReplicas: ${config.kubernetesReplicas}
  maxReplicas: \${Math.max(parseInt(config.kubernetesReplicas) * 3, 6)}
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
`;
  }, [config]);

  const yamlPreview = useMemo(() => {
    return `# CloudBees Unify pipeline (template)
# Aplicación Node.js con servicios opcionales

pipeline:
  name: ${config.appName}-ci-cd
  
  triggers:
    - type: git
      repo: ${config.repoUrl}
      branch: ${config.branch}
  
  options:
    timestamps: true
    timeout: 1h

stages:
  - name: setup
    steps:
      - name: setup-services
        ${config.useDocker ? `run: docker-compose up -d` : `run: echo "Skipping Docker setup"`}

  - name: build
    steps:
      - name: install-dependencies
        run: ${config.buildCommand}
      - name: lint
        run: npm run lint || true

  - name: test
    steps:
      - name: run-tests
        run: ${config.testCommand}
      - name: coverage
        run: npm run coverage || true

  - name: package
    steps:
      - name: build-image
        run: docker build -t ${config.registry}/${config.dockerImage}:\${BUILD_NUMBER} .
      - name: tag-latest
        run: docker tag ${config.registry}/${config.dockerImage}:\${BUILD_NUMBER} ${config.registry}/${config.dockerImage}:latest

  - name: push
    steps:
      - name: push-image
        run: |
          docker login -u \$REGISTRY_USER -p \$REGISTRY_PASS ${config.registry}
          docker push ${config.registry}/${config.dockerImage}:\${BUILD_NUMBER}
          docker push ${config.registry}/${config.dockerImage}:latest

  - name: deploy
    when:
      branch: ${config.branch}
    steps:
      - name: deploy
        run: ./deploy.sh ${config.deployEnv} ${config.registry}/${config.dockerImage}:\${BUILD_NUMBER}

  - name: verify
    steps:
      - name: health-check
        run: curl -f http://${config.appName}:${config.appPort}/health || exit 1

post:
  always:
    - name: cleanup
      ${config.useDocker ? `run: docker-compose down` : `run: echo "Cleanup done"`}
`;
  }, [config]);

  return (
    <div style={{ display: "grid", gap: 20, maxWidth: 1000, fontFamily: "system-ui" }}>
      <div>
        <h1>CloudBees Unify CI/CD Builder</h1>
        <p style={{ color: "#666", margin: "8px 0 0" }}>
          Genera pipelines de CloudBees Unify optimizadas para aplicaciones Node.js. Configura los parámetros y copia el código generado.
        </p>
      </div>

      <div style={{ backgroundColor: "#f5f5f5", padding: 16, borderRadius: 8 }}>
        <h3 style={{ marginTop: 0 }}>Configuración del Proyecto</h3>
        <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr" }}>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <strong>Nombre de la App</strong>
            <input 
              value={config.appName} 
              onChange={(e) => setConfig(c => ({ ...c, appName: e.target.value }))}
              style={{ padding: "8px", border: "1px solid #ddd", borderRadius: 4 }}
            />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <strong>Repositorio Git</strong>
            <input 
              value={config.repoUrl} 
              onChange={(e) => setConfig(c => ({ ...c, repoUrl: e.target.value }))}
              style={{ padding: "8px", border: "1px solid #ddd", borderRadius: 4 }}
            />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <strong>Branch</strong>
            <input 
              value={config.branch} 
              onChange={(e) => setConfig(c => ({ ...c, branch: e.target.value }))}
              style={{ padding: "8px", border: "1px solid #ddd", borderRadius: 4 }}
            />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <strong>Imagen Docker</strong>
            <input 
              value={config.dockerImage} 
              onChange={(e) => setConfig(c => ({ ...c, dockerImage: e.target.value }))}
              style={{ padding: "8px", border: "1px solid #ddd", borderRadius: 4 }}
            />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <strong>Comando Build</strong>
            <input 
              value={config.buildCommand} 
              onChange={(e) => setConfig(c => ({ ...c, buildCommand: e.target.value }))}
              style={{ padding: "8px", border: "1px solid #ddd", borderRadius: 4, fontSize: "12px" }}
            />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <strong>Comando Test</strong>
            <input 
              value={config.testCommand} 
              onChange={(e) => setConfig(c => ({ ...c, testCommand: e.target.value }))}
              style={{ padding: "8px", border: "1px solid #ddd", borderRadius: 4, fontSize: "12px" }}
            />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <strong>Registro Docker</strong>
            <input 
              value={config.registry} 
              onChange={(e) => setConfig(c => ({ ...c, registry: e.target.value }))}
              style={{ padding: "8px", border: "1px solid #ddd", borderRadius: 4 }}
            />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <strong>Ambiente Deploy</strong>
            <select 
              value={config.deployEnv} 
              onChange={(e) => setConfig(c => ({ ...c, deployEnv: e.target.value }))}
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
        <h3 style={{ marginTop: 0 }}>Stack Tecnológico</h3>
        <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr" }}>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <strong>Versión Node.js</strong>
            <select 
              value={config.nodeVersion} 
              onChange={(e) => setConfig(c => ({ ...c, nodeVersion: e.target.value }))}
              style={{ padding: "8px", border: "1px solid #ddd", borderRadius: 4 }}
            >
              <option value="18-alpine">Node 18 (Alpine)</option>
              <option value="20-alpine">Node 20 (Alpine)</option>
              <option value="22-alpine">Node 22 (Alpine)</option>
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
            <strong>Usar Docker Compose en el pipeline</strong>
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <strong>Network Docker</strong>
            <input 
              value={config.dockerNetwork} 
              onChange={(e) => setConfig(c => ({ ...c, dockerNetwork: e.target.value }))}
              style={{ padding: "8px", border: "1px solid #ddd", borderRadius: 4 }}
            />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <strong>Puerto de la App</strong>
            <input 
              type="number"
              value={config.appPort} 
              onChange={(e) => setConfig(c => ({ ...c, appPort: e.target.value }))}
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
                onChange={(e) => setConfig(c => ({ ...c, postgresVersion: e.target.value }))}
                style={{ padding: "8px", border: "1px solid #ddd", borderRadius: 4 }}
              >
                <option value="13-alpine">PostgreSQL 13</option>
                <option value="14-alpine">PostgreSQL 14</option>
                <option value="15-alpine">PostgreSQL 15</option>
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
                onChange={(e) => setConfig(c => ({ ...c, redisVersion: e.target.value }))}
                style={{ padding: "8px", border: "1px solid #ddd", borderRadius: 4 }}
              >
                <option value="6-alpine">Redis 6</option>
                <option value="7-alpine">Redis 7</option>
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

          <label style={{ display: "flex", alignItems: "center", gap: 8, gridColumn: "1 / -1", marginTop: 8 }}>
            <input 
              type="checkbox"
              checked={config.includeRabbitMQ}
              onChange={(e) => setConfig(c => ({ ...c, includeRabbitMQ: e.target.checked }))}
              style={{ width: 18, height: 18 }}
            />
            <strong>🐰 Incluir RabbitMQ</strong>
          </label>
        </div>
      </div>

      <div style={{ display: "grid", gap: 8 }}>
        <h3>Pipeline YAML Generado</h3>
        <textarea
          value={yamlPreview}
          readOnly
          rows={40}
          style={{ fontFamily: "monospace", width: "100%", padding: 12, border: "1px solid #ddd", borderRadius: 4, fontSize: "11px" }}
        />
      </div>

      <div style={{ display: "grid", gap: 8 }}>
        <h3>Docker Compose Generado</h3>
        <textarea
          value={dockerComposePreview}
          readOnly
          rows={30}
          style={{ fontFamily: "monospace", width: "100%", padding: 12, border: "1px solid #ddd", borderRadius: 4, fontSize: "11px" }}
        />
      </div>

      <div style={{ display: "grid", gap: 8 }}>
        <h3>Dockerfile Generado</h3>
        <textarea
          value={dockerfilePreview}
          readOnly
          rows={18}
          style={{ fontFamily: "monospace", width: "100%", padding: 12, border: "1px solid #ddd", borderRadius: 4, fontSize: "11px" }}
        />
      </div>

      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr" }}>
        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input 
            type="checkbox"
            checked={config.includeKubernetes}
            onChange={(e) => setConfig(c => ({ ...c, includeKubernetes: e.target.checked }))}
            style={{ width: 18, height: 18 }}
          />
          <strong>☸️  Generar manifests de Kubernetes</strong>
        </label>
        {config.includeKubernetes && (
          <>
            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <strong>Namespace Kubernetes</strong>
              <input 
                value={config.kubernetesNamespace} 
                onChange={(e) => setConfig(c => ({ ...c, kubernetesNamespace: e.target.value }))}
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
                onChange={(e) => setConfig(c => ({ ...c, kubernetesReplicas: e.target.value }))}
                style={{ padding: "8px", border: "1px solid #ddd", borderRadius: 4 }}
              />
            </label>

            <div style={{ display: "grid", gap: 8 }}>
              <h3>Manifest de Kubernetes</h3>
              <textarea
                value={kubernetesManifestPreview}
                readOnly
                rows={50}
                style={{ fontFamily: "monospace", width: "100%", padding: 12, border: "1px solid #ddd", borderRadius: 4, fontSize: "11px" }}
              />
            </div>
          </>
        )}
      </div>

      <div style={{ padding: 12, backgroundColor: "#e8f4f8", borderRadius: 4, borderLeft: "4px solid #0099cc" }}>
        <strong>💡 Próximos Pasos:</strong>
        <ul style={{ margin: "8px 0", paddingLeft: 20 }}>
          <li>Copia el YAML del pipeline a tu configuración de CloudBees</li>
          <li>Copia <code>Dockerfile</code> y <code>docker-compose.yml</code> a la raíz de tu proyecto</li>
          {config.includeKubernetes && <li>Guarda el manifest de Kubernetes en <code>k8s/deployment.yaml</code></li>}
          <li>Configura las credenciales en CloudBees: <code>github-credentials</code>, <code>registry-credentials</code></li>
          <li>Prueba localmente: <code>docker-compose up -d</code></li>
        </ul>
      </div>
    </div>
  );
}
