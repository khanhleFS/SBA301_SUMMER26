package com.fpt.sba301_su26_groupproject.service.impl;

import com.fpt.sba301_su26_groupproject.dto.coin.*;
import com.fpt.sba301_su26_groupproject.entity.CoinPackage;
import com.fpt.sba301_su26_groupproject.repository.CoinPackageRepository;
import com.fpt.sba301_su26_groupproject.service.CoinPackageService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CoinPackageServiceImpl implements CoinPackageService {

    private CoinPackageRepository coinPackageRepository;

    // -----------------------------------------------------------------------
    // HELPER: map Entity → Response
    // -----------------------------------------------------------------------
    private CoinCreateResponseDTO toResponse(CoinPackage pkg) {
        return CoinCreateResponseDTO.builder()
                .id(pkg.getId())
                .name(pkg.getName())
                .priceVnd(pkg.getPriceVnd())
                .baseCoins(pkg.getBaseCoins())
                .firstTimeBonus(pkg.getFirstTimeBonus())
                .isActive(pkg.getIsActive())
                .createdAt(pkg.getCreatedAt())
                .updatedAt(pkg.getUpdatedAt())
                .build();
    }

    // -----------------------------------------------------------------------
    // USER: Lấy danh sách gói active
    // -----------------------------------------------------------------------
    @Override
    public List<CoinCreateResponseDTO> getActivePackages() {
        return coinPackageRepository.findByIsActiveTrueOrderByPriceVndAsc()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public Page<CoinTransactionResponseDTO> getCoinHistory(Long userId, Pageable pageable) {
        return null;
    }

    // -----------------------------------------------------------------------
    // ADMIN: Lấy tất cả gói kể cả inactive
    // -----------------------------------------------------------------------
    @Override
    public List<CoinCreateResponseDTO> getAllPackages() {
        return coinPackageRepository.findAll()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    // -----------------------------------------------------------------------
    // ADMIN: Tạo gói mới
    // -----------------------------------------------------------------------
    @Override
    @Transactional
    public CoinCreateResponseDTO createPackage(CoinCreateRequestDTO request) {
        if (coinPackageRepository.existsByNameIgnoreCase(request.name())) {
            throw new IllegalArgumentException(
                    "Tên gói '" + request.name() + "' đã tồn tại");
        }

        CoinPackage pkg = CoinPackage.builder()
                .name(request.name())
                .priceVnd(request.priceVnd())
                .baseCoins(request.baseCoins())
                .firstTimeBonus(request.firstTimeBonus())
                .isActive(request.isActive() != null ? request.isActive() : true)
                .build();

        return toResponse(coinPackageRepository.save(pkg));
    }

    // -----------------------------------------------------------------------
    // ADMIN: Cập nhật gói
    // -----------------------------------------------------------------------
    @Override
    @Transactional
    public CoinCreateResponseDTO updatePackage(UUID id, CoinUpdateRequestDTO request) {
        CoinPackage pkg = coinPackageRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Gói coin không tồn tại"));

        if (request.name() != null) {
            if (coinPackageRepository.existsByNameIgnoreCaseAndIdNot(request.name(), id)) {
                throw new IllegalArgumentException(
                        "Tên gói '" + request.name() + "' đã tồn tại");
            }
            pkg.setName(request.name());
        }
        if (request.priceVnd()        != null) pkg.setPriceVnd(request.priceVnd());
        if (request.baseCoins()       != null) pkg.setBaseCoins(request.baseCoins());
        if (request.firstTimeBonus()  != null) pkg.setFirstTimeBonus(request.firstTimeBonus());
        if (request.isActive()        != null) pkg.setIsActive(request.isActive());

        return toResponse(coinPackageRepository.save(pkg));
    }

    // -----------------------------------------------------------------------
    // ADMIN: Bật/tắt gói
    // -----------------------------------------------------------------------
    @Override
    @Transactional
    public CoinCreateResponseDTO togglePackageStatus(UUID id) {
        CoinPackage pkg = coinPackageRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Gói coin không tồn tại"));

        pkg.setIsActive(!pkg.getIsActive());
        return toResponse(coinPackageRepository.save(pkg));
    }

    // -----------------------------------------------------------------------
    // ADMIN: Xóa gói
    // -----------------------------------------------------------------------
    @Override
    @Transactional
    public void deletePackage(UUID id) {
        if (!coinPackageRepository.existsById(id)) {
            throw new EntityNotFoundException("Gói coin không tồn tại");
        }
        coinPackageRepository.deleteById(id);
    }
}