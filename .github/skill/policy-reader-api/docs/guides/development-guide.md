# Development Guide - Policy Reader API

## Setting Up Your Development Environment

### Prerequisites
- Java 17+ (validated with Java 21)
- Maven 3.9.0+ (Maven Wrapper included)
- IDE: IntelliJ IDEA / VS Code / Eclipse
- Git

### First Time Setup

1. **Clone or navigate to the project:**
```bash
cd policy-reader-api
```

2. **Build the project:**
```bash
# Windows
.\scripts\build.cmd

# Linux/Mac
./scripts/build.sh
```

3. **Run unit tests:**
```bash
# Windows
.\scripts\run-tests.cmd

# Linux/Mac
./scripts/run-tests.sh
```

4. **Start the application:**
```bash
# Windows
.\scripts\run-app.cmd

# Linux/Mac
./scripts/run-app.sh
```

The API will be available at: `http://localhost:8080`

## Project Structure

```
policy-reader-api/
├── src/
│   ├── main/
│   │   ├── java/com/ayesa/idp/policyreader/
│   │   │   ├── PolicyReaderApiApplication.java      # Main entry point
│   │   │   ├── api/
│   │   │   │   ├── ApiExceptionHandler.java         # Global exception handling
│   │   │   │   ├── PolicyReaderController.java      # HTTP layer
│   │   │   │   └── PolicyReadRequest.java           # DTO with validation
│   │   │   └── application/
│   │   │       ├── PolicyReaderService.java         # Business logic
│   │   │       └── PolicyReadResult.java            # Response DTO
│   │   └── resources/
│   │       ├── application.yml                      # Configuration
│   │       └── static/index.html                    # Web UI
│   └── test/
│       └── java/com/ayesa/idp/policyreader/
│           ├── api/PolicyReaderControllerTest.java
│           └── application/PolicyReaderServiceTest.java
├── scripts/                                         # Build/test scripts
├── resources/
│   ├── test-data/                                   # Test fixtures
│   └── templates/                                   # HTML/config templates
├── docs/
│   ├── api/                                         # API documentation
│   └── guides/                                      # Development guides
├── config/                                          # Configuration files
├── pom.xml                                          # Maven configuration
└── mvnw                                             # Maven Wrapper
```

## Coding Standards

### Java Conventions
- Package naming: `com.ayesa.idp.policyreader.*`
- Class naming: PascalCase (e.g., `PolicyReaderService`)
- Method naming: camelCase (e.g., `extractPolicyData()`)
- Constants: UPPER_CASE_WITH_UNDERSCORES

### Code Organization
1. **API Layer (api/):** HTTP endpoints and validation
2. **Application Layer (application/):** Business logic and data processing
3. **Test Layer:** Unit tests alongside each class

### Testing Requirements
- All business logic must have unit tests
- Minimum 80% code coverage
- Tests use JUnit 5 + Spring MockMvc
- Fixtures in `resources/test-data/`

## Common Development Tasks

### Adding a New Endpoint

1. **Create the request DTO** in `api/` package:
```java
@Data
public class NewRequest {
    @NotEmpty(message = "field is required")
    private String field;
}
```

2. **Add the endpoint** in `PolicyReaderController`:
```java
@PostMapping("/new-endpoint")
public ResponseEntity<NewResponse> newEndpoint(@Valid @RequestBody NewRequest request) {
    NewResponse response = service.process(request);
    return ResponseEntity.ok(response);
}
```

3. **Implement business logic** in `PolicyReaderService`:
```java
public NewResponse process(NewRequest request) {
    // Implementation
    return result;
}
```

4. **Add unit tests** in `PolicyReaderControllerTest` and `PolicyReaderServiceTest`

### Modifying Extraction Rules

1. Update patterns in `PolicyReaderService.extractPolicyData()`
2. Add corresponding test cases to `PolicyReaderServiceTest`
3. Update documentation in `docs/api/extraction-rules.md`
4. Run tests to verify: `./mvnw clean test`

### Running Tests with Code Coverage

```bash
./mvnw clean test jacoco:report
# Coverage report: target/site/jacoco/index.html
```

## Troubleshooting

### Port 8080 already in use
```bash
# Find process using port 8080
netstat -ano | findstr :8080

# Kill the process (Windows)
taskkill /PID <PID> /F
```

### Maven build failures
```bash
# Clean all cache
./mvnw clean
./mvnw dependency:purge-local-repository

# Rebuild
./mvnw clean install
```

### Tests failing
1. Check test data in `resources/test-data/test-cases.json`
2. Verify Java version: `java -version`
3. Run single test: `./mvnw -Dtest=PolicyReaderServiceTest test`

## Contributing

1. Create a feature branch: `git checkout -b feature/new-extraction-rule`
2. Make changes following coding standards
3. Add/update tests
4. Verify all tests pass: `./mvnw clean test`
5. Commit with descriptive messages
6. Push and create pull request

## References

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa)
- [Springdoc OpenAPI](https://springdoc.org/)
- [Maven Wrapper](https://maven.apache.org/wrapper/)

