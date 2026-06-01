package com.fpt.sba301_su26_groupproject.dto.coin;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import java.util.UUID;

// DTO user gửi lên khi muốn mua gói coin
public record CoinPurchaseRequestDTO(
        @NotNull(message = "Vui lòng chọn gói coin cần mua.")
        UUID packageId,
        @NotBlank(message = "Vui lòng chọn phương thức thanh toán.")
        @Pattern(
                regexp = "^(VNPAY|MOMO)$",
                message = "Hệ thống chỉ hỗ trợ phương thức thanh toán VNPAY hoặc MOMO."
        )
        String paymentMethod
) {}
