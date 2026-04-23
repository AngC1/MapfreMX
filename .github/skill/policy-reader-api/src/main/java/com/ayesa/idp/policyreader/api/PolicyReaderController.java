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

@Tag(name = "Polizas", description = "Extraccion de datos estructurados a partir del texto libre de una poliza")
@Validated
@RestController
@RequestMapping("/api/v1/policies")
public class PolicyReaderController {

    private final PolicyReaderService policyReaderService;

    public PolicyReaderController(PolicyReaderService policyReaderService) {
        this.policyReaderService = policyReaderService;
    }

    @Operation(
        summary = "Leer poliza",
        description = "Recibe el texto libre de una poliza y devuelve los campos estructurados extraidos junto con un indice de confianza."
    )
    @PostMapping("/read")
    public ResponseEntity<PolicyReadResult> readPolicy(@Valid @RequestBody PolicyReadRequest request) {
        return ResponseEntity.ok(policyReaderService.read(request.rawText()));
    }
}