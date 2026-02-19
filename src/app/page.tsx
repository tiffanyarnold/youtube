"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { VideoGrid } from "@/components/video-grid";
import { CategoryPills } from "@/components/category-pills";
import { useVideoStore } from "@/lib/store";

export default function HomePage() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const { setSearchQuery, getFilteredVideos, videos } = useVideoStore();
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    setSearchQuery(q);
  }, [q, setSearchQuery]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    if (category === "All") {
      setSearchQuery(q);
    } else {
      setSearchQuery(category.toLowerCase());
    }
  };

  const filteredVideos = getFilteredVideos();

  return (
    <AppShell>
      <div className="px-4 md:px-6 pt-4 pb-8 max-w-[1920px] mx-auto">
        <CategoryPills
          selectedCategory={selectedCategory}
          onSelect={handleCategorySelect}
        />
        <VideoGrid videos={filteredVideos} />
      </div>
    </AppShell>
  );
}
