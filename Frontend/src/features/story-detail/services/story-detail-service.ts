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

export function extractUuid(slugWithId: string): string {
  if (!slugWithId) return ''
  const parts = slugWithId.split('-')
  if (parts.length >= 5) {
    const possibleUuid = parts.slice(-5).join('-')
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    if (uuidRegex.test(possibleUuid)) {
      return possibleUuid
    }
  }
  return slugWithId
}

export const storyDetailService = {
  getStoryInfo: async (storyId: string): Promise<StoryDetailInfo> => {
    const uuid = extractUuid(storyId)
    const novel = await getPublicNovelById(uuid)
    return {
      id: novel.id,
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
    const uuid = extractUuid(storyId)
    const chapters = await getChaptersByNovel(uuid)
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


