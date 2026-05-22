export interface UserProfile {
  id: string
  displayName: string
  username: string
  email: string
  avatarUrl?: string
  memberSince: string
  isVerified: boolean
}

export interface WalletInfo {
  balance: number
  currency: string
}

export type TransactionType = 'topup' | 'spend'

export interface Transaction {
  id: string
  type: TransactionType
  title: string
  description: string
  amount: string
  status: string
  date: string
  method: string
  reference: string
}

export interface CollectionStory {
  id: string
  title: string
  meta: string
  progress: number
  path: string
  coverUrl: string
}

export interface CollectionItem {
  key: string
  label: string
  stories: CollectionStory[]
}

export interface ProfileData {
  user: UserProfile
  wallet: WalletInfo
  transactions: Transaction[]
  collections: CollectionItem[]
}
