package com.ayesa.idp.policyreader.application;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;

class PolicyReaderServiceTest {

    private final PolicyReaderService service = new PolicyReaderService();

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