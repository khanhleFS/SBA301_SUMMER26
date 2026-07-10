package com.fpt.sba301_su26_groupproject.service;

import com.fpt.sba301_su26_groupproject.dto.order.OrderRequestDTO;
import com.fpt.sba301_su26_groupproject.dto.order.OrderResponseDTO;
import java.util.List;
import java.util.UUID;

public interface OrderService {
    OrderResponseDTO createOrder(OrderRequestDTO request, String userEmail);
    OrderResponseDTO getOrderById(UUID id);
    List<OrderResponseDTO> getOrdersByUser(String userEmail);
}
