import { Skeleton } from "@/components/ui/skeleton";

export default function WatchLoading() {
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

      {/* Main content */}
      <main className="pt-14">
        <div className="max-w-[1920px] mx-auto px-4 md:px-6 lg:px-24 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main video area */}
            <div className="flex-1 min-w-0">
              {/* Video player */}
              <Skeleton className="w-full aspect-video rounded-xl bg-[#0F0F0F]/10" />

              {/* Title */}
              <div className="mt-3 space-y-3">
                <Skeleton className="h-6 w-3/4 rounded" />

                {/* Channel info + actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div className="space-y-1.5">
                      <Skeleton className="h-4 w-28 rounded" />
                      <Skeleton className="h-3 w-20 rounded" />
                    </div>
                    <Skeleton className="h-9 w-24 rounded-full ml-2" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-9 w-32 rounded-full" />
                    <Skeleton className="h-9 w-20 rounded-full" />
                  </div>
                </div>

                {/* Description */}
                <Skeleton className="h-24 w-full rounded-xl" />
              </div>
            </div>

            {/* Sidebar - recommended */}
            <div className="w-full lg:w-[402px] flex-shrink-0">
              <Skeleton className="h-5 w-20 rounded mb-4 hidden lg:block" />
              <div className="space-y-3">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="flex gap-2">
                    <Skeleton className="w-[168px] h-[94px] rounded-lg flex-shrink-0" />
                    <div className="flex-1 space-y-2 pt-0.5">
                      <Skeleton className="h-4 w-full rounded" />
                      <Skeleton className="h-4 w-3/4 rounded" />
                      <Skeleton className="h-3 w-1/2 rounded" />
                      <Skeleton className="h-3 w-2/5 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
