package com.fpt.sba301_su26_groupproject.service.impl;

import com.cloudinary.Cloudinary;
import com.fpt.sba301_su26_groupproject.common.exception.ApiException;
import com.fpt.sba301_su26_groupproject.common.exception.CommonErrorCode;
import com.fpt.sba301_su26_groupproject.service.UploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UploadServiceImpl implements UploadService {

    private final Cloudinary cloudinary;

    @Override
    public String uploadImage(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new ApiException(CommonErrorCode.BAD_REQUEST, "File không được để trống");
        }

        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            throw new ApiException(CommonErrorCode.BAD_REQUEST, "Chỉ cho phép tải lên tệp tin hình ảnh");
        }

        try {
            Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(), Map.of("folder", "sba301"));
            return (String) uploadResult.get("secure_url");
        } catch (IOException e) {
            throw new ApiException(CommonErrorCode.INTERNAL_ERROR, "Tải ảnh lên Cloudinary thất bại: " + e.getMessage());
        }
    }
}
