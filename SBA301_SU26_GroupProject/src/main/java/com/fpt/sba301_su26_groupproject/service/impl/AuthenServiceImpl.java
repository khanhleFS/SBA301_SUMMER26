package com.fpt.sba301_su26_groupproject.service.impl;

import com.fpt.sba301_su26_groupproject.common.exception.AuthenException;
import com.fpt.sba301_su26_groupproject.dto.authen.LoginRequestDTO;
import com.fpt.sba301_su26_groupproject.dto.authen.ProfileDTO;
import com.fpt.sba301_su26_groupproject.dto.authen.ResgisterRequestDTO;
import com.fpt.sba301_su26_groupproject.entity.Enumeration.UserRole;
import com.fpt.sba301_su26_groupproject.entity.User;
import com.fpt.sba301_su26_groupproject.repository.UserRepository;
import com.fpt.sba301_su26_groupproject.service.AuthenService;
import com.fpt.sba301_su26_groupproject.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;

@Service
public class AuthenServiceImpl implements AuthenService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private MailService mailService;

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
    public boolean register(ResgisterRequestDTO request) {
        if(userRepository.findByEmail(request.email()).isPresent()) {
            throw new AuthenException("Email đã tồn tại");
        }
        if(userRepository.findByPhone(request.phone()).isPresent()) {
            throw new AuthenException("số điện thoại đã tồn tại");
        }

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
    public ProfileDTO getProfile(long id) {
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
    public void updateProfile(long id, ProfileDTO profile) {
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