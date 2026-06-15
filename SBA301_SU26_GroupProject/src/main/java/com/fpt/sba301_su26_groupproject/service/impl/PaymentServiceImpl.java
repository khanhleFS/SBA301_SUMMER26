package com.fpt.sba301_su26_groupproject.service.impl;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.time.Duration;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fpt.sba301_su26_groupproject.common.config.MomoConfig;
import com.fpt.sba301_su26_groupproject.common.exception.ApiException;
import com.fpt.sba301_su26_groupproject.common.exception.CommonErrorCode;
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
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(10))
            .build();

    @Override
    public PaymentMomoCreateResponseDTO createMomoPayment(PaymentMomoCreateRequestDTO request) {
        String requestId = UUID.randomUUID().toString();
        String orderInfo = request.orderInfo() == null || request.orderInfo().isBlank()
                ? "Thanh toan don hang " + request.orderId()
                : request.orderInfo();

        Map<String, Object> payload = new LinkedHashMap<>();
        payload.put("partnerCode", momoConfig.getPartnerCode());
        payload.put("accessKey", momoConfig.getAccessKey());
        payload.put("requestId", requestId);
        payload.put("amount", String.valueOf(request.amount()));
        payload.put("orderId", request.orderId());
        payload.put("orderInfo", orderInfo);
        payload.put("redirectUrl", momoConfig.getRedirectUrl());
        payload.put("ipnUrl", momoConfig.getIpnUrl());
        payload.put("extraData", "");
        payload.put("requestType", request.requestType() != null ? request.requestType() : "captureWallet");
        payload.put("lang", "vi");

        String requestType = request.requestType() != null ? request.requestType() : "captureWallet";
        String signature = signMoMoRequest(requestId, request.orderId(), request.amount(), orderInfo, requestType);
        payload.put("signature", signature);

        Map<String, Object> response = callMoMoCreateApi(payload);
        String resultCode = String.valueOf(response.getOrDefault("resultCode", ""));
        if (!"0".equals(resultCode)) {
            String message = String.valueOf(response.getOrDefault("message", "MoMo create payment failed"));
            throw new ApiException(CommonErrorCode.EXTERNAL_SERVICE_ERROR, message);
        }

        String payUrl = String.valueOf(response.get("payUrl"));
        if (payUrl == null || payUrl.isBlank() || "null".equalsIgnoreCase(payUrl)) {
            throw new ApiException(CommonErrorCode.EXTERNAL_SERVICE_ERROR, "MoMo response did not contain payUrl");
        }

        return new PaymentMomoCreateResponseDTO(payUrl, request.orderId());
    }

    @Override
    public void handleMomoCallback(PaymentMomoCallbackDTO callback) {
        log.info("Handling MoMo callback for orderId={} amount={} resultCode={} transId={}",
                callback.orderId(), callback.amount(), callback.resultCode(), callback.transId());
    }

    private Map<String, Object> callMoMoCreateApi(Map<String, Object> payload) {
        try {
            String endpoint = normalizeCreateEndpoint(momoConfig.getEndpoint());
            String body = objectMapper.writeValueAsString(payload);

            HttpRequest httpRequest = HttpRequest.newBuilder()
                    .uri(URI.create(endpoint))
                    .timeout(Duration.ofSeconds(20))
                    .header("Content-Type", "application/json; charset=UTF-8")
                    .POST(HttpRequest.BodyPublishers.ofString(body, StandardCharsets.UTF_8))
                    .build();

            HttpResponse<String> httpResponse = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
            if (httpResponse.statusCode() < 200 || httpResponse.statusCode() >= 300) {
                throw new ApiException(CommonErrorCode.EXTERNAL_SERVICE_ERROR,
                        "MoMo create payment HTTP status " + httpResponse.statusCode() + ": " + httpResponse.body());
            }

            return objectMapper.readValue(httpResponse.body(), new TypeReference<>() {});
        } catch (IOException e) {
            throw new ApiException(CommonErrorCode.EXTERNAL_SERVICE_ERROR, "Failed to call MoMo: " + e.getMessage());
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new ApiException(CommonErrorCode.EXTERNAL_SERVICE_ERROR, "MoMo request interrupted");
        }
    }

    private String signMoMoRequest(String requestId, String orderId, int amount, String orderInfo, String requestType) {
        String rawSignature = "accessKey=" + momoConfig.getAccessKey()
                + "&amount=" + amount
                + "&extraData="
                + "&ipnUrl=" + momoConfig.getIpnUrl()
                + "&orderId=" + orderId
                + "&orderInfo=" + orderInfo
                + "&partnerCode=" + momoConfig.getPartnerCode()
                + "&redirectUrl=" + momoConfig.getRedirectUrl()
                + "&requestId=" + requestId
                + "&requestType=" + requestType;
        return HmacSha256Util.hmacSHA256(rawSignature, momoConfig.getSecretKey());
    }

    private String normalizeCreateEndpoint(String endpoint) {
        if (endpoint.endsWith("/create")) {
            return endpoint;
        }
        return endpoint + "/create";
    }

    private static final class HmacSha256Util {
        private static String hmacSHA256(String data, String key) {
            try {
                javax.crypto.Mac mac = javax.crypto.Mac.getInstance("HmacSHA256");
                mac.init(new javax.crypto.spec.SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
                byte[] rawHmac = mac.doFinal(data.getBytes(StandardCharsets.UTF_8));
                StringBuilder hexString = new StringBuilder();
                for (byte b : rawHmac) {
                    String hex = Integer.toHexString(0xff & b);
                    if (hex.length() == 1) {
                        hexString.append('0');
                    }
                    hexString.append(hex);
                }
                return hexString.toString();
            } catch (NoSuchAlgorithmException | InvalidKeyException e) {
                throw new IllegalStateException("Failed to calculate MoMo signature", e);
            }
        }
    }
}
