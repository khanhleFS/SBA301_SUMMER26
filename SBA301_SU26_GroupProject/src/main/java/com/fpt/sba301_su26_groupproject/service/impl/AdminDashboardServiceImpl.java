package com.fpt.sba301_su26_groupproject.service.impl;

import com.fpt.sba301_su26_groupproject.dto.admin.AdminDashboardResponseDTO;
import com.fpt.sba301_su26_groupproject.entity.Order;
import com.fpt.sba301_su26_groupproject.repository.NovelRepository;
import com.fpt.sba301_su26_groupproject.repository.OrderRepository;
import com.fpt.sba301_su26_groupproject.repository.UserRepository;
import com.fpt.sba301_su26_groupproject.service.AdminDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdminDashboardServiceImpl implements AdminDashboardService {

    private final UserRepository userRepository;
    private final NovelRepository novelRepository;
    private final OrderRepository orderRepository;

    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ISO_LOCAL_DATE_TIME;

    @Override
    public AdminDashboardResponseDTO getDashboardStats() {
        // === User / Author counts ===
        long totalUsers = userRepository.count();
        long totalAuthors = userRepository.countByIsAuthorTrue();

        // === Novel count ===
        long totalNovels = novelRepository.count();

        // === Revenue ===
        Long rawRevenue = orderRepository.sumCompletedRevenue();
        long totalRevenueVnd = rawRevenue != null ? rawRevenue : 0L;
        long platformRevenueVnd = Math.round(totalRevenueVnd * 0.25);

        // === Monthly revenue (current year) ===
        int currentYear = LocalDateTime.now().getYear();
        List<Object[]> monthlyRows = orderRepository.getMonthlyRevenue(currentYear);
        List<Long> monthlyRevenueVnd = new ArrayList<>();
        for (Object[] row : monthlyRows) {
            // row[0] = month_num (int), row[1] = sum (BigDecimal or Long)
            Number sum = (Number) row[1];
            monthlyRevenueVnd.add(sum != null ? sum.longValue() : 0L);
        }

        // === Recent 5 COMPLETED orders ===
        List<Order> recentOrders = orderRepository.findTop5CompletedOrders(PageRequest.of(0, 5));
        List<AdminDashboardResponseDTO.RecentOrderDTO> recentOrderDTOs = recentOrders.stream()
                .map(o -> AdminDashboardResponseDTO.RecentOrderDTO.builder()
                        .orderId(o.getId())
                        .userEmail(o.getUser().getEmail())
                        .username(o.getUser().getUsername())
                        .amountVnd(o.getAmountVnd())
                        .status(o.getStatus().name())
                        .createdAt(o.getCreatedAt() != null ? o.getCreatedAt().format(FORMATTER) : null)
                        .build())
                .toList();

        return AdminDashboardResponseDTO.builder()
                .totalUsers(totalUsers)
                .totalAuthors(totalAuthors)
                .totalNovels(totalNovels)
                .totalRevenueVnd(totalRevenueVnd)
                .platformRevenueVnd(platformRevenueVnd)
                .monthlyRevenueVnd(monthlyRevenueVnd)
                .recentOrders(recentOrderDTOs)
                .build();
    }
}
