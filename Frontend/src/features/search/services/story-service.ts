import type { Story } from '../components/search-card'
import { MOCK_STORIES } from '@/services/mock-db'
import { filterService, type FilterGroup, type FilterOption } from '@/services/filter-service'

export type { FilterGroup, FilterOption }

export const storyService = {
  getStories: (params: { 
    searchQuery?: string
    category?: string
    minChapters?: string
    status?: string 
  }): Promise<Story[]> => {
    // Deliberate mock delay of 600ms to allow skeletons to transition gracefully
    return new Promise((resolve) => {
      setTimeout(() => {
        // Map MockStory to Story structure expected by the search page
        const searchStories: Story[] = MOCK_STORIES.map((s) => ({
          id: s.id,
          slug: s.slug,
          title: s.title,
          reads: s.reads,
          publishTime: s.publishTime,
          author: s.author,
          genres: s.genres,
          currentChapter: s.chapters.length, // Dynamic length matching
          status: s.status,
          imgUrl: s.imgUrl
        }))

        const filtered = searchStories.filter(story => {
          // 1. Text Search matching (checks title, author, genres)
          let matchesQuery = true
          if (params.searchQuery) {
            const q = params.searchQuery.toLowerCase().trim()
            matchesQuery = 
              story.title.toLowerCase().includes(q) || 
              story.author.toLowerCase().includes(q) ||
              story.genres.some(g => g.toLowerCase().includes(q))
          }

          // 2. Category filter
          let matchesCategory = true
          if (params.category && params.category !== 'Tất cả thể loại') {
            matchesCategory = story.genres.includes(params.category)
          }

          // 3. Chapters filter
          let matchesChapters = true
          if (params.minChapters) {
            if (params.minChapters === '5') {
              matchesChapters = story.currentChapter >= 5
            } else if (params.minChapters === '10') {
              matchesChapters = story.currentChapter >= 10
            } else if (params.minChapters === '20') {
              matchesChapters = story.currentChapter >= 20
            }
          }

          // 4. Status filter
          let matchesStatus = true
          if (params.status && params.status !== 'All') {
            matchesStatus = story.status === params.status
          }

          return matchesQuery && matchesCategory && matchesChapters && matchesStatus
        })
        resolve(filtered)
      }, 600)
    })
  },

  getCategories: (): string[] => {
    // Synchronous helper falls back or delegates to mock values for legacy code
    return [
      'Tất cả thể loại',
      'Hành động',
      'Hài hước',
      'Drama',
      'Kỳ ảo',
      'Khoa học viễn tưởng',
      'Lãng mạn'
    ]
  },

  getSearchFilters: (): Promise<FilterGroup[]> => {
    return filterService.getFiltersByScope('search')
  }
}

