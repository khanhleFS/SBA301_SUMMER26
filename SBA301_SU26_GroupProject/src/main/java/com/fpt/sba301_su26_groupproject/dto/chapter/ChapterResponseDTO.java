package com.fpt.sba301_su26_groupproject.dto.chapter;

import com.fpt.sba301_su26_groupproject.entity.Enumeration.ChapterStatus;
import lombok.Builder;

import java.time.Instant;
import java.util.UUID;

@Builder
public record ChapterResponseDTO(
         UUID id,
         UUID novelId,
         Integer chapterNumber,
         String title,
         String slug,
         String content,
         String audioUrl,
         ChapterStatus status,
         Integer coinPrice,
         Integer viewCount,
        Instant createdAt,
         Instant updateAt
) {
}
