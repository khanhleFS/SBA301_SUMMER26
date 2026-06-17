import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, Loader2, Headphones, Mic, Volume2 } from 'lucide-react'
import { useCreateChapter, useUpdateChapter, useGenerateChapterAudio } from '../hooks/use-author-novels'
import type { ChapterResponseDTO, ChapterStatus } from '@/services/chapter-service'

interface ChapterFormProps {
  novelId: string
  chapter?: ChapterResponseDTO // If editing
}

export function ChapterForm({ novelId, chapter }: ChapterFormProps) {
  const navigate = useNavigate()
  const isEdit = !!chapter

  // Form states
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [status, setStatus] = useState<ChapterStatus>('DRAFT')
  const [chapterNumber, setChapterNumber] = useState(1)
  const [coinPrice, setCoinPrice] = useState(0)

  // Invalidate and sync mutations
  const createMutation = useCreateChapter(novelId)
  const updateMutation = useUpdateChapter(novelId, chapter?.id || '')
  const generateAudioMutation = useGenerateChapterAudio(novelId)

  // Initialize form fields
  useEffect(() => {
    if (chapter) {
      setTitle(chapter.title)
      setContent(chapter.content)
      setStatus(chapter.status)
      setChapterNumber(chapter.chapterNumber)
      setCoinPrice(chapter.coinPrice)
    }
  }, [chapter])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return

    const payload = {
      title,
      content,
      status,
      chapterNumber,
      coinPrice,
    }

    try {
      if (isEdit) {
        await updateMutation.mutateAsync(payload)
      } else {
        await createMutation.mutateAsync(payload)
      }
      navigate(`/author/novels/${novelId}`)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Lưu chương truyện thất bại')
    }
  }

  const handleGenerateAudio = async () => {
    if (!chapter) return
    try {
      await generateAudioMutation.mutateAsync(chapter.chapterNumber)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Sinh giọng đọc âm thanh thất bại')
    }
  }

  const isSaving = createMutation.isPending || updateMutation.isPending
  const isGeneratingAudio = generateAudioMutation.isPending

  return (
    <div className="space-y-8">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-outline-variant pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(`/author/novels/${novelId}`)}
            className="rounded-lg border border-outline-variant p-2 text-muted-foreground transition-all hover:bg-surface-container active:scale-95"
            title="Quay lại"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-foreground font-sans">
              {isEdit ? `Chỉnh sửa chương ${chapter?.chapterNumber}` : 'Thêm chương mới'}
            </h1>
            <p className="text-xs text-muted-foreground">
              {isEdit ? 'Chỉnh sửa tiêu đề, nội dung và cài đặt TTS cho chương' : 'Nhập nội dung cho chương truyện mới'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Editor Main */}
        <form onSubmit={handleSubmit} className="space-y-5 lg:col-span-2 rounded-xl border border-outline-variant bg-surface-container-low p-5 shadow-sm">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-foreground">Số thứ tự chương</label>
              <input
                type="number"
                min={1}
                required
                value={chapterNumber}
                onChange={e => setChapterNumber(parseInt(e.target.value) || 1)}
                className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none font-mono"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-foreground">Giá Xu (Coins)</label>
              <input
                type="number"
                min={0}
                required
                value={coinPrice}
                onChange={e => setCoinPrice(parseInt(e.target.value) || 0)}
                className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none font-mono"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-foreground">Tiêu đề chương</label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Ví dụ: Chương 1: Sự khởi đầu mới..."
              className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none font-semibold"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-foreground">Trạng thái xuất bản</label>
            <select
              value={status}
              onChange={e => setStatus(e.target.value as ChapterStatus)}
              className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
            >
              <option value="DRAFT">Bản nháp (Draft)</option>
              <option value="PUBLISHED">Công bố (Published)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-foreground">Nội dung chương</label>
            <textarea
              required
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Soạn nội dung chương truyện ở đây..."
              rows={16}
              className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-4 py-3 text-sm text-foreground font-serif leading-relaxed focus:border-primary focus:outline-none resize-y"
            />
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-bold text-on-primary shadow-sm transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Đang lưu...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" /> Lưu chương truyện
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate(`/author/novels/${novelId}`)}
              className="rounded-lg border border-outline-variant px-5 py-2.5 text-sm font-bold text-muted-foreground hover:bg-surface-container transition-all active:scale-95"
            >
              Hủy bỏ
            </button>
          </div>
        </form>

        {/* TTS Panel - Sidebar */}
        <div className="space-y-5 rounded-xl border border-outline-variant bg-surface-container-low p-5 shadow-sm h-fit">
          <div className="border-b border-outline-variant pb-3">
            <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-foreground">
              <Headphones className="h-4 w-4 text-primary" /> Audio chuyển văn bản (TTS)
            </h2>
            <p className="text-[11px] text-muted-foreground mt-1">Sinh giọng đọc nhân tạo từ nội dung văn bản của chương này</p>
          </div>

          {!isEdit ? (
            <div className="py-4 text-center text-xs text-muted-foreground bg-surface-container-lowest rounded-lg p-4 border border-outline-variant border-dashed">
              Vui lòng tạo chương truyện trước khi thiết lập và sinh giọng đọc âm thanh.
            </div>
          ) : (
            <div className="space-y-4">
              {chapter?.audioUrl ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 text-xs text-emerald-700 dark:text-emerald-400">
                    <Volume2 className="h-4 w-4 shrink-0" />
                    <span className="font-semibold">Giọng đọc đã sẵn sàng!</span>
                  </div>

                  <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-3 shadow-sm">
                    <audio src={chapter.audioUrl} controls className="w-full h-9" />
                  </div>

                  <p className="text-[10px] text-muted-foreground truncate w-full" title={chapter.audioUrl}>
                    URL: {chapter.audioUrl}
                  </p>
                </div>
              ) : (
                <div className="text-center bg-surface-container-lowest rounded-lg p-6 border border-outline-variant border-dashed">
                  <Mic className="mx-auto h-8 w-8 text-muted-foreground opacity-50 mb-2" />
                  <p className="text-xs text-muted-foreground">Chưa sinh âm thanh cho chương này.</p>
                </div>
              )}

              <button
                type="button"
                disabled={isGeneratingAudio || isSaving}
                onClick={handleGenerateAudio}
                className="w-full flex items-center justify-center gap-2 rounded-lg border border-primary text-primary bg-primary/5 py-2.5 text-xs font-bold hover:bg-primary hover:text-on-primary transition-all active:scale-95 disabled:opacity-50"
              >
                {isGeneratingAudio ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" /> Đang chuyển đổi giọng đọc...
                  </>
                ) : (
                  <>
                    <Mic className="h-3.5 w-3.5" /> {chapter?.audioUrl ? 'Sinh lại giọng đọc' : '🎙 Sinh giọng đọc'}
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
