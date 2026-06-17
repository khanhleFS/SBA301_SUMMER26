import { api } from '@/lib/api'

export interface PaymentMomoCreateRequestDTO {
  orderId: string
  amount: number
  orderInfo: string
  requestType?: string
}

export interface PaymentMomoCreateResponseDTO {
  payUrl: string
  orderId: string
}

/**
 * Initiates a MoMo Sandbox transaction.
 * @param request Payload containing order information and amount.
 * @returns Promise resolving to the MoMo payUrl and orderId.
 */
export async function createMomoPayment(request: PaymentMomoCreateRequestDTO): Promise<PaymentMomoCreateResponseDTO> {
  const response = await api.post('/payments/momo/create', {
    ...request,
    requestType: request.requestType || 'captureWallet',
  })

  if (response.data && response.data.code === 200) {
    return response.data.result
  }

  throw new Error(response.data?.message || 'Khởi tạo thanh toán MoMo thất bại')
}
