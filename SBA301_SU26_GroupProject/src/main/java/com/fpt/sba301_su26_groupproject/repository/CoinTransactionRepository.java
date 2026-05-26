package com.fpt.sba301_su26_groupproject.repository;

import com.fpt.sba301_su26_groupproject.entity.CoinTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;


import java.util.UUID;

@Repository
public interface CoinTransactionRepository extends JpaRepository<CoinTransaction, UUID> {
    // Lịch sử giao dịch coin của user, có phân trang
    Page<CoinTransaction> findByUserIdOrderByCreatedAtDesc(Long userId, Pageable pageable);
}
