import axios from 'axios'
import type { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios'
import { useAuthStore } from '@/store/auth.store'

export interface ApiResponse<T = any> {
  code: number
  message: string
  result: T
}

export const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Đính kèm Cookie (refresh token) vào mọi request
})

// ─── Request Interceptor ──────────────────────────────────────────────────────
// Gắn Access Token (từ RAM) vào header Authorization
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ─── Response Interceptor + 401 Auto-refresh ─────────────────────────────────
// Khi nhận lỗi 401, tự động gọi /auth/refresh (Browser mang Cookie tự động),
// cập nhật Access Token mới vào RAM, và retry lại request gốc.
let isRefreshing = false
let failedQueue: Array<{ resolve: (token: string) => void; reject: (err: any) => void }> = []

function processQueue(error: any, token: string | null = null) {
  failedQueue.forEach((p) => {
    if (error) {
      p.reject(error)
    } else {
      p.resolve(token!)
    }
  })
  failedQueue = []
}

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError<ApiResponse>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    // Chỉ xử lý 401 và không retry request refresh chính nó (tránh vòng lặp vô tận)
    const isUnauthorized = error.response?.status === 401
    const isRefreshEndpoint = originalRequest?.url?.includes('/auth/refresh')

    if (isUnauthorized && !originalRequest?._retry && !isRefreshEndpoint) {
      if (isRefreshing) {
        // Nếu đang trong quá trình refresh, xếp request vào hàng đợi
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`
          return api(originalRequest)
        }).catch((err) => Promise.reject(err))
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const consent = typeof window !== 'undefined' ? localStorage.getItem('cookieConsent') : null
        const stateRefreshToken = useAuthStore.getState().refreshToken

        // Gọi refresh — nếu denied thì truyền refreshToken từ RAM, ngược lại rỗng (Cookie)
        const { refreshToken } = await import('@/services/auth-service')
        const refreshRes = await refreshToken({ 
          refreshToken: consent === 'denied' ? (stateRefreshToken || '') : '' 
        })
        const newToken = refreshRes.accessToken

        // Cập nhật Access Token và Refresh Token mới vào RAM
        useAuthStore.setState({ 
          token: newToken, 
          refreshToken: consent === 'denied' ? refreshRes.refreshToken : null,
          isAuthenticated: true 
        })

        // Giải phóng hàng đợi với token mới
        processQueue(null, newToken)

        // Retry request gốc với token mới
        originalRequest.headers.Authorization = `Bearer ${newToken}`
        return api(originalRequest)
      } catch (refreshError) {
        // Refresh token cũng hết hạn → logout
        processQueue(refreshError, null)
        useAuthStore.getState().logout()
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    // Các lỗi khác, format và reject
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data)
    }
    return Promise.reject({
      code: error.response?.status || 500,
      message: error.message || 'Một lỗi không xác định đã xảy ra.',
      result: null,
    })
  }
)

