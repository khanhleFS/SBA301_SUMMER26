import { useState, useEffect } from 'react'
import { fetchAuthorNovelsSummary, fetchNovelStats, type NovelStatSummary } from '../services/stat-service'
import {
  BookOpen,
  Eye,
  Coins,
  Percent,
  ChevronDown
} from 'lucide-react'
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts'

export function StatDashboard() {
  const [novels, setNovels] = useState<{ id: string; title: string; coverImageUrl?: string }[]>([])
  const [selectedNovelId, setSelectedNovelId] = useState<string>('')
  const [stats, setStats] = useState<NovelStatSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'views' | 'revenue' | 'conversion'>('views')

  useEffect(() => {
    fetchAuthorNovelsSummary().then((data) => {
      setNovels(data)
      if (data.length > 0) {
        setSelectedNovelId(data[0].id)
      }
    })
  }, [])

  useEffect(() => {
    if (!selectedNovelId) return
    setLoading(true)
    fetchNovelStats(selectedNovelId).then((data) => {
      setStats(data)
      setLoading(false)
    })
  }, [selectedNovelId])

  if (loading && !stats) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    )
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 font-sans text-foreground">
      {/* Header & Selector */}
      <div className="flex flex-col gap-4 border-b border-outline-variant/50 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight md:text-2xl">Thống Kê Hiệu Số Chương</h1>
          <p className="mt-0.5 text-xs text-muted-foreground">Theo dõi lượt đọc, doanh thu và tỉ lệ chuyển đổi của tác phẩm</p>
        </div>

        {/* Custom Novel Selector */}
        <div className="relative inline-block w-full sm:w-64">
          <div className="flex items-center gap-2 rounded-lg border border-outline-variant/60 bg-surface-container-lowest px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-primary/20">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <select
              value={selectedNovelId}
              onChange={(e) => setSelectedNovelId(e.target.value)}
              className="w-full bg-transparent text-xs font-semibold outline-none cursor-pointer appearance-none pr-6"
            >
              {novels.map((novel) => (
                <option key={novel.id} value={novel.id} className="text-foreground">
                  {novel.title}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 h-4 w-4 pointer-events-none text-muted-foreground" />
          </div>
        </div>
      </div>

      {stats && (
        <>
          {/* KPI Dashboard Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Views Card */}
            <button
              onClick={() => setActiveTab('views')}
              className={`group flex cursor-pointer items-center justify-between rounded-lg border p-4 text-left transition-all ${activeTab === 'views'
                ? 'border-primary bg-primary text-on-primary shadow-md'
                : 'border-outline-variant/60 bg-surface hover:border-primary/40'
                }`}
            >
              <div className="space-y-1">
                <span className={`text-xs font-medium transition-colors ${activeTab === 'views' ? 'text-on-primary/80' : 'text-muted-foreground group-hover:text-primary'
                  }`}>
                  Tổng lượt đọc
                </span>
                <p className={`text-2xl font-black tracking-tight ${activeTab === 'views' ? 'text-on-primary' : 'text-on-surface'
                  }`}>
                  {stats.totalViews.toLocaleString('vi-VN')}
                </p>
              </div>
              <div className={`rounded-lg p-2 transition-colors ${activeTab === 'views' ? 'bg-on-primary/10 text-on-primary' : 'bg-surface-container-high text-muted-foreground group-hover:text-primary'
                }`}>
                <Eye className="h-5 w-5" />
              </div>
            </button>

            {/* Revenue Card */}
            <button
              onClick={() => setActiveTab('revenue')}
              className={`group flex cursor-pointer items-center justify-between rounded-lg border p-4 text-left transition-all ${activeTab === 'revenue'
                ? 'border-primary bg-primary text-on-primary shadow-md'
                : 'border-outline-variant/60 bg-surface hover:border-primary/40'
                }`}
            >
              <div className="space-y-1">
                <span className={`text-xs font-medium transition-colors ${activeTab === 'revenue' ? 'text-on-primary/80' : 'text-muted-foreground group-hover:text-primary'
                  }`}>
                  Doanh thu xu
                </span>
                <p className={`text-2xl font-black tracking-tight ${activeTab === 'revenue' ? 'text-on-primary' : 'text-on-surface'
                  }`}>
                  {stats.totalRevenue.toLocaleString('vi-VN')}
                </p>
              </div>
              <div className={`rounded-lg p-2 transition-colors ${activeTab === 'revenue' ? 'bg-on-primary/10 text-on-primary' : 'bg-surface-container-high text-muted-foreground group-hover:text-amber-500'
                }`}>
                <Coins className="h-5 w-5" />
              </div>
            </button>

            {/* Conversion Rate Card */}
            <button
              onClick={() => setActiveTab('conversion')}
              className={`group flex cursor-pointer items-center justify-between rounded-lg border p-4 text-left transition-all ${activeTab === 'conversion'
                ? 'border-primary bg-primary text-on-primary shadow-md'
                : 'border-outline-variant/60 bg-surface hover:border-primary/40'
                }`}
            >
              <div className="space-y-1">
                <span className={`text-xs font-medium transition-colors ${activeTab === 'conversion' ? 'text-on-primary/80' : 'text-muted-foreground group-hover:text-primary'
                  }`}>
                  Tỉ lệ chuyển đổi trung bình
                </span>
                <p className={`text-2xl font-black tracking-tight ${activeTab === 'conversion' ? 'text-on-primary' : 'text-on-surface'
                  }`}>
                  {stats.avgConversionRate}%
                </p>
              </div>
              <div className={`rounded-lg p-2 transition-colors ${activeTab === 'conversion' ? 'bg-on-primary/10 text-on-primary' : 'bg-surface-container-high text-muted-foreground group-hover:text-primary'
                }`}>
                <Percent className="h-5 w-5" />
              </div>
            </button>
          </div>

          {/* Visual Graph Section */}
          <div className="rounded-lg border border-outline-variant/60 bg-surface p-4 shadow-sm stats-glow">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-on-surface">
                  {activeTab === 'views' && 'Biểu đồ lượt đọc theo chương'}
                  {activeTab === 'revenue' && 'Biểu đồ doanh thu xu theo chương'}
                  {activeTab === 'conversion' && 'Biểu đồ tỉ lệ chuyển đổi chương VIP (%)'}
                </h3>
                <p className="text-[10px] text-muted-foreground">Trục hoành biểu diễn thứ tự số chương</p>
              </div>
            </div>

            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                {activeTab === 'views' ? (
                  <BarChart data={stats.chapters} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.06)" />
                    <XAxis dataKey="chapterNumber" tickLine={false} tickMargin={8} style={{ fontSize: 10, fontWeight: 500 }} />
                    <YAxis tickLine={false} style={{ fontSize: 10, fontWeight: 500 }} />
                    <Tooltip
                      contentStyle={{ background: 'var(--surface)', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '6px', fontSize: '11px' }}
                      labelFormatter={(label) => `Chương ${label}`}
                    />
                    <Bar dataKey="viewCount" name="Lượt đọc" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                ) : activeTab === 'revenue' ? (
                  <BarChart data={stats.chapters} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.06)" />
                    <XAxis dataKey="chapterNumber" tickLine={false} tickMargin={8} style={{ fontSize: 10, fontWeight: 500 }} />
                    <YAxis tickLine={false} style={{ fontSize: 10, fontWeight: 500 }} />
                    <Tooltip
                      contentStyle={{ background: 'var(--surface)', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '6px', fontSize: '11px' }}
                      labelFormatter={(label) => `Chương ${label}`}
                    />
                    <Bar dataKey="revenue" name="Xu kiếm được" fill="var(--amber-500, #f59e0b)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                ) : (
                  <BarChart data={stats.chapters} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.06)" />
                    <XAxis dataKey="chapterNumber" tickLine={false} tickMargin={8} style={{ fontSize: 10, fontWeight: 500 }} />
                    <YAxis domain={[0, 100]} tickLine={false} style={{ fontSize: 10, fontWeight: 500 }} />
                    <Tooltip
                      contentStyle={{ background: 'var(--surface)', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '6px', fontSize: '11px' }}
                      labelFormatter={(label) => `Chương ${label}`}
                    />
                    <Bar dataKey="conversionRate" name="Tỉ lệ giữ chân (%)" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chapters List Table */}
          <div className="rounded-lg border border-outline-variant/60 bg-surface shadow-sm overflow-hidden">
            <div className="border-b border-outline-variant/60 bg-surface-container px-4 py-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Chi tiết số liệu từng chương</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b border-outline-variant/40 bg-surface-container-low/40 font-semibold text-muted-foreground">
                    <th className="p-3 text-center">STT</th>
                    <th className="p-3">Tên chương</th>
                    <th className="p-3">Loại</th>
                    <th className="p-3 text-right">Lượt đọc</th>
                    <th className="p-3 text-right">Mở khóa xu</th>
                    <th className="p-3 text-right">Tỉ lệ chuyển đổi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/30">
                  {stats.chapters.map((ch) => (
                    <tr key={ch.chapterNumber} className="hover:bg-surface-container-low/20 transition-colors">
                      <td className="p-3 text-center font-mono font-medium text-muted-foreground">{ch.chapterNumber}</td>
                      <td className="p-3 font-semibold text-on-surface">{ch.title}</td>
                      <td className="p-3">
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-bold ${ch.status === 'VIP'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-800'
                          }`}>
                          {ch.status}
                        </span>
                      </td>
                      <td className="p-3 text-right font-mono font-medium">{ch.viewCount.toLocaleString('vi-VN')}</td>
                      <td className="p-3 text-right font-mono font-medium text-amber-600">
                        {ch.status === 'VIP' ? `${ch.revenue.toLocaleString('vi-VN')} xu` : '-'}
                      </td>
                      <td className="p-3 text-right font-mono font-medium text-emerald-600">
                        {ch.conversionRate}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
