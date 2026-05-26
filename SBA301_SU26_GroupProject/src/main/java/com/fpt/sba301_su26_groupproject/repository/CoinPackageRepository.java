package com.fpt.sba301_su26_groupproject.repository;

import com.fpt.sba301_su26_groupproject.entity.CoinPackage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CoinPackageRepository extends JpaRepository<CoinPackage, UUID> {
    // Lấy tất cả gói đang active, sắp xếp theo giá tăng dần
    List<CoinPackage> findByIsActiveTrueOrderByPriceVndAsc();

    // Kiểm tra tên gói đã tồn tại chưa (tránh trùng)
    boolean existsByNameIgnoreCase(String name);

    // Kiểm tra tên gói đã tồn tại nhưng loại trừ chính nó (dùng khi update)
    boolean existsByNameIgnoreCaseAndIdNot(String name, UUID id);
}
