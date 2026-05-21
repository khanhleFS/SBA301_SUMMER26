package com.fpt.sba301_su26_groupproject.dto.novel;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class NovelRequestDTO {
    @NotBlank(message = "Title is required")
    @Size(max = 255)
    private String title;

    private String description;

    @Size(max = 500)
    private String coverImageUrl;

    @NotBlank(message = "Status is required")
    @Size(max = 20)
    private String status; // "ongoing", "completed", etc.

    // A list of category IDs to associate with this novel
    private List<UUID> categoryIds;
}
