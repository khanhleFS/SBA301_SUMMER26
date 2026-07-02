package com.fpt.sba301_su26_groupproject.service;

import com.fpt.sba301_su26_groupproject.dto.bookmark.BookmarkRequestDTO;
import com.fpt.sba301_su26_groupproject.dto.bookmark.BookmarkResponseDTO;

import java.util.List;
import java.util.UUID;

public interface BookmarkService {

    /**
     * Tạo mới hoặc cập nhật bookmark của user cho một novel.
     * Nếu bookmark chưa tồn tại → tạo mới.
     * Nếu đã tồn tại → chỉ update các fields được cung cấp (non-null).
     */
    BookmarkResponseDTO upsertBookmark(BookmarkRequestDTO request, String userEmail);

    /**
     * Xóa bookmark của user cho một novel.
     */
    void removeBookmark(UUID novelId, String userEmail);

    /**
     * Lấy thông tin bookmark của user cho một novel cụ thể.
     * Trả về null nếu chưa bookmark.
     */
    BookmarkResponseDTO getBookmark(UUID novelId, String userEmail);

    /**
     * Lấy toàn bộ danh sách bookmark của user (mới nhất trước).
     */
    List<BookmarkResponseDTO> getMyBookmarks(String userEmail);
}
