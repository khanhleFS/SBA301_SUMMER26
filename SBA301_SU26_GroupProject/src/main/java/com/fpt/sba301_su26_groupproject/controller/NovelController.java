package com.fpt.sba301_su26_groupproject.controller;

import com.fpt.sba301_su26_groupproject.common.response.ApiResponse;
import com.fpt.sba301_su26_groupproject.dto.novel.NovelRequestDTO;
import com.fpt.sba301_su26_groupproject.dto.novel.NovelResponseDTO;
import com.fpt.sba301_su26_groupproject.service.NovelService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/api/author/novels")
@RequiredArgsConstructor
public class NovelController {

    private final NovelService novelService;

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<NovelResponseDTO>> createNovel(
            @Valid @RequestBody NovelRequestDTO requestDTO,
            Authentication authentication) {
        String authorEmail = authentication.getName();
        NovelResponseDTO createdNovel = novelService.createNovel(requestDTO, authorEmail);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.<NovelResponseDTO>builder()
                        .code(201)
                        .message("Bộ truyện được tạo thành công")
                        .result(createdNovel)
                        .build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<NovelResponseDTO>>> getMyNovels(Authentication authentication) {
        String authorEmail = authentication.getName();
        List<NovelResponseDTO> novels = novelService.getAllNovelsByAuthor(authorEmail);
        return ResponseEntity.ok().body(ApiResponse.<List<NovelResponseDTO>>builder()
                .code(200)
                .message("Lấy danh sách bộ truyện của tác giả thành công")
                .result(novels)
                .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<NovelResponseDTO>> getNovelById(@PathVariable UUID id) {
        NovelResponseDTO novel = novelService.getNovelById(id);
        return ResponseEntity.ok().body(ApiResponse.<NovelResponseDTO>builder()
                .code(200)
                .message("Lấy thông tin bộ truyện thành công")
                .result(novel)
                .build());
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ApiResponse<NovelResponseDTO>> updateNovel(
            @PathVariable UUID id,
            @Valid @RequestBody NovelRequestDTO requestDTO,
            Authentication authentication) {
        String authorEmail = authentication.getName();
        NovelResponseDTO updatedNovel = novelService.updateNovel(id, requestDTO, authorEmail);
        return ResponseEntity.ok().body(ApiResponse.<NovelResponseDTO>builder()
                .code(200)
                .message("Cập nhật thông tin bộ truyện thành công")
                .result(updatedNovel)
                .build());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteNovel(
            @PathVariable UUID id,
            Authentication authentication) {
        String authorEmail = authentication.getName();
        novelService.deleteNovel(id, authorEmail);
        return ResponseEntity.ok().body(ApiResponse.<Void>builder()
                .code(200)
                .message("Xóa bộ truyện thành công")
                .build());
    }
}
