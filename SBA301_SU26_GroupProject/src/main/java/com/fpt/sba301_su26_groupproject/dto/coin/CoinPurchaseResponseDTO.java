package com.fpt.sba301_su26_groupproject.dto.coin;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;


@Builder
public record CoinPurchaseResponseDTO(
        UUID paymentId,
        String paymentUrl,         // Link redirect sang cổng thanh toán VNPay/MoMo
        String packageName,
        Integer priceVnd,
        Integer baseCoins,
        Integer firstTimeBonus,
        Integer totalCoins,        // Tổng coin thực nhận
        boolean isFirstTimeTopUp   // Sử dụng dạng boolean nguyên thủy (primitive) cho record
) {}
