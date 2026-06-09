package com.fpt.sba301_su26_groupproject.controller.api;

import com.fpt.sba301_su26_groupproject.common.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@RequestMapping("/api/upload")
@Tag(name = "Upload APIs", description = "File upload APIs")
public interface UploadAPI {

    @Operation(
            summary = "Upload image",
            description = "Upload image file and return image URL",
            security = @SecurityRequirement(name = "Bearer Authentication")
    )
    @PostMapping(value = "/image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    ResponseEntity<ApiResponse<String>> uploadImage(
            @RequestParam("file") MultipartFile file);
}
