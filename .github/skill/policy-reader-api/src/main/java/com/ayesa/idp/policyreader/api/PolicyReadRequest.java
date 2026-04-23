package com.ayesa.idp.policyreader.api;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

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