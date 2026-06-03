package com.fpt.sba301_su26_groupproject.service.impl;

import com.fpt.sba301_su26_groupproject.common.exception.ApiException;
import com.fpt.sba301_su26_groupproject.common.exception.ChapterErrorCode;
import com.fpt.sba301_su26_groupproject.common.exception.NovelErrorCode;
import com.fpt.sba301_su26_groupproject.dto.chapter.ChapterRequestDTO;
import com.fpt.sba301_su26_groupproject.dto.chapter.ChapterResponseDTO;
import com.fpt.sba301_su26_groupproject.entity.Chapter;
import com.fpt.sba301_su26_groupproject.entity.Enumeration.ChapterStatus;
import com.fpt.sba301_su26_groupproject.entity.Novel;
import com.fpt.sba301_su26_groupproject.repository.ChapterRepository;
import com.fpt.sba301_su26_groupproject.repository.NovelRepository;
import com.fpt.sba301_su26_groupproject.service.ChapterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ChapterServiceImpl implements ChapterService {
    @Autowired
    private ChapterRepository chapterRepository;

    @Autowired
    private NovelRepository novelRepository;

    @Override
    @Transactional
    public ChapterResponseDTO createChapter(UUID novelId, ChapterRequestDTO requestDTO, String authorEmail) {
        // 1. Kiểm tra sự tồn tại của truyện
        Novel novel = novelRepository.findById(novelId)
                .orElseThrow(() -> new ApiException(ChapterErrorCode.CHAPTER_NOVEL_NOT_FOUND, "Không tìm thấy truyện tương ứng."));
        // 2. Xác thực quyền sở hữu (Tác giả)
        if (!novel.getAuthor().getEmail().equals(authorEmail)) {
            throw new ApiException(NovelErrorCode.NOVEL_UNAUTHORIZED, "Bạn không có quyền đăng chương cho bộ truyện này.");
        }

        validateChapterRequest(requestDTO);

        // 6. Tự động tính số thứ tự chương tiếp theo (Ngăn ngừa lỗi tác giả nhập trùng số chương)
        Integer maxChapterNum = chapterRepository.findMaxChapterNumberByNovelId(novelId);
        Integer nextChapterNum = maxChapterNum + 1;

        // 7. Tạo mới thực thể chương truyện
        Chapter chapter = new Chapter();
        chapter.setNovel(novel);
        chapter.setChapterNumber(nextChapterNum);
        chapter.setTitle(requestDTO.title());
        chapter.setSlug(generateSlug(nextChapterNum, requestDTO.title()));
        chapter.setContent(requestDTO.content());
        chapter.setStatus(requestDTO.status());
        chapter.setCoinPrice(requestDTO.status().equals(ChapterStatus.FREE) ? 0 : requestDTO.coinPrice());
        chapter.setViewCount(0);
        chapter.setCreatedAt(Instant.now());
        // 8. Cập nhật thời gian update mới nhất của Truyện (để đẩy truyện lên danh sách vừa cập nhật)
        novel.setUpdatedAt(Instant.now());
        novelRepository.save(novel);
        Chapter savedChapter = chapterRepository.save(chapter);
        return mapToResponseDTO(savedChapter);
    }
    @Override
    @Transactional(readOnly = true)
    public List<ChapterResponseDTO> getChaptersByNovel(UUID novelId) {
        if (!novelRepository.existsById(novelId)) {
            throw new ApiException(NovelErrorCode.NOVEL_NOT_FOUND, "Không tìm thấy truyện tương ứng.");
        }
        return chapterRepository.findByNovelIdOrderByChapterNumberAsc(novelId)
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }
    @Override
    @Transactional
    public ChapterResponseDTO getChapterDetails(UUID novelId, Integer chapterNumber, String userEmail) {
        Chapter chapter = chapterRepository.findByNovelIdAndChapterNumber(novelId, chapterNumber)
                .orElseThrow(() -> new ApiException(ChapterErrorCode.CHAPTER_NOT_FOUND, "Không tìm thấy chương truyện tương ứng."));
        // Kiểm tra phí nếu là chương trả phí (VIP)
        if (!chapter.getStatus().equals(ChapterStatus.FREE)) {
            // Ở đây sau này bạn sẽ viết logic tích hợp kiểm tra:
            // if (người dùng chưa mở khóa chương này) { throw new RuntimeException("Chương này cần trả phí để đọc"); }
        }
        // Tăng view count của chương truyện
        chapter.setViewCount(chapter.getViewCount() + 1);
        chapterRepository.save(chapter);
        return mapToResponseDTO(chapter);
    }
    @Override
    @Transactional
    public ChapterResponseDTO updateChapter(UUID chapterId, ChapterRequestDTO requestDTO, String authorEmail) {
        Chapter chapter = chapterRepository.findById(chapterId)
                .orElseThrow(() -> new ApiException(ChapterErrorCode.CHAPTER_NOT_FOUND, "Không tìm thấy chương truyện cần sửa."));
        if (!chapter.getNovel().getAuthor().getEmail().equals(authorEmail)) {
            throw new ApiException(ChapterErrorCode.CHAPTER_UNAUTHORIZED, "Bạn không có quyền chỉnh sửa chương này.");
        }

        validateChapterRequest(requestDTO);

        if (requestDTO.chapterNumber() != null &&
                !requestDTO.chapterNumber().equals(chapter.getChapterNumber())) {

            if (chapterRepository.existsByNovelIdAndChapterNumber(
                    chapter.getNovel().getId(), requestDTO.chapterNumber())) {
                throw new ApiException(ChapterErrorCode.CHAPTER_ALREADY_EXISTS,
                        "Chương số " + requestDTO.chapterNumber() + " đã tồn tại.");
            }
            chapter.setChapterNumber(requestDTO.chapterNumber());
        }

        chapter.setTitle(requestDTO.title());
        chapter.setSlug(generateSlug(chapter.getChapterNumber(), requestDTO.title()));
        chapter.setContent(requestDTO.content());
        chapter.setStatus(requestDTO.status());
        chapter.setCoinPrice(requestDTO.status().equals(ChapterStatus.FREE) ? 0 : requestDTO.coinPrice());
        Chapter updatedChapter = chapterRepository.save(chapter);
        return mapToResponseDTO(updatedChapter);
    }
    @Override
    @Transactional
    public void deleteChapter(UUID chapterId, String authorEmail) {
        Chapter chapter = chapterRepository.findById(chapterId)
                .orElseThrow(() -> new ApiException(ChapterErrorCode.CHAPTER_NOT_FOUND, "Không tìm thấy chương truyện cần xóa."));
        if (!chapter.getNovel().getAuthor().getEmail().equals(authorEmail)) {
            throw new ApiException(ChapterErrorCode.CHAPTER_UNAUTHORIZED, "Bạn không có quyền xóa chương này.");
        }
        chapterRepository.delete(chapter);
    }
    private ChapterResponseDTO mapToResponseDTO(Chapter chapter) {
        return ChapterResponseDTO.builder()
                .id(chapter.getId())
                .chapterNumber(chapter.getChapterNumber())
                .title(chapter.getTitle())
                .slug(chapter.getSlug())
                .content(chapter.getContent())
                .status(chapter.getStatus())
                .coinPrice(chapter.getCoinPrice())
                .viewCount(chapter.getViewCount())
                .createdAt(chapter.getCreatedAt())
                .updateAt(chapter.getUpdateAt())
                .build();
    }
    private String generateSlug(Integer chapterNumber, String title) {
        if (title == null) return "chuong-" + chapterNumber;
        String titleSlug = title.toLowerCase().replaceAll("[^a-z0-9\\p{L}]+", "-").replaceAll("(^-|-$)", "");
        return "chuong-" + chapterNumber + "-" + titleSlug;
    }

    private void validateChapterRequest(ChapterRequestDTO requestDTO) {
        // 3. Validate status
        if (requestDTO.status() == null) {
            throw new ApiException(ChapterErrorCode.CHAPTER_STATUS_INVALID);
        }

        // 4. Validate paid chapter
        if (!requestDTO.status().equals(ChapterStatus.FREE) &&
                (requestDTO.coinPrice() == null || requestDTO.coinPrice() <= 0)) {
            throw new ApiException(ChapterErrorCode.CHAPTER_INVALID,
                    "Chương trả phí bắt buộc phải có giá coin lớn hơn 0.");
        }
    }
}
