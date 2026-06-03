package com.fpt.sba301_su26_groupproject.controller;

import com.fpt.sba301_su26_groupproject.common.response.ApiResponse;
import com.fpt.sba301_su26_groupproject.dto.authen.*;
import com.fpt.sba301_su26_groupproject.service.AuthenService;
import com.fpt.sba301_su26_groupproject.common.security.CustomUserDetail;
import com.fpt.sba301_su26_groupproject.entity.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
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
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final AuthenService authenService;
    private final SecurityContextRepository securityContextRepository;
    private final SecurityContextHolderStrategy securityContextHolderStrategy = SecurityContextHolder
            .getContextHolderStrategy();

    public AuthController(AuthenticationManager authenticationManager, AuthenService authenService,
                          SecurityContextRepository securityContextRepository) {
        this.authenticationManager = authenticationManager;
        this.authenService = authenService;
        this.securityContextRepository = securityContextRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponseDTO>> loginForm(@Valid @RequestBody LoginRequestDTO loginRequestDTO,
                                                                   HttpServletRequest httpRequest, HttpServletResponse httpResponse){
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequestDTO.email(), loginRequestDTO.password())
            );
            securityContextHolderStrategy.getContext().setAuthentication(authentication);
            securityContextRepository.saveContext(securityContextHolderStrategy.getContext(), httpRequest, httpResponse);
            CustomUserDetail userDetail = (CustomUserDetail) authentication.getPrincipal();
            User user = userDetail.getUser();
            LoginResponseDTO loginResponse = new LoginResponseDTO(
                    httpRequest.getSession().getId(),
                    "Session",
                    user.getId(),
                    user.getUsername(),
                    user.getEmail(),
                    user.getRole()
            );

            return ResponseEntity.ok().body(ApiResponse.<LoginResponseDTO>builder()
                    .code(200)
                    .message("Đăng nhập thành công")
                    .result(loginResponse)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.<LoginResponseDTO>builder()
                    .code(400)
                    .message("Đăng nhập thất bại: " + e.getMessage())
                    .build());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<RegisterResponseDTO>> register(@Valid @RequestBody RegisterRequestDTO registerRequestDTO) {
        try {
            boolean success = authenService.register(registerRequestDTO);
            if (success) {
                return ResponseEntity.ok().body(ApiResponse.<RegisterResponseDTO>builder()
                        .code(200)
                        .message("Đăng ký thành công. Vui lòng kiểm tra email để kích hoạt tài khoản.")
                        .result(null) // Có thể trả về thông tin tài khoản đã đăng ký nếu cần
                        .build());
            } else {
                return ResponseEntity.badRequest().body(ApiResponse.<RegisterResponseDTO>builder()
                        .code(400)
                        .message("Đăng ký thất bại: " + "Email đã tồn tại hoặc có lỗi trong quá trình đăng ký")
                        .build());
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.<RegisterResponseDTO>builder()
                    .code(400)
                    .message("Đăng nhập thất bại: " + e.getMessage())
                    .build());
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse<ForgotPasswordResponseDTO>> forgotPassword(@Valid @RequestBody ForgotPasswordRequestDTO requestDTO) {
        try {
            authenService.forgotPassword(requestDTO.email());
            ForgotPasswordResponseDTO result = new ForgotPasswordResponseDTO(
                    requestDTO.email(),
                    "Mật khẩu mới đã được gửi đến email của bạn thành công.", true, null
            );
            return ResponseEntity.ok().body(ApiResponse.<ForgotPasswordResponseDTO>builder()
                    .code(200)
                    .message("Yêu cầu quên mật khẩu thành công")
                    .result(result)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.<ForgotPasswordResponseDTO>builder()
                    .code(400)
                    .message("Có lỗi xảy ra: " + e.getMessage())
                    .build());
        }
    }


    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<ResetPasswordResponseDTO>> resetPassword(@Valid @RequestBody ResetPasswordRequestDTO requestDTO) {
        try {
            if (!requestDTO.newPassword().equals(requestDTO.confirmPassword())) {
                return ResponseEntity.badRequest().body(ApiResponse.<ResetPasswordResponseDTO>builder()
                        .code(400)
                        .message("Mật khẩu mới và xác nhận mật khẩu không khớp")
                        .build());
            }
            authenService.resetPassword(requestDTO.email(), requestDTO.oldPassword(), requestDTO.newPassword());
            ResetPasswordResponseDTO result = new ResetPasswordResponseDTO(
                    requestDTO.email(),
                    "Mật khẩu đã được cập nhật thành công.", null, null
            );
            return ResponseEntity.ok(ApiResponse.<ResetPasswordResponseDTO>builder()
                    .code(200)
                    .message("Đặt lại mật khẩu thành công")
                    .result(result)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.<ResetPasswordResponseDTO>builder()
                    .code(400)
                    .message("Có lỗi xảy ra: " + e.getMessage())
                    .build());
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<ProfileDTO>> getProfile(@AuthenticationPrincipal CustomUserDetail userDetail) {
        try {
            if (userDetail == null) {
                return ResponseEntity.badRequest().body(ApiResponse.<ProfileDTO>builder()
                        .code(400)
                        .message("Người dùng chưa đăng nhập hoặc token không hợp lệ")
                        .build());
            }
            ProfileDTO profile = authenService.getProfile(userDetail.getUser().getId());
            return ResponseEntity.ok(ApiResponse.<ProfileDTO>builder()
                    .code(200)
                    .message("Lấy thông tin cá nhân thành công")
                    .result(profile)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.<ProfileDTO>builder()
                    .code(400)
                    .message("Có lỗi xảy ra: " + e.getMessage())
                    .build());
        }
    }

    @PutMapping("/profile")
    public ResponseEntity<ApiResponse<Void>> updateProfile(@AuthenticationPrincipal CustomUserDetail userDetail,
                                                           @Valid @RequestBody ProfileDTO profileDTO) {
        try {
            if (userDetail == null) {
                return ResponseEntity.badRequest().body(ApiResponse.<Void>builder()
                        .code(401)
                        .message("Người dùng chưa đăng nhập")
                        .build());
            }
            authenService.updateProfile(userDetail.getUser().getId(), profileDTO);
            return ResponseEntity.ok(ApiResponse.<Void>builder()
                    .code(200)
                    .message("Cập nhật thông tin cá nhân thành công")
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.<Void>builder()
                    .code(400)
                    .message("Cập nhật thông tin cá nhân thất bại: " + e.getMessage())
                    .build());
        }
    }

    @PostMapping("/verify-register-otp")
    public ResponseEntity<ApiResponse<Void>> verifyRegisterOtp(
            @Valid @RequestBody com.fpt.sba301_su26_groupproject.dto.authen.VerifyOTPRequestDTO requestDTO) {
        try {
            boolean success = authenService.verifyRegisterOtp(requestDTO.email(), requestDTO.otpCode());
            if (success) {
                return ResponseEntity.ok(ApiResponse.<Void>builder()
                        .code(200)
                        .message("Xác thực thành công. Tài khoản đã được kích hoạt.")
                        .build());
            } else {
                return ResponseEntity.badRequest().body(ApiResponse.<Void>builder()
                        .code(400)
                        .message("Xác thực thất bại. OTP không chính xác.")
                        .build());
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.<Void>builder()
                    .code(400)
                    .message("Lỗi xác thực: " + e.getMessage())
                    .build());
        }
    }
}
