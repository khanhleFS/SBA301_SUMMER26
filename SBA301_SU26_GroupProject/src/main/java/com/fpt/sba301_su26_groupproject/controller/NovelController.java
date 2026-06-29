package com.fpt.sba301_su26_groupproject.controller;

import com.fpt.sba301_su26_groupproject.common.response.ApiResponse;
import com.fpt.sba301_su26_groupproject.dto.novel.NovelPageResponseDTO;
import com.fpt.sba301_su26_groupproject.dto.novel.NovelRequestDTO;
import com.fpt.sba301_su26_groupproject.dto.novel.NovelResponseDTO;
import com.fpt.sba301_su26_groupproject.service.NovelService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.fpt.sba301_su26_groupproject.dto.enumeration.EnumResponseDTO;

import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("/api")
@Tag(name = "Novel APIs", description = "Novel management APIs")
@RequiredArgsConstructor
public class NovelController {

    private final NovelService novelService;

    @Operation(
            summary = "Create novel",
            security = @SecurityRequirement(name = "Bearer Authentication")
    )
    @PostMapping("/author/novels")
    public ResponseEntity<ApiResponse<NovelResponseDTO>> createNovel(
            @Valid @RequestBody NovelRequestDTO request,
            Authentication authentication) {
        NovelResponseDTO result = novelService.createNovel(request, authentication.getName());

        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.<NovelResponseDTO>builder()
                .code(201)
                .message("Bộ truyện được tạo thành công")
                .result(result)
                .build());
    }

    @Operation(
            summary = "Get my novels",
            security = @SecurityRequirement(name = "Bearer Authentication")
    )
    @GetMapping("/author/novels")
    public ResponseEntity<ApiResponse<List<NovelResponseDTO>>> getMyNovels(Authentication authentication) {
        return ResponseEntity.ok(ApiResponse.<List<NovelResponseDTO>>builder()
                .code(200)
                .message("Lấy danh sách bộ truyện của tác giả thành công")
                .result(novelService.getAllNovelsByAuthor(authentication.getName()))
                .build());
    }

    @Operation(
            summary = "Get novel by ID (Author)",
            security = @SecurityRequirement(name = "Bearer Authentication")
    )
    @GetMapping("/author/novels/{id}")
    public ResponseEntity<ApiResponse<NovelResponseDTO>> getNovelById(
            @PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.<NovelResponseDTO>builder()
                .code(200)
                .message("Lấy thông tin bộ truyện thành công")
                .result(novelService.getNovelById(id))
                .build());
    }

    @Operation(summary = "Search novels (Guest/Reader)")
    @GetMapping("/novels")
    public ResponseEntity<ApiResponse<NovelPageResponseDTO>> searchNovels(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) Integer minChapters,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(ApiResponse.<NovelPageResponseDTO>builder()
                .code(200)
                .message("Lấy danh sách truyện thành công")
                .result(novelService.searchNovels(q, status, category, minChapters, page, size))
                .build());
    }


    @Operation(summary = "Get novel by ID (Guest/Reader)")
    @GetMapping("/novels/{id}")
    public ResponseEntity<ApiResponse<NovelResponseDTO>> getPublicNovelById(
            @PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.<NovelResponseDTO>builder()
                .code(200)
                .message("Lấy thông tin bộ truyện thành công")
                .result(novelService.getNovelById(id))
                .build());
    }

    @Operation(
            summary = "Update novel",
            security = @SecurityRequirement(name = "Bearer Authentication")
    )
    @PutMapping("/author/novels/{id}")
    public ResponseEntity<ApiResponse<NovelResponseDTO>> updateNovel(
            @PathVariable UUID id,
            @Valid @RequestBody NovelRequestDTO request,
            Authentication authentication) {
        return ResponseEntity.ok(ApiResponse.<NovelResponseDTO>builder()
                .code(200)
                .message("Cập nhật thông tin bộ truyện thành công")
                .result(novelService.updateNovel(id, request, authentication.getName()))
                .build());
    }

    @Operation(
            summary = "Delete novel",
            security = @SecurityRequirement(name = "Bearer Authentication")
    )
    @DeleteMapping("/author/novels/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteNovel(
            @PathVariable UUID id,
            Authentication authentication) {
        novelService.deleteNovel(id, authentication.getName());

        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .code(200)
                .message("Xóa bộ truyện thành công")
                .build());
    }

    @Operation(summary = "Get enums")
    @GetMapping("/author/novels/enums")
    public ResponseEntity<ApiResponse<List<EnumResponseDTO>>> getEnums() {
        return ResponseEntity.ok(ApiResponse.<List<EnumResponseDTO>>builder()
                .code(200)
                .message("Lấy danh sách enums thành công")
                .result(novelService.getEnums())
                .build());
    }
}
