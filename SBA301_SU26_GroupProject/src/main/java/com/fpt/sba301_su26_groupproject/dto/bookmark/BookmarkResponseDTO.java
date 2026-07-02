package com.fpt.sba301_su26_groupproject.dto.bookmark;

import lombok.Builder;

import java.time.Instant;
import java.util.UUID;

/**
 * Response DTO trả về thông tin bookmark kèm thông tin truyện.
 */
@Builder
public record BookmarkResponseDTO(
        UUID id,
        UUID novelId,
        String novelTitle,
        String novelSlug,
        String coverImageUrl,
        String authorName,
        UUID lastChapterId,
        Integer lastChapterNumber,
        String lastChapterTitle,
        String lastChapterSlug,
        Integer totalChapters,
        Boolean isFavorite,
        Integer lastPage,
        Instant createdAt,
        Instant updatedAt
) {}
