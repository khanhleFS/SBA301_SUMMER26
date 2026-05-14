package com.fpt.sba301_su26_groupproject.dto.authen;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record ResgisterRequestDTO (
        @NotBlank(message = "Họ tên không được để trống.")
        @Size(min = 2, max = 50, message = "Họ tên phải từ 2 đến 50 ký tự.")
        @Pattern(regexp = "^\\S.*\\S$|^\\S$", message = "Họ tên không được có khoảng trắng ở đầu hoặc cuối.")
        @Pattern(regexp = "^[\\p{L} ]+$", message = "Họ tên chỉ được chứa chữ cái và khoảng trắng.")
        @Pattern(regexp = "^(?!.*\\s{2,}).*$", message = "Họ tên không được có 2 khoảng trắng liên tiếp.")
        String fullName,

        @NotBlank(message = "Email không được để trống.")
        @Email(message = "Email không đúng định dạng.")
        @Size(max = 100, message = "Email không được vượt quá 100 ký tự.")
        String email,

        @NotBlank(message = "Số điện thoại không được để trống.")
        @Pattern(regexp = "^0[3|5|7|8|9][0-9]{8}$",
                message = "Số điện thoại không đúng định dạng (VD: 0912345678).")
        String phone,

        @NotBlank(message = "Mật khẩu không được để trống.")
        @Size(min = 8, max = 50, message = "Mật khẩu phải từ 8 đến 50 ký tự.")
        @Pattern(regexp = ".*[A-Z].*", message = "Mật khẩu phải có ít nhất 1 chữ hoa.")
        @Pattern(regexp = ".*[a-z].*", message = "Mật khẩu phải có ít nhất 1 chữ thường.")
        @Pattern(regexp = ".*[0-9].*", message = "Mật khẩu phải có ít nhất 1 chữ số.")
        @Pattern(regexp = ".*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?].*", message = "Mật khẩu phải có ít nhất 1 ký tự đặc biệt.")
        @Pattern(regexp = "^\\S+$", message = "Mật khẩu không được chứa khoảng trắng.")
        String password,

        @NotBlank(message = "Xác nhận mật khẩu không được để trống.")
        String confirmPassword,

        @NotBlank(message = "Địa chỉ không được để trống.")
        @Size(max = 200, message = "Địa chỉ không được vượt quá 200 ký tự.")
        @Pattern(regexp = "^\\S.*\\S$|^\\S$", message = "Địa chỉ không được có khoảng trắng ở đầu hoặc cuối.")
        @Pattern(regexp = "^(?!.*\\s{2,}).*$", message = "Địa chỉ không được có 2 khoảng trắng liên tiếp.")
        String address,

        Boolean isActive
        ){
}
