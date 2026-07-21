# Kế Hoạch Thực Hiện (Implementation Plan) - Mã Hóa Nội Dung Chapter (AES-256-CBC) & Trình Đọc Chống Copy (HTML5 Canvas + CryptoJS)

Kế hoạch này chi tiết hóa việc nâng cấp hệ thống bảo vệ bản quyền nội dung chương truyện:
1. **Backend Spring Boot**: Thêm `EncryptionService` để mã hóa nội dung chương truyện (`content`) bằng thuật toán **AES-256-CBC** với `IV` ngẫu nhiên trước khi trả về cho Client.
2. **Frontend (Vite/React & HTML5 Canvas)**: Tích hợp giải mã **CryptoJS** và vẽ văn bản lên **HTML5 Canvas**, kết hợp chặn sao chép (chuột phải, bôi đen, F12/DevTools).

---

## User Review Required

> [!IMPORTANT]
> - **Khóa mã hóa Secret Key**: Khóa mã hóa AES-256 yêu cầu đúng 32 bytes (32 ký tự), mặc định cấu hình trong `application.properties`: `12345678901234567890123456789012`.
> - **Thay đổi định dạng API Chapter**: `ChapterResponseDTO` sẽ bổ sung thêm 2 trường `encryptedData` và `iv`.
> - **Bảo mật chống Copy ở Frontend**: Văn bản được vẽ trực tiếp lên thẻ `<canvas>`, người dùng Inspect Element (F12) sẽ chỉ thấy hình ảnh canvas chứ không lấy được chuỗi văn bản thô HTML.

---

## Proposed Changes

### Backend (Spring Boot)

#### [NEW] [EncryptionService.java](file:///d:/semester%207/SBA/SBA301_SUMMER26/SBA301_SU26_GroupProject/src/main/java/com/fpt/sba301_su26_groupproject/service/EncryptionService.java)
- **Tại sao**: Tạo service chuyên trách mã hóa chuỗi văn bản bằng thuật toán AES-256-CBC (sử dụng `SecretKeySpec`, `IvParameterSpec` ngẫu nhiên 16 bytes) và trả về Map chứa `encryptedData` (dạng HEX) cùng `iv` (dạng HEX).

#### [MODIFY] [application.properties](file:///d:/semester%207/SBA/SBA301_SUMMER26/SBA301_SU26_GroupProject/src/main/resources/application.properties)
- **Tại sao**: Thêm cấu hình secret key mã hóa:
  ```properties
  app.security.secret-key=${APP_SECURITY_SECRET_KEY:12345678901234567890123456789012}
  ```

#### [MODIFY] [application-mssql.properties](file:///d:/semester%207/SBA/SBA301_SUMMER26/SBA301_SU26_GroupProject/src/main/resources/application-mssql.properties) & [application-h2.properties](file:///d:/semester%207/SBA/SBA301_SUMMER26/SBA301_SU26_GroupProject/src/main/resources/application-h2.properties)
- **Tại sao**: Đồng bộ thuộc tính `app.security.secret-key` cho cả 2 môi trường.

#### [MODIFY] [ChapterResponseDTO.java](file:///d:/semester%207/SBA/SBA301_SUMMER26/SBA301_SU26_GroupProject/src/main/java/com/fpt/sba301_su26_groupproject/dto/chapter/ChapterResponseDTO.java)
- **Tại sao**: Thêm 2 thuộc tính `encryptedData` và `iv` vào `ChapterResponseDTO record` để truyền dữ liệu mã hóa về Client.

#### [MODIFY] [ChapterServiceImpl.java](file:///d:/semester%207/SBA/SBA301_SUMMER26/SBA301_SU26_GroupProject/src/main/java/com/fpt/sba301_su26_groupproject/service/impl/ChapterServiceImpl.java)
- **Tại sao**: Inject `EncryptionService` vào `ChapterServiceImpl`. Trong hàm `mapToResponseDTO`, tự động mã hóa `chapter.getContent()` và gán giá trị cho `encryptedData` và `iv`.

---

### Frontend (React / HTML5 Canvas + CryptoJS)

#### [MODIFY] [chapter.ts](file:///d:/semester%207/SBA/SBA301_SUMMER26/Frontend/src/types/chapter.ts)
- **Tại sao**: Bổ sung `encryptedData?: string` và `iv?: string` vào TypeScript interface `ChapterResponseDTO`.

#### [NEW] [reader.html](file:///d:/semester%207/SBA/SBA301_SUMMER26/Frontend/public/reader.html)
- **Tại sao**: Cung cấp trang đọc truyện bằng **HTML5 Canvas** sử dụng **CryptoJS** để giải mã dữ liệu `encryptedData` + `iv` nhận từ API, xử lý tự động ngắt dòng/ngắt đoạn (`\n`), tối ưu hiển thị màn hình Retina/Mobile, và chặn các thao tác copy (vô hiệu hóa menu chuột phải, select text, phím tắt F12/Ctrl+Shift+I/Ctrl+U/Ctrl+S).

---

## Verification Plan

### Automated Verification
- Kiểm tra mã hóa/giải mã AES-256-CBC thông qua Unit Test hoặc gọi trực tiếp API backend.
- Đảm bảo mã hóa với các IV ngẫu nhiên khác nhau giữa các lần gọi API.

### Manual Verification
1. Gọi API `GET /api/novels/{novelId}/chapters/{chapterNumber}` để kiểm tra response trả về chứa `encryptedData` và `iv` dạng chuỗi HEX.
2. Mở file `reader.html` trên trình duyệt, kết nối tới API backend để xác nhận:
   - Dữ liệu được giải mã bằng CryptoJS và vẽ chuẩn xác trên Canvas.
   - Thao tác chuột phải, bôi đen văn bản và phím tắt F12/Inspect bị chặn hoàn toàn.
