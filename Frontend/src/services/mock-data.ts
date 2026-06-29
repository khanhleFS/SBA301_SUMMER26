import { Banknote, ReceiptText, TrendingUp, type LucideIcon } from 'lucide-react'
import type { ProfileData } from '@/features/profile/types/profile.types'

export const PLACEHOLDER_COVER = 'https://placehold.co/400x600/E6E1E5/4F378A?text=No+Cover'
export const PLACEHOLDER_AVATAR = 'https://placehold.co/300x300/E6E1E5/4F378A?text=Avatar'

export interface FilterOption {
  label: string
  value: string
}

export interface FilterGroup {
  id: string
  title: string
  type: 'pills' | 'grid-2' | 'grid-3'
  options: FilterOption[]
}

export interface MockChapter {
  id: number
  slug: string
  chapterNum: string
  title: string
  views: string
  time: string
  words: string
  readTime: string
  paragraphs: string[]
  prevChapter: string | null
  nextChapter: string | null
}

export interface MockStory {
  id: number
  slug: string
  title: string
  author: string
  status: 'Ongoing' | 'Completed'
  genres: string[]
  imgUrl?: string
  reads: string
  publishTime: string
  rating: number
  synopsis: string[]
  chaptersCount: number
  chapters: MockChapter[]
}

export interface UserReadState {
  bookmarks: Record<string | number, number>
  unlockedChapters: Record<string | number, number[]>
}

export interface KpiData {
  id: number
  title: string
  subtitle: string
  amount: string
  growth: string
  actionText: string
  isPrimary: boolean
  icon: LucideIcon
}

export interface CashFlowItem {
  label: string
  value: number
}

export interface DepositItem {
  user: string
  method: string
  amount: number
  status: 'success' | 'pending'
  time: string
}

export interface PackageTier {
  id: number
  name: string
  price: number
  coin: number
  bonus: number
  isPopular?: boolean
}

export interface FinanceData {
  kpiData: KpiData[]
  cashFlow: CashFlowItem[]
  recentDeposits: DepositItem[]
  packageTiers: PackageTier[]
}

export interface StoryItem {
  rank: number
  title: string
  reads: string
  cover: string
  trend?: 'up' | 'down' | 'neutral'
}

export interface AuthorItem {
  rank: number
  name: string
  stat: string
  avatar: string
  badge?: boolean
  sub?: string
}

export interface LeaderboardData {
  storyPodium: StoryItem[]
  storyRankings: StoryItem[]
  authorPodium: AuthorItem[]
  authorList: AuthorItem[]
}

export interface DashboardData {
  chartData: number[]
  platformNet: number
  userPulse: {
    readersOnline: number
    newSignupsToday: number
    totalNovels: number
    totalCategories: number
  }
  recentTransactions: {
    id: string
    user: string
    method: string
    amount: number
    time: string
    status: 'success' | 'pending'
  }[]
  packageTiers: PackageTier[]
}

export const MOCK_FILTER_REGISTRY: Record<string, FilterGroup[]> = {
  search: [
    {
      id: 'category',
      title: 'Thể loại',
      type: 'pills',
      options: [
        { label: 'Tất cả thể loại', value: 'Tất cả thể loại' },
        { label: 'Hành động', value: 'Hành động' },
        { label: 'Hài hước', value: 'Hài hước' },
        { label: 'Drama', value: 'Drama' },
        { label: 'Kỳ ảo', value: 'Kỳ ảo' },
        { label: 'Khoa học viễn tưởng', value: 'Khoa học viễn tưởng' },
        { label: 'Lãng mạn', value: 'Lãng mạn' },
      ],
    },
    {
      id: 'chapters',
      title: 'Chương hiện tại',
      type: 'grid-2',
      options: [
        { label: 'Tất cả', value: 'Any' },
        { label: 'Chương 5+', value: '5' },
        { label: 'Chương 10+', value: '10' },
        { label: 'Chương 20+', value: '20' },
      ],
    },
    {
      id: 'status',
      title: 'Trạng thái',
      type: 'grid-3',
      options: [
        { label: 'Tất cả', value: 'All' },
        { label: 'Đang ra', value: 'Ongoing' },
        { label: 'Hoàn thành', value: 'Completed' },
      ],
    },
  ],
  homepage: [
    {
      id: 'sort',
      title: 'Sắp xếp theo',
      type: 'pills',
      options: [
        { label: 'Thịnh hành', value: 'trending' },
        { label: 'Mới cập nhật', value: 'new' },
        { label: 'Đọc nhiều nhất', value: 'reads' },
      ],
    },
  ],
}

export const MOCK_USER_READ_STATE: UserReadState = {
  bookmarks: {
    1: 3,
    2: 7,
  },
  unlockedChapters: {
    1: [3, 4, 5],
    2: [3, 4, 5, 6, 7],
  },
}

export const MOCK_STORIES: MockStory[] = [
  {
    id: 1,
    slug: 'vong-am-toa-thap-neon-walker-1',
    title: 'Vọng Âm Tòa Tháp Neon: Walker',
    reads: '1.2k lượt đọc',
    publishTime: '1 giờ trước',
    author: 'Jaxon Vance',
    genres: ['Khoa học viễn tưởng', 'Cyberpunk', 'Bí ẩn'],
    status: 'Ongoing',
    rating: 4.8,
    imgUrl: PLACEHOLDER_COVER,
    synopsis: [
      'Trong những con phố ngập ánh đèn neon của Neo-Tokyo, nơi các nâng cấp điều khiển sinh học phổ biến như nước mưa, một tiếng vọng mới đang vang lên qua các tòa tháp cao vút.',
      'Walker, một AI nổi loạn với những mảnh ký ức vụn vỡ về quá khứ con người, phải tìm cách định hướng trong mạng lưới gián điệp tập đoàn đầy nguy hiểm để tìm ra sự thật về sự tồn tại của mình.',
    ],
    chaptersCount: 5,
    chapters: [
      {
        id: 1,
        slug: 'chuong-1-tia-lua-dau-tien-1',
        chapterNum: 'Chương 1',
        title: 'Tia lửa đầu tiên (The First Spark)',
        views: '12k',
        time: '5 ngày trước',
        words: '2.1k từ',
        readTime: '10 phút đọc',
        paragraphs: [],
        prevChapter: null,
        nextChapter: 'chuong-2-tieng-vong-cua-nhung-nguoi-det-anh-sao-2',
      },
    ],
  },
  {
    id: 2,
    slug: 'vong-am-thuy-trieu-hu-khong-petals-2',
    title: 'Vọng Âm Thủy Triều Hư Không: Petals',
    reads: '840 lượt đọc',
    publishTime: '4 giờ trước',
    author: 'Lyra Thorn',
    genres: ['Kỳ ảo', 'Hành động', 'Lãng mạn'],
    status: 'Ongoing',
    rating: 4.6,
    imgUrl: PLACEHOLDER_COVER,
    synopsis: [
      'Tại biên giới nơi thế giới loài người giao thoa với đại dương Hư Không, những bông hoa cánh bạc kỳ lạ bắt đầu nở rộ.',
      'Lyra Thorn, một nữ chiến binh có khả năng điều khiển thủy triều, phải hợp tác với hoàng tử bị trục xuất của vương quốc Hư Không để ngăn chặn thảm họa diệt thế.',
    ],
    chaptersCount: 2,
    chapters: [
      {
        id: 1,
        slug: 'chuong-1-canh-hoa-bac-tren-song-du-1',
        chapterNum: 'Chương 1',
        title: 'Cánh hoa bạc trên sóng dữ',
        views: '5k',
        time: '2 ngày trước',
        words: '1.9k từ',
        readTime: '9 phút đọc',
        paragraphs: [],
        prevChapter: null,
        nextChapter: 'chuong-2-loi-the-bien-ca-2',
      },
      {
        id: 2,
        slug: 'chuong-2-loi-the-bien-ca-2',
        chapterNum: 'Chương 2',
        title: 'Lời thề biển cả',
        views: '4k',
        time: '1 ngày trước',
        words: '2.1k từ',
        readTime: '10 phút đọc',
        paragraphs: [],
        prevChapter: 'chuong-1-canh-hoa-bac-tren-song-du-1',
        nextChapter: null,
      },
    ],
  },
]

export const MOCK_PROFILE_DATA: ProfileData = {
  user: {
    id: 'usr-001',
    displayName: 'Elaris Thorne',
    username: '@elaris_thorne',
    email: 'elaris.t@luminovels.com',
    avatarUrl: PLACEHOLDER_AVATAR,
    memberSince: 'Tháng 10 2023',
    isVerified: true,
  },
  wallet: {
    balance: 500.0,
    currency: 'Lumi Coins',
  },
  transactions: [],
  collections: [],
}

export const MOCK_DASHBOARD_DATA: DashboardData = {
  chartData: [18, 24, 16, 29, 31, 28, 40, 36, 45, 38, 52, 49],
  platformNet: 12543.5 * 0.25,
  userPulse: {
    readersOnline: 84,
    newSignupsToday: 128,
    totalNovels: 342,
    totalCategories: 18,
  },
  recentTransactions: [
    { id: 't1', user: '@docgia_01', method: 'Chuyển khoản Ngân hàng', amount: 100000, time: 'Vừa xong', status: 'success' },
    { id: 't2', user: '@nguyenvanA', method: 'Ví MoMo', amount: 50000, time: '3 phút trước', status: 'success' },
    { id: 't3', user: '@bookworm99', method: 'Chuyển khoản Ngân hàng', amount: 200000, time: '12 phút trước', status: 'success' },
  ],
  packageTiers: [
    { id: 1, name: 'Gói Tân Thủ', price: 20, coin: 200, bonus: 0 },
    { id: 2, name: 'Gói Tiêu Chuẩn', price: 50, coin: 500, bonus: 50 },
    { id: 3, name: 'Gói Đam Mê', price: 100, coin: 1000, bonus: 150, isPopular: true },
    { id: 4, name: 'Gói Tích Lũy', price: 200, coin: 2000, bonus: 400 },
    { id: 5, name: 'Gói Tiên Tôn', price: 500, coin: 5000, bonus: 1200 },
  ],
}

export const MOCK_FINANCE_DATA: FinanceData = {
  kpiData: [
    {
      id: 1,
      title: 'Tổng doanh thu',
      subtitle: 'Coin user đã tiêu thụ',
      amount: '125.500.000 ₫',
      growth: '+15.2%',
      actionText: 'Xem dòng tiền vào',
      isPrimary: true,
      icon: Banknote,
    },
    {
      id: 2,
      title: 'Tổng chi phí',
      subtitle: 'Tác giả (Royalty) & Vận hành',
      amount: '85.200.000 ₫',
      growth: '+2.1%',
      actionText: 'Báo cáo chi phí',
      isPrimary: false,
      icon: ReceiptText,
    },
    {
      id: 3,
      title: 'Lợi nhuận ròng',
      subtitle: 'Doanh thu - Chi phí',
      amount: '40.300.000 ₫',
      growth: '+8.7%',
      actionText: 'Phân tích lợi nhuận',
      isPrimary: false,
      icon: TrendingUp,
    },
  ],
  cashFlow: [
    { label: 'T2', value: 1200000 },
    { label: 'T3', value: 850000 },
    { label: 'T4', value: 2400000 },
    { label: 'T5', value: 1500000 },
    { label: 'T6', value: 3100000 },
    { label: 'T7', value: 2800000 },
    { label: 'CN', value: 1900000 },
  ],
  recentDeposits: [
    { user: '@docgia_01', method: 'Bank transfer', amount: 100000, status: 'success', time: 'Vừa xong' },
    { user: '@nguyenvanA', method: 'MoMo', amount: 50000, status: 'success', time: '3 phút trước' },
    { user: '@bookworm99', method: 'Bank transfer', amount: 200000, status: 'pending', time: '12 phút trước' },
    { user: '@hannahreads', method: 'ZaloPay', amount: 75000, status: 'success', time: '18 phút trước' },
  ],
  packageTiers: [
    { id: 1, name: 'Gói Tân Thủ', price: 20, coin: 200, bonus: 0 },
    { id: 2, name: 'Gói Tiêu Chuẩn', price: 50, coin: 500, bonus: 50 },
    { id: 3, name: 'Gói Đam Mê', price: 100, coin: 1000, bonus: 150, isPopular: true },
    { id: 4, name: 'Gói Tích Lũy', price: 200, coin: 2000, bonus: 400 },
    { id: 5, name: 'Gói Tiên Tôn', price: 500, coin: 5000, bonus: 1200 },
  ],
}

export const MOCK_LEADERBOARD_DATA: LeaderboardData = {
  storyPodium: [
    { rank: 1, title: 'Shadow of the Archive', reads: '128k reads', cover: PLACEHOLDER_COVER },
    { rank: 2, title: 'The Silent Echo', reads: '42k reads', cover: PLACEHOLDER_COVER },
    { rank: 3, title: 'Clockwork Crown', reads: '38k reads', cover: PLACEHOLDER_COVER },
  ],
  storyRankings: [
    { rank: 4, title: "The Alchemist's Burden", reads: '32.1k reads', trend: 'neutral', cover: PLACEHOLDER_COVER },
    { rank: 5, title: 'Beyond the Red Gate', reads: '29.4k reads', trend: 'down', cover: PLACEHOLDER_COVER },
    { rank: 6, title: 'Neon Monolith', reads: '27.8k reads', trend: 'up', cover: PLACEHOLDER_COVER },
    { rank: 7, title: 'The Glass Citadel', reads: '26.1k reads', trend: 'up', cover: PLACEHOLDER_COVER },
  ],
  authorPodium: [
    { rank: 1, name: 'Julian Thorne', stat: '2.4m Total Views', avatar: PLACEHOLDER_AVATAR, badge: true },
    { rank: 2, name: 'Elena Sterling', stat: '1.2m Total Views', avatar: PLACEHOLDER_AVATAR },
    { rank: 3, name: 'S. J. Moon', stat: '980k Total Views', avatar: PLACEHOLDER_AVATAR },
  ],
  authorList: [
    { rank: 4, name: 'V. K. Vance', sub: '12 published novels', stat: '850k views', avatar: PLACEHOLDER_AVATAR },
    { rank: 5, name: 'Isabella Night', sub: '8 published novels', stat: '720k views', avatar: PLACEHOLDER_AVATAR },
    { rank: 6, name: 'Marcus Pen', sub: '15 published novels', stat: '695k views', avatar: PLACEHOLDER_AVATAR },
  ],
}