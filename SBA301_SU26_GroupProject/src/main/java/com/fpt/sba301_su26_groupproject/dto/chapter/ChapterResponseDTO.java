package com.fpt.sba301_su26_groupproject.dto.chapter;

import com.fpt.sba301_su26_groupproject.entity.Enumeration.ChapterStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

import java.time.Instant;
import java.util.UUID;

@Builder
public record ChapterResponseDTO(
         @Schema(example = "550e8400-e29b-41d4-a716-446655440000")
         UUID id,
         @Schema(example = "111e8400-e29b-41d4-a716-446655440000")
         UUID novelId,
         @Schema(example = "1")
         Integer chapterNumber,
         @Schema(example = "Chapter 1: The Beginning")
         String title,
         @Schema(example = "chapter-1-the-beginning")
         String slug,
         @Schema(example = "The night was silent when the journey began...")
         String content,
         @Schema(example = "https://cdn.example.com/audio/chapter-1.mp3")
         String audioUrl,
         @Schema(example = "UNLOCKED")
         ChapterStatus status,
         @Schema(example = "0")
         Integer coinPrice,
         @Schema(example = "325")
         Integer viewCount,
        @Schema(example = "2026-06-09T08:30:00Z")
        Instant createdAt,
         @Schema(example = "2026-06-09T09:00:00Z")
         Instant updateAt
) {
}
