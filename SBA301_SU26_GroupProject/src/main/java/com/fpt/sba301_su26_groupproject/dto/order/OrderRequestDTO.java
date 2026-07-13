package com.fpt.sba301_su26_groupproject.dto.order;

import jakarta.validation.constraints.NotNull;
import java.util.UUID;

public record OrderRequestDTO(
    @NotNull(message = "ID gói coin không được để trống")
    UUID coinPackageId
) {}
