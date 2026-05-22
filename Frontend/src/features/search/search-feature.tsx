import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Container from '@/components/shared/site/container'
import { Search, RotateCcw, SlidersHorizontal, Check, X } from 'lucide-react'
import { SearchInput } from '@/components/shared/site/search-input'

// Import Context & Components
import { SearchProvider, useSearchContext } from './context/search-context'
import { ParticleBackdrop } from './components/particle-backdrop'
import { SearchCard } from './components/search-card'
import { SearchSidebar } from './components/search-sidebar'
import { SearchPagination } from './components/search-pagination'
import { SearchPageSkeleton, SearchSkeletonList } from './components/search-skeleton'
import { SearchBanner } from './components/search-banner'

function SearchContent() {
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('q') || ''
  
  // Local search input box state to avoid keypress lag
  const [inputValue, setInputValue] = useState(searchQuery)
  
  // State to control mobile Bottom Sheet Filter Drawer
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  const {
    filteredStories,
    isLoading,
    isFiltersLoading,
    clearFilters,
    categories,
    selectedCategory,
    setSelectedCategory,
    selectedChapters,
    setSelectedChapters,
    selectedStatus,
    setSelectedStatus,
    filterGroups
  } = useSearchContext()

  // Keep local input field synchronized when URL search params are updated or reset!
  useEffect(() => {
    setInputValue(searchQuery)
  }, [searchQuery])

  // LOCK SCROLL: Ngăn cuộn trang nền khi mở ngăn kéo bộ lọc di động
  useEffect(() => {
    if (isMobileFilterOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileFilterOpen])

  // Count active filters to display as a badge on the mobile Filter Button
  const activeFiltersCount = 
    (selectedCategory !== 'Tất cả' ? 1 : 0) + 
    (selectedChapters !== 'Any' ? 1 : 0) + 
    (selectedStatus !== 'All' ? 1 : 0)

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchParams(inputValue.trim() ? { q: inputValue.trim() } : {})
  }

  if (isLoading && isFiltersLoading && filteredStories.length === 0) {
    return (
      <>
        <ParticleBackdrop />
        <SearchPageSkeleton />
      </>
    )
  }

  return (
    <div className="relative font-sans select-none overflow-hidden pb-12 w-full text-foreground bg-transparent">
      
      {/* Floating Particles Backdrop */}
      <ParticleBackdrop />

      <Container className="relative z-10 pt-4">
        <main className="flex-grow w-full py-6">
          
          <SearchBanner />
          
          {/* 1. Dynamic Header with interactive Search Input Box */}
          <section className="mb-6 animate-fade-slide-up flex flex-col gap-2">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-outline/10 pb-4">
              {searchQuery ? (
                <h1 className="font-serif text-[22px] sm:text-4xl font-bold text-on-surface leading-tight">
                  Kết quả tìm kiếm cho <span className="text-primary italic break-all">"{searchQuery}"</span>
                </h1>
              ) : (
                <h1 className="font-serif text-[22px] sm:text-4xl font-bold text-on-surface leading-tight">
                  Khám phá các tác phẩm
                </h1>
              )}
              <span className="text-sm sm:text-base font-medium text-on-surface-variant/80 whitespace-nowrap mb-1">
                {isLoading ? 'Đang tìm kiếm...' : `Tìm thấy ${filteredStories.length} truyện`}
              </span>
            </div>
            
            {/* Interactive Search Input Box - Visible on Mobile only, Hidden on Desktop */}
            <SearchInput
              value={inputValue}
              onChange={setInputValue}
              onSubmit={handleSearchSubmit}
              placeholder="Tìm kiếm truyện, tác giả..."
              className="mt-4 block sm:hidden"
              inputClassName="bg-surface-container-low border-outline/20 rounded-lg py-3 shadow-sm text-xs font-sans"
            />

            {/* Mobile Category Horizontal Scrollable Capsule Filter Strip (Siêu gọn gàng) */}
            <div className="block sm:hidden mt-3.5 overflow-x-auto whitespace-nowrap pb-1.5 -mx-4 px-4 select-none scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="flex gap-1.5 items-center">
                
                {/* ⚙️ Nút Mở Bottom Sheet Lọc Nâng Cao (Full Filter Drawer Button) */}
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                    activeFiltersCount > 0
                      ? 'bg-primary text-on-primary border-primary shadow-sm'
                      : 'bg-surface-container-high border-outline/10 text-on-surface-variant hover:border-primary/20'
                  }`}
                >
                  <SlidersHorizontal className="size-3" />
                  Bộ lọc {activeFiltersCount > 0 && `(${activeFiltersCount})`}
                </button>

                <div className="h-4 w-px bg-outline/10 shrink-0" />

                {/* Danh mục lọc nhanh */}
                {isFiltersLoading ? (
                  Array.from({ length: 5 }).map((_, idx) => (
                    <div 
                      key={idx} 
                      className="h-7 w-16 bg-surface-container-highest rounded-full shrink-0 animate-pulse" 
                    />
                  ))
                ) : (
                  categories.map((cat, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                        selectedCategory === cat
                          ? 'bg-primary/20 text-primary border-primary/30 shadow-sm'
                          : 'bg-surface-container border-outline/10 text-on-surface-variant'
                      }`}
                    >
                      {cat}
                    </button>
                  ))
                )}
              </div>
            </div>
          </section>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* 2. Main Column: Story List Results or Loading Skeleton */}
            <div className="flex-grow space-y-4 min-w-0 w-full">
              


              {isLoading ? (
                <SearchSkeletonList />
              ) : filteredStories.length > 0 ? (
                filteredStories.map(story => (
                  <SearchCard key={story.id} story={story} />
                ))
              ) : (
                <div className="py-16 text-center space-y-4 bg-surface-container-low/50 border border-outline/10 rounded-md animate-fade-slide-up">
                  <Search className="size-16 text-outline/30 mx-auto animate-pulse" />
                  <p className="text-on-surface-variant font-semibold text-xs">Không tìm thấy kết quả nào phù hợp với bộ lọc hiện tại.</p>
                  <button 
                    onClick={clearFilters}
                    className="px-4 py-2 bg-primary text-on-primary rounded-md text-xs font-semibold hover:bg-primary/95 transition-all cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <RotateCcw className="size-4" />
                    Đặt lại bộ lọc
                  </button>
                </div>
              )}

              {/* 3. Bottom Pagination */}
              <SearchPagination />

            </div>

            {/* Sidebar Column: Filters Sticky Panel - CHỈ HIỂN THỊ TRÊN DESKTOP */}
            <div className="hidden lg:block">
              <SearchSidebar />
            </div>

          </div>

        </main>
      </Container>

      {/* C. MOBILE FILTER DRAWER BOTTOM SHEET - Trượt lên cực kỳ thời thượng (Góc bo sắc nét) */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:hidden">
          
          {/* Nền mờ phía sau (Blurred Backdrop) */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          
          {/* Bảng điều khiển ngăn kéo (Slide-up Panel Sheet - rounded-t-lg để bớt tròn) */}
          <div className="relative w-full bg-surface-container-low border-t border-outline/10 rounded-t-lg p-5 shadow-2xl transition-transform duration-300 max-h-[80vh] overflow-y-auto z-10 animate-fade-slide-up">
            
            {/* Thanh kéo trang trí ở đỉnh đầu (Drawer Handle) */}
            <div className="w-12 h-1 bg-outline/20 rounded-full mx-auto mb-4" />
            
            {/* Tiêu đề ngăn kéo */}
            <div className="flex items-center justify-between pb-3 border-b border-outline/10 mb-4">
              <div className="flex items-center gap-1.5">
                <SlidersHorizontal className="size-3.5 text-primary" />
                <h2 className="font-serif text-sm font-bold text-on-surface">Tất cả bộ lọc</h2>
              </div>
              <button 
                onClick={clearFilters}
                className="text-[10px] text-primary font-semibold hover:underline cursor-pointer select-none"
              >
                Xóa tất cả
              </button>
            </div>
            
            {/* Nội dung lọc nâng cao - Áp dụng "Fit In Space" inline flex wrap */}
            <div className="space-y-4">
              {isFiltersLoading ? (
                Array.from({ length: 3 }).map((_, gIdx) => (
                  <div key={gIdx} className="space-y-2 animate-pulse">
                    <div className="h-3.5 w-16 bg-surface-container-highest rounded" />
                    <div className="flex flex-wrap gap-1.5">
                      {Array.from({ length: 4 }).map((_, idx) => (
                        <div key={idx} className="h-6 w-16 bg-surface-container-highest rounded-md" />
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                filterGroups.map((group) => {
                  const selectedValue = 
                    group.id === 'category' ? selectedCategory :
                    group.id === 'chapters' ? selectedChapters :
                    selectedStatus

                  const handleSelectFilter = (value: string) => {
                    if (group.id === 'category') setSelectedCategory(value)
                    else if (group.id === 'chapters') setSelectedChapters(value)
                    else if (group.id === 'status') setSelectedStatus(value)
                  }

                  return (
                    <div key={group.id} className="space-y-1.5">
                      <h3 className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/70">
                        {group.title}
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {group.options.map((opt) => {
                          const isActive = selectedValue === opt.value
                          return (
                            <button
                              key={opt.value}
                              onClick={() => handleSelectFilter(opt.value)}
                              className={`py-1 px-2.5 rounded-md font-semibold text-[10px] border transition-all cursor-pointer select-none ${
                                isActive
                                  ? 'bg-primary/20 text-primary border-primary/30 font-bold'
                                  : 'bg-surface-container border-outline/10 text-on-surface-variant hover:border-primary/25'
                              }`}
                            >
                              {opt.label}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            {/* Nút lưu áp dụng (Apply Filter Button) */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-grow py-2.5 bg-primary text-on-primary font-bold rounded-md hover:bg-primary/95 transition-all text-[11px] shadow-md cursor-pointer text-center flex items-center justify-center gap-1.5"
              >
                <Check className="size-3.5" />
                Áp dụng bộ lọc
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="px-3 py-2.5 bg-surface-container border border-outline/10 rounded-md text-on-surface-variant hover:bg-surface-container-high transition-all text-[11px] cursor-pointer flex items-center justify-center"
              >
                <X className="size-3.5" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}

export default function SearchFeature() {
  return (
    <SearchProvider>
      <SearchContent />
    </SearchProvider>
  )
}
