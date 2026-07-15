package com.fpt.sba301_su26_groupproject.repository;

import com.fpt.sba301_su26_groupproject.entity.ChapterUnlock;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface ChapterUnlockRepository extends JpaRepository<ChapterUnlock, UUID> {
    boolean existsByUserIdAndChapterId(UUID userId, UUID chapterId);
}
