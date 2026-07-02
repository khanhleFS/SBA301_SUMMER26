import { Link } from 'react-router-dom'
import { ArrowUpDown, ChevronLeft, ChevronsLeft, ChevronsRight, ChevronRight, Lock, Bookmark } from 'lucide-react'
import SpotlightCard from '@/components/custom/spot-light-card/SpotlightCard'
import { useStoryDetailContext } from '../context/story-detail-context'
import { MOCK_USER_READ_STATE } from '@/services/mock-data'
import { useMemo, useState, useEffect } from 'react'
import type { ChapterItem } from '../services/story-detail-service'

interface StoryChaptersProps {
  storySlug: string
  chaptersLength: number
  paginatedChapters: ChapterItem[]
  currentPage: number
  totalPages: number
  isSortedAsc: boolean
  onSortToggle: () => void
  onPageChange: (page: number | ((p: number) => number)) => void
}

export function StoryChapters({
  storySlug,
  isSortedAsc,
  onSortToggle,
}: StoryChaptersProps) {
  const { storyInfo, chapters } = useStoryDetailContext()

  const ITEMS_PER_PAGE = 5;
  const [localPage, setLocalPage] = useState(1);

  // Reset trang về 1 khi danh sách gốc thay đổi (ví dụ: đổi chiều sort)
  useEffect(() => {
    setLocalPage(1);
  }, [chapters]);

  // Tính tổng số trang dựa trên độ dài của toàn bộ danh sách chương (chapters)
  const localTotalPages = useMemo(() => Math.ceil(chapters.length / ITEMS_PER_PAGE), [chapters.length]);

  // Cắt dữ liệu hiển thị từ "chapters" (Full list) thay vì "paginatedChapters" (Partial list)
  const displayChapters = useMemo(() => {
    const start = (localPage - 1) * ITEMS_PER_PAGE;
    return chapters.slice(start, start + ITEMS_PER_PAGE);
  }, [chapters, localPage]);

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
      {isBookmarked && (
        <SpotlightCard spotlightColor="rgba(79, 55, 138, 0.15)" className="hidden md:block bg-surface-container-low rounded-lg border border-outline/5 p-6 mb-6">
          {/* ... (Giữ nguyên nội dung card Bookmark) */}
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
                  <div className="h-full bg-primary transition-all duration-500 rounded-full" style={{ width: `${readProgress}%` }} />
                </div>
              </div>
            </div>
            <Link to={`/${storySlug}/${bookmarkedChapter?.slug || `${storyInfo.slug}-chapter-${bookmarkedChapterId}`}`} className="px-6 py-3 bg-primary hover:bg-primary/90 text-on-primary rounded-full font-bold flex items-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary/20 cursor-pointer shrink-0 ml-8 text-sm text-center">
              <Bookmark className="h-4 w-4 fill-on-primary" />
              Tiếp tục đọc
            </Link>
          </div>
        </SpotlightCard>
      )}

      <SpotlightCard id="chapters-section-desktop" spotlightColor="rgba(79, 55, 138, 0.15)" className="hidden md:block bg-surface-container-low rounded-lg border border-outline/5 scroll-mt-24">
        <div className="px-6 py-5 flex justify-between items-center border-b border-outline/10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Danh sách chương</h2>
          <div className="flex items-center gap-4">
            <span className="text-xs text-on-surface-variant font-medium">{chapters.length} Chương</span>
            <button onClick={onSortToggle} className="p-2 hover:bg-surface-container rounded-lg text-on-surface-variant hover:text-primary transition-all flex items-center gap-1 text-xs font-bold cursor-pointer">
              <ArrowUpDown className="h-4 w-4" />
              {isSortedAsc ? 'Cũ nhất' : 'Mới nhất'}
            </button>
          </div>
        </div>

        <div className="divide-y divide-outline/5">
          {displayChapters.map((chap) => {
            const isCurrentBookmark = chap.id === bookmarkedChapterId
            return (
              <Link to={`/${storySlug}/${chap.slug}`} key={chap.id} className={`px-6 py-4 hover:bg-surface-container transition-colors cursor-pointer flex items-center justify-between group ${isCurrentBookmark ? 'bg-primary/5 hover:bg-primary/10' : ''}`}>
                <div className="flex flex-col gap-1">
                  <span className={`font-semibold text-sm transition-colors flex items-center gap-2 ${isCurrentBookmark ? 'text-primary' : 'text-foreground group-hover:text-primary'}`}>
                    {isCurrentBookmark ? <Bookmark className="size-3.5 text-primary fill-primary shrink-0 animate-pulse" /> : chap.isLocked ? <Lock className="size-3.5 text-amber-500 shrink-0" /> : null}
                    {chap.title}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Pagination Controls */}
        <div className="px-6 py-6 flex flex-col items-center justify-center border-t border-outline/10 bg-surface-container-low/50 gap-4">
          <div className="flex items-center justify-center gap-2">
            <button onClick={() => setLocalPage(1)} disabled={localPage === 1} className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container disabled:opacity-30 cursor-pointer"><ChevronsLeft className="size-5" /></button>
            <button onClick={() => setLocalPage(p => Math.max(1, p - 1))} disabled={localPage === 1} className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container disabled:opacity-30 cursor-pointer"><ChevronLeft className="size-5" /></button>

            <select value={localPage} onChange={(e) => setLocalPage(Number(e.target.value))} className="bg-surface-container-high border border-outline/20 rounded-lg px-4 py-2 text-sm font-semibold text-primary cursor-pointer">
              {Array.from({ length: localTotalPages }, (_, idx) => <option key={idx + 1} value={idx + 1}>Trang {idx + 1} / {localTotalPages}</option>)}
            </select>

            <button onClick={() => setLocalPage(p => Math.min(localTotalPages, p + 1))} disabled={localPage === localTotalPages} className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container disabled:opacity-30 cursor-pointer"><ChevronRight className="size-5" /></button>
            <button onClick={() => setLocalPage(localTotalPages)} disabled={localPage === localTotalPages} className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container disabled:opacity-30 cursor-pointer"><ChevronsRight className="size-5" /></button>
          </div>
        </div>
      </SpotlightCard>
      {/* ... (Mobile logic tương tự áp dụng displayChapters) */}
    </>
  )
}