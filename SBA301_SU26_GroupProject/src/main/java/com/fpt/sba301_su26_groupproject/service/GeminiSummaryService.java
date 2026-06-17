package com.fpt.sba301_su26_groupproject.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fpt.sba301_su26_groupproject.dto.response.ChapterSummaryResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GeminiSummaryService {

    @Value("${gemini.api.key:YOUR_API_KEY_HERE}")
    private String geminiApiKey;

    private static final String GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=";

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public ChapterSummaryResponse summarize(String text) {
        String url = GEMINI_API_URL + geminiApiKey;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        try {
            // Tạo một ObjectMapper độc lập hoàn toàn, không dính cấu hình global của dự án
            ObjectMapper localMapper = new ObjectMapper();
            
            // Escape nội dung văn bản truyện để tránh lỗi xuống dòng hoặc dấu nháy kép làm vỡ JSON
            String escapedText = localMapper.writeValueAsString(text);

            // Viết chuỗi JSON thô với các key chuẩn snake_case theo tài liệu Gemini API v1
            String jsonBody = "{"
                + "\"contents\": [{"
                + "    \"parts\": [{\"text\": " + escapedText + "}]"
                + "}],"
                + "\"system_instruction\": {"
                + "    \"parts\": [{\"text\": \"Bạn là một AI Summarization Agent chuyên nghiệp cho một ứng dụng đọc truyện chữ. Nhiệm vụ của bạn là tóm tắt nội dung của các chương truyện.\\nTrả về duy nhất 1 object JSON với cấu trúc: {\\\"chapter_title\\\": \\\"...\\\", \\\"summary_text\\\": \\\"...\\\", \\\"key_characters\\\": [\\\"...\\\"], \\\"main_events\\\": [\\\"...\\\"]}\"}]"
                + "},"
                + "\"generation_config\": {"
                + "    \"response_mime_type\": \"application/json\""
                + "}"
                + "}";

            // Đưa trực tiếp chuỗi String cứng này vào HttpEntity<String>
            HttpEntity<String> entity = new HttpEntity<>(jsonBody, headers);

            // Gửi POST request đi bằng RestTemplate
            ResponseEntity<String> response = restTemplate.postForEntity(url, entity, String.class);
            
            if (response.getStatusCode() == HttpStatus.OK) {
                JsonNode rootNode = localMapper.readTree(response.getBody());
                JsonNode candidatesNode = rootNode.path("candidates");
                if (candidatesNode.isArray() && !candidatesNode.isEmpty()) {
                    JsonNode contentNode = candidatesNode.get(0).path("content");
                    JsonNode partsNode = contentNode.path("parts");
                    if (partsNode.isArray() && !partsNode.isEmpty()) {
                        String jsonString = partsNode.get(0).path("text").asText();
                        return localMapper.readValue(jsonString, ChapterSummaryResponse.class);
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }
}