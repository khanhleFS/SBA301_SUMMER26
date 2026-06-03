package com.fpt.sba301_su26_groupproject.repository;

import com.fpt.sba301_su26_groupproject.entity.NovelCategory;
import com.fpt.sba301_su26_groupproject.entity.NovelCategoryId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface NovelCategoryRepository extends JpaRepository<NovelCategory, NovelCategoryId> {
    void deleteByNovelId(UUID novelId);
    List<NovelCategory> findByNovelId(UUID novelId);
    void  deleteByCategoryId(UUID categoryId);
    boolean existsByNovelIdAndCategoryId(UUID novelId, UUID categoryId);
}
