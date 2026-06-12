package com.fpt.sba301_su26_groupproject.controller.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.fpt.sba301_su26_groupproject.common.response.ApiResponse;
import com.fpt.sba301_su26_groupproject.dto.payment.PaymentMomoCallbackDTO;
import com.fpt.sba301_su26_groupproject.dto.payment.PaymentMomoCreateRequestDTO;
import com.fpt.sba301_su26_groupproject.dto.payment.PaymentMomoCreateResponseDTO;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RequestMapping("/api/payments")
@Tag(name = "Payments", description = "MoMo payment APIs")
public interface PaymentAPI {

    @Operation(summary = "Create MoMo payment")
    @PostMapping("/momo/create")
    ResponseEntity<ApiResponse<PaymentMomoCreateResponseDTO>> createMomoPayment(
            @Valid @RequestBody PaymentMomoCreateRequestDTO request);

    @Operation(summary = "MoMo callback (webhook)")
    @PostMapping("/momo/callback")
    ResponseEntity<ApiResponse<Void>> momoCallback(@RequestBody PaymentMomoCallbackDTO callback);
}
