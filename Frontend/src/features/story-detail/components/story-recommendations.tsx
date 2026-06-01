import { Link } from 'react-router-dom'
import { Eye } from 'lucide-react'
import { MOCK_STORIES } from '@/services/mock-data'
import { useStoryDetailContext } from '../context/story-detail-context'

const COVER_PLACEHOLDER = 'https://placehold.co/400x600/1a1a1a/ededed?text=Cover'

export function StoryRecommendations() {
  const { storyInfo } = useStoryDetailContext()

  if (!storyInfo) return null

  // Recommend other stories (excluding current story)
  const recommendations = MOCK_STORIES.filter((s) => s.slug !== storyInfo.slug)
  const displayList = recommendations.length > 0 ? recommendations : MOCK_STORIES.slice(0, 4)

  return (
    <>
      {/* --- DESKTOP VIEWPORT --- */}
      <section className="hidden md:block space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-xl font-bold text-foreground">Truyện đề cử</h3>
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary cursor-pointer">Xem thêm</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {displayList.map((rec) => (
            <Link key={rec.id} to={`/${rec.slug}`} className="group block space-y-3">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-secondary/30 border border-black/5 dark:border-white/5 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-primary/20 group-hover:-translate-y-1">
                <img src={rec.imgUrl || COVER_PLACEHOLDER} alt={rec.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-3 right-3 bg-primary text-on-primary px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  {rec.genres[0]}
                </div>
              </div>
              <div className="space-y-1 text-center">
                <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">{rec.title}</h3>
                <div className="flex items-center justify-center gap-1 text-[10px] font-bold">
                  <Eye className="h-3 w-3 text-primary" />
                  <span className="text-primary">{rec.reads}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* --- MOBILE VIEWPORT --- */}
      <section className="md:hidden space-y-5 pb-8 border-t border-outline/10 pt-8">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-xl font-bold text-foreground">Có thể bạn sẽ thích</h3>
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary cursor-pointer">Xem thêm</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {displayList.map((rec) => (
            <Link key={rec.id} to={`/${rec.slug}`} className="group block space-y-3">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-secondary/30 border border-black/5 dark:border-white/5 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-primary/20 group-hover:-translate-y-1">
                <img src={rec.imgUrl || COVER_PLACEHOLDER} alt={rec.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-3 right-3 bg-primary text-on-primary px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  {rec.genres[0]}
                </div>
              </div>
              <div className="space-y-1 text-center">
                <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">{rec.title}</h3>
                <div className="flex items-center justify-center gap-1 text-[10px] font-bold">
                  <Eye className="h-3 w-3 text-primary" />
                  <span className="text-primary">{rec.reads}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
