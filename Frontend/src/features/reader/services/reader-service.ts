import { getPublicNovelById } from '@/services/novel-service'
import { getChaptersByNovel, getChapterDetails } from '@/services/chapter-service'
import CryptoJS from 'crypto-js'

import { useAuthStore } from '@/store/auth.store'

export function getJwtUserIdentifier(): string {
  try {
    const authState = useAuthStore.getState()
    if (authState.isAuthenticated && authState.user && authState.user.email) {
      return authState.user.email
    }
    const token = authState.token || (typeof window !== 'undefined' ? (localStorage.getItem('accessToken') || localStorage.getItem('token')) : null)
    if (token && token.includes('.')) {
      const payloadBase64 = token.split('.')[1]
      const payloadJson = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'))
      const payload = JSON.parse(payloadJson)
      if (payload && (payload.sub || payload.email)) {
        return payload.sub || payload.email
      }
    }
  } catch (e) {}
  return 'GUEST_JWT'
}

export function deriveDynamicKey(novelId: string | number, chapterNumber: string | number, ivHex: string) {
  const userIdentifier = getJwtUserIdentifier()
  const contextId = `${userIdentifier}:novel:${novelId}:chapter:${chapterNumber}`
  const seed = `${contextId}:${ivHex}`
  return CryptoJS.SHA256(seed)
}

export function decryptContent(encryptedHex?: string, ivHex?: string, novelId?: string | number, chapterNumber?: string | number): string {
  if (!encryptedHex || !ivHex || !novelId || !chapterNumber) return ''
  try {
    const key = deriveDynamicKey(novelId, chapterNumber, ivHex)
    const iv = CryptoJS.enc.Hex.parse(ivHex)
    const cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Hex.parse(encryptedHex)
    })

    const decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
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

    // Decrypt content using encryptedData + iv or fallback to plain content
    const rawText = (detail.encryptedData && detail.iv)
      ? decryptContent(detail.encryptedData, detail.iv, detail.novelId, detail.chapterNumber)
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
      chaptersList: sortedChapters.map(c => ({
        id: c.chapterNumber,
        slug: `${c.slug}-${c.id}`,
        chapterNum: `Chương ${c.chapterNumber}`,
        title: c.title
      }))
    }
  }
}


