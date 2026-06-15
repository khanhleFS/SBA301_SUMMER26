package com.fpt.sba301_su26_groupproject.controller.api;

import com.fpt.sba301_su26_groupproject.common.response.ApiResponse;
import com.fpt.sba301_su26_groupproject.dto.novel.NovelRequestDTO;
import com.fpt.sba301_su26_groupproject.dto.novel.NovelResponseDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequestMapping("/api/author/novels")
@Tag(name = "Novel APIs", description = "Author novel management APIs")
@SecurityRequirement(name = "Bearer Authentication")
public interface NovelAPI {

    @Operation(summary = "Create novel")
    @PostMapping
    ResponseEntity<ApiResponse<NovelResponseDTO>> createNovel(
            @Valid @RequestBody NovelRequestDTO request,
            Authentication authentication);

    @Operation(summary = "Get my novels")
    @GetMapping
    ResponseEntity<ApiResponse<List<NovelResponseDTO>>> getMyNovels(
            Authentication authentication);

    @Operation(summary = "Get novel by ID")
    @GetMapping("/{id}")
    ResponseEntity<ApiResponse<NovelResponseDTO>> getNovelById(
            @PathVariable UUID id);

    @Operation(summary = "Update novel")
    @PutMapping("/{id}")
    ResponseEntity<ApiResponse<NovelResponseDTO>> updateNovel(
            @PathVariable UUID id,
            @Valid @RequestBody NovelRequestDTO request,
            Authentication authentication);

    @Operation(summary = "Delete novel")
    @DeleteMapping("/{id}")
    ResponseEntity<ApiResponse<Void>> deleteNovel(
            @PathVariable UUID id,
            Authentication authentication);
}