package com.fpt.sba301_su26_groupproject.dto.coin;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.Data;

public record CoinUpdateRequestDTO(
        @Size(max = 100, message = "Tên gói coin tối đa 100 ký tự.")
        String name,
        @Min(value = 1000, message = "Giá tiền cập nhật tối thiểu là 1,000 VNĐ.")
        Integer priceVnd,
        @Min(value = 1, message = "Số lượng coin cập nhật tối thiểu là 1.")
        Integer baseCoins,
        @Min(value = 0, message = "Coin khuyến mãi lần đầu không được phép âm.")
        Integer firstTimeBonus,
        Boolean isActive
) {}
