package com.fpt.sba301_su26_groupproject.dto.coin;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.UUID;

// DTO user gửi lên khi muốn mua gói coin
@Data
public class CoinPurchaseRequestDTO {

    @NotNull(message = "Vui lòng chọn gói coin")
    private UUID packageId;

    @NotBlank(message = "Vui lòng chọn phương thức thanh toán")
    private String paymentMethod; // "VNPAY" | "MOMO"
}
