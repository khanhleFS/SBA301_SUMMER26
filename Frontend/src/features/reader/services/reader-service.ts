import { MOCK_STORIES } from '@/services/mock-data'

export interface ChapterSummary {
  id: number
  slug: string
  chapterNum: string
  title: string
}

export interface ChapterDetails {
  id: number
  title: string
  chapterNum: string
  author: string
  words: string
  readTime: string
  cover?: string
  paragraphs: string[]
  prevChapter: string | null
  nextChapter: string | null
  chaptersList?: ChapterSummary[]
}

export const readerService = {
  getChapter: (chapterId: string, novelSlug?: string): Promise<ChapterDetails> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let story = MOCK_STORIES[0]
        let chap = null

        // 1. Try to find the chapter by slug in any story
        for (const s of MOCK_STORIES) {
          const found = s.chapters.find((c) => c.slug === chapterId)
          if (found) {
            story = s
            chap = found
            break
          }
        }

        // 2. If not found by exact slug across all, but we have novelSlug, check that novel specifically
        if (!chap && novelSlug) {
          const storyIdNum = parseInt(novelSlug.split('-').pop() || '', 10)
          const foundStory = MOCK_STORIES.find((s) => s.id === storyIdNum || s.slug === novelSlug)
          if (foundStory) {
            story = foundStory
            chap = story.chapters.find((c) => c.slug === chapterId)
          }
        }

        // 3. Backwards compatibility fallback for numeric ID extraction
        if (!chap) {
          let normalizedId = chapterId
          if (chapterId === 'chapter42') {
            normalizedId = 'chapter2'
          }
          const idNum = parseInt(normalizedId.replace(/[^\d]/g, ''), 10)
          chap = story.chapters.find((c) => c.id === idNum)
        }

        if (chap) {
          resolve({
            id: chap.id,
            title: chap.title,
            chapterNum: chap.chapterNum,
            author: story.author,
            words: chap.words,
            readTime: chap.readTime,
            cover: story.imgUrl,
            paragraphs: chap.paragraphs,
            prevChapter: chap.prevChapter,
            nextChapter: chap.nextChapter,
            chaptersList: story.chapters.map(c => ({
              id: c.id,
              slug: c.slug,
              chapterNum: c.chapterNum,
              title: c.title
            }))
          })
        } else {
          reject(new Error('Chapter not found'))
        }
      }, 500)
    })
  }
}

