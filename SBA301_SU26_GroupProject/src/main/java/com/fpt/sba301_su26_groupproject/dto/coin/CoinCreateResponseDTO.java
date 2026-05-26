package com.fpt.sba301_su26_groupproject.dto.coin;

import lombok.Builder;
import lombok.Data;

import java.time.Instant;
import java.util.UUID;

@Data
@Builder
public class CoinCreateResponseDTO {

    private UUID    id;
    private String  name;
    private Integer priceVnd;
    private Integer baseCoins;
    private Integer firstTimeBonus;
    private Integer totalCoinsIfFirst;  // baseCoins + firstTimeBonus (cho user chưa nạp lần nào)
    private Integer totalCoinsNormal;   // baseCoins (cho user đã nạp rồi)// > 0 thì frontend hiển thị badge "Tặng thêm lần đầu"
    private Boolean isActive;
    private Instant createdAt;
    private Instant updatedAt;
}