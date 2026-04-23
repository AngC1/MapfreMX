⚡ # Quick Start - 5 Minutos

## 1️⃣ Prerequisites (1 min)
```bash
# Verificar Java 17+
java -version

# Git clone o navega a la carpeta
cd policy-reader-api
```

## 2️⃣ Compilar (2 min)
```bash
# Windows
.\scripts\build.cmd

# Linux/Mac
./scripts/build.sh
```

✅ Esperado: `[BUILD] Compilation successful!`

## 3️⃣ Ejecutar Tests (1 min)
```bash
# Windows
.\scripts\run-tests.cmd

# Linux/Mac
./scripts/run-tests.sh
```

✅ Esperado: `[TESTS] All tests passed!`

## 4️⃣ Iniciar Aplicación (1 min)
```bash
# Windows
.\scripts\run-app.cmd

# Linux/Mac
./scripts/run-app.sh
```

✅ Esperado: `Started PolicyReaderApiApplication`

## 5️⃣ Probar API
```bash
# Opción 1: Swagger UI (recomendado)
# Abre en navegador: http://localhost:8080/swagger-ui.html

# Opción 2: cURL
curl -X POST http://localhost:8080/api/v1/policies/read \
  -H "Content-Type: application/json" \
  -d '{"rawText":"Aseguradora: Mapfre\nNumero de poliza: POL-2026-1001\nTomador: Laura Gomez"}'
```

✅ Esperado: JSON estructurado con campos extraídos

---

## 📚 Siguiente Paso

Lee [development-guide.md](development-guide.md) para:
- Setup completo del entorno
- Estándares de código
- Cómo agregar endpoints
- Troubleshooting

---

**¿Problemas?** Ver [development-guide.md#troubleshooting](development-guide.md#troubleshooting)

