package com.fpt.sba301_su26_groupproject.repository;

import com.fpt.sba301_su26_groupproject.entity.Novel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface NovelRepository extends JpaRepository<Novel, UUID> {
    List<Novel> findByAuthorId(UUID authorId);
    boolean existsBySlug(String slug);
}
