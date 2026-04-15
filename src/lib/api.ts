import { supabase } from "./supabase";
import { Channel, Video } from "./types";
import type { Database } from "@/types/supabase";
import { getDemoVideosWithChannels, DEMO_CHANNELS } from "./demo-data";

type ChannelRow = Database["public"]["Tables"]["channels"]["Row"];
type VideoRow = Database["public"]["Tables"]["videos"]["Row"];
type VideoWithChannel = VideoRow & { channels: ChannelRow };

// Map snake_case DB rows to camelCase app types
function mapChannel(row: ChannelRow): Channel {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    avatarUrl: row.avatar_url || undefined,
    bannerUrl: row.banner_url || undefined,
    description: row.description || undefined,
    subscriberCount: row.subscriber_count ?? 0,
    createdAt: row.created_at ?? "",
  };
}

function mapVideo(row: VideoRow): Video {
  return {
    id: row.id,
    channelId: row.channel_id,
    title: row.title,
    description: row.description || "",
    thumbnailUrl: row.thumbnail_url,
    videoUrl: row.video_url,
    views: row.views ?? 0,
    duration: row.duration || "0:00",
    uploadedAt: row.uploaded_at ?? "",
    tags: row.tags || [],
  };
}

function mapVideoWithChannel(row: VideoWithChannel): { video: Video; channel: Channel } {
  const channel = row.channels ? mapChannel(row.channels) : mapChannel({} as ChannelRow);
  const video = mapVideo(row);
  return { video, channel };
}

// Sanitize search input to prevent PostgREST query injection
function sanitizeSearch(input: string): string {
  // Escape special PostgREST characters: %, _, (, ), comma, dot, backslash
  return input.replace(/[%_\\(),.*]/g, (char) => `\\${char}`);
}

// -------- API calls using Supabase client directly --------

export async function fetchVideos(options?: {
  search?: string;
  channelId?: string;
  excludeId?: string;
  limit?: number;
  tag?: string;
}): Promise<{ video: Video; channel: Channel }[]> {
  try {
    let query = supabase
      .from("videos")
      .select(
        "*, channels!inner(id, name, slug, avatar_url, banner_url, description, subscriber_count, created_at)"
      )
      .order("uploaded_at", { ascending: false })
      .limit(options?.limit || 50);

    if (options?.search) {
      const sanitized = sanitizeSearch(options.search);
      query = query.or(
        `title.ilike.%${sanitized}%,description.ilike.%${sanitized}%`
      );
    }

    if (options?.tag) {
      query = query.contains("tags", [options.tag]);
    }

    if (options?.channelId) {
      query = query.eq("channel_id", options.channelId);
    }

    if (options?.excludeId) {
      query = query.neq("id", options.excludeId);
    }

    const { data, error } = await query;

    if (error) throw error;

    const results = (data || []).map((row) => mapVideoWithChannel(row as unknown as VideoWithChannel));

    // If database returned empty results and no filters applied, use demo data
    if (results.length === 0 && !options?.search && !options?.channelId && !options?.tag) {
      return applyDemoFilters(options);
    }

    return results;
  } catch {
    // On any error, fallback to demo data
    return applyDemoFilters(options);
  }
}

function applyDemoFilters(options?: {
  search?: string;
  channelId?: string;
  excludeId?: string;
  limit?: number;
  tag?: string;
}): { video: Video; channel: Channel }[] {
  let results = getDemoVideosWithChannels();

  if (options?.search) {
    const term = options.search.toLowerCase();
    results = results.filter(
      (r) =>
        r.video.title.toLowerCase().includes(term) ||
        r.video.description.toLowerCase().includes(term)
    );
  }

  if (options?.tag) {
    const tag = options.tag.toLowerCase();
    results = results.filter((r) =>
      r.video.tags?.some((t) => t.toLowerCase() === tag)
    );
  }

  if (options?.channelId) {
    results = results.filter((r) => r.video.channelId === options.channelId);
  }

  if (options?.excludeId) {
    results = results.filter((r) => r.video.id !== options.excludeId);
  }

  if (options?.limit) {
    results = results.slice(0, options.limit);
  }

  return results;
}

export async function fetchVideoById(
  videoId: string
): Promise<{ video: Video; channel: Channel } | null> {
  try {
    const { data, error } = await supabase
      .from("videos")
      .select(
        "*, channels!inner(id, name, slug, avatar_url, banner_url, description, subscriber_count, created_at)"
      )
      .eq("id", videoId)
      .single();

    if (error) throw error;

    return mapVideoWithChannel(data as unknown as VideoWithChannel);
  } catch {
    // Fallback to demo data
    const demo = getDemoVideosWithChannels().find((r) => r.video.id === videoId);
    return demo || null;
  }
}

export async function fetchChannelBySlug(
  slug: string
): Promise<Channel | null> {
  try {
    const { data, error } = await supabase
      .from("channels")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) throw error;

    return mapChannel(data);
  } catch {
    // Fallback to demo data
    return DEMO_CHANNELS.find((c) => c.slug === slug) || null;
  }
}

export async function fetchChannelVideos(
  channelId: string
): Promise<{ video: Video; channel: Channel }[]> {
  return fetchVideos({ channelId });
}

export async function incrementViews(videoId: string): Promise<void> {
  await supabase.rpc("increment_views", { vid: videoId });
}

export async function uploadVideo(params: {
  channelName: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration?: string;
  tags?: string[];
}): Promise<{ video: Video; channel: Channel }> {
  const { data, error } = await supabase.functions.invoke(
    "supabase-functions-upload-video",
    {
      body: {
        channel_name: params.channelName,
        title: params.title,
        description: params.description,
        thumbnail_url: params.thumbnailUrl,
        video_url: params.videoUrl,
        duration: params.duration || "0:00",
        tags: params.tags || [],
      },
    }
  );

  if (error) throw error;

  return mapVideoWithChannel(data as unknown as VideoWithChannel);
}
