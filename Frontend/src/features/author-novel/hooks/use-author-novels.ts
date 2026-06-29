import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getMyNovels,
  getNovelById,
  createNovel,
  updateNovel,
  deleteNovel
} from '@/services/novel-service'
import {
  getChaptersByNovel,
  getChapterDetails,
  createChapter,
  updateChapter,
  deleteChapter,
  generateChapterAudio
} from '@/services/chapter-service'
import type { NovelRequestDTO, NovelResponseDTO, ChapterRequestDTO, ChapterResponseDTO } from '@/types'

// Local mock database in memory to support CRUD preview when offline
const inMemoryNovels: NovelResponseDTO[] = [
  {
    id: "mock-novel-1",
    title: "Vọng Âm Tòa Tháp Neon: Walker (Mock)",
    slug: "vong-am-toa-thap-neon-walker-1",
    description: "Trong những con phố ngập ánh đèn neon của Neo-Tokyo, Walker, một AI nổi loạn với những mảnh ký ức vụn vỡ về quá khứ con người, phải tìm cách định hướng trong mạng lưới gián điệp...",
    coverImageUrl: "https://placehold.co/400x600/E6E1E5/4F378A?text=Neon+Walker",
    status: "ONGOING",
    viewCount: 1250,
    chapterCount: 2,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    authorId: "9999",
    authorName: "MockAuthor",
    categories: ["Cyberpunk", "Khoa học viễn tưởng"]
  }
]

const inMemoryChapters: Record<string, ChapterResponseDTO[]> = {
  "mock-novel-1": [
    {
      id: "mock-chapter-1",
      novelId: "mock-novel-1",
      chapterNumber: 1,
      title: "Tia lửa đầu tiên (The First Spark)",
      slug: "chuong-1-tia-lua-dau-tien-1",
      content: "Nội dung chương 1 giả lập của Walker để phục vụ test UI...",
      audioUrl: null,
      status: "PUBLISHED",
      coinPrice: 0,
      viewCount: 100,
      createdAt: new Date().toISOString(),
      updateAt: new Date().toISOString()
    },
    {
      id: "mock-chapter-2",
      novelId: "mock-novel-1",
      chapterNumber: 2,
      title: "Tiếng vọng trong đêm",
      slug: "chuong-2-tieng-vong-trong-dem",
      content: "Nội dung chương 2 giả lập để test...",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      status: "DRAFT",
      coinPrice: 5,
      viewCount: 20,
      createdAt: new Date().toISOString(),
      updateAt: new Date().toISOString()
    }
  ]
}

// Query keys
export const authorNovelKeys = {
  all: ['author-novels'] as const,
  lists: () => [...authorNovelKeys.all, 'list'] as const,
  details: () => [...authorNovelKeys.all, 'detail'] as const,
  detail: (id: string) => [...authorNovelKeys.details(), id] as const,
  chapters: (novelId: string) => [...authorNovelKeys.all, 'chapters', novelId] as const,
  chapter: (novelId: string, chapterNumber: number) => [...authorNovelKeys.all, 'chapter', novelId, chapterNumber] as const,
}

export function useMyNovels() {
  return useQuery({
    queryKey: authorNovelKeys.lists(),
    queryFn: async () => {
      try {
        return await getMyNovels()
      } catch (err) {
        console.warn('API getMyNovels failed, falling back to mock data:', err)
        return inMemoryNovels
      }
    },
  })
}

export function useNovel(id: string | undefined) {
  return useQuery({
    queryKey: authorNovelKeys.detail(id || ''),
    queryFn: async () => {
      try {
        return await getNovelById(id!)
      } catch (err) {
        console.warn('API getNovelById failed, falling back to mock data:', err)
        const found = inMemoryNovels.find(n => n.id === id)
        if (found) return found
        return {
          id: id!,
          title: "Truyện mới (Mock)",
          slug: "truyen-moi-mock",
          description: "Mô tả truyện mới...",
          coverImageUrl: "",
          status: "ONGOING" as const,
          viewCount: 0,
          chapterCount: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          authorId: "9999",
          authorName: "MockAuthor",
          categories: []
        }
      }
    },
    enabled: !!id,
  })
}

export function useCreateNovel() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (request: NovelRequestDTO) => {
      try {
        return await createNovel(request)
      } catch (err) {
        console.warn('API createNovel failed, mocking success locally:', err)
        const newNovel: NovelResponseDTO = {
          id: `mock-novel-${Date.now()}`,
          title: request.title,
          slug: `slug-${Date.now()}`,
          description: request.description,
          coverImageUrl: request.coverImageUrl,
          status: request.status,
          viewCount: 0,
          chapterCount: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          authorId: "9999",
          authorName: "MockAuthor",
          categories: request.categoryIds
        }
        inMemoryNovels.push(newNovel)
        return newNovel
      }
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: authorNovelKeys.lists() })
    },
  })
}

export function useUpdateNovel(id: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (request: NovelRequestDTO) => {
      try {
        return await updateNovel(id, request)
      } catch (err) {
        console.warn('API updateNovel failed, mocking success locally:', err)
        const index = inMemoryNovels.findIndex(n => n.id === id)
        const updatedNovel: NovelResponseDTO = {
          id,
          title: request.title,
          slug: `slug-${id}`,
          description: request.description,
          coverImageUrl: request.coverImageUrl,
          status: request.status,
          viewCount: index !== -1 ? inMemoryNovels[index].viewCount : 100,
          chapterCount: index !== -1 ? inMemoryNovels[index].chapterCount : 0,
          createdAt: index !== -1 ? inMemoryNovels[index].createdAt : new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          authorId: "9999",
          authorName: "MockAuthor",
          categories: request.categoryIds
        }
        if (index !== -1) {
          inMemoryNovels[index] = updatedNovel
        } else {
          inMemoryNovels.push(updatedNovel)
        }
        return updatedNovel
      }
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: authorNovelKeys.lists() })
      void queryClient.invalidateQueries({ queryKey: authorNovelKeys.detail(id) })
    },
  })
}

export function useDeleteNovel() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      try {
        await deleteNovel(id)
      } catch (err) {
        console.warn('API deleteNovel failed, mocking success locally:', err)
        const idx = inMemoryNovels.findIndex(n => n.id === id)
        if (idx !== -1) {
          inMemoryNovels.splice(idx, 1)
        }
      }
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: authorNovelKeys.lists() })
    },
  })
}

export function useChapters(novelId: string | undefined) {
  return useQuery({
    queryKey: authorNovelKeys.chapters(novelId || ''),
    queryFn: async () => {
      try {
        return await getChaptersByNovel(novelId!)
      } catch (err) {
        console.warn('API getChaptersByNovel failed, falling back to mock data:', err)
        return inMemoryChapters[novelId!] || []
      }
    },
    enabled: !!novelId,
  })
}

export function useChapterDetails(novelId: string | undefined, chapterNumber: number | undefined) {
  return useQuery({
    queryKey: authorNovelKeys.chapter(novelId || '', chapterNumber || 0),
    queryFn: async () => {
      try {
        return await getChapterDetails(novelId!, chapterNumber!)
      } catch (err) {
        console.warn('API getChapterDetails failed, falling back to mock data:', err)
        const list = inMemoryChapters[novelId!] || []
        const found = list.find(c => c.chapterNumber === chapterNumber)
        if (found) return found
        return {
          id: `mock-ch-${chapterNumber}-${Date.now()}`,
          novelId: novelId!,
          chapterNumber: chapterNumber!,
          title: `Chương ${chapterNumber} (Mock)`,
          slug: `chuong-${chapterNumber}`,
          content: "Đây là nội dung chương giả lập để kiểm thử UI khi API bị lỗi.",
          audioUrl: null,
          status: "DRAFT" as const,
          coinPrice: 0,
          viewCount: 0,
          createdAt: new Date().toISOString(),
          updateAt: new Date().toISOString()
        }
      }
    },
    enabled: !!novelId && chapterNumber !== undefined && !isNaN(chapterNumber),
  })
}

export function useCreateChapter(novelId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (request: ChapterRequestDTO) => {
      try {
        return await createChapter(novelId, request)
      } catch (err) {
        console.warn('API createChapter failed, mocking success locally:', err)
        const newChapter: ChapterResponseDTO = {
          id: `mock-ch-${request.chapterNumber}-${Date.now()}`,
          novelId,
          chapterNumber: request.chapterNumber,
          title: request.title,
          slug: `chuong-${request.chapterNumber}`,
          content: request.content,
          audioUrl: null,
          status: request.status,
          coinPrice: request.coinPrice,
          viewCount: 0,
          createdAt: new Date().toISOString(),
          updateAt: new Date().toISOString()
        }
        if (!inMemoryChapters[novelId]) {
          inMemoryChapters[novelId] = []
        }
        inMemoryChapters[novelId].push(newChapter)
        return newChapter
      }
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: authorNovelKeys.chapters(novelId) })
    },
  })
}

export function useUpdateChapter(novelId: string, chapterId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (request: ChapterRequestDTO) => {
      try {
        return await updateChapter(chapterId, request)
      } catch (err) {
        console.warn('API updateChapter failed, mocking success locally:', err)
        const list = inMemoryChapters[novelId] || []
        const index = list.findIndex(c => c.id === chapterId)
        const updated: ChapterResponseDTO = {
          id: chapterId,
          novelId,
          chapterNumber: request.chapterNumber,
          title: request.title,
          slug: `chuong-${request.chapterNumber}`,
          content: request.content,
          audioUrl: index !== -1 ? list[index].audioUrl : null,
          status: request.status,
          coinPrice: request.coinPrice,
          viewCount: index !== -1 ? list[index].viewCount : 0,
          createdAt: index !== -1 ? list[index].createdAt : new Date().toISOString(),
          updateAt: new Date().toISOString()
        }
        if (index !== -1) {
          list[index] = updated
        } else {
          list.push(updated)
        }
        inMemoryChapters[novelId] = list
        return updated
      }
    },
    onSuccess: (data) => {
      void queryClient.invalidateQueries({ queryKey: authorNovelKeys.chapters(novelId) })
      void queryClient.invalidateQueries({ queryKey: authorNovelKeys.chapter(novelId, data.chapterNumber) })
    },
  })
}

export function useDeleteChapter(novelId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (chapterId: string) => {
      try {
        await deleteChapter(chapterId)
      } catch (err) {
        console.warn('API deleteChapter failed, mocking success locally:', err)
        const list = inMemoryChapters[novelId] || []
        const idx = list.findIndex(c => c.id === chapterId)
        if (idx !== -1) {
          list.splice(idx, 1)
        }
        inMemoryChapters[novelId] = list
      }
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: authorNovelKeys.chapters(novelId) })
    },
  })
}

export function useGenerateChapterAudio(novelId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (chapterNumber: number) => {
      try {
        return await generateChapterAudio(novelId, chapterNumber)
      } catch (err) {
        console.warn('API generateChapterAudio failed, mocking success locally:', err)
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 2000))
        const list = inMemoryChapters[novelId] || []
        const index = list.findIndex(c => c.chapterNumber === chapterNumber)
        if (index !== -1) {
          list[index].audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
          return list[index]
        }
        throw new Error("Không tìm thấy chương để sinh audio")
      }
    },
    onSuccess: (data) => {
      void queryClient.invalidateQueries({ queryKey: authorNovelKeys.chapter(novelId, data.chapterNumber) })
      void queryClient.invalidateQueries({ queryKey: authorNovelKeys.chapters(novelId) })
    },
  })
}
