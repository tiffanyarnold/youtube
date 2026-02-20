"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { ErrorBoundary } from "@/components/error-boundary";
import { VideoGrid } from "@/components/video-grid";
import { CategoryPills } from "@/components/category-pills";
import { useVideoStore } from "@/lib/store";

function HomeContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const { setSearchQuery, loadVideos, videos, loading } =
    useVideoStore();
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Reset category when search query changes (e.g. user searches from header)
  useEffect(() => {
    if (q) {
      setSelectedCategory("All");
    }
  }, [q]);

  useEffect(() => {
    setSearchQuery(q);
    if (selectedCategory !== "All") {
      // Use tag-based filtering for category pills
      loadVideos(undefined, selectedCategory.toLowerCase());
    } else {
      loadVideos(q || undefined);
    }
  }, [q, selectedCategory, setSearchQuery, loadVideos]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="px-4 md:px-6 pt-4 pb-8 max-w-[1920px] mx-auto">
      <CategoryPills
        selectedCategory={selectedCategory}
        onSelect={handleCategorySelect}
      />
      {loading && videos.length === 0 ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-[#E5E5E5] border-t-[#FF0000] rounded-full animate-spin" />
        </div>
      ) : (
        <VideoGrid videos={videos} />
      )}
    </div>
  );
}

export default function HomePage() {
  return (
    <ErrorBoundary>
      <AppShell>
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-[#E5E5E5] border-t-[#FF0000] rounded-full animate-spin" />
            </div>
          }
        >
          <HomeContent />
        </Suspense>
      </AppShell>
    </ErrorBoundary>
  );
}
