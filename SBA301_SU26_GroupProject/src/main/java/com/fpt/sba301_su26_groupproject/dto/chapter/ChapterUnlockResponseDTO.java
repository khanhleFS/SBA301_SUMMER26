package com.fpt.sba301_su26_groupproject.dto.chapter;

import lombok.Builder;
import java.time.Instant;
import java.util.UUID;

@Builder
public record ChapterUnlockResponseDTO(
        UUID chapterId,
        UUID novelId,
        Integer chapterNumber,
        String title,
        Integer coinsSpent,
        Integer remainingCoins,
        Instant unlockedAt
) {}
