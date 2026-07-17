package com.fpt.sba301_su26_groupproject.controller;

import com.fpt.sba301_su26_groupproject.common.response.ApiResponse;
import com.fpt.sba301_su26_groupproject.dto.admin.AdminDashboardResponseDTO;
import com.fpt.sba301_su26_groupproject.service.AdminDashboardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import com.fpt.sba301_su26_groupproject.service.AdminManagementService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
@Tag(name = "Admin APIs", description = "Admin management APIs")
@RequiredArgsConstructor
public class AdminController {

    private final AdminDashboardService adminDashboardService;
    private final AdminManagementService adminManagementService;

    @Operation(
            summary = "Get admin dashboard statistics",
            description = "Trả về tổng số user, tác giả, truyện, doanh thu, biểu đồ theo tháng và giao dịch gần đây.",
            security = @SecurityRequirement(name = "Bearer Authentication")
    )
    @GetMapping("/dashboard")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<AdminDashboardResponseDTO>> getDashboard() {
        AdminDashboardResponseDTO result = adminDashboardService.getDashboardStats();
        return ResponseEntity.ok(ApiResponse.<AdminDashboardResponseDTO>builder()
                .code(200)
                .message("Lấy thống kê dashboard thành công")
                .result(result)
                .build());
    }

    @Operation(
            summary = "Get all users",
            description = "Trả về toàn bộ danh sách người dùng cho Admin.",
            security = @SecurityRequirement(name = "Bearer Authentication")
    )
    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<java.util.List<com.fpt.sba301_su26_groupproject.dto.admin.AdminUserResponseDTO>>> getAllUsers() {
        return ResponseEntity.ok(ApiResponse.<java.util.List<com.fpt.sba301_su26_groupproject.dto.admin.AdminUserResponseDTO>>builder()
                .code(200)
                .message("Lấy danh sách người dùng thành công")
                .result(adminManagementService.getAllUsers())
                .build());
    }

    @Operation(
            summary = "Get all orders",
            description = "Trả về toàn bộ danh sách đơn hàng cho Admin.",
            security = @SecurityRequirement(name = "Bearer Authentication")
    )
    @GetMapping("/orders")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<java.util.List<com.fpt.sba301_su26_groupproject.dto.order.OrderResponseDTO>>> getAllOrders() {
        return ResponseEntity.ok(ApiResponse.<java.util.List<com.fpt.sba301_su26_groupproject.dto.order.OrderResponseDTO>>builder()
                .code(200)
                .message("Lấy danh sách đơn hàng thành công")
                .result(adminManagementService.getAllOrders())
                .build());
    }

    @Operation(
            summary = "Toggle user ban status",
            description = "Banned/unbanned user bằng cách đảo trạng thái isActive.",
            security = @SecurityRequirement(name = "Bearer Authentication")
    )
    @PutMapping("/users/{userId}/toggle-ban")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> toggleBanUser(@org.springframework.web.bind.annotation.PathVariable java.util.UUID userId) {
        adminManagementService.toggleBanUser(userId);
        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .code(200)
                .message("Thay đổi trạng thái tài khoản thành công")
                .build());
    }
}
