export interface CoinCreateResponseDTO {
  id: string
  name: string
  priceVnd: number
  baseCoins: number
  firstTimeBonus: number
  totalCoinsIfFirst: number
  totalCoinsNormal: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface CoinCreateRequestDTO {
  name: string
  priceVnd: number
  baseCoins: number
  firstTimeBonus: number
  isActive: boolean
}
