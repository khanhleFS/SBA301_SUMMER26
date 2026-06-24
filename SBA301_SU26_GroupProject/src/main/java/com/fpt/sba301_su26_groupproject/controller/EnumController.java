package com.fpt.sba301_su26_groupproject.controller;

import com.fpt.sba301_su26_groupproject.common.response.ApiResponse;
import com.fpt.sba301_su26_groupproject.dto.enumeration.EnumResponseDTO;
import com.fpt.sba301_su26_groupproject.service.EnumService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@Tag(name = "Enum APIs", description = "Enumeration data APIs")
@RequiredArgsConstructor
public class EnumController {

    private final EnumService enumService;

    @Operation(summary = "Get all enums", description = "Retrieve all available enums with their values")
    @GetMapping("/enums")
    public ResponseEntity<ApiResponse<List<EnumResponseDTO>>> getAllEnums() {
        List<EnumResponseDTO> enums = enumService.getAllEnums();
        return ResponseEntity.ok(
                ApiResponse.<List<EnumResponseDTO>>builder()
                        .code(HttpStatus.OK.value())
                        .message("Enums retrieved successfully")
                        .result(enums)
                        .build()
        );
    }
}
