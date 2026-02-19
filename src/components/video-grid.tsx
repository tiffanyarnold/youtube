"use client";

import React from "react";
import { Video } from "@/lib/types";
import { VideoCard } from "@/components/video-card";
import { useVideoStore } from "@/lib/store";

interface VideoGridProps {
  videos: Video[];
}

export function VideoGrid({ videos }: VideoGridProps) {
  const { getChannelById } = useVideoStore();

  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-24 h-24 rounded-full bg-[#F1F1F1] flex items-center justify-center mb-4">
          <svg
            className="w-12 h-12 text-[#909090]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>
        <h3 className="text-xl font-medium text-[#0F0F0F] mb-2">
          No videos found
        </h3>
        <p className="text-sm text-[#606060]">
          Try different keywords or remove search filter
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
      {videos.map((video) => {
        const channel = getChannelById(video.channelId);
        return (
          <VideoCard key={video.id} video={video} channel={channel} />
        );
      })}
    </div>
  );
}
