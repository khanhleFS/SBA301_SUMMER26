package com.fpt.sba301_su26_groupproject.service.impl;

import com.fpt.sba301_su26_groupproject.common.exception.ApiException;
import com.fpt.sba301_su26_groupproject.common.exception.CommonErrorCode;
import com.fpt.sba301_su26_groupproject.common.exception.NovelErrorCode;
import com.fpt.sba301_su26_groupproject.dto.novel.NovelRequestDTO;
import com.fpt.sba301_su26_groupproject.dto.novel.NovelResponseDTO;
import com.fpt.sba301_su26_groupproject.dto.enumeration.EnumResponseDTO;
import com.fpt.sba301_su26_groupproject.entity.*;
import com.fpt.sba301_su26_groupproject.entity.Enumeration.NovelStatus;
import com.fpt.sba301_su26_groupproject.repository.CategoryRepository;
import com.fpt.sba301_su26_groupproject.repository.EnumRepository;
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
    private final EnumRepository enumRepository;

    @Override
    @Transactional
    public NovelResponseDTO createNovel(NovelRequestDTO requestDTO, String authorEmail) {
        User author = userRepository.findByEmail(authorEmail)
                .orElseThrow(() -> new ApiException(NovelErrorCode.NOVEL_AUTHOR_NOT_FOUND, "Bạn không có quyền đăng truyện"));

        validateRequest(requestDTO);

        Novel novel = new Novel();
        novel.setTitle(requestDTO.title()); // Thay đổi: .getTitle() -> .title()
        novel.setSlug(generateSlug(requestDTO.title())); // Thay đổi: .getTitle() -> .title()
        novel.setDescription(requestDTO.description()); // Thay đổi: .getDescription() -> .description()
        novel.setCoverImageUrl(requestDTO.coverImageUrl()); // Thay đổi: .getCoverImageUrl() -> .coverImageUrl()

        // Thay đổi: status bây giờ là Enum NovelStatus, cần lưu dạng string lowercase xuống DB
        novel.setStatus(requestDTO.status() );

        novel.setViewCount(0);
        novel.setCreatedAt(Instant.now());
        novel.setUpdatedAt(Instant.now());
        novel.setAuthor(author);

        Novel savedNovel = novelRepository.save(novel);

        // Assign Categories
        if (requestDTO.categoryIds() != null && !requestDTO.categoryIds().isEmpty()) {
            assignCategoriesToNovel(savedNovel, requestDTO.categoryIds()); // Thay đổi: .getCategoryIds() -> .categoryIds()
        }


        return mapToResponseDTO(savedNovel);
    }

    @Override
    @Transactional
    public NovelResponseDTO updateNovel(UUID novelId, NovelRequestDTO requestDTO, String authorEmail) {
        Novel novel = novelRepository.findById(novelId)
                .orElseThrow(() -> new ApiException(NovelErrorCode.NOVEL_NOT_FOUND, "Không tìm thấy truyện tương ứng"));

        if (!novel.getAuthor().getEmail().equals(authorEmail)) {
            throw new ApiException(NovelErrorCode.NOVEL_UNAUTHORIZED, "Bạn không có quyền chỉnh sửa truyện này");
        }

        validateRequest(requestDTO);

        novel.setTitle(requestDTO.title());
        novel.setSlug(generateSlug(requestDTO.title()));
        novel.setDescription(requestDTO.description());
        novel.setCoverImageUrl(requestDTO.coverImageUrl());
        novel.setStatus(requestDTO.status());
        novel.setUpdatedAt(Instant.now());

        // 7. Save novel
        Novel updatedNovel;
        try {
            updatedNovel = novelRepository.save(novel);
        } catch (Exception e) {
            throw new ApiException(NovelErrorCode.NOVEL_UPDATE_FAILED);
        }

        // 8. Update categories (nếu có)
        if (requestDTO.categoryIds() != null) {
            // Xóa categories cũ
            try {
                novelCategoryRepository.deleteByNovelId(updatedNovel.getId());
            } catch (Exception e) {
                throw new ApiException(NovelErrorCode.NOVEL_CATEGORY_NOT_ASSIGNED);
            }

            // Gán categories mới
            if (!requestDTO.categoryIds().isEmpty()) {
                // Validate categories tồn tại
                List<Category> categories = categoryRepository.findAllById(requestDTO.categoryIds());
                if (categories.size() != requestDTO.categoryIds().size()) {
                    throw new ApiException(NovelErrorCode.NOVEL_CATEGORY_NOT_FOUND);
                }
                assignCategoriesToNovel(updatedNovel, requestDTO.categoryIds());
            }
        }
        return mapToResponseDTO(updatedNovel);
    }

    @Override
    @Transactional
    public void deleteNovel(UUID novelId, String authorEmail) {
        Novel novel = novelRepository.findById(novelId)
                .orElseThrow(() -> new ApiException(NovelErrorCode.NOVEL_NOT_FOUND, "Truyện không tồn tại"));

        if (!novel.getAuthor().getEmail().equals(authorEmail)) {
            throw new ApiException(NovelErrorCode.NOVEL_UNAUTHORIZED, "Bạn không có quyền xóa truyện này");
        }

        // 3. Xóa categories liên quan trước
        try {
            novelCategoryRepository.deleteByNovelId(novelId);
        } catch (Exception e) {
            throw new ApiException(NovelErrorCode.NOVEL_CATEGORY_NOT_ASSIGNED);
        }

        // 4. Xóa novel
        try {
            novelRepository.delete(novel);
        } catch (Exception e) {
            throw new ApiException(NovelErrorCode.NOVEL_DELETE_FAILED);
        }
    }

    @Override
    public NovelResponseDTO getNovelById(UUID novelId) {
        Novel novel = novelRepository.findById(novelId)
                .orElseThrow(() -> new ApiException(NovelErrorCode.NOVEL_NOT_FOUND, "Novel not found"));
        return mapToResponseDTO(novel);
    }

    @Override
    public List<NovelResponseDTO> getAllNovelsByAuthor(String authorEmail) {
        User author = userRepository.findByEmail(authorEmail)
                .orElseThrow(() -> new ApiException(NovelErrorCode.NOVEL_AUTHOR_NOT_FOUND, "Author not found"));

        return novelRepository.findByAuthorId(author.getId())
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    private void assignCategoriesToNovel(Novel novel, List<UUID> categoryIds) {
        List<Category> categories = categoryRepository.findAllById(categoryIds);

        // Kiểm tra tất cả category đều tồn tại
        if (categories.size() != categoryIds.size()) {
            throw new ApiException(NovelErrorCode.NOVEL_CATEGORY_NOT_FOUND);
        }

        for (Category category : categories) {
            // Kiểm tra category đã được gán chưa
            boolean alreadyAssigned = novelCategoryRepository.existsByNovelIdAndCategoryId(
                    novel.getId(), category.getId()
            );

            if (alreadyAssigned) {
                throw new ApiException(NovelErrorCode.NOVEL_CATEGORY_ALREADY_ASSIGNED);
            }

            NovelCategory novelCategory = new NovelCategory();
            NovelCategoryId id = new NovelCategoryId();
            id.setNovelId(novel.getId());
            id.setCategoryId(category.getId());

            novelCategory.setId(id);
            novelCategory.setNovel(novel);
            novelCategory.setCategory(category);

            try {
                novelCategoryRepository.save(novelCategory);
            } catch (Exception e) {
                throw new ApiException(NovelErrorCode.NOVEL_INVALID);
            }
        }
    }

    private NovelResponseDTO mapToResponseDTO(Novel novel) {
        List<String> categoryNames = List.of();

        try {
            List<NovelCategory> novelCategories = novelCategoryRepository.findByNovelId(novel.getId());
            if (novelCategories != null && !novelCategories.isEmpty()) {
                categoryNames = novelCategories.stream()
                        .map(nc -> nc.getCategory().getName())
                        .collect(Collectors.toList());
            }
        } catch (Exception e) {
            // Nếu lỗi khi lấy categories, vẫn trả về response với categories rỗng
            categoryNames = List.of();
        }

        // 3. Khởi tạo đối tượng Record thông qua Builder cực kỳ sạch sẽ
        return NovelResponseDTO.builder()
                .id(novel.getId())
                .title(novel.getTitle())
                .slug(novel.getSlug())
                .description(novel.getDescription())
                .coverImageUrl(novel.getCoverImageUrl())
                .status(novel.getStatus())
                .viewCount(novel.getViewCount())
                .createdAt(novel.getCreatedAt())
                .updatedAt(novel.getUpdatedAt())
                .authorId(novel.getAuthor() != null ? novel.getAuthor().getId() : null)
                .authorName(novel.getAuthor() != null ? novel.getAuthor().getUsername() : null)
                .categories(categoryNames)
                .build();
    }


    private String generateSlug(String title) {
        if (title == null) return "";
        return title.toLowerCase().replaceAll("[^a-z0-9]+", "-").replaceAll("(^-|-$)", "");
    }

    private void validateRequest(NovelRequestDTO requestDTO) {
        // 2. Validate title không được null hoặc rỗng
        if (requestDTO.title() == null || requestDTO.title().trim().isEmpty()) {
            throw new ApiException(NovelErrorCode.NOVEL_INVALID);
        }

        // 3. Kiểm tra title đã tồn tại chưa
        if (novelRepository.existsByTitle(requestDTO.title())) {
            throw new ApiException(NovelErrorCode.NOVEL_ALREADY_EXISTS);
        }

        // 4. Validate status
        if (requestDTO.status() == null) {
            throw new ApiException(NovelErrorCode.NOVEL_STATUS_INVALID);
        }

        // 5. Validate categories (nếu có)
        if (requestDTO.categoryIds() != null && !requestDTO.categoryIds().isEmpty()) {
            List<Category> categories = categoryRepository.findAllById(requestDTO.categoryIds());
            if (categories.size() != requestDTO.categoryIds().size()) {
                throw new ApiException(NovelErrorCode.NOVEL_CATEGORY_NOT_FOUND);
            }
        }
    }

    @Override
    public List<EnumResponseDTO> getEnums() {
        return enumRepository.getNovelEnums();
    }
}
