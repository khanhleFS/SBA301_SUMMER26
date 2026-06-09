package com.fpt.sba301_su26_groupproject.controller.api;

import com.fpt.sba301_su26_groupproject.common.response.ApiResponse;
import com.fpt.sba301_su26_groupproject.dto.category.CategoryRequestDTO;
import com.fpt.sba301_su26_groupproject.dto.category.CategoryResponseDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequestMapping("/api")
@Tag(name = "Category APIs", description = "Category public and admin APIs")
public interface CategoryAPI {

    @Operation(summary = "Get all categories")
    @GetMapping("/categories")
    ResponseEntity<ApiResponse<List<CategoryResponseDTO>>> getAllCategories();

    @Operation(summary = "Get category by ID")
    @GetMapping("/categories/{id}")
    ResponseEntity<ApiResponse<CategoryResponseDTO>> getCategoryById(
            @PathVariable UUID id);

    @Operation(
            summary = "Create category",
            security = @SecurityRequirement(name = "Bearer Authentication")
    )
    @PostMapping("/admin/categories")
    ResponseEntity<ApiResponse<CategoryResponseDTO>> createCategory(
            @Valid @RequestBody CategoryRequestDTO request);

    @Operation(
            summary = "Update category",
            security = @SecurityRequirement(name = "Bearer Authentication")
    )
    @PutMapping("/admin/categories/{id}")
    ResponseEntity<ApiResponse<CategoryResponseDTO>> updateCategory(
            @PathVariable UUID id,
            @Valid @RequestBody CategoryRequestDTO request);

    @Operation(
            summary = "Delete category",
            security = @SecurityRequirement(name = "Bearer Authentication")
    )
    @DeleteMapping("/admin/categories/{id}")
    ResponseEntity<ApiResponse<Void>> deleteCategory(
            @PathVariable UUID id);
}