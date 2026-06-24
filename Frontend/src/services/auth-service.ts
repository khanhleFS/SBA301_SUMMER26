import { api } from '@/lib/api'
import type { LoginRequestDTO, LoginResponseDTO, RegisterRequestDTO, VerifyOtpRequestDTO } from '@/types'

/**
 * Authenticates a user with email and password.
 * @returns LoginResponseDTO containing the accessToken and user info.
 * @throws Error with backend message on failure.
 */
export async function loginUser(request: LoginRequestDTO): Promise<LoginResponseDTO> {
  const response = await api.post('/auth/login', request)
  if (response.data && response.data.code === 200) {
    return response.data.result as LoginResponseDTO
  }
  throw new Error(response.data?.message || 'Đăng nhập thất bại')
}

/**
 * Registers a new user account.
 * On success, the user should be directed to OTP verification.
 * @throws Error with backend message on failure.
 */
export async function registerUser(request: RegisterRequestDTO): Promise<void> {
  const response = await api.post('/auth/register', request)
  if (response.data && response.data.code === 200) {
    return
  }
  throw new Error(response.data?.message || 'Đăng ký thất bại')
}

/**
 * Verifies the OTP code sent to the user's email after registration.
 * @throws Error with backend message on failure.
 */
export async function verifyRegisterOtp(request: VerifyOtpRequestDTO): Promise<void> {
  const response = await api.post('/auth/verify-register-otp', request)
  if (response.data && response.data.code === 200) {
    return
  }
  throw new Error(response.data?.message || 'Xác thực OTP thất bại')
}

/**
 * Resends a new OTP code to the given email address.
 * @throws Error with backend message on failure.
 */
export async function resendOtp(email: string): Promise<void> {
  const response = await api.post('/auth/forgot-password', { email })
  if (response.data && response.data.code === 200) {
    return
  }
  throw new Error(response.data?.message || 'Gửi lại OTP thất bại')
}
