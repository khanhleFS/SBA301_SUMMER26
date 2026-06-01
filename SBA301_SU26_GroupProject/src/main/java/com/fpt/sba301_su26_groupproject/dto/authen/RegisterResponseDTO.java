package com.fpt.sba301_su26_groupproject.dto.authen;

import java.util.UUID;

public record RegisterResponseDTO(
        UUID userId,
        String email,
        String message, // "Đăng ký thành công. Vui lòng kiểm tra OTP trong email."
        boolean requiresOtpVerification
) {}
