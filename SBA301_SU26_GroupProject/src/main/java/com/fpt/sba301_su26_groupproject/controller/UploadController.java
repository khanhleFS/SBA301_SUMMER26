package com.fpt.sba301_su26_groupproject.controller;

import com.fpt.sba301_su26_groupproject.common.response.ApiResponse;
import com.fpt.sba301_su26_groupproject.controller.api.UploadAPI;
import com.fpt.sba301_su26_groupproject.service.UploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
public class UploadController implements UploadAPI {

    private final UploadService uploadService;

    @Override
    @PreAuthorize("hasRole('AUTHOR')")
    public ResponseEntity<ApiResponse<String>> uploadImage(MultipartFile file) {
        return ResponseEntity.ok(ApiResponse.<String>builder()
                .code(200)
                .message("Tải ảnh lên thành công")
                .result(uploadService.uploadImage(file))
                .build());
    }
}
