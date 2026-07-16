package com.fpt.sba301_su26_groupproject.dto.bookmark;

import java.util.UUID;

public record BookmarkRequestDTO(
        UUID novelId,
        UUID lastChapterId,
        Integer lastPage,
        Boolean isFavorite
) {}
