package com.fpt.sba301_su26_groupproject.dto.novel;

import com.fpt.sba301_su26_groupproject.entity.Enumeration.NovelStatus;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.util.List;
import java.util.UUID;

public record NovelRequestDTO(
        @NotBlank(message = "Tiêu đề truyện không được để trống.")
        @Size(max = 255, message = "Tiêu đề truyện không vượt quá 255 ký tự.")
        String title,
        String description,
        @Size(max = 500, message = "Đường dẫn ảnh bìa không vượt quá 500 ký tự.")
        @Pattern(
                regexp = "^(https?|ftp|file)://[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|]$",
                message = "Đường dẫn ảnh bìa không đúng định dạng URL (VD: http://example.com/cover.jpg)."
        )
        String coverImageUrl,
        @NotNull(message = "Trạng thái truyện không được để trống.")
        @Enumerated(EnumType.STRING)
        NovelStatus status, // Enum: ONGOING, COMPLETED, v.v.
        // Danh sách ID thể loại đi kèm
        List<UUID> categoryIds
) {}
