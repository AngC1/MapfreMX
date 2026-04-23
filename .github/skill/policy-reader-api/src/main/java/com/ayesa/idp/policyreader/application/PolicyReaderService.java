package com.ayesa.idp.policyreader.application;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.stereotype.Service;

@Service
public class PolicyReaderService {

    private static final Map<String, Pattern> FIELD_PATTERNS = Map.of(
        "policyNumber", Pattern.compile("(?im)^\\s*(?:numero de poliza|n[úu]mero de p[óo]liza|poliza)\\s*:\\s*(.+)$"),
        "insurerName", Pattern.compile("(?im)^\\s*(?:aseguradora|compania|compa[ñn][ií]a)\\s*:\\s*(.+)$"),
        "holderName", Pattern.compile("(?im)^\\s*(?:tomador|asegurado|cliente)\\s*:\\s*(.+)$"),
        "productName", Pattern.compile("(?im)^\\s*(?:producto|ramo|modalidad)\\s*:\\s*(.+)$"),
        "effectiveFrom", Pattern.compile("(?im)^\\s*(?:fecha inicio|inicio|vigencia desde)\\s*:\\s*(.+)$"),
        "effectiveTo", Pattern.compile("(?im)^\\s*(?:fecha fin|fin|vigencia hasta)\\s*:\\s*(.+)$")
    );

    public PolicyReadResult read(String rawPolicyText) {
        String normalizedText = rawPolicyText == null ? "" : rawPolicyText.trim();
        String policyNumber = extract("policyNumber", normalizedText);
        String insurerName = extract("insurerName", normalizedText);
        String holderName = extract("holderName", normalizedText);
        String productName = extract("productName", normalizedText);
        LocalDate effectiveFrom = parseDate(extract("effectiveFrom", normalizedText));
        LocalDate effectiveTo = parseDate(extract("effectiveTo", normalizedText));

        List<String> missingFields = new ArrayList<>();
        addMissing(missingFields, "policyNumber", policyNumber);
        addMissing(missingFields, "insurerName", insurerName);
        addMissing(missingFields, "holderName", holderName);
        addMissing(missingFields, "productName", productName);
        addMissing(missingFields, "effectiveFrom", effectiveFrom);
        addMissing(missingFields, "effectiveTo", effectiveTo);

        double completedFields = 6 - missingFields.size();
        double confidence = completedFields / 6.0;

        return new PolicyReadResult(
            policyNumber,
            insurerName,
            holderName,
            productName,
            effectiveFrom,
            effectiveTo,
            confidence,
            List.copyOf(missingFields)
        );
    }

    private String extract(String fieldName, String rawPolicyText) {
        Matcher matcher = FIELD_PATTERNS.get(fieldName).matcher(rawPolicyText);
        if (!matcher.find()) {
            return null;
        }
        return matcher.group(1).trim();
    }

    private LocalDate parseDate(String rawDate) {
        if (rawDate == null || rawDate.isBlank()) {
            return null;
        }
        try {
            return LocalDate.parse(rawDate);
        } catch (DateTimeParseException ignored) {
            return null;
        }
    }

    private void addMissing(List<String> missingFields, String fieldName, Object fieldValue) {
        if (fieldValue == null) {
            missingFields.add(fieldName);
        }
    }
}