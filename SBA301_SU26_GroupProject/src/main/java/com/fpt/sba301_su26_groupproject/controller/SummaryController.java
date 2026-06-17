package com.fpt.sba301_su26_groupproject.controller;

import com.fpt.sba301_su26_groupproject.dto.request.ChapterSummaryRequest;
import com.fpt.sba301_su26_groupproject.dto.response.ChapterSummaryResponse;
import com.fpt.sba301_su26_groupproject.service.GeminiSummaryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/summary")
@RequiredArgsConstructor
public class SummaryController {

    private final GeminiSummaryService geminiSummaryService;

    @PostMapping("/chapter")
    public ResponseEntity<ChapterSummaryResponse> summarizeChapter(@Valid @RequestBody ChapterSummaryRequest request) {
        ChapterSummaryResponse response = geminiSummaryService.summarize(request.getText());
        if (response != null) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.internalServerError().build();
        }
    }
}
