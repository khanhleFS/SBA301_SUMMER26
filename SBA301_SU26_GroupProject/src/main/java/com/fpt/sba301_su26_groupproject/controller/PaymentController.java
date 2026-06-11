package com.fpt.sba301_su26_groupproject.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.fpt.sba301_su26_groupproject.common.response.ApiResponse;
import com.fpt.sba301_su26_groupproject.controller.api.PaymentAPI;
import com.fpt.sba301_su26_groupproject.dto.payment.PaymentMomoCallbackDTO;
import com.fpt.sba301_su26_groupproject.dto.payment.PaymentMomoCreateRequestDTO;
import com.fpt.sba301_su26_groupproject.dto.payment.PaymentMomoCreateResponseDTO;
import com.fpt.sba301_su26_groupproject.service.PaymentService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@Slf4j
public class PaymentController implements PaymentAPI {

    private final PaymentService paymentService;

    @Override
    public ResponseEntity<ApiResponse<PaymentMomoCreateResponseDTO>> createMomoPayment(@Valid PaymentMomoCreateRequestDTO request) {
        PaymentMomoCreateResponseDTO result = paymentService.createMomoPayment(request);
        return ResponseEntity.ok(ApiResponse.<PaymentMomoCreateResponseDTO>builder()
                .code(200)
                .message("MoMo payment created (test)")
                .result(result)
                .build());
    }

    @Override
    public ResponseEntity<ApiResponse<Void>> momoCallback(PaymentMomoCallbackDTO callback) {
        log.info("Received MoMo callback: {}", callback);
        paymentService.handleMomoCallback(callback);
        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .code(200)
                .message("Callback received")
                .build());
    }
}
