import { MOCK_STORIES } from '@/services/mock-db'

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
}

export const storyDetailService = {
  getStoryInfo: (storyId: string): Promise<StoryDetailInfo> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const story = MOCK_STORIES.find((s) => s.slug === storyId || s.id.toString() === storyId) || MOCK_STORIES[0]
        
        resolve({
          id: story.id.toString(),
          slug: story.slug,
          title: story.title,
          author: story.author,
          status: story.status,
          chaptersCount: story.chapters.length,
          views: story.reads,
          rating: story.rating,
          synopsis: story.synopsis,
          genres: story.genres,
          cover: story.imgUrl
        })
      }, 500)
    })
  },
  
  getStoryChapters: (storyId: string): Promise<ChapterItem[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const story = MOCK_STORIES.find((s) => s.slug === storyId || s.id.toString() === storyId) || MOCK_STORIES[0]
        
        const mappedChapters: ChapterItem[] = story.chapters.map((c) => ({
          id: c.id,
          slug: c.slug,
          title: `${c.chapterNum}: ${c.title}`,
          time: c.time,
          views: c.views
        }))
        
        resolve(mappedChapters)
      }, 500)
    })
  }
}

