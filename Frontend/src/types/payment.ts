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
