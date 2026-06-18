package com.fpt.sba301_su26_groupproject.service;

import com.fpt.sba301_su26_groupproject.dto.authen.*;

import java.util.UUID;

public interface AuthenService {
    LoginResponseDTO login(LoginRequestDTO request);

    // Chuyển logic logout xuống Service
    void logout(String authHeader);
    // Sửa thành void, ném Exception trực tiếp nếu lỗi (Theo chuẩn Error Handling)
    void register(RegisterRequestDTO request);

    ForgotPasswordResponseDTO forgotPassword(String email);

    ResetPasswordResponseDTO resetPassword(ResetPasswordRequestDTO request);

    ProfileDTO getProfile(UUID id);

    void updateProfile(UUID id, ProfileDTO profile);

    boolean isEmailValid(String email);

    boolean verifyRegisterOtp(String email, String otpCode);

    LoginResponseDTO refreshToken(TokenRefreshRequestDTO request);
}
