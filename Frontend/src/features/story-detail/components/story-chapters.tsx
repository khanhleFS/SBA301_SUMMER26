import { Link } from 'react-router-dom'
import { Eye, ArrowUpDown, ChevronLeft, ChevronsLeft, ChevronsRight, ChevronRight, ChevronDown } from 'lucide-react'
import SpotlightCard from '@/components/custom/spot-light-card/SpotlightCard'

interface Chapter {
  id: number
  slug: string
  title: string
  time: string
  views: string
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
  return (
    <>
      {/* --- DESKTOP VIEWPORT --- */}
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
          {paginatedChapters.map((chap) => (
            <Link
              to={`/${storySlug}/${chap.slug}`}
              key={chap.id}
              className="px-6 py-4 hover:bg-surface-container transition-colors cursor-pointer flex items-center justify-between group"
            >
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">{chap.title}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-on-surface-variant/80 font-medium">{chap.time}</span>
                  <div className="flex items-center gap-1 text-xs text-on-surface-variant/60 font-medium">
                    <Eye className="h-3 w-3" />
                    <span>{chap.views}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
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
          {paginatedChapters.map((chap) => (
            <Link
              to={`/${storySlug}/${chap.slug}`}
              key={chap.id}
              className="px-5 py-4 hover:bg-surface-container transition-colors cursor-pointer flex items-center justify-between group"
            >
              <div className="flex flex-col gap-1">
                <span className="text-foreground font-semibold text-sm line-clamp-1 group-hover:text-primary transition-colors">{chap.title}</span>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-on-surface-variant font-medium">{chap.time}</span>
                  <div className="flex items-center gap-1 text-[10px] text-on-surface-variant/60 font-medium">
                    <Eye className="h-3 w-3" />
                    <span>{chap.views}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
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
