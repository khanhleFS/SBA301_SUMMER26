import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Calendar, Plus, Search } from 'lucide-react'
import { useMyNovels } from '../hooks/use-author-novels'
import type { NovelResponseDTO } from '@/types'

export function NovelList() {
  const { data: novels, isLoading, error } = useMyNovels()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredNovels = useMemo(() => {
    if (!novels) return []
    if (!searchQuery.trim()) return novels

    const lowerQuery = searchQuery.toLowerCase()
    return novels.filter((novel) =>
      novel.title.toLowerCase().includes(lowerQuery) ||
      (novel.description && novel.description.toLowerCase().includes(lowerQuery))
    )
  }, [novels, searchQuery])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-48 animate-pulse rounded-xl border border-outline-variant bg-surface-container-low p-4" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-6 text-center text-red-600">
        Đã có lỗi xảy ra: {error instanceof Error ? error.message : 'Không thể tải danh sách truyện'}
      </div>
    )
  }

  if (!novels || novels.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-outline-variant bg-surface-container-low p-8 text-center">
        <BookOpen className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
        <h3 className="mt-4 text-lg font-bold text-foreground">Bạn chưa có truyện nào</h3>
        <p className="mt-2 text-sm text-muted-foreground">Bắt đầu hành trình sáng tác bằng cách tạo tác phẩm đầu tay.</p>
        <div className="mt-6">
          <Link
            to="/author/novels/new"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-on-primary shadow-sm transition-all hover:opacity-90 active:scale-95"
          >
            <Plus className="h-4 w-4" /> Tạo truyện mới
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Search & Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Tìm kiếm truyện..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 w-full rounded-lg border border-outline-variant bg-surface-container-low pl-9 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>

        <Link
          to="/author/novels/new"
          className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-bold text-on-primary shadow-sm transition-all hover:opacity-90 active:scale-95"
        >
          <Plus className="h-4 w-4" /> Tạo truyện mới
        </Link>
      </div>

      {/* Novel List / Empty Search State */}
      {filteredNovels.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredNovels.map((novel) => (
            <NovelCard key={novel.id} novel={novel} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-outline-variant py-12 text-center">
          <p className="text-sm text-muted-foreground">
            Không tìm thấy truyện nào khớp với từ khóa "<span className="font-bold text-foreground">{searchQuery}</span>"
          </p>
        </div>
      )}
    </div>
  )
}

function NovelCard({ novel }: { novel: NovelResponseDTO }) {
  const statusLabels: Record<string, string> = {
    ONGOING: 'Chưa kết thúc',
    COMPLETED: 'Kết thúc',
    PAUSED: 'Tạm ngưng',
    DROPPED: 'Đã hủy',
  }

  const statusColors: Record<string, string> = {
    ONGOING: 'border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400',
    COMPLETED: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    PAUSED: 'border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400',
    DROPPED: 'border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400',
  }

  return (
    <Link
      to={`/author/novels/${novel.id}`}
      className="group relative flex flex-col overflow-hidden rounded-md border border-outline-variant bg-surface-container-low p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
    >
      <div className="flex gap-4">
        {/* Cover Image */}
        <div className="h-24 w-16 shrink-0 overflow-hidden rounded-md border border-outline-variant bg-surface-container">
          {novel.coverImageUrl ? (
            <img src={novel.coverImageUrl} alt={novel.title} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-200 text-muted-foreground dark:bg-gray-800">
              <BookOpen className="h-6 w-6" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <span className={`inline-block rounded border px-2 py-0.5 text-[10px] font-bold uppercase ${statusColors[novel.status] || 'border-gray-500/20 bg-gray-500/10 text-gray-600'}`}>
            {statusLabels[novel.status] || novel.status}
          </span>
          <h3 className="mt-1 truncate text-base font-bold text-foreground transition-colors group-hover:text-primary">
            {novel.title}
          </h3>
          <p className="mt-1 line-clamp-2 leading-relaxed text-xs text-muted-foreground">
            {novel.description || 'Chưa có mô tả ngắn...'}
          </p>
        </div>
      </div>

      {/* Meta Stats: Current Chapter | Last Updated */}
      <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
        <span className="font-medium">
          {/* Tuỳ chỉnh lại tên trường chapter count theo DTO thực tế của bạn */}
          {novel.chapterCount ? `Chương ${novel.chapterCount}` : 'Chưa có chương'}
        </span>

        <span className="flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5" />
          {/* Ưu tiên ngày update, nếu không có thì lấy ngày tạo */}
          {new Date(novel.updatedAt || novel.createdAt).toLocaleDateString('vi-VN')}
        </span>
      </div>

      {/* Category Badges */}
      {novel.categories && novel.categories.length > 0 && (
        <div className="mt-2.5 flex flex-wrap gap-1.5 border-t border-outline-variant/50 pt-2.5">
          {novel.categories.slice(0, 4).map((cat) => (
            <span
              key={cat}
              className="rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary"
            >
              {cat}
            </span>
          ))}
          {novel.categories.length > 4 && (
            <span className="rounded-full border border-outline-variant bg-surface-container px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              +{novel.categories.length - 4}
            </span>
          )}
        </div>
      )}
    </Link>
  )
}