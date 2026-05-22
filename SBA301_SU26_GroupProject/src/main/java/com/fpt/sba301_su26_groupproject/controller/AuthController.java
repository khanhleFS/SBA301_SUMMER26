package com.fpt.sba301_su26_groupproject.controller;

import com.fpt.sba301_su26_groupproject.dto.authen.LoginRequestDTO;
import com.fpt.sba301_su26_groupproject.dto.authen.ResgisterRequestDTO;
import com.fpt.sba301_su26_groupproject.dto.authen.ForgotPasswordRequestDTO;
import com.fpt.sba301_su26_groupproject.dto.authen.ResetPasswordRequestDTO;
import com.fpt.sba301_su26_groupproject.dto.authen.ProfileDTO;
import com.fpt.sba301_su26_groupproject.service.AuthenService;
import com.fpt.sba301_su26_groupproject.common.security.CustomUserDetail;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
    public ResponseEntity<String> loginForm(@Valid @RequestBody LoginRequestDTO loginRequestDTO,
                                            HttpServletRequest httpRequest, HttpServletResponse httpResponse){
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequestDTO.email(), loginRequestDTO.password())
            );
            securityContextHolderStrategy.getContext().setAuthentication(authentication);
            securityContextRepository.saveContext(securityContextHolderStrategy.getContext(), httpRequest, httpResponse);
            return ResponseEntity.ok("Đăng nhập thành công");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Thông tin đăng nhập không hợp lệ: " + e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody ResgisterRequestDTO registerRequestDTO) {
        try {
            boolean success = authenService.register(registerRequestDTO);
            if (success) {
                return ResponseEntity.ok("Đăng ký thành công");
            } else {
                return ResponseEntity.badRequest().body("Đăng ký thất bại");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Đăng ký thất bại: " + e.getMessage());
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@Valid @RequestBody ForgotPasswordRequestDTO requestDTO) {
        try {
            authenService.forgotPassword(requestDTO.email());
            return ResponseEntity.ok("Link đặt lại mật khẩu đã được gửi đến email của bạn");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Có lỗi xảy ra: " + e.getMessage());
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@Valid @RequestBody ResetPasswordRequestDTO requestDTO) {
        try {
            if (!requestDTO.newPassword().equals(requestDTO.confirmPassword())) {
                return ResponseEntity.badRequest().body("Mật khẩu mới và xác nhận mật khẩu không khớp");
            }
            authenService.resetPassword(requestDTO.email(), requestDTO.oldPassword(), requestDTO.newPassword());
            return ResponseEntity.ok("Mật khẩu đã được đặt lại thành công");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Có lỗi xảy ra: " + e.getMessage());
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<ProfileDTO> getProfile(@AuthenticationPrincipal CustomUserDetail userDetail) {
        try {
            if (userDetail == null) {
                return ResponseEntity.badRequest().build();
            }
            ProfileDTO profile = authenService.getProfile(userDetail.getUser().getId());
            return ResponseEntity.ok(profile);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/profile")
    public ResponseEntity<String> updateProfile(@AuthenticationPrincipal CustomUserDetail userDetail,
                                                @Valid @RequestBody ProfileDTO profileDTO) {
        try {
            if (userDetail == null) {
                return ResponseEntity.badRequest().body("Ngươi dùng chưa đăng nhập");
            }
            authenService.updateProfile(userDetail.getUser().getId(), profileDTO);
            return ResponseEntity.ok("Cập nhật thông tin cá nhân thành công");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Có lỗi xảy ra: " + e.getMessage());
        }
    }

    @PostMapping("/verify-register-otp")
    public ResponseEntity<String> verifyRegisterOtp(@Valid @RequestBody com.fpt.sba301_su26_groupproject.dto.authen.VerifyOTPRequestDTO requestDTO) {
        try {
            boolean success = authenService.verifyRegisterOtp(requestDTO.email(), requestDTO.otpCode());
            if (success) {
                return ResponseEntity.ok("Xác thực thành công. Tài khoản đã được kích hoạt.");
            } else {
                return ResponseEntity.badRequest().body("Xác thực thất bại");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi xác thực: " + e.getMessage());
        }
    }
}
