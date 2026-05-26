package com.fpt.sba301_su26_groupproject.service.impl;

import com.fpt.sba301_su26_groupproject.dto.novel.NovelRequestDTO;
import com.fpt.sba301_su26_groupproject.dto.novel.NovelResponseDTO;
import com.fpt.sba301_su26_groupproject.entity.*;
import com.fpt.sba301_su26_groupproject.repository.CategoryRepository;
import com.fpt.sba301_su26_groupproject.repository.NovelCategoryRepository;
import com.fpt.sba301_su26_groupproject.repository.NovelRepository;
import com.fpt.sba301_su26_groupproject.repository.UserRepository;
import com.fpt.sba301_su26_groupproject.service.NovelService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NovelServiceImpl implements NovelService {

    private final NovelRepository novelRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final NovelCategoryRepository novelCategoryRepository;

    @Override
    @Transactional
    public NovelResponseDTO createNovel(NovelRequestDTO requestDTO, String authorEmail) {
        User author = userRepository.findByEmail(authorEmail)
                .orElseThrow(() -> new RuntimeException("Author not found"));

        Novel novel = new Novel();
        novel.setTitle(requestDTO.getTitle());
        novel.setSlug(generateSlug(requestDTO.getTitle()));
        novel.setDescription(requestDTO.getDescription());
        novel.setCoverImageUrl(requestDTO.getCoverImageUrl());
        novel.setStatus(requestDTO.getStatus() != null ? requestDTO.getStatus() : "ongoing");
        novel.setViewCount(0);
        novel.setCreatedAt(Instant.now());
        novel.setUpdatedAt(Instant.now());
        novel.setAuthor(author);

        Novel savedNovel = novelRepository.save(novel);

        // Assign Categories
        if (requestDTO.getCategoryIds() != null && !requestDTO.getCategoryIds().isEmpty()) {
            assignCategoriesToNovel(savedNovel, requestDTO.getCategoryIds());
        }

        return mapToResponseDTO(savedNovel);
    }

    @Override
    @Transactional
    public NovelResponseDTO updateNovel(UUID novelId, NovelRequestDTO requestDTO, String authorEmail) {
        Novel novel = novelRepository.findById(novelId)
                .orElseThrow(() -> new RuntimeException("Novel not found"));

        if (!novel.getAuthor().getEmail().equals(authorEmail)) {
            throw new RuntimeException("You do not have permission to update this novel");
        }

        novel.setTitle(requestDTO.getTitle());
        novel.setSlug(generateSlug(requestDTO.getTitle())); 
        novel.setDescription(requestDTO.getDescription());
        novel.setCoverImageUrl(requestDTO.getCoverImageUrl());
        novel.setStatus(requestDTO.getStatus());
        novel.setUpdatedAt(Instant.now());

        Novel updatedNovel = novelRepository.save(novel);

        // Re-assign Categories
        if (requestDTO.getCategoryIds() != null) {
            novelCategoryRepository.deleteByNovelId(updatedNovel.getId());
            assignCategoriesToNovel(updatedNovel, requestDTO.getCategoryIds());
        }

        return mapToResponseDTO(updatedNovel);
    }

    @Override
    @Transactional
    public void deleteNovel(UUID novelId, String authorEmail) {
        Novel novel = novelRepository.findById(novelId)
                .orElseThrow(() -> new RuntimeException("Novel not found"));

        if (!novel.getAuthor().getEmail().equals(authorEmail)) {
            throw new RuntimeException("You do not have permission to delete this novel");
        }

        novelCategoryRepository.deleteByNovelId(novelId);
        novelRepository.delete(novel);
    }

    @Override
    public NovelResponseDTO getNovelById(UUID novelId) {
        Novel novel = novelRepository.findById(novelId)
                .orElseThrow(() -> new RuntimeException("Novel not found"));
        return mapToResponseDTO(novel);
    }

    @Override
    public List<NovelResponseDTO> getAllNovelsByAuthor(String authorEmail) {
        User author = userRepository.findByEmail(authorEmail)
                .orElseThrow(() -> new RuntimeException("Author not found"));
        
        return novelRepository.findByAuthorId(author.getId())
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    private void assignCategoriesToNovel(Novel novel, List<UUID> categoryIds) {
        List<Category> categories = categoryRepository.findAllById(categoryIds);
        for (Category category : categories) {
            NovelCategory novelCategory = new NovelCategory();
            NovelCategoryId id = new NovelCategoryId();
            id.setNovelId(novel.getId());
            id.setCategoryId(category.getId());
            
            novelCategory.setId(id);
            novelCategory.setNovel(novel);
            novelCategory.setCategory(category);
            
            novelCategoryRepository.save(novelCategory);
        }
    }

    private NovelResponseDTO mapToResponseDTO(Novel novel) {
        NovelResponseDTO dto = new NovelResponseDTO();
        dto.setId(novel.getId());
        dto.setTitle(novel.getTitle());
        dto.setSlug(novel.getSlug());
        dto.setDescription(novel.getDescription());
        dto.setCoverImageUrl(novel.getCoverImageUrl());
        dto.setStatus(novel.getStatus());
        dto.setViewCount(novel.getViewCount());
        dto.setCreatedAt(novel.getCreatedAt());
        dto.setUpdatedAt(novel.getUpdatedAt());
        if (novel.getAuthor() != null) {
            dto.setAuthorId(novel.getAuthor().getId());
            dto.setAuthorName(novel.getAuthor().getUsername());
        }
        
        List<NovelCategory> novelCategories = novelCategoryRepository.findByNovelId(novel.getId());
        if (novelCategories != null && !novelCategories.isEmpty()) {
            dto.setCategories(novelCategories.stream()
                    .map(nc -> nc.getCategory().getName())
                    .collect(Collectors.toList()));
        }
        return dto;
    }

    private String generateSlug(String title) {
        if (title == null) return "";
        return title.toLowerCase().replaceAll("[^a-z0-9]+", "-").replaceAll("(^-|-$)", "");
    }
}
