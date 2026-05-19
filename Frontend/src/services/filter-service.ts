export interface FilterOption {
  label: string
  value: string
}

export interface FilterGroup {
  id: string
  title: string
  type: 'pills' | 'grid-2' | 'grid-3'
  options: FilterOption[]
}

/**
 * Centralized Metadata Registry of ALL Filter/Option selection groups across the entire application.
 * Any page or scope that requires customer selection lists to call APIs gets configured here.
 */
const APP_FILTERS_REGISTRY: Record<string, FilterGroup[]> = {
  // Filters for the Search and Discovery Page
  search: [
    {
      id: 'category',
      title: 'Thể loại',
      type: 'pills',
      options: [
        { label: 'Tất cả thể loại', value: 'Tất cả thể loại' },
        { label: 'Hành động', value: 'Hành động' },
        { label: 'Hài hước', value: 'Hài hước' },
        { label: 'Drama', value: 'Drama' },
        { label: 'Kỳ ảo', value: 'Kỳ ảo' },
        { label: 'Khoa học viễn tưởng', value: 'Khoa học viễn tưởng' },
        { label: 'Lãng mạn', value: 'Lãng mạn' }
      ]
    },
    {
      id: 'chapters',
      title: 'Chương hiện tại',
      type: 'grid-2',
      options: [
        { label: 'Tất cả', value: 'Any' },
        { label: 'Chương 5+', value: '5' },
        { label: 'Chương 10+', value: '10' },
        { label: 'Chương 20+', value: '20' }
      ]
    },
    {
      id: 'status',
      title: 'Trạng thái',
      type: 'grid-3',
      options: [
        { label: 'Tất cả', value: 'All' },
        { label: 'Đang ra', value: 'Ongoing' },
        { label: 'Hoàn thành', value: 'Completed' }
      ]
    }
  ],

  // Filters for the Homepage tabs (e.g. Trending, New Releases, etc.)
  homepage: [
    {
      id: 'sort',
      title: 'Sắp xếp theo',
      type: 'pills',
      options: [
        { label: 'Thịnh hành', value: 'trending' },
        { label: 'Mới cập nhật', value: 'new' },
        { label: 'Đọc nhiều nhất', value: 'reads' }
      ]
    }
  ]
}

export const filterService = {
  /**
   * Unified central API to fetch filter metadata configuration for any page or scope.
   */
  getFiltersByScope: (scope: string): Promise<FilterGroup[]> => {
    return new Promise((resolve) => {
      // Mock API delay of 150ms
      setTimeout(() => {
        resolve(APP_FILTERS_REGISTRY[scope] || [])
      }, 150)
    })
  },

  /**
   * Central API to fetch all filters in the application database registry.
   */
  getAllFilters: (): Promise<Record<string, FilterGroup[]>> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(APP_FILTERS_REGISTRY)
      }, 150)
    })
  }
}
