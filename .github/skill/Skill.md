# Skills — Policy Reader API

> Ultima actualizacion: 2026-04-23  
> Estructura de Skill: Profesional & Escalable

## 📋 Objetivo

Skill de implementacion y mantenimiento para `policy-reader-api`: **API REST en Java (Spring Boot 3.3 / Java 17+)** que recibe el texto libre de una póliza y devuelve una estructura JSON con los campos clave extraídos. Incluye frontal web de demostración con los colores corporativos de Mapfre.

**Propósito:** Extraer, estructurar y validar datos de pólizas de seguros desde texto no estructurado, con alta confiabilidad y mantenibilidad.

---

## 🏗️ Estructura del Proyecto

```
skill/policy-reader-api/
├── 📁 src/                          # Código fuente principal
│   ├── main/java/com/ayesa/idp/policyreader/
│   │   ├── PolicyReaderApiApplication.java      # Entry point
│   │   ├── api/                                  # HTTP Layer
│   │   │   ├── ApiExceptionHandler.java         # Global error handling
│   │   │   ├── PolicyReaderController.java      # REST endpoints
│   │   │   └── PolicyReadRequest.java           # Request DTO
│   │   └── application/                          # Business Logic Layer
│   │       ├── PolicyReaderService.java         # Core extraction logic
│   │       └── PolicyReadResult.java            # Response DTO
│   ├── test/java/com/ayesa/idp/policyreader/
│   │   ├── api/PolicyReaderControllerTest.java
│   │   └── application/PolicyReaderServiceTest.java
│   └── resources/
│       ├── application.yml                      # Spring configuration
│       └── static/index.html                    # Web UI
│
├── 📁 scripts/                      # Build, test, deployment scripts
│   ├── README.md                    # Scripts documentation
│   ├── build.cmd / build.sh         # Compile project
│   ├── run-tests.cmd / run-tests.sh # Execute unit tests
│   └── run-app.cmd / run-app.sh     # Start application
│
├── 📁 resources/                    # Test data & templates
│   ├── test-data/
│   │   ├── README.md                # Test data guide
│   │   └── test-cases.json          # Comprehensive test fixtures
│   └── templates/
│       ├── README.md                # Template documentation
│       ├── index-template.html      # Enhanced web UI template
│       └── (email, config templates for future use)
│
├── 📁 docs/                         # Technical documentation
│   ├── api/
│   │   └── endpoints.md             # API reference & specs
│   └── guides/
│       └── development-guide.md     # Setup, standards, troubleshooting
│
├── 📁 config/                       # Configuration management
│   └── configuration-guide.md       # Environment configs & profiles
│
├── pom.xml                          # Maven project definition
├── mvnw / mvnw.cmd                  # Maven Wrapper
├── run-api.ps1                      # PowerShell startup script
└── Skill.md                        # Este archivo (Skill documentation)
```

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología | Versión | Propósito |
|---|---|---|---|
| **Lenguaje** | Java | 17 (target), 21 (validated) | Compilación & Runtime |
| **Framework Web** | Spring Boot | 3.3.4 | REST API & MVC |
| **Validación** | Bean Validation (JSR 380) | jakarta.validation | Input validation |
| **Documentación API** | Springdoc OpenAPI | 2.6.0 | Swagger UI + OpenAPI spec |
| **Build Tool** | Maven Wrapper | 3.9.9 | Dependency & build management |
| **Testing** | JUnit 5 + Spring MockMvc | via Boot | Unit & integration tests |
| **Frontend** | HTML5 + CSS3 + JS vanilla | 2024 standards | Web UI demo |
| **Logging** | SLF4J + Logback | Spring default | Application logging |

---

## 🚀 Endpoints

### `POST /api/v1/policies/read`

Extrae los campos estructurados a partir del texto libre de una póliza.

**Request**
```json
{
  "rawText": "Aseguradora: Mapfre\nNumero de poliza: POL-2026-1001\nTomador: Laura Gomez\nProducto: Hogar Base\nFecha inicio: 2026-03-01\nFecha fin: 2027-02-28"
}
```

**Response 200 - Success**
```json
{
  "policyNumber":  "POL-2026-1001",
  "insurerName":   "Mapfre",
  "holderName":    "Laura Gomez",
  "productName":   "Hogar Base",
  "effectiveFrom": "2026-03-01",
  "effectiveTo":   "2027-02-28",
  "confidence":    1.0,
  "missingFields": []
}
```

**Response 400 - Validation Error**
```json
{
  "message": "Validation failed",
  "errors": [{ 
    "field": "rawText", 
    "message": "rawText is required" 
  }]
}
```

### `GET /swagger-ui.html`

Interfaz **Swagger UI** interactiva para explorar y probar el API en tiempo real.
- Browse endpoints
- Test requests
- View schemas
- Download OpenAPI spec

### `GET /v3/api-docs`

Especificación **OpenAPI 3.0** en formato JSON para integración con herramientas.

### `GET /`

Frontal web de demostración con UI responsiva y logo Mapfre.

---

## 📖 Patrones de Extracción Soportados

El servicio reconoce los siguientes alias por campo (**insensible a mayúsculas**):

| Campo | Alias Reconocidos |
|---|---|
| `policyNumber` | `numero de poliza`, `número de póliza`, `poliza`, `num poliza` |
| `insurerName` | `aseguradora`, `compania`, `compañía`, `asegurador` |
| `holderName` | `tomador`, `asegurado`, `cliente`, `titular` |
| `productName` | `producto`, `ramo`, `modalidad`, `tipo` |
| `effectiveFrom` | `fecha inicio`, `inicio`, `vigencia desde`, `desde` |
| `effectiveTo` | `fecha fin`, `fin`, `vigencia hasta`, `hasta` |

**Características:**
- Reconocimiento de patrones con expresiones regulares
- Insensible a mayúsculas/minúsculas
- Extracción flexible de fechas (múltiples formatos)
- Reporte de campos faltantes
- Cálculo automático de confianza (`confidence = detected_fields / 6`)

---

## 📋 Reglas de Implementación

1. ✅ El endpoint principal siempre en `POST /api/v1/policies/read`.
2. ✅ El DTO de entrada (`PolicyReadRequest`) usa Bean Validation; la validación no se duplica en el servicio.
3. ✅ Toda lógica de extracción vive en `PolicyReaderService` (capa `application`).
4. ✅ El controlador solo orquesta: recibe, delega, devuelve.
5. ✅ Los errores de validación devuelven `400` con estructura `{ message, errors[] }` vía `ApiExceptionHandler`.
6. ✅ Los campos no detectados se incluyen en `missingFields`; `confidence = camposDetectados / 6.0`.
7. ✅ Los nombres de campos del JSON de respuesta son **inmutables** (romper el contrato requiere `/api/v2/`).
8. ✅ **Toda nueva regla de extracción debe ir acompañada de un test unitario** en `PolicyReaderServiceTest`.
9. ✅ No introducir lógica de OCR o PDF en este módulo; encapsularla en un adaptador externo.
10. ✅ El frontal `index.html` no contiene lógica de negocio; solo llama al API REST.

---

## 🔧 Guías de Desarrollo

### Quick Start
```bash
# Build
.\scripts\build.cmd          # Windows
./scripts/build.sh           # Linux/Mac

# Test
.\scripts\run-tests.cmd
./scripts/run-tests.sh

# Run
.\scripts\run-app.cmd
./scripts/run-app.sh
```

**API disponible en:** `http://localhost:8080`  
**Swagger UI:** `http://localhost:8080/swagger-ui.html`

### Documentación Completa
- 📘 **Development Guide:** Véase `docs/guides/development-guide.md`
  - Setup del entorno
  - Estándares de código
  - Estructura del proyecto
  - Tareas comunes
  - Troubleshooting

- 📗 **API Reference:** Véase `docs/api/endpoints.md`
  - Especificación detallada de endpoints
  - Esquemas de request/response
  - Códigos de error
  - Ejemplos de uso

- 📙 **Configuration Guide:** Véase `config/configuration-guide.md`
  - Perfiles de aplicación (dev, test, prod)
  - Variables de entorno
  - Tuning JVM
  - Logging configuration

### Test Data & Fixtures
- 📊 **Test Cases:** Véase `resources/test-data/test-cases.json`
  - Casos válidos con todos los campos
  - Casos con campos faltantes
  - Reconocimiento de aliases alternativos
  - Validación de errores
  - Edge cases

### Templates & Resources
- 🎨 **UI Template:** Véase `resources/templates/index-template.html`
  - HTML5 responsive design
  - Estilos modernos con gradientes
  - Integración con API
  - Manejo de errores client-side

---

## 🧪 Estrategia de Testing

### Unit Tests
**Ubicación:** `src/test/java/com/ayesa/idp/policyreader/`

**PolicyReaderControllerTest.java**
- Tests de endpoints HTTP
- Validación de requests/responses
- Status codes y headers
- Error scenarios

**PolicyReaderServiceTest.java**
- Lógica de extracción de campos
- Reconocimiento de patrones
- Cálculo de confianza
- Campos faltantes

### Ejecución
```bash
# Todos los tests
.\mvnw clean test

# Test específico
.\mvnw -Dtest=PolicyReaderServiceTest test

# Con cobertura (Jacoco)
.\mvnw clean test jacoco:report
# Reporte: target/site/jacoco/index.html

# Mínimo cobertura: 80%
.\mvnw clean verify -Djacoco.skip=false
```

### Test Data
Ver `resources/test-data/README.md` para:
- Agregar nuevos casos de prueba
- Formato de test fixtures
- Integración con tests unitarios

---

## 🔄 Workflow de Desarrollo

### 1. Agregar Nueva Regla de Extracción

```java
// 1. Actualizar PolicyReaderService
public PolicyReadResult extractPolicyData(String rawText) {
    // Add extraction pattern logic
}

// 2. Escribir test en PolicyReaderServiceTest
@Test
public void testNewExtractionRule() {
    // Test case
}

// 3. Ejecutar tests
./mvnw clean test

// 4. Actualizar docs si es necesario
```

### 2. Agregar Nuevo Endpoint

```java
// 1. DTO en api/ package
@Data
public class NewRequest {
    @NotEmpty(message = "field is required")
    private String field;
}

// 2. Endpoint en PolicyReaderController
@PostMapping("/new-endpoint")
public ResponseEntity<NewResponse> newEndpoint(@Valid @RequestBody NewRequest request) {
    // Implementation
}

// 3. Lógica en PolicyReaderService
public NewResponse process(NewRequest request) { }

// 4. Tests en PolicyReaderControllerTest
```

### 3. Modificar Configuración

1. Editar `src/main/resources/application.yml`
2. Para perfiles específicos: `application-{profile}.yml`
3. Ver `config/configuration-guide.md` para detalles

---

## 📦 Dependencias Principales

```xml
<!-- Spring Boot Web -->
<dependency>org.springframework.boot:spring-boot-starter-web</dependency>

<!-- Validation -->
<dependency>org.springframework.boot:spring-boot-starter-validation</dependency>

<!-- API Documentation -->
<dependency>org.springdoc:springdoc-openapi-starter-webmvc-ui:2.6.0</dependency>

<!-- Testing -->
<dependency>org.springframework.boot:spring-boot-starter-test:test</dependency>
```

Ver `pom.xml` para lista completa con versiones.

---

## 🚀 Deployment

### Local JAR
```bash
.\mvnw clean package
java -jar target/policy-reader-api-0.0.1-SNAPSHOT.jar
```

### Docker (Futuro)
```bash
# Construir imagen
.\scripts\docker-build.cmd

# Ejecutar contenedor
docker run -p 8080:8080 policy-reader-api:latest
```

### Profiles
```bash
# Development
java -Dspring.profiles.active=dev -jar app.jar

# Production
java -Dspring.profiles.active=prod -jar app.jar
```

---

## 📞 Referencia Rápida

| Tarea | Comando |
|---|---|
| Compilar | `.\scripts\build.cmd` |
| Tests | `.\scripts\run-tests.cmd` |
| Ejecutar app | `.\scripts\run-app.cmd` |
| Limpiar maven | `.\mvnw clean` |
| JAR final | `.\mvnw clean package` |
| Reporte cobertura | `.\mvnw jacoco:report` |

---

## 📚 Recursos Externos

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Springdoc OpenAPI](https://springdoc.org/)
- [JUnit 5](https://junit.org/junit5/)
- [Maven Documentation](https://maven.apache.org/)
- [Swagger/OpenAPI](https://swagger.io/)

---

## ✨ Roadmap Futuro

- [ ] Integración con base de datos para persistencia
- [ ] Autenticación y autorización (OAuth2/JWT)
- [ ] Procesamiento de documentos PDF/OCR
- [ ] API versioning (v2, v3...)
- [ ] Rate limiting y throttling
- [ ] Caché distribuido (Redis)
- [ ] Monitoring & Observability (Prometheus/ELK)
- [ ] Container deployment (Docker/Kubernetes)
- [ ] CI/CD pipeline automation

---

> **Última revisión:** 2026-04-23  
> **Versión del Skill:** 2.0  
> **Estado:** ✅ Activo y Mantenido

---

## Arbol de ficheros

```text
skill/
├── Skill.md                          ← este documento
└── policy-reader-api/
    ├── .mvn/
    │   └── wrapper/
    │       └── maven-wrapper.properties
    ├── mvnw                           ← wrapper Unix/Mac
    ├── mvnw.cmd                       ← wrapper Windows
    ├── run-api.ps1                    ← script PowerShell con JAVA_HOME preconfigurado
    ├── pom.xml
    └── src/
        ├── main/
        │   ├── java/
        │   │   └── com/ayesa/idp/policyreader/
        │   │       ├── PolicyReaderApiApplication.java
        │   │       ├── api/
        │   │       │   ├── ApiExceptionHandler.java      ← manejo global de errores 400
        │   │       │   ├── PolicyReadRequest.java         ← DTO entrada + @Schema Swagger
        │   │       │   └── PolicyReaderController.java    ← @Tag, @Operation OpenAPI
        │   │       └── application/
        │   │           ├── PolicyReadResult.java          ← record inmutable de salida
        │   │           └── PolicyReaderService.java       ← logica de extraccion con regex
        │   └── resources/
        │       ├── application.yml
        │       └── static/
        │           └── index.html                        ← frontal demo Mapfre (sin deps externas)
        └── test/
            └── java/
                └── com/ayesa/idp/policyreader/
                    ├── api/
                    │   └── PolicyReaderControllerTest.java  ← @WebMvcTest del endpoint REST
                    └── application/
                        └── PolicyReaderServiceTest.java     ← tests unitarios del parser
```

---

## Comandos

### Linux / macOS
```bash
./mvnw test
./mvnw spring-boot:run
```

### Windows PowerShell (forma rapida)
```powershell
.\run-api.ps1           # arranca en :8080
.\run-api.ps1 -Goal test
```

### Windows PowerShell (manual)
```powershell
$env:JAVA_HOME = "C:\Users\MACADIAD\.jdk\jdk-21.0.2+13"
$env:Path = "$env:JAVA_HOME\bin;$env:Path"
.\mvnw.cmd test
.\mvnw.cmd spring-boot:run
```

---

## Requisitos de runtime

- Maven **no** es necesario; el wrapper `mvnw`/`mvnw.cmd` lo descarga automaticamente.
- `pom.xml` declara `java.version=17`; compilado y validado con JDK 21.0.2.
- **Evitar** `C:\Users\MACADIAD\.jdk\jdk-21.0.8(6)`: la ruta con parentesis rompe el fork de Surefire en Windows.
- Con Java 11 el wrapper arranca pero la compilacion falla (target = 17).

---

## Reglas de extension

| Necesidad | Accion |
|---|---|
| Nuevo patron de campo | Agregar entrada en `FIELD_PATTERNS` + test en `PolicyReaderServiceTest` |
| Nuevo campo en respuesta | Actualizar `PolicyReadResult`, `PolicyReaderService`, tests y tabla de este documento |
| Cambio de contrato de respuesta | Crear `/api/v2/policies/read`; no modificar v1 |
| Soporte PDF / OCR | Crear adaptador en paquete `infrastructure`; inyectar como puerto en el servicio |
| Despliegue fuera de local | Agregar autenticacion (Spring Security) y limite de tamano de payload |

---

## Mejores practicas Selenium

### Principios base

1. Ejecutar Selenium solo para flujos end-to-end del frontal (`GET /`); mantener la logica de parsing validada con JUnit/MockMvc.
2. Usar localizadores estables (`id`, `name`, `data-testid`) y evitar selectores fragiles por texto o estructura CSS profunda.
3. Aplicar `WebDriverWait` con condiciones explicitas; no usar `Thread.sleep`.
4. Mantener los tests deterministas: datos de entrada fijos, assertions concretas y limpieza de estado entre casos.
5. Ejecutar en modo headless en CI y en modo visible solo para depuracion local.

### Diseno de tests

1. Implementar Page Object Model (POM): separar interacciones de pagina de las assertions del test.
2. Un test debe validar un escenario de negocio completo y medible.
3. Nombrar los casos con patron `deberia_<resultado>_cuando_<condicion>`.
4. Registrar evidencia en fallos (screenshot + HTML de la pagina) para diagnostico rapido.

### Sincronizacion y estabilidad

1. Esperar a elementos interactuables (`elementToBeClickable`) antes de escribir o hacer click.
2. Esperar a cambios de estado visibles (texto de resultado, mensaje de error, spinner oculto).
3. Configurar timeout unico por suite para evitar variabilidad entre entornos.

### Datos y entorno

1. Levantar la app antes de la suite (`http://localhost:8080`) y validar disponibilidad inicial.
2. Usar payloads de prueba representativos (Mapfre + poliza completa y caso parcial).
3. No depender de servicios externos para UI tests de este modulo.

### Convencion recomendada para el frontal actual

1. Anadir `data-testid` en controles principales de [skill/policy-reader-api/src/main/resources/static/index.html](skill/policy-reader-api/src/main/resources/static/index.html):
  - `policy-raw-text`
  - `policy-submit`
  - `policy-result`
  - `policy-error`
2. Validar en Selenium tanto estado de exito (campos extraidos) como estado de error (mensaje de validacion).
3. Mantener los asserts de API en JUnit/MockMvc y usar Selenium para validar UX, wiring y renderizado.

### Paquetes recomendados (JUnit 5)

- `org.seleniumhq.selenium:selenium-java`
- `io.github.bonigarcia:webdrivermanager`

### Checklist minimo por PR

1. No hay `Thread.sleep` en tests Selenium.
2. Todos los selectores usan `id`, `name` o `data-testid`.
3. Se captura screenshot en fallo.
4. La suite corre en headless en CI.

---

## Siguiente evolucion recomendada

- Adaptador de entrada para PDF/OCR (paquete `infrastructure`).
- Persistencia de lecturas en base de datos (Spring Data JPA).
- Autenticacion con JWT para uso fuera de entorno local.
- Pipeline CI/CD con GitHub Actions usando `mvnw test`.
- Externalizar patrones de extraccion a configuracion si cambian por aseguradora.
