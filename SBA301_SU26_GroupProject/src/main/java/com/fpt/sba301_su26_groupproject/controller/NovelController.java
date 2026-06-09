package com.fpt.sba301_su26_groupproject.controller;

import com.fpt.sba301_su26_groupproject.common.response.ApiResponse;
import com.fpt.sba301_su26_groupproject.controller.api.NovelAPI;
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

@RestController
@RequiredArgsConstructor
public class NovelController implements NovelAPI {

    private final NovelService novelService;

    @Override
    public ResponseEntity<ApiResponse<NovelResponseDTO>> createNovel(
            NovelRequestDTO request,
            Authentication authentication) {
        NovelResponseDTO result = novelService.createNovel(request, authentication.getName());

        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.<NovelResponseDTO>builder()
                .code(201)
                .message("Bộ truyện được tạo thành công")
                .result(result)
                .build());
    }

    @Override
    public ResponseEntity<ApiResponse<List<NovelResponseDTO>>> getMyNovels(Authentication authentication) {
        return ResponseEntity.ok(ApiResponse.<List<NovelResponseDTO>>builder()
                .code(200)
                .message("Lấy danh sách bộ truyện của tác giả thành công")
                .result(novelService.getAllNovelsByAuthor(authentication.getName()))
                .build());
    }

    @Override
    public ResponseEntity<ApiResponse<NovelResponseDTO>> getNovelById(UUID id) {
        return ResponseEntity.ok(ApiResponse.<NovelResponseDTO>builder()
                .code(200)
                .message("Lấy thông tin bộ truyện thành công")
                .result(novelService.getNovelById(id))
                .build());
    }

    @Override
    public ResponseEntity<ApiResponse<NovelResponseDTO>> updateNovel(
            UUID id,
            NovelRequestDTO request,
            Authentication authentication) {
        return ResponseEntity.ok(ApiResponse.<NovelResponseDTO>builder()
                .code(200)
                .message("Cập nhật thông tin bộ truyện thành công")
                .result(novelService.updateNovel(id, request, authentication.getName()))
                .build());
    }

    @Override
    public ResponseEntity<ApiResponse<Void>> deleteNovel(UUID id, Authentication authentication) {
        novelService.deleteNovel(id, authentication.getName());

        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .code(200)
                .message("Xóa bộ truyện thành công")
                .build());
    }
}
