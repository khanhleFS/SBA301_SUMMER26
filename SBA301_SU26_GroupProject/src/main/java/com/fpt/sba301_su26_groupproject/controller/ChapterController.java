package com.fpt.sba301_su26_groupproject.controller;

import com.fpt.sba301_su26_groupproject.common.response.ApiResponse;
import com.fpt.sba301_su26_groupproject.dto.chapter.ChapterRequestDTO;
import com.fpt.sba301_su26_groupproject.dto.chapter.ChapterResponseDTO;
import com.fpt.sba301_su26_groupproject.service.ChapterService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.fpt.sba301_su26_groupproject.dto.enumeration.EnumResponseDTO;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api")
@Tag(name = "Chapter APIs", description = "Chapter reading and author chapter management APIs")
@RequiredArgsConstructor
public class ChapterController {

    private final ChapterService chapterService;

    @Operation(
            summary = "Create chapter",
            security = @SecurityRequirement(name = "Bearer Authentication")
    )
    @PostMapping("/author/novels/{novelId}/chapters")
    public ResponseEntity<ApiResponse<ChapterResponseDTO>> createChapter(
            @PathVariable UUID novelId,
            @Valid @RequestBody ChapterRequestDTO request,
            Authentication authentication) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.<ChapterResponseDTO>builder()
                .code(201)
                .message("Chương truyện được tạo thành công")
                .result(chapterService.createChapter(novelId, request, authentication.getName()))
                .build());
    }

    @Operation(summary = "Get chapters by novel")
    @GetMapping("/novels/{novelId}/chapters")
    public ResponseEntity<ApiResponse<List<ChapterResponseDTO>>> getChaptersByNovel(
            @PathVariable UUID novelId) {
        return ResponseEntity.ok(ApiResponse.<List<ChapterResponseDTO>>builder()
                .code(200)
                .message("Lấy danh sách chương truyện thành công")
                .result(chapterService.getChaptersByNovel(novelId))
                .build());
    }

    @Operation(summary = "Get chapter details")
    @GetMapping("/novels/{novelId}/chapters/{chapterNumber}")
    public ResponseEntity<ApiResponse<ChapterResponseDTO>> getChapterDetails(
            @PathVariable UUID novelId,
            @PathVariable Integer chapterNumber,
            Authentication authentication) {
        String userEmail = authentication == null ? null : authentication.getName();

        return ResponseEntity.ok(ApiResponse.<ChapterResponseDTO>builder()
                .code(200)
                .message("Lấy thông tin chương truyện thành công")
                .result(chapterService.getChapterDetails(novelId, chapterNumber, userEmail))
                .build());
    }

    @Operation(
            summary = "Update chapter",
            security = @SecurityRequirement(name = "Bearer Authentication")
    )
    @PutMapping("/author/chapters/{chapterId}")
    public ResponseEntity<ApiResponse<ChapterResponseDTO>> updateChapter(
            @PathVariable UUID chapterId,
            @Valid @RequestBody ChapterRequestDTO request,
            Authentication authentication) {
        return ResponseEntity.ok(ApiResponse.<ChapterResponseDTO>builder()
                .code(200)
                .message("Cập nhật chương truyện thành công")
                .result(chapterService.updateChapter(chapterId, request, authentication.getName()))
                .build());
    }

    @Operation(
            summary = "Delete chapter",
            security = @SecurityRequirement(name = "Bearer Authentication")
    )
    @DeleteMapping("/author/chapters/{chapterId}")
    public ResponseEntity<ApiResponse<Void>> deleteChapter(
            @PathVariable UUID chapterId,
            Authentication authentication) {
        chapterService.deleteChapter(chapterId, authentication.getName());

        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .code(200)
                .message("Xóa chương truyện thành công")
                .build());
    }

    @Operation(summary = "Generate chapter audio")
    @PostMapping("/novels/{novelId}/chapters/{chapterNumber}/audio")
    public ResponseEntity<ApiResponse<ChapterResponseDTO>> generateChapterAudio(
            @PathVariable UUID novelId,
            @PathVariable Integer chapterNumber) {
        return ResponseEntity.ok(ApiResponse.<ChapterResponseDTO>builder()
                .code(200)
                .message("Tạo audio cho chương truyện thành công")
                .result(chapterService.generateChapterAudio(novelId, chapterNumber))
                .build());
    }

    @Operation(summary = "Get enums")
    @GetMapping("/novels/chapters/enums")
    public ResponseEntity<ApiResponse<List<EnumResponseDTO>>> getEnums() {
        return ResponseEntity.ok(ApiResponse.<List<EnumResponseDTO>>builder()
                .code(200)
                .message("Lấy danh sách enums thành công")
                .result(chapterService.getEnums())
                .build());
    }
}
