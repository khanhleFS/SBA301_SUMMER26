export type NovelStatus = 'ONGOING' | 'COMPLETED' | 'PAUSED' | 'DROPPED'

export interface NovelResponseDTO {
  id: string
  title: string
  slug: string
  description: string
  coverImageUrl: string | null
  status: NovelStatus
  viewCount: number
  createdAt: string
  updatedAt: string
  authorId: string
  authorName: string
  categories: string[]
}

export interface NovelRequestDTO {
  title: string
  description: string
  coverImageUrl: string
  status: NovelStatus
  categoryIds: string[]
}
