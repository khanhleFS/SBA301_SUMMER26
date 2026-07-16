package com.fpt.sba301_su26_groupproject.service;

import com.fpt.sba301_su26_groupproject.dto.enumeration.EnumResponseDTO;
import com.fpt.sba301_su26_groupproject.dto.chapter.ChapterRequestDTO;
import com.fpt.sba301_su26_groupproject.dto.chapter.ChapterResponseDTO;

import com.fpt.sba301_su26_groupproject.dto.chapter.ChapterUnlockResponseDTO;

import java.util.List;
import java.util.UUID;

public interface ChapterService {
    ChapterResponseDTO createChapter(UUID novelId, ChapterRequestDTO requestDTO, String authorEmail);

    List<ChapterResponseDTO> getChaptersByNovel(UUID novelId);

    ChapterResponseDTO getChapterDetails(UUID novelId, Integer chapterNumber, String userEmail);

    ChapterResponseDTO updateChapter(UUID chapterId, ChapterRequestDTO requestDTO, String authorEmail);

    void deleteChapter(UUID chapterId, String authorEmail);

    ChapterResponseDTO generateChapterAudio(UUID novelId, Integer chapterNumber);

    ChapterUnlockResponseDTO unlockChapter(UUID novelId, Integer chapterNumber, String userEmail);

    List<EnumResponseDTO> getEnums();
}
