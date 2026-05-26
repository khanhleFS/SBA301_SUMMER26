package com.fpt.sba301_su26_groupproject.controller;

import com.fpt.sba301_su26_groupproject.dto.novel.NovelRequestDTO;
import com.fpt.sba301_su26_groupproject.dto.novel.NovelResponseDTO;
import com.fpt.sba301_su26_groupproject.service.NovelService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/api/author/novels")
@RequiredArgsConstructor
public class NovelController {

    private final NovelService novelService;

    @PostMapping
    public ResponseEntity<NovelResponseDTO> createNovel(
            @Valid @RequestBody NovelRequestDTO requestDTO,
            Authentication authentication) {
        String authorEmail = authentication.getName();
        NovelResponseDTO createdNovel = novelService.createNovel(requestDTO, authorEmail);
        return new ResponseEntity<>(createdNovel, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<NovelResponseDTO>> getMyNovels(Authentication authentication) {
        String authorEmail = authentication.getName();
        List<NovelResponseDTO> novels = novelService.getAllNovelsByAuthor(authorEmail);
        return ResponseEntity.ok(novels);
    }

    @GetMapping("/{id}")
    public ResponseEntity<NovelResponseDTO> getNovelById(@PathVariable UUID id) {
        NovelResponseDTO novel = novelService.getNovelById(id);
        return ResponseEntity.ok(novel);
    }

    @PutMapping("/{id}")
    public ResponseEntity<NovelResponseDTO> updateNovel(
            @PathVariable UUID id,
            @Valid @RequestBody NovelRequestDTO requestDTO,
            Authentication authentication) {
        String authorEmail = authentication.getName();
        NovelResponseDTO updatedNovel = novelService.updateNovel(id, requestDTO, authorEmail);
        return ResponseEntity.ok(updatedNovel);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNovel(
            @PathVariable UUID id,
            Authentication authentication) {
        String authorEmail = authentication.getName();
        novelService.deleteNovel(id, authorEmail);
        return ResponseEntity.noContent().build();
    }
}
