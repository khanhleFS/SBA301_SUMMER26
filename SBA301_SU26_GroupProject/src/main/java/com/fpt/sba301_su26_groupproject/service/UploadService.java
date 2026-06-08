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

    /**
     * Uploads raw MP3 audio bytes to Cloudinary and returns its secure URL.
     *
     * @param audioBytes the MP3 audio data
     * @param publicId   the desired Cloudinary public ID (e.g. "audio/chapter-uuid")
     * @return the secure URL of the uploaded audio
     */
    String uploadAudio(byte[] audioBytes, String publicId);
}
