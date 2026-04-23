package com.ayesa.idp.policyreader.application;

import java.time.LocalDate;
import java.util.List;

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