import { useQuery } from '@tanstack/react-query'
import { searchNovels } from '@/services/novel-service'
import type { NovelResponseDTO } from '@/types'

/**
 * Fetches the top N novels (sorted by viewCount desc) for use in home page sections.
 */
export function useTopNovels(count = 8) {
  return useQuery<NovelResponseDTO[]>({
    queryKey: ['topNovels', count],
    queryFn: async () => {
      const result = await searchNovels({ page: 0, size: count })
      return result.content
    },
    staleTime: 5 * 60 * 1000, // cache 5 min
  })
}
