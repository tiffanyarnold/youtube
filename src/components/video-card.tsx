"use client";

import React from "react";
import Link from "next/link";
import { Video, Channel } from "@/lib/types";
import { formatViews, formatTimeAgo } from "@/lib/format";
import { SafeImage } from "@/components/safe-image";

interface VideoCardProps {
  video: Video;
  channel?: Channel;
  compact?: boolean;
}

export function VideoCard({ video, channel, compact = false }: VideoCardProps) {
  if (compact) {
    return (
      <Link href={`/watch/${video.id}`} className="flex gap-2 group">
        <div className="relative flex-shrink-0 w-[168px] aspect-video rounded-lg overflow-hidden bg-[#F1F1F1]">
          <SafeImage
            src={video.thumbnailUrl}
            alt={video.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-150"
            sizes="168px"
          />
          <span className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 py-0.5 rounded text-[11px] font-medium">
            {video.duration}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-[#0F0F0F] line-clamp-2 leading-5 mb-1">
            {video.title}
          </h3>
          {channel && (
            <p className="text-xs text-[#606060] hover:text-[#0F0F0F] transition-colors">
              {channel.name}
            </p>
          )}
          <p className="text-xs text-[#606060]">
            {formatViews(video.views)} · {formatTimeAgo(video.uploadedAt)}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <div className="group">
      <Link href={`/watch/${video.id}`} className="block">
        <div className="relative aspect-video rounded-xl overflow-hidden bg-[#F1F1F1] mb-3">
          <SafeImage
            src={video.thumbnailUrl}
            alt={video.title}
            fill
            className="object-cover group-hover:scale-[1.03] transition-transform duration-150 ease-out"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded font-medium">
            {video.duration}
          </span>
        </div>
      </Link>

      <div className="flex gap-3">
        {channel && (
          <Link href={`/c/${channel.slug}`} className="flex-shrink-0">
            <div className="w-9 h-9 rounded-full overflow-hidden bg-[#E5E5E5]">
              {channel.avatarUrl ? (
                <SafeImage
                  src={channel.avatarUrl}
                  alt={channel.name}
                  width={36}
                  height={36}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-sm font-medium text-[#606060] bg-[#E5E5E5]">
                  {channel.name.charAt(0)}
                </div>
              )}
            </div>
          </Link>
        )}

        <div className="flex-1 min-w-0">
          <Link href={`/watch/${video.id}`} className="block">
            <h3 className="text-sm font-medium text-[#0F0F0F] line-clamp-2 leading-5 mb-1">
              {video.title}
            </h3>
          </Link>

          {channel && (
            <Link
              href={`/c/${channel.slug}`}
              className="text-xs text-[#606060] hover:text-[#0F0F0F] transition-colors block mb-0.5"
            >
              {channel.name}
            </Link>
          )}
          <p className="text-xs text-[#606060]">
            {formatViews(video.views)} · {formatTimeAgo(video.uploadedAt)}
          </p>
        </div>
      </div>
    </div>
  );
}
