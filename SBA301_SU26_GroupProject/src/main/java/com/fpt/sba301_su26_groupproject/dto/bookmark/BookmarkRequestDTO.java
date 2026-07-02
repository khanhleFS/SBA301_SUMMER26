package com.fpt.sba301_su26_groupproject.dto.bookmark;

import java.util.UUID;

/**
 * Request DTO để tạo hoặc cập nhật bookmark.
 *
 * @param novelId       ID của novel cần bookmark (bắt buộc)
 * @param lastChapterId ID của chương đọc cuối (nullable — chỉ update nếu có giá trị)
 * @param lastPage      Số thứ tự chương đọc cuối (nullable)
 * @param isFavorite    Đánh dấu yêu thích hay không (nullable — giữ nguyên nếu null)
 */
public record BookmarkRequestDTO(
        UUID novelId,
        UUID lastChapterId,
        Integer lastPage,
        Boolean isFavorite
) {}
