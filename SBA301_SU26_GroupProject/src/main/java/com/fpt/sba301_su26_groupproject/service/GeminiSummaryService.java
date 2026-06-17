package com.fpt.sba301_su26_groupproject.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fpt.sba301_su26_groupproject.dto.response.ChapterSummaryResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.StandardCharsets;
import java.util.List;

@Service
public class GeminiSummaryService {

    @Value("${gemini.api.key:YOUR_API_KEY_HERE}")
    private String geminiApiKey;

    private static final String GEMINI_API_URL =
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=";

    // RestTemplate hoàn toàn cô lập: chỉ dùng StringHttpMessageConverter,
    // không để Spring/Jackson tự động can thiệp đổi tên key.
    private final RestTemplate isolatedRestTemplate;

    public GeminiSummaryService() {
        this.isolatedRestTemplate = new RestTemplate();
        this.isolatedRestTemplate.setMessageConverters(
                List.of(new StringHttpMessageConverter(StandardCharsets.UTF_8))
        );
    }

    public ChapterSummaryResponse summarize(String text) {
        String url = GEMINI_API_URL + geminiApiKey;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        try {
            // ObjectMapper cục bộ, độc lập — chỉ dùng để escape chuỗi văn bản an toàn
            ObjectMapper localMapper = new ObjectMapper();
            String escapedText = localMapper.writeValueAsString(text);

            // Raw JSON String với key snake_case chuẩn theo tài liệu Gemini API /v1
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

            // Đưa thẳng Raw String vào HttpEntity — Spring không có cơ hội can thiệp
            HttpEntity<String> entity = new HttpEntity<>(jsonBody, headers);

            ResponseEntity<String> response = isolatedRestTemplate.postForEntity(url, entity, String.class);

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