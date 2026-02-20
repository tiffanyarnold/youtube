import { create } from "zustand";
import { Channel, Video } from "./types";
import {
  fetchVideos,
  fetchVideoById,
  fetchChannelBySlug,
  fetchChannelVideos,
  incrementViews as apiIncrementViews,
  uploadVideo as apiUploadVideo,
} from "./api";

interface VideoStore {
  // UI state
  sidebarOpen: boolean;
  searchQuery: string;

  // Cached data
  videos: Video[];
  channelMap: Record<string, Channel>;
  videoMap: Record<string, { video: Video; channel: Channel }>;

  // Loading states
  loading: boolean;
  error: string | null;

  // UI Actions
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  setSearchQuery: (query: string) => void;

  // Async data actions
  loadVideos: (search?: string, tag?: string) => Promise<void>;
  loadVideoById: (
    videoId: string
  ) => Promise<{ video: Video; channel: Channel } | null>;
  loadChannelBySlug: (slug: string) => Promise<Channel | null>;
  loadChannelVideos: (
    channelId: string
  ) => Promise<{ video: Video; channel: Channel }[]>;
  loadRecommendedVideos: (
    excludeVideoId: string
  ) => Promise<{ video: Video; channel: Channel }[]>;
  incrementViews: (videoId: string) => Promise<void>;
  uploadVideo: (params: {
    channelName: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    videoUrl: string;
    duration?: string;
    tags?: string[];
  }) => Promise<{ video: Video; channel: Channel }>;

  // Helpers
  getChannelById: (channelId: string) => Channel | undefined;
}

export const useVideoStore = create<VideoStore>()((set, get) => ({
  sidebarOpen: true,
  searchQuery: "",
  videos: [],
  channelMap: {},
  videoMap: {},
  loading: false,
  error: null,

  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSearchQuery: (query) => set({ searchQuery: query }),

  loadVideos: async (search?: string, tag?: string) => {
    set({ loading: true, error: null });
    try {
      const results = await fetchVideos({ search, tag });
      const videos = results.map((r) => r.video);
      const channelMap = { ...get().channelMap };
      results.forEach((r) => {
        channelMap[r.channel.id] = r.channel;
      });
      set({ videos, channelMap, loading: false });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An error occurred";
      set({ error: message, loading: false });
    }
  },

  loadVideoById: async (videoId: string) => {
    try {
      const result = await fetchVideoById(videoId);
      if (result) {
        set((state) => ({
          videoMap: { ...state.videoMap, [videoId]: result },
          channelMap: {
            ...state.channelMap,
            [result.channel.id]: result.channel,
          },
        }));
      }
      return result;
    } catch {
      return null;
    }
  },

  loadChannelBySlug: async (slug: string) => {
    try {
      const channel = await fetchChannelBySlug(slug);
      if (channel) {
        set((state) => ({
          channelMap: { ...state.channelMap, [channel.id]: channel },
        }));
      }
      return channel;
    } catch {
      return null;
    }
  },

  loadChannelVideos: async (channelId: string) => {
    try {
      const results = await fetchChannelVideos(channelId);
      const channelMap = { ...get().channelMap };
      results.forEach((r) => {
        channelMap[r.channel.id] = r.channel;
      });
      set({ channelMap });
      return results;
    } catch {
      return [];
    }
  },

  loadRecommendedVideos: async (excludeVideoId: string) => {
    try {
      const results = await fetchVideos({
        excludeId: excludeVideoId,
        limit: 10,
      });
      const channelMap = { ...get().channelMap };
      results.forEach((r) => {
        channelMap[r.channel.id] = r.channel;
      });
      set({ channelMap });
      return results;
    } catch {
      return [];
    }
  },

  incrementViews: async (videoId: string) => {
    try {
      await apiIncrementViews(videoId);
      // Update local cache
      set((state) => ({
        videos: state.videos.map((v) =>
          v.id === videoId ? { ...v, views: v.views + 1 } : v
        ),
        videoMap: state.videoMap[videoId]
          ? {
              ...state.videoMap,
              [videoId]: {
                ...state.videoMap[videoId],
                video: {
                  ...state.videoMap[videoId].video,
                  views: state.videoMap[videoId].video.views + 1,
                },
              },
            }
          : state.videoMap,
      }));
    } catch {
      // silently fail view increment
    }
  },

  uploadVideo: async (params) => {
    const result = await apiUploadVideo(params);
    set((state) => ({
      videos: [result.video, ...state.videos],
      videoMap: { ...state.videoMap, [result.video.id]: result },
      channelMap: { ...state.channelMap, [result.channel.id]: result.channel },
    }));
    return result;
  },

  getChannelById: (channelId: string) => get().channelMap[channelId],
}));
