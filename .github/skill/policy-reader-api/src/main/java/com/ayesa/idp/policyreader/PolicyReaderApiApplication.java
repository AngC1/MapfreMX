package com.ayesa.idp.policyreader;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Punto de entrada de la aplicación Policy Reader API.
 *
 * <p>Servicio REST de extracción de datos estructurados a partir del texto libre
 * de pólizas de seguro. Forma parte de la plataforma IDP (Internal Developer Platform)
 * de AYESA para el cliente Mapfre México.</p>
 *
 * <p>El servidor arranca en el puerto {@code 8080} por defecto y expone:
 * <ul>
 *   <li>{@code POST /api/v1/policies/read} — extracción de campos de póliza</li>
 *   <li>{@code GET  /swagger-ui/index.html} — documentación interactiva (Springdoc OpenAPI)</li>
 *   <li>{@code GET  /v3/api-docs} — especificación OpenAPI 3.0 en formato JSON</li>
 * </ul>
 * </p>
 *
 * @see com.ayesa.idp.policyreader.api.PolicyReaderController
 * @see com.ayesa.idp.policyreader.application.PolicyReaderService
 */
@SpringBootApplication
public class PolicyReaderApiApplication {

    /**
     * Método principal de arranque de la aplicación Spring Boot.
     *
     * @param args argumentos de línea de comandos (se pasan directamente a Spring)
     */
    public static void main(String[] args) {
        SpringApplication.run(PolicyReaderApiApplication.class, args);
    }
}