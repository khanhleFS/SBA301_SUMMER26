import { createContext, useContext, useState, useEffect, useRef, useCallback, type ReactNode } from 'react'
import { useParams } from 'react-router-dom'
import { readerService, type ChapterDetails } from '../services/reader-service'
import { upsertBookmark, getBookmark, type BookmarkResponse } from '@/services/bookmark-service'
import { useAuthStore } from '@/store/auth.store'
import { extractUuid } from '../services/reader-service'

export type ThemeType = 'nocturne' | 'charcoal' | 'sepia' | 'ivory' | 'day'
export type FontType = 'serif' | 'sans' | 'mono'
export type LineHeightType = 'tight' | 'normal' | 'loose'

interface ReaderContextType {
  currentChapterId: string
  setCurrentChapterId: (id: string) => void
  activeChapter: ChapterDetails | null
  isLoading: boolean
  scrollProgress: number  // Scroll % hiện tại trong chapter (0-100)
  
  // Reader settings
  theme: ThemeType
  setTheme: (theme: ThemeType) => void
  fontFamily: FontType
  setFontFamily: (font: FontType) => void
  fontSize: number
  setFontSize: (size: number) => void
  lineHeight: LineHeightType
  setLineHeight: (lineHeight: LineHeightType) => void
  fullFrame: boolean
  setFullFrame: (full: boolean) => void
  brightness: number
  setBrightness: (brightness: number) => void
}

const ReaderContext = createContext<ReaderContextType | undefined>(undefined)

export function ReaderProvider({ children, initialChapterId = 'chuong-1-tia-lua-dau-tien-1' }: { children: ReactNode, initialChapterId?: string }) {
  const { novelSlugWithId } = useParams<{ novelSlugWithId: string }>()
  const [currentChapterId, setCurrentChapterId] = useState<string>(initialChapterId)
  const [activeChapter, setActiveChapter] = useState<ChapterDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Bookmark state để lưu scroll position
  const bookmarkRef = useRef<BookmarkResponse | null>(null)
  const saveScrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Sync state when URL params change
  useEffect(() => {
    if (initialChapterId) {
      setCurrentChapterId(initialChapterId)
    }
  }, [initialChapterId])

  // Settings state
  const [theme, setTheme] = useState<ThemeType>(() => {
    if (typeof window !== 'undefined') {
      const savedChoice = localStorage.getItem('reader-theme') as ThemeType | null
      if (savedChoice && ['nocturne', 'charcoal', 'sepia', 'ivory', 'day'].includes(savedChoice)) {
        return savedChoice
      }
      return document.documentElement.classList.contains('dark') ? 'nocturne' : 'day'
    }
    return 'nocturne'
  })
  const [fontFamily, setFontFamily] = useState<FontType>('serif')
  const [fontSize, setFontSize] = useState(18)
  const [lineHeight, setLineHeight] = useState<LineHeightType>('normal')
  const [fullFrame, setFullFrame] = useState(false)
  const [brightness, setBrightness] = useState(100)

  const isAuthenticated = useAuthStore(s => s.isAuthenticated)

  // Fetch chapter + restore scroll position từ bookmark
  useEffect(() => {
    setIsLoading(true)
    setScrollProgress(0)

    readerService.getChapter(currentChapterId, novelSlugWithId).then(async chapter => {
      setActiveChapter(chapter)
      setIsLoading(false)

      if (!isAuthenticated || !novelSlugWithId) return

      try {
        const novelId = extractUuid(novelSlugWithId)
        const chapterId = extractUuid(currentChapterId)
        const existing = await getBookmark(novelId)
        bookmarkRef.current = existing

        if (existing) {
          // Cập nhật lastChapterId khi đổi chapter (reset lastPage = 0)
          if (existing.lastChapterId !== chapterId) {
            await upsertBookmark({ novelId, lastChapterId: chapterId || null, lastPage: 0 })
          } else {
            // Restore scroll position nếu quay lại chapter đã đọc dở
            const savedPercent = existing.lastPage ?? 0
            if (savedPercent > 0) {
              setTimeout(() => {
                const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
                window.scrollTo({ top: (savedPercent / 100) * height, behavior: 'smooth' })
                setScrollProgress(savedPercent)
              }, 400) // delay để DOM render xong
            }
          }
        }
      } catch (err) {
        console.warn('Could not sync reading progress:', err)
      }
    }).catch(error => {
      console.error('Failed to load chapter', error)
      setIsLoading(false)
    })
  }, [currentChapterId, novelSlugWithId, isAuthenticated])

  // Debounced scroll listener — lưu vị trí scroll vào bookmark mỗi 1.5 giây
  const handleScrollSave = useCallback(() => {
    if (!isAuthenticated || !novelSlugWithId || !bookmarkRef.current) return

    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
    const scrollPercent = height > 0
      ? Math.round((document.documentElement.scrollTop / height) * 100)
      : 0

    setScrollProgress(scrollPercent)

    // Debounce: chỉ gọi API sau 1.5s dừng scroll
    if (saveScrollTimerRef.current) clearTimeout(saveScrollTimerRef.current)
    saveScrollTimerRef.current = setTimeout(async () => {
      try {
        const novelId = extractUuid(novelSlugWithId)
        const chapterId = extractUuid(currentChapterId)
        await upsertBookmark({ novelId, lastChapterId: chapterId || null, lastPage: scrollPercent })
      } catch (err) {
        console.warn('Could not save scroll position:', err)
      }
    }, 1500)
  }, [isAuthenticated, novelSlugWithId, currentChapterId])

  useEffect(() => {
    window.addEventListener('scroll', handleScrollSave, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScrollSave)
      if (saveScrollTimerRef.current) clearTimeout(saveScrollTimerRef.current)
    }
  }, [handleScrollSave])

  // Sync theme with document
  useEffect(() => {
    localStorage.setItem('reader-theme', theme)
    const isDarkTheme = theme === 'nocturne' || theme === 'charcoal'
    if (isDarkTheme) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <ReaderContext.Provider value={{
      currentChapterId,
      setCurrentChapterId,
      activeChapter,
      isLoading,
      scrollProgress,
      theme,
      setTheme,
      fontFamily,
      setFontFamily,
      fontSize,
      setFontSize,
      lineHeight,
      setLineHeight,
      fullFrame,
      setFullFrame,
      brightness,
      setBrightness
    }}>
      {children}
    </ReaderContext.Provider>
  )
}

export function useReaderContext() {
  const context = useContext(ReaderContext)
  if (!context) {
    throw new Error('useReaderContext must be used within a ReaderProvider')
  }
  return context
}
