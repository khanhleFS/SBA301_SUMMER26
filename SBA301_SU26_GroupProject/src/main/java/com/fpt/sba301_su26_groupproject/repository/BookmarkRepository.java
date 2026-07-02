package com.fpt.sba301_su26_groupproject.repository;

import com.fpt.sba301_su26_groupproject.entity.Bookmark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface BookmarkRepository extends JpaRepository<Bookmark, UUID> {

    /** Lấy toàn bộ bookmark của 1 user, sắp xếp mới nhất trước */
    List<Bookmark> findByUserIdOrderByUpdatedAtDesc(UUID userId);

    /** Tìm bookmark theo (user, novel) — unique constraint */
    Optional<Bookmark> findByUserIdAndNovelId(UUID userId, UUID novelId);

    /** Kiểm tra tồn tại bookmark của (user, novel) */
    boolean existsByUserIdAndNovelId(UUID userId, UUID novelId);

    /** Xóa bookmark theo (user, novel) */
    void deleteByUserIdAndNovelId(UUID userId, UUID novelId);
}
