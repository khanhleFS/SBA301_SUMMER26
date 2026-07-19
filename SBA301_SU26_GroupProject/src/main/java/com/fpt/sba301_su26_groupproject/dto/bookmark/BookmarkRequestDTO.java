package com.fpt.sba301_su26_groupproject.dto.bookmark;

import java.util.UUID;

public record BookmarkRequestDTO(
        Long novelId,
        Long lastChapterId,
        Integer lastPage,
        Boolean isFavorite
) {}
