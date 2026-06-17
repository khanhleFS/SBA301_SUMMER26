import { api } from '@/lib/api'

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

/**
 * Creates a new novel (Author access required).
 */
export async function createNovel(request: NovelRequestDTO): Promise<NovelResponseDTO> {
  const response = await api.post('/author/novels', request)
  if (response.data && response.data.code === 200) {
    return response.data.result
  }
  throw new Error(response.data?.message || 'Tạo truyện mới thất bại')
}

/**
 * Fetches all novels created by the currently authenticated author.
 */
export async function getMyNovels(): Promise<NovelResponseDTO[]> {
  const response = await api.get('/author/novels')
  if (response.data && response.data.code === 200) {
    return response.data.result
  }
  throw new Error(response.data?.message || 'Không thể tải danh sách truyện của tôi')
}

/**
 * Fetches detail of a single novel by ID.
 */
export async function getNovelById(id: string): Promise<NovelResponseDTO> {
  const response = await api.get(`/author/novels/${id}`)
  if (response.data && response.data.code === 200) {
    return response.data.result
  }
  throw new Error(response.data?.message || 'Không thể tải chi tiết truyện')
}

/**
 * Updates an existing novel (Author access required).
 */
export async function updateNovel(id: string, request: NovelRequestDTO): Promise<NovelResponseDTO> {
  const response = await api.put(`/author/novels/${id}`, request)
  if (response.data && response.data.code === 200) {
    return response.data.result
  }
  throw new Error(response.data?.message || 'Cập nhật thông tin truyện thất bại')
}

/**
 * Deletes a novel (Author access required).
 */
export async function deleteNovel(id: string): Promise<void> {
  const response = await api.delete(`/author/novels/${id}`)
  if (response.data && response.data.code === 200) {
    return
  }
  throw new Error(response.data?.message || 'Xóa truyện thất bại')
}
