package com.ayesa.idp.policyreader.application;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;

/**
 * Tests unitarios de {@link PolicyReaderService}.
 *
 * <p>Verifican la lógica de extracción de campos mediante expresiones regulares
 * sin levantar el contexto de Spring (tests de caja blanca pura).</p>
 *
 * <p>Escenarios cubiertos:
 * <ul>
 *   <li>Texto completo con los seis campos — confianza 1.0, {@code missingFields} vacía</li>
 *   <li>Texto parcial — campos ausentes reflejados en {@code missingFields}, confianza reducida</li>
 *   <li>Fecha con formato inválido — tratada como campo ausente, resto extraído correctamente</li>
 * </ul>
 * </p>
 */
class PolicyReaderServiceTest {

    private final PolicyReaderService service = new PolicyReaderService();

    /**
     * Verifica que todos los campos se extraen correctamente cuando el texto
     * contiene las seis entidades con etiquetas estándar.
     */
    @Test
    void shouldExtractCoreFieldsFromPolicyText() {
        String rawPolicy = """
            Aseguradora: Mapfre
            Numero de poliza: POL-2026-0001
            Tomador: Ana Perez
            Producto: Auto Premium
            Fecha inicio: 2026-01-01
            Fecha fin: 2026-12-31
            """;

        PolicyReadResult result = service.read(rawPolicy);

        assertThat(result.policyNumber()).isEqualTo("POL-2026-0001");
        assertThat(result.insurerName()).isEqualTo("Mapfre");
        assertThat(result.holderName()).isEqualTo("Ana Perez");
        assertThat(result.productName()).isEqualTo("Auto Premium");
        assertThat(result.effectiveFrom()).hasToString("2026-01-01");
        assertThat(result.effectiveTo()).hasToString("2026-12-31");
        assertThat(result.missingFields()).isEmpty();
    }

    /**
     * Verifica que los campos no presentes en el texto aparecen en {@code missingFields}
     * y que el índice de confianza refleja la extracción parcial.
     */
    @Test
    void shouldReportMissingFieldsWhenInputIsPartial() {
        String rawPolicy = "Numero de poliza: POL-2026-0002\nTomador: Luis Diaz";

        PolicyReadResult result = service.read(rawPolicy);

        assertThat(result.policyNumber()).isEqualTo("POL-2026-0002");
        assertThat(result.holderName()).isEqualTo("Luis Diaz");
        assertThat(result.missingFields())
            .contains("insurerName", "productName", "effectiveFrom", "effectiveTo");
        assertThat(result.confidence()).isLessThan(1.0);
    }

    /**
     * Verifica que una fecha con formato no ISO-8601 se trata como campo ausente
     * ({@code effectiveFrom = null}) sin afectar la extracción del resto de campos.
     * La confianza resultante debe ser {@code 5.0/6.0}.
     */
    @Test
    void shouldTreatInvalidDateAsMissingField() {
        String rawPolicy = """
            Aseguradora: Mapfre
            Numero de poliza: POL-2026-0003
            Tomador: Marta Ruiz
            Producto: Vida Plus
            Fecha inicio: no-es-fecha
            Fecha fin: 2026-12-31
            """;

        PolicyReadResult result = service.read(rawPolicy);

        assertThat(result.effectiveFrom()).isNull();
        assertThat(result.effectiveTo()).hasToString("2026-12-31");
        assertThat(result.missingFields()).contains("effectiveFrom");
        assertThat(result.confidence()).isEqualTo(5.0 / 6.0);
    }
}