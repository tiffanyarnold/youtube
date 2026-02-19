"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ThumbsUp, ThumbsDown, Share2, ChevronDown, ChevronUp } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { VideoPlayer } from "@/components/video-player";
import { VideoCard } from "@/components/video-card";
import { useVideoStore } from "@/lib/store";
import { formatViews, formatTimeAgo, formatSubscribers } from "@/lib/format";

export default function WatchPage() {
  const params = useParams();
  const videoId = params.videoId as string;
  const {
    getVideoById,
    getChannelById,
    getRecommendedVideos,
    incrementViews,
  } = useVideoStore();

  const [descExpanded, setDescExpanded] = useState(false);
  const [viewIncremented, setViewIncremented] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const video = getVideoById(videoId);
  const channel = video ? getChannelById(video.channelId) : undefined;
  const recommended = getRecommendedVideos(videoId);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (video && !viewIncremented) {
      incrementViews(videoId);
      setViewIncremented(true);
    }
  }, [videoId, video, viewIncremented, incrementViews]);

  // Reset when videoId changes
  useEffect(() => {
    setViewIncremented(false);
    setDescExpanded(false);
  }, [videoId]);

  if (!hydrated) {
    return (
      <AppShell>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-8 h-8 border-2 border-[#E5E5E5] border-t-[#FF0000] rounded-full animate-spin" />
        </div>
      </AppShell>
    );
  }

  if (!video) {
    return (
      <AppShell>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="text-xl font-medium text-[#0F0F0F] mb-2">
              Video not found
            </h2>
            <p className="text-sm text-[#606060] mb-4">
              The video you're looking for doesn't exist.
            </p>
            <Link
              href="/"
              className="text-sm text-[#065FD4] hover:underline"
            >
              Go back home
            </Link>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell hideSidebar>
      <div className="max-w-[1920px] mx-auto px-4 md:px-6 lg:px-24 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Video player */}
            <VideoPlayer
              src={video.videoUrl}
              poster={video.thumbnailUrl}
            />

            {/* Video info */}
            <div className="mt-3">
              <h1 className="text-xl font-bold text-[#0F0F0F] leading-7">
                {video.title}
              </h1>

              {/* Channel info + actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-3 gap-4">
                <div className="flex items-center gap-3">
                  {channel && (
                    <Link
                      href={`/c/${channel.slug}`}
                      className="flex-shrink-0"
                    >
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-[#E5E5E5]">
                        {channel.avatarUrl ? (
                          <Image
                            src={channel.avatarUrl}
                            alt={channel.name}
                            width={40}
                            height={40}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-sm font-medium text-[#606060]">
                            {channel.name.charAt(0)}
                          </div>
                        )}
                      </div>
                    </Link>
                  )}
                  <div>
                    {channel && (
                      <>
                        <Link
                          href={`/c/${channel.slug}`}
                          className="text-sm font-medium text-[#0F0F0F] hover:text-[#0F0F0F]"
                        >
                          {channel.name}
                        </Link>
                        <p className="text-xs text-[#606060]">
                          {formatSubscribers(channel.subscriberCount)}
                        </p>
                      </>
                    )}
                  </div>
                  <button className="ml-2 px-4 py-2 bg-[#0F0F0F] text-white text-sm font-medium rounded-full hover:bg-[#272727] transition-colors">
                    Subscribe
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-[#F2F2F2] rounded-full overflow-hidden">
                    <button className="flex items-center gap-1.5 px-4 py-2 hover:bg-[#E5E5E5] transition-colors border-r border-[#CCCCCC]">
                      <ThumbsUp className="w-5 h-5" />
                      <span className="text-sm font-medium">
                        {Math.floor(video.views * 0.04)}
                      </span>
                    </button>
                    <button className="px-3 py-2 hover:bg-[#E5E5E5] transition-colors">
                      <ThumbsDown className="w-5 h-5" />
                    </button>
                  </div>
                  <button className="flex items-center gap-1.5 px-4 py-2 bg-[#F2F2F2] hover:bg-[#E5E5E5] rounded-full transition-colors">
                    <Share2 className="w-5 h-5" />
                    <span className="text-sm font-medium">Share</span>
                  </button>
                </div>
              </div>

              {/* Description */}
              <div className="mt-4 bg-[#F2F2F2] rounded-xl p-3">
                <div className="flex items-center gap-2 text-sm font-medium text-[#0F0F0F] mb-1">
                  <span>{formatViews(video.views)}</span>
                  <span>·</span>
                  <span>{formatTimeAgo(video.uploadedAt)}</span>
                </div>
                <div
                  className={`text-sm text-[#0F0F0F] whitespace-pre-wrap ${
                    !descExpanded ? "line-clamp-2" : ""
                  }`}
                >
                  {video.description}
                </div>
                {video.description.length > 100 && (
                  <button
                    onClick={() => setDescExpanded(!descExpanded)}
                    className="text-sm font-medium text-[#0F0F0F] mt-2 flex items-center gap-1 hover:text-[#606060]"
                  >
                    {descExpanded ? (
                      <>
                        Show less <ChevronUp className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        ...more <ChevronDown className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - recommended videos */}
          <div className="w-full lg:w-[402px] flex-shrink-0">
            <h3 className="text-base font-medium text-[#0F0F0F] mb-4 hidden lg:block">
              Up next
            </h3>
            <div className="space-y-3">
              {recommended.map((rec) => {
                const recChannel = getChannelById(rec.channelId);
                return (
                  <VideoCard
                    key={rec.id}
                    video={rec}
                    channel={recChannel}
                    compact
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
