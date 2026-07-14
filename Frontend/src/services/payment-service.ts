import { api } from '@/lib/api'
import type { OrderRequestDTO, OrderResponseDTO, PaymentMomoCreateRequestDTO, PaymentMomoCreateResponseDTO } from '@/types'

/**
 * Tạo một đơn hàng mua gói coin mới.
 */
export async function createOrder(request: OrderRequestDTO): Promise<OrderResponseDTO> {
  const response = await api.post('/orders', request)
  if (response.data && (response.data.code === 201 || response.data.code === 200)) {
    return response.data.result
  }
  throw new Error(response.data?.message || 'Tạo đơn hàng thất bại')
}

/**
 * Lấy danh sách các đơn hàng của người dùng đang đăng nhập.
 */
export async function getMyOrders(): Promise<OrderResponseDTO[]> {
  const response = await api.get('/orders')
  if (response.data && response.data.code === 200) {
    return response.data.result
  }
  throw new Error(response.data?.message || 'Lấy danh sách đơn hàng thất bại')
}

/**
 * Gửi yêu cầu lên MoMo qua Backend để tạo link thanh toán.
 */
export async function createMomoPayment(request: PaymentMomoCreateRequestDTO): Promise<PaymentMomoCreateResponseDTO> {
  const response = await api.post('/payments/momo/create', request)
  if (response.data && response.data.code === 200) {
    return response.data.result
  }
  throw new Error(response.data?.message || 'Tạo yêu cầu thanh toán MoMo thất bại')
}
