import { Link } from 'react-router-dom'
import { BookOpen, Feather, Eye, Clock } from 'lucide-react'
import SpotlightCard from '@/components/custom/spot-light-card/SpotlightCard'

export interface Story {
  id: number
  slug: string
  title: string
  reads: string
  publishTime: string
  author: string
  genres: string[]
  currentChapter: number
  status: string
  imgUrl?: string
}

interface SearchCardProps {
  story: Story
}

export function SearchCard({ story }: SearchCardProps) {
  return (
    <SpotlightCard
      spotlightColor="rgba(79, 55, 138, 0.18)"
      className="rounded-md sm:rounded-lg bg-surface-container-low border border-outline/10 animate-fade-slide-up w-full overflow-hidden"
    >
      <Link 
        to={`/${story.slug}`} 
        className="flex gap-2 sm:gap-6 p-2 sm:p-4 hover:bg-surface-container transition-all group cursor-pointer w-full min-w-0"
      >
        {/* Book Cover - Ultra Tiny on Mobile (w-10 h-14), Standard on Desktop (w-28 h-40) */}
        <div className="w-10 h-14 sm:w-28 sm:h-40 rounded sm:rounded-lg bg-surface-container-highest overflow-hidden flex-shrink-0 shadow relative border border-outline/5 z-0">
          {story.imgUrl ? (
            <img 
              alt={story.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              src={story.imgUrl} 
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary-container/10 via-surface-container-high to-surface-container-highest flex flex-col items-center justify-center p-0.5 transition-transform duration-500 group-hover:scale-105">
              <BookOpen className="size-3.5 sm:size-10 text-primary/30 mb-0.5 group-hover:scale-110 transition-transform duration-500" />
              <span className="text-[5px] sm:text-[9px] text-on-surface-variant/30 font-semibold uppercase leading-none text-center">
                No Img
              </span>
            </div>
          )}

          {/* Absolute status badges (Desktop only, Mobile has it inline to save space!) */}
          <div className="hidden sm:block">
            {story.status === 'Ongoing' && (
              <div className="absolute top-2 right-2 bg-primary text-on-primary text-[9px] font-bold px-2 py-0.5 rounded shadow-sm uppercase tracking-wider select-none z-20">
                Đang ra
              </div>
            )}
            {story.status === 'Completed' && (
              <div className="absolute top-2 right-2 bg-tertiary text-on-tertiary text-[9px] font-bold px-2 py-0.5 rounded shadow-sm uppercase tracking-wider select-none z-20">
                Hoàn thành
              </div>
            )}
          </div>
        </div>
        
        {/* Story Details */}
        <div className="flex-grow py-0.5 flex flex-col justify-between overflow-hidden min-w-0">
          <div className="w-full h-full flex flex-col justify-center">
            
            {/* A. DESKTOP VIEWPORT LAYOUT - Rich Details (Restored standard premium font sizes) */}
            <div className="hidden sm:flex justify-between items-start gap-4">
              <div className="flex-grow overflow-hidden">
                <h4 className="font-serif text-xl font-bold text-primary group-hover:underline leading-snug break-words">
                  {story.title}
                </h4>
                
                {/* Categories below title */}
                <div className="flex flex-wrap gap-1.5 mt-2 select-none">
                  {story.genres.map((g, idx) => (
                    <span 
                      key={idx} 
                      className="bg-surface-container-high text-on-surface-variant/80 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider transition-all group-hover:bg-primary/10 group-hover:text-primary"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Right column: Chapter and activity counts */}
              <div className="flex flex-col items-end shrink-0 select-none text-right gap-1.5">
                <span className="font-serif text-xl font-bold text-primary leading-snug">
                  Ch. {story.currentChapter}
                </span>
                <div className="flex items-center gap-2.5 text-xs text-on-surface-variant/80 font-medium whitespace-nowrap">
                  <span className="flex items-center gap-1">
                    <Eye className="size-3.5 text-on-surface-variant/60" />
                    {story.reads}
                  </span>
                  <span className="text-outline/40">•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="size-3.5 text-on-surface-variant/60" />
                    {story.publishTime}
                  </span>
                </div>
              </div>
            </div>

            {/* B. MOBILE VIEWPORT LAYOUT - Micro-Compact (Ultra-Tiny Cover + Micro-Typography) */}
            <div className="flex sm:hidden flex-col gap-0.5 w-full justify-center">
              {/* Row 1: Title (left, wraps) | Chapter (right, pinned) */}
              <div className="flex justify-between items-start gap-2 w-full">
                <h4 className="font-serif text-[10px] font-bold text-primary group-hover:underline leading-tight break-words flex-grow">
                  {story.title}
                </h4>
                <span className="font-serif text-[9px] font-bold text-primary shrink-0 whitespace-nowrap mt-0.5">
                  Ch. {story.currentChapter}
                </span>
              </div>
              
              {/* Row 2: Author line & Status Badge */}
              <div className="text-[8px] text-on-surface-variant/80 font-medium flex items-center justify-between w-full select-none">
                <div className="flex items-center gap-0.5">
                  <Feather className="size-2 text-primary/60 shrink-0" />
                  <span>Tác giả: {story.author}</span>
                </div>
                
                {/* Trạng thái chữ gọn gàng bên góc phải */}
                {story.status === 'Ongoing' ? (
                  <span className="text-primary font-bold text-[7.5px] uppercase tracking-wider">Đang ra</span>
                ) : (
                  <span className="text-tertiary font-bold text-[7.5px] uppercase tracking-wider">Hoàn thành</span>
                )}
              </div>
            </div>

          </div>
          
          {/* Author Footer (Desktop only) */}
          <div className="hidden sm:flex mt-6 pt-2 border-t border-outline/5 text-sm text-on-surface-variant/85 font-medium flex items-center gap-2 select-none">
            <Feather className="size-4 text-primary/60" />
            <span>Tác giả: {story.author}</span>
          </div>
        </div>
      </Link>
    </SpotlightCard>
  )
}

