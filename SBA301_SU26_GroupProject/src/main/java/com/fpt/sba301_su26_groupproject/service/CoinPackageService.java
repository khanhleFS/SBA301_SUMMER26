package com.fpt.sba301_su26_groupproject.service;


import com.fpt.sba301_su26_groupproject.dto.enumeration.EnumResponseDTO;
import com.fpt.sba301_su26_groupproject.dto.coin.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface CoinPackageService {

    // -----------------------------------------------------------------------
    // USER APIs
    // -----------------------------------------------------------------------

//    // Lấy danh sách gói đang active để hiển thị cho user chọn
    List<CoinCreateResponseDTO> getActivePackages();

//    // User khởi tạo mua gói coin → trả về link thanh toán
//    CoinPurchaseResponseDTO initiatePurchase(Long userId, CoinPurchaseRequestDTO request);
//
//    // VNPay/MoMo callback khi thanh toán thành công
//    void handlePaymentSuccess(String transactionRef);

    // Lịch sử giao dịch coin của user (có phân trang)
    Page<CoinTransactionResponseDTO> getCoinHistory(Long userId, Pageable pageable);

    // -----------------------------------------------------------------------
    // ADMIN APIs
    // -----------------------------------------------------------------------

    // Lấy tất cả gói (kể cả inactive) để Admin quản lý
    List<CoinCreateResponseDTO> getAllPackages();

    // Tạo gói mới
    CoinCreateResponseDTO createPackage(CoinCreateRequestDTO request);

    // Cập nhật gói
    CoinCreateResponseDTO updatePackage(UUID id, CoinCreateRequestDTO request);

    // Bật/tắt gói
    CoinCreateResponseDTO togglePackageStatus(UUID id);

    // Xóa gói (chỉ xóa được nếu chưa có ai mua)
    void deletePackage(UUID id);

    List<EnumResponseDTO> getEnums();
}
