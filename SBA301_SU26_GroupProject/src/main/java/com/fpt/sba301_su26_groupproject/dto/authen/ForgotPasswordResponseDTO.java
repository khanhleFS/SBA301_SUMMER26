package com.fpt.sba301_su26_groupproject.dto.authen;

public record ForgotPasswordResponseDTO(
        String email,
        String message,
        boolean success,
        Integer minutesToExpire
) {
}
