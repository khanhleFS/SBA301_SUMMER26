import { getPublicNovelById } from '@/services/novel-service'
import { getChaptersByNovel, getChapterDetails } from '@/services/chapter-service'
import CryptoJS from 'crypto-js'

const SECRET_KEY_STR = '12345678901234567890123456789012'

export function decryptContent(encryptedHex?: string, ivHex?: string): string {
  if (!encryptedHex || !ivHex) return ''
  try {
    const key = CryptoJS.enc.Utf8.parse(SECRET_KEY_STR)
    const iv = CryptoJS.enc.Hex.parse(ivHex)
    const encryptedBase64 = CryptoJS.enc.Hex.parse(encryptedHex).toString(CryptoJS.enc.Base64)

    const decrypted = CryptoJS.AES.decrypt(encryptedBase64, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })

    return decrypted.toString(CryptoJS.enc.Utf8)
  } catch (err) {
    console.error('Lỗi giải mã nội dung chapter:', err)
    return ''
  }
}

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
  novelTitle?: string
  chaptersList?: ChapterSummary[]
}

/** Extracts the numeric Long ID from the end of a slug-id string (e.g. "ten-truyen-123" → "123"). */
export function extractId(slugWithId: string): string {
  if (!slugWithId) return ''
  const parts = slugWithId.split('-')
  const last = parts[parts.length - 1]
  if (/^\d+$/.test(last)) return last
  return slugWithId
}

export const readerService = {
  getChapter: async (chapterSlug: string, novelSlugWithId?: string): Promise<ChapterDetails> => {
    if (!novelSlugWithId) {
      throw new Error('Novel slug/ID is required to load chapter details')
    }
    const novelId = extractId(novelSlugWithId)
    const chapterIdStr = extractId(chapterSlug)

    // 1. Get all chapters of the novel to find the chapter number and compute prev/next chapter slugs
    const chapters = await getChaptersByNovel(novelId)
    // Sort chapters by chapterNumber ascending just to be safe
    const sortedChapters = [...chapters].sort((a, b) => a.chapterNumber - b.chapterNumber)

    const currentChapterIndex = sortedChapters.findIndex(c =>
      String(c.id) === chapterIdStr ||
      c.slug === chapterSlug ||
      `${c.slug}-${c.id}` === chapterSlug
    )
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

    // Decrypt content using encryptedData + iv or fallback to plain content
    const rawText = (detail.encryptedData && detail.iv)
      ? decryptContent(detail.encryptedData, detail.iv)
      : (detail.content || '')

    // Split content by paragraphs (e.g. by newlines)
    const paragraphs = rawText ? rawText.split('\n').filter(p => p.trim() !== '') : []

    // Estimate words and readTime
    const wordCount = rawText ? rawText.split(/\s+/).length : 0
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
      novelTitle: novel.title,
      chaptersList: sortedChapters.map(c => ({
        id: c.chapterNumber,
        slug: `${c.slug}-${c.id}`,
        chapterNum: `Chương ${c.chapterNumber}`,
        title: c.title
      }))
    }
  }
}


