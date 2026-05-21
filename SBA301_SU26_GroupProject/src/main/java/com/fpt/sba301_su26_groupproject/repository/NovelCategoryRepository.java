package com.fpt.sba301_su26_groupproject.repository;

import com.fpt.sba301_su26_groupproject.entity.NovelCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface NovelCategoryRepository extends JpaRepository<NovelCategory, UUID> {
    void deleteByNovelId(UUID novelId);
}
