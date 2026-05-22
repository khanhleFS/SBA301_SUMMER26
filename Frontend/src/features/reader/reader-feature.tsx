import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import {
  Settings,
  Bookmark,
  Share2,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  Sun,
  AlignLeft,
  ArrowUp,
  Maximize2,
  Minimize2
} from 'lucide-react'
import Dock from './components/dock'
import ReaderSuggestions from './components/reader-suggestions'
import ChapterSelector from './components/chapter-selector'
import ReaderConfigMenu from './components/reader-config-menu'

// Import Context & Skeleton
import { ReaderProvider, useReaderContext, type ThemeType, type FontType, type LineHeightType } from './context/reader-context'
import { ReaderSkeleton } from './components/reader-skeleton'

function ReaderContent() {
  const navigate = useNavigate()
  const { novelSlug } = useParams<{ novelSlug: string }>()

  const {
    currentChapterId: currentChapKey,
    setCurrentChapterId: setCurrentChapKey,
    activeChapter: activeChap,
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
  } = useReaderContext()

  // Dynamically sync the browser URL with the current chapter slug
  useEffect(() => {
    if (novelSlug && currentChapKey) {
      navigate(`/${novelSlug}/${currentChapKey}`, { replace: true })
    }
  }, [currentChapKey, novelSlug, navigate])

  // HUD UI STATES
  const [showSettings, setShowSettings] = useState(false)
  const [mobileOverlayActive, setMobileOverlayActive] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showDock, setShowDock] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [activeSelector, setActiveSelector] = useState<'top' | 'bottom' | null>(null)
  const showDockRef = useRef(false)
  const scrollProgressRef = useRef(0)
  const scrollFrameRef = useRef<number | null>(null)

  // Track responsive screen width for dynamic Dock and drawer rendering
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Ref for the main reading container to detect content boundaries
  const readingContainerRef = useRef<HTMLDivElement>(null)

  // Framer Motion scroll progress tracking (instant scroll matching)
  const { scrollYProgress } = useScroll()

  // Track page scroll progress & content boundaries
  useEffect(() => {
    const updateScrollState = () => {
      scrollFrameRef.current = null

      const winScroll = document.body.scrollTop || document.documentElement.scrollTop
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0
      const roundedProgress = Math.round(scrolled)

      if (roundedProgress !== scrollProgressRef.current) {
        scrollProgressRef.current = roundedProgress
        setScrollProgress(roundedProgress)
      }

      let nextShowDock: boolean
      if (readingContainerRef.current) {
        const rect = readingContainerRef.current.getBoundingClientRect()

        // Show dock ONLY when:
        // - The user has scrolled past the very top (rect.top < 120px)
        // - The user has NOT yet scrolled past the bottom boundary of the reading card (rect.bottom > 220px)
        nextShowDock = rect.top < 120 && rect.bottom > 220
      } else {
        // Fallback standard behavior
        nextShowDock = winScroll > 150 && scrolled < 92
      }

      if (nextShowDock !== showDockRef.current) {
        showDockRef.current = nextShowDock
        setShowDock(nextShowDock)
      }
    }

    const handleScroll = () => {
      if (scrollFrameRef.current !== null) {
        return
      }
      scrollFrameRef.current = window.requestAnimationFrame(updateScrollState)
    }

    updateScrollState()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current)
      }
    }
  }, [currentChapKey])

  // KEYBOARD NAVIGATION (WASD + Arrows)
  useEffect(() => {
    if (!activeChap) return

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ngăn phím tắt khi đang nhập số chương hoặc biểu mẫu khác
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
        return
      }

      const key = e.key.toLowerCase()

      if (key === 'w' || e.key === 'ArrowUp') {
        e.preventDefault()
        window.scrollBy({ top: -180, behavior: 'smooth' })
      } else if (key === 's' || e.key === 'ArrowDown') {
        e.preventDefault()
        window.scrollBy({ top: 180, behavior: 'smooth' })
      } else if (key === 'a' || e.key === 'ArrowLeft') {
        if (activeChap.prevChapter) {
          e.preventDefault()
          setCurrentChapKey(activeChap.prevChapter)
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      } else if (key === 'd' || e.key === 'ArrowRight') {
        if (activeChap.nextChapter) {
          e.preventDefault()
          setCurrentChapKey(activeChap.nextChapter)
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentChapKey, activeChap])

  if (isLoading || !activeChap) {
    return <ReaderSkeleton />
  }

  // 5 Beautiful Themes class configurations
  const themeStyles = {
    nocturne: {
      bg: 'bg-[#151419] text-[#e6e1e7]',
      pageBg: '#0f0e11',
      text: 'text-[#e6e1e7]',
      textMuted: 'text-[#cac4d0]',
      panelBg: 'bg-[#1c1b1f]/95 border-white/10 text-[#e6e1e7]',
      tagBg: 'bg-[#d0bcff]/20 text-[#d0bcff]'
    },
    charcoal: {
      bg: 'bg-[#1e1e24] text-[#e3e1e6]',
      pageBg: '#16151a',
      text: 'text-[#e3e1e6]',
      textMuted: 'text-[#a5a4a9]',
      panelBg: 'bg-[#2a292f]/95 border-white/10 text-[#e3e1e6]',
      tagBg: 'bg-[#9a82db]/20 text-[#c2b2ec]'
    },
    sepia: {
      bg: 'bg-[#f4ebd4] text-[#4f3824]',
      pageBg: '#eae0ca',
      text: 'text-[#4f3824]',
      textMuted: 'text-[#8a6b51]',
      panelBg: 'bg-[#eae0ca]/95 border-[#d2b48c]/45 text-[#4f3824]',
      tagBg: 'bg-[#8b5a2b]/20 text-[#8b5a2b]'
    },
    ivory: {
      bg: 'bg-[#FAF5E6] text-[#2C2512]',
      pageBg: '#fcf9f2',
      text: 'text-[#2C2512]',
      textMuted: 'text-[#7c7152]',
      panelBg: 'bg-[#eae3cd]/95 border-black/10 text-[#2C2512]',
      tagBg: 'bg-[#7c7152]/10 text-[#7c7152]'
    },
    day: {
      bg: 'bg-[#ffffff] text-[#1c1b1f]',
      pageBg: '#f9f6fa',
      text: 'text-[#1c1b1f]',
      textMuted: 'text-[#49454f]',
      panelBg: 'bg-[#f3eff5]/95 border-black/10 text-[#1c1b1f]',
      tagBg: 'bg-[#4f378a]/10 text-[#4f378a]'
    }
  }

  const currentTheme = themeStyles[theme]

  // Canvas click toggles mobile overlays
  const handleCanvasClick = () => {
    setMobileOverlayActive(prev => !prev)
  }

  // 📍 DOCK ITEMS DEFINITION (Filtered dynamically for mobile view)
  const dockItems = [
    {
      icon: <ArrowLeft className="size-5 text-on-primary" />,
      label: 'Quay lại',
      onClick: () => navigate(`/${novelSlug || 'vong-am-toa-thap-neon-walker'}`)
    },
    {
      icon: <Bookmark className="size-5 text-on-primary" />,
      label: 'Đánh dấu',
      onClick: () => alert('Đã đánh dấu chương này thành công!')
    },
    ...(isMobile ? [] : [
      {
        icon: fullFrame ? <Minimize2 className="size-5 text-on-primary" /> : <Maximize2 className="size-5 text-on-primary" />,
        label: fullFrame ? 'Khung chuẩn' : 'Tràn khung',
        onClick: () => setFullFrame(!fullFrame)
      }
    ]),
    {
      icon: <Settings className="size-5 text-on-primary" />,
      label: 'Cấu hình',
      onClick: () => {
        if (isMobile) {
          setMobileOverlayActive(false)
        }
        setShowSettings(prev => !prev)
      }
    }
  ]

  // Component extracted to src/features/reader/components/chapter-selector.tsx

  return (
    <div
      className="min-h-[calc(100vh-4rem)] sm:min-h-screen w-full mt-16 sm:mt-0 pt-0 sm:pt-24 transition-all duration-500 pb-28 relative"
      style={{
        backgroundColor: currentTheme.pageBg
      }}
    >

      {/* Dynamic Scroll Progress Bar with Brand violet Glow shadow */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left shadow-[0_1px_6px_rgba(79,55,138,0.5)]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* 
        --- MAIN PAGE CONTENT FLOW ---
        We apply the brightness filter ONLY here, keeping the configuration overlays
        and mobile HUD layouts completely clean and 100% relative to the Viewport!
      */}
      <div className="w-full h-full">
        {/* --- CORE READING CONTAINER (Dynamic Card-based or Full-Frame wide viewport) --- */}
        <div
          ref={readingContainerRef}
          className={`mx-auto transition-all duration-300 relative ${fullFrame
            ? 'w-full max-w-none rounded-none border-none p-4 sm:p-8 shadow-none'
            : 'max-w-[780px] w-full sm:w-[95%] rounded-none sm:rounded-2xl border-none sm:border-solid sm:border shadow-none sm:shadow-xl px-4 py-6 sm:p-10 sm:shadow-black/10'
            } ${currentTheme.bg}`}
          style={{ borderColor: 'rgba(var(--current-text-color), 0.1)', borderOpacity: 0.1 } as any}
        >

          {/* 📍 A. BREADCRUMB NAVIGATION */}
          <div className={`flex items-center flex-wrap gap-1 text-[9px] sm:text-[10px] uppercase tracking-wider font-bold mb-8 select-none ${currentTheme.textMuted}`}>
            <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link>
            <span className="opacity-40">/</span>
            <Link to="/search" className="hover:text-primary transition-colors">Khám phá</Link>
            <span className="opacity-40">/</span>
            <span className="hover:text-primary transition-colors cursor-pointer" onClick={() => navigate('/story')}>
              {activeChap.author}
            </span>
            <span className="opacity-40">/</span>
            <span className="text-primary">{activeChap.chapterNum}</span>
          </div>

          {/* 📍 1. TITLE SECTION (Clean, imageless text layout) */}
          <div className="flex flex-col items-center text-center mb-6">
            <span className="text-xs uppercase tracking-widest font-bold text-primary mb-3">
              {activeChap.chapterNum}
            </span>
            <h2 className={`font-serif text-3xl md:text-4xl font-bold leading-tight mb-4 ${currentTheme.text}`}>
              {activeChap.title}
            </h2>
            <div className={`flex items-center gap-3 text-xs font-semibold tracking-wide ${currentTheme.textMuted}`}>
              <span>By {activeChap.author}</span>
              <span className="w-1 h-1 bg-current opacity-30 rounded-full" />
              <span>{activeChap.readTime}</span>
              <span className="w-1 h-1 bg-current opacity-30 rounded-full" />
              <span>{activeChap.words}</span>
            </div>
          </div>

          {/* 📍 2. DIVIDER */}
          <div className="h-[1px] w-full bg-current opacity-10 my-6" />

          {/* 📍 3. CHAPTER SELECTOR (TOP) */}
          <div className="my-6">
            <ChapterSelector
              position="top"
              activeChap={activeChap}
              currentChapKey={currentChapKey}
              setCurrentChapKey={setCurrentChapKey}
              activeSelector={activeSelector}
              setActiveSelector={setActiveSelector}
              currentTheme={currentTheme}
            />
          </div>

          {/* 📍 4. DIVIDER */}
          <div className="h-[1px] w-full bg-current opacity-10 my-6" />

          {/* 📍 5. CONTENT SECTION */}
          <main
            className="mx-auto cursor-pointer space-y-8 my-8"
            onClick={handleCanvasClick}
          >
            <article
              className={`text-justify hyphens-auto select-text space-y-6 md:space-y-8 ${fontFamily === 'serif' ? 'font-serif' :
                fontFamily === 'sans' ? 'font-sans' : 'font-mono'
                }`}
              style={{
                fontSize: `${fontSize}px`,
                lineHeight: lineHeight === 'tight' ? 1.5 : lineHeight === 'normal' ? 1.85 : 2.2
              }}
            >
              {activeChap.paragraphs.map((p, idx) => {
                if (activeChap.id === 42 && idx === 3) {
                  return (
                    <blockquote key={idx} className={`border-l-4 border-primary pl-6 py-4 my-8 rounded-r-xl italic bg-current/[0.05] ${currentTheme.text}`}>
                      "To weave is to sacrifice the thread for the pattern. Remember that, child of the Spire."
                    </blockquote>
                  )
                }
                return (
                  <p key={idx} className={`indent-4 leading-[1.8] ${currentTheme.text}`}>
                    {p}
                  </p>
                )
              })}
            </article>
          </main>

          {/* 📍 6. DIVIDER */}
          <div className="h-[1px] w-full bg-current opacity-10 my-6" />

          {/* 📍 7. CHAPTER SELECTOR (BOTTOM) */}
          <div className="my-6">
            <ChapterSelector
              position="bottom"
              activeChap={activeChap}
              currentChapKey={currentChapKey}
              setCurrentChapKey={setCurrentChapKey}
              activeSelector={activeSelector}
              setActiveSelector={setActiveSelector}
              currentTheme={currentTheme}
            />
          </div>

          {/* 📍 8. DIVIDER */}
          <div className="h-[1px] w-full bg-current opacity-10 my-8" />
        </div>

        {/* 📍 9. NOVEL SUGGESTIONS BASED ON CATEGORY, STATUS, TRENDING (Outside of reading card) */}
        <ReaderSuggestions currentTheme={currentTheme} />
      </div>

      {/* 🌟 DESKTOP FLOATING SIDE NAVIGATION ARROWS (Wattpad/Webnovel Style) */}
      <div className="hidden lg:block select-none">
        {activeChap.prevChapter && (
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 0.35, x: 0 }}
            whileHover={{ opacity: 1, x: 2, scale: 1.05 }}
            onClick={() => { setCurrentChapKey(activeChap.prevChapter!); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className={`fixed left-4 top-1/2 -translate-y-1/2 z-40 w-12 h-20 rounded-xl flex items-center justify-center bg-current/[0.05] hover:bg-current/[0.08] border shadow-lg cursor-pointer ${currentTheme.text}`}
            style={{ borderColor: 'currentColor', borderOpacity: 0.1 } as any}
            title="Chương trước (Phím A / ←)"
          >
            <ChevronLeft className="h-8 w-8" />
          </motion.button>
        )}

        {activeChap.nextChapter && (
          <motion.button
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 0.35, x: 0 }}
            whileHover={{ opacity: 1, x: -2, scale: 1.05 }}
            onClick={() => { setCurrentChapKey(activeChap.nextChapter!); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className={`fixed right-4 top-1/2 -translate-y-1/2 z-40 w-12 h-20 rounded-xl flex items-center justify-center bg-current/[0.05] hover:bg-current/[0.08] border shadow-lg cursor-pointer ${currentTheme.text}`}
            style={{ borderColor: 'currentColor', borderOpacity: 0.1 } as any}
            title="Chương sau (Phím D / →)"
          >
            <ChevronRight className="h-8 w-8" />
          </motion.button>
        )}
      </div>

  {/* 
        🌟 PREMIUM VIEWPORT-FIXED BOTTOM CENTER DOCK
        Placed OUTSIDE the filtered element hierarchy so fixed positioning is truly relative to the Viewport!
      */}
  <AnimatePresence>
{
  showDock && (!isMobile || !mobileOverlayActive) && (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ type: 'spring', damping: 20, stiffness: 200 }}
      className="fixed bottom-6 left-0 right-0 flex justify-center z-[100] pointer-events-none"
    >
      <div className="pointer-events-auto">
        <Dock items={dockItems} position="bottom" />
      </div>
    </motion.div>
  )
}
      </AnimatePresence >

  {/* 🌟 PREMIUM BOTTOM-RIGHT FLOATING ACTION BUTTON (FAB) FOR GOING UP */ }
  <AnimatePresence>
{
  showDock && (!isMobile || !mobileOverlayActive) && (
    <motion.button
      initial={{ scale: 0, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0, opacity: 0, y: 20 }}
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      title="Lên đầu trang"
      className="fixed bottom-6 right-6 z-[95] md:bottom-8 md:right-8 w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary text-on-primary shadow-lg shadow-primary/30 flex items-center justify-center cursor-pointer border border-white/10 hover:brightness-110 active:scale-95 transition-all"
    >
      <ArrowUp className="h-5 w-5" />
    </motion.button>
  )
}
      </AnimatePresence >

  {/* 🌟 PREMIUM CENTERED CONFIGURATION MODAL POPUP FOR DESKTOP */ }
  <AnimatePresence>
{
  showSettings && !isMobile && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 z-[120] flex items-center justify-center p-4 cursor-pointer"
      onClick={() => setShowSettings(false)}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{ type: 'tween', duration: 0.18, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-sm p-6 rounded-3xl border shadow-xl backdrop-blur-sm transform-gpu will-change-transform cursor-default ${currentTheme.panelBg}`}
      >
        <div className="space-y-5">

          <ReaderConfigMenu
            theme={theme}
            setTheme={setTheme}
            fontSize={fontSize}
            setFontSize={setFontSize}
            fontFamily={fontFamily}
            setFontFamily={setFontFamily}
            lineHeight={lineHeight}
            setLineHeight={setLineHeight}
            brightness={brightness}
            setBrightness={setBrightness}
            fullFrame={fullFrame}
            setFullFrame={setFullFrame}
          />

        </div>
      </motion.div>
    </motion.div>
  )
}
      </AnimatePresence >

  {/* 🌟 PREMIUM SLIDE-UP BOTTOM SHEET CONFIGURATION DRAWER FOR MOBILE */ }
  <AnimatePresence>
{
  showSettings && isMobile && (
    <div className="fixed inset-0 z-[120] flex items-end justify-center md:hidden">
      {/* Dark Blurred Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 transition-opacity duration-200"
        onClick={() => setShowSettings(false)}
      />

      {/* Slide-up Panel Sheet (Filter search style - rounded-t-lg để bớt tròn) */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'tween', duration: 0.2, ease: 'easeOut' }}
        className={`relative w-full border-t border-outline/10 rounded-t-lg p-5 shadow-xl transform-gpu will-change-transform max-h-[80vh] overflow-y-auto z-10 ${currentTheme.panelBg}`}
      >
        {/* Drag Handle */}
        <div className="w-12 h-1 bg-current opacity-20 rounded-full mx-auto mb-4" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-outline/10 mb-5">
          <div className="flex items-center gap-1.5">
            <Settings className="size-4 text-primary animate-spin-slow" />
            <h2 className="font-serif text-sm font-bold">Cấu hình trình đọc</h2>
          </div>
          <button
            onClick={() => setShowSettings(false)}
            className="text-[11px] font-bold uppercase tracking-wider text-primary hover:underline cursor-pointer select-none"
          >
            Đóng
          </button>
        </div>

        {/* Config Options */}
        <div className="space-y-5">
          <ReaderConfigMenu
            theme={theme}
            setTheme={setTheme}
            fontSize={fontSize}
            setFontSize={setFontSize}
            fontFamily={fontFamily}
            setFontFamily={setFontFamily}
            lineHeight={lineHeight}
            setLineHeight={setLineHeight}
            brightness={brightness}
            setBrightness={setBrightness}
          />
        </div>
      </motion.div>
    </div>
  )
}

      </AnimatePresence>

  {/* --- MOBILE VIEWPORT HUD OVERLAYS (OUTSIDE FILTER) --- */ }
  < div className = "md:hidden select-none" >

    {/* Top Floating HUD Navigation */ }
    < nav
onClick = {(e) => e.stopPropagation()}
className = {`fixed top-0 left-0 w-full z-50 bg-surface-container-low/95 backdrop-blur-md border-b border-outline/10 transition-all duration-300 py-3 ${mobileOverlayActive ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-full opacity-0 pointer-events-none'}`}
        >
  <div className="flex items-center justify-between px-4">
    <button onClick={() => navigate(`/${novelSlug || 'vong-am-toa-thap-neon-walker'}`)} className="p-2 hover:bg-surface-container rounded-full active:scale-90 transition-transform cursor-pointer">
      <ArrowLeft className="h-6 w-6 text-primary" />
    </button>
    <div className="text-center flex-1 max-w-[200px]">
      <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">LumiNovels</span>
      <h2 className="text-xs font-bold text-primary truncate">{activeChap.title}</h2>
    </div>
    <button onClick={() => alert('Bookmarked!')} className="p-2 hover:bg-surface-container rounded-full active:scale-90 transition-transform cursor-pointer">
      <Bookmark className="h-6 w-6 text-foreground" />
    </button>
  </div>
        </nav >

  {/* Bottom Floating HUD Typography Controls */ }
  < nav
onClick = {(e) => e.stopPropagation()}
className = {`fixed bottom-0 left-0 w-full z-50 bg-surface-container-low/95 backdrop-blur-xl border-t border-outline/10 p-5 rounded-t-2xl space-y-4 shadow-2xl transition-all duration-300 ${mobileOverlayActive ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-full opacity-0 pointer-events-none'}`}
        >
  {/* Progress row */ }
  < div className = "space-y-2" >
            <div className="flex justify-between text-xs font-bold text-on-surface-variant">
              <span>Tiến độ cuộn trang</span>
              <span>{Math.round(scrollProgress)}%</span>
            </div>
            <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary origin-left"
                style={{ scaleX: scrollYProgress }}
              />
            </div>
          </div >

  {/* Quick Adjustments Options (Micro chips) */ }
  < div className = "space-y-3.5" >

    {/* Brightness & Font size */ }
    < div className = "grid grid-cols-2 gap-3" >
      {/* Font Control (Mobile Slider with A indicators) */ }
      < div className = "bg-surface-container-low p-2.5 rounded-xl border border-outline/5 space-y-2" >
                <div className="flex justify-between items-center text-[10px] uppercase font-bold text-on-surface-variant">
                  <span className="flex items-center gap-1"><AlignLeft className="h-3 w-3" /> Cỡ chữ</span>
                  <span className="text-primary font-bold">{fontSize}px</span>
                </div>
                <div className="flex items-center gap-2 bg-surface-container px-2 py-1 rounded-lg">
                  <span className="text-[9px] opacity-60">A</span>
                  <input
                    type="range"
                    min="14"
                    max="32"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="flex-1 accent-primary h-1 bg-surface-container-highest rounded-full appearance-none cursor-pointer"
                  />
                  <span className="text-sm font-bold opacity-80">A</span>
                </div>
              </div >

  {/* Brightness Control */ }
  < div className = "bg-surface-container-low p-2.5 rounded-xl border border-outline/5 space-y-2" >
                <span className="text-[10px] uppercase font-bold text-on-surface-variant flex items-center gap-1">
                  <Sun className="h-3 w-3" /> Độ sáng
                </span>
                <input
                  type="range"
                  min="40"
                  max="100"
                  value={brightness}
                  onChange={(e) => setBrightness(Number(e.target.value))}
                  className="w-full accent-primary h-1 bg-surface-container rounded-full appearance-none cursor-pointer"
                />
              </div >
            </div >

  {/* Font Family selection in bottom nav */ }
  < div className = "bg-surface-container-low p-2.5 rounded-xl border border-outline/5 space-y-1.5" >
              <span className="text-[10px] uppercase font-bold text-on-surface-variant">Kiểu chữ</span>
              <div className="flex justify-between items-center gap-2 bg-surface-container p-1 rounded-lg">
                {[
                  { id: 'serif', label: 'Serif' },
                  { id: 'sans', label: 'Sans' },
                  { id: 'mono', label: 'Mono' }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFontFamily(f.id as FontType)}
                    className={`flex-1 py-1 rounded-md text-[10px] font-bold transition-all border cursor-pointer ${fontFamily === f.id ? 'bg-primary border-primary text-on-primary shadow' : 'border-transparent text-on-surface-variant'
                      }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div >

  {/* Line spacing in bottom nav */ }
  < div className = "bg-surface-container-low p-2.5 rounded-xl border border-outline/5 space-y-1.5" >
              <span className="text-[10px] uppercase font-bold text-on-surface-variant">Giãn dòng</span>
              <div className="flex justify-between items-center gap-2 bg-surface-container p-1 rounded-lg">
                {[
                  { id: 'tight', label: 'Hẹp' },
                  { id: 'normal', label: 'Thường' },
                  { id: 'loose', label: 'Rộng' }
                ].map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setLineHeight(l.id as LineHeightType)}
                    className={`flex-1 py-1 rounded-md text-[10px] font-bold transition-all border cursor-pointer ${lineHeight === l.id ? 'bg-primary border-primary text-on-primary shadow' : 'border-transparent text-on-surface-variant'
                      }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div >

  {/* Display Frame Option */ }
  < div className = "bg-surface-container-low p-2.5 rounded-xl border border-outline/5 flex items-center justify-between" >
              <span className="text-[10px] uppercase font-bold text-on-surface-variant">Tràn khung Full-screen</span>
              <button
                onClick={() => setFullFrame(!fullFrame)}
                className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border transition-all cursor-pointer ${fullFrame ? 'border-primary bg-primary/10 text-primary' : 'border-outline/10 text-on-surface-variant'
                  }`}
              >
                {fullFrame ? 'Bật' : 'Tắt'}
              </button>
            </div >

  {/* 5 Themes Selection */ }
  < div className = "flex justify-between items-center gap-1.5 bg-surface-container-low p-2 rounded-xl border border-outline/5" >
    {(['nocturne', 'charcoal', 'sepia', 'ivory', 'day'] as ThemeType[]).map((t) => (
      <button
        key={t}
        onClick={() => setTheme(t)}
        className={`flex-1 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all border cursor-pointer ${theme === t ? 'border-primary bg-primary/10 text-primary' : 'border-transparent text-on-surface-variant'
          }`}
      >
        {t === 'nocturne' ? 'Đêm' : t === 'charcoal' ? 'Than' : t === 'sepia' ? 'Kem' : t === 'ivory' ? 'Ngà' : 'Sáng'}
      </button>
    ))}
            </div >

          </div >

  {/* Action Footer Icons */ }
  < div className = "flex justify-around items-center pt-2" >
            <button
              onClick={() => alert('Đã đánh dấu chương này thành công!')}
              className="cursor-pointer hover:text-primary transition-colors p-2 rounded-full hover:bg-current/[0.04]"
              title="Đánh dấu"
            >
              <Bookmark className="h-5 w-5 text-foreground" />
            </button>
            <button
              onClick={() => { setMobileOverlayActive(false); setShowSettings(true) }}
              className="cursor-pointer hover:text-primary transition-colors p-2 rounded-full hover:bg-current/[0.04]"
              title="Cấu hình"
            >
              <Settings className="h-5 w-5 text-foreground" />
            </button>
            <button
              onClick={() => alert('Đã chia sẻ thành công!')}
              className="cursor-pointer hover:text-primary transition-colors p-2 rounded-full hover:bg-current/[0.04]"
              title="Chia sẻ"
            >
              <Share2 className="h-5 w-5 text-foreground" />
            </button>
          </div >
        </nav >
      </div >

    </div>
  )
}

export default function ReaderFeature() {
  const { chapterSlug } = useParams<{ chapterSlug: string }>()
  return (
    <ReaderProvider initialChapterId={chapterSlug || 'chuong-1-tia-lua-dau-tien-1'}>
      <ReaderContent />
    </ReaderProvider>
  )
}
