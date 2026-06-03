package com.fpt.sba301_su26_groupproject.controller;

import com.fpt.sba301_su26_groupproject.common.response.ApiResponse;
import com.fpt.sba301_su26_groupproject.dto.category.CategoryRequestDTO;
import com.fpt.sba301_su26_groupproject.dto.category.CategoryResponseDTO;
import com.fpt.sba301_su26_groupproject.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping("/categories")
    public ResponseEntity<ApiResponse<List<CategoryResponseDTO>>> getAllCategories() {
        List<CategoryResponseDTO> categories = categoryService.getAllCategories();
        ApiResponse<List<CategoryResponseDTO>> response = ApiResponse.<List<CategoryResponseDTO>>builder()
                .code(200)
                .message("Lấy danh sách danh mục thành công")
                .result(categories)
                .build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/categories/{id}")
    public ResponseEntity<ApiResponse<CategoryResponseDTO>> getCategoryById(@PathVariable UUID id) {
        CategoryResponseDTO category = categoryService.getCategoryById(id);
        ApiResponse<CategoryResponseDTO> response = ApiResponse.<CategoryResponseDTO>builder()
                .code(200)
                .message("Lấy thông tin danh mục thành công")
                .result(category)
                .build();
        return ResponseEntity.ok(response);
    }

    @PostMapping("/admin/categories")
    @PreAuthorize("hasAnyRole('ADMIN', 'AUTHOR')")
    public ResponseEntity<ApiResponse<CategoryResponseDTO>> createCategory(@Valid @RequestBody CategoryRequestDTO request) {
        CategoryResponseDTO createdCategory = categoryService.createCategory(request);
        ApiResponse<CategoryResponseDTO> response = ApiResponse.<CategoryResponseDTO>builder()
                .code(201)
                .message("Tạo danh mục thành công")
                .result(createdCategory)
                .build();
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/admin/categories/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'AUTHOR')")
    public ResponseEntity<ApiResponse<CategoryResponseDTO>> updateCategory(
            @PathVariable UUID id,
            @Valid @RequestBody CategoryRequestDTO request) {
        CategoryResponseDTO updatedCategory = categoryService.updateCategory(id, request);
        ApiResponse<CategoryResponseDTO> response = ApiResponse.<CategoryResponseDTO>builder()
                .code(200)
                .message("Cập nhật danh mục thành công")
                .result(updatedCategory)
                .build();
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/admin/categories/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'AUTHOR')")
    public ResponseEntity<ApiResponse<Void>> deleteCategory(@PathVariable UUID id) {
        categoryService.deleteCategory(id);
        ApiResponse<Void> response = ApiResponse.<Void>builder()
                .code(200)
                .message("Xóa danh mục thành công")
                .build();
        return ResponseEntity.ok(response);
    }
}
