package com.fpt.sba301_su26_groupproject.service;

import java.util.Map;

public interface EncryptionService {
    /**
     * Mã hóa chuỗi văn bản bằng AES-256-CBC với IV ngẫu nhiên 16 bytes
     * 
     * @param plainText Văn bản thô cần mã hóa
     * @return Map chứa "encryptedData" (HEX) và "iv" (HEX)
     */
    Map<String, String> encrypt(String plainText);
}
