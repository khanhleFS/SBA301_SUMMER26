package com.fpt.sba301_su26_groupproject.dto.coin;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

import java.time.Instant;
import java.util.UUID;

@Builder
public record CoinTransactionResponseDTO(
        @Schema(example = "550e8400-e29b-41d4-a716-446655440000")
        UUID transactionId,
        @Schema(example = "111e8400-e29b-41d4-a716-446655440000")
        UUID userId,
        @Schema(example = "Nguyen Van A")
        String username,
        @Schema(example = "50000")
        Integer amount,
        @Schema(example = "TOP_UP")
        String transactionType, // "TOP_UP" (Nạp coin) hoặc "UNLOCK_CHAPTER" (Mở khóa truyện)
        @Schema(example = "VNPAY")
        String paymentMethod,   // "VNPAY", "MOMO", hoặc "COIN_WALLET"
        @Schema(example = "SUCCESS")
        String status,          // "PENDING", "SUCCESS", "FAILED"
        @Schema(example = "2026-06-09T08:30:00Z")
        Instant createdAt
) {}
