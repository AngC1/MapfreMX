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

@WebMvcTest(PolicyReaderController.class)
@Import(PolicyReaderService.class)
class PolicyReaderControllerTest {

    @Autowired
    private MockMvc mockMvc;

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