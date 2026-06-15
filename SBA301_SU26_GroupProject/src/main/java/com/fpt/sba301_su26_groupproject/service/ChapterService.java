package com.fpt.sba301_su26_groupproject.service;

import com.fpt.sba301_su26_groupproject.dto.chapter.ChapterRequestDTO;
import com.fpt.sba301_su26_groupproject.dto.chapter.ChapterResponseDTO;

import java.util.List;
import java.util.UUID;

public interface ChapterService {
    ChapterResponseDTO createChapter(UUID novelId, ChapterRequestDTO requestDTO, String authorEmail);

    // Lấy danh sách chương (mục lục)
    List<ChapterResponseDTO> getChaptersByNovel(UUID novelId);

    // Xem chi tiết chương truyện
    ChapterResponseDTO getChapterDetails(UUID novelId, Integer chapterNumber, String userEmail);

    // Cập nhật chương truyện
    ChapterResponseDTO updateChapter(UUID chapterId, ChapterRequestDTO requestDTO, String authorEmail);

    // Xóa chương truyện
    void deleteChapter(UUID chapterId, String authorEmail);

    // Tạo audio từ nội dung chương bằng Google TTS → upload Cloudinary → lưu URL
    ChapterResponseDTO generateChapterAudio(UUID novelId, Integer chapterNumber);
}
