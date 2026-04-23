# 📚 Skill Catalog - IDP Project Library

> **Catálogo centralizado de todos los Skills disponibles y reutilizables**

**Última actualización:** 2026-04-23

---

## 🎯 ¿Qué es un Skill?

Un **Skill** es un proyecto autosuficiente y reutilizable que:
- ✅ Tiene especificación técnica clara (`Skill.md`)
- ✅ Código fuente documentado y funcional
- ✅ Tests automatizados incluidos
- ✅ Scripts de build/test/deploy reproducibles
- ✅ Guías de uso y contribución
- ✅ Puede integrarse en otros proyectos IDP

---

## 🤖 Context Engineering Global

Archivos globales para que cualquier modelo LLM use el mismo contexto base:

- **[AGENT.md](AGENT.md)** - Fuente unica de reglas compartidas entre modelos
- **[CLAUDE.md](CLAUDE.md)** - Adapter especifico para Claude (referencia a AGENT.md)
- **[copilot-instructions.md](copilot-instructions.md)** - Adapter especifico para GitHub Copilot
- **[CONTEXT-ENGINEERING.md](CONTEXT-ENGINEERING.md)** - Blueprint reusable para otros repositorios

Orden recomendado de lectura:
1. `README.md`
2. `Skill-Catalog.md`
3. `AGENT.md`
4. `copilot-instructions.md` o `CLAUDE.md`
5. `skill/<project>/Skill.md`

---

## 📋 Skills Disponibles

### 1. ✅ Policy Reader API (ACTIVO)

**Descripción:** REST API en Java/Spring Boot para extraer y estructurar datos de pólizas de seguros desde texto libre.

| Aspecto | Detalles |
|---------|----------|
| **Ubicación** | `skill/policy-reader-api/` |
| **Lenguaje** | Java 17+ (Spring Boot 3.3.4) |
| **Tipo** | API REST + Web UI |
| **Estado** | ✅ Production Ready |
| **Última Actualización** | 2026-04-23 |
| **Documentación** | 100% |
| **Tests** | JUnit 5 + MockMvc (80%+ coverage) |

**Contenidos:**
- 📖 [README.md](skill/policy-reader-api/README.md) - Overview ejecutivo
- 📖 [Skill.md](skill/policy-reader-api/Skill.md) - Especificación técnica completa
- 🏗️ [STRUCTURE.md](skill/policy-reader-api/STRUCTURE.md) - Organización interna
- 🤝 [CONTRIBUTING.md](skill/policy-reader-api/CONTRIBUTING.md) - Guía para contribuidores
- 🗺️ [INDEX.md](skill/policy-reader-api/INDEX.md) - Navegación de documentación

**Quick Start:**
```bash
cd skill/policy-reader-api
./scripts/build.cmd            # Windows
./scripts/build.sh             # Linux/Mac
./scripts/run-app.cmd          # Iniciar
# Acceso: http://localhost:8080/swagger-ui.html
```

**Componentes:**
- **API Endpoint:** `POST /api/v1/policies/read` - Extrae datos de pólizas
- **UI Demo:** Web demo con Mapfre branding
- **Swagger UI:** Documentación interactiva
- **Test Suite:** JUnit 5 + Spring MockMvc

**Características:**
- Extracción inteligente de 6 campos
- Reconocimiento de múltiples alias en español
- Cálculo automático de confianza
- Validación de input robusto
- Error handling global consistente

**Tecnología:**
- Spring Boot 3.3.4
- Maven 3.9.9 (Maven Wrapper)
- JUnit 5 + MockMvc
- Springdoc OpenAPI 2.6.0
- Bean Validation

**Scripts Incluidos:**
- `scripts/build.cmd|sh` - Compilar
- `scripts/run-tests.cmd|sh` - Tests
- `scripts/run-app.cmd|sh` - Ejecutar

**Documentación Extendida:**
- [Quick Start (5 min)](skill/policy-reader-api/docs/guides/QUICKSTART.md)
- [Development Guide](skill/policy-reader-api/docs/guides/development-guide.md)
- [Architecture](skill/policy-reader-api/docs/guides/ARCHITECTURE.md)
- [Setup Checklist](skill/policy-reader-api/docs/guides/SETUP_CHECKLIST.md)
- [API Reference](skill/policy-reader-api/docs/api/endpoints.md)

**Test Data:**
- 4+ casos de prueba en [resources/test-data/test-cases.json](skill/policy-reader-api/resources/test-data/test-cases.json)

**Templates:**
- UI Template mejorado en [resources/templates/index-template.html](skill/policy-reader-api/resources/templates/index-template.html)

---

## 🔄 Skills en Desarrollo

| Skill | Descripción | Estimado | Status |
|-------|-------------|----------|--------|
| **... (próximamente)** | Por definir | TBD | 🔄 Planned |

---

## 🚀 Cómo Usar un Skill

### 1. Explorar

```bash
# Ir al skill
cd skill/policy-reader-api

# Leer documentación
cat README.md              # Overview
cat Skill.md               # Especificación completa
cat STRUCTURE.md           # Organización
cat docs/guides/QUICKSTART.md  # Quick start (5 min)
```

### 2. Setup

```bash
# Seguir Quick Start
./scripts/build.cmd        # Compilar
./scripts/run-tests.cmd    # Tests
./scripts/run-app.cmd      # Ejecutar
```

### 3. Entender Arquitectura

```bash
cat docs/guides/ARCHITECTURE.md
```

### 4. Contribuir

```bash
# Leer guía
cat CONTRIBUTING.md

# Crear feature branch
git checkout -b feature/NAME

# Seguir código estándares
# Agregar tests
# Crear PR
```

---

## 📊 Comparativa de Skills

| Skill | Lenguaje | Framework | Tipo | Complejidad |
|-------|----------|-----------|------|------------|
| **Policy Reader** | Java | Spring Boot | API REST | Media |

---

## 🎓 Para Modelos de IA

### Cómo Usar esta Estructura

1. **Busca un skill** en este catálogo
2. **Lee el `Skill.md`** del proyecto (especificación técnica)
3. **Consulta documentación** en carpeta `docs/`
4. **Examina código** en carpeta `src/`
5. **Revisa tests** en carpeta `src/test/`
6. **Executa scripts** en carpeta `scripts/`

### Reutilización

Cada skill está diseñado para ser:
- ✅ **Autosuficiente:** Funciona independientemente
- ✅ **Documentado:** Especificación clara incluida
- ✅ **Testeado:** Tests incluidos
- ✅ **Reproducible:** Scripts de build/test/deploy
- ✅ **Escalable:** Estructura preparada para crecimiento

### Estructura Estándar

Todos los skills siguen este patrón:
```
skill/PROJECT/
├── README.md               # Overview
├── Skill.md                # Especificación técnica
├── CONTRIBUTING.md         # Contribución
├── STRUCTURE.md            # Organización
├── INDEX.md                # Navegación
├── scripts/                # Automatización
├── docs/                   # Documentación técnica
├── resources/              # Test data & templates
├── src/                    # Código fuente
└── test/                   # Tests
```

---

## 🔍 Búsqueda Rápida

| Busco... | Ir a... |
|----------|---------|
| Overview de un skill | `skill/PROJECT/README.md` |
| Especificación técnica | `skill/PROJECT/Skill.md` |
| Setup rápido | `skill/PROJECT/docs/guides/QUICKSTART.md` |
| Arquitectura | `skill/PROJECT/docs/guides/ARCHITECTURE.md` |
| API reference | `skill/PROJECT/docs/api/endpoints.md` |
| Cómo contribuir | `skill/PROJECT/CONTRIBUTING.md` |
| Organización archivos | `skill/PROJECT/STRUCTURE.md` |
| Tests | `skill/PROJECT/src/test/` |
| Scripts | `skill/PROJECT/scripts/` |
| Documentación extendida | `skill/PROJECT/docs/guides/` |

---

## 📈 Estadísticas

| Métrica | Valor |
|---------|-------|
| **Skills Totales** | 1 |
| **Skills Activos** | 1 |
| **Skills en Desarrollo** | 0 |
| **Documentación** | 100% |
| **Scripts Automatizados** | 7+ |
| **Guías Técnicas** | 4+ |

---

## 📋 Crear Nuevo Skill

Para crear un nuevo skill:

1. **Usar template:**
   ```bash
   cp SKILL-TEMPLATE.md skill/NEW-PROJECT/Skill.md
   ```

2. **Crear estructura estándar:**
   ```bash
   mkdir -p skill/NEW-PROJECT/{scripts,docs,resources,src/{main,test}}
   ```

3. **Seguir convenciones:**
   - README.md + Skill.md + docs/ obligatorios
   - scripts/ para automatización
   - Test coverage mínimo 80%

4. **Documentación mínima:**
   - Overview (README)
   - Especificación (Skill.md)
   - Guía de setup
   - Contribuir guide

Ver [SKILL-TEMPLATE.md](SKILL-TEMPLATE.md) para detalles completos.

---

## 🔗 Links Importantes

### En la Raíz
- [README.md](README.md) - Estructura general
- [SKILL-TEMPLATE.md](SKILL-TEMPLATE.md) - Template para nuevos skills
- [Skill-Catalog.md](Skill-Catalog.md) - Este archivo

### Skills Activos
- [policy-reader-api/README.md](skill/policy-reader-api/README.md)
- [policy-reader-api/Skill.md](skill/policy-reader-api/Skill.md)
- [policy-reader-api/CONTRIBUTING.md](skill/policy-reader-api/CONTRIBUTING.md)

---

## 📝 Versionado

| Versión | Fecha | Cambios |
|---------|-------|---------|
| 2.0 | 2026-04-23 | Restructuración a `skill/` centralizado, documentación mejorada |
| 1.0 | 2026-04-22 | Estructura inicial creada |

---

## ❓ FAQ

**P: ¿Cuál es la diferencia entre `skill/` y `skills/`?**  
R: Se renombró a `skill/` (singular) para mayor claridad. Cada proyecto es un skill individual.

**P: ¿Puedo reutilizar un skill en otro proyecto?**  
R: Sí, la estructura está diseñada exactamente para eso. Cada skill es autosuficiente.

**P: ¿Qué documentación es obligatoria?**  
R: Mínimo: `README.md`, `Skill.md`, `CONTRIBUTING.md`. Recomendado: documentación extendida en `docs/`.

**P: ¿Cómo contribuyo?**  
R: Lee `CONTRIBUTING.md` de cada skill. Sigue convenciones de código, agrega tests, crea PR.

---

## 📞 Contacto & Soporte

- 📖 Documentación: Ver `docs/guides/` en cada skill
- 🐛 Issues: Reporta en el repositorio
- 🤝 Contribuciones: Sigue `CONTRIBUTING.md`

---

> **Skill Catalog Version:** 2.0  
> **Last Updated:** 2026-04-23  
> **Status:** ✅ Production Ready
