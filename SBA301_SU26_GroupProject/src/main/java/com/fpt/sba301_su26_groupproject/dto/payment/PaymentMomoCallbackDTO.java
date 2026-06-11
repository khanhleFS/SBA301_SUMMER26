package com.fpt.sba301_su26_groupproject.dto.payment;

import io.swagger.v3.oas.annotations.media.Schema;

public record PaymentMomoCallbackDTO(
        @Schema(example = "REQUEST_ID_123")
        String requestId,
        @Schema(example = "ORDER001")
        String orderId,
        @Schema(example = "100000")
        Integer amount,
        @Schema(example = "SUCCESS")
        String resultCode,
        @Schema(example = "some transaction id")
        String transId
) {}
