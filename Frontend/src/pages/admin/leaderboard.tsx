import { useMemo, useState } from 'react'
import { Crown, TrendingUp, TrendingDown, Minus, BookOpen, Users, Calendar } from 'lucide-react'

type LeaderboardCategory = 'stories' | 'authors'
type TimeRange = 'monthly' | 'weekly' | 'daily'

interface BaseRank {
    rank: number
}

interface StoryItem extends BaseRank {
    title: string
    reads: string
    cover: string
    trend?: 'up' | 'down' | 'neutral'
}

interface AuthorItem extends BaseRank {
    name: string
    stat: string
    avatar: string
    badge?: boolean
    sub?: string
}

const storyPodium: StoryItem[] = [
    { rank: 1, title: 'Shadow of the Archive', reads: '128k reads', cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&auto=format&fit=crop&q=80' },
    { rank: 2, title: 'The Silent Echo', reads: '42k reads', cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&auto=format&fit=crop&q=80' },
    { rank: 3, title: 'Clockwork Crown', reads: '38k reads', cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&auto=format&fit=crop&q=80' },
]

const storyRankings: StoryItem[] = [
    { rank: 4, title: "The Alchemist's Burden", reads: '32.1k reads', trend: 'neutral', cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=100&auto=format&fit=crop&q=80' },
    { rank: 5, title: 'Beyond the Red Gate', reads: '29.4k reads', trend: 'down', cover: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=100&auto=format&fit=crop&q=80' },
    { rank: 6, title: 'Neon Monolith', reads: '27.8k reads', trend: 'up', cover: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=100&auto=format&fit=crop&q=80' },
    { rank: 7, title: 'The Glass Citadel', reads: '26.1k reads', trend: 'up', cover: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=100&auto=format&fit=crop&q=80' },
]

const authorPodium: AuthorItem[] = [
    { rank: 1, name: 'Julian Thorne', stat: '2.4m Total Views', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80', badge: true },
    { rank: 2, name: 'Elena Sterling', stat: '1.2m Total Views', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80' },
    { rank: 3, name: 'S. J. Moon', stat: '980k Total Views', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80' },
]

const authorList: AuthorItem[] = [
    { rank: 4, name: 'V. K. Vance', sub: '12 published novels', stat: '850k views', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80' },
    { rank: 5, name: 'Isabella Night', sub: '8 published novels', stat: '720k views', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80' },
    { rank: 6, name: 'Marcus Pen', sub: '15 published novels', stat: '695k views', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80' },
]

const timeChips = [
    { key: 'monthly', label: 'Monthly' },
    { key: 'weekly', label: 'Weekly' },
    { key: 'daily', label: 'Daily' },
] as const

export default function LeaderboardPage() {
    const [category, setCategory] = useState<LeaderboardCategory>('stories')
    const [timeRange, setTimeRange] = useState<TimeRange>('monthly')

    const viewData = useMemo(() => {
        const isAuth = category === 'authors'
        return {
            title: isAuth ? 'Top Authors' : 'Top Stories',
            description: isAuth ? 'Bảng xếp hạng tác giả nổi bật nhất' : 'Bảng xếp hạng các tác phẩm được đọc nhiều nhất',
            podium: isAuth ? authorPodium : storyPodium,
            list: isAuth ? authorList : storyRankings,
        }
    }, [category])

    const isAuthorView = category === 'authors'

    const getPodiumOrder = (rank: number) => {
        if (rank === 1) return 'order-2'
        if (rank === 2) return 'order-1'
        return 'order-3'
    }

    return (
        <div className="w-full max-w-6xl mx-auto space-y-6 text-foreground font-sans">

            {/* ================= HEADER & CONTROLS ================= */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-outline-variant/50">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold tracking-tight flex items-center gap-2">
                        <Crown className="w-5 h-5 text-tertiary-container fill-tertiary/20" />
                        <span className="text-gradient-animated font-bold">{viewData.title}</span>
                    </h1>
                    <p className="text-xs text-muted-foreground mt-0.5">{viewData.description}</p>
                </div>

                {/* Filters (Segmented controls styled via M3 Tokens) */}
                <div className="flex flex-wrap items-center gap-2">
                    {/* Category Switch */}
                    <div className="inline-flex p-1 bg-surface-container-lowest rounded-sm border border-outline-variant/60">
                        <button
                            onClick={() => setCategory('stories')}
                            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-sm transition-all duration-150 ${category === 'stories'
                                    ? 'bg-surface-container-low text-primary shadow-sm ring-1 ring-black/5'
                                    : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            <BookOpen className="w-3.5 h-3.5" />
                            Stories
                        </button>
                        <button
                            onClick={() => setCategory('authors')}
                            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-sm transition-all duration-150 ${category === 'authors'
                                    ? 'bg-surface-container-low text-primary shadow-sm ring-1 ring-black/5'
                                    : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            <Users className="w-3.5 h-3.5" />
                            Authors
                        </button>
                    </div>

                    {/* Time Range Chips */}
                    <div className="flex items-center gap-1 bg-surface-container-low border border-outline-variant/60 rounded-sm p-1">
                        {timeChips.map(chip => (
                            <button
                                key={chip.key}
                                onClick={() => setTimeRange(chip.key as TimeRange)}
                                className={`px-2.5 py-1 text-xs font-semibold rounded-sm transition-all ${timeRange === chip.key
                                        ? 'bg-primary text-on-primary shadow-sm'
                                        : 'text-muted-foreground hover:bg-surface-container-highest/50 hover:text-foreground'
                                    }`}
                            >
                                {chip.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ================= MAIN LAYOUT CONTAINER (FLEXBOX 2 CỘT CHUẨN) ================= */}
            <div className="flex flex-col lg:flex-row gap-6 items-start w-full">

                {/* 1. CỘT BÊN TRÁI: FIX CỨNG KÍCH THƯỚC TRÊN DESKTOP, KHÔNG CO GIÃN */}
                <div className="w-full lg:w-[410px] lg:flex-shrink-0 bg-white rounded-md border border-outline-variant/60 p-4 pt-14 shadow-sm h-[390px] relative overflow-hidden stats-glow flex items-end justify-center">

                    <div className="absolute top-3 left-3 flex items-center gap-1 text-xs font-medium text-muted-foreground bg-surface-container-lowest px-2 py-0.5 rounded-sm border border-outline-variant/40 shadow-sm z-10">
                        <Calendar className="w-3 h-3 text-primary" />
                        Top 3 {timeRange}
                    </div>

                    <div className="flex items-end gap-3 w-full justify-center">
                        {viewData.podium.map((item: any) => {
                            const isFirst = item.rank === 1
                            const isSecond = item.rank === 2

                            return (
                                <div
                                    key={item.rank}
                                    className={`flex flex-col items-center ${getPodiumOrder(item.rank)} w-[115px] flex-shrink-0`}
                                >
                                    <div className={`w-full bg-surface-container-lowest border rounded-sm overflow-hidden shadow-sm flex flex-col transition-all duration-200 group hover:border-primary/40 ${isFirst
                                            ? 'h-[280px] border-tertiary-container ring-1 ring-tertiary-container/30 shadow-md'
                                            : isSecond
                                                ? 'h-[240px] border-outline-variant/80'
                                                : 'h-[220px] border-outline-variant/60'
                                        }`}>

                                        <div className="relative w-full h-[150px] overflow-hidden bg-surface-container-high flex-shrink-0">
                                            {isFirst && (
                                                <div className="absolute top-2 left-2 z-10 drop-shadow-md animate-pulse">
                                                    <Crown className="w-4 h-4 text-tertiary-container fill-tertiary" />
                                                </div>
                                            )}
                                            <img
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
                                                src={isAuthorView ? item.avatar : item.cover}
                                                alt={isAuthorView ? item.name : item.title}
                                            />
                                            <span className={`absolute bottom-1.5 right-1.5 font-mono font-bold text-[10px] px-1.5 py-0.5 rounded-sm text-white shadow-sm tracking-tighter ${isFirst ? 'bg-primary' : isSecond ? 'bg-outline' : 'bg-on-surface-variant'
                                                }`}>
                                                #{item.rank}
                                            </span>
                                        </div>

                                        <div className="p-2 w-full flex-grow flex flex-col justify-center items-center bg-surface-container-lowest border-t border-outline-variant/30 min-w-0">
                                            <p className="font-bold text-on-surface line-clamp-2 leading-tight tracking-tight text-center w-full font-sans group-hover:text-primary transition-colors text-[11px]">
                                                {isAuthorView ? item.name : item.title}
                                            </p>
                                            <p className="text-[10px] font-medium text-muted-foreground truncate w-full text-center mt-0.5">
                                                {isAuthorView ? item.stat.split(' ')[0] : item.reads.split(' ')[0]}
                                                <span className="text-[9px] text-muted-foreground/70 font-normal ml-0.5">
                                                    {isAuthorView ? 'views' : 'reads'}
                                                </span>
                                            </p>
                                        </div>

                                        {isFirst && isAuthorView && (
                                            <div className="text-[8px] font-bold text-center tracking-wider text-tertiary bg-tertiary-container/10 py-1 border-t border-outline-variant/30 flex-shrink-0 w-full">
                                                DIAMOND
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* 2. CỘT BÊN PHẢI: TỰ ĐỘNG LẤY HẾT DIỆN TÍCH CÒN LẠI (FLEX-1) */}
                <div className="flex-1 w-full bg-white rounded-md border border-outline-variant/60 shadow-sm overflow-hidden">
                    <div className="px-4 py-2.5 bg-surface-container border-b border-outline-variant/60 flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-mono">Thứ hạng</span>
                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-mono">Chỉ số</span>
                    </div>

                    <div className="divide-y divide-outline-variant/30">
                        {viewData.list.map((item: any) => (
                            <div
                                key={item.rank}
                                className="p-3 flex items-center justify-between gap-4 transition-colors hover:bg-surface-container-low/60 group"
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <span className="text-xs font-bold text-muted-foreground w-4 text-center group-hover:text-on-surface font-mono">
                                        {item.rank}
                                    </span>

                                    <div className="overflow-hidden flex-shrink-0 bg-surface-container border border-outline-variant/40 w-8 h-11 rounded-sm">
                                        <img
                                            className="w-full h-full object-cover"
                                            src={isAuthorView ? item.avatar : item.cover}
                                            alt={isAuthorView ? item.name : item.title}
                                        />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-xs font-bold text-on-surface truncate group-hover:text-primary transition-colors">
                                            {isAuthorView ? item.name : item.title}
                                        </p>
                                        <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
                                            {isAuthorView ? item.sub : 'Truyện thịnh hành'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 flex-shrink-0 text-right">
                                    <div>
                                        <p className="text-xs font-bold text-on-surface">
                                            {isAuthorView ? item.stat.split(' ')[0] : item.reads.split(' ')[0]}
                                        </p>
                                        <p className="text-[10px] text-muted-foreground">
                                            {isAuthorView ? 'Tổng views' : 'Lượt đọc'}
                                        </p>
                                    </div>

                                    {!isAuthorView && (
                                        <div className="w-5 h-5 flex items-center justify-center rounded-sm bg-surface-container border border-outline-variant/60 shadow-sm">
                                            {item.trend === 'up' ? (
                                                <TrendingUp className="w-3 h-3 text-emerald-600" />
                                            ) : item.trend === 'down' ? (
                                                <TrendingDown className="w-3 h-3 text-rose-600" />
                                            ) : (
                                                <Minus className="w-3 h-3 text-muted-foreground/60" />
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-2.5 bg-surface-container-low/40 border-t border-outline-variant/30 text-center">
                        <button className="text-xs font-semibold text-muted-foreground hover:text-primary py-1 px-3 rounded-sm hover:bg-surface-container-high/50 transition-colors">
                            Xem toàn bộ bảng xếp hạng
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}