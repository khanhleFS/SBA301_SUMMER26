package com.fpt.sba301_su26_groupproject.controller;

import com.fpt.sba301_su26_groupproject.common.response .ApiResponse;
import com.fpt.sba301_su26_groupproject.controller.api.EnumAPI;
import com.fpt.sba301_su26_groupproject.dto.enumeration.EnumResponseDTO;
import com.fpt.sba301_su26_groupproject.service.EnumService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class EnumController implements EnumAPI {

    private final EnumService enumService;

    @Override
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
