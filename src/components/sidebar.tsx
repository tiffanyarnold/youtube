"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Flame, Upload, History, ThumbsUp, Clock } from "lucide-react";
import { useVideoStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const mainItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Flame, label: "Trending", href: "/?q=trending" },
];

const youItems = [
  { icon: History, label: "History", href: "#" },
  { icon: Clock, label: "Watch later", href: "#" },
  { icon: ThumbsUp, label: "Liked videos", href: "#" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen } = useVideoStore();

  if (!sidebarOpen) {
    return (
      <aside className="fixed left-0 top-14 bottom-0 w-[72px] bg-white z-40 overflow-y-auto hidden md:flex flex-col items-center pt-2 gap-1">
        {mainItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center w-16 h-16 rounded-xl hover:bg-[#F2F2F2] transition-colors",
              pathname === item.href && "bg-[#F2F2F2]"
            )}
          >
            <item.icon className="w-5 h-5 mb-1" />
            <span className="text-[10px]">{item.label}</span>
          </Link>
        ))}
        <Link
          href="/upload"
          className="flex flex-col items-center justify-center w-16 h-16 rounded-xl hover:bg-[#F2F2F2] transition-colors"
        >
          <Upload className="w-5 h-5 mb-1" />
          <span className="text-[10px]">Upload</span>
        </Link>
      </aside>
    );
  }

  return (
    <aside className="fixed left-0 top-14 bottom-0 w-[240px] bg-white z-40 overflow-y-auto hidden md:block border-r border-transparent">
      <div className="px-3 pt-3 pb-2">
        {mainItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex items-center gap-6 px-3 py-2.5 rounded-xl hover:bg-[#F2F2F2] transition-colors text-sm font-medium",
              pathname === item.href &&
                "bg-[#F2F2F2] font-bold"
            )}
          >
            <item.icon
              className={cn(
                "w-5 h-5",
                pathname === item.href && "fill-current"
              )}
            />
            <span>{item.label}</span>
          </Link>
        ))}
        <Link
          href="/upload"
          className="flex items-center gap-6 px-3 py-2.5 rounded-xl hover:bg-[#F2F2F2] transition-colors text-sm font-medium"
        >
          <Upload className="w-5 h-5" />
          <span>Upload</span>
        </Link>
      </div>

      <hr className="mx-3 border-[#E5E5E5]" />

      <div className="px-3 pt-4 pb-2">
        <h3 className="px-3 pb-1 text-base font-medium">You</h3>
        {youItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-6 px-3 py-2.5 rounded-xl hover:bg-[#F2F2F2] transition-colors text-sm font-medium"
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>

      <hr className="mx-3 border-[#E5E5E5]" />

      <div className="px-6 pt-4 pb-6">
        <p className="text-xs text-[#606060] leading-relaxed">
          Not affiliated with YouTube.
          <br />
          Educational purposes only.
        </p>
      </div>
    </aside>
  );
}
