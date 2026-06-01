package com.fpt.sba301_su26_groupproject.dto.chapter;

import com.fpt.sba301_su26_groupproject.entity.Enumeration.ChapterStatus;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ChapterRequestDTO(
        @NotBlank(message = "Tiêu đề chương không được để trống.")
        @Size(max = 255, message = "Tiêu đề chương không vượt quá 255 ký tự.")
        String title,

        @NotBlank(message = "Nội dung chương không được để trống.")
        String content,

        @NotNull(message = "Vui lòng chọn trạng thái chương.")
        @NotBlank(message = "Trạng thái chương không được để trống.")
        ChapterStatus status,

        @NotNull(message = "Vui lòng chọn chương miễn phí hay trả phí.")
        @Min(value = 0, message = "Giá coin không được là số âm.")
         Integer coinPrice
) {
}
