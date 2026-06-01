import { Skeleton } from '@/components/ui/skeleton'

export function LeaderboardSkeleton() {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 font-sans">
      {/* Top Header Skeleton */}
      <div className="flex flex-col gap-4 border-b border-gray-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-7 w-48 rounded" />
          <Skeleton className="h-4 w-72 rounded" />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Skeleton className="h-8 w-32 rounded" />
          <Skeleton className="h-8 w-40 rounded" />
        </div>
      </div>

      {/* Main Grid podium & list */}
      <div className="flex w-full flex-col gap-6 lg:flex-row lg:items-start">
        {/* Podium Column Skeleton */}
        <div className="relative flex h-[390px] w-full justify-center overflow-hidden rounded-md border border-gray-200 bg-white p-4 pt-14 shadow-sm lg:w-[410px] lg:flex-shrink-0">
          <div className="absolute left-3 top-3 z-10">
            <Skeleton className="h-5 w-24 rounded" />
          </div>

          <div className="flex w-full items-end justify-center gap-3">
            {/* 2nd place */}
            <div className="flex w-[115px] flex-col items-center order-1">
              <div className="flex w-full flex-col overflow-hidden rounded-sm border border-gray-100 bg-gray-50/50 h-[240px]">
                <Skeleton className="h-[150px] w-full" />
                <div className="p-2 space-y-2">
                  <Skeleton className="h-3 w-16 mx-auto rounded" />
                  <Skeleton className="h-2.5 w-12 mx-auto rounded" />
                </div>
              </div>
            </div>

            {/* 1st place */}
            <div className="flex w-[115px] flex-col items-center order-2">
              <div className="flex w-full flex-col overflow-hidden rounded-sm border border-gray-200 bg-gray-50/50 h-[280px]">
                <Skeleton className="h-[150px] w-full" />
                <div className="p-2 space-y-2">
                  <Skeleton className="h-3.5 w-20 mx-auto rounded" />
                  <Skeleton className="h-2.5 w-14 mx-auto rounded" />
                </div>
              </div>
            </div>

            {/* 3rd place */}
            <div className="flex w-[115px] flex-col items-center order-3">
              <div className="flex w-full flex-col overflow-hidden rounded-sm border border-gray-100 bg-gray-50/50 h-[220px]">
                <Skeleton className="h-[150px] w-full" />
                <div className="p-2 space-y-2">
                  <Skeleton className="h-3 w-16 mx-auto rounded" />
                  <Skeleton className="h-2.5 w-12 mx-auto rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* List Rankings Skeleton */}
        <div className="w-full flex-1 overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-2.5 bg-gray-50">
            <Skeleton className="h-4 w-16 rounded" />
            <Skeleton className="h-4 w-12 rounded" />
          </div>

          <div className="divide-y divide-gray-100">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="flex items-center justify-between gap-4 p-3 bg-white">
                <div className="flex min-w-0 items-center gap-3">
                  <Skeleton className="h-4 w-4 rounded" />
                  <Skeleton className="h-11 w-8 rounded" />
                  <div className="min-w-0 space-y-2">
                    <Skeleton className="h-4 w-28 rounded" />
                    <Skeleton className="h-3.5 w-32 rounded" />
                  </div>
                </div>
                <div className="flex items-center gap-3 text-right">
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-14 rounded" />
                    <Skeleton className="h-3 w-16 rounded" />
                  </div>
                  <Skeleton className="h-5 w-5 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
