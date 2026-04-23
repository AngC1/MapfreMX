# Scripts - Policy Reader API

## Scripts de Build y Compilación

### build.sh / build.ps1
Script para compilar el proyecto con Maven.

```powershell
# build.ps1
.\mvnw.cmd clean compile
```

```bash
# build.sh
./mvnw clean compile
```

## Scripts de Testing

### run-tests.sh / run-tests.ps1
Script para ejecutar todos los tests unitarios.

```powershell
# run-tests.ps1
.\mvnw.cmd clean test
```

```bash
# run-tests.sh
./mvnw clean test
```

### run-integration-tests.sh / run-integration-tests.ps1
Script para ejecutar tests de integración con TestContainers.

```powershell
# run-integration-tests.ps1
.\mvnw.cmd clean verify -Dgroups=integration
```

## Scripts de Ejecución

### run-app.sh / run-app.ps1
Script para ejecutar la aplicación localmente.

```powershell
# run-app.ps1
.\mvnw.cmd spring-boot:run
```

```bash
# run-app.sh
./mvnw spring-boot:run
```

### run-api.ps1
Script existente de ejecución con PowerShell.

## Scripts de DevOps/Deployment

### docker-build.sh
Script para construir imagen Docker (futuro).

### maven-clean.sh / maven-clean.ps1
Script para limpiar artefactos Maven.

```powershell
# maven-clean.ps1
.\mvnw.cmd clean
```

## Uso

Ejecuta cualquier script desde la raíz del proyecto:
```bash
cd scripts/
.\build.ps1        # Compilar
.\run-tests.ps1    # Tests
.\run-app.ps1      # Ejecutar aplicación
```

