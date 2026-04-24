package com.ayesa.idp.policyreader.application;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.stereotype.Service;

/**
 * Servicio de extracción de datos estructurados de pólizas de seguro.
 *
 * <p>Aplica expresiones regulares sobre el texto libre de una póliza para identificar
 * y extraer los seis campos canónicos: número de póliza, aseguradora, tomador,
 * producto, fecha de inicio y fecha de fin de vigencia.</p>
 *
 * <p>Las expresiones regulares son case-insensitive y multilínea ({@code (?im)}) y
 * admiten variantes léxicas habituales en documentos de seguro en español:
 * <ul>
 *   <li>{@code policyNumber}: «numero de poliza», «número de póliza», «poliza»</li>
 *   <li>{@code insurerName}: «aseguradora», «compania», «compañía»</li>
 *   <li>{@code holderName}: «tomador», «asegurado», «cliente»</li>
 *   <li>{@code productName}: «producto», «ramo», «modalidad»</li>
 *   <li>{@code effectiveFrom}: «fecha inicio», «inicio», «vigencia desde»</li>
 *   <li>{@code effectiveTo}: «fecha fin», «fin», «vigencia hasta»</li>
 * </ul>
 * </p>
 *
 * <p>El índice de confianza se calcula como {@code camposEncontrados / 6.0}.
 * Las fechas deben estar en formato ISO-8601 ({@code yyyy-MM-dd}); cualquier otro
 * formato se trata como campo ausente.</p>
 */
@Service
public class PolicyReaderService {

    /**
     * Mapa de patrones de extracción indexados por nombre de campo.
     *
     * <p>Cada patrón captura en el grupo 1 el valor que sigue al separador {@code :},
     * ignorando espacios iniciales y finales. Los patrones usan los modificadores
     * {@code (?im)}: case-insensitive y multilínea.</p>
     */
    private static final Map<String, Pattern> FIELD_PATTERNS = Map.of(
        "policyNumber", Pattern.compile("(?im)^\\s*(?:numero de poliza|n[úu]mero de p[óo]liza|poliza)\\s*:\\s*(.+)$"),
        "insurerName", Pattern.compile("(?im)^\\s*(?:aseguradora|compania|compa[ñn][ií]a)\\s*:\\s*(.+)$"),
        "holderName", Pattern.compile("(?im)^\\s*(?:tomador|asegurado|cliente)\\s*:\\s*(.+)$"),
        "productName", Pattern.compile("(?im)^\\s*(?:producto|ramo|modalidad)\\s*:\\s*(.+)$"),
        "effectiveFrom", Pattern.compile("(?im)^\\s*(?:fecha inicio|inicio|vigencia desde)\\s*:\\s*(.+)$"),
        "effectiveTo", Pattern.compile("(?im)^\\s*(?:fecha fin|fin|vigencia hasta)\\s*:\\s*(.+)$")
    );

    /**
     * Extrae los campos estructurados del texto libre de una póliza.
     *
     * <p>El texto se normaliza (trim) antes del procesamiento. Si {@code rawPolicyText}
     * es {@code null} se trata como cadena vacía, resultando en confianza {@code 0.0}
     * con todos los campos en {@code missingFields}.</p>
     *
     * @param rawPolicyText texto libre de la póliza; puede ser {@code null}
     * @return resultado con los campos extraídos, el índice de confianza y la lista de campos ausentes
     */
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

    /**
     * Aplica el patrón del campo indicado sobre el texto y devuelve el valor capturado.
     *
     * @param fieldName     nombre del campo (clave en {@link #FIELD_PATTERNS})
     * @param rawPolicyText texto normalizado de la póliza
     * @return valor extraído sin espacios extremos, o {@code null} si el patrón no coincide
     */
    private String extract(String fieldName, String rawPolicyText) {
        Matcher matcher = FIELD_PATTERNS.get(fieldName).matcher(rawPolicyText);
        if (!matcher.find()) {
            return null;
        }
        return matcher.group(1).trim();
    }

    /**
     * Convierte una cadena de fecha en formato ISO-8601 ({@code yyyy-MM-dd}) a {@link LocalDate}.
     *
     * <p>Si la cadena es nula, está en blanco o no tiene el formato esperado, devuelve
     * {@code null} sin lanzar excepción. El campo correspondiente quedará registrado
     * en {@code missingFields}.</p>
     *
     * @param rawDate cadena con la fecha a parsear; puede ser {@code null}
     * @return instancia de {@link LocalDate} o {@code null} si el parseo falla
     */
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

    /**
     * Añade el nombre del campo a la lista de ausentes si su valor es {@code null}.
     *
     * @param missingFields lista acumulada de campos no extraídos
     * @param fieldName     nombre del campo a evaluar
     * @param fieldValue    valor extraído; {@code null} indica campo ausente
     */
    private void addMissing(List<String> missingFields, String fieldName, Object fieldValue) {
        if (fieldValue == null) {
            missingFields.add(fieldName);
        }
    }
}