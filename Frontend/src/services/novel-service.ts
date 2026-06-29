import { api } from '@/lib/api'
import type { NovelRequestDTO, NovelResponseDTO, NovelPageResponseDTO, EnumResponseDTO } from '@/types'


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

/**
 * Lấy danh sách enum của Novel (NovelStatus) từ backend.
 */
export async function getNovelEnums(): Promise<EnumResponseDTO[]> {
  const response = await api.get('/author/novels/enums')
  if (response.data && response.data.code === 200) {
    return response.data.result
  }
  throw new Error(response.data?.message || 'Không thể tải enums của truyện')
}

/**
 * Fetches public details of a single novel by ID for readers/guests.
 */
export async function getPublicNovelById(id: string): Promise<NovelResponseDTO> {
  const response = await api.get(`/novels/${id}`)
  if (response.data && (response.data.code === 200 || response.status === 200)) {
    return response.data.result
  }
  throw new Error(response.data?.message || 'Không thể tải chi tiết truyện')
}

/**
 * Searches/lists public novels with optional filters and pagination.
 */
export async function searchNovels(params: {
  q?: string
  category?: string
  status?: string
  minChapters?: number
  page?: number
  size?: number
}): Promise<NovelPageResponseDTO> {
  const response = await api.get('/novels', { params: {
    q: params.q || undefined,
    category: params.category || undefined,
    status: params.status || undefined,
    minChapters: params.minChapters || undefined,
    page: params.page ?? 0,
    size: params.size ?? 20,
  }})
  if (response.data && response.data.code === 200) {
    return response.data.result
  }
  throw new Error(response.data?.message || 'Không thể tải danh sách truyện')
}




