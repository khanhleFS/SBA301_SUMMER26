export function SearchCardSkeleton() {
  return (
    <div className="flex gap-2 sm:gap-6 p-2 sm:p-4 rounded-md sm:rounded-lg bg-surface-container-low border border-outline/10 animate-pulse select-none w-full overflow-hidden">
      {/* Book Cover Skeleton - Ultra Tiny on Mobile (w-10 h-14), Standard on Desktop (w-28 h-40) */}
      <div className="w-10 h-14 sm:w-28 sm:h-40 rounded sm:rounded-lg bg-surface-container-highest flex-shrink-0 relative border border-outline/5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-surface-container-high/40 via-surface-container-high to-surface-container-highest/60" />
      </div>

      {/* Details Skeleton */}
      <div className="flex-grow py-0.5 flex flex-col justify-between overflow-hidden">
        <div className="w-full h-full flex flex-col justify-center">
          
          {/* A. DESKTOP VIEWPORT LAYOUT */}
          <div className="hidden sm:flex justify-between items-start gap-4">
            <div className="flex-grow space-y-3 overflow-hidden">
              {/* Title Bar */}
              <div className="h-6 w-2/3 bg-surface-container-highest rounded" />
              
              {/* Categories Tag Row */}
              <div className="flex gap-1.5 mt-2">
                <div className="h-4 w-12 bg-surface-container-highest rounded" />
                <div className="h-4 w-16 bg-surface-container-highest rounded" />
              </div>
            </div>
            
            {/* Chapters & Activity */}
            <div className="flex flex-col items-end shrink-0 gap-2 text-right">
              <div className="h-6 w-20 bg-surface-container-highest rounded" />
              <div className="h-4 w-28 bg-surface-container-highest rounded" />
            </div>
          </div>

          {/* B. MOBILE VIEWPORT LAYOUT - Ultra-Minimized */}
          <div className="flex sm:hidden flex-col gap-2 w-full justify-center">
            {/* Row 1: Title & Chapter Skeleton */}
            <div className="flex justify-between items-start gap-3 w-full">
              <div className="h-3 w-1/2 bg-surface-container-highest rounded" />
              <div className="h-3 w-8 bg-surface-container-highest rounded shrink-0" />
            </div>
            
            {/* Row 2: Author Skeleton */}
            <div className="h-2.5 w-1/3 bg-surface-container-highest rounded" />
          </div>

        </div>

        {/* Footer line divider skeleton (Desktop only) */}
        <div className="hidden sm:block mt-6 pt-2 border-t border-outline/5">
          {/* Author line skeleton */}
          <div className="h-4 w-32 bg-surface-container-highest rounded" />
        </div>
      </div>
    </div>
  )
}

export function SearchSkeletonList() {
  return (
    <div className="space-y-4 animate-fade-slide-up">
      {Array.from({ length: 3 }).map((_, idx) => (
        <SearchCardSkeleton key={idx} />
      ))}
    </div>
  )
}
