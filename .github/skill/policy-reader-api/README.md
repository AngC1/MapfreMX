# 📋 Policy Reader API

> Extract and structure insurance policy data from free-text descriptions using Spring Boot REST API.

[![Java](https://img.shields.io/badge/Java-17%2B-blue)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.4-brightgreen)](https://spring.io/projects/spring-boot)
[![Maven](https://img.shields.io/badge/Maven-3.9.9-red)](https://maven.apache.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

---

## 🚀 Quick Start

**Get running in 5 minutes:**

```bash
# 1. Build
.\scripts\build.cmd

# 2. Test
.\scripts\run-tests.cmd

# 3. Run
.\scripts\run-app.cmd

# 4. Access: http://localhost:8080/swagger-ui.html
```

📖 Detailed guide: [Quick Start](docs/guides/QUICKSTART.md)

---

## ✨ Features

- ✅ Extract policy fields from free-text descriptions
- ✅ Support for multiple field name aliases (Spanish)
- ✅ Confidence scoring and missing fields detection
- ✅ REST API with OpenAPI/Swagger documentation
- ✅ Bean Validation for input validation
- ✅ Comprehensive unit tests (80%+ coverage)
- ✅ Web demo UI with Mapfre branding
- ✅ Professional project structure

---

## 📋 API Overview

### POST `/api/v1/policies/read`
Extract policy data from text.

**Request:**
```json
{
  "rawText": "Aseguradora: Mapfre\nNumero de poliza: POL-2026-1001\nTomador: Laura Gomez"
}
```

**Response:**
```json
{
  "policyNumber": "POL-2026-1001",
  "insurerName": "Mapfre",
  "holderName": "Laura Gomez",
  "productName": null,
  "effectiveFrom": null,
  "effectiveTo": null,
  "confidence": 0.5,
  "missingFields": ["productName", "effectiveFrom", "effectiveTo"]
}
```

Full API docs: [endpoints.md](docs/api/endpoints.md)

---

## 🏗️ Project Structure

```
policy-reader-api/
├── src/
│   ├── main/java/com/ayesa/idp/policyreader/  # Source code
│   └── test/java/com/ayesa/idp/policyreader/  # Unit tests
├── scripts/                                     # Build scripts
├── resources/                                   # Test data & templates
├── docs/                                        # Documentation
├── config/                                      # Configuration
└── Skill.md                                    # Main documentation
```

Detailed structure: [Skill.md - Project Structure](Skill.md#-estructura-del-proyecto)

---

## 🛠️ Technology Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| Language | Java | 17+ |
| Framework | Spring Boot | 3.3.4 |
| Build | Maven Wrapper | 3.9.9 |
| Testing | JUnit 5 + MockMvc | Latest |
| API Docs | Springdoc OpenAPI | 2.6.0 |
| Frontend | HTML5 + CSS + Vanilla JS | 2024 |

---

## 📚 Documentation

- **[INDEX.md](INDEX.md)** - Navigation guide
- **[Skill.md](Skill.md)** - Complete skill documentation
- **[Quick Start](docs/guides/QUICKSTART.md)** - 5-minute setup
- **[Development Guide](docs/guides/development-guide.md)** - Full development guide
- **[API Reference](docs/api/endpoints.md)** - Endpoint specifications
- **[Configuration](config/configuration-guide.md)** - Environment setup
- **[Scripts](scripts/README.md)** - Available scripts

---

## 🧪 Testing

```bash
# Run all tests
.\mvnw clean test

# Run specific test
.\mvnw -Dtest=PolicyReaderServiceTest test

# With code coverage
.\mvnw clean test jacoco:report
# Report: target/site/jacoco/index.html
```

Test data: [test-cases.json](resources/test-data/test-cases.json)

---

## 🔧 Common Commands

| Command | Purpose |
|---------|---------|
| `.\scripts\build.cmd` | Compile project |
| `.\scripts\run-tests.cmd` | Run unit tests |
| `.\scripts\run-app.cmd` | Start application |
| `.\mvnw clean package` | Build JAR |
| `.\mvnw spring-boot:run` | Run with Maven |

More commands: [Scripts Guide](scripts/README.md)

---

## 🚀 Deployment

### Local JAR
```bash
.\mvnw clean package
java -jar target/policy-reader-api-0.0.1-SNAPSHOT.jar
```

### Docker (Ready)
```bash
# Build image
docker build -t policy-reader-api .

# Run container
docker run -p 8080:8080 policy-reader-api
```

### Environment Profiles
```bash
# Development
java -Dspring.profiles.active=dev -jar app.jar

# Production
java -Dspring.profiles.active=prod -jar app.jar
```

See [Configuration Guide](config/configuration-guide.md) for details.

---

## 🎨 Web UI

Access the demo web interface:
- **URL:** `http://localhost:8080`
- **Swagger UI:** `http://localhost:8080/swagger-ui.html`
- **OpenAPI Spec:** `http://localhost:8080/v3/api-docs`

Custom UI template: [index-template.html](resources/templates/index-template.html)

---

## 📈 Performance

- Response time: < 100ms per request
- Throughput: > 1000 req/sec on standard hardware
- Memory footprint: ~128MB minimal heap
- CPU: Single core sufficient for development

Optimize with: [Configuration Guide](config/configuration-guide.md)

---

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/name`
2. Follow [Coding Standards](docs/guides/development-guide.md#coding-standards)
3. Add tests for new functionality
4. Ensure all tests pass: `.\mvnw clean test`
5. Submit pull request

---

## ❓ Troubleshooting

**Port 8080 already in use?**
```bash
# Find process
netstat -ano | findstr :8080

# Kill process
taskkill /PID <PID> /F
```

**Maven build fails?**
```bash
.\mvnw clean
.\mvnw dependency:purge-local-repository
.\mvnw clean install
```

More help: [Troubleshooting Guide](docs/guides/development-guide.md#troubleshooting)

---

## 📝 License

MIT License - See LICENSE file for details

---

## 📞 Support

- 📖 **Documentation:** [INDEX.md](INDEX.md)
- 🐛 **Issues:** See [Troubleshooting](docs/guides/development-guide.md#troubleshooting)
- 📧 **Questions:** Check [Development Guide](docs/guides/development-guide.md)

---

## 🗂️ Project Info

| Item | Value |
|------|-------|
| **Skill Version** | 2.0 |
| **Last Updated** | 2026-04-23 |
| **Status** | ✅ Active |
| **Test Coverage** | 80%+ |
| **Java Target** | 17+ |

---

## 🔗 Quick Links

- [Local API](http://localhost:8080)
- [Swagger UI](http://localhost:8080/swagger-ui.html)
- [Development Guide](docs/guides/development-guide.md)
- [API Reference](docs/api/endpoints.md)
- [Configuration Guide](config/configuration-guide.md)
- [Scripts Guide](scripts/README.md)

---

**Ready to start?** → Read [Quick Start](docs/guides/QUICKSTART.md)

---

Made with ❤️ by Team IDP | Mapfre 🏢

