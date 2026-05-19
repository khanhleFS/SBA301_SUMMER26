# Tài liệu tính năng: Search (Tìm kiếm & Phân loại)

## 🎯 Mục đích (Feature for Page)
Feature này phục vụ cho trang **Tìm Kiếm / Khám phá Truyện (Advanced Search / Catalog Page)**.
Cung cấp cho người dùng khả năng duyệt kho truyện đồ sộ với các bộ lọc cực kỳ chi tiết (Thể loại, Trạng thái, Sắp xếp), kết hợp với tìm kiếm văn bản trực tiếp. Giao diện được thiết kế hiện đại, cao cấp với hiệu ứng Particles nền.

## 🧩 Các Components cấu thành
Tính năng Search có kiến trúc Modular rất sạch sẽ và hiện đại:

1. **`search-feature.tsx`**: Component Controller, nơi dựng Layout bao quát toàn trang.
2. **`components/particle-backdrop.tsx`**: Khối giao diện tạo hiệu ứng nền hạt lấp lánh (Particles) đem lại vẻ đẹp Premium cho trang tìm kiếm.
3. **`components/search-sidebar.tsx`**: Thanh công cụ (Sidebar) chứa các Input Lọc (Bộ lọc thể loại, trạng thái truyện, tag...).
4. **`components/search-card.tsx`**: Component hiển thị thông tin chi tiết một bộ truyện trong khung Grid/List (Thumbnail, Tên, Lượt view, Nút Bookmark).
5. **`components/search-pagination.tsx`**: Thanh phân trang (Pagination) ở dưới cùng.
6. **`components/search-skeleton.tsx`**: Khung Skeleton loading mượt mà hiển thị trong lúc chờ dữ liệu API để tránh Layout Shift.

## ⚙️ Service, Context, Skeleton, Loader
Feature này được xây dựng chuẩn mực theo mô hình Layer:

- **Context (`context/search-context.tsx`)**: Đảm nhiệm State Management cục bộ cho trang Search (giữ trạng thái bộ lọc hiện hành, query chữ, page hiện tại) để tránh Prop-drilling giữa Sidebar và Danh sách truyện.
- **Service (`services/story-service.ts`)**: Tách biệt logic lấy data ra khỏi Component. Có thể đây là nơi chứa API calls `getStories(filters)` hoặc Mock Data logic trả về kết quả truy vấn.
- **Skeleton / Loader**: Có sử dụng `search-skeleton.tsx` đóng vai trò làm Loader riêng biệt siêu nhẹ cho List Truyện.

## 🪝 Custom Hooks
- Nhờ việc sử dụng Context, trang này cung cấp hook **`useSearchContext()`** (nằm bên trong file context) giúp các component con như Pagination, Sidebar, hay Input lấy và cập nhật dữ liệu bộ lọc một cách đồng bộ.
