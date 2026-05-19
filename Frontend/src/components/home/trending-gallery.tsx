import Container from "@/components/shared/site/container"
import CircularGallery from "@/components/custom/circular-gallery/CircularGallery"

const trendingItems = [
  { image: 'https://placehold.co/600x800/4F378A/FFFFFF?text=Trending+1', text: 'Thành Phố Sương Mù' },
  { image: 'https://placehold.co/600x800/4F378A/FFFFFF?text=Trending+2', text: 'Nhật Ký Ký Ức' },
  { image: 'https://placehold.co/600x800/4F378A/FFFFFF?text=Trending+3', text: 'Lời Nguyền Của Gió' },
  { image: 'https://placehold.co/600x800/4F378A/FFFFFF?text=Trending+4', text: 'Kẻ Gieo Mầm Ánh Sáng' },
  { image: 'https://placehold.co/600x800/4F378A/FFFFFF?text=Trending+5', text: 'Vũ Trụ Mới' },
  { image: 'https://placehold.co/600x800/4F378A/FFFFFF?text=Trending+6', text: 'Huyền Bí' },
]

interface TrendingGalleryProps {
  onReady?: () => void
}

export default function TrendingGallery({ onReady }: TrendingGalleryProps) {
  return (
    <section className="mb-20 md:mb-32 relative z-10 -mt-16 md:-mt-50">
      <div className="h-[400px] sm:h-[600px] md:h-[900px] w-full relative transition-colors">
        <div className="w-full h-full relative overflow-hidden">
          <CircularGallery
            items={trendingItems}
            bend={1}
            textColor="var(--primary)"
            borderRadius={0.05}
            scrollEase={0.1}
            scrollSpeed={1.5}
            font={typeof window !== 'undefined' && window.innerWidth < 768 ? "italic 20px Literata" : "italic 40px Literata"}
            onReady={onReady}
          />
        </div>
      </div>
      <Container className="mt-12 md:mt-16 text-center">
        <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-muted-foreground">Đa dạng thể loại</p>
      </Container>
    </section>
  )
}
