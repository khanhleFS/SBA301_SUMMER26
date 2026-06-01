package com.fpt.sba301_su26_groupproject.dto.novel;

import com.fpt.sba301_su26_groupproject.entity.Enumeration.NovelStatus;
import lombok.Builder;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Builder
public record NovelResponseDTO(
        UUID id,
        String title,
        String slug,
        String description,
        String coverImageUrl,
        NovelStatus status,
        Integer viewCount,
        Instant createdAt,
        Instant updatedAt,
        UUID authorId,
        String authorName,
        List<String> categories
) {}
