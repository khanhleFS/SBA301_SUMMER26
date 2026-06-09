package com.fpt.sba301_su26_groupproject.controller;

import com.fpt.sba301_su26_groupproject.common.response.ApiResponse;
import com.fpt.sba301_su26_groupproject.common.security.JwtService;
import com.fpt.sba301_su26_groupproject.common.security.TokenBlacklistService;
import com.fpt.sba301_su26_groupproject.controller.api.AuthAPI;
import com.fpt.sba301_su26_groupproject.dto.authen.*;
import com.fpt.sba301_su26_groupproject.entity.RefreshTokenRedis;
import com.fpt.sba301_su26_groupproject.repository.RefreshTokenRedisRepository;
import com.fpt.sba301_su26_groupproject.service.AuthenService;
import com.fpt.sba301_su26_groupproject.common.security.CustomUserDetail;
import com.fpt.sba301_su26_groupproject.entity.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextHolderStrategy;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController implements AuthAPI {
    private final AuthenService authenService;
    @Override
    public ResponseEntity<ApiResponse<LoginResponseDTO>> login(LoginRequestDTO loginRequestDTO) {
        LoginResponseDTO loginResponse = authenService.login(loginRequestDTO);
        return ResponseEntity.ok(ApiResponse.<LoginResponseDTO>builder()
                .code(200)
                .message("Đăng nhập thành công")
                .result(loginResponse)
                .build());
    }
    @Override
    public ResponseEntity<ApiResponse<Void>> logout(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        authenService.logout(authHeader);
        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .code(200)
                .message("Đăng xuất thành công")
                .build());
    }
    @Override
    public ResponseEntity<ApiResponse<RegisterResponseDTO>> register(RegisterRequestDTO registerRequestDTO) {
        authenService.register(registerRequestDTO);
        return ResponseEntity.ok(ApiResponse.<RegisterResponseDTO>builder()
                .code(200)
                .message("Đăng ký thành công. Vui lòng kiểm tra email để kích hoạt tài khoản.")
                .build());
    }
    @Override
    public ResponseEntity<ApiResponse<ForgotPasswordResponseDTO>> forgotPassword(ForgotPasswordRequestDTO requestDTO) {
        ForgotPasswordResponseDTO result = authenService.forgotPassword(requestDTO.email());
        return ResponseEntity.ok(ApiResponse.<ForgotPasswordResponseDTO>builder()
                .code(200)
                .message("Yêu cầu quên mật khẩu thành công")
                .result(result)
                .build());
    }
    @Override
    public ResponseEntity<ApiResponse<ResetPasswordResponseDTO>> resetPassword(ResetPasswordRequestDTO requestDTO) {
        ResetPasswordResponseDTO result = authenService.resetPassword(requestDTO);
        return ResponseEntity.ok(ApiResponse.<ResetPasswordResponseDTO>builder()
                .code(200)
                .message("Đặt lại mật khẩu thành công")
                .result(result)
                .build());
    }
    @Override
    public ResponseEntity<ApiResponse<ProfileDTO>> getProfile() {
        // Lấy thông tin user hiện tại từ SecurityContext
        CustomUserDetail userDetail = (CustomUserDetail) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        ProfileDTO profile = authenService.getProfile(userDetail.getUser().getId());
        return ResponseEntity.ok(ApiResponse.<ProfileDTO>builder()
                .code(200)
                .message("Lấy thông tin cá nhân thành công")
                .result(profile)
                .build());
    }
    @Override
    public ResponseEntity<ApiResponse<Void>> updateProfile(ProfileDTO profileDTO) {
        CustomUserDetail userDetail = (CustomUserDetail) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        authenService.updateProfile(userDetail.getUser().getId(), profileDTO);
        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .code(200)
                .message("Cập nhật thông tin cá nhân thành công")
                .build());
    }
    @Override
    public ResponseEntity<ApiResponse<Void>> verifyRegisterOtp(VerifyOTPRequestDTO requestDTO) {
        authenService.verifyRegisterOtp(requestDTO.email(), requestDTO.otpCode());
        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .code(200)
                .message("Xác thực thành công. Tài khoản đã được kích hoạt.")
                .build());
    }
}
