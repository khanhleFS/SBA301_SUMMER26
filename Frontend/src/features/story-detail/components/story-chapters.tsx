import { Link } from 'react-router-dom'
import { ArrowUpDown, ChevronLeft, ChevronsLeft, ChevronsRight, ChevronRight, Lock, Bookmark, Eye, Coins, X, Loader2 } from 'lucide-react'
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

  // Danh sách các chapter id đã được mua (mở khóa) trong phiên này
  const [purchasedChapterIds, setPurchasedChapterIds] = useState<Set<number>>(new Set())

  // Chapter đang được chọn để xác nhận mua (mở modal)
  const [chapterToBuy, setChapterToBuy] = useState<ChapterItem | null>(null)
  const [isBuying, setIsBuying] = useState(false)
  const [buyError, setBuyError] = useState<string | null>(null)

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

  const handleCloseModal = () => {
    setChapterToBuy(null)
    setIsBuying(false)
    setBuyError(null)
  }

  const handleConfirmBuy = async () => {
    if (!chapterToBuy) return
    setIsBuying(true)
    setBuyError(null)

    try {
      // TODO: thay bằng API thực tế, ví dụ:
      // await buyChapter({ chapterId: chapterToBuy.id })

      // Giả lập gọi API
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Mở khóa chapter sau khi mua thành công
      setPurchasedChapterIds((prev) => {
        const next = new Set(prev)
        next.add(chapterToBuy.id)
        return next
      })
      handleCloseModal()
    } catch (err) {
      setBuyError(err instanceof Error ? err.message : 'Mua chương thất bại, vui lòng thử lại.')
      setIsBuying(false)
    }
  }

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
            // Chapter được coi là khóa chỉ khi isLocked = true VÀ chưa được mua trong phiên này
            const isLocked = chap.isLocked && !purchasedChapterIds.has(chap.id)

            const rowClassName = `px-6 py-4 transition-colors flex items-center justify-between group ${isCurrentBookmark ? 'bg-primary/5 hover:bg-primary/10' : ''
              } ${isLocked ? 'cursor-default' : 'hover:bg-surface-container cursor-pointer'}`

            const chapterInfo = (
              <>
                <div className="flex flex-col gap-1">
                  <span className={`font-semibold text-sm transition-colors flex items-center gap-2 ${isCurrentBookmark ? 'text-primary' : isLocked ? 'text-on-surface-variant' : 'text-foreground group-hover:text-primary'
                    }`}>
                    {isCurrentBookmark ? (
                      <Bookmark className="size-3.5 text-primary fill-primary shrink-0 animate-pulse" />
                    ) : isLocked ? (
                      <Lock className="size-3.5 text-amber-500 shrink-0" />
                    ) : null}
                    {chap.title}
                  </span>
                </div>

                <div className="flex items-center gap-2.5 text-xs text-on-surface-variant/80 font-medium whitespace-nowrap shrink-0 select-none">
                  {isLocked ? (
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setChapterToBuy(chap)
                        setBuyError(null)
                      }}
                      className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary/20 transition-colors cursor-pointer"
                    >
                      <Lock className="size-3.5" />
                      Mua chương
                    </button>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <Eye className="size-4 text-on-surface-variant/60" />
                      {chap.views} lượt xem
                    </span>
                  )}
                </div>
              </>
            )

            // Chương bị khóa: không cho mở, render div thay vì Link
            if (isLocked) {
              return (
                <div key={chap.id} className={rowClassName}>
                  {chapterInfo}
                </div>
              )
            }

            return (
              <Link to={`/${storySlug}/${chap.slug}`} key={chap.id} className={rowClassName}>
                {chapterInfo}
              </Link>
            )
          })}
        </div>

        {/* Pagination Controls */}
        <div className="px-6 py-6 flex flex-col items-center justify-center border-t border-outline/10 bg-surface-container-low/50 gap-4">
          <div className="flex items-center justify-center gap-2">
            <button onClick={() => setLocalPage(1)} disabled={localPage === 1} className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container disabled:opacity-30 cursor-pointer"><ChevronsLeft className="size-5" /></button>
            <button onClick={() => setLocalPage(p => Math.max(1, p - 1))} disabled={localPage === 1} className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container disabled:opacity-30 cursor-pointer"><ChevronLeft className="size-5" /></button>

            <div className="relative inline-flex items-center">
              <select
                value={localPage}
                onChange={(e) => setLocalPage(Number(e.target.value))}
                // Thêm `appearance-none` để ẩn mũi tên gốc, dùng `pr-10` để chừa chỗ cho icon mới
                className="appearance-none bg-surface-container-high border border-outline/20 rounded-lg pl-4 pr-10 py-2 text-sm font-semibold text-primary cursor-pointer"
              >
                {Array.from({ length: localTotalPages }, (_, idx) => (
                  <option key={idx + 1} value={idx + 1}>
                    Trang {idx + 1} / {localTotalPages}
                  </option>
                ))}
              </select>

              {/* Icon mũi tên giả lập */}
              <div className="pointer-events-none absolute right-3 text-primary">
                {/* Bạn có thể thay bằng icon thư viện bạn đang dùng (Lucide, Heroicons...) */}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>

            <button onClick={() => setLocalPage(p => Math.min(localTotalPages, p + 1))} disabled={localPage === localTotalPages} className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container disabled:opacity-30 cursor-pointer"><ChevronRight className="size-5" /></button>
            <button onClick={() => setLocalPage(localTotalPages)} disabled={localPage === localTotalPages} className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container disabled:opacity-30 cursor-pointer"><ChevronsRight className="size-5" /></button>
          </div>
        </div>
      </SpotlightCard>

      {/* Modal xác nhận mua chương */}
      {chapterToBuy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <button className="absolute inset-0 cursor-default" onClick={handleCloseModal} />
          <div className="relative w-full max-w-sm rounded-xl p-5 shadow-2xl bg-surface-container-low border border-outline/10">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-primary/80">Mở khóa chương</p>
                <h3 className="mt-1 text-lg font-bold text-on-surface">{chapterToBuy.title}</h3>
              </div>
              <button
                onClick={handleCloseModal}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-surface-container text-on-surface transition-colors hover:bg-surface-container-high"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mb-4 flex items-center justify-center gap-2 rounded-lg bg-surface-container p-4 text-primary">
              <Coins className="h-6 w-6" strokeWidth={2.5} />
              <span className="text-2xl font-extrabold">
                {(chapterToBuy.price ?? 0).toLocaleString()} Coins
              </span>
            </div>

            <p className="mb-4 text-center text-xs text-on-surface-variant">
              Số coin sẽ được trừ trực tiếp từ ví của bạn để mở khóa chương này.
            </p>

            {buyError && (
              <p className="mb-3 text-xs font-semibold text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg p-2.5 text-center">
                {buyError}
              </p>
            )}

            <button
              onClick={handleConfirmBuy}
              disabled={isBuying}
              className="btn-primary w-full flex items-center justify-center gap-2 py-2.5 text-sm rounded-lg font-bold shadow-md disabled:opacity-50"
            >
              {isBuying ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Đang xử lý...
                </>
              ) : (
                'Xác nhận mua'
              )}
            </button>
          </div>
        </div>
      )}

      {/* ... (Mobile logic tương tự áp dụng displayChapters) */}
    </>
  )
}