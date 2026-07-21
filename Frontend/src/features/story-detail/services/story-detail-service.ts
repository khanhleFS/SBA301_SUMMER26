import { getPublicNovelById } from '@/services/novel-service'
import { getChaptersByNovel } from '@/services/chapter-service'

export interface StoryDetailInfo {
  id: string
  slug: string
  title: string
  author: string
  status: string
  chaptersCount: number
  views: string
  rating: number
  synopsis: string[]
  genres: string[]
  cover?: string
}

export interface ChapterItem {
  id: number
  slug: string
  title: string
  time: string
  views: string
  isLocked?: boolean
  price?: number
}

/** Extracts the numeric Long ID from the end of a slug-id string (e.g. "ten-truyen-123" → "123"). */
export function extractId(slugWithId: string): string {
  if (!slugWithId) return ''
  const parts = slugWithId.split('-')
  const last = parts[parts.length - 1]
  if (/^\d+$/.test(last)) return last
  // fallback: maybe it's already a plain id
  return slugWithId
}

export const storyDetailService = {
  getStoryInfo: async (storyId: string): Promise<StoryDetailInfo> => {
    const id = extractId(storyId)
    const novel = await getPublicNovelById(id)
    return {
      id: String(novel.id),
      slug: `${novel.slug}-${novel.id}`,
      title: novel.title,
      author: novel.authorName || 'Tác giả',
      status: novel.status,
      chaptersCount: 0, // Will be updated by chapters length
      views: (novel.viewCount || 0).toString(),
      rating: 4.8,
      synopsis: novel.description ? novel.description.split('\n') : ['Chưa có mô tả.'],
      genres: novel.categories || [],
      cover: novel.coverImageUrl || undefined
    }
  },
  
  getStoryChapters: async (storyId: string): Promise<ChapterItem[]> => {
    const id = extractId(storyId)
    const chapters = await getChaptersByNovel(id)
    return chapters.map((c) => ({
      id: c.chapterNumber,
      slug: `${c.slug}-${c.id}`,
      title: c.title,
      time: c.createdAt ? new Date(c.createdAt).toLocaleDateString('vi-VN') : 'Vừa xong',
      views: (c.viewCount || 0).toString(),
      isLocked: c.status === 'LOCKED' || c.coinPrice > 0,
      price: c.coinPrice > 0 ? c.coinPrice : undefined
    }))
  }
}


