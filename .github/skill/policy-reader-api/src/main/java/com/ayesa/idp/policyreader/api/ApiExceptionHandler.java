package com.ayesa.idp.policyreader.api;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * Manejador global de excepciones para la API REST.
 *
 * <p>Intercepta las excepciones de validación lanzadas por Spring MVC cuando
 * una petición no supera las restricciones de Bean Validation ({@code @Valid})
 * y devuelve una respuesta estructurada con el detalle de los errores de campo,
 * evitando que el stack trace llegue al cliente.</p>
 *
 * <p>Formato de la respuesta de error ({@code 400 Bad Request}):
 * <pre>{@code
 * {
 *   "message": "Validation failed",
 *   "errors": [
 *     { "field": "rawText", "message": "rawText is required" }
 *   ]
 * }
 * }</pre>
 * </p>
 */
@RestControllerAdvice
public class ApiExceptionHandler {

    /**
     * Maneja los errores de validación de Bean Validation.
     *
     * <p>Se invoca automáticamente cuando un argumento anotado con {@code @Valid}
     * no supera alguna restricción ({@code @NotBlank}, {@code @Size}, etc.).
     * Agrega en la respuesta la lista completa de campos inválidos con sus mensajes.</p>
     *
     * @param exception excepción que contiene el resultado de binding con los errores de campo
     * @return {@code 400 Bad Request} con el mapa de errores estructurado
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidation(MethodArgumentNotValidException exception) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("message", "Validation failed");
        body.put("errors", exception.getBindingResult().getFieldErrors().stream()
            .map(error -> Map.of("field", error.getField(), "message", error.getDefaultMessage()))
            .toList());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);
    }
}