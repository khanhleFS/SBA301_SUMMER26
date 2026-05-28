package com.fpt.sba301_su26_groupproject.dto.authen;

import com.fpt.sba301_su26_groupproject.entity.Enumeration.UserRole;

import java.util.UUID;

public record LoginResponseDTO(
        String token,
        String tokenType, // "Bearer"
        UUID userId,
        String username,
        String email,
        UserRole role // USER, AUTHOR, ADMIN (giúp FE hiển thị menu tương ứng ngay lập tức)
) {}

