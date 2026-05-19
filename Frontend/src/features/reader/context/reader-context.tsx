import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { readerService, type ChapterDetails } from '../services/reader-service'

export type ThemeType = 'nocturne' | 'charcoal' | 'sepia' | 'ivory' | 'day'
export type FontType = 'serif' | 'sans' | 'mono'
export type LineHeightType = 'tight' | 'normal' | 'loose'

interface ReaderContextType {
  currentChapterId: string
  setCurrentChapterId: (id: string) => void
  activeChapter: ChapterDetails | null
  isLoading: boolean
  
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
  const [currentChapterId, setCurrentChapterId] = useState<string>(initialChapterId)
  const [activeChapter, setActiveChapter] = useState<ChapterDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)

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

  // Fetch chapter data when ID changes
  useEffect(() => {
    setIsLoading(true)
    readerService.getChapter(currentChapterId).then(chapter => {
      setActiveChapter(chapter)
      setIsLoading(false)
    }).catch(error => {
      console.error("Failed to load chapter", error)
      setIsLoading(false)
    })
  }, [currentChapterId])

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
