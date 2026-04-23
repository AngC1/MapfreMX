# ${{ values.service_name }}

> ${{ values.description }}

[![CI](https://img.shields.io/badge/CI-CloudBees-blue)](https://cloudbees.ayesa.com/job/${{ values.service_name }})
[![Quality Gate](https://img.shields.io/badge/Quality-SonarQube-green)](https://sonar.ayesa.com/dashboard?id=${{ values.sonar_project_key }})
[![License](https://img.shields.io/badge/License-Internal-lightgrey)]()

---

## Tabla de Contenidos

- [Descripción](#descripción)
- [Arquitectura](#arquitectura)
- [Prerequisitos](#prerequisitos)
- [Desarrollo Local](#desarrollo-local)
- [CI/CD](#cicd)
- [Despliegue](#despliegue)
- [Observabilidad](#observabilidad)
- [API](#api)

---

## Descripción

Este servicio fue generado mediante el **Golden Path de AYESA IDP**. Sigue las
mejores prácticas de la organización para microservicios listos para producción:

| Dimensión      | Herramienta / Decisión                     |
|----------------|--------------------------------------------|
| Lenguaje       | `${{ values.language }}`                  |
| CI/CD          | CloudBees Unify                            |
| Contenedor     | Docker (multi-stage) → `${{ values.registry }}/${{ values.service_name }}` |
| Orquestación   | Kubernetes — namespace `${{ values.k8s_namespace }}` |
| GitOps         | ArgoCD                                     |
| IaC            | Terraform (`${{ values.cloud_provider }}`) |
| Observabilidad | Prometheus + Grafana + OpenTelemetry       |
| Calidad        | SonarQube + Semgrep (SAST)                 |

---

## Arquitectura

```
                ┌─────────────────────────────────────┐
                │          GitHub Repository           │
                │    ${{ values.repo_org }}/${{ values.service_name }}          │
                └────────────────┬────────────────────┘
                                 │ push / PR
                ┌────────────────▼────────────────────┐
                │      CloudBees Unify Pipeline        │
                │  build → test → scan → package       │
                │  → publish image → deploy manifests  │
                └────────────────┬────────────────────┘
                                 │ image push
          ┌──────────────────────▼──────────────────────┐
          │         Container Registry                   │
          │   ${{ values.registry }}/${{ values.service_name }}:tag         │
          └──────────────────────┬──────────────────────┘
                                 │ sync
          ┌──────────────────────▼──────────────────────┐
          │              ArgoCD (GitOps)                 │
          │   deploy/k8s/overlays/${{ values.k8s_namespace }}                │
          └──────────────────────┬──────────────────────┘
                                 │
          ┌──────────────────────▼──────────────────────┐
          │         Kubernetes Cluster                   │
          │   namespace: ${{ values.k8s_namespace }}                         │
          │   Deployment / Service / HPA / Ingress       │
          └──────────────────────────────────────────────┘
```

---

## Prerequisitos

- Docker 24+
- kubectl configurado contra el cluster destino
- Acceso al registry `${{ values.registry }}`
- (Java) JDK 21 / (Node) Node.js 20 / (Python) Python 3.12

---

## Desarrollo Local

```bash
# 1. Clonar el repositorio
git clone https://github.com/${{ values.repo_org }}/${{ values.service_name }}.git
cd ${{ values.service_name }}

# 2. Instalar dependencias (según stack)
# Java:   ./mvnw install -DskipTests
# Node:   npm install
# Python: pip install -r requirements.txt

# 3. Ejecutar en local
# Java:   ./mvnw spring-boot:run
# Node:   npm run dev
# Python: uvicorn app.main:app --reload

# 4. Verificar health
curl http://localhost:8080/health
```

---

## CI/CD

El pipeline CloudBees Unify incluye las siguientes etapas:

| Etapa            | Descripción                                               |
|------------------|-----------------------------------------------------------|
| `build`          | Compilación y resolución de dependencias                  |
| `test`           | Tests unitarios + integración                             |
| `sast`           | Análisis estático: SonarQube + Semgrep                    |
| `container-scan` | Escaneo de vulnerabilidades de imagen: Trivy              |
| `package`        | Build de imagen Docker multi-stage                        |
| `publish`        | Push al registry `${{ values.registry }}`                |
| `deploy`         | Actualización de manifiestos GitOps en la rama `main`     |

---

## Despliegue

Los manifiestos Kubernetes están en `deploy/k8s/`. La estructura usa **Kustomize**:

```
deploy/k8s/
├── base/                     # Recursos comunes
│   ├── deployment.yaml
│   ├── service.yaml
│   └── kustomization.yaml
└── overlays/
    ├── dev/                  # Configuración entorno desarrollo
    ├── staging/              # Configuración entorno staging
    └── production/           # Configuración producción (réplicas, recursos)
```

ArgoCD sincroniza automáticamente el overlay del entorno configurado.

---

## Observabilidad

| Herramienta   | URL                                                                 |
|---------------|---------------------------------------------------------------------|
| Grafana       | https://grafana.ayesa.com/d/${{ values.service_name }}             |
| Prometheus    | Métricas en `/actuator/prometheus` o `/metrics`                    |
| Jaeger/Tempo  | Trazas via OpenTelemetry SDK                                        |
| Kibana/Loki   | Logs estructurados en JSON                                          |

---

## API

{%- if values.expose_openapi %}
La especificación OpenAPI está disponible en:
- **Desarrollo**: http://localhost:8080/openapi.yaml
- **Developer Portal**: https://backstage.ayesa.com/catalog/default/api/${{ values.service_name }}-api/definition
{%- else %}
Este servicio no expone una API pública documentada.
{%- endif %}

---

> Generado con  el **Golden Path IDP** de AYESA — [Más info](https://backstage.ayesa.com/docs/default/system/idp-platform/golden-paths)
