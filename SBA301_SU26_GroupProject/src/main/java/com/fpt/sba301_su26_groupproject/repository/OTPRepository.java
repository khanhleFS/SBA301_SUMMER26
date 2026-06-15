package com.fpt.sba301_su26_groupproject.repository;

import com.fpt.sba301_su26_groupproject.entity.OTP;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface OTPRepository extends JpaRepository<OTP, UUID> {
    Optional<OTP> findByEmailAndOtpCode(String email, String otpCode);

    // Xóa toàn bộ OTP cũ của Email này
    void deleteByEmail(String email);

    // Xóa đúng cặp OTP đã dùng
    void deleteByEmailAndOtpCode(String email, String otpCode);
}
