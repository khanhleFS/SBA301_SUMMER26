package com.fpt.sba301_su26_groupproject.repository;

import com.fpt.sba301_su26_groupproject.entity.Chapter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ChapterRepository extends JpaRepository<Chapter, UUID> {
    List<Chapter> findByNovelIdOrderByChapterNumberAsc(UUID novelId);
    @Query("SELECT COALESCE(MAX(c.chapterNumber), 0) FROM Chapter c WHERE c.novel.id = :novelId")
    Integer findMaxChapterNumberByNovelId(@Param("novelId") UUID novelId);
    Optional<Chapter> findByNovelIdAndChapterNumber(UUID novelId, Integer chapterNumber);

    boolean existsByNovelIdAndChapterNumber(UUID novelId, Integer chapterNumber);

    @Query("SELECT c.viewCount FROM Chapter c WHERE c.novel.id = :novelId AND c.chapterNumber = (SELECT MAX(c2.chapterNumber) FROM Chapter c2 WHERE c2.novel.id = :novelId)")
    Integer findLatestChapterViewCountByNovelId(@Param("novelId") UUID novelId);
}

//TODO: can we not use @query? 