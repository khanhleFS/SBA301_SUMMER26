export interface User {
  id: string | number
  username: string
  email: string
  role: string
  avatarUrl?: string
  fullName?: string
}

// ─── Auth Request / Response DTOs ───────────────────────────────────────────

export interface LoginRequestDTO {
  email: string
  password: string
}

export interface LoginResponseDTO {
  accessToken: string
  userId: string
  username: string
  email: string
  role: string
}

export interface RegisterRequestDTO {
  fullName: string
  phone: string
  email: string
  password: string
  confirmPassword: string
  isActive: boolean
}

export interface VerifyOtpRequestDTO {
  email: string
  otpCode: string
}

