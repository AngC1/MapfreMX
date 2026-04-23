# Test Data - Policy Reader API

## Description
This directory contains test data, fixtures, and sample payloads for testing the Policy Reader API.

### test-cases.json
Comprehensive test cases covering:
- Valid policies with all fields populated
- Policies with missing fields
- Alternative field name recognition (aliases)
- Invalid/empty inputs
- Edge cases (special characters, dates formats, etc.)

### Usage in Unit Tests
```java
// Load test data from JSON
ObjectMapper mapper = new ObjectMapper();
String testData = new String(Files.readAllBytes(Paths.get("resources/test-data/test-cases.json")));
JsonNode testCases = mapper.readTree(testData);
```

### Adding New Test Data
1. Add new test case to `test-cases.json`
2. Reference in `PolicyReaderServiceTest.java`
3. Run tests: `./mvnw clean test`

