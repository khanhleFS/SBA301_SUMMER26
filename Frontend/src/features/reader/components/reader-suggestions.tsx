import { Link } from 'react-router-dom'
import Container from '@/components/shared/site/container'
import { MOCK_STORIES } from '@/services/mock-data'

interface ReaderSuggestionsProps {
  currentTheme: {
    text: string
    textMuted: string
  }
}

export default function ReaderSuggestions({ currentTheme }: ReaderSuggestionsProps) {
  // Take 4 stories for recommendations
  const displayList = MOCK_STORIES.slice(0, 4)

  return (
    <Container className="mt-16 pb-20 select-none">
      <div className="flex items-center justify-between mb-6">
        <h3 className={`font-serif text-lg font-bold ${currentTheme.text}`}>
          Gợi ý truyện cùng thể loại
        </h3>
        <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
          Xem thêm
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {displayList.map((novel) => (
          <Link
            key={novel.id}
            to={`/${novel.slug}`}
            className="group block space-y-3 md:space-y-6"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl md:rounded-[32px] bg-secondary/30 border border-black/5 dark:border-white/5 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-primary/20 group-hover:-translate-y-2">
              <img
                src={novel.imgUrl || 'https://placehold.co/400x533/E6E1E5/4F378A?text=No+Cover'}
                alt={novel.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-4 right-4 bg-primary text-on-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                {novel.genres[0]}
              </div>
            </div>

            <div className="space-y-1 text-center">
              <h3 className={`text-base md:text-xl font-bold group-hover:text-primary transition-colors line-clamp-1 ${currentTheme.text}`}>
                {novel.title}
              </h3>
              <div className="flex items-center justify-center gap-2 text-[10px] md:text-xs font-bold">
                <span className="text-primary inline-block">Chương {novel.chapters.length}</span>
                <span className={`${currentTheme.textMuted} opacity-30 inline-block`}>•</span>
                <span className={`${currentTheme.textMuted} italic inline-block`}>{novel.publishTime}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  )
}
