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
  pagedStories: Story[]
  isLoading: boolean
  categories: string[]
  filterGroups: FilterGroup[]
  isFiltersLoading: boolean
  clearFilters: () => void
  userReadState: UserReadState
  totalPages: number
  totalElements: number
}

const ITEMS_PER_PAGE = 12

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('q') || ''

  const [selectedCategory, setSelectedCategoryRaw] = useState('Tất cả thể loại')
  const [selectedChapters, setSelectedChaptersRaw] = useState('Any')
  const [selectedStatus, setSelectedStatusRaw] = useState('All')
  const [showUnlockedOnly, setShowUnlockedOnly] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const userReadState = MOCK_USER_READ_STATE

  // Reset page to 1 whenever filter changes
  const setSelectedCategory = (cat: string) => { setSelectedCategoryRaw(cat); setCurrentPage(1) }
  const setSelectedChapters = (chap: string) => { setSelectedChaptersRaw(chap); setCurrentPage(1) }
  const setSelectedStatus = (status: string) => { setSelectedStatusRaw(status); setCurrentPage(1) }

  const clearFilters = () => {
    setSelectedCategoryRaw('Tất cả thể loại')
    setSelectedChaptersRaw('Any')
    setSelectedStatusRaw('All')
    setShowUnlockedOnly(false)
    setCurrentPage(1)
  }

  // Load filter groups once on mount
  const { data: filterGroups = [], isLoading: isFiltersLoading } = useQuery<FilterGroup[]>({
    queryKey: ['searchFilters'],
    queryFn: storyService.getSearchFilters,
  })

  // Load categories from backend (real API)
  const { data: categories = [] } = useQuery<string[]>({
    queryKey: ['searchCategories'],
    queryFn: storyService.getCategories,
    staleTime: 5 * 60 * 1000, // cache 5 min
  })

  // Fetch all matching stories once per filter combo (no page param — client handles paging)
  const { data: storyResult, isLoading } = useQuery({
    queryKey: ['stories', searchQuery, selectedCategory, selectedChapters, selectedStatus],
    queryFn: () => storyService.getStories({
      searchQuery,
      category: selectedCategory,
      minChapters: selectedChapters,
      status: selectedStatus,
      page: 0,
      size: 100, // fetch up to 100 at once, client paginates
    })
  })

  const allStories = storyResult?.stories ?? []
  const totalElements = storyResult?.totalElements ?? 0

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

  // Client-side pagination slice
  const totalPages = Math.max(1, Math.ceil(filteredStories.length / ITEMS_PER_PAGE))
  const safePage = Math.min(currentPage, totalPages)
  const pagedStories = useMemo(() => {
    const start = (safePage - 1) * ITEMS_PER_PAGE
    return filteredStories.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredStories, safePage])

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
      currentPage: safePage,
      setCurrentPage,
      filteredStories,
      pagedStories,
      isLoading,
      categories,
      filterGroups,
      isFiltersLoading,
      clearFilters,
      userReadState,
      totalPages,
      totalElements,
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

