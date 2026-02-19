"use client";

import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  "All",
  "Music",
  "Gaming",
  "Live",
  "Mixes",
  "Tech",
  "AI",
  "Cooking",
  "Travel",
  "Fitness",
  "Art",
  "News",
  "Science",
  "Education",
  "Comedy",
  "Film",
  "Sports",
];

interface CategoryPillsProps {
  selectedCategory: string;
  onSelect: (category: string) => void;
}

export function CategoryPills({ selectedCategory, onSelect }: CategoryPillsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
  };

  const scroll = (direction: "left" | "right") => {
    if (!containerRef.current) return;
    const scrollAmount = direction === "left" ? -200 : 200;
    containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <div className="relative mb-4">
      {showLeftArrow && (
        <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center bg-gradient-to-r from-white via-white to-transparent pr-8">
          <button
            onClick={() => scroll("left")}
            className="p-1.5 rounded-full hover:bg-[#F1F1F1] transition-colors bg-white"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
      )}
      
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex gap-3 overflow-x-auto scrollbar-hide pb-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={cn(
              "flex-shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
              selectedCategory === cat
                ? "bg-[#0F0F0F] text-white"
                : "bg-[#F2F2F2] text-[#0F0F0F] hover:bg-[#E5E5E5]"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {showRightArrow && (
        <div className="absolute right-0 top-0 bottom-0 z-10 flex items-center bg-gradient-to-l from-white via-white to-transparent pl-8">
          <button
            onClick={() => scroll("right")}
            className="p-1.5 rounded-full hover:bg-[#F1F1F1] transition-colors bg-white"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
