package com.fpt.sba301_su26_groupproject.dto.coin;

import lombok.Builder;
import lombok.Data;

import java.time.Instant;
import java.util.UUID;

@Builder
public record CoinCreateResponseDTO(
        UUID id,
        String name,
        Integer priceVnd,
        Integer baseCoins,
        Integer firstTimeBonus,
        Integer totalCoinsIfFirst, // Tổng coin thực nhận = baseCoins + firstTimeBonus
        Integer totalCoinsNormal,  // Chỉ nhận baseCoins
        Boolean isActive,
        Instant createdAt,
        Instant updatedAt
) {}