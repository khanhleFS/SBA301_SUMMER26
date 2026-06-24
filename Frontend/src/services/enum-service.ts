import { api } from '@/lib/api'
import type { EnumResponseDTO } from '@/types'


/**
 * Retrieves all available enums with their possible values from the backend.
 * @returns Promise resolving to a list of EnumResponseDTO objects.
 */
export async function getAllEnums(): Promise<EnumResponseDTO[]> {
  const response = await api.get('/enums')
  
  if (response.data && response.data.code === 200) {
    return response.data.result
  }
  
  throw new Error(response.data?.message || 'Không thể tải dữ liệu danh sách cố định (enums)')
}
