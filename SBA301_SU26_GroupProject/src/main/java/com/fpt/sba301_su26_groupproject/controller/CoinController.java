package com.fpt.sba301_su26_groupproject.controller;

import com.fpt.sba301_su26_groupproject.common.response.ApiResponse;
import com.fpt.sba301_su26_groupproject.controller.api.CoinAPI;
import com.fpt.sba301_su26_groupproject.dto.coin.CoinCreateRequestDTO;
import com.fpt.sba301_su26_groupproject.dto.coin.CoinCreateResponseDTO;
import com.fpt.sba301_su26_groupproject.service.CoinPackageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class CoinController implements CoinAPI {

    private final CoinPackageService coinPackageService;

    @Override
    public ResponseEntity<ApiResponse<List<CoinCreateResponseDTO>>> getActivePackages() {
        return ResponseEntity.ok(ApiResponse.<List<CoinCreateResponseDTO>>builder()
                .code(200)
                .message("Lấy danh sách gói coin thành công")
                .result(coinPackageService.getActivePackages())
                .build());
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<CoinCreateResponseDTO>>> getAllPackages() {
        return ResponseEntity.ok(ApiResponse.<List<CoinCreateResponseDTO>>builder()
                .code(200)
                .message("Lấy danh sách tất cả gói coin thành công")
                .result(coinPackageService.getAllPackages())
                .build());
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<CoinCreateResponseDTO>> createPackage(CoinCreateRequestDTO request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.<CoinCreateResponseDTO>builder()
                .code(201)
                .message("Tạo gói coin thành công")
                .result(coinPackageService.createPackage(request))
                .build());
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<CoinCreateResponseDTO>> updatePackage(UUID id, CoinCreateRequestDTO request) {
        return ResponseEntity.ok(ApiResponse.<CoinCreateResponseDTO>builder()
                .code(200)
                .message("Cập nhật gói coin thành công")
                .result(coinPackageService.updatePackage(id, request))
                .build());
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<CoinCreateResponseDTO>> togglePackage(UUID id) {
        return ResponseEntity.ok(ApiResponse.<CoinCreateResponseDTO>builder()
                .code(200)
                .message("Cập nhật trạng thái gói coin thành công")
                .result(coinPackageService.togglePackageStatus(id))
                .build());
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deletePackage(UUID id) {
        coinPackageService.deletePackage(id);

        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .code(200)
                .message("Xóa gói coin thành công")
                .build());
    }
}
