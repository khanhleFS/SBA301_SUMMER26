package com.fpt.sba301_su26_groupproject.dto.authen;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

public record TokenRefreshRequestDTO(
        @Schema(example = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyQGV4YW1wbGUuY29tIn0...")
        @NotBlank(message = "Refresh token không được để trống")
        String refreshToken
) {
}
