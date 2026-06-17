import { Link } from 'react-router-dom'
import { BookOpen, Calendar, Eye, Plus } from 'lucide-react'
import { useMyNovels } from '../hooks/use-author-novels'
import type { NovelResponseDTO } from '@/services/novel-service'

export function NovelList() {
  const { data: novels, isLoading, error } = useMyNovels()

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse rounded-xl border border-outline-variant bg-surface-container-low p-4 h-48" />
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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Truyện của tôi ({novels.length})</h2>
          <p className="text-xs text-muted-foreground">Quản lý và cập nhật các tác phẩm bạn đã tạo</p>
        </div>
        <Link
          to="/author/novels/new"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-on-primary shadow-sm transition-all hover:opacity-90 active:scale-95"
        >
          <Plus className="h-4 w-4" /> Tạo truyện mới
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {novels.map((novel) => (
          <NovelCard key={novel.id} novel={novel} />
        ))}
      </div>
    </div>
  )
}

function NovelCard({ novel }: { novel: NovelResponseDTO }) {
  const statusLabels: Record<string, string> = {
    ONGOING: 'Đang ra',
    COMPLETED: 'Hoàn thành',
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
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-outline-variant bg-surface-container-low p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-md">
      <div className="flex gap-4">
        {/* Cover Image */}
        <div className="h-24 w-16 shrink-0 overflow-hidden rounded-md border border-outline-variant bg-surface-container">
          {novel.coverImageUrl ? (
            <img src={novel.coverImageUrl} alt={novel.title} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground bg-gray-200 dark:bg-gray-800">
              <BookOpen className="h-6 w-6" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <span className={`inline-block rounded px-2 py-0.5 text-[10px] font-bold uppercase border ${statusColors[novel.status] || 'border-gray-500/20 bg-gray-500/10 text-gray-600'}`}>
            {statusLabels[novel.status] || novel.status}
          </span>
          <h3 className="mt-1 truncate text-base font-bold text-foreground group-hover:text-primary transition-colors">
            {novel.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-xs text-muted-foreground leading-relaxed">
            {novel.description || 'Chưa có mô tả ngắn...'}
          </p>
        </div>
      </div>

      {/* Meta Stats */}
      <div className="mt-4 flex items-center justify-between border-t border-outline-variant/50 pt-3 text-[11px] text-muted-foreground">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Eye className="h-3.5 w-3.5" /> {novel.viewCount} lượt xem
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" /> {new Date(novel.createdAt).toLocaleDateString('vi-VN')}
          </span>
        </div>

        <Link
          to={`/author/novels/${novel.id}`}
          className="inline-flex items-center gap-1 rounded bg-primary/10 px-2.5 py-1 font-bold text-primary hover:bg-primary hover:text-on-primary transition-all active:scale-95"
        >
          Chi tiết
        </Link>
      </div>
    </div>
  )
}
