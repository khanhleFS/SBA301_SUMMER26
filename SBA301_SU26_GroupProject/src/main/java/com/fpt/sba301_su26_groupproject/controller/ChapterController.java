package com.fpt.sba301_su26_groupproject.controller;

import com.fpt.sba301_su26_groupproject.common.response.ApiResponse;
import com.fpt.sba301_su26_groupproject.dto.chapter.ChapterRequestDTO;
import com.fpt.sba301_su26_groupproject.dto.chapter.ChapterResponseDTO;
import com.fpt.sba301_su26_groupproject.service.ChapterService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/chapter")
@RequiredArgsConstructor
public class ChapterController {
    private final ChapterService chapterService;
    // TÁC GIẢ: Đăng chương truyện mới
    @PostMapping("/author/novels/{novelId}/chapters")
    public ResponseEntity<ApiResponse<ChapterResponseDTO>> createChapter(
            @PathVariable UUID novelId,
            @Valid @RequestBody ChapterRequestDTO requestDTO,
            Authentication authentication) {
        String authorEmail = authentication.getName();
        ChapterResponseDTO createdChapter = chapterService.createChapter(novelId, requestDTO, authorEmail);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.<ChapterResponseDTO>builder()
                        .code(201)
                        .message("Chương truyện được tạo thành công")
                        .result(createdChapter)
                        .build());
    }
    // ĐỘC GIẢ / PUBLIC: Lấy mục lục chương của bộ truyện
    @GetMapping("/novels/{novelId}/chapters")
    public ResponseEntity<ApiResponse<List<ChapterResponseDTO>>> getChaptersByNovel(@PathVariable UUID novelId) {
        List<ChapterResponseDTO> chapters = chapterService.getChaptersByNovel(novelId);
        return ResponseEntity.ok(ApiResponse.<List<ChapterResponseDTO>>builder()
                .code(200)
                .message("Lấy danh sách chương truyện thành công")
                .result(chapters)
                .build());
    }
    // ĐỘC GIẢ: Đọc nội dung chi tiết chương truyện
    @GetMapping("/novels/{novelId}/chapters/{chapterNumber}")
    public ResponseEntity<ApiResponse<ChapterResponseDTO>> getChapterDetails(
            @PathVariable UUID novelId,
            @PathVariable Integer chapterNumber,
            Authentication authentication) {
        String userEmail = (authentication != null) ? authentication.getName() : null;
        ChapterResponseDTO chapter = chapterService.getChapterDetails(novelId, chapterNumber, userEmail);
        return ResponseEntity.ok(ApiResponse.<ChapterResponseDTO>builder()
                .code(200)
                .message("Lấy thông tin chương truyện thành công")
                .result(chapter)
                .build());
    }
    // TÁC GIẢ: Sửa chương truyện
    @PutMapping("/author/chapters/{chapterId}")
    public ResponseEntity<ApiResponse<ChapterResponseDTO>> updateChapter(
            @PathVariable UUID chapterId,
            @Valid @RequestBody ChapterRequestDTO requestDTO,
            Authentication authentication) {
        String authorEmail = authentication.getName();
        ChapterResponseDTO updatedChapter = chapterService.updateChapter(chapterId, requestDTO, authorEmail);
        return ResponseEntity.ok(ApiResponse.<ChapterResponseDTO>builder()
                .code(200)
                .message("Cập nhật chương truyện thành công")
                .result(updatedChapter)
                .build());
    }
    // TÁC GIẢ: Xóa chương truyện
    @DeleteMapping("/author/chapters/{chapterId}")
    public ResponseEntity<ApiResponse<Void>> deleteChapter(
            @PathVariable UUID chapterId,
            Authentication authentication) {
        String authorEmail = authentication.getName();
        chapterService.deleteChapter(chapterId, authorEmail);
        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .code(200)
                .message("Xóa chương truyện thành công")
                .build());
    }
}
