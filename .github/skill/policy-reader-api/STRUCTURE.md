# 🏗️ Project Structure - Complete Overview

## Directory Tree

```
policy-reader-api/
│
├── 📄 README.md                          ⭐ START HERE - Overview
├── 📄 Skill.md                          ⭐ MAIN REFERENCE - Complete spec
├── 📄 CONTRIBUTING.md                    📝 How to contribute
├── 📄 INDEX.md                           🗺️ Navigation guide
├── 📄 STRUCTURE.md                       📊 This file
│
├── 📁 src/
│   ├── main/
│   │   ├── java/com/ayesa/idp/policyreader/
│   │   │   ├── PolicyReaderApiApplication.java       (Main entry point)
│   │   │   │
│   │   │   ├── 📁 api/                              (HTTP Layer)
│   │   │   │   ├── PolicyReaderController.java       (REST endpoints)
│   │   │   │   ├── PolicyReadRequest.java            (Request DTO)
│   │   │   │   ├── PolicyReadRequest.java            (Response DTO)
│   │   │   │   └── ApiExceptionHandler.java          (Error handling)
│   │   │   │
│   │   │   └── 📁 application/                      (Business Logic)
│   │   │       ├── PolicyReaderService.java          (Core logic)
│   │   │       └── PolicyReadResult.java             (Response model)
│   │   │
│   │   └── resources/
│   │       ├── application.yml                       (Spring config)
│   │       └── static/index.html                     (Web UI)
│   │
│   └── test/
│       └── java/com/ayesa/idp/policyreader/
│           ├── 📁 api/
│           │   └── PolicyReaderControllerTest.java   (Controller tests)
│           │
│           └── 📁 application/
│               └── PolicyReaderServiceTest.java      (Service tests)
│
├── 📁 scripts/                           🔧 Build & Deployment Scripts
│   ├── README.md                         (Scripts documentation)
│   ├── build.cmd / build.sh              (Compile project)
│   ├── run-tests.cmd / run-tests.sh      (Execute tests)
│   ├── run-app.cmd / run-app.sh          (Start app)
│   └── (more automation scripts)
│
├── 📁 resources/                         📦 Test Data & Templates
│   │
│   ├── 📁 test-data/                    (Test Fixtures)
│   │   ├── README.md                     (Test data guide)
│   │   └── test-cases.json               (4+ test scenarios)
│   │
│   └── 📁 templates/                    (Reusable Templates)
│       ├── README.md                     (Template guide)
│       ├── index-template.html           (Enhanced UI template)
│       └── (email, config templates...)
│
├── 📁 docs/                              📚 Documentation
│   │
│   ├── 📁 api/                          (API Reference)
│   │   └── endpoints.md                  (Endpoint specifications)
│   │
│   └── 📁 guides/                       (Development Guides)
│       ├── QUICKSTART.md                 ⭐ 5-minute setup
│       ├── development-guide.md          📖 Full dev guide
│       ├── ARCHITECTURE.md               🏗️ System design
│       ├── SETUP_CHECKLIST.md            ✅ Verification checklist
│       └── (additional guides...)
│
├── 📁 config/                            ⚙️ Configuration Files
│   └── configuration-guide.md            (Environment setup)
│
├── 📁 target/                            (Build Output - Generated)
│   ├── classes/                          (Compiled classes)
│   ├── test-classes/                     (Compiled tests)
│   ├── surefire-reports/                 (Test reports)
│   ├── generated-sources/                (Generated code)
│   └── (build artifacts...)
│
├── pom.xml                               Maven project config
├── mvnw                                  Maven wrapper (Linux/Mac)
├── mvnw.cmd                              Maven wrapper (Windows)
├── run-api.ps1                           PowerShell startup script
└── .gitignore                            Git ignore rules
```

---

## File Organization by Purpose

### 📌 Documentation Files

| File | Purpose | Read Time | Audience |
|------|---------|-----------|----------|
| [README.md](README.md) | Project overview & quick links | 3 min | Everyone |
| [Skill.md](Skill.md) | Complete technical specification | 10 min | Developers |
| [CONTRIBUTING.md](CONTRIBUTING.md) | How to contribute | 10 min | Contributors |
| [INDEX.md](INDEX.md) | Navigation guide | 2 min | Everyone |
| [STRUCTURE.md](STRUCTURE.md) | This file - file organization | 5 min | Everyone |

### 🚀 Quick Start Files

| File | Purpose | Read Time |
|------|---------|-----------|
| [docs/guides/QUICKSTART.md](docs/guides/QUICKSTART.md) | Get running in 5 min | 5 min |
| [docs/guides/SETUP_CHECKLIST.md](docs/guides/SETUP_CHECKLIST.md) | Verify your setup | 10 min |

### 📖 Technical Documentation

| File | Purpose | Read Time | Audience |
|------|---------|-----------|----------|
| [docs/guides/development-guide.md](docs/guides/development-guide.md) | Setup & development standards | 20 min | Developers |
| [docs/guides/ARCHITECTURE.md](docs/guides/ARCHITECTURE.md) | System architecture & design | 15 min | Architects/Senior devs |
| [docs/api/endpoints.md](docs/api/endpoints.md) | API endpoint reference | 5 min | API consumers |
| [config/configuration-guide.md](config/configuration-guide.md) | Configuration & profiles | 10 min | DevOps/Deployment |

### 📁 Source Code Organization

```
src/main/java/com/ayesa/idp/policyreader/
├── PolicyReaderApiApplication.java       (1 file)
├── api/
│   ├── PolicyReaderController.java       (HTTP endpoints)
│   ├── PolicyReadRequest.java            (Input validation)
│   ├── PolicyReadResult.java             (Response data)
│   └── ApiExceptionHandler.java          (Error handling)
└── application/
    ├── PolicyReaderService.java          (Business logic)
    └── PolicyReadResult.java             (Response model)
```

**Layer Responsibilities:**
- **api/:** HTTP handling, input validation
- **application/:** Business logic, data extraction
- **No persistence layer:** Stateless service

### 🧪 Test Code Organization

```
src/test/java/com/ayesa/idp/policyreader/
├── api/
│   └── PolicyReaderControllerTest.java   (HTTP tests)
└── application/
    └── PolicyReaderServiceTest.java      (Business logic tests)
```

**Coverage Target:** 80%+

### 🔧 Scripts Organization

```
scripts/
├── README.md                   (Scripts guide)
├── build.cmd / build.sh        (Compilation)
├── run-tests.cmd / run-tests.sh (Unit tests)
├── run-app.cmd / run-app.sh    (Start app)
└── (deployment, cleanup scripts)
```

**Usage:** `cd scripts && .\build.cmd` (Windows) or `./build.sh` (Linux/Mac)

### 📦 Resources Organization

```
resources/
├── test-data/
│   ├── README.md               (Guide)
│   └── test-cases.json         (4+ fixtures)
│
└── templates/
    ├── README.md               (Guide)
    ├── index-template.html     (Enhanced UI)
    └── (other templates)
```

### 📚 Documentation Organization

```
docs/
├── api/
│   └── endpoints.md            (API specification)
│
└── guides/
    ├── QUICKSTART.md           (5 min setup)
    ├── development-guide.md    (Full guide)
    ├── ARCHITECTURE.md         (System design)
    ├── SETUP_CHECKLIST.md      (Verification)
    └── (additional guides)
```

### ⚙️ Configuration Organization

```
config/
└── configuration-guide.md      (Environment setup)
```

---

## Size & Metrics

| Component | Files | Lines | Purpose |
|-----------|-------|-------|---------|
| **Source Code** | 6 | ~800 | Application logic |
| **Tests** | 2 | ~400 | Unit testing |
| **Documentation** | 10+ | ~3000 | Guides & references |
| **Scripts** | 7 | ~200 | Automation |
| **Config** | 1 | ~50 | Application config |
| **Resources** | 6 | ~500 | Test data & templates |

---

## Dependencies Between Files

### Documentation Dependencies
```
README.md
├─→ Skill.md (detailed reference)
├─→ QUICKSTART.md (quick setup)
└─→ CONTRIBUTING.md (how to help)

Skill.md
├─→ development-guide.md
├─→ ARCHITECTURE.md
├─→ endpoints.md
├─→ configuration-guide.md
└─→ test-cases.json
```

### Code Dependencies
```
PolicyReaderApiApplication
├─→ PolicyReaderController
│   ├─→ PolicyReaderService
│   ├─→ PolicyReadRequest
│   └─→ ApiExceptionHandler
│
PolicyReaderService
└─→ PolicyReadResult
```

### Test Dependencies
```
PolicyReaderControllerTest
├─→ PolicyReaderController
└─→ test-cases.json

PolicyReaderServiceTest
├─→ PolicyReaderService
└─→ test-cases.json
```

---

## File Ownership & Maintenance

### Core Logic
- `src/main/java/` - Keep stable
- `src/test/java/` - Update with code changes
- `src/main/resources/application.yml` - Configuration

### Documentation
- `README.md` - Keep current
- `Skill.md` - Primary reference
- `docs/guides/` - Development guides
- `docs/api/` - API specification

### Resources
- `resources/test-data/` - Test fixtures
- `resources/templates/` - Reusable templates
- `scripts/` - Automation scripts

### Configuration
- `config/configuration-guide.md` - Environment setup
- `pom.xml` - Dependencies

---

## Quick Navigation Map

```
Want to...                              See...
─────────────────────────────────────────────────────
Understand the project                  README.md
See technical spec                      Skill.md
Get running quickly                     QUICKSTART.md
Learn architecture                      ARCHITECTURE.md
Set up development                      development-guide.md
Check configuration                     configuration-guide.md
Write tests                             development-guide.md
Contribute code                         CONTRIBUTING.md
Verify environment                      SETUP_CHECKLIST.md
Build/deploy                            scripts/README.md
Use test data                           resources/test-data/
Use templates                           resources/templates/
Check API endpoints                     docs/api/endpoints.md
Understand file layout                  STRUCTURE.md (this file)
```

---

## 🎯 Best Practices for Navigation

1. **New to project?**
   - Start: README.md → Skill.md → QUICKSTART.md

2. **Setting up development?**
   - Follow: QUICKSTART.md → SETUP_CHECKLIST.md

3. **Contributing code?**
   - Read: CONTRIBUTING.md → development-guide.md → ARCHITECTURE.md

4. **Deploying?**
   - Use: configuration-guide.md → scripts/README.md

5. **Troubleshooting?**
   - Check: development-guide.md#troubleshooting → SETUP_CHECKLIST.md

6. **API questions?**
   - See: docs/api/endpoints.md → Swagger UI (http://localhost:8080/swagger-ui.html)

---

## 📊 Version & Status

| Item | Value |
|------|-------|
| **Skill Version** | 2.0 |
| **Structure Version** | 1.0 |
| **Last Updated** | 2026-04-23 |
| **Total Files** | 30+ |
| **Total Lines** | 5000+ |
| **Status** | ✅ Complete |

---

## 🔗 Related Files

- [README.md](README.md) - Overview
- [Skill.md](Skill.md) - Specification
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guide
- [INDEX.md](INDEX.md) - Navigation index
- [docs/guides/QUICKSTART.md](docs/guides/QUICKSTART.md) - Quick setup

---

> **Version:** 1.0  
> **Last Updated:** 2026-04-23  
> **Status:** ✅ Ready to Use

