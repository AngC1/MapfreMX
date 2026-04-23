# Skill Template — [PROJECT_NAME]

> **Última actualización:** [YYYY-MM-DD]  
> **Skill Version:** 1.0  
> **Status:** 🔄 [DEVELOPMENT/BETA/PRODUCTION]

---

## 🎯 Descripción Ejecutiva

**[Breve descripción del propósito del proyecto - 2-3 líneas]**

Ejemplo: "Skill de implementación y mantenimiento para `policy-reader-api`: API REST en Java (Spring Boot) que recibe el texto libre de una póliza y devuelve una estructura JSON con los campos clave extraídos."

---

## 🏗️ Estructura del Proyecto

```
[PROJECT_NAME]/
├── README.md                    # Overview ejecutivo
├── Skill.md                     # Especificación técnica (este archivo)
├── CONTRIBUTING.md              # Guía para contribuidores
├── STRUCTURE.md                 # Organización interna de archivos
├── INDEX.md                     # Navegación de documentación
│
├── 📁 scripts/                  # Scripts de automatización
│   ├── README.md
│   ├── build.cmd / build.sh
│   ├── run-tests.cmd / run-tests.sh
│   └── run-app.cmd / run-app.sh
│
├── 📁 resources/                # Test data & templates
│   ├── test-data/
│   │   ├── README.md
│   │   └── test-cases.json
│   └── templates/
│       ├── README.md
│       └── templates...
│
├── 📁 docs/                     # Documentación técnica
│   ├── api/
│   │   └── endpoints.md
│   └── guides/
│       ├── QUICKSTART.md
│       ├── development-guide.md
│       ├── ARCHITECTURE.md
│       ├── SETUP_CHECKLIST.md
│       └── ...
│
├── 📁 config/                   # Configuración
│   └── configuration-guide.md
│
├── 📁 src/                      # Código fuente
│   ├── main/
│   └── test/
│
└── [BUILD_FILE]                 # pom.xml (Maven) / package.json (Node) / etc.
```

---

## 🛠️ Stack Tecnológico

| Componente | Tecnología | Versión | Propósito |
|-----------|-----------|---------|----------|
| **[Component]** | [Technology] | [Version] | [Purpose] |

**Ejemplo:**
| Lenguaje | Java | 17+ | Compilación & Runtime |
| Framework | Spring Boot | 3.3.4 | REST API & MVC |
| Build Tool | Maven | 3.9.9 | Dependency management |
| Testing | JUnit 5 | Latest | Unit testing |

---

## 🚀 Quick Start

### Prerequisites
- [Requirement 1]
- [Requirement 2]
- [Requirement 3]

### Setup (5 minutes)
```bash
# 1. Build
./scripts/build.cmd          # Windows
./scripts/build.sh           # Linux/Mac

# 2. Test
./scripts/run-tests.cmd
./scripts/run-tests.sh

# 3. Run
./scripts/run-app.cmd
./scripts/run-app.sh

# Access: [URL if applicable]
# http://localhost:8080
```

Más detalles: [QUICKSTART.md](docs/guides/QUICKSTART.md)

---

## 📋 Funcionalidad Principal

### [Feature 1]
**Descripción:** [What it does]

**Ejemplo:** Endpoint para extraer datos de pólizas
```
POST /api/v1/[resource]
Request: {...}
Response: {...}
```

### [Feature 2]
[More features...]

---

## 📖 Documentación

### Documentos Principales
| Documento | Descripción | Tiempo |
|-----------|-------------|--------|
| [README.md](README.md) | Overview del proyecto | 3 min |
| [Skill.md](Skill.md) | Especificación técnica (este archivo) | 10 min |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Guía para contribuidores | 10 min |

### Guías Técnicas
| Documento | Descripción | Tiempo |
|-----------|-------------|--------|
| [QUICKSTART.md](docs/guides/QUICKSTART.md) | Setup en 5 minutos | 5 min |
| [development-guide.md](docs/guides/development-guide.md) | Guía de desarrollo completa | 20 min |
| [ARCHITECTURE.md](docs/guides/ARCHITECTURE.md) | Diseño del sistema | 15 min |
| [SETUP_CHECKLIST.md](docs/guides/SETUP_CHECKLIST.md) | Verificación de setup | 10 min |

### Referencias Técnicas
| Documento | Descripción |
|-----------|-------------|
| [endpoints.md](docs/api/endpoints.md) | API endpoints |
| [configuration-guide.md](config/configuration-guide.md) | Configuración |
| [STRUCTURE.md](STRUCTURE.md) | Organización de archivos |

---

## 🧪 Testing

### Unit Tests
**Ubicación:** `src/test/`

**Cobertura Mínima:** 80%

```bash
# Ejecutar tests
./mvnw clean test

# Con cobertura
./mvnw jacoco:report
```

### Test Data
**Ubicación:** `resources/test-data/test-cases.json`

Incluye [número] casos de prueba.

---

## 🔧 Desarrollo

### Standards de Código
- [Language conventions]
- [Naming standards]
- [Code organization]
- [Comment requirements]

**Ver:** [development-guide.md](docs/guides/development-guide.md#coding-standards)

### Workflow
1. Create feature branch
2. Implement feature
3. Add tests
4. Update documentation
5. Create Pull Request

**Detalles:** [CONTRIBUTING.md](CONTRIBUTING.md)

---

## 📦 Dependencias

### [Language] Specific
```xml
<!-- Main -->
<dependency>...</dependency>

<!-- Testing -->
<dependency>...</dependency>
```

Ver [pom.xml](pom.xml) para lista completa.

---

## 🚀 Deployment

### Local JAR
```bash
./mvnw clean package
java -jar target/[app-name].jar
```

### Docker
```bash
./mvnw clean package
docker build -t [project-name]:latest .
docker run -p 8080:8080 [project-name]:latest
```

### Profiles
```bash
# Development
java -Dspring.profiles.active=dev -jar app.jar

# Production
java -Dspring.profiles.active=prod -jar app.jar
```

---

## 📊 Project Metrics

| Métrica | Valor |
|---------|-------|
| **Files** | [X] |
| **Lines of Code** | [X] |
| **Test Coverage** | [X]% |
| **Documentation** | [100]% |
| **Build Time** | [X]s |

---

## 🎯 Roadmap

- [ ] [Feature 1]
- [ ] [Feature 2]
- [ ] [Feature 3]

---

## 📝 Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | [YYYY-MM-DD] | Initial release |

---

## 🤝 Contributing

We welcome contributions! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

### Quick Links
- [Development Guide](docs/guides/development-guide.md)
- [Code Standards](docs/guides/development-guide.md#coding-standards)
- [Testing Requirements](docs/guides/development-guide.md#testing-requirements)

---

## 📞 Support

- 📖 **Documentation:** See [docs/](docs/) folder
- 🐛 **Issues:** Report on GitHub
- 💬 **Discussions:** Use GitHub Discussions
- 🤝 **Contributing:** See [CONTRIBUTING.md](CONTRIBUTING.md)

---

## 📄 License

[Specify License - e.g., MIT License]

---

## 🔗 Related Files

- [README.md](README.md) - Project overview
- [STRUCTURE.md](STRUCTURE.md) - File organization
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guide
- [INDEX.md](INDEX.md) - Navigation guide

---

## ✨ Version Info

| Item | Value |
|------|-------|
| **Skill Version** | 1.0 |
| **Last Updated** | [YYYY-MM-DD] |
| **Status** | 🔄 [DEVELOPMENT/BETA/PRODUCTION] |
| **Maintainer** | [Team/Person Name] |

---

> **Project:** [PROJECT_NAME] | **Version:** 1.0 | **Status:** 🔄 Development

---

## 📋 How to Use This Template

1. **Copy this file** to your new skill project as `Skill.md`
2. **Replace placeholders:**
   - `[PROJECT_NAME]` → Your project name
   - `[YYYY-MM-DD]` → Current date
   - `[Component]` → Your components
   - `[Feature 1]` → Your features
   - All `[...]` placeholders

3. **Keep structure** consistent with other skills
4. **Update as you go** - don't let docs get stale
5. **Link to other docs** appropriately
6. **Maintain this template** for consistency

---

**Template Version:** 1.0 | **Last Updated:** 2026-04-23
