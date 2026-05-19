package com.fpt.sba301_su26_groupproject.service;

import com.fpt.sba301_su26_groupproject.dto.authen.LoginRequestDTO;
import com.fpt.sba301_su26_groupproject.dto.authen.ProfileDTO;
import com.fpt.sba301_su26_groupproject.dto.authen.ResgisterRequestDTO;

import java.util.UUID;

public interface AuthenService {
    void login(LoginRequestDTO request);

    boolean register(ResgisterRequestDTO request);

    void forgotPassword(String email);

    void resetPassword(String email, String oldPassword, String newPassword);

    ProfileDTO getProfile(UUID id);

    void updateProfile(UUID id, ProfileDTO profile);

    boolean isEmailValid(String email);
}
