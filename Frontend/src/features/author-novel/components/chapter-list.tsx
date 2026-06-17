import { Link } from 'react-router-dom'
import { Plus, Edit, Trash2, Headphones, MessageSquareWarning } from 'lucide-react'
import { useChapters, useDeleteChapter } from '../hooks/use-author-novels'

interface ChapterListProps {
  novelId: string
}

export function ChapterList({ novelId }: ChapterListProps) {
  const { data: chapters, isLoading, error } = useChapters(novelId)
  const deleteMutation = useDeleteChapter(novelId)

  const handleDelete = async (chapterId: string, title: string) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa chương "${title}" không?`)) {
      return
    }

    try {
      await deleteMutation.mutateAsync(chapterId)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Xóa chương thất bại')
    }
  }

  return (
    <div className="space-y-4 rounded-xl border border-outline-variant bg-surface-container-low p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground">Danh sách chương</h2>
          <p className="text-xs text-muted-foreground">Các chương truyện đã đăng tải hoặc đang nháp</p>
        </div>
        <Link
          to={`/author/novels/${novelId}/chapters/new`}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-bold text-on-primary shadow-sm transition-all hover:opacity-90 active:scale-95"
        >
          <Plus className="h-4 w-4" /> Thêm chương mới
        </Link>
      </div>

      {isLoading ? (
        <div className="py-8 text-center text-sm text-muted-foreground">Đang tải danh sách chương...</div>
      ) : error ? (
        <div className="py-6 text-center text-sm text-red-600">
          Không thể tải danh sách chương: {error instanceof Error ? error.message : 'Lỗi hệ thống'}
        </div>
      ) : !chapters || chapters.length === 0 ? (
        <div className="border border-dashed border-outline-variant rounded-lg p-8 text-center bg-surface-container-lowest">
          <MessageSquareWarning className="mx-auto h-8 w-8 text-muted-foreground opacity-50" />
          <p className="mt-2 text-sm text-muted-foreground">Truyện này chưa có chương nào.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-outline-variant text-xs uppercase tracking-wider text-muted-foreground font-bold">
                <th className="py-3 px-4 w-16 text-center">Số</th>
                <th className="py-3 px-4">Tên chương</th>
                <th className="py-3 px-4 w-24 text-center">Giá xu</th>
                <th className="py-3 px-4 w-28 text-center">Trạng thái</th>
                <th className="py-3 px-4 w-28 text-center">Âm thanh</th>
                <th className="py-3 px-4 w-24 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {chapters.map((chapter) => (
                <tr key={chapter.id} className="border-b border-outline-variant/50 hover:bg-surface-container-lowest transition-colors">
                  <td className="py-3.5 px-4 text-center font-mono font-bold text-muted-foreground">
                    {chapter.chapterNumber}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-foreground truncate max-w-xs">
                    {chapter.title}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {chapter.coinPrice > 0 ? (
                      <span className="font-bold text-amber-600">{chapter.coinPrice} xu</span>
                    ) : (
                      <span className="text-xs text-green-600 font-bold bg-green-500/10 px-1.5 py-0.5 rounded border border-green-500/20">Miễn phí</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`inline-block rounded px-2 py-0.5 text-[10px] font-bold uppercase border ${
                      chapter.status === 'PUBLISHED'
                        ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-600'
                        : chapter.status === 'DRAFT'
                        ? 'border-gray-500/20 bg-gray-500/10 text-gray-600'
                        : 'border-blue-500/20 bg-blue-500/10 text-blue-600'
                    }`}>
                      {chapter.status === 'PUBLISHED' ? 'Đã đăng' : chapter.status === 'DRAFT' ? 'Bản nháp' : chapter.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {chapter.audioUrl ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20" title="Đã sinh Audio">
                        <Headphones className="h-3 w-3" /> Sẵn sàng
                      </span>
                    ) : (
                      <span className="text-[10px] text-muted-foreground">Chưa sinh</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        to={`/author/novels/${novelId}/chapters/${chapter.chapterNumber}`}
                        className="rounded border border-outline-variant p-1 text-primary hover:bg-primary hover:text-on-primary transition-all active:scale-95"
                        title="Chỉnh sửa chương & TTS"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(chapter.id, chapter.title)}
                        className="rounded border border-red-500/20 p-1 text-red-600 hover:bg-red-600 hover:text-white transition-all active:scale-95"
                        title="Xóa chương"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
