package com.fpt.sba301_su26_groupproject.service;

import com.fpt.sba301_su26_groupproject.dto.enumeration.EnumResponseDTO;
import com.fpt.sba301_su26_groupproject.dto.payment.PaymentMomoCallbackDTO;
import com.fpt.sba301_su26_groupproject.dto.payment.PaymentMomoCreateRequestDTO;
import com.fpt.sba301_su26_groupproject.dto.payment.PaymentMomoCreateResponseDTO;
import java.util.List;
import java.util.UUID;

public interface PaymentService {
    PaymentMomoCreateResponseDTO createMomoPayment(PaymentMomoCreateRequestDTO request);

    void handleMomoCallback(PaymentMomoCallbackDTO callback);

    List<EnumResponseDTO> getEnums();

    /**
     * Chủ động gọi MoMo Query Transaction Status API để đối soát trạng thái giao dịch.
     * Dùng khi Webhook gặp sự cố mạng hoặc CS muốn kiểm tra thủ công.
     *
     * @param orderId ID của Order cần đối soát
     */
    void syncPaymentStatus(UUID orderId);
}

