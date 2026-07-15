export interface ChapterStatItem {
  chapterNumber: number
  title: string
  viewCount: number
  revenue: number // coins earned
  conversionRate: number // percentage
  status: 'FREE' | 'VIP'
}

export interface NovelStatSummary {
  id: string
  title: string
  coverImageUrl?: string
  totalViews: number
  totalRevenue: number
  avgConversionRate: number
  chapters: ChapterStatItem[]
}

const MOCK_STATS_DATA: Record<string, NovelStatSummary> = {
  'novel-1': {
    id: 'novel-1',
    title: 'Đấu Phá Thương Khung',
    coverImageUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200&auto=format&fit=crop&q=80',
    totalViews: 145200,
    totalRevenue: 2840,
    avgConversionRate: 64.2,
    chapters: [
      { chapterNumber: 1, title: 'Chương 1: Dược Lão xuất thế', viewCount: 25000, revenue: 0, conversionRate: 100, status: 'FREE' },
      { chapterNumber: 2, title: 'Chương 2: Đấu Khí Đại Địa', viewCount: 23500, revenue: 0, conversionRate: 100, status: 'FREE' },
      { chapterNumber: 3, title: 'Chương 3: Tiêu Gia phế vật', viewCount: 22000, revenue: 0, conversionRate: 100, status: 'FREE' },
      { chapterNumber: 4, title: 'Chương 4: Gia tộc khảo nghiệm', viewCount: 20500, revenue: 0, conversionRate: 100, status: 'FREE' },
      { chapterNumber: 5, title: 'Chương 5: Đột phá Đấu Giả (VIP)', viewCount: 15400, revenue: 770, conversionRate: 75.1, status: 'VIP' },
      { chapterNumber: 6, title: 'Chương 6: Hấp thu Dị Hỏa (VIP)', viewCount: 13800, revenue: 690, conversionRate: 89.6, status: 'VIP' },
      { chapterNumber: 7, title: 'Chương 7: Vân Lam Tông đại chiến (VIP)', viewCount: 13000, revenue: 650, conversionRate: 94.2, status: 'VIP' },
      { chapterNumber: 8, title: 'Chương 8: Hẹn ước 3 năm (VIP)', viewCount: 12000, revenue: 730, conversionRate: 92.3, status: 'VIP' },
    ]
  },
  'novel-2': {
    id: 'novel-2',
    title: 'Phàm Nhân Tu Tiên',
    coverImageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&auto=format&fit=crop&q=80',
    totalViews: 98000,
    totalRevenue: 1950,
    avgConversionRate: 58.7,
    chapters: [
      { chapterNumber: 1, title: 'Chương 1: Mộc sơn hài tử', viewCount: 18000, revenue: 0, conversionRate: 100, status: 'FREE' },
      { chapterNumber: 2, title: 'Chương 2: Thất Huyền Môn', viewCount: 16500, revenue: 0, conversionRate: 100, status: 'FREE' },
      { chapterNumber: 3, title: 'Chương 3: Thần bí bình nhỏ', viewCount: 15000, revenue: 0, conversionRate: 100, status: 'FREE' },
      { chapterNumber: 4, title: 'Chương 4: Trướng khí nhập cốc', viewCount: 14000, revenue: 0, conversionRate: 100, status: 'FREE' },
      { chapterNumber: 5, title: 'Chương 5: Sơ lộ phong mang (VIP)', viewCount: 9200, revenue: 460, conversionRate: 65.7, status: 'VIP' },
      { chapterNumber: 6, title: 'Chương 6: Huyết Cấm Thí Luyện (VIP)', viewCount: 8800, revenue: 440, conversionRate: 95.6, status: 'VIP' },
      { chapterNumber: 7, title: 'Chương 7: Trúc Cơ đan dược (VIP)', viewCount: 8500, revenue: 425, conversionRate: 96.5, status: 'VIP' },
      { chapterNumber: 8, title: 'Chương 8: Tiến nhập Hoàng Phong Cốc (VIP)', viewCount: 8000, revenue: 625, conversionRate: 94.1, status: 'VIP' },
    ]
  },
  'novel-3': {
    id: 'novel-3',
    title: 'Vũ Động Càn Khôn',
    coverImageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=200&auto=format&fit=crop&q=80',
    totalViews: 45000,
    totalRevenue: 0,
    avgConversionRate: 0,
    chapters: [
      { chapterNumber: 1, title: 'Chương 1: Lâm gia củi mục', viewCount: 12000, revenue: 0, conversionRate: 100, status: 'FREE' },
      { chapterNumber: 2, title: 'Chương 2: Thần bí Thạch Phù', viewCount: 11000, revenue: 0, conversionRate: 100, status: 'FREE' },
      { chapterNumber: 3, title: 'Chương 3: Thần bí chất lỏng', viewCount: 10000, revenue: 0, conversionRate: 100, status: 'FREE' },
      { chapterNumber: 4, title: 'Chương 4: Gia tộc đối kháng', viewCount: 9000, revenue: 0, conversionRate: 100, status: 'FREE' },
      { chapterNumber: 5, title: 'Chương 5: Rèn luyện nhục thân', viewCount: 3000, revenue: 0, conversionRate: 100, status: 'FREE' },
    ]
  }
}

export async function fetchAuthorNovelsSummary(): Promise<{ id: string; title: string; coverImageUrl?: string }[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        Object.values(MOCK_STATS_DATA).map(({ id, title, coverImageUrl }) => ({
          id,
          title,
          coverImageUrl
        }))
      )
    }, 400)
  })
}

export async function fetchNovelStats(novelId: string): Promise<NovelStatSummary | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_STATS_DATA[novelId] || null)
    }, 500)
  })
}
