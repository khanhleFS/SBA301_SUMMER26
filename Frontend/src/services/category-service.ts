import { api } from '@/lib/api'
import type { CategoryResponseDTO } from '@/types'


/**
 * Fetches all categories from the public endpoint.
 */
export async function getAllCategories(): Promise<CategoryResponseDTO[]> {
  const response = await api.get('/categories')
  if (response.data && response.data.code === 200) {
    return response.data.result
  }
  throw new Error(response.data?.message || 'Không thể tải danh sách thể loại')
}

/**
 * Fetches detail of a single category by ID.
 */
export async function getCategoryById(id: string): Promise<CategoryResponseDTO> {
  const response = await api.get(`/categories/${id}`)
  if (response.data && response.data.code === 200) {
    return response.data.result
  }
  throw new Error(response.data?.message || 'Không thể tải thông tin thể loại')
}

/**
 * Creates a new category (Admin access required).
 */
export async function createCategory(name: string): Promise<CategoryResponseDTO> {
  const response = await api.post('/admin/categories', { name })
  if (response.data && response.data.code === 200) {
    return response.data.result
  }
  throw new Error(response.data?.message || 'Tạo thể loại thất bại')
}

/**
 * Updates an existing category (Admin access required).
 */
export async function updateCategory(id: string, name: string): Promise<CategoryResponseDTO> {
  const response = await api.put(`/admin/categories/${id}`, { name })
  if (response.data && response.data.code === 200) {
    return response.data.result
  }
  throw new Error(response.data?.message || 'Cập nhật thể loại thất bại')
}

/**
 * Deletes a category (Admin access required).
 */
export async function deleteCategory(id: string): Promise<void> {
  const response = await api.delete(`/admin/categories/${id}`)
  if (response.data && response.data.code === 200) {
    return
  }
  throw new Error(response.data?.message || 'Xóa thể loại thất bại')
}
