package com.fpt.sba301_su26_groupproject.service.impl;

import com.fpt.sba301_su26_groupproject.common.exception.AuthenException;
import com.fpt.sba301_su26_groupproject.dto.authen.LoginRequestDTO;
import com.fpt.sba301_su26_groupproject.dto.authen.ProfileDTO;
import com.fpt.sba301_su26_groupproject.dto.authen.ResgisterRequestDTO;
import com.fpt.sba301_su26_groupproject.entity.Enumeration.UserRole;
import com.fpt.sba301_su26_groupproject.entity.OTP;
import com.fpt.sba301_su26_groupproject.entity.User;
import com.fpt.sba301_su26_groupproject.repository.OTPRepository;
import com.fpt.sba301_su26_groupproject.repository.UserRepository;
import com.fpt.sba301_su26_groupproject.service.AuthenService;
import com.fpt.sba301_su26_groupproject.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.Instant;
import java.util.UUID;

@Service
public class AuthenServiceImpl implements AuthenService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private MailService mailService;
    @Autowired
    private OTPRepository otpRepository;

    @Override
    public void login(LoginRequestDTO request) {
        User user = userRepository.findByEmail(request.email()).orElse(null);
        if (user == null || !passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new AuthenException("Email hoặc mật khẩu sai");
        } else if (!user.getIsActive()) {
            throw new AuthenException("Người dùng đang bị khóa");
        }
    }

    @Override
    @Transactional
    public boolean register(ResgisterRequestDTO request) {
        if(userRepository.findByEmail(request.email()).isPresent()) {
            throw new AuthenException("Email đã tồn tại");
        }
        if(userRepository.findByPhone(request.phone()).isPresent()) {
            throw new AuthenException("Số điện thoại đã tồn tại");
        }
        // Tạo User nhưng CƯỠNG CHẾ trạng thái là chưa kích hoạt
        User user = User.builder()
                .username(request.fullName())
                .email(request.email())
                .phone(request.phone())
                .password(passwordEncoder.encode(request.password()))
                .address(request.address())
                .role(UserRole.USER)
                .isActive(request.isActive() != null ? request.isActive() : true)
                .build();
        userRepository.save(user);
        // Sinh OTP 6 số
        String otpCode = String.format("%06d", new SecureRandom().nextInt(999999));

        // Xóa OTP cũ nếu có và lưu OTP mới (hết hạn sau 5 phút)
        otpRepository.deleteByEmail(request.email(),  otpCode);
        OTP otp = OTP.builder()
                .email(request.email())
                .otpCode(otpCode)
                .expiryTime(Instant.now().plusSeconds(5 * 60)) // 5 phút
                .build();
        otpRepository.save(otp);
        // Gửi mail
        try {
            mailService.sendHtml(request.email(), "Xác nhận đăng ký tài khoản",
                    "<h1>Mã OTP xác nhận của bạn là: " + otpCode + "</h1><p>Mã này sẽ hết hạn sau 5 phút.</p>");
        } catch (Exception e) {
            throw new AuthenException("Lỗi gửi email: " + e.getMessage());
        }
        return true;
    }

    @Override
    public void forgotPassword(String email) {
            User user = userRepository.findByEmail(email).orElse(null);
            if (user == null) {
                throw new AuthenException("Email không tồn tại");
            }
            String newPassword = generateRandomPassword();
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
            try{
                mailService.sendHtml(email, "Quên Mật Khẩu",
                        "<h1>Mật khẩu mới của bạn là: " + newPassword + "</h1>");
            } catch (Exception e) {
                throw new AuthenException("Có Lỗi khi gửi email vui lòng thử lại sau" + e.getMessage());
            }
        }

    @Override
    public void resetPassword(String email, String oldPassword, String newPassword) {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            throw new AuthenException("Người dùng không tồn tại");
        }
        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new AuthenException("Mật khẩu cũ không khớp");
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    @Override
    public ProfileDTO getProfile(UUID id) {
        User user = userRepository.findById(id).orElse(null);
        if (user == null) {
            throw new AuthenException("Người dùng không tồn tại");
        }
        return ProfileDTO.builder()
                .fullName(user.getUsername())
                .email(user.getEmail())
                .phone(user.getPhone())
                .address(user.getAddress())
                .build();
    }

    @Override
    public void updateProfile(UUID id, ProfileDTO profile) {
        User user = userRepository.findById(id).orElse(null);
        if (user == null) {
            throw new AuthenException("Người dùng không tồn tại");
        }
        // Check if email or phone is already taken by another user
        userRepository.findByEmail(profile.email()).ifPresent(existingUser -> {
            if (!existingUser.getId().equals(id)) {
                throw new AuthenException("Email đã tồn tại");
            }
        });
        userRepository.findByPhone(profile.phone()).ifPresent(existingUser -> {
            if (!existingUser.getId().equals(id)) {
                throw new AuthenException("Số điện thoại đã tồn tại");
            }
        });
        // Update user profile
        user.setUsername(profile.fullName());
        user.setEmail(profile.email());
        user.setPhone(profile.phone());
        user.setAddress(profile.address());
        userRepository.save(user);
    }

    @Override
    public boolean isEmailValid(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    @Override
    @Transactional
    public boolean verifyRegisterOtp(String email, String otpCode) {
        OTP otp = otpRepository.findByEmailAndOtpCode(email, otpCode)
                .orElseThrow(() -> new AuthenException("Mã OTP không hợp lệ"));
        if (otp.getExpiryTime().isBefore(Instant.now())) {
            throw new AuthenException("Mã OTP đã hết hạn");
        }
        // Kích hoạt User
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AuthenException("Không tìm thấy người dùng"));
        user.setIsActive(true);
        userRepository.save(user);
        // Xóa OTP sau khi dùng thành công
        otpRepository.deleteByEmail(email, otpCode);
        return true;
    }

    public String generateRandomPassword() {
        int length = 10;
        String charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
        SecureRandom random = new SecureRandom();
        StringBuilder password = new StringBuilder();

        for (int i = 0; i < length; i++) {
            int randomIndex = random.nextInt(charSet.length());
            password.append(charSet.charAt(randomIndex));
        }
        return password.toString();
    }
}