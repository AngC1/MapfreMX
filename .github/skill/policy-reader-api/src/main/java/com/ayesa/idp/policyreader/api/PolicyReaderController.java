package com.ayesa.idp.policyreader.api;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ayesa.idp.policyreader.application.PolicyReadResult;
import com.ayesa.idp.policyreader.application.PolicyReaderService;

import jakarta.validation.Valid;

/**
 * Controlador REST para la extracción de datos de pólizas de seguro.
 *
 * <p>Expone el endpoint {@code POST /api/v1/policies/read} que recibe el texto libre
 * de una póliza y devuelve los campos estructurados extraídos mediante expresiones regulares,
 * junto con un índice de confianza calculado en base a los campos encontrados.</p>
 *
 * <p>La validación de la petición ({@code @Valid}) garantiza que {@code rawText}
 * no sea nulo ni vacío antes de delegar en el servicio de extracción.</p>
 *
 * @see PolicyReaderService
 * @see PolicyReadRequest
 * @see com.ayesa.idp.policyreader.application.PolicyReadResult
 */
@Tag(name = "Polizas", description = "Extraccion de datos estructurados a partir del texto libre de una poliza")
@Validated
@RestController
@RequestMapping("/api/v1/policies")
public class PolicyReaderController {

    private final PolicyReaderService policyReaderService;

    /**
     * Inyección de dependencia del servicio de extracción de pólizas.
     *
     * @param policyReaderService servicio que aplica las expresiones regulares de extracción
     */
    public PolicyReaderController(PolicyReaderService policyReaderService) {
        this.policyReaderService = policyReaderService;
    }

    /**
     * Extrae los campos estructurados del texto libre de una póliza.
     *
     * <p>Campos extraídos: número de póliza, aseguradora, tomador, producto,
     * fecha de inicio y fecha de fin de vigencia. Los campos no encontrados quedan
     * registrados en {@code missingFields} y reducen el índice {@code confidence}.</p>
     *
     * @param request petición con el texto libre de la póliza (no debe ser nulo ni vacío)
     * @return {@code 200 OK} con el resultado de la extracción
     */
    @Operation(
        summary = "Leer poliza",
        description = "Recibe el texto libre de una poliza y devuelve los campos estructurados extraidos junto con un indice de confianza."
    )
    @PostMapping("/read")
    public ResponseEntity<PolicyReadResult> readPolicy(@Valid @RequestBody PolicyReadRequest request) {
        return ResponseEntity.ok(policyReaderService.read(request.rawText()));
    }
}