package com.fpt.sba301_su26_groupproject.service;

import com.fpt.sba301_su26_groupproject.dto.bookmark.BookmarkRequestDTO;
import com.fpt.sba301_su26_groupproject.dto.bookmark.BookmarkResponseDTO;

import java.util.List;
import java.util.UUID;

public interface BookmarkService {

    BookmarkResponseDTO upsertBookmark(BookmarkRequestDTO request, String userEmail);

    void removeBookmark(UUID novelId, String userEmail);

    BookmarkResponseDTO getBookmark(UUID novelId, String userEmail);

    List<BookmarkResponseDTO> getMyBookmarks(String userEmail);
}
