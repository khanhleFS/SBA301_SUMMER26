package com.fpt.sba301_su26_groupproject.dto.coin;

import lombok.Builder;

import java.time.Instant;
import java.util.UUID;

@Builder
public record CoinTransactionResponseDTO(
        UUID transactionId,
        UUID userId,
        String username,
        Integer amount,
        String transactionType, // "TOP_UP" (Nạp coin) hoặc "UNLOCK_CHAPTER" (Mở khóa truyện)
        String paymentMethod,   // "VNPAY", "MOMO", hoặc "COIN_WALLET"
        String status,          // "PENDING", "SUCCESS", "FAILED"
        Instant createdAt
) {}
