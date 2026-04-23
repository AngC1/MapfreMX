# API Documentation - Policy Reader API

## Endpoints Reference

### POST /api/v1/policies/read
Extract structured data from free-text policy documents.

**Request Body:**
```json
{
  "rawText": "string - Required. Free-form policy text"
}
```

**Success Response (200 OK):**
```json
{
  "policyNumber": "string",
  "insurerName": "string",
  "holderName": "string",
  "productName": "string",
  "effectiveFrom": "string (YYYY-MM-DD)",
  "effectiveTo": "string (YYYY-MM-DD)",
  "confidence": "number (0.0 to 1.0)",
  "missingFields": ["string"]
}
```

**Error Response (400 Bad Request):**
```json
{
  "message": "string",
  "errors": [
    {
      "field": "string",
      "message": "string"
    }
  ]
}
```

### GET /swagger-ui.html
Interactive API documentation (Swagger UI).
Browse and test endpoints directly from this interface.

### GET /v3/api-docs
OpenAPI 3.0 specification in JSON format.

