package com.ayesa.idp.policyreader.api;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

/**
 * Petición de extracción de datos de póliza.
 *
 * <p>DTO de entrada para el endpoint {@code POST /api/v1/policies/read}.
 * Se modela como Java Record para garantizar inmutabilidad y reducir boilerplate.</p>
 *
 * <p>El campo {@code rawText} debe contener el texto íntegro de la póliza tal como
 * aparece en el documento fuente (PDF, email, OCR, etc.). El servicio aplica
 * expresiones regulares para identificar los campos estructurados.</p>
 *
 * @param rawText texto libre de la póliza; no puede ser nulo ni estar en blanco
 */
@Schema(description = "Peticion de lectura de poliza")
public record PolicyReadRequest(
    @Schema(
        description = "Texto libre de la poliza tal como aparece en el documento",
        example = "Aseguradora: Mapfre\nNumero de poliza: POL-2026-1001\nTomador: Laura Gomez\nProducto: Hogar Base\nFecha inicio: 2026-03-01\nFecha fin: 2027-02-28"
    )
    @NotBlank(message = "rawText is required")
    String rawText
) {
}