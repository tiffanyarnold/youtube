import { Skeleton } from "@/components/ui/skeleton";

export default function ChannelLoading() {
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
        <div className="max-w-[1284px] mx-auto">
          {/* Banner skeleton */}
          <Skeleton className="w-[calc(100%-32px)] md:w-[calc(100%-48px)] h-[120px] sm:h-[172px] md:h-[212px] rounded-xl mx-4 md:mx-6 mt-4" />

          {/* Channel info skeleton */}
          <div className="px-4 md:px-6 py-4 md:py-6">
            <div className="flex items-start gap-4 md:gap-6">
              {/* Avatar */}
              <Skeleton className="w-16 h-16 md:w-[88px] md:h-[88px] rounded-full flex-shrink-0" />
              {/* Info */}
              <div className="flex-1 space-y-2">
                <Skeleton className="h-7 w-48 rounded" />
                <Skeleton className="h-4 w-64 rounded" />
                <Skeleton className="h-4 w-80 rounded" />
                <Skeleton className="h-9 w-36 rounded-full mt-2" />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-b border-[#E5E5E5] mx-4 md:mx-6" />

          {/* Videos section */}
          <div className="px-4 md:px-6 pt-6 pb-8">
            <Skeleton className="h-5 w-16 rounded mb-4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="w-full aspect-video rounded-xl" />
                  <div className="flex gap-3">
                    <Skeleton className="w-9 h-9 rounded-full flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-full rounded" />
                      <Skeleton className="h-4 w-3/4 rounded" />
                      <Skeleton className="h-3 w-1/2 rounded" />
                      <Skeleton className="h-3 w-2/5 rounded" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
