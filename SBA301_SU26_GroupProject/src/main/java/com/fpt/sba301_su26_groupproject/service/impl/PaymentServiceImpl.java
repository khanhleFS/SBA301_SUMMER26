package com.fpt.sba301_su26_groupproject.service.impl;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.UUID;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.stereotype.Service;

import com.fpt.sba301_su26_groupproject.common.config.MomoConfig;
import com.fpt.sba301_su26_groupproject.dto.payment.PaymentMomoCallbackDTO;
import com.fpt.sba301_su26_groupproject.dto.payment.PaymentMomoCreateRequestDTO;
import com.fpt.sba301_su26_groupproject.dto.payment.PaymentMomoCreateResponseDTO;
import com.fpt.sba301_su26_groupproject.service.PaymentService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentServiceImpl implements PaymentService {

    private final MomoConfig momoConfig;

    @Override
    public PaymentMomoCreateResponseDTO createMomoPayment(PaymentMomoCreateRequestDTO request) {
        String requestId = UUID.randomUUID().toString();

        // Build something that looks like a MoMo pay URL for testing
        String raw = String.format("partnerCode=%s&accessKey=%s&requestId=%s&orderId=%s&amount=%d&orderInfo=%s",
                momoConfig.getPartnerCode(), momoConfig.getAccessKey(), requestId, request.orderId(), request.amount(), request.orderInfo() == null ? "" : request.orderInfo());

        String signature = hmacSHA256(raw, momoConfig.getSecretKey());

        String payUrl = String.format("%s/pay?%s&signature=%s",
                momoConfig.getEndpoint(), urlEncode(raw), urlEncode(signature));

        return new PaymentMomoCreateResponseDTO(payUrl, request.orderId());
    }

    @Override
    public void handleMomoCallback(PaymentMomoCallbackDTO callback) {
        // Minimal: log and ignore
        log.info("Handling MoMo callback for orderId={} amount={} result={}", callback.orderId(), callback.amount(), callback.resultCode());
    }

    private static String hmacSHA256(String data, String key) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
            byte[] rawHmac = mac.doFinal(data.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(rawHmac);
        } catch (Exception e) {
            throw new RuntimeException("Failed to calculate HMAC", e);
        }
    }

    private static String urlEncode(String s) {
        return URLEncoder.encode(s, StandardCharsets.UTF_8);
    }
}
