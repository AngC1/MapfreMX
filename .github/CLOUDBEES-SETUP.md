# CloudBees Jenkins Configuration Guide

## Quick Setup para CloudBees en http://127.0.0.1:8081

### 1. Acceso Inicial

```
URL: http://127.0.0.1:8081/job/Cloudbees%20CI/configure
Usuario: Ang
```

### 2. Crear Nuevo Job Pipeline

1. Dashboard → New Item
2. Name: `MapfreMX-SDD-Pipeline`
3. Type: `Pipeline`
4. Click OK

### 3. Configuración del Pipeline

En la sección **Pipeline**:

```groovy
// Pipeline script
@Library('shared') _

pipeline {
    agent any
    
    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timestamps()
    }
    
    stages {
        stage('Context Load') {
            steps {
                script {
                    echo "Loading SDD context from .github/"
                    sh 'cat .github/AGENT.md | head -20'
                }
            }
        }
        
        stage('Build') {
            steps {
                sh '''
                    cd .github/skill/policy-reader-api
                    chmod +x mvnw scripts/*.sh
                    ./scripts/build.sh
                '''
            }
        }
        
        stage('Test') {
            steps {
                sh '''
                    cd .github/skill/policy-reader-api
                    chmod +x mvnw scripts/*.sh
                    ./scripts/run-tests.sh
                '''
            }
        }
        
        stage('Deploy') {
            when { branch 'master' }
            steps {
                echo "Ready to deploy"
            }
        }
    }
}
```

### 4. Source Code Management

- Repository URL: `https://github.com/AngC1/MapfreMX.git`
- Branch: `*/master`
- Credentials: (configurar con token)

### 5. Build Triggers

- [x] GitHub hook trigger for GITScm polling
- [x] Poll SCM
  - `H/15 * * * *` (cada 15 minutos)

### 6. Build Environment

- [x] Delete workspace before build starts
- [x] Add timestamps to console output

### 7. Guardar y Ejecutar

Click: **Save** → **Build Now**

## Via API REST (alternativa)

```bash
curl -X POST \
  -H "Content-Type: application/xml" \
  -d @pipeline-config.xml \
  http://Ang:C@127.0.0.1:8081/createItem?name=MapfreMX-SDD-Pipeline
```

## Integración con GitHub

1. Ve a: https://github.com/AngC1/MapfreMX/settings/hooks
2. Add webhook: `http://127.0.0.1:8081/github-webhook/`
3. Content type: `application/json`
4. Events: `push`, `pull_request`

## Documentación de Contexto en el Pipeline

El pipeline carga automáticamente:

1. `.github/AGENT.md` - Reglas globales
2. `.github/Skill-Catalog.md` - Catálogo
3. `.github/skill/policy-reader-api/Skill.md` - Especificación
4. Scripts de `scripts/` - Automatización

## Monitoreo y Logs

- Dashboard: http://127.0.0.1:8081/
- Job: http://127.0.0.1:8081/job/MapfreMX-SDD-Pipeline/
- Build logs: http://127.0.0.1:8081/job/MapfreMX-SDD-Pipeline/lastBuild/console

## Troubleshooting

Si el job falla:

1. Verificar autenticación: `curl -I -u Ang:C http://127.0.0.1:8081/`
2. Verificar repo: `git clone https://github.com/AngC1/MapfreMX.git`
3. Verificar scripts: `./scripts/build.sh --help`
4. Revisar logs: http://127.0.0.1:8081/log/all
