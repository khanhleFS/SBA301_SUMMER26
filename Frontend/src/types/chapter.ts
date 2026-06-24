export type ChapterStatus = 'UNLOCKED' | 'LOCKED' | 'DRAFT' | 'PUBLISHED'

export interface ChapterResponseDTO {
  id: string
  novelId: string
  chapterNumber: number
  title: string
  slug: string
  content: string
  audioUrl: string | null
  status: ChapterStatus
  coinPrice: number
  viewCount: number
  createdAt: string
  updateAt: string
}

export interface ChapterRequestDTO {
  title: string
  content: string
  status: ChapterStatus
  chapterNumber: number
  coinPrice: number
}
