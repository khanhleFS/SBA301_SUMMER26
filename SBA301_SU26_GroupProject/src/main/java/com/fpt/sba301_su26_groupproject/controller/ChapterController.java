package com.fpt.sba301_su26_groupproject.controller;

import com.fpt.sba301_su26_groupproject.common.response.ApiResponse;
import com.fpt.sba301_su26_groupproject.controller.api.ChapterAPI;
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
@RequiredArgsConstructor
public class ChapterController implements ChapterAPI {

    private final ChapterService chapterService;

    @Override
    public ResponseEntity<ApiResponse<ChapterResponseDTO>> createChapter(
            UUID novelId,
            ChapterRequestDTO request,
            Authentication authentication) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.<ChapterResponseDTO>builder()
                .code(201)
                .message("Chương truyện được tạo thành công")
                .result(chapterService.createChapter(novelId, request, authentication.getName()))
                .build());
    }

    @Override
    public ResponseEntity<ApiResponse<List<ChapterResponseDTO>>> getChaptersByNovel(UUID novelId) {
        return ResponseEntity.ok(ApiResponse.<List<ChapterResponseDTO>>builder()
                .code(200)
                .message("Lấy danh sách chương truyện thành công")
                .result(chapterService.getChaptersByNovel(novelId))
                .build());
    }

    @Override
    public ResponseEntity<ApiResponse<ChapterResponseDTO>> getChapterDetails(
            UUID novelId,
            Integer chapterNumber,
            Authentication authentication) {
        String userEmail = authentication == null ? null : authentication.getName();

        return ResponseEntity.ok(ApiResponse.<ChapterResponseDTO>builder()
                .code(200)
                .message("Lấy thông tin chương truyện thành công")
                .result(chapterService.getChapterDetails(novelId, chapterNumber, userEmail))
                .build());
    }

    @Override
    public ResponseEntity<ApiResponse<ChapterResponseDTO>> updateChapter(
            UUID chapterId,
            ChapterRequestDTO request,
            Authentication authentication) {
        return ResponseEntity.ok(ApiResponse.<ChapterResponseDTO>builder()
                .code(200)
                .message("Cập nhật chương truyện thành công")
                .result(chapterService.updateChapter(chapterId, request, authentication.getName()))
                .build());
    }

    @Override
    public ResponseEntity<ApiResponse<Void>> deleteChapter(UUID chapterId, Authentication authentication) {
        chapterService.deleteChapter(chapterId, authentication.getName());

        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .code(200)
                .message("Xóa chương truyện thành công")
                .build());
    }

    @Override
    public ResponseEntity<ApiResponse<ChapterResponseDTO>> generateChapterAudio(UUID novelId, Integer chapterNumber) {
        return ResponseEntity.ok(ApiResponse.<ChapterResponseDTO>builder()
                .code(200)
                .message("Tạo audio cho chương truyện thành công")
                .result(chapterService.generateChapterAudio(novelId, chapterNumber))
                .build());
    }
}
