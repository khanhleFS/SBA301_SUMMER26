package com.fpt.sba301_su26_groupproject.dto.category;

import lombok.Builder;
import java.util.UUID;

@Builder
public record CategoryResponseDTO(
        UUID id,
        String name,
        String slug //phiên bản rút gọn, không dấu và được chuẩn hóa của Tên thể loại để đưa lên thanh địa chỉ URL.
) {}
