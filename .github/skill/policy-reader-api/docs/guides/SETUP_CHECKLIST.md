# ✅ Setup & Verification Checklist

Use this checklist to verify your development environment and project setup.

---

## 1️⃣ Prerequisites Verification

- [ ] **Java 17+ installed**
  ```bash
  java -version
  # Expected: openjdk version "17" or higher
  ```

- [ ] **Maven 3.9+ available**
  ```bash
  mvn --version
  # Expected: Apache Maven 3.9.0 or higher
  ```

- [ ] **Git configured**
  ```bash
  git config --global user.name "Your Name"
  git config --global user.email "your@email.com"
  ```

- [ ] **IDE installed** (one of):
  - [ ] IntelliJ IDEA
  - [ ] VS Code + Java Extensions
  - [ ] Eclipse IDE

---

## 2️⃣ Project Setup Verification

- [ ] **Project cloned/accessible**
  ```bash
  cd policy-reader-api
  pwd  # or cd to verify location
  ```

- [ ] **pom.xml present**
  ```bash
  ls pom.xml
  # Expected: file found
  ```

- [ ] **Maven Wrapper present**
  ```bash
  ls mvnw mvnw.cmd
  # Expected: both files found
  ```

- [ ] **Source directories exist**
  ```bash
  # All should exist:
  src/main/java/com/ayesa/idp/policyreader/
  src/main/resources/
  src/test/java/com/ayesa/idp/policyreader/
  ```

---

## 3️⃣ Build Verification

- [ ] **Clean build succeeds**
  ```bash
  .\mvnw clean compile
  # Expected: BUILD SUCCESS
  ```

- [ ] **No compilation errors**
  ```bash
  # Check output for:
  # [ERROR] 0 errors
  # [WARNING] 0 warnings (ideally)
  ```

- [ ] **Dependencies resolved**
  ```bash
  # Check output for:
  # Downloaded all dependencies
  # No connection errors
  ```

- [ ] **Target directory created**
  ```bash
  ls target/classes/
  # Expected: compiled .class files present
  ```

---

## 4️⃣ Testing Verification

- [ ] **All unit tests pass**
  ```bash
  .\mvnw clean test
  # Expected: BUILD SUCCESS
  # Expected: Tests run: X, Failures: 0, Errors: 0
  ```

- [ ] **PolicyReaderControllerTest passes**
  ```bash
  .\mvnw -Dtest=PolicyReaderControllerTest test
  # Expected: BUILD SUCCESS
  ```

- [ ] **PolicyReaderServiceTest passes**
  ```bash
  .\mvnw -Dtest=PolicyReaderServiceTest test
  # Expected: BUILD SUCCESS
  ```

- [ ] **Test reports generated**
  ```bash
  ls target/surefire-reports/
  # Expected: TEST-*.xml files present
  ```

---

## 5️⃣ Application Startup Verification

- [ ] **Application starts without errors**
  ```bash
  .\mvnw spring-boot:run
  # Expected: "Started PolicyReaderApiApplication"
  # Expected: No ERROR in logs
  ```

- [ ] **Port 8080 is available**
  ```bash
  # If error "Address already in use":
  # Kill process: taskkill /PID <PID> /F
  ```

- [ ] **Application responds**
  ```bash
  curl http://localhost:8080/actuator/health
  # Expected: {"status":"UP"}
  ```

---

## 6️⃣ API Endpoint Verification

- [ ] **Swagger UI accessible**
  ```
  Open: http://localhost:8080/swagger-ui.html
  Expected: Swagger interface loads
  ```

- [ ] **OpenAPI spec available**
  ```bash
  curl http://localhost:8080/v3/api-docs | head
  # Expected: JSON with openapi, info, paths
  ```

- [ ] **Endpoint responds correctly**
  ```bash
  curl -X POST http://localhost:8080/api/v1/policies/read \
    -H "Content-Type: application/json" \
    -d '{"rawText":"Aseguradora: Mapfre\nNumero de poliza: POL-2026-1001"}'
  # Expected: JSON response with extracted fields
  ```

- [ ] **Validation errors handled**
  ```bash
  curl -X POST http://localhost:8080/api/v1/policies/read \
    -H "Content-Type: application/json" \
    -d '{}'
  # Expected: 400 Bad Request with error message
  ```

---

## 7️⃣ Project Structure Verification

- [ ] **Scripts directory present**
  ```bash
  ls scripts/
  # Expected: build.cmd, run-tests.cmd, run-app.cmd, etc.
  ```

- [ ] **Documentation directory present**
  ```bash
  ls docs/
  # Expected: api/, guides/ subdirectories
  ```

- [ ] **Resources directory present**
  ```bash
  ls resources/
  # Expected: test-data/, templates/ subdirectories
  ```

- [ ] **Configuration directory present**
  ```bash
  ls config/
  # Expected: configuration-guide.md present
  ```

- [ ] **Skill.md present**
  ```bash
  ls Skill.md
  # Expected: file found
  ```

- [ ] **README.md present**
  ```bash
  ls README.md
  # Expected: file found
  ```

- [ ] **INDEX.md present**
  ```bash
  ls INDEX.md
  # Expected: file found
  ```

---

## 8️⃣ IDE Integration Verification

### If using **IntelliJ IDEA**
- [ ] Project recognized as Maven project
- [ ] SDK configured (Java 17+)
- [ ] Modules recognized
- [ ] Dependencies downloaded in IDE

### If using **VS Code**
- [ ] Extension Installed: Extension Pack for Java
- [ ] Project opens without errors
- [ ] Syntax highlighting works
- [ ] Go to Definition (F12) works

### If using **Eclipse**
- [ ] Project imported as Maven project
- [ ] Build Path configured correctly
- [ ] No build path errors

---

## 9️⃣ Code Quality Verification

- [ ] **Code coverage report**
  ```bash
  .\mvnw jacoco:report
  # Expected: Report at target/site/jacoco/index.html
  # Expected: Coverage >= 80%
  ```

- [ ] **No warnings in build**
  ```bash
  .\mvnw clean compile
  # Check for [WARNING] entries
  # Should be minimal or none
  ```

- [ ] **Code follows standards**
  ```bash
  # Check:
  # - Package naming: com.ayesa.idp.*
  # - Class naming: PascalCase
  # - Method naming: camelCase
  # - No unused imports
  ```

---

## 🔟 Documentation Verification

- [ ] **README.md is readable**
  - [ ] Markdown renders correctly
  - [ ] All links work

- [ ] **Quick Start works**
  ```bash
  # Follow docs/guides/QUICKSTART.md
  # Should complete in ~5 minutes
  ```

- [ ] **Development Guide is complete**
  - [ ] Setup instructions clear
  - [ ] Examples are accurate
  - [ ] Troubleshooting section helpful

- [ ] **API Reference is accurate**
  - [ ] Endpoint specs match actual API
  - [ ] Examples are valid JSON

- [ ] **Architecture Guide is clear**
  - [ ] Diagrams readable
  - [ ] Explanations thorough

---

## ❌ Troubleshooting

### If Build Fails
```bash
# Clean everything
.\mvnw clean

# Purge local cache
.\mvnw dependency:purge-local-repository

# Rebuild
.\mvnw clean install
```

### If Tests Fail
```bash
# Run single test with debug
.\mvnw -Dtest=PolicyReaderServiceTest test -X

# Check test data
cat resources/test-data/test-cases.json
```

### If Application Won't Start
```bash
# Check Java version
java -version

# Check logs
.\mvnw spring-boot:run -X

# Check port
netstat -ano | findstr :8080
```

### If Port is In Use
```bash
# Find process
netstat -ano | findstr :8080

# Kill process (Windows)
taskkill /PID <PID> /F

# Kill process (Linux/Mac)
kill -9 <PID>
```

---

## ✨ Additional Checks

- [ ] **Git repository initialized**
  ```bash
  git status
  # Expected: On branch main (or configured default)
  ```

- [ ] **Environment configured**
  ```bash
  echo %JAVA_HOME%      # Windows
  echo $JAVA_HOME       # Linux/Mac
  # Expected: Path to Java installation
  ```

- [ ] **All scripts executable**
  ```bash
  ls -la scripts/
  # Expected: -rwx- permissions on .sh files
  ```

- [ ] **Configuration files readable**
  ```bash
  cat src/main/resources/application.yml
  # Expected: YAML configuration visible
  ```

---

## 📋 Final Sign-Off

Once all checks pass:

```
✅ Development environment ready
✅ Project builds successfully
✅ All tests pass
✅ Application runs
✅ API responds correctly
✅ Documentation complete
```

You're ready to:
1. Start developing new features
2. Contribute to the project
3. Deploy to different environments

---

## 📞 Getting Help

If any check fails:
1. See [Troubleshooting](development-guide.md#troubleshooting)
2. Review [Quick Start](QUICKSTART.md)
3. Check [Development Guide](development-guide.md)
4. Review [Architecture](ARCHITECTURE.md)

---

> **Checklist Version:** 1.0  
> **Last Updated:** 2026-04-23  
> **Status:** ✅ Ready for Use

