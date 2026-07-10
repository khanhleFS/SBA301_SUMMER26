package com.fpt.sba301_su26_groupproject.dto.order;

import com.fpt.sba301_su26_groupproject.entity.Enumeration.OrderStatus;
import lombok.Builder;
import java.time.LocalDateTime;
import java.util.UUID;
import java.time.Instant;

@Builder
public record OrderResponseDTO(
    UUID id,
    UUID userId,
    String username,
    UUID coinPackageId,
    String coinPackageName,
    Integer amountVnd,
    Integer coins,
    OrderStatus status,
    Instant createdAt
) {}
