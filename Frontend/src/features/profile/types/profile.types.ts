// Re-export everything from the central types directory.
// This shim keeps feature-internal imports working without change.
export type {
  UserProfile,
  WalletInfo,
  TransactionType,
  Transaction,
  CollectionStory,
  CollectionItem,
  ProfileData,
  ProfileDTO,
  ResetPasswordRequestDTO,
} from '@/types'
