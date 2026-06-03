package com.fpt.sba301_su26_groupproject.service.impl;

import com.fpt.sba301_su26_groupproject.common.exception.ApiException;
import com.fpt.sba301_su26_groupproject.common.exception.CoinPackageErrorCode;
import com.fpt.sba301_su26_groupproject.dto.coin.*;
import com.fpt.sba301_su26_groupproject.entity.CoinPackage;
import com.fpt.sba301_su26_groupproject.repository.CoinPackageRepository;
import com.fpt.sba301_su26_groupproject.service.CoinPackageService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CoinPackageServiceImpl implements CoinPackageService {

    private final CoinPackageRepository coinPackageRepository;

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
        if (coinPackageRepository.existsByNameIgnoreCase(request.name()) && request.name() != null) {
            throw new ApiException(CoinPackageErrorCode.COIN_PACKAGE_ALREADY_EXISTS,
                    "Tên gói '" + request.name() + "' đã tồn tại");
        }
        validatePackageData(request);

        CoinPackage pkg = CoinPackage.builder()
                .name(request.name())
                .priceVnd(request.priceVnd())
                .baseCoins(request.baseCoins())
                .firstTimeBonus(request.firstTimeBonus())
                .isActive(request.isActive() != null ? request.isActive() : true)
                .createdAt(Instant.now())
                .updatedAt(Instant.now())
                .build();

        return toResponse(coinPackageRepository.save(pkg));
    }

    // -----------------------------------------------------------------------
    // ADMIN: Cập nhật gói
    // -----------------------------------------------------------------------
    @Override
    @Transactional
    public CoinCreateResponseDTO updatePackage(UUID id, CoinCreateRequestDTO request) {
        CoinPackage pkg = coinPackageRepository.findById(id)
                .orElseThrow(() -> new ApiException(CoinPackageErrorCode.COIN_PACKAGE_NOT_FOUND, "Gói coin không tồn tại"));
        validatePackageData(request);
        if (request.name() != null) {
            if (coinPackageRepository.existsByNameIgnoreCaseAndIdNot(request.name(), id)) {
                throw new ApiException(CoinPackageErrorCode.COIN_PACKAGE_ALREADY_EXISTS,
                        "Tên gói '" + request.name() + "' đã tồn tại");
            }
            pkg.setName(request.name());
        }
        pkg.setPriceVnd(request.priceVnd());
        pkg.setBaseCoins(request.baseCoins());
        pkg.setFirstTimeBonus(request.firstTimeBonus());
        pkg.setIsActive(request.isActive());

        CoinPackage updatedPkg;
        try{
            updatedPkg = coinPackageRepository.save(pkg);
        } catch (Exception e) {
            throw new ApiException(CoinPackageErrorCode.COIN_PACKAGE_UPDATE_FAILED, "Cập nhật gói coin thất bại");
        }
        return toResponse(updatedPkg);
    }

    // -----------------------------------------------------------------------
    // ADMIN: Bật/tắt gói
    // -----------------------------------------------------------------------
    @Override
    @Transactional
    public CoinCreateResponseDTO togglePackageStatus(UUID id) {
        CoinPackage pkg = coinPackageRepository.findById(id)
                .orElseThrow(() -> new ApiException(CoinPackageErrorCode.COIN_PACKAGE_NOT_FOUND, "Gói coin không tồn tại"));

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
            throw new ApiException(CoinPackageErrorCode.COIN_PACKAGE_NOT_FOUND, "Gói coin không tồn tại");
        }

        try {
            coinPackageRepository.deleteById(id);
        } catch (Exception e) {
            throw new ApiException(CoinPackageErrorCode.COIN_PACKAGE_DELETE_FAILED, "Xóa gói coin thất bại");
        }
    }

    private void validatePackageData(CoinCreateRequestDTO request) {
        if (request.priceVnd() <= 0) {
            throw new ApiException(CoinPackageErrorCode.COIN_PACKAGE_INVALID, "Giá gói phải lớn hơn 0");
        }
        if (request.baseCoins() <= 0) {
            throw new ApiException(CoinPackageErrorCode.COIN_PACKAGE_INVALID, "Số lượng coin gốc phải lớn hơn 0");
        }
        if (request.firstTimeBonus() < 0) {
            throw new ApiException(CoinPackageErrorCode.COIN_PACKAGE_INVALID, "Số lượng coin khuyến mãi lần đầu phải lớn hơn hoặc bằng 0");
        }
        if(request.isActive() == false) {
            throw new ApiException(CoinPackageErrorCode.COIN_PACKAGE_INVALID, "Gói mới phải được kích hoạt");
        }
    }
}