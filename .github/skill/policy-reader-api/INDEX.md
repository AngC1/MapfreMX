# 📚 Index - Policy Reader API Skill

## 🎯 Navegación Rápida

### 📌 Documentos Principales (LEER PRIMERO)
1. **[README.md](README.md)** - Overview del proyecto (3 min)
2. **[Skill.md](Skill.md)** - Skill completo con especificaciones (10 min)
3. **[QUICKSTART.md](docs/guides/QUICKSTART.md)** - Primeros pasos en 5 minutos
4. **[CONTRIBUTING.md](CONTRIBUTING.md)** - Guía para contribuir

---

## 📁 Estructura de Directorios

### 🔧 Scripts (`scripts/`)
Automatización de build, tests y deployment.

| Archivo | Propósito |
|---------|-----------|
| [README.md](scripts/README.md) | Documentación de scripts |
| `build.cmd` / `build.sh` | Compilar proyecto |
| `run-tests.cmd` / `run-tests.sh` | Ejecutar tests |
| `run-app.cmd` / `run-app.sh` | Iniciar aplicación |

**Uso:**
```bash
cd scripts
.\build.cmd          # Windows
./build.sh           # Linux/Mac
```

---

### 📦 Recursos (`resources/`)

#### Test Data (`resources/test-data/`)
Fixtures y datos de prueba para testing.

| Archivo | Contenido |
|---------|----------|
| [README.md](resources/test-data/README.md) | Guía de test data |
| [test-cases.json](resources/test-data/test-cases.json) | 4+ casos de prueba listos |

#### Templates (`resources/templates/`)
Templates reutilizables.

| Archivo | Contenido |
|---------|----------|
| [README.md](resources/templates/README.md) | Guía de templates |
| [index-template.html](resources/templates/index-template.html) | Enhanced UI template |

---

### 📚 Documentación (`docs/`)

#### API Reference (`docs/api/`)
Especificación técnica de endpoints.

| Archivo | Contenido |
|---------|----------|
| [endpoints.md](docs/api/endpoints.md) | Referencia completa de endpoints |

#### Guides (`docs/guides/`)
Guías prácticas y tutoriales.

| Archivo | Contenido | Tiempo |
|---------|----------|--------|
| [QUICKSTART.md](docs/guides/QUICKSTART.md) | Primeros pasos en 5 minutos | 5 min |
| [development-guide.md](docs/guides/development-guide.md) | Setup, estándares, troubleshooting | 20 min |
| [ARCHITECTURE.md](docs/guides/ARCHITECTURE.md) | Arquitectura del sistema | 15 min |
| [SETUP_CHECKLIST.md](docs/guides/SETUP_CHECKLIST.md) | Verificación del entorno | 10 min |

---

### ⚙️ Configuración (`config/`)
Gestión de configuración y perfiles.

| Archivo | Contenido |
|---------|----------|
| [configuration-guide.md](config/configuration-guide.md) | Profiles, environment vars, tuning |

---

## 🎯 Guías por Rol

### Para Desarrolladores Nuevos
1. Lee [README.md](README.md) - Vista general (3 min)
2. Lee [Skill.md](Skill.md) - Especificación completa (10 min)
3. Ejecuta [Quick Start](docs/guides/QUICKSTART.md) (5 min)
4. Verifica ambiente con [SETUP_CHECKLIST.md](docs/guides/SETUP_CHECKLIST.md) (10 min)
5. Estudia [ARCHITECTURE.md](docs/guides/ARCHITECTURE.md) (15 min)
6. Lee [development-guide.md](docs/guides/development-guide.md) - Estándares y workflow (20 min)

### Para Mantenimiento
1. Referencia rápida [README.md](README.md)
2. Especificación [API endpoints](docs/api/endpoints.md)
3. Test data [test-cases.json](resources/test-data/test-cases.json)
4. Scripts de testing [Scripts guide](scripts/README.md)
5. Troubleshooting [development-guide.md](docs/guides/development-guide.md#troubleshooting)

### Para DevOps/Deployment
1. [Configuration Guide](config/configuration-guide.md) - Profiles y variables
2. [Scripts de Build](scripts/README.md) - Automatización
3. [Architecture](docs/guides/ARCHITECTURE.md) - Diseño del sistema
4. [Skill.md](Skill.md#-deployment) - Opciones de despliegue

### Para Contribuidores
1. [CONTRIBUTING.md](CONTRIBUTING.md) - Cómo contribuir
2. [Coding Standards](docs/guides/development-guide.md#coding-standards)
3. [ARCHITECTURE.md](docs/guides/ARCHITECTURE.md) - Entender el diseño
4. [development-guide.md](docs/guides/development-guide.md) - Workflow de desarrollo

---

## ⚡ Comandos Rápidos

```bash
# Compilar
.\scripts\build.cmd

# Tests unitarios
.\scripts\run-tests.cmd

# Iniciar aplicación
.\scripts\run-app.cmd

# Ver Swagger UI (después de iniciar)
# http://localhost:8080/swagger-ui.html

# Limpiar todo
.\mvnw clean
```

---

## 🔍 Búsqueda por Tarea

| Tarea | Fichero | Tiempo |
|-------|---------|--------|
| Comenzar rápido | [QUICKSTART.md](docs/guides/QUICKSTART.md) | 5 min |
| Verificar setup | [SETUP_CHECKLIST.md](docs/guides/SETUP_CHECKLIST.md) | 10 min |
| Entender arquitectura | [ARCHITECTURE.md](docs/guides/ARCHITECTURE.md) | 15 min |
| Setup completo del entorno | [development-guide.md](docs/guides/development-guide.md#setting-up-your-development-environment) | 20 min |
| Agregar endpoint | [development-guide.md](docs/guides/development-guide.md#adding-a-new-endpoint) | 15 min |
| Modificar reglas extracción | [development-guide.md](docs/guides/development-guide.md#modifying-extraction-rules) | 10 min |
| Ver API completa | [endpoints.md](docs/api/endpoints.md) | 5 min |
| Especificación técnica | [Skill.md](Skill.md) | 10 min |
| Test data | [test-cases.json](resources/test-data/test-cases.json) | 5 min |
| Configuración | [configuration-guide.md](config/configuration-guide.md) | 10 min |
| Troubleshooting | [development-guide.md](docs/guides/development-guide.md#troubleshooting) | Varies |
| Contribuir al proyecto | [CONTRIBUTING.md](CONTRIBUTING.md) | 10 min |

---

## 📈 Versión & Status

| Aspecto | Valor |
|--------|-------|
| **Versión Skill** | 2.0 |
| **Java Target** | 17+ (validado con 21) |
| **Spring Boot** | 3.3.4 |
| **Última actualización** | 2026-04-23 |
| **Estado** | ✅ Activo |
| **Cobertura Tests** | 80%+ (recomendado) |

---

## 🔗 Links Importantes

- **[README.md](README.md)** - Resumen ejecutivo
- **[Skill.md](Skill.md)** - Especificación técnica completa
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Cómo contribuir
- **[ARCHITECTURE.md](docs/guides/ARCHITECTURE.md)** - Diseño del sistema
- **[QUICKSTART.md](docs/guides/QUICKSTART.md)** - Primeros pasos
- **Local API:** `http://localhost:8080`
- **Swagger UI:** `http://localhost:8080/swagger-ui.html`
- **OpenAPI Spec:** `http://localhost:8080/v3/api-docs`
- **Source Code:** `src/main/java/com/ayesa/idp/policyreader/`
- **Tests:** `src/test/java/com/ayesa/idp/policyreader/`

---

## 📞 Soporte

**Problemas comunes:**
- Ver [Troubleshooting](docs/guides/development-guide.md#troubleshooting)
- Revisar test cases en [test-cases.json](resources/test-data/test-cases.json)
- Consultar [API Reference](docs/api/endpoints.md)

**Contribuir:**
1. Crear feature branch
2. Seguir [Coding Standards](docs/guides/development-guide.md#coding-standards)
3. Agregar tests
4. Crear PR

---

> **Creado:** 2026-04-23 | **Maintainer:** Team IDP | **Versión:** 2.0

