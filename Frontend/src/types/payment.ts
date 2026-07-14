export interface PaymentMomoCreateRequestDTO {
  orderId: string
  amount: number
  orderInfo: string
  requestType?: MomoRequestType
}

export type MomoRequestType = 'captureWallet' | 'payWithATM' | 'payWithCC'

export interface PaymentMomoCreateResponseDTO {
  payUrl: string
  orderId: string
}

export interface OrderRequestDTO {
  coinPackageId: string
}

export interface OrderResponseDTO {
  id: string
  userId: string
  username: string
  coinPackageId: string
  coinPackageName: string
  amountVnd: number
  coins: number
  status: string
  createdAt: string
}

