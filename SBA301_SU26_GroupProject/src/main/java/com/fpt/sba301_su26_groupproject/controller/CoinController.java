package com.fpt.sba301_su26_groupproject.controller;

import com.fpt.sba301_su26_groupproject.common.response.ApiResponse;
import com.fpt.sba301_su26_groupproject.dto.coin.CoinCreateRequestDTO;
import com.fpt.sba301_su26_groupproject.dto.coin.CoinCreateResponseDTO;
import com.fpt.sba301_su26_groupproject.dto.coin.CoinUpdateRequestDTO;
import com.fpt.sba301_su26_groupproject.service.CoinPackageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("api/admin/coin")
@RequiredArgsConstructor
public class CoinController {

    private final CoinPackageService coinPackageService;

    // =========================================================================
    // USER  →  GET /api/coins/packages
    // =========================================================================
    @GetMapping("/packages")
    public ResponseEntity<ApiResponse<List<CoinCreateResponseDTO>>> getActivePackages() {
        List<CoinCreateResponseDTO> activePackages = coinPackageService.getActivePackages();
        return ResponseEntity.ok(ApiResponse.<List<CoinCreateResponseDTO>>builder()
                .code(200)
                .message("Lấy danh sách gói coin thành công")
                .result(activePackages)
                .build());
    }

    // =========================================================================
    // ADMIN  →  /api/admin/coins/packages
    // =========================================================================

    @GetMapping("/allPackages")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<CoinCreateResponseDTO>>> getAllPackages() {
        List<CoinCreateResponseDTO> allPackages = coinPackageService.getAllPackages();
        return ResponseEntity.ok(ApiResponse.<List<CoinCreateResponseDTO>>builder()
                .code(200)
                .message("Lấy danh sách tất cả gói coin thành công")
                .result(allPackages)
                .build());
    }

    @PostMapping("/createPackages")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<CoinCreateResponseDTO>> createPackage(
            @Valid @RequestBody CoinCreateRequestDTO request) {
        CoinCreateResponseDTO createdPackage = coinPackageService.createPackage(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.<CoinCreateResponseDTO>builder()
                        .code(201)
                        .message("Tạo gói coin thành công")
                        .result(createdPackage)
                        .build());
    }

    @PutMapping("/updatePackages/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<CoinCreateResponseDTO>> updatePackage(
            @PathVariable UUID id,
            @Valid @RequestBody CoinCreateRequestDTO request) {
        CoinCreateResponseDTO updatedPackage = coinPackageService.updatePackage(id, request);
        return ResponseEntity.ok(ApiResponse.<CoinCreateResponseDTO>builder()
                .code(200)
                .message("Cập nhật gói coin thành công")
                .result(updatedPackage)
                .build());
    }

    @PatchMapping("/packages/{id}/toggle")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<CoinCreateResponseDTO>> togglePackage(@PathVariable UUID id) {
        CoinCreateResponseDTO toggledPackage = coinPackageService.togglePackageStatus(id);
        return ResponseEntity.ok(ApiResponse.<CoinCreateResponseDTO>builder()
                .code(200)
                .message("Cập nhật trạng thái gói coin thành công")
                .result(toggledPackage)
                .build());
    }

    @DeleteMapping("/deletePackages/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deletePackage(@PathVariable UUID id) {
        coinPackageService.deletePackage(id);
        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .code(200)
                .message("Xóa gói coin thành công")
                .build());
    }
}
