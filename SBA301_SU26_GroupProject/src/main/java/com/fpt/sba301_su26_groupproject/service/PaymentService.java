package com.fpt.sba301_su26_groupproject.service;

import com.fpt.sba301_su26_groupproject.dto.enumeration.EnumResponseDTO;
import com.fpt.sba301_su26_groupproject.dto.payment.PaymentMomoCallbackDTO;
import com.fpt.sba301_su26_groupproject.dto.payment.PaymentMomoCreateRequestDTO;
import com.fpt.sba301_su26_groupproject.dto.payment.PaymentMomoCreateResponseDTO;
import java.util.List;

public interface PaymentService {
    PaymentMomoCreateResponseDTO createMomoPayment(PaymentMomoCreateRequestDTO request);

    void handleMomoCallback(PaymentMomoCallbackDTO callback);

    List<EnumResponseDTO> getEnums();
}
