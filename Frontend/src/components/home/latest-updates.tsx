import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Container from "@/components/shared/site/container"
import SplitText from "@/components/creative/split-text/SplitText"

const mangaList = [
  { id: 1, title: 'The Last Echo', author: 'Elara', category: 'Phiêu lưu', chapter: 'Chương 124', time: '15 phút trước', image: 'https://placehold.co/400x533/E6E1E5/4F378A?text=Echo' },
  { id: 2, title: 'Violet Garden', author: 'Kael', category: 'Lãng mạn', chapter: 'Chương 89', time: '1 giờ trước', image: 'https://placehold.co/400x533/E6E1E5/4F378A?text=Violet' },
  { id: 3, title: 'Shadow Walker', author: 'Mina', category: 'Hành động', chapter: 'Chương 45', time: '3 giờ trước', image: 'https://placehold.co/400x533/E6E1E5/4F378A?text=Shadow' },
  { id: 4, title: 'Silent Moon', author: 'Zephyr', category: 'Kịch tính', chapter: 'Chương 12', time: '5 giờ trước', image: 'https://placehold.co/400x533/E6E1E5/4F378A?text=Moon' },
  { id: 5, title: 'Urban Legend', author: 'Alpha', category: 'Huyền bí', chapter: 'Chương 67', time: '10 giờ trước', image: 'https://placehold.co/400x533/E6E1E5/4F378A?text=Urban' },
  { id: 6, title: 'Sky Realm', author: 'Beta', category: 'Fantasy', chapter: 'Chương 32', time: '1 ngày trước', image: 'https://placehold.co/400x533/E6E1E5/4F378A?text=Sky' },
]

export default function LatestUpdates() {
  return (
    <section className="py-12 md:py-20">
      <Container>
        <div className="flex items-end justify-between mb-8 md:mb-12">
          <div className="space-y-1 md:space-y-2">
            <SplitText
              tag="h2"
              className="text-2xl md:text-4xl font-bold tracking-tight text-foreground"
              delay={15}
              duration={1}
              splitType="words"
              textAlign="left"
            >
              Cập nhật mới nhất
            </SplitText>
            <div className="h-1 w-12 md:h-1.5 md:w-20 bg-primary/20 rounded-full" />
          </div>
          <Link to="/latest" className="group flex items-center gap-2 text-xs md:text-sm font-bold text-primary">
            <SplitText
              className="inline"
              delay={20}
              duration={0.8}
              splitType="words"
              textAlign="left"
            >
              Xem tất cả
            </SplitText>
            <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {mangaList.map((manga) => (
            <Link key={manga.id} to={`/manga/${manga.id}`} className="group block space-y-3 md:space-y-6">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl md:rounded-[32px] bg-secondary/30 border border-black/5 dark:border-white/5 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-primary/20 group-hover:-translate-y-2">
                <img
                  src={manga.image}
                  alt={manga.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-4 right-4 bg-primary text-on-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  {manga.category}
                </div>
              </div>

              <div className="space-y-1 text-center">
                <SplitText
                  tag="h3"
                  className="text-base md:text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1"
                  delay={10}
                  duration={0.8}
                  splitType="words"
                  textAlign="center"
                >
                  {manga.title}
                </SplitText>
                <div className="flex items-center justify-center gap-2 text-[10px] md:text-xs font-bold">
                  <SplitText
                    className="text-primary inline-block"
                    delay={15}
                    duration={0.8}
                    splitType="words"
                    textAlign="center"
                  >
                    {manga.chapter}
                  </SplitText>
                  <SplitText
                    className="text-muted-foreground/30 inline-block"
                    delay={15}
                    duration={0.8}
                    splitType="words"
                    textAlign="center"
                  >
                    •
                  </SplitText>
                  <SplitText
                    className="text-muted-foreground italic inline-block"
                    delay={15}
                    duration={0.8}
                    splitType="words"
                    textAlign="center"
                  >
                    {manga.time}
                  </SplitText>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}
