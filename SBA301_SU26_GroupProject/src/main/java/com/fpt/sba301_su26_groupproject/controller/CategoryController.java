package com.fpt.sba301_su26_groupproject.controller;

import com.fpt.sba301_su26_groupproject.common.response.ApiResponse;
import com.fpt.sba301_su26_groupproject.controller.api.CategoryAPI;
import com.fpt.sba301_su26_groupproject.dto.category.CategoryRequestDTO;
import com.fpt.sba301_su26_groupproject.dto.category.CategoryResponseDTO;
import com.fpt.sba301_su26_groupproject.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class CategoryController implements CategoryAPI {

    private final CategoryService categoryService;

    @Override
    public ResponseEntity<ApiResponse<List<CategoryResponseDTO>>> getAllCategories() {
        return ResponseEntity.ok(ApiResponse.<List<CategoryResponseDTO>>builder()
                .code(200)
                .message("Lấy danh sách danh mục thành công")
                .result(categoryService.getAllCategories())
                .build());
    }

    @Override
    public ResponseEntity<ApiResponse<CategoryResponseDTO>> getCategoryById(UUID id) {
        return ResponseEntity.ok(ApiResponse.<CategoryResponseDTO>builder()
                .code(200)
                .message("Lấy thông tin danh mục thành công")
                .result(categoryService.getCategoryById(id))
                .build());
    }

    @Override
    @PreAuthorize("hasAnyRole('ADMIN', 'AUTHOR')")
    public ResponseEntity<ApiResponse<CategoryResponseDTO>> createCategory(CategoryRequestDTO request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.<CategoryResponseDTO>builder()
                .code(201)
                .message("Tạo danh mục thành công")
                .result(categoryService.createCategory(request))
                .build());
    }

    @Override
    @PreAuthorize("hasAnyRole('ADMIN', 'AUTHOR')")
    public ResponseEntity<ApiResponse<CategoryResponseDTO>> updateCategory(UUID id, CategoryRequestDTO request) {
        return ResponseEntity.ok(ApiResponse.<CategoryResponseDTO>builder()
                .code(200)
                .message("Cập nhật danh mục thành công")
                .result(categoryService.updateCategory(id, request))
                .build());
    }

    @Override
    @PreAuthorize("hasAnyRole('ADMIN', 'AUTHOR')")
    public ResponseEntity<ApiResponse<Void>> deleteCategory(UUID id) {
        categoryService.deleteCategory(id);

        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .code(200)
                .message("Xóa danh mục thành công")
                .build());
    }
}