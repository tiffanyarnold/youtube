"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, Search, Upload, Video } from "lucide-react";
import { useVideoStore } from "@/lib/store";

export function Header() {
  const router = useRouter();
  const { toggleSidebar, searchQuery, setSearchQuery } = useVideoStore();
  const [localSearch, setLocalSearch] = useState(searchQuery);

  // Sync local search with global store (e.g. when navigating via logo click)
  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    router.push(`/?q=${encodeURIComponent(localSearch)}`);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white h-14 flex items-center justify-between px-4 shadow-[0_1px_2px_rgba(0,0,0,0.1)]">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-[#F1F1F1] transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-6 h-6 text-[#0F0F0F]" />
        </button>
        <Link href="/" className="flex items-center gap-0.5" onClick={() => setSearchQuery("")}>
          <div className="relative flex items-center">
            <div className="bg-[#FF0000] rounded-lg w-8 h-[22px] flex items-center justify-center mr-0.5">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-[#0F0F0F]">
              VideoHub
            </span>
          </div>
        </Link>
      </div>

      {/* Center section - Search */}
      <form
        onSubmit={handleSearch}
        className="hidden sm:flex items-center max-w-[600px] flex-1 mx-4"
      >
        <div className="flex items-center w-full border border-[#CCCCCC] rounded-l-full">
          <input
            type="text"
            placeholder="Search"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full h-10 px-4 bg-transparent text-[#0F0F0F] placeholder:text-[#888] text-base outline-none rounded-l-full focus:border-[#065FD4] focus:ring-1 focus:ring-[#065FD4]"
          />
        </div>
        <button
          type="submit"
          className="h-10 px-6 bg-[#F8F8F8] border border-l-0 border-[#CCCCCC] rounded-r-full hover:bg-[#F0F0F0] transition-colors"
          aria-label="Search"
        >
          <Search className="w-5 h-5 text-[#0F0F0F]" />
        </button>
      </form>

      {/* Right section */}
      <div className="flex items-center gap-2">
        <Link
          href="/upload"
          className="flex items-center gap-2 h-9 px-4 bg-[#F1F1F1] hover:bg-[#E5E5E5] rounded-full transition-colors"
        >
          <Video className="w-5 h-5" />
          <span className="hidden md:inline text-sm font-medium">Create</span>
        </Link>
      </div>
    </header>
  );
}
