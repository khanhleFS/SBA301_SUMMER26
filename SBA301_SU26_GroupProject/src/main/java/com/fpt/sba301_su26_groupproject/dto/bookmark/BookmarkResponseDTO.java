package com.fpt.sba301_su26_groupproject.dto.bookmark;

import lombok.Builder;

import java.time.Instant;
import java.util.UUID;

@Builder
public record BookmarkResponseDTO(
        UUID id,
        Long novelId,
        String novelTitle,
        String novelSlug,
        String coverImageUrl,
        String authorName,
        Long lastChapterId,
        Integer lastChapterNumber,
        String lastChapterTitle,
        String lastChapterSlug,
        Integer totalChapters,
        Boolean isFavorite,
        Integer lastPage,
        Instant createdAt,
        Instant updatedAt
) {}
