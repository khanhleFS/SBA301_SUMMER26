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
            // Sử dụng các key SNAKE_CASE chuẩn xác theo yêu cầu API v1
            Map<String, Object> systemInstruction = new HashMap<>();
            Map<String, Object> partsSys = new HashMap<>();
            partsSys.put("text", "Bạn là một AI Summarization Agent chuyên nghiệp cho một ứng dụng đọc truyện chữ. Nhiệm vụ của bạn là tóm tắt nội dung của các chương truyện.\n" +
                    "Trả về duy nhất 1 object JSON với cấu trúc: {\"chapter_title\": \"...\", \"summary_text\": \"...\", \"key_characters\": [\"...\"], \"main_events\": [\"...\"]}");
            systemInstruction.put("parts", List.of(partsSys));

            Map<String, Object> contents = new HashMap<>();
            Map<String, Object> partsContent = new HashMap<>();
            partsContent.put("text", text);
            contents.put("parts", List.of(partsContent));

            Map<String, Object> generationConfig = new HashMap<>();
            generationConfig.put("response_mime_type", "application/json");

            Map<String, Object> body = new HashMap<>();
            body.put("system_instruction", systemInstruction);
            body.put("contents", List.of(contents));
            body.put("generation_config", generationConfig);

            // Serialize thủ công thành Raw JSON String để tránh bị RestTemplate/Jackson tự động ép kiểu sai
            String rawJsonPayload = objectMapper.writeValueAsString(body);

            HttpEntity<String> entity = new HttpEntity<>(rawJsonPayload, headers);

            ResponseEntity<String> response = restTemplate.postForEntity(url, entity, String.class);
            
            if (response.getStatusCode() == HttpStatus.OK) {
                JsonNode rootNode = objectMapper.readTree(response.getBody());
                JsonNode candidatesNode = rootNode.path("candidates");
                if (candidatesNode.isArray() && !candidatesNode.isEmpty()) {
                    JsonNode contentNode = candidatesNode.get(0).path("content");
                    JsonNode partsNode = contentNode.path("parts");
                    if (partsNode.isArray() && !partsNode.isEmpty()) {
                        String jsonString = partsNode.get(0).path("text").asText();
                        return objectMapper.readValue(jsonString, ChapterSummaryResponse.class);
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }
}