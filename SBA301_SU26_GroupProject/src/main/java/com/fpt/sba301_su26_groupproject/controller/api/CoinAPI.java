package com.fpt.sba301_su26_groupproject.controller.api;

import com.fpt.sba301_su26_groupproject.common.response.ApiResponse;
import com.fpt.sba301_su26_groupproject.dto.coin.CoinCreateRequestDTO;
import com.fpt.sba301_su26_groupproject.dto.coin.CoinCreateResponseDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequestMapping("/api/coin-packages")
@Tag(name = "Coin Package APIs", description = "Coin package public and admin APIs")
public interface CoinAPI {

    @Operation(summary = "Get active coin packages")
    @GetMapping
    ResponseEntity<ApiResponse<List<CoinCreateResponseDTO>>> getActivePackages();

    @Operation(
            summary = "Get all coin packages",
            security = @SecurityRequirement(name = "Bearer Authentication")
    )
    @GetMapping("/admin")
    ResponseEntity<ApiResponse<List<CoinCreateResponseDTO>>> getAllPackages();

    @Operation(
            summary = "Create coin package",
            security = @SecurityRequirement(name = "Bearer Authentication")
    )
    @PostMapping("/admin")
    ResponseEntity<ApiResponse<CoinCreateResponseDTO>> createPackage(
            @Valid @RequestBody CoinCreateRequestDTO request);

    @Operation(
            summary = "Update coin package",
            security = @SecurityRequirement(name = "Bearer Authentication")
    )
    @PutMapping("/admin/{id}")
    ResponseEntity<ApiResponse<CoinCreateResponseDTO>> updatePackage(
            @PathVariable UUID id,
            @Valid @RequestBody CoinCreateRequestDTO request);

    @Operation(
            summary = "Toggle coin package status",
            security = @SecurityRequirement(name = "Bearer Authentication")
    )
    @PatchMapping("/admin/{id}/toggle")
    ResponseEntity<ApiResponse<CoinCreateResponseDTO>> togglePackage(
            @PathVariable UUID id);

    @Operation(
            summary = "Delete coin package",
            security = @SecurityRequirement(name = "Bearer Authentication")
    )
    @DeleteMapping("/admin/{id}")
    ResponseEntity<ApiResponse<Void>> deletePackage(
            @PathVariable UUID id);
}