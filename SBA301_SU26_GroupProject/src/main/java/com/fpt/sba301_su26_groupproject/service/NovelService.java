package com.fpt.sba301_su26_groupproject.service;

import com.fpt.sba301_su26_groupproject.dto.enumeration.EnumResponseDTO;
import com.fpt.sba301_su26_groupproject.dto.novel.NovelPageResponseDTO;
import com.fpt.sba301_su26_groupproject.dto.novel.NovelRequestDTO;
import com.fpt.sba301_su26_groupproject.dto.novel.NovelResponseDTO;

import java.util.List;
import java.util.UUID;

public interface NovelService {
    NovelResponseDTO createNovel(NovelRequestDTO requestDTO, String authorEmail);
    NovelResponseDTO updateNovel(UUID novelId, NovelRequestDTO requestDTO, String authorEmail);
    void deleteNovel(UUID novelId, String authorEmail);
    NovelResponseDTO getNovelById(UUID novelId);
    List<NovelResponseDTO> getAllNovelsByAuthor(String authorEmail);
    List<EnumResponseDTO> getEnums();
    NovelPageResponseDTO searchNovels(String title, String status, String categoryName, Integer minChapters, int page, int size);
}

