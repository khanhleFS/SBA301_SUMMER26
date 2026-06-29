import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { storyDetailService, type StoryDetailInfo, type ChapterItem } from '../services/story-detail-service'

interface StoryDetailContextType {
  storyId: string
  storyInfo: StoryDetailInfo | null
  chapters: ChapterItem[]
  isLoading: boolean
  
  // Library states
  inLibrary: boolean
  toggleLibrary: () => void
  
  // Chapter list states
  isSortedAsc: boolean
  toggleSort: () => void
  currentPage: number
  setCurrentPage: (page: number | ((p: number) => number)) => void
  itemsPerPage: number
  totalPages: number
  paginatedChapters: ChapterItem[]
}

const StoryDetailContext = createContext<StoryDetailContextType | undefined>(undefined)

export function StoryDetailProvider({ children, storyId }: { children: ReactNode, storyId: string }) {
  const [storyInfo, setStoryInfo] = useState<StoryDetailInfo | null>(null)
  const [chapters, setChapters] = useState<ChapterItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  const [inLibrary, setInLibrary] = useState(false)
  const [isSortedAsc, setIsSortedAsc] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 15

  useEffect(() => {
    setIsLoading(true)
    Promise.all([
      storyDetailService.getStoryInfo(storyId),
      storyDetailService.getStoryChapters(storyId)
    ]).then(([info, chaps]) => {
      setStoryInfo(info)
      setChapters(chaps)
      setIsLoading(false)
    }).catch(error => {
      console.error("Failed to load story details", error)
      setIsLoading(false)
    })
  }, [storyId])

  const toggleLibrary = () => setInLibrary(prev => !prev)

  const toggleSort = () => {
    setChapters(prev => [...prev].reverse())
    setIsSortedAsc(prev => !prev)
    setCurrentPage(1)
  }

  const totalPages = Math.ceil(chapters.length / itemsPerPage)
  const paginatedChapters = chapters.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <StoryDetailContext.Provider value={{
      storyId,
      storyInfo,
      chapters,
      isLoading,
      inLibrary,
      toggleLibrary,
      isSortedAsc,
      toggleSort,
      currentPage,
      setCurrentPage,
      itemsPerPage,
      totalPages,
      paginatedChapters
    }}>
      {children}
    </StoryDetailContext.Provider>
  )
}

export function useStoryDetailContext() {
  const context = useContext(StoryDetailContext)
  if (!context) {
    throw new Error('useStoryDetailContext must be used within a StoryDetailProvider')
  }
  return context
}
