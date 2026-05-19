import { StoryBanner } from './components/story-banner'
import { StorySynopsis } from './components/story-synopsis'
import { StoryChapters } from './components/story-chapters'
import { StoryRecommendations } from './components/story-recommendations'
import Container from '@/components/shared/site/container'
import { useParams } from 'react-router-dom'

// Import Context & Skeletons
import { StoryDetailProvider, useStoryDetailContext } from './context/story-detail-context'
import { StoryDetailBannerSkeleton, StoryChaptersSkeleton } from './components/story-detail-skeleton'

function StoryDetailContent() {
  const {
    storyInfo,
    chapters,
    isLoading,
    inLibrary,
    toggleLibrary,
    isSortedAsc,
    toggleSort,
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedChapters
  } = useStoryDetailContext()

  const scrollToChapters = () => {
    const desktopEl = document.getElementById('chapters-section-desktop')
    const mobileEl = document.getElementById('chapters-section-mobile')
    
    // Check if desktop element is visible
    if (desktopEl && getComputedStyle(desktopEl).display !== 'none') {
      desktopEl.scrollIntoView({ behavior: 'smooth' })
    } else if (mobileEl) {
      mobileEl.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (isLoading || !storyInfo) {
    return (
      <div className="relative select-none pb-12 w-full text-foreground bg-transparent">
        <Container className="pt-6 md:pt-12 space-y-8 md:space-y-12 animate-pulse">
          <StoryDetailBannerSkeleton />
          
          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Synopsis Skeleton */}
              <div className="space-y-4">
                <div className="h-6 w-32 bg-surface-container-highest rounded" />
                <div className="h-4 w-full bg-surface-container-highest rounded" />
                <div className="h-4 w-full bg-surface-container-highest rounded" />
                <div className="h-4 w-3/4 bg-surface-container-highest rounded" />
              </div>
              <StoryChaptersSkeleton />
            </div>
            
            <aside className="space-y-8">
              {/* Recommendations Skeleton */}
              <div className="space-y-4">
                <div className="h-6 w-32 bg-surface-container-highest rounded" />
                <div className="h-24 w-full bg-surface-container-highest rounded-xl" />
                <div className="h-24 w-full bg-surface-container-highest rounded-xl" />
              </div>
            </aside>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div className="relative select-none pb-12 w-full text-foreground bg-transparent">
      <Container className="pt-6 md:pt-12 space-y-8 md:space-y-12">
        <StoryBanner 
          inLibrary={inLibrary}
          onLibraryToggle={toggleLibrary}
          onScrollToChapters={scrollToChapters}
        />
        
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <StorySynopsis />
            <StoryChapters 
              storySlug={storyInfo.slug}
              chaptersLength={chapters.length}
              paginatedChapters={paginatedChapters}
              currentPage={currentPage}
              totalPages={totalPages}
              isSortedAsc={isSortedAsc}
              onSortToggle={toggleSort}
              onPageChange={setCurrentPage}
            />
          </div>
          
          <aside className="space-y-8">
            <StoryRecommendations />
          </aside>
        </div>
      </Container>
    </div>
  )
}

export default function StoryDetailFeature() {
  const { novelSlug } = useParams<{ novelSlug: string }>()
  return (
    <StoryDetailProvider storyId={novelSlug || 'vong-am-toa-thap-neon-walker'}>
      <StoryDetailContent />
    </StoryDetailProvider>
  )
}
