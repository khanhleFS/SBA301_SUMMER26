<a name="_htmwnbbikab"></a>standard
### <a name="_nh1hnifsq1pb"></a>**📄 TÀI LIỆU 1: QUY TẮC PHÁT TRIỂN BACKEND (SBA301\_SUMMER26 - CẬP NHẬT CONTRACT-FIRST)**
#### <a name="_roix7ohhc0um"></a>**1. Kiến trúc Phân lớp & Luồng xử lý (Extreme SoC)**
Luồng dữ liệu đi theo trình tự chuẩn: **ApiInterface (Contract) → Controller (Implementation) → Service Interface → ServiceImpl → Repository → Entity/DB**.

- **ApiInterface:** Định nghĩa hợp đồng giao tiếp (Contract). Chứa toàn bộ Meta-data (Routing, Swagger/OpenAPI annotations).
- **Controller:** Class implement ApiInterface. Chỉ nhận request, validate input, gọi Service và trả về ApiResponse. Tuyệt đối không chứa business logic, không chứa annotation tài liệu hay routing dư thừa. Cố gắng giữ class này dưới 50 dòng.
- **Service & ServiceImpl:** ServiceImpl chứa toàn bộ business logic. Không gọi trực tiếp nhiều Repository không liên quan, phải giao tiếp chéo qua các Service Interface khác nếu cần.
- **Repository:** Chỉ chứa câu lệnh truy vấn (query), tuyệt đối không chứa logic xử lý dữ liệu.
- **Entity:** Không bao giờ được trả thẳng ra ngoài API. Bắt buộc map sang DTO.
#### <a name="_li8509yu8qyn"></a>**2. Quy ước Đặt tên (Naming Conventions)**

|**Thành phần**|**Quy tắc Pattern**|**Ví dụ**|
| :- | :- | :- |
|**Entity**|PascalCase|Novel|
|**Repository**|{Entity}Repository|NovelRepository|
|**Service Interface**|{Entity}Service|NovelService|
|**ServiceImpl**|{Entity}ServiceImpl|NovelServiceImpl|
|**API Interface**|{Entity}API|NovelAPI|
|**Controller**|{Entity}Controller|NovelController|
|**DTO (Request)**|{Action}{Entity}Request|CreateNovelRequest|
|**DTO (Response)**|{Entity}Response|NovelResponse|
|**Error Code**|{Entity}ErrorCode|NovelErrorCode|
#### <a name="_gnwjb0cn1a8z"></a>**3. Phản hồi API & Xử lý lỗi**
- **Định dạng chuẩn:** Mọi endpoint đều phải bọc trong ApiResponse<T>, không bao giờ trả raw object.
- **Cấu trúc JSON:** Luôn đảm bảo 3 trường: code, message, và result.
- **Throw lỗi:** Chủ động sử dụng ApiException(ErrorCode) ngay trong ServiceImpl khi business logic không thỏa mãn.
- **Bắt lỗi:** GlobalExceptionHandler sẽ tóm toàn bộ Exception và map tự động sang ApiResponse để trả về cho Client.
- **Enum ErrorCode:** Mỗi module (domain) phải có một enum ErrorCode riêng biệt (ví dụ: NovelErrorCode, AuthErrorCode, CommonErrorCode).
#### <a name="_pplguq9idlh4"></a>**4. Quy tắc Entity & DTO**
- **BaseEntity:** Các Entity bắt buộc kế thừa BaseEntity để hệ thống tự động quản lý id, createdAt, updatedAt.
- **Quan hệ bảng:** Luôn setup FetchType.LAZY cho tất cả @ManyToOne và @OneToMany để chặn đứng rủi ro N+1 query.
- **Lombok:** Dùng bộ ba @Builder, @NoArgsConstructor, và @AllArgsConstructor đồng thời cho các class Entity.
- **Tách biệt DTO:** Phân rạch ròi Request DTO (hứng data từ client, chứa validation rules) và Response DTO (đổ data về client).
#### <a name="_a5lqds2dedhg"></a>**5. Cấu trúc Interface, Controller, Service & Repository**
- **API Interface:** Phải gánh toàn bộ trách nhiệm khai báo Swagger (@Tag, @Operation, @ApiResponse, @Schema) và định tuyến HTTP (@GetMapping, @PostMapping...).
- **Controller:** Gắn annotation bảo mật (@PreAuthorize) nếu cần. Giữ file cực kỳ sạch, chỉ tập trung vào việc điều phối (gọi Service và bọc ResponseEntity).
- **Service:** Khai báo @Transactional(readOnly = true) ở mức class làm mặc định. Chỉ override @Transactional cho các method có thao tác GHI (C/U/D).
- **Repository:** Tuân thủ thứ tự ưu tiên: Derived query (tự sinh qua tên method) ➔ JPQL (để dùng join fetch giải quyết N+1) ➔ Native query (chỉ dùng khi bất khả kháng, ví dụ full-text search phức tạp).
#### <a name="_yrn00nnrix9n"></a>**6. Bảo mật & Checklist trước khi tạo Pull Request**
- [ ] Các endpoint public/protected đã được config phân chia rõ ràng trong SecurityConfig.java.
- [ ] Toàn bộ password mới/cập nhật đều đi qua BCryptPasswordEncoder.
- [ ] Token JWT đã được verify thành công qua JwtFilter.
- [ ] Đã check kỹ luồng data: **Không có Entity nào lọt ra tới Controller/Client**.
- [ ] Không sử dụng throw new RuntimeException() – thay bằng ApiException kèm ErrorCode chuẩn.
- [ ] Controller đã implement ApiInterface và hoàn toàn sạch bóng các annotation của Swagger/OpenAPI.

<a name="_ut1htqngvjvo"></a>src examples

src: [here](https://claude.ai/share/c26b3b9f-b36a-4433-9674-9a9e7f9b403a)
