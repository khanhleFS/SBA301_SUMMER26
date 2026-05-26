package com.fpt.sba301_su26_groupproject.dto.coin;


import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CoinCreateRequestDTO {

    @NotBlank(message = "Tên gói không được để trống")
    @Size(max = 100, message = "Tên gói tối đa 100 ký tự")
    private String name;

    @NotNull(message = "Giá tiền không được để trống")
    @Min(value = 1000, message = "Giá tiền tối thiểu 1,000 VNĐ")
    private Integer priceVnd;

    @NotNull(message = "Số coin không được để trống")
    @Min(value = 1, message = "Số coin tối thiểu là 1")
    private Integer baseCoins;

    @NotNull(message = "Coin tặng lần đầu không được để trống")
    @Min(value = 0, message = "Coin tặng lần đầu không được âm")
    private Integer firstTimeBonus;

    private Boolean isActive = true;
}
