package com.fpt.sba301_su26_groupproject.service.impl;

import com.fpt.sba301_su26_groupproject.common.exception.ApiException;
import com.fpt.sba301_su26_groupproject.common.exception.CommonErrorCode;
import com.fpt.sba301_su26_groupproject.dto.order.OrderRequestDTO;
import com.fpt.sba301_su26_groupproject.dto.order.OrderResponseDTO;
import com.fpt.sba301_su26_groupproject.entity.CoinPackage;
import com.fpt.sba301_su26_groupproject.entity.Enumeration.OrderStatus;
import com.fpt.sba301_su26_groupproject.entity.Order;
import com.fpt.sba301_su26_groupproject.entity.User;
import com.fpt.sba301_su26_groupproject.repository.CoinPackageRepository;
import com.fpt.sba301_su26_groupproject.repository.OrderRepository;
import com.fpt.sba301_su26_groupproject.repository.UserRepository;
import com.fpt.sba301_su26_groupproject.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import java.time.ZoneOffset;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final CoinPackageRepository coinPackageRepository;

    @Override
    @Transactional
    public OrderResponseDTO createOrder(OrderRequestDTO request, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ApiException(CommonErrorCode.UNAUTHORIZED, "Người dùng không tồn tại"));

        CoinPackage coinPackage = coinPackageRepository.findById(request.coinPackageId())
                .orElseThrow(() -> new ApiException(CommonErrorCode.RESOURCE_NOT_FOUND, "Gói coin không tồn tại hoặc đã bị ẩn"));

        if (!coinPackage.getIsActive()) {
            throw new ApiException(CommonErrorCode.BAD_REQUEST, "Gói coin hiện không hoạt động");
        }

        // Kiểm tra nạp lần đầu để tính bonus
        boolean isFirstTime = !orderRepository.existsByUserIdAndStatus(user.getId(), OrderStatus.COMPLETED);
        Integer totalCoins = coinPackage.getTotalCoins(isFirstTime);

        Order order = Order.builder()
                .user(user)
                .coinPackage(coinPackage)
                .amountVnd(coinPackage.getPriceVnd())
                .coins(totalCoins)
                .status(OrderStatus.PENDING)
                .build();

        Order saved = orderRepository.save(order);
        return mapToResponse(saved);
    }

    @Override
    public OrderResponseDTO getOrderById(UUID id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ApiException(CommonErrorCode.RESOURCE_NOT_FOUND, "Không tìm thấy đơn hàng"));
        return mapToResponse(order);
    }

    @Override
    public List<OrderResponseDTO> getOrdersByUser(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ApiException(CommonErrorCode.UNAUTHORIZED, "Người dùng không tồn tại"));

        return orderRepository.findByUserId(user.getId()).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private OrderResponseDTO mapToResponse(Order order) {
        return OrderResponseDTO.builder()
                .id(order.getId())
                .userId(order.getUser().getId())
                .username(order.getUser().getUsername())
                .coinPackageId(order.getCoinPackage().getId())
                .coinPackageName(order.getCoinPackage().getName())
                .amountVnd(order.getAmountVnd())
                .coins(order.getCoins())
                .status(order.getStatus())
                .createdAt(order.getCreatedAt())
                .build();
    }
}
