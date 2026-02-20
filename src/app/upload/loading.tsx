import { Skeleton } from "@/components/ui/skeleton";

export default function UploadLoading() {
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

      {/* Main content - no sidebar on upload */}
      <main className="pt-14">
        <div className="px-4 md:px-6 pt-6 pb-8 max-w-[1920px] mx-auto">
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Title */}
            <div className="text-center space-y-2">
              <Skeleton className="h-8 w-48 rounded mx-auto" />
              <Skeleton className="h-4 w-72 rounded mx-auto" />
            </div>

            {/* Upload area */}
            <Skeleton className="w-full h-[280px] rounded-xl" />

            {/* Form fields */}
            <div className="space-y-4">
              {/* Channel name */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-28 rounded" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>

              {/* Title */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-16 rounded" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-24 rounded" />
                <Skeleton className="h-24 w-full rounded-lg" />
              </div>

              {/* Thumbnail */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-24 rounded" />
                <Skeleton className="h-32 w-56 rounded-lg" />
              </div>

              {/* Submit button */}
              <Skeleton className="h-10 w-full rounded-full" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
