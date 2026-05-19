import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import { storyService, type FilterGroup } from '../services/story-service'
import type { Story } from '../components/search-card'

interface SearchContextType {
  searchQuery: string
  selectedCategory: string
  setSelectedCategory: (cat: string) => void
  selectedChapters: string
  setSelectedChapters: (chap: string) => void
  selectedStatus: string
  setSelectedStatus: (status: string) => void
  currentPage: number
  setCurrentPage: (page: number) => void
  filteredStories: Story[]
  isLoading: boolean
  categories: string[]
  filterGroups: FilterGroup[]
  clearFilters: () => void
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('q') || ''

  const [selectedCategory, setSelectedCategory] = useState('Tất cả thể loại')
  const [selectedChapters, setSelectedChapters] = useState('Any')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const [filteredStories, setFilteredStories] = useState<Story[]>([])
  const [filterGroups, setFilterGroups] = useState<FilterGroup[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const categories = storyService.getCategories()

  const clearFilters = () => {
    setSelectedCategory('Tất cả thể loại')
    setSelectedChapters('Any')
    setSelectedStatus('All')
  }

  // Load filter groups once on mount
  useEffect(() => {
    storyService.getSearchFilters().then(groups => {
      setFilterGroups(groups)
    })
  }, [])

  // Reload stories whenever the search keyword or filter choices update
  useEffect(() => {
    setIsLoading(true)
    storyService.getStories({
      searchQuery,
      category: selectedCategory,
      minChapters: selectedChapters,
      status: selectedStatus
    }).then(stories => {
      setFilteredStories(stories)
      setIsLoading(false)
    })
  }, [searchQuery, selectedCategory, selectedChapters, selectedStatus])

  return (
    <SearchContext.Provider value={{
      searchQuery,
      selectedCategory,
      setSelectedCategory,
      selectedChapters,
      setSelectedChapters,
      selectedStatus,
      setSelectedStatus,
      currentPage,
      setCurrentPage,
      filteredStories,
      isLoading,
      categories,
      filterGroups,
      clearFilters
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
