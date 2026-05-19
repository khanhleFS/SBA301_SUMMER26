# Tài liệu tính năng: Reader (Đọc truyện)

## 🎯 Mục đích (Feature for Page)
Feature này chịu trách nhiệm cho trang **Đọc Truyện (Reader Page)**, ví dụ `[URL]/story/:id/chapter/:id`.
Nó cung cấp một trải nghiệm đọc truyện đắm chìm (Immersive) với các tính năng tùy biến mạnh mẽ: thay đổi chủ đề (Sáng/Đêm/Màu Kem/Màu Ngà/Màu Than), phông chữ, cỡ chữ, giãn dòng, độ sáng và cung cấp công cụ cuộn siêu mượt.

## 🧩 Các Components cấu thành
Feature này bao gồm Component cha (Controller) và các Component con tái sử dụng:

1. **`reader-feature.tsx`**: File chính (Container). Khởi tạo `ReaderProvider` và bọc toàn bộ giao diện đọc truyện trong `ReaderContent` để tiêu thụ State toàn cục một cách đồng bộ.
2. **`components/chapter-selector.tsx`**: Thanh chuyển đổi chương (Nút Lùi / Nút Tới / Dropdown chọn chương) xuất hiện đối xứng ở đầu và cuối nội dung.
3. **`components/dock.tsx`**: Thanh công cụ thao tác trôi nổi (điều hướng nhanh, bật/tắt fullscreen, mở cài đặt).
4. **`components/reader-config-menu.tsx`**: Menu tùy chỉnh giao diện (Thay đổi Font, Size, Theme). Lõi này được sử dụng chung cho cả giao diện Modal (trên Desktop) và Drawer (trên Mobile) nhằm giữ nguyên tắc DRY.
5. **`components/reader-suggestions.tsx`**: Cụm danh sách gợi ý "Truyện cùng thể loại" xuất hiện ở cuối trang.
6. **`components/reader-skeleton.tsx`**: Khung xương tải trang (Skeleton Loader) hoạt động đồng bộ với trạng thái loading để đem lại trải nghiệm mượt mà nhất.

## ⚙️ Service & Context
- **Context (`context/reader-context.tsx`)**: Quản lý tập trung toàn bộ cấu hình đọc của người dùng (chủ đề, phông chữ, giãn cách dòng, độ sáng, full-frame) và theo dõi trạng thái `isLoading` khi chuyển chương. Đồng bộ hóa mượt mà các thiết lập đọc trực tiếp vào `localStorage` của trình duyệt.
- **Service (`services/reader-service.ts`)**: Cung cấp `readerService` với API giả lập `getChapter` hỗ trợ promise delay (500ms) để tải nội dung chương truyện theo thiết kế bất đồng bộ chuẩn xác.

## 🪝 Custom Hooks
- **`useReaderContext()`**: Hook cục bộ giúp tất cả các thành phần UI (Dock, Selector, ConfigMenu) truy cập và cập nhật nhanh chóng trạng thái cấu hình của trình đọc mà không lo ngại prop-drilling.
