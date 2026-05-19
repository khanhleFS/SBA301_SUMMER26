import { MOCK_STORIES } from '@/services/mock-db'

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
}

export const readerService = {
  getChapter: (chapterId: string): Promise<ChapterDetails> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Handle backwards compatibility for 'chapter42' which was the second chapter
        let normalizedId = chapterId
        if (chapterId === 'chapter42') {
          normalizedId = 'chapter2'
        }

        // Extract the numeric ID from the chapter string (e.g. "chapter1" -> 1, "1" -> 1)
        const idNum = parseInt(normalizedId.replace(/[^\d]/g, ''), 10)

        // Find the chapter in MOCK_STORIES[0] (our main Neon Tower story)
        const story = MOCK_STORIES[0]
        const chap = story.chapters.find((c) => c.id === idNum)

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
            nextChapter: chap.nextChapter
          })
        } else {
          reject(new Error('Chapter not found'))
        }
      }, 500)
    })
  }
}

