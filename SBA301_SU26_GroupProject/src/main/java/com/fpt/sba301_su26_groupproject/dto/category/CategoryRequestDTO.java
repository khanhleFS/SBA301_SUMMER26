package com.fpt.sba301_su26_groupproject.dto.category;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CategoryRequestDTO(
        @NotBlank(message = "Tên thể loại không được để trống.")
        @Size(max = 100, message = "Tên thể loại không vượt quá 100 ký tự.")
        String name
) {}
