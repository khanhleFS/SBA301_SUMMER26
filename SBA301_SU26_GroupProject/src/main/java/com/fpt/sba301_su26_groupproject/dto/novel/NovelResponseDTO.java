package com.fpt.sba301_su26_groupproject.dto.novel;

import lombok.Data;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Data
public class NovelResponseDTO {
    private UUID id;
    private String title;
    private String slug;
    private String description;
    private String coverImageUrl;
    private String status;
    private Integer viewCount;
    private Instant createdAt;
    private Instant updatedAt;

    private UUID authorId;
    private String authorName;

    // We can also include Category names if needed
    private List<String> categories;
}
