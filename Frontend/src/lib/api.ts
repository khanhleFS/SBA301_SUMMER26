import axios from 'axios'
import type { AxiosResponse, AxiosError } from 'axios'

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
  withCredentials: true, // Ensures session cookies are sent back and forth
})

// Request interceptor to attach the Authorization token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to format backend responses or extract error messages
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error: AxiosError<ApiResponse>) => {
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
