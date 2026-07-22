-- =============================================================================
-- SINGLE NOVEL BELL-CURVE DEMO (Empire of Glass = novel_id 10)
-- =============================================================================

DECLARE @TargetNovelId BIGINT = 10;

-- =============================================================================
-- 1. RESET dữ liệu cũ của novel này
-- =============================================================================

DELETE ct
FROM coin_transactions ct
JOIN chapter_unlocks cu ON ct.user_id = cu.user_id
JOIN chapters ch ON cu.chapter_id = ch.id
WHERE ch.novel_id = @TargetNovelId
  AND ct.type = 'UNLOCKED_CHAPTER';

DELETE cu
FROM chapter_unlocks cu
JOIN chapters ch ON cu.chapter_id = ch.id
WHERE ch.novel_id = @TargetNovelId;

DELETE FROM revenues WHERE novel_id = @TargetNovelId;

-- =============================================================================
-- 2. VIEW COUNT HÌNH CHUÔNG
-- Peak ở chapter giữa (khoảng 33)
-- =============================================================================

;WITH ChapterPosition AS (
    SELECT
        id,
        chapter_number,
        ABS(chapter_number - 33) AS distance_from_peak
    FROM chapters
    WHERE novel_id = @TargetNovelId
)
UPDATE c
SET view_count =
    CASE
        WHEN cp.distance_from_peak = 0 THEN 1800
        WHEN cp.distance_from_peak <= 2 THEN 1650
        WHEN cp.distance_from_peak <= 5 THEN 1450
        WHEN cp.distance_from_peak <= 8 THEN 1250
        WHEN cp.distance_from_peak <= 12 THEN 1050
        WHEN cp.distance_from_peak <= 16 THEN 850
        WHEN cp.distance_from_peak <= 20 THEN 650
        WHEN cp.distance_from_peak <= 25 THEN 450
        ELSE 250
    END
FROM chapters c
JOIN ChapterPosition cp ON c.id = cp.id;

-- =============================================================================
-- 3. PHÂN PHỐI NGƯỜI MUA HÌNH CHUÔNG
-- 2,3,5,8,12,15,12,9,5,3
-- =============================================================================

DECLARE @Readers TABLE (
    user_id UNIQUEIDENTIFIER,
    unlock_count INT
);

INSERT INTO @Readers VALUES
('98bc5d00-38e0-54b1-8499-03ec52fb016a', 2),
('b2f5c7d3-0a4e-5b82-9c5f-3d7e0a1f2b4c', 3),
('c3a6d8e4-1b5f-5c93-ad6a-4e8f1b2a3c5d', 5),
('d4b7e9f5-2c6a-5da4-be7b-5f9a2c3b4d6e', 8),
('e5c8fa06-3d7b-5eb5-cf8c-6a0b3d4c5e7f', 12),
('e6f7a8b9-4e8c-5fc6-df9d-7b1c4d5e6f80', 15),
('f7a8b9c0-5f9d-5ad7-ea0e-8c2d5e6f7a91', 12),
('a8b9c0d1-6a0e-5be8-fb1f-9d3e6f7a8ba2', 9),
('b9c0d1e2-7b1f-5cf9-ac20-ae4f7a8b9cb3', 5),
('c0d1e2f3-8c20-5da0-bd31-bf5a8b9c0dc4', 3);

-- Insert unlocks theo phân phối hình chuông
INSERT INTO chapter_unlocks (
    id,
    user_id,
    chapter_id,
    coins_spent,
    unlocked_at
)
SELECT
    NEWID(),
    r.user_id,
    c.id,
    15,
    DATEADD(
        DAY,
        -20 + ROW_NUMBER() OVER (
            PARTITION BY r.user_id
            ORDER BY c.chapter_number
        ),
        SYSUTCDATETIME()
    )
FROM @Readers r
CROSS APPLY (
    SELECT TOP (r.unlock_count)
        c.id,
        c.chapter_number
    FROM chapters c
    WHERE c.novel_id = @TargetNovelId
      AND c.status = 'LOCKED'
    ORDER BY c.chapter_number
) c;

-- Coin transactions tương ứng
INSERT INTO coin_transactions (
    id,
    user_id,
    type,
    amount,
    balance_after,
    note,
    created_at
)
SELECT
    NEWID(),
    cu.user_id,
    'UNLOCKED_CHAPTER',
    -15,
    0,
    'Unlock chapter: Empire of Glass - Ch.' + CAST(ch.chapter_number AS VARCHAR),
    cu.unlocked_at
FROM chapter_unlocks cu
JOIN chapters ch ON cu.chapter_id = ch.id
WHERE ch.novel_id = @TargetNovelId;

-- =============================================================================
-- 4. DOANH THU = n x 15
-- n = tổng số chapter đã được mua
-- =============================================================================

INSERT INTO revenues (
    novel_id,
    author_id,
    total_coins_earned,
    free_chapter_count,
    total_chapter_count,
    author_share_percent,
    author_coins,
    calculated_at
)
SELECT
    n.id,
    n.author_id,

    -- n x 15
    COUNT(cu.id) * 15 AS total_coins_earned,

    SUM(CASE WHEN c.status = 'FREE' THEN 1 ELSE 0 END) AS free_chapter_count,

    COUNT(c.id) AS total_chapter_count,

    70.00 AS author_share_percent,

    CAST(COUNT(cu.id) * 15 * 0.70 AS INT) AS author_coins,

    SYSUTCDATETIME()
FROM novels n
LEFT JOIN chapters c
    ON c.novel_id = n.id
LEFT JOIN chapter_unlocks cu
    ON cu.chapter_id = c.id
WHERE n.id = @TargetNovelId
GROUP BY n.id, n.author_id;

-- =============================================================================
-- 5. VERIFY
-- =============================================================================

SELECT
    'Empire of Glass' AS novel,
    COUNT(DISTINCT cu.id) AS total_unlocks,
    COUNT(DISTINCT cu.id) * 15 AS revenue_coins,
    MIN(c.view_count) AS min_view,
    MAX(c.view_count) AS max_view
FROM novels n
LEFT JOIN chapters c ON c.novel_id = n.id
LEFT JOIN chapter_unlocks cu ON cu.chapter_id = c.id
WHERE n.id = @TargetNovelId;

-- View distribution theo chapter
SELECT
    chapter_number,
    view_count
FROM chapters
WHERE novel_id = @TargetNovelId
ORDER BY chapter_number;