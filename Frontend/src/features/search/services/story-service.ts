import type { Story } from '../components/search-card'
import { searchNovels } from '@/services/novel-service'
import { filterService, type FilterGroup, type FilterOption } from '@/services/filter-service'
import { getAllCategories } from '@/services/category-service'

export type { FilterGroup, FilterOption }

export const storyService = {
  getStories: async (params: {
    searchQuery?: string
    category?: string
    minChapters?: string
    status?: string
    page?: number
    size?: number
  }): Promise<{ stories: Story[]; totalPages: number; totalElements: number }> => {
    // Map frontend status labels → backend enum values
    const statusMap: Record<string, string> = {
      'Ongoing': 'ONGOING',
      'Completed': 'COMPLETED',
      'Paused': 'PAUSED',
      'Dropped': 'DROPPED',
    }
    const backendStatus = params.status && params.status !== 'All'
      ? (statusMap[params.status] ?? params.status)
      : undefined

    const minChaptersNum = params.minChapters && params.minChapters !== 'Any'
      ? parseInt(params.minChapters, 10)
      : undefined

    const result = await searchNovels({
      q: params.searchQuery,
      category: params.category && params.category !== 'Tất cả thể loại' ? params.category : undefined,
      status: backendStatus,
      minChapters: minChaptersNum,
      page: params.page ?? 0,
      size: params.size ?? 20,
    })

    // Map backend status enum → frontend display label
    const statusDisplayMap: Record<string, string> = {
      ONGOING: 'Ongoing',
      COMPLETED: 'Completed',
      PAUSED: 'Paused',
      DROPPED: 'Dropped',
    }

    const stories: Story[] = result.content.map((novel) => ({
      id: novel.id,
      // slug-id pattern: slug + UUID for the URL
      slug: `${novel.slug}-${novel.id}`,
      title: novel.title,
      reads: (novel.viewCount || 0).toString(),
      publishTime: novel.createdAt
        ? new Date(novel.createdAt).toLocaleDateString('vi-VN')
        : 'Vừa xong',
      author: novel.authorName || 'Tác giả',
      genres: novel.categories || [],
      currentChapter: novel.chapterCount ?? 0,
      status: statusDisplayMap[novel.status] ?? novel.status,
      imgUrl: novel.coverImageUrl || undefined,
    }))

    return {
      stories,
      totalPages: result.totalPages,
      totalElements: result.totalElements,
    }
  },

  getCategories: async (): Promise<string[]> => {
    try {
      const cats = await getAllCategories()
      return ['Tất cả thể loại', ...cats.map(c => c.name)]
    } catch {
      return ['Tất cả thể loại']
    }
  },

  getSearchFilters: (): Promise<FilterGroup[]> => {
    return filterService.getFiltersByScope('search')
  }
}
