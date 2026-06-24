package com.fpt.sba301_su26_groupproject.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fpt.sba301_su26_groupproject.dto.enumeration.EnumResponseDTO;

import java.util.List;

import com.fpt.sba301_su26_groupproject.common.response.ApiResponse;
import com.fpt.sba301_su26_groupproject.dto.payment.PaymentMomoCallbackDTO;
import com.fpt.sba301_su26_groupproject.dto.payment.PaymentMomoCreateRequestDTO;
import com.fpt.sba301_su26_groupproject.dto.payment.PaymentMomoCreateResponseDTO;
import com.fpt.sba301_su26_groupproject.service.PaymentService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/payments")
@Tag(name = "Payments", description = "MoMo payment APIs")
@RequiredArgsConstructor
@Slf4j
public class PaymentController {

    private final PaymentService paymentService;

    @Operation(summary = "Create MoMo payment")
    @PostMapping("/momo/create")
    public ResponseEntity<ApiResponse<PaymentMomoCreateResponseDTO>> createMomoPayment(
            @Valid @RequestBody PaymentMomoCreateRequestDTO request) {
        PaymentMomoCreateResponseDTO result = paymentService.createMomoPayment(request);
        return ResponseEntity.ok(ApiResponse.<PaymentMomoCreateResponseDTO>builder()
                .code(200)
                .message("MoMo payment created")
                .result(result)
                .build());
    }

    @Operation(summary = "MoMo callback (webhook)")
    @PostMapping("/momo/callback")
    public ResponseEntity<ApiResponse<Void>> momoCallback(@RequestBody PaymentMomoCallbackDTO callback) {
        log.info("Received MoMo callback: {}", callback);
        paymentService.handleMomoCallback(callback);
        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .code(200)
                .message("Callback received")
                .build());
    }

    @Operation(summary = "Get enums")
    @GetMapping("/enums")
    public ResponseEntity<ApiResponse<List<EnumResponseDTO>>> getEnums() {
        return ResponseEntity.ok(ApiResponse.<List<EnumResponseDTO>>builder()
                .code(200)
                .message("Lấy danh sách enums thành công")
                .result(paymentService.getEnums())
                .build());
    }
}
