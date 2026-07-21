import { api } from '@/lib/api'
import type { ChapterRequestDTO, ChapterResponseDTO, EnumResponseDTO } from '@/types'


/**
 * Fetches all chapters for a given novel ID (Public).
 */
export async function getChaptersByNovel(novelId: string | number): Promise<ChapterResponseDTO[]> {
  const response = await api.get(`/novels/${novelId}/chapters`)
  if (response.data && response.data.code === 200) {
    return response.data.result
  }
  throw new Error(response.data?.message || 'Không thể tải danh sách chương')
}

/**
 * Fetches detail for a specific chapter by novel ID and chapter number (Public/Reader).
 * This endpoint automatically verifies purchase/coins status on backend.
 */
export async function getChapterDetails(novelId: string | number, chapterNumber: number): Promise<ChapterResponseDTO> {
  const response = await api.get(`/novels/${novelId}/chapters/${chapterNumber}`)
  if (response.data && response.data.code === 200) {
    return response.data.result
  }
  throw new Error(response.data?.message || `Không thể tải nội dung chương ${chapterNumber}`)
}

/**
 * Initiates TTS audio generation for a chapter and returns the updated chapter details including audio URL.
 */
export async function generateChapterAudio(novelId: string | number, chapterNumber: number): Promise<ChapterResponseDTO> {
  const response = await api.post(`/novels/${novelId}/chapters/${chapterNumber}/audio`)
  if (response.data && response.data.code === 200) {
    return response.data.result
  }
  throw new Error(response.data?.message || 'Sinh giọng đọc âm thanh thất bại')
}

/**
 * Creates a new chapter for a novel (Author access required).
 */
export async function createChapter(novelId: string | number, request: ChapterRequestDTO): Promise<ChapterResponseDTO> {
  const response = await api.post(`/author/novels/${novelId}/chapters`, request)
  if (response.data && (response.data.code === 201 || response.data.code === 200)) {
    return response.data.result
  }
  throw new Error(response.data?.message || 'Tạo chương mới thất bại')
}

/**
 * Updates an existing chapter by ID (Author access required).
 */
export async function updateChapter(novelId: string | number, chapterId: string | number, request: ChapterRequestDTO): Promise<ChapterResponseDTO> {
  const response = await api.put(`/author/novels/${novelId}/chapters/${chapterId}`, request)
  if (response.data && response.data.code === 200) {
    return response.data.result
  }
  throw new Error(response.data?.message || 'Cập nhật chương thất bại')
}

/**
 * Deletes a chapter by ID (Author access required).
 */
export async function deleteChapter(novelId: string | number, chapterId: string | number): Promise<void> {
  const response = await api.delete(`/author/novels/${novelId}/chapters/${chapterId}`)
  if (response.data && response.data.code === 200) {
    return
  }
  throw new Error(response.data?.message || 'Xóa chương thất bại')
}

/**
 * Lấy danh sách enum của Chapter (ChapterStatus) từ backend.
 */
export async function getChapterEnums(): Promise<EnumResponseDTO[]> {
  const response = await api.get('/novels/chapters/enums')
  if (response.data && response.data.code === 200) {
    return response.data.result
  }
  throw new Error(response.data?.message || 'Không thể tải enums của chương')
}

