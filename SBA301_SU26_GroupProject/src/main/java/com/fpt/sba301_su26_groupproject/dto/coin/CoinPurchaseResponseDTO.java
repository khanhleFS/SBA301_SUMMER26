package com.fpt.sba301_su26_groupproject.dto.coin;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class CoinPurchaseResponseDTO {

    private UUID    paymentId;
    private String  paymentUrl;       // Link redirect sang VNPay/MoMo

    private String  packageName;
    private Integer priceVnd;
    private Integer baseCoins;
    private Integer firstTimeBonus;   // 0 nếu không phải lần đầu
    private Integer totalCoins;       // Tổng thực nhận = baseCoins + firstTimeBonus

    private boolean isFirstTimeTopUp; // Frontend dùng để hiển thị thông báo chúc mừng
}
