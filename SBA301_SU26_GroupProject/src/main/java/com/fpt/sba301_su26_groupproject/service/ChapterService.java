package com.fpt.sba301_su26_groupproject.service;

import com.fpt.sba301_su26_groupproject.dto.enumeration.EnumResponseDTO;
import com.fpt.sba301_su26_groupproject.dto.chapter.ChapterRequestDTO;
import com.fpt.sba301_su26_groupproject.dto.chapter.ChapterResponseDTO;

import com.fpt.sba301_su26_groupproject.dto.chapter.ChapterUnlockResponseDTO;

import java.util.List;
import java.util.UUID;

public interface ChapterService {
    ChapterResponseDTO createChapter(Long novelId, ChapterRequestDTO requestDTO, String authorEmail);

    List<ChapterResponseDTO> getChaptersByNovel(Long novelId);

    ChapterResponseDTO getChapterDetails(Long novelId, Integer chapterNumber, String userEmail);

    ChapterResponseDTO readChapter(Long novelId, Integer chapterNumber, String userEmail);

    ChapterResponseDTO updateChapter(Long chapterId, ChapterRequestDTO requestDTO, String authorEmail);

    void deleteChapter(Long chapterId, String authorEmail);

    ChapterResponseDTO generateChapterAudio(Long novelId, Integer chapterNumber);

    ChapterUnlockResponseDTO unlockChapter(Long novelId, Integer chapterNumber, String userEmail);

    List<EnumResponseDTO> getEnums();
}
