import { createContext, useContext, useState, useMemo, type ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import { storyService, type FilterGroup } from '../services/story-service'
import type { Story } from '../components/search-card'
import { MOCK_USER_READ_STATE, type UserReadState } from '@/services/mock-data'
import { useQuery } from '@tanstack/react-query'

export type { UserReadState } from '@/services/mock-data'

interface SearchContextType {
  searchQuery: string
  selectedCategory: string
  setSelectedCategory: (cat: string) => void
  selectedChapters: string
  setSelectedChapters: (chap: string) => void
  selectedStatus: string
  setSelectedStatus: (status: string) => void
  showUnlockedOnly: boolean
  setShowUnlockedOnly: (v: boolean) => void
  currentPage: number
  setCurrentPage: (page: number) => void
  filteredStories: Story[]
  isLoading: boolean
  categories: string[]
  filterGroups: FilterGroup[]
  isFiltersLoading: boolean
  clearFilters: () => void
  userReadState: UserReadState
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('q') || ''

  const [selectedCategory, setSelectedCategory] = useState('Tất cả thể loại')
  const [selectedChapters, setSelectedChapters] = useState('Any')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [showUnlockedOnly, setShowUnlockedOnly] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const userReadState = MOCK_USER_READ_STATE

  const clearFilters = () => {
    setSelectedCategory('Tất cả thể loại')
    setSelectedChapters('Any')
    setSelectedStatus('All')
    setShowUnlockedOnly(false)
  }

  // Load filter groups once on mount
  const { data: filterGroups = [], isLoading: isFiltersLoading } = useQuery<FilterGroup[]>({
    queryKey: ['searchFilters'],
    queryFn: storyService.getSearchFilters,
  })

  // Dynamically map categories from the loaded API filter groups (the category options)
  const categories = useMemo(() => {
    return filterGroups.find(g => g.id === 'category')?.options.map(opt => opt.value) || []
  }, [filterGroups])

  // Reload stories whenever the search keyword or filter choices update
  const { data: allStories = [], isLoading } = useQuery<Story[]>({
    queryKey: ['stories', searchQuery, selectedCategory, selectedChapters, selectedStatus],
    queryFn: () => storyService.getStories({
      searchQuery,
      category: selectedCategory,
      minChapters: selectedChapters,
      status: selectedStatus
    })
  })

  // Apply "show unlocked only" client-side filter on top of server results
  const filteredStories = useMemo(() => {
    if (showUnlockedOnly) {
      return allStories.filter(s => {
        const unlocked = userReadState.unlockedChapters[s.id]
        return unlocked && unlocked.length > 0
      })
    }
    return allStories
  }, [allStories, showUnlockedOnly, userReadState.unlockedChapters])

  return (
    <SearchContext.Provider value={{
      searchQuery,
      selectedCategory,
      setSelectedCategory,
      selectedChapters,
      setSelectedChapters,
      selectedStatus,
      setSelectedStatus,
      showUnlockedOnly,
      setShowUnlockedOnly,
      currentPage,
      setCurrentPage,
      filteredStories,
      isLoading,
      categories,
      filterGroups,
      isFiltersLoading,
      clearFilters,
      userReadState,
    }}>
      {children}
    </SearchContext.Provider>
  )
}

export function useSearchContext() {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearchContext must be used within a SearchProvider')
  }
  return context
}
