# Conceptual ER Diagram — Novel Reading Platform

![Conceptual ER Diagram](C:\Users\khanh\.gemini\antigravity-ide\brain\748091fa-7d62-4fa2-8eb5-be2565a0698d\conceptual_er_diagram_1779679914158.png)

## Entities & Attributes

| Entity | Key Attributes |
|---|---|
| **User** | id, username, email, password, phone, address, role *(ADMIN/AUTHOR/READER)*, isActive, coinBalance |
| **Novel** | id, title, slug, description, coverImageUrl, status *(ongoing/completed)*, viewCount, createdAt, updatedAt |
| **Chapter** | id, chapterNumber, title, slug, content, isFree, coinPrice, viewCount, createdAt |
| **Category** | id, name, slug |
| **NovelCategory** *(join)* | novelId (PK/FK), categoryId (PK/FK) |
| **Bookmark** | id, isFavorite, lastPage, createdAt, updatedAt |
| **ChapterUnlock** | id, coinsSpent, unlockedAt |
| **CoinTransaction** | id, type, amount, balanceAfter, refId, note, createdAt |
| **Payment** | id, amountVnd, coinsReceived, status, provider, transactionRef, createdAt |
| **Revenue** | id, totalCoinsEarned, freeChapterCount, totalChapterCount, authorSharePercent, authorCoins, calculatedAt |
| **OTP** | id, email, otpCode, expiryTime |

## Relationships

```mermaid
erDiagram
    USER ||--o{ NOVEL : "writes (author_id)"
    NOVEL ||--o{ CHAPTER : "has (novel_id)"
    NOVEL ||--o{ NOVEL_CATEGORY : "classified by"
    CATEGORY ||--o{ NOVEL_CATEGORY : "groups"
    USER ||--o{ BOOKMARK : "creates (user_id)"
    BOOKMARK }o--|| NOVEL : "references (novel_id)"
    BOOKMARK }o--o| CHAPTER : "tracks last (last_chapter_id)"
    USER ||--o{ CHAPTER_UNLOCK : "unlocks (user_id)"
    CHAPTER_UNLOCK }o--|| CHAPTER : "for (chapter_id)"
    USER ||--o{ COIN_TRANSACTION : "has (user_id)"
    USER ||--o{ PAYMENT : "makes (user_id)"
    NOVEL ||--o{ REVENUE : "generates (novel_id)"
    REVENUE }o--|| USER : "credited to (author_id)"

    USER {
        UUID id PK
        string username
        string email
        string password
        string phone
        string address
        enum role
        boolean isActive
        int coinBalance
    }

    NOVEL {
        UUID id PK
        UUID author_id FK
        string title
        string slug
        text description
        string coverImageUrl
        string status
        int viewCount
        datetime createdAt
        datetime updatedAt
    }

    CHAPTER {
        UUID id PK
        UUID novel_id FK
        int chapterNumber
        string title
        string slug
        text content
        boolean isFree
        int coinPrice
        int viewCount
        datetime createdAt
    }

    CATEGORY {
        UUID id PK
        string name
        string slug
    }

    NOVEL_CATEGORY {
        UUID novel_id PK,FK
        UUID category_id PK,FK
    }

    BOOKMARK {
        UUID id PK
        UUID user_id FK
        UUID novel_id FK
        UUID last_chapter_id FK
        boolean isFavorite
        int lastPage
        datetime createdAt
        datetime updatedAt
    }

    CHAPTER_UNLOCK {
        UUID id PK
        UUID user_id FK
        UUID chapter_id FK
        int coinsSpent
        datetime unlockedAt
    }

    COIN_TRANSACTION {
        UUID id PK
        UUID user_id FK
        string type
        int amount
        int balanceAfter
        UUID refId
        string note
        datetime createdAt
    }

    PAYMENT {
        UUID id PK
        UUID user_id FK
        int amountVnd
        int coinsReceived
        string status
        string provider
        string transactionRef
        datetime createdAt
    }

    REVENUE {
        UUID id PK
        UUID novel_id FK
        UUID author_id FK
        int totalCoinsEarned
        int freeChapterCount
        int totalChapterCount
        decimal authorSharePercent
        int authorCoins
        datetime calculatedAt
    }

    OTP {
        UUID id PK
        string email
        string otpCode
        datetime expiryTime
    }
```

## Summary Notes

- **NovelCategory** là bảng trung gian (join table) thể hiện quan hệ **Many-to-Many** giữa Novel và Category.
- **User** đóng 2 vai trò: `AUTHOR` (viết novel, nhận doanh thu) và `READER` (đọc, bookmark, unlock chapter).
- **CoinTransaction** ghi log mọi biến động coin của user (nạp, chi tiêu).
- **Payment** là giao dịch nạp tiền thực tế (VNPay,...) để đổi coin.
- **Revenue** là bảng tính toán tổng doanh thu của tác giả theo novel.
- **OTP** là bảng độc lập phục vụ xác thực email, không liên kết FK với User.
