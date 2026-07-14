package com.fpt.sba301_su26_groupproject.common.util;

import com.fpt.sba301_su26_groupproject.dto.payment.PaymentMomoCallbackDTO;
import lombok.extern.slf4j.Slf4j;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

/**
 * Dedicated utility class for MoMo HMAC-SHA256 cryptographic operations.
 * Separated from business logic to follow Single Responsibility Principle.
 */
@Slf4j
public final class MomoCryptoUtil {

    private static final String HMAC_SHA256 = "HmacSHA256";

    private MomoCryptoUtil() {
        // Utility class — no instantiation
    }

    /**
     * Tạo HMAC-SHA256 signature từ raw data và secret key.
     *
     * @param data      Chuỗi dữ liệu cần ký
     * @param secretKey Secret Key của MoMo
     * @return Hex string của signature
     */
    public static String hmacSHA256(String data, String secretKey) {
        try {
            Mac mac = Mac.getInstance(HMAC_SHA256);
            mac.init(new SecretKeySpec(secretKey.getBytes(StandardCharsets.UTF_8), HMAC_SHA256));
            byte[] rawHmac = mac.doFinal(data.getBytes(StandardCharsets.UTF_8));

            StringBuilder hexBuilder = new StringBuilder(rawHmac.length * 2);
            for (byte b : rawHmac) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexBuilder.append('0');
                hexBuilder.append(hex);
            }
            return hexBuilder.toString();
        } catch (NoSuchAlgorithmException | InvalidKeyException e) {
            throw new IllegalStateException("Failed to compute MoMo HMAC-SHA256 signature", e);
        }
    }

    /**
     * Xác thực chữ ký của IPN callback từ MoMo.
     * Ghép chuỗi theo đúng thứ tự tài liệu MoMo, sau đó so khớp với signature được gửi về.
     *
     * @param callback  DTO chứa dữ liệu callback từ MoMo
     * @param secretKey Secret Key của MoMo (từ MomoConfig)
     * @return true nếu signature hợp lệ, false nếu bị giả mạo
     */
    public static boolean verifyCallbackSignature(PaymentMomoCallbackDTO callback, String secretKey, String accessKey) {
        String rawSignature = "accessKey=" + accessKey
                + "&amount=" + callback.amount()
                + "&extraData=" + (callback.extraData() != null ? callback.extraData() : "")
                + "&message=" + callback.message()
                + "&orderId=" + callback.orderId()
                + "&orderInfo=" + callback.orderInfo()
                + "&orderType=" + callback.orderType()
                + "&partnerCode=" + callback.partnerCode()
                + "&payType=" + callback.payType()
                + "&requestId=" + callback.requestId()
                + "&responseTime=" + callback.responseTime()
                + "&resultCode=" + callback.resultCode()
                + "&transId=" + callback.transId();

        String computedSignature = hmacSHA256(rawSignature, secretKey);
        boolean valid = computedSignature.equals(callback.signature());

        if (!valid) {
            log.warn("[MoMo IPN] Signature mismatch! orderId={}, expected={}, received={}",
                    callback.orderId(), computedSignature, callback.signature());
        }

        return valid;
    }
}
