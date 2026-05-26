package com.fpt.sba301_su26_groupproject.controller;

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
    @GetMapping("/api/coins/packages")
    public ResponseEntity<List<CoinCreateResponseDTO>> getActivePackages() {
        return ResponseEntity.ok(coinPackageService.getActivePackages());
    }

    // =========================================================================
    // ADMIN  →  /api/admin/coins/packages
    // =========================================================================

    @GetMapping("/api/admin/coins/packages")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<CoinCreateResponseDTO>> getAllPackages() {
        return ResponseEntity.ok(coinPackageService.getAllPackages());
    }

    @PostMapping("/api/admin/coins/packages")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CoinCreateResponseDTO> createPackage(
            @Valid @RequestBody CoinCreateRequestDTO request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(coinPackageService.createPackage(request));
    }

    @PutMapping("/api/admin/coins/packages/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CoinCreateResponseDTO> updatePackage(
            @PathVariable UUID id,
            @Valid @RequestBody CoinUpdateRequestDTO request) {
        return ResponseEntity.ok(coinPackageService.updatePackage(id, request));
    }

    @PatchMapping("/api/admin/coins/packages/{id}/toggle")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CoinCreateResponseDTO> togglePackage(@PathVariable UUID id) {
        return ResponseEntity.ok(coinPackageService.togglePackageStatus(id));
    }

    @DeleteMapping("/api/admin/coins/packages/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deletePackage(@PathVariable UUID id) {
        coinPackageService.deletePackage(id);
        return ResponseEntity.noContent().build();
    }
}
