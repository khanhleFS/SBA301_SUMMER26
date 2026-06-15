package com.fpt.sba301_su26_groupproject.controller.api;

import com.fpt.sba301_su26_groupproject.common.response.ApiResponse;
import com.fpt.sba301_su26_groupproject.dto.chapter.ChapterRequestDTO;
import com.fpt.sba301_su26_groupproject.dto.chapter.ChapterResponseDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequestMapping("/api")
@Tag(name = "Chapter APIs", description = "Chapter reading and author chapter management APIs")
public interface ChapterAPI {

    @Operation(
            summary = "Create chapter",
            security = @SecurityRequirement(name = "Bearer Authentication")
    )
    @PostMapping("/author/novels/{novelId}/chapters")
    ResponseEntity<ApiResponse<ChapterResponseDTO>> createChapter(
            @PathVariable UUID novelId,
            @Valid @RequestBody ChapterRequestDTO request,
            Authentication authentication);

    @Operation(summary = "Get chapters by novel")
    @GetMapping("/novels/{novelId}/chapters")
    ResponseEntity<ApiResponse<List<ChapterResponseDTO>>> getChaptersByNovel(
            @PathVariable UUID novelId);

    @Operation(summary = "Get chapter details")
    @GetMapping("/novels/{novelId}/chapters/{chapterNumber}")
    ResponseEntity<ApiResponse<ChapterResponseDTO>> getChapterDetails(
            @PathVariable UUID novelId,
            @PathVariable Integer chapterNumber,
            Authentication authentication);

    @Operation(
            summary = "Update chapter",
            security = @SecurityRequirement(name = "Bearer Authentication")
    )
    @PutMapping("/author/chapters/{chapterId}")
    ResponseEntity<ApiResponse<ChapterResponseDTO>> updateChapter(
            @PathVariable UUID chapterId,
            @Valid @RequestBody ChapterRequestDTO request,
            Authentication authentication);

    @Operation(
            summary = "Delete chapter",
            security = @SecurityRequirement(name = "Bearer Authentication")
    )
    @DeleteMapping("/author/chapters/{chapterId}")
    ResponseEntity<ApiResponse<Void>> deleteChapter(
            @PathVariable UUID chapterId,
            Authentication authentication);

    @Operation(summary = "Generate chapter audio")
    @PostMapping("/novels/{novelId}/chapters/{chapterNumber}/audio")
    ResponseEntity<ApiResponse<ChapterResponseDTO>> generateChapterAudio(
            @PathVariable UUID novelId,
            @PathVariable Integer chapterNumber);
}