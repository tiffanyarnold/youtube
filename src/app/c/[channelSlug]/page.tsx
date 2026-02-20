"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Upload } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { ErrorBoundary } from "@/components/error-boundary";
import { VideoGrid } from "@/components/video-grid";
import { SafeImage } from "@/components/safe-image";
import { useVideoStore } from "@/lib/store";
import { formatSubscribers } from "@/lib/format";
import { Channel, Video } from "@/lib/types";

export default function ChannelPage() {
  const params = useParams();
  const channelSlug = params.channelSlug as string;
  const { loadChannelBySlug, loadChannelVideos } = useVideoStore();

  const [loading, setLoading] = useState(true);
  const [channel, setChannel] = useState<Channel | null>(null);
  const [channelVideos, setChannelVideos] = useState<Video[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      const ch = await loadChannelBySlug(channelSlug);
      if (cancelled) return;

      setChannel(ch);

      if (ch) {
        const results = await loadChannelVideos(ch.id);
        if (!cancelled) {
          setChannelVideos(results.map((r) => r.video));
        }
      }

      if (!cancelled) setLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [channelSlug, loadChannelBySlug, loadChannelVideos]);

  if (loading) {
    return (
      <ErrorBoundary>
        <AppShell>
          <div className="flex items-center justify-center py-32">
            <div className="w-8 h-8 border-2 border-[#E5E5E5] border-t-[#FF0000] rounded-full animate-spin" />
          </div>
        </AppShell>
      </ErrorBoundary>
    );
  }

  if (!channel) {
    return (
      <ErrorBoundary>
        <AppShell>
        <div className="flex flex-col items-center justify-center py-32 text-center px-4">
          <div className="w-24 h-24 rounded-full bg-[#F1F1F1] flex items-center justify-center mb-4">
            <svg
              className="w-12 h-12 text-[#909090]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-[#0F0F0F] mb-2">
            Channel not found
          </h3>
          <p className="text-sm text-[#606060] mb-6">
            This channel doesn&apos;t exist or may have been removed.
          </p>
          <Link
            href="/"
            className="px-6 py-2.5 bg-[#0F0F0F] text-white text-sm font-medium rounded-full hover:bg-[#272727] transition-colors"
          >
            Go home
          </Link>
        </div>
      </AppShell>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
    <AppShell>
      <div className="max-w-[1284px] mx-auto">
        {/* Banner */}
        {channel.bannerUrl ? (
          <div className="w-full h-[120px] sm:h-[172px] md:h-[212px] rounded-xl overflow-hidden mx-4 md:mx-6 mt-4 max-w-[calc(100%-32px)] md:max-w-[calc(100%-48px)]">
            <SafeImage
              src={channel.bannerUrl}
              alt={`${channel.name} banner`}
              width={1284}
              height={212}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        ) : (
          <div className="w-full h-[120px] sm:h-[172px] md:h-[212px] rounded-xl bg-gradient-to-r from-[#065FD4] to-[#FF0000] mx-4 md:mx-6 mt-4 max-w-[calc(100%-32px)] md:max-w-[calc(100%-48px)]" />
        )}

        {/* Channel info */}
        <div className="px-4 md:px-6 py-4 md:py-6">
          <div className="flex items-start gap-4 md:gap-6">
            {/* Avatar */}
            <div className="w-16 h-16 md:w-[88px] md:h-[88px] rounded-full overflow-hidden bg-[#E5E5E5] flex-shrink-0">
              {channel.avatarUrl ? (
                <SafeImage
                  src={channel.avatarUrl}
                  alt={channel.name}
                  width={88}
                  height={88}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl md:text-3xl font-medium text-[#606060] bg-[#E5E5E5]">
                  {channel.name.charAt(0)}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h1 className="text-xl md:text-2xl font-medium text-[#0F0F0F] mb-1">
                {channel.name}
              </h1>
              <div className="flex flex-wrap items-center gap-1 text-sm text-[#606060] mb-2">
                <span>@{channel.slug}</span>
                <span>·</span>
                <span>{formatSubscribers(channel.subscriberCount)}</span>
                <span>·</span>
                <span>
                  {channelVideos.length} video
                  {channelVideos.length !== 1 ? "s" : ""}
                </span>
              </div>
              {channel.description && (
                <p className="text-sm text-[#606060] line-clamp-2 max-w-2xl mb-3">
                  {channel.description}
                </p>
              )}
              <Link
                href="/upload"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF0000] text-white text-sm font-medium rounded-full hover:bg-[#CC0000] transition-colors active:scale-[0.98]"
              >
                <Upload className="w-4 h-4" />
                Upload video
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-b border-[#E5E5E5] mx-4 md:mx-6" />

        {/* Videos section */}
        <div className="px-4 md:px-6 pt-6 pb-8">
          <h2 className="text-base font-medium text-[#0F0F0F] mb-4">
            Videos
          </h2>
          {channelVideos.length > 0 ? (
            <VideoGrid videos={channelVideos} />
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-24 h-24 rounded-full bg-[#F1F1F1] flex items-center justify-center mb-4">
                <Upload className="w-10 h-10 text-[#909090]" />
              </div>
              <h3 className="text-lg font-medium text-[#0F0F0F] mb-2">
                No videos yet
              </h3>
              <p className="text-sm text-[#606060] mb-6">
                Upload your first video to this channel
              </p>
              <Link
                href="/upload"
                className="px-6 py-2.5 bg-[#FF0000] text-white text-sm font-medium rounded-full hover:bg-[#CC0000] transition-colors active:scale-[0.98]"
              >
                Upload a video
              </Link>
            </div>
          )}
        </div>
      </div>
    </AppShell>
    </ErrorBoundary>
  );
}
