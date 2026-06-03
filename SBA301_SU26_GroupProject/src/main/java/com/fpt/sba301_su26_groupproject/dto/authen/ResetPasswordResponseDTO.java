package com.fpt.sba301_su26_groupproject.dto.authen;

import java.util.UUID;

public record ResetPasswordResponseDTO(
        String email,
        String message,
        UUID userId,
        String redirectUrl
) {
}
