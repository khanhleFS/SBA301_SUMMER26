package com.fpt.sba301_su26_groupproject.dto.coin;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CoinUpdateRequestDTO {

    @Size(max = 100, message = "Tên gói tối đa 100 ký tự")
    private String name;

    @Min(value = 1000, message = "Giá tiền tối thiểu 1,000 VNĐ")
    private Integer priceVnd;

    @Min(value = 1, message = "Số coin tối thiểu là 1")
    private Integer baseCoins;

    @Min(value = 0, message = "Coin tặng lần đầu không được âm")
    private Integer firstTimeBonus;

    private Boolean isActive;
}
