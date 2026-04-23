# IDP GitHub Organization

> **Infrastructure Development Platform - GitHub Configuration & Skills**

---

## 📋 Estructura Organizacional

```
.github/
├── 📁 skill/                           ⭐ SKILLS DEVELOPMENT
│   ├── 📁 policy-reader-api/          (Skill individual - Policy Reader)
│   │   ├── README.md                  (Overview del skill)
│   │   ├── Skill.md                   (Especificación técnica completa)
│   │   ├── CONTRIBUTING.md            (Guía para contribuidores)
│   │   ├── STRUCTURE.md               (Organización interna)
│   │   ├── INDEX.md                   (Navegación)
│   │   ├── 📁 scripts/                (Scripts de automatización)
│   │   ├── 📁 docs/                   (Documentación técnica)
│   │   ├── 📁 resources/              (Test data & templates)
│   │   ├── 📁 config/                 (Configuración)
│   │   └── 📁 src/                    (Código fuente)
│   │
│   ├── Skill.md                       (Especificación del skill anterior)
│   └── SUMMARY.md                     (Resumen de cambios)
│
├── 📄 Skill-Catalog.md                ⭐ CATÁLOGO DE TODOS LOS SKILLS
├── 📄 SKILL-TEMPLATE.md               📋 Template para nuevos skills
├── 📄 AGENT.md                        🤖 Contexto global para agentes LLM
├── 📄 CLAUDE.md                       🤖 Adapter especifico para Claude
├── 📄 CONTEXT-ENGINEERING.md          🧭 Blueprint reutilizable
├── 📄 README.md                       📖 Este archivo
│
├── 📁 java-upgrade/                   (Logs de upgrades Java)
├── copilot-instructions.md            (Instrucciones Copilot)
└── dependabot.yml                     (Configuración Dependabot)
```

---

## ✨ Componentes Principales

### 1. **Directorio `skill/` - Skills Reutilizables**

Contiene proyectos individuales de **Skills** que pueden reutilizarse en otros proyectos IDP.

Cada skill tiene su propia estructura:
```
skill/PROJECT/
├── README.md                          Overview del proyecto
├── Skill.md                           Especificación técnica completa
├── CONTRIBUTING.md                    Cómo contribuir
├── STRUCTURE.md                       Organización de archivos
├── INDEX.md                           Navegación de documentación
├── scripts/                           Scripts de automatización
├── docs/                              Documentación técnica
├── resources/                         Test data y templates
├── config/                            Configuración
├── src/                               Código fuente
├── test/                              Tests
└── pom.xml (Maven) / package.json (Node) / etc.
```

### 2. **Skill-Catalog.md - Catálogo de Disponibles**

Documento central que lista todos los skills disponibles y su estado.

**Uso:** Para descubrir qué skills existen y cómo usarlos.

### 3. **SKILL-TEMPLATE.md - Template para Nuevos Skills**

Template estándar para crear nuevos skills siguiendo las convenciones.

**Uso:** Base para crear skills nuevos con estructura consistente.

---

## 🎯 ¿Cuál es la Estructura Ideal para IA?

### Principios de Diseño

1. **Claridad Jerárquica**
   - Estructura clara en carpetas
   - Nombres descriptivos
   - Navegación obvia

2. **Documentación Centralizada**
   - README.md en cada nivel
   - Spec técnica principal
   - Guías de contribución

3. **Reutilización**
   - Templates claros
   - Catálogos centralizados
   - Convenciones documentadas

4. **Contexto Completo**
   - README + Skill.md + docs/
   - Scripts de ejemplo
   - Test data incluido

---

## 📚 Documentación Principal

### En la Raíz (`.github/`)
- **[README.md](README.md)** - Este archivo (descripción general)
- **[Skill-Catalog.md](Skill-Catalog.md)** - Catálogo de skills disponibles
- **[SKILL-TEMPLATE.md](SKILL-TEMPLATE.md)** - Template para nuevos skills
- **[AGENT.md](AGENT.md)** - Reglas globales de contexto para cualquier LLM
- **[CLAUDE.md](CLAUDE.md)** - Delta especifico para Claude
- **[CONTEXT-ENGINEERING.md](CONTEXT-ENGINEERING.md)** - Blueprint portable para otros repos

### Por Skill
Cada skill en `skill/PROJECT/`:
- **[README.md](skill/policy-reader-api/README.md)** - Overview ejecutivo
- **[Skill.md](skill/policy-reader-api/Skill.md)** - Especificación completa
- **[STRUCTURE.md](skill/policy-reader-api/STRUCTURE.md)** - Organización interna
- **[CONTRIBUTING.md](skill/policy-reader-api/CONTRIBUTING.md)** - Cómo contribuir
- **[docs/](skill/policy-reader-api/docs/)** - Documentación técnica
- **[scripts/](skill/policy-reader-api/scripts/)** - Scripts de automatización

---

## 🚀 Quick Start

### Explorar Skills Disponibles
```bash
# Ver catálogo
cat Skill-Catalog.md

# Ver skill específico (Policy Reader)
cat skill/policy-reader-api/README.md
```

### Crear Nuevo Skill
```bash
# Usar template como base
cp SKILL-TEMPLATE.md skill/NEW-PROJECT/Skill.md

# Adaptar estructura
mkdir -p skill/NEW-PROJECT/{scripts,docs,resources,src}
```

### Entender Estructura
```bash
# Ver organización
cat skill/policy-reader-api/STRUCTURE.md

# Ver guía de contribución
cat skill/policy-reader-api/CONTRIBUTING.md
```

---

## 📋 Skills Disponibles

| Skill | Estado | Descripción | Ubicación |
|-------|--------|-------------|-----------|
| **Policy Reader API** | ✅ Active | API REST para extracción de datos de pólizas | `skill/policy-reader-api/` |
| (más skills a venir) | 🔄 Planned | ... | ... |

**Ver también:** [Skill-Catalog.md](Skill-Catalog.md) para lista completa y actualizaciones.

---

## 🏗️ Convenciones de Proyecto

### Nomenclatura
- Directorios: `kebab-case` (ej: `policy-reader-api`)
- Archivos principales: `Skill.md`, `README.md`, etc.
- Branches: `feature/NAME`, `fix/NAME`, `docs/NAME`

### Documentación
- Cada skill tiene `Skill.md` como especificación primaria
- Guía `CONTRIBUTING.md` para desarrolladores
- `scripts/` para automatización reproducible
- `docs/` para documentación técnica extendida

### Estructura de Carpetas
Consistente en todos los skills:
```
scripts/              - Automatización (build, test, deploy)
docs/                 - Documentación (guides, API ref)
resources/            - Test data & templates
config/               - Configuración (profiles, vars)
src/                  - Código fuente (main/test)
```

---

## 🤖 Para Modelos de IA

### Contexto Recomendado

1. **Primero:** Lee `README.md` (este archivo)
2. **Luego:** Lee `Skill-Catalog.md` para ver skills disponibles
3. **Global:** Lee `AGENT.md` para reglas de contexto comunes
4. **Adapter:** Lee `copilot-instructions.md` o `CLAUDE.md` segun el modelo
5. **Por skill:** Lee `skill/PROJECT/Skill.md`
6. **Si contribuyes:** Lee `skill/PROJECT/CONTRIBUTING.md`

### Reusabilidad

Los skills están diseñados para ser reutilizables:
- Estructura estándar en todos
- Documentación consistente
- Scripts de build/test inclusif
- Test data y templates incluidos

### Buscar Información

- **Estructura:** Consulta `STRUCTURE.md` de cada skill
- **API/Endpoints:** Consulta `docs/api/` de cada skill
- **Setup:** Consulta `docs/guides/` de cada skill
- **Catálogo:** Consulta `Skill-Catalog.md` en raíz

---

## 📞 Navegación Rápida

| Necesito... | Ir a... |
|------------|---------|
| Ver todos los skills | [Skill-Catalog.md](Skill-Catalog.md) |
| Entender estructura | [skill/policy-reader-api/STRUCTURE.md](skill/policy-reader-api/STRUCTURE.md) |
| Setup de desarrollo | [skill/policy-reader-api/docs/guides/QUICKSTART.md](skill/policy-reader-api/docs/guides/QUICKSTART.md) |
| Contribuir | [skill/policy-reader-api/CONTRIBUTING.md](skill/policy-reader-api/CONTRIBUTING.md) |
| Crear skill nuevo | [SKILL-TEMPLATE.md](SKILL-TEMPLATE.md) |
| API reference | [skill/policy-reader-api/docs/api/endpoints.md](skill/policy-reader-api/docs/api/endpoints.md) |

---

## 🎓 Concepto: Skills

Un **Skill** es un proyecto reutilizable que:

✅ Tiene especificación clara (`Skill.md`)  
✅ Incluye código fuente documentado  
✅ Contiene tests automatizados  
✅ Proporciona scripts reproducibles  
✅ Se puede reutilizar en otros proyectos IDP  

---

## 📊 Métricas Estructura

| Aspecto | Valor |
|--------|-------|
| **Skills Activos** | 1 (Policy Reader API) |
| **Documentación** | 15+ archivos `.md` |
| **Guías Disponibles** | 5+ (QuickStart, Architecture, etc.) |
| **Scripts de Automatización** | 7+ (build, test, deploy) |
| **Estructura Consistente** | ✅ Sí |
| **IA-Friendly** | ✅ Optimizado |

---

## 🔗 Links Importantes

- **[Skill-Catalog.md](Skill-Catalog.md)** - Catálogo de skills
- **[AGENT.md](AGENT.md)** - Contexto global LLM
- **[CONTEXT-ENGINEERING.md](CONTEXT-ENGINEERING.md)** - Estructura reutilizable
- **[skill/policy-reader-api/README.md](skill/policy-reader-api/README.md)** - Skill principal
- **[skill/policy-reader-api/Skill.md](skill/policy-reader-api/Skill.md)** - Especificación técnica
- **[SKILL-TEMPLATE.md](SKILL-TEMPLATE.md)** - Template para nuevos

---

## 📝 Última Actualización

- **Fecha:** 2026-04-23
- **Cambios:** Restructuración completa a modelo `skill/` con documentación centralizada
- **Estado:** ✅ Listo para uso

---

> **GitHub Organization:** IDP | **Version:** 2.0 | **Status:** ✅ Production Ready
