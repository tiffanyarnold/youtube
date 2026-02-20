import { Skeleton } from "@/components/ui/skeleton";

export default function HomeLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header skeleton */}
      <div className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-[#E5E5E5] z-50 flex items-center px-4 gap-4">
        <Skeleton className="w-[90px] h-5 rounded" />
        <div className="flex-1 flex justify-center">
          <Skeleton className="w-full max-w-[600px] h-10 rounded-full" />
        </div>
        <Skeleton className="w-[100px] h-9 rounded-sm" />
      </div>

      {/* Sidebar skeleton (desktop) */}
      <div className="hidden md:flex flex-col gap-4 fixed top-14 left-0 w-[72px] h-[calc(100vh-56px)] pt-4 items-center">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="w-10 h-10 rounded-lg" />
        ))}
      </div>

      {/* Main content */}
      <main className="pt-14 md:pl-[72px]">
        <div className="px-4 md:px-6 pt-4 pb-8 max-w-[1920px] mx-auto">
          {/* Category pills skeleton */}
          <div className="flex gap-3 mb-6 overflow-hidden">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-8 rounded-lg flex-shrink-0"
                style={{ width: `${60 + Math.random() * 40}px` }}
              />
            ))}
          </div>

          {/* Video grid skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="space-y-3">
                {/* Thumbnail */}
                <Skeleton className="w-full aspect-video rounded-xl" />
                <div className="flex gap-3">
                  {/* Channel avatar */}
                  <Skeleton className="w-9 h-9 rounded-full flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    {/* Title */}
                    <Skeleton className="h-4 w-full rounded" />
                    <Skeleton className="h-4 w-3/4 rounded" />
                    {/* Channel name */}
                    <Skeleton className="h-3 w-1/2 rounded" />
                    {/* Views + date */}
                    <Skeleton className="h-3 w-2/5 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
