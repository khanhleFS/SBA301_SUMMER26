standard
### **📄 TÀI LIỆU 1: QUY TẮC PHÁT TRIỂN BACKEND (SBA301_SUMMER26)**
#### **1. Kiến trúc Phân lớp & Luồng xử lý (Extreme SoC)**
Luồng dữ liệu đi theo trình tự chuẩn: **Controller → Service Interface → ServiceImpl → Repository → Entity/DB**.

- **Controller:** Định nghĩa hợp đồng giao tiếp (Routing, Swagger/OpenAPI annotations). Nhận request, validate input, gọi Service và trả về ApiResponse. Tuyệt đối không chứa business logic.
- **Service & ServiceImpl:** ServiceImpl chứa toàn bộ business logic. Không gọi trực tiếp nhiều Repository không liên quan, phải giao tiếp chéo qua các Service Interface khác nếu cần.
- **Repository:** Chỉ chứa câu lệnh truy vấn (query), tuyệt đối không chứa logic xử lý dữ liệu.
- **Entity:** Không bao giờ được trả thẳng ra ngoài API. Bắt buộc map sang DTO.
#### **2. Quy ước Đặt tên (Naming Conventions)**

|**Thành phần**|**Quy tắc Pattern**|**Ví dụ**|
| :- | :- | :- |
|**Entity**|PascalCase|Novel|
|**Repository**|{Entity}Repository|NovelRepository|
|**Service Interface**|{Entity}Service|NovelService|
|**ServiceImpl**|{Entity}ServiceImpl|NovelServiceImpl|
|**Controller**|{Entity}Controller|NovelController|
|**DTO (Request)**|{Action}{Entity}Request|CreateNovelRequest|
|**DTO (Response)**|{Entity}Response|NovelResponse|
|**Error Code**|{Entity}ErrorCode|NovelErrorCode|
#### **3. Phản hồi API & Xử lý lỗi**
- **Định dạng chuẩn:** Mọi endpoint đều phải bọc trong ApiResponse<T>, không bao giờ trả raw object.
- **Cấu trúc JSON:** Luôn đảm bảo 3 trường: code, message, và result.
- **Throw lỗi:** Chủ động sử dụng ApiException(ErrorCode) ngay trong ServiceImpl khi business logic không thỏa mãn.
- **Bắt lỗi:** GlobalExceptionHandler sẽ tóm toàn bộ Exception và map tự động sang ApiResponse để trả về cho Client.
- **Enum ErrorCode:** Mỗi module (domain) phải có một enum ErrorCode riêng biệt (ví dụ: NovelErrorCode, AuthErrorCode, CommonErrorCode).
#### **4. Quy tắc Entity & DTO**
- **BaseEntity:** Các Entity bắt buộc kế thừa BaseEntity để hệ thống tự động quản lý id, createdAt, updatedAt.
- **Quan hệ bảng:** Luôn setup FetchType.LAZY cho tất cả @ManyToOne và @OneToMany để chặn đứng rủi ro N+1 query.
- **Lombok:** Dùng bộ ba @Builder, @NoArgsConstructor, và @AllArgsConstructor đồng thời cho các class Entity.
- **Tách biệt DTO:** Phân rạch ròi Request DTO (hứng data từ client, chứa validation rules) và Response DTO (đổ data về client).
#### **5. Cấu trúc Controller, Service & Repository**
- **Controller:** Gánh toàn bộ trách nhiệm định tuyến HTTP (@GetMapping, @PostMapping...), khai báo Swagger (@Tag, @Operation, @ApiResponse, @Schema), và gắn annotation bảo mật (@PreAuthorize) nếu cần. Giữ file sạch, tập trung vào việc điều phối (gọi Service và bọc ResponseEntity).
- **Service:** Khai báo @Transactional(readOnly = true) ở mức class làm mặc định. Chỉ override @Transactional cho các method có thao tác GHI (C/U/D).
- **Repository:** Tuân thủ thứ tự ưu tiên: Derived query (tự sinh qua tên method) ➔ JPQL (để dùng join fetch giải quyết N+1) ➔ Native query (chỉ dùng khi bất khả kháng, vị dụ full-text search phức tạp).
#### **6. Bảo mật & Checklist trước khi tạo Pull Request**
- [ ] Các endpoint public/protected đã được config phân chia rõ ràng trong SecurityConfig.java.
- [ ] Toàn bộ password mới/cập nhật đều đi qua BCryptPasswordEncoder.
- [ ] Token JWT đã được verify thành công qua JwtFilter.
- [ ] Đã check kỹ luồng data: **Không có Entity nào lọt ra tới Controller/Client**.
- [ ] Không sử dụng throw new RuntimeException() – thay bằng ApiException kèm ErrorCode chuẩn.

src examples

src: [here](https://claude.ai/share/c26b3b9f-b36a-4433-9674-9a9e7f9b403a)
