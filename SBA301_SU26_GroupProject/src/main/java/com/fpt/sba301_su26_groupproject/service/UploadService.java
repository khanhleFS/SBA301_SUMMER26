package com.fpt.sba301_su26_groupproject.service;

import org.springframework.web.multipart.MultipartFile;

public interface UploadService {
    /**
     * Uploads an image file to Cloudinary and returns its secure URL.
     *
     * @param file the MultipartFile to upload
     * @return the secure URL of the uploaded image
     */
    String uploadImage(MultipartFile file);
}
