# Configuration - Policy Reader API

## application.yml
Primary Spring Boot configuration file.

```yaml
spring:
  application:
    name: policy-reader-api
  
  mvc:
    throw-exception-if-no-handler-found: true
  
  web:
    resources:
      add-mappings: true

server:
  port: 8080
  servlet:
    context-path: /

springdoc:
  swagger-ui:
    enabled: true
    path: /swagger-ui.html
    operations-sorter: method
  api-docs:
    path: /v3/api-docs

logging:
  level:
    root: INFO
    com.ayesa.idp.policyreader: DEBUG
```

## Profiles

### development (application-dev.yml)
Local development configuration with debug logging.

### test (application-test.yml)
Unit test configuration with in-memory database.

### production (application-prod.yml)
Production configuration with external database and security settings.

## Environment Variables

| Variable | Purpose | Default |
|---|---|---|
| `SERVER_PORT` | HTTP server port | 8080 |
| `LOG_LEVEL` | Application log level | INFO |
| `JAVA_OPTS` | JVM options | -Xmx512m |

## Usage

```bash
# Run with development profile
java -Dspring.profiles.active=dev -jar app.jar

# Run with environment variable
export JAVA_OPTS="-Xmx1024m -Xms512m"
./mvnw spring-boot:run -Dspring.profiles.active=prod
```

