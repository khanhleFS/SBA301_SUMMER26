package com.fpt.sba301_su26_groupproject.controller.api;

import com.fpt.sba301_su26_groupproject.common.response.ApiResponse;
import com.fpt.sba301_su26_groupproject.dto.enumeration.EnumResponseDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@RequestMapping("/api")
@Tag(name = "Enum APIs", description = "Enumeration data APIs")
public interface EnumAPI {

    @Operation(summary = "Get all enums", description = "Retrieve all available enums with their values")
    @GetMapping("/enums")
    ResponseEntity<ApiResponse<List<EnumResponseDTO>>> getAllEnums();
}
