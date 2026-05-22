import { useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'

interface ChapterSelectorProps {
  position: 'top' | 'bottom'
  activeChap: {
    prevChapter: string | null
    nextChapter: string | null
    chapterNum: string
    title: string
    chaptersList?: {
      id: number
      slug: string
      chapterNum: string
      title: string
    }[]
  }
  currentChapKey: string
  setCurrentChapKey: (key: any) => void
  activeSelector: 'top' | 'bottom' | null
  setActiveSelector: (val: any) => void
  currentTheme: { bg: string; text: string }
}

export default function ChapterSelector({
  position,
  activeChap,
  currentChapKey,
  setCurrentChapKey,
  activeSelector,
  setActiveSelector,
  currentTheme
}: ChapterSelectorProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const isOpen = activeSelector === position

  // Auto-close the dropdown when this selector scrolls out of the viewport
  useEffect(() => {
    if (!isOpen) return
    const el = wrapperRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setActiveSelector(null)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [isOpen, setActiveSelector])

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveSelector(null)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, setActiveSelector])

  return (
    <div
      ref={wrapperRef}
      className={`flex items-stretch select-none gap-[2px] max-w-[260px] w-full mx-auto ${position === 'top' ? 'mb-8' : 'mt-12'}`}
    >
      {/* Segment 1: Left Button (Prev Chapter) */}
      <button
        disabled={!activeChap.prevChapter}
        onClick={() => {
          if (activeChap.prevChapter) {
            setCurrentChapKey(activeChap.prevChapter)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }
        }}
        className={`px-3 py-2 rounded-s-[50px] rounded-e-[10px] bg-primary text-on-primary shadow hover:brightness-110 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center justify-center cursor-pointer`}
        title="Chương trước"
      >
        <ChevronLeft className="h-4.5 w-4.5" />
      </button>

      {/* Segment 2: Center Select Dropdown */}
      <div
        className="flex-1 min-w-0 bg-primary text-on-primary shadow hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center relative px-2"
        style={{ borderRadius: '4px' }}
      >
        <button
          onClick={() => setActiveSelector((prev: any) => prev === position ? null : position)}
          className="w-full py-2 text-center text-xs font-bold font-sans outline-none bg-transparent cursor-pointer text-ellipsis overflow-hidden whitespace-nowrap text-on-primary flex items-center justify-center gap-1.5"
        >
          <span>{activeChap.chapterNum}</span>
          <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown — only renders for the active position */}
        {isOpen && activeChap.chaptersList && (
          <>
            {/* Backdrop: closes on outside click */}
            <div
              className="fixed inset-0 z-[140] cursor-default"
              onClick={(e) => {
                e.stopPropagation()
                setActiveSelector(null)
              }}
            />

            <div
              className={`absolute ${position === 'top' ? 'top-full mt-2' : 'bottom-full mb-2'} left-1/2 -translate-x-1/2 min-w-full w-max max-h-60 overflow-y-auto ${currentTheme.bg} border rounded-[10px] shadow-2xl py-1 z-[150] flex flex-col`}
              style={{ borderColor: 'currentColor', borderOpacity: 0.1 } as any}
              onClick={(e) => e.stopPropagation()}
            >
              {activeChap.chaptersList.map((chap) => (
                <button
                  key={chap.id}
                  onClick={() => {
                    setCurrentChapKey(chap.slug)
                    setActiveSelector(null)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  className={`w-full text-left px-4 py-2.5 text-xs font-bold font-sans hover:bg-current/[0.08] cursor-pointer transition-colors ${currentChapKey === chap.slug ? 'text-primary bg-primary/10' : currentTheme.text}`}
                >
                  {chap.chapterNum}: {chap.title}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Segment 3: Right Button (Next Chapter) */}
      <button
        disabled={!activeChap.nextChapter}
        onClick={() => {
          if (activeChap.nextChapter) {
            setCurrentChapKey(activeChap.nextChapter)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }
        }}
        className={`px-3 py-2 rounded-s-[10px] rounded-e-[50px] bg-primary text-on-primary shadow hover:brightness-110 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center justify-center cursor-pointer`}
        title="Chương sau"
      >
        <ChevronRight className="h-4.5 w-4.5" />
      </button>
    </div>
  )
}
