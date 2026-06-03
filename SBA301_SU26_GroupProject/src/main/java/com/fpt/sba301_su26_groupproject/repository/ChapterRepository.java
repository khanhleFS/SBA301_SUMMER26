package com.fpt.sba301_su26_groupproject.repository;

import com.fpt.sba301_su26_groupproject.entity.Chapter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ChapterRepository extends JpaRepository<Chapter, UUID> {
    // Lấy mục lục chương của truyện xếp tăng dần theo số thứ tự chương
    List<Chapter> findByNovelIdOrderByChapterNumberAsc(UUID novelId);
    // Truy vấn số chương lớn nhất hiện tại của một bộ truyện (dùng để tự động tăng số chương)
    @Query("SELECT COALESCE(MAX(c.chapterNumber), 0) FROM Chapter c WHERE c.novel.id = :novelId")
    Integer findMaxChapterNumberByNovelId(@Param("novelId") UUID novelId);
    // Lấy chi tiết chương cụ thể của truyện
    Optional<Chapter> findByNovelIdAndChapterNumber(UUID novelId, Integer chapterNumber);

    boolean existsByNovelIdAndChapterNumber(UUID novelId, Integer chapterNumber);
}
