import { Link } from 'react-router-dom'
import { Eye, ArrowUpDown, ChevronLeft, ChevronsLeft, ChevronsRight, ChevronRight, ChevronDown, Lock, Bookmark } from 'lucide-react'
import SpotlightCard from '@/components/custom/spot-light-card/SpotlightCard'
import { useStoryDetailContext } from '../context/story-detail-context'
import { MOCK_USER_READ_STATE } from '@/services/mock-data'

interface Chapter {
  id: number
  slug: string
  title: string
  time: string
  views: string
  isLocked?: boolean
  price?: number
}

interface StoryChaptersProps {
  storySlug: string
  chaptersLength: number
  paginatedChapters: Chapter[]
  currentPage: number
  totalPages: number
  isSortedAsc: boolean
  onSortToggle: () => void
  onPageChange: (page: number | ((p: number) => number)) => void
}

export function StoryChapters({
  storySlug,
  chaptersLength,
  paginatedChapters,
  currentPage,
  totalPages,
  isSortedAsc,
  onSortToggle,
  onPageChange
}: StoryChaptersProps) {
  const { storyInfo, chapters } = useStoryDetailContext()
  
  if (!storyInfo) return null

  const storyIdNum = Number(storyInfo.id)
  const bookmarkedChapterId = MOCK_USER_READ_STATE.bookmarks[storyIdNum]
  const isBookmarked = !!bookmarkedChapterId

  const bookmarkedChapter = chapters.find((c) => c.id === bookmarkedChapterId)

  const readProgress = bookmarkedChapterId
    ? Math.min(100, Math.round((bookmarkedChapterId / storyInfo.chaptersCount) * 100))
    : 0

  return (
    <>
      {/* --- DESKTOP VIEWPORT --- */}
      {/* Standalone Desktop Reading Progress Card */}
      {isBookmarked && (
        <SpotlightCard
          spotlightColor="rgba(79, 55, 138, 0.15)"
          className="hidden md:block bg-surface-container-low rounded-2xl border border-outline/5 p-6 mb-6"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-2 flex-grow max-w-xl">
              <div className="flex items-center gap-2">
                <Bookmark className="size-5 text-primary fill-primary animate-pulse" />
                <h3 className="text-lg font-serif font-bold text-foreground">Bạn đang đọc dở</h3>
              </div>
              <p className="text-sm font-semibold text-on-surface-variant">
                Chương đang đọc: <span className="text-primary">{bookmarkedChapter?.title || `Chương ${bookmarkedChapterId}`}</span>
              </p>
              <div className="w-full">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-on-surface-variant/60 font-semibold uppercase tracking-wider">Tiến độ truyện</span>
                  <span className="text-xs text-primary font-bold">{readProgress}%</span>
                </div>
                <div className="h-2 w-full bg-outline/15 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-500 rounded-full"
                    style={{ width: `${readProgress}%` }}
                  />
                </div>
              </div>
            </div>
            
            <Link
              to={`/${storySlug}/${bookmarkedChapter?.slug || `${storyInfo.slug}-chapter-${bookmarkedChapterId}`}`}
              className="px-6 py-3 bg-primary hover:bg-primary/90 text-on-primary rounded-full font-bold flex items-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary/20 cursor-pointer shrink-0 ml-8 text-sm text-center"
            >
              <Bookmark className="h-4 w-4 fill-on-primary" />
              Tiếp tục đọc
            </Link>
          </div>
        </SpotlightCard>
      )}

      <SpotlightCard
        id="chapters-section-desktop"
        spotlightColor="rgba(79, 55, 138, 0.15)"
        className="hidden md:block bg-surface-container-low rounded-2xl border border-outline/5 scroll-mt-24"
      >
        <div className="px-6 py-5 flex justify-between items-center border-b border-outline/10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Danh sách chương</h2>
          <div className="flex items-center gap-4">
            <span className="text-xs text-on-surface-variant font-medium">{chaptersLength} Chương</span>
            <button onClick={onSortToggle} className="p-2 hover:bg-surface-container rounded-lg text-on-surface-variant hover:text-primary transition-all flex items-center gap-1 text-xs font-bold cursor-pointer">
              <ArrowUpDown className="h-4 w-4" />
              {isSortedAsc ? 'Cũ nhất' : 'Mới nhất'}
            </button>
          </div>
        </div>
        
        <div className="divide-y divide-outline/5">
          {paginatedChapters.map((chap) => {
            const isCurrentBookmark = chap.id === bookmarkedChapterId

            return (
              <Link
                to={`/${storySlug}/${chap.slug}`}
                key={chap.id}
                className={`px-6 py-4 hover:bg-surface-container transition-colors cursor-pointer flex items-center justify-between group ${isCurrentBookmark ? 'bg-primary/5 hover:bg-primary/10' : ''}`}
              >
                <div className="flex flex-col gap-1">
                  <span className={`font-semibold text-sm transition-colors flex items-center gap-2 ${isCurrentBookmark ? 'text-primary' : 'text-foreground group-hover:text-primary'}`}>
                    {isCurrentBookmark ? (
                      <Bookmark className="size-3.5 text-primary fill-primary shrink-0 animate-pulse" />
                    ) : chap.isLocked ? (
                      <Lock className="size-3.5 text-amber-500 shrink-0" />
                    ) : null}
                    {chap.title}
                    {isCurrentBookmark && (
                      <span className="text-[9px] font-bold bg-primary/15 text-primary border border-primary/25 px-1.5 py-0.5 rounded uppercase tracking-wider">Đang đọc dở</span>
                    )}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-on-surface-variant/80 font-medium">{chap.time}</span>
                    <div className="flex items-center gap-1 text-xs text-on-surface-variant/60 font-medium">
                      <Eye className="h-3 w-3" />
                      <span>{chap.views}</span>
                    </div>
                  </div>
                </div>
                
                {chap.isLocked ? (
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {chap.price} Xu
                    </span>
                  </div>
                ) : isCurrentBookmark ? (
                  <span className="text-xs text-primary font-semibold select-none flex items-center gap-1">
                    Đọc tiếp
                  </span>
                ) : null}
              </Link>
            )
          })}
        </div>

        {/* Pagination Controls - ALIGNED BOTTOM & CENTERED */}
        <div className="px-6 py-6 flex flex-col items-center justify-center border-t border-outline/10 bg-surface-container-low/50 gap-4">
          <div className="flex items-center justify-center gap-2">
            <button 
              onClick={() => onPageChange(1)}
              disabled={currentPage === 1}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container disabled:opacity-30 cursor-pointer"
            >
              <ChevronsLeft className="size-4 sm:size-5" />
            </button>
            <button 
              onClick={() => onPageChange((p: number) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container disabled:opacity-30 cursor-pointer"
            >
              <ChevronLeft className="size-4 sm:size-5" />
            </button>
            
            <div className="relative flex items-center">
              <select 
                value={currentPage}
                onChange={(e) => onPageChange(Number(e.target.value))}
                className="appearance-none bg-surface-container-high border border-outline/20 rounded-lg pl-3 pr-8 py-1.5 sm:pl-4 sm:pr-10 sm:py-2 text-xs sm:text-sm font-semibold text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
              >
                {Array.from({ length: totalPages }, (_, idx) => (
                  <option key={idx + 1} value={idx + 1} className="bg-surface-container-high text-on-surface">
                    Trang {idx + 1} / {totalPages}
                  </option>
                ))}
              </select>
              <ChevronDown className="size-3.5 sm:size-4 absolute right-2.5 sm:right-3 pointer-events-none text-primary/60" />
            </div>

            <button 
              onClick={() => onPageChange((p: number) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container disabled:opacity-30 cursor-pointer"
            >
              <ChevronRight className="size-4 sm:size-5" />
            </button>
            <button 
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage === totalPages}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container disabled:opacity-30 cursor-pointer"
            >
              <ChevronsRight className="size-4 sm:size-5" />
            </button>
          </div>
          <span className="text-xs font-medium text-on-surface-variant/60 hidden sm:block text-center w-full">
            Đang hiển thị trang {currentPage} / {totalPages}
          </span>
        </div>
      </SpotlightCard>

      {/* --- MOBILE VIEWPORT --- */}
      {/* Standalone Mobile Reading Progress Card */}
      {isBookmarked && (
        <div className="md:hidden bg-surface-container-low rounded-xl border border-outline/5 p-4 mb-4 space-y-3">
          <div className="flex items-center gap-2">
            <Bookmark className="size-4.5 text-primary fill-primary animate-pulse" />
            <h4 className="text-sm font-bold text-foreground">Bạn đang đọc dở</h4>
          </div>
          <p className="text-xs font-semibold text-on-surface-variant leading-tight">
            {bookmarkedChapter?.title || `Chương ${bookmarkedChapterId}`}
          </p>
          <div className="w-full">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[9px] text-on-surface-variant/60 font-semibold uppercase tracking-wider">Tiến độ</span>
              <span className="text-xs text-primary font-bold">{readProgress}%</span>
            </div>
            <div className="h-1.5 w-full bg-outline/15 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500 rounded-full"
                style={{ width: `${readProgress}%` }}
              />
            </div>
          </div>
          <Link
            to={`/${storySlug}/${bookmarkedChapter?.slug || `${storyInfo.slug}-chapter-${bookmarkedChapterId}`}`}
            className="w-full bg-primary text-on-primary h-10 rounded-full font-bold flex items-center justify-center gap-1.5 shadow-md shadow-primary/20 active:scale-[0.98] transition-transform cursor-pointer text-xs text-center"
          >
            <Bookmark className="size-3.5 fill-on-primary" />
            Tiếp tục đọc
          </Link>
        </div>
      )}

      <section
        id="chapters-section-mobile"
        className="md:hidden bg-surface-container-low rounded-xl border border-outline/5 scroll-mt-24"
      >
        <div className="px-5 py-4 flex items-center justify-between border-b border-outline/10">
          <h3 className="text-xl font-serif font-bold text-foreground">Danh sách chương</h3>
          <button onClick={onSortToggle} className="p-2 hover:bg-surface-container rounded-lg text-on-surface-variant hover:text-primary transition-all flex items-center gap-1 text-xs font-bold cursor-pointer">
            <ArrowUpDown className="h-4 w-4" />
            {isSortedAsc ? 'Cũ nhất' : 'Mới nhất'}
          </button>
        </div>
        
        <div className="divide-y divide-outline/5">
          {paginatedChapters.map((chap) => {
            const isCurrentBookmark = chap.id === bookmarkedChapterId

            return (
              <Link
                to={`/${storySlug}/${chap.slug}`}
                key={chap.id}
                className={`px-5 py-4 hover:bg-surface-container transition-colors cursor-pointer flex items-center justify-between group ${isCurrentBookmark ? 'bg-primary/5 hover:bg-primary/10' : ''}`}
              >
                <div className="flex flex-col gap-1">
                  <span className={`text-sm font-semibold line-clamp-1 transition-colors flex items-center gap-1.5 ${isCurrentBookmark ? 'text-primary' : 'text-foreground group-hover:text-primary'}`}>
                    {isCurrentBookmark ? (
                      <Bookmark className="size-3 text-primary fill-primary shrink-0 animate-pulse" />
                    ) : chap.isLocked ? (
                      <Lock className="size-3 text-amber-500 shrink-0" />
                    ) : null}
                    {chap.title}
                    {isCurrentBookmark && (
                      <span className="text-[7.5px] font-bold bg-primary/15 text-primary border border-primary/25 px-1 py-0.5 rounded uppercase tracking-wider shrink-0">Đang đọc dở</span>
                    )}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-on-surface-variant font-medium">{chap.time}</span>
                    <div className="flex items-center gap-1 text-[10px] text-on-surface-variant/60 font-medium">
                      <Eye className="h-3 w-3" />
                      <span>{chap.views}</span>
                    </div>
                  </div>
                </div>
                
                {chap.isLocked ? (
                  <span className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0">
                    {chap.price} Xu
                  </span>
                ) : isCurrentBookmark ? (
                  <span className="text-[10px] text-primary font-bold select-none shrink-0">
                    Đọc tiếp
                  </span>
                ) : null}
              </Link>
            )
          })}
        </div>
        {/* Mobile Pagination Controls */}
        <div className="px-5 py-4 flex items-center justify-between border-t border-outline/10">
          <button 
            disabled={currentPage === 1} 
            onClick={() => onPageChange((p: number) => p - 1)}
            className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-foreground bg-surface-container hover:bg-surface-container-high rounded-xl disabled:opacity-50 transition-colors cursor-pointer disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-sm font-bold text-on-surface-variant">
            {currentPage} / {totalPages}
          </span>
          <button 
            disabled={currentPage === totalPages}
            onClick={() => onPageChange((p: number) => p + 1)}
            className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-foreground bg-surface-container hover:bg-surface-container-high rounded-xl disabled:opacity-50 transition-colors cursor-pointer disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </>
  )
}
