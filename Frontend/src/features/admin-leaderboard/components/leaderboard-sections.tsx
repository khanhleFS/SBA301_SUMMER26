import { Crown, TrendingUp, TrendingDown, Minus, BookOpen, Users, Calendar } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { LeaderboardData, AuthorItem, StoryItem } from '../../../services/mock-data'

type LeaderboardCategory = 'stories' | 'authors'
type TimeRange = 'monthly' | 'weekly' | 'daily'

const timeChips = [
  { key: 'monthly', label: 'Monthly' },
  { key: 'weekly', label: 'Weekly' },
  { key: 'daily', label: 'Daily' },
] as const

export function LeaderboardContentSection({ data }: { data: LeaderboardData }) {
  const [category, setCategory] = useState<LeaderboardCategory>('stories')
  const [timeRange, setTimeRange] = useState<TimeRange>('monthly')

  const viewData = useMemo(() => {
    const isAuth = category === 'authors'
    return {
      title: isAuth ? 'Top Authors' : 'Top Stories',
      description: isAuth ? 'Bảng xếp hạng tác giả nổi bật nhất' : 'Bảng xếp hạng các tác phẩm được đọc nhiều nhất',
      podium: isAuth ? data.authorPodium : data.storyPodium,
      list: isAuth ? data.authorList : data.storyRankings,
    }
  }, [category, data])

  const isAuthorView = category === 'authors'

  const getPodiumOrder = (rank: number) => {
    if (rank === 1) return 'order-2'
    if (rank === 2) return 'order-1'
    return 'order-3'
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 font-sans text-foreground">
      <div className="flex flex-col gap-4 border-b border-outline-variant/50 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-xl font-bold tracking-tight md:text-2xl">
            <span className="font-bold">{viewData.title}</span>
          </h1>
          <p className="mt-0.5 text-xs text-muted-foreground">{viewData.description}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-sm border border-outline-variant/60 bg-surface-container-lowest p-1">
            <button onClick={() => setCategory('stories')} className={`flex items-center gap-1.5 rounded-sm px-3 py-1 text-xs font-semibold transition-all duration-150 ${category === 'stories' ? 'bg-primary text-on-primary shadow-sm ring-1 ring-black/5' : 'text-muted-foreground hover:text-foreground'}`}>
              <BookOpen className="h-3.5 w-3.5" /> Stories
            </button>
            <button onClick={() => setCategory('authors')} className={`flex items-center gap-1.5 rounded-sm px-3 py-1 text-xs font-semibold transition-all duration-150 ${category === 'authors' ? 'bg-primary text-on-primary shadow-sm ring-1 ring-black/5' : 'text-muted-foreground hover:text-foreground'}`}>
              <Users className="h-3.5 w-3.5" /> Authors
            </button>
          </div>

          <div className="flex items-center gap-1 rounded-sm border border-outline-variant/60 bg-surface-container-low p-1">
            {timeChips.map((chip) => (
              <button
                key={chip.key}
                onClick={() => setTimeRange(chip.key as TimeRange)}
                className={`rounded-sm px-2.5 py-1 text-xs font-semibold transition-all ${timeRange === chip.key ? 'bg-primary text-on-primary shadow-sm' : 'text-muted-foreground hover:bg-surface-container-highest/50 hover:text-foreground'}`}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-6 lg:flex-row lg:items-start">
        <div className="relative flex h-[390px] w-full justify-center overflow-hidden rounded-md border border-outline-variant/60 bg-white p-4 pt-14 shadow-sm stats-glow lg:w-[410px] lg:flex-shrink-0">
          <div className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-sm border border-outline-variant/40 bg-surface-container-lowest px-2 py-0.5 text-xs font-medium text-muted-foreground shadow-sm">
            <Calendar className="h-3 w-3 text-primary" /> Top 3 {timeRange}
          </div>

          <div className="flex w-full items-end justify-center gap-3">
            {viewData.podium.map((item: StoryItem | AuthorItem) => {
              const isFirst = item.rank === 1
              const isSecond = item.rank === 2

              return (
                <div key={item.rank} className={`flex w-[115px] flex-shrink-0 flex-col items-center ${getPodiumOrder(item.rank)}`}>
                  <div className={`flex w-full flex-col overflow-hidden rounded-sm border bg-surface-container-lowest shadow-sm transition-all duration-200 group hover:border-primary/40 ${isFirst ? 'h-[280px] border-tertiary-container ring-1 ring-tertiary-container/30 shadow-md' : isSecond ? 'h-[240px] border-outline-variant/80' : 'h-[220px] border-outline-variant/60'}`}>
                    <div className="relative h-[150px] w-full flex-shrink-0 overflow-hidden bg-surface-container-high">
                      {isFirst && (
                        <div className="absolute left-2 top-2 z-10 animate-pulse drop-shadow-md">
                          <Crown className="h-4 w-4 fill-tertiary text-tertiary-container" />
                        </div>
                      )}
                      <img className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-102" src={isAuthorView ? (item as AuthorItem).avatar : (item as StoryItem).cover} alt={isAuthorView ? (item as AuthorItem).name : (item as StoryItem).title} />
                      <span className={`absolute bottom-1.5 right-1.5 rounded-sm px-1.5 py-0.5 font-mono text-[10px] font-bold tracking-tighter text-white shadow-sm ${isFirst ? 'bg-primary' : isSecond ? 'bg-outline' : 'bg-on-surface-variant'}`}>
                        #{item.rank}
                      </span>
                    </div>

                    <div className="min-w-0 flex-grow border-t border-outline-variant/30 bg-surface-container-lowest p-2 text-center">
                      <p className="w-full truncate text-[11px] font-bold leading-tight tracking-tight text-on-surface transition-colors group-hover:text-primary">
                        {isAuthorView ? (item as AuthorItem).name : (item as StoryItem).title}
                      </p>
                      <p className="mt-0.5 w-full truncate text-center text-[10px] font-medium text-muted-foreground">
                        {isAuthorView ? (item as AuthorItem).stat.split(' ')[0] : (item as StoryItem).reads.split(' ')[0]}
                        <span className="ml-0.5 text-[9px] font-normal text-muted-foreground/70">{isAuthorView ? 'views' : 'reads'}</span>
                      </p>
                    </div>

                    {isFirst && isAuthorView && (
                      <div className="w-full flex-shrink-0 border-t border-outline-variant/30 bg-tertiary-container/10 py-1 text-center text-[8px] font-bold tracking-wider text-tertiary">DIAMOND</div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="w-full flex-1 overflow-hidden rounded-md border border-outline-variant/60 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-outline-variant/60 bg-surface-container px-4 py-2.5">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">Thứ hạng</span>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">Chỉ số</span>
          </div>

          <div className="divide-y divide-outline-variant/30">
            {viewData.list.map((item: StoryItem | AuthorItem) => (
              <div key={item.rank} className="group flex items-center justify-between gap-4 p-3 transition-colors hover:bg-surface-container-low/60">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="w-4 text-center font-mono text-xs font-bold text-muted-foreground group-hover:text-on-surface">{item.rank}</span>
                  <div className="h-11 w-8 flex-shrink-0 overflow-hidden rounded-sm border border-outline-variant/40 bg-surface-container">
                    <img className="h-full w-full object-cover" src={isAuthorView ? (item as AuthorItem).avatar : (item as StoryItem).cover} alt={isAuthorView ? (item as AuthorItem).name : (item as StoryItem).title} />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold text-on-surface transition-colors group-hover:text-primary">{isAuthorView ? (item as AuthorItem).name : (item as StoryItem).title}</p>
                    <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{isAuthorView ? (item as AuthorItem).sub : 'Truyện thịnh hành'}</p>
                  </div>
                </div>

                <div className="flex flex-shrink-0 items-center gap-3 text-right">
                  <div>
                    <p className="text-xs font-bold text-on-surface">{isAuthorView ? (item as AuthorItem).stat.split(' ')[0] : (item as StoryItem).reads.split(' ')[0]}</p>
                    <p className="text-[10px] text-muted-foreground">{isAuthorView ? 'Tổng views' : 'Lượt đọc'}</p>
                  </div>

                  {!isAuthorView && (
                    <div className="flex h-5 w-5 items-center justify-center rounded-sm border border-outline-variant/60 bg-surface-container shadow-sm">
                      {(item as StoryItem).trend === 'up' ? <TrendingUp className="h-3 w-3 text-emerald-600" /> : (item as StoryItem).trend === 'down' ? <TrendingDown className="h-3 w-3 text-rose-600" /> : <Minus className="h-3 w-3 text-muted-foreground/60" />}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-outline-variant/30 bg-surface-container-low/40 p-2.5 text-center">
            <button className="rounded-sm px-3 py-1 text-xs font-semibold text-muted-foreground transition-colors hover:bg-surface-container-high/50 hover:text-primary">Xem toàn bộ bảng xếp hạng</button>
          </div>
        </div>
      </div>
    </div>
  )
}