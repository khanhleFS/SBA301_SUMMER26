package com.fpt.sba301_su26_groupproject.controller;

import com.fpt.sba301_su26_groupproject.common.response.ApiResponse;
import com.fpt.sba301_su26_groupproject.dto.order.OrderRequestDTO;
import com.fpt.sba301_su26_groupproject.dto.order.OrderResponseDTO;
import com.fpt.sba301_su26_groupproject.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/orders")
@Tag(name = "Order APIs", description = "User order management APIs")
@SecurityRequirement(name = "Bearer Authentication")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @Operation(summary = "Tạo đơn hàng mua gói coin")
    @PostMapping
    public ResponseEntity<ApiResponse<OrderResponseDTO>> createOrder(
            @Valid @RequestBody OrderRequestDTO request,
            Authentication authentication) {
        OrderResponseDTO result = orderService.createOrder(request, authentication.getName());

        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.<OrderResponseDTO>builder()
                .code(201)
                .message("Tạo đơn hàng mua gói coin thành công")
                .result(result)
                .build());
    }

    @Operation(summary = "Lấy chi tiết đơn hàng")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<OrderResponseDTO>> getOrderById(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.<OrderResponseDTO>builder()
                .code(200)
                .message("Lấy chi tiết đơn hàng thành công")
                .result(orderService.getOrderById(id))
                .build());
    }

    @Operation(summary = "Lấy danh sách đơn hàng của tôi")
    @GetMapping
    public ResponseEntity<ApiResponse<List<OrderResponseDTO>>> getMyOrders(Authentication authentication) {
        return ResponseEntity.ok(ApiResponse.<List<OrderResponseDTO>>builder()
                .code(200)
                .message("Lấy danh sách đơn hàng thành công")
                .result(orderService.getOrdersByUser(authentication.getName()))
                .build());
    }
}
