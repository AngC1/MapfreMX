package com.ayesa.idp.policyreader.application;

import java.time.LocalDate;
import java.util.List;

/**
 * Resultado de la extracción de datos de una póliza de seguro.
 *
 * <p>DTO de salida devuelto por {@code POST /api/v1/policies/read}.
 * Los campos son opcionales (pueden ser {@code null}) cuando no se encuentran
 * en el texto de entrada. El campo {@code confidence} refleja el porcentaje
 * de campos extraídos satisfactoriamente sobre el total esperado (6 campos).</p>
 *
 * <p>Cálculo de confianza:
 * <pre>{@code confidence = camposEncontrados / 6.0}</pre>
 * Rango: {@code 0.0} (ningún campo) a {@code 1.0} (todos los campos encontrados).</p>
 *
 * @param policyNumber  número de póliza (ej. {@code POL-2026-1001}); {@code null} si no se encuentra
 * @param insurerName   nombre de la aseguradora (ej. {@code Mapfre}); {@code null} si no se encuentra
 * @param holderName    nombre del tomador o asegurado; {@code null} si no se encuentra
 * @param productName   nombre del producto o ramo (ej. {@code Hogar Base}); {@code null} si no se encuentra
 * @param effectiveFrom fecha de inicio de vigencia; {@code null} si no se encuentra o no tiene formato ISO-8601
 * @param effectiveTo   fecha de fin de vigencia; {@code null} si no se encuentra o no tiene formato ISO-8601
 * @param confidence    índice de confianza entre {@code 0.0} y {@code 1.0}
 * @param missingFields lista de nombres de campos no extraídos; vacía si la extracción fue completa
 */
public record PolicyReadResult(
    String policyNumber,
    String insurerName,
    String holderName,
    String productName,
    LocalDate effectiveFrom,
    LocalDate effectiveTo,
    double confidence,
    List<String> missingFields
) {
}