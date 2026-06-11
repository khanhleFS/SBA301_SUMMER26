package com.fpt.sba301_su26_groupproject.service;

import com.fpt.sba301_su26_groupproject.dto.payment.PaymentMomoCallbackDTO;
import com.fpt.sba301_su26_groupproject.dto.payment.PaymentMomoCreateRequestDTO;
import com.fpt.sba301_su26_groupproject.dto.payment.PaymentMomoCreateResponseDTO;

public interface PaymentService {
    PaymentMomoCreateResponseDTO createMomoPayment(PaymentMomoCreateRequestDTO request);

    void handleMomoCallback(PaymentMomoCallbackDTO callback);
}
