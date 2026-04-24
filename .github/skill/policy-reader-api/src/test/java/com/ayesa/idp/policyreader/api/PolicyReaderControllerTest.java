package com.ayesa.idp.policyreader.api;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.ayesa.idp.policyreader.application.PolicyReaderService;

/**
 * Tests de integración del controlador REST {@link PolicyReaderController}.
 *
 * <p>Utiliza {@code @WebMvcTest} para levantar únicamente la capa web (MockMvc)
 * e importa {@link PolicyReaderService} como dependencia real, evitando mocks
 * y verificando la cadena completa: deserialización JSON → validación → servicio → serialización.</p>
 *
 * <p>Escenarios cubiertos:
 * <ul>
 *   <li>POST con texto completo — {@code 200 OK} con todos los campos extraídos en el JSON de respuesta</li>
 * </ul>
 * </p>
 */
@WebMvcTest(PolicyReaderController.class)
@Import(PolicyReaderService.class)
class PolicyReaderControllerTest {

    @Autowired
    private MockMvc mockMvc;

    /**
     * Verifica que el endpoint {@code POST /api/v1/policies/read} devuelve
     * {@code 200 OK} y serializa correctamente los campos extraídos en JSON.
     */
    @Test
    void shouldReadPolicyFromRestEndpoint() throws Exception {
        String body = """
            {
              "rawText": "Aseguradora: Mapfre\\nNumero de poliza: POL-2026-1001\\nTomador: Laura Gomez\\nProducto: Hogar Base\\nFecha inicio: 2026-03-01\\nFecha fin: 2027-02-28"
            }
            """;

        mockMvc.perform(post("/api/v1/policies/read")
                .contentType(MediaType.APPLICATION_JSON)
                .content(body))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.policyNumber").value("POL-2026-1001"))
            .andExpect(jsonPath("$.insurerName").value("Mapfre"))
            .andExpect(jsonPath("$.holderName").value("Laura Gomez"))
            .andExpect(jsonPath("$.productName").value("Hogar Base"));
    }
}