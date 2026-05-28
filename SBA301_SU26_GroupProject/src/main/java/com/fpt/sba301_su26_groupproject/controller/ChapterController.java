package com.fpt.sba301_su26_groupproject.controller;

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
    public ResponseEntity<ChapterResponseDTO> createChapter(
            @PathVariable UUID novelId,
            @Valid @RequestBody ChapterRequestDTO requestDTO,
            Authentication authentication) {
        String authorEmail = authentication.getName();
        ChapterResponseDTO createdChapter = chapterService.createChapter(novelId, requestDTO, authorEmail);
        return new ResponseEntity<>(createdChapter, HttpStatus.CREATED);
    }
    // ĐỘC GIẢ / PUBLIC: Lấy mục lục chương của bộ truyện
    @GetMapping("/novels/{novelId}/chapters")
    public ResponseEntity<List<ChapterResponseDTO>> getChaptersByNovel(@PathVariable UUID novelId) {
        List<ChapterResponseDTO> chapters = chapterService.getChaptersByNovel(novelId);
        return ResponseEntity.ok(chapters);
    }
    // ĐỘC GIẢ: Đọc nội dung chi tiết chương truyện
    @GetMapping("/novels/{novelId}/chapters/{chapterNumber}")
    public ResponseEntity<ChapterResponseDTO> getChapterDetails(
            @PathVariable UUID novelId,
            @PathVariable Integer chapterNumber,
            Authentication authentication) {
        String userEmail = (authentication != null) ? authentication.getName() : null;
        ChapterResponseDTO chapter = chapterService.getChapterDetails(novelId, chapterNumber, userEmail);
        return ResponseEntity.ok(chapter);
    }
    // TÁC GIẢ: Sửa chương truyện
    @PutMapping("/author/chapters/{chapterId}")
    public ResponseEntity<ChapterResponseDTO> updateChapter(
            @PathVariable UUID chapterId,
            @Valid @RequestBody ChapterRequestDTO requestDTO,
            Authentication authentication) {
        String authorEmail = authentication.getName();
        ChapterResponseDTO updatedChapter = chapterService.updateChapter(chapterId, requestDTO, authorEmail);
        return ResponseEntity.ok(updatedChapter);
    }
    // TÁC GIẢ: Xóa chương truyện
    @DeleteMapping("/author/chapters/{chapterId}")
    public ResponseEntity<Void> deleteChapter(
            @PathVariable UUID chapterId,
            Authentication authentication) {
        String authorEmail = authentication.getName();
        chapterService.deleteChapter(chapterId, authorEmail);
        return ResponseEntity.noContent().build();
    }
}
