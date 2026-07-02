import { getPublicNovelById } from '@/services/novel-service'
import { getChaptersByNovel, getChapterDetails } from '@/services/chapter-service'

export interface ChapterSummary {
  id: number
  slug: string
  chapterNum: string
  title: string
}

export interface ChapterDetails {
  id: number
  novelId: string
  title: string
  chapterNum: string
  author: string
  words: string
  readTime: string
  cover?: string
  paragraphs: string[]
  prevChapter: string | null
  nextChapter: string | null
  audioUrl: string | null
  chaptersList?: ChapterSummary[]
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

export const readerService = {
  getChapter: async (chapterSlug: string, novelSlugWithId?: string): Promise<ChapterDetails> => {
    if (!novelSlugWithId) {
      throw new Error('Novel slug/ID is required to load chapter details')
    }
    const novelId = extractUuid(novelSlugWithId)
    const chapterId = extractUuid(chapterSlug)

    // 1. Get all chapters of the novel to find the chapter number and compute prev/next chapter slugs
    const chapters = await getChaptersByNovel(novelId)
    // Sort chapters by chapterNumber ascending just to be safe
    const sortedChapters = [...chapters].sort((a, b) => a.chapterNumber - b.chapterNumber)

    const currentChapterIndex = sortedChapters.findIndex(c => c.id === chapterId || c.slug === chapterId || `${c.slug}-${c.id}` === chapterSlug)
    if (currentChapterIndex === -1) {
      throw new Error(`Không tìm thấy chương với ID/slug: ${chapterSlug}`)
    }

    const currentChapterMeta = sortedChapters[currentChapterIndex]

    // 2. Fetch the detailed content of the current chapter
    const detail = await getChapterDetails(novelId, currentChapterMeta.chapterNumber)

    // 3. Fetch public novel details to get author and cover image
    const novel = await getPublicNovelById(novelId)

    const prevChapter = currentChapterIndex > 0 
      ? `${sortedChapters[currentChapterIndex - 1].slug}-${sortedChapters[currentChapterIndex - 1].id}` 
      : null
    const nextChapter = currentChapterIndex < sortedChapters.length - 1 
      ? `${sortedChapters[currentChapterIndex + 1].slug}-${sortedChapters[currentChapterIndex + 1].id}` 
      : null

    // Split content by paragraphs (e.g. by newlines)
    const paragraphs = detail.content ? detail.content.split('\n').filter(p => p.trim() !== '') : []

    // Estimate words and readTime
    const wordCount = detail.content ? detail.content.split(/\s+/).length : 0
    const readTimeMinutes = Math.max(1, Math.round(wordCount / 200)) // ~200 words per minute

    return {
      id: detail.chapterNumber,
      novelId: novelId,
      title: detail.title,
      chapterNum: `Chương ${detail.chapterNumber}`,
      author: novel.authorName || 'Tác giả',
      words: `${wordCount} từ`,
      readTime: `${readTimeMinutes} phút đọc`,
      cover: novel.coverImageUrl || undefined,
      paragraphs,
      prevChapter,
      nextChapter,
      audioUrl: detail.audioUrl || null,
      chaptersList: sortedChapters.map(c => ({
        id: c.chapterNumber,
        slug: `${c.slug}-${c.id}`,
        chapterNum: `Chương ${c.chapterNumber}`,
        title: c.title
      }))
    }
  }
}


