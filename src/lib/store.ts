import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Channel, Video } from "./types";
import { seedChannels, seedVideos } from "./seed-data";

interface VideoStore {
  channels: Channel[];
  videos: Video[];
  sidebarOpen: boolean;
  searchQuery: string;

  // Actions
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  setSearchQuery: (query: string) => void;

  // Video actions
  addVideo: (video: Video) => void;
  incrementViews: (videoId: string) => void;
  getVideoById: (videoId: string) => Video | undefined;
  getVideosByChannel: (channelId: string) => Video[];
  getFilteredVideos: () => Video[];
  getRecommendedVideos: (excludeVideoId: string) => Video[];

  // Channel actions
  addChannel: (channel: Channel) => void;
  getChannelById: (channelId: string) => Channel | undefined;
  getChannelBySlug: (slug: string) => Channel | undefined;
  findOrCreateChannel: (name: string) => Channel;
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export const useVideoStore = create<VideoStore>()(
  persist(
    (set, get) => ({
      channels: seedChannels,
      videos: seedVideos,
      sidebarOpen: true,
      searchQuery: "",

      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSearchQuery: (query) => set({ searchQuery: query }),

      addVideo: (video) =>
        set((state) => ({ videos: [video, ...state.videos] })),

      incrementViews: (videoId) =>
        set((state) => ({
          videos: state.videos.map((v) =>
            v.id === videoId ? { ...v, views: v.views + 1 } : v
          ),
        })),

      getVideoById: (videoId) => get().videos.find((v) => v.id === videoId),

      getVideosByChannel: (channelId) =>
        get()
          .videos.filter((v) => v.channelId === channelId)
          .sort(
            (a, b) =>
              new Date(b.uploadedAt).getTime() -
              new Date(a.uploadedAt).getTime()
          ),

      getFilteredVideos: () => {
        const { videos, searchQuery } = get();
        if (!searchQuery.trim()) return videos;
        const q = searchQuery.toLowerCase();
        return videos.filter(
          (v) =>
            v.title.toLowerCase().includes(q) ||
            v.description.toLowerCase().includes(q)
        );
      },

      getRecommendedVideos: (excludeVideoId) =>
        get()
          .videos.filter((v) => v.id !== excludeVideoId)
          .sort(
            (a, b) =>
              new Date(b.uploadedAt).getTime() -
              new Date(a.uploadedAt).getTime()
          )
          .slice(0, 10),

      addChannel: (channel) =>
        set((state) => ({ channels: [...state.channels, channel] })),

      getChannelById: (channelId) =>
        get().channels.find((c) => c.id === channelId),

      getChannelBySlug: (slug) =>
        get().channels.find((c) => c.slug === slug),

      findOrCreateChannel: (name) => {
        const slug = generateSlug(name);
        const existing = get().channels.find((c) => c.slug === slug);
        if (existing) return existing;

        const newChannel: Channel = {
          id: `ch-${generateId()}`,
          name,
          slug,
          subscriberCount: 0,
          createdAt: new Date().toISOString(),
        };
        get().addChannel(newChannel);
        return newChannel;
      },
    }),
    {
      name: "video-platform-store",
      // Only persist channels and videos, not UI state
      partialize: (state) => ({
        channels: state.channels,
        videos: state.videos,
      }),
      // Merge persisted data with seed data to avoid duplicates
      merge: (persistedState, currentState) => {
        const persisted = persistedState as Partial<VideoStore> | undefined;
        if (!persisted) return currentState;

        // Merge channels: use persisted channels, add any seed channels not already present
        const persistedChannels = persisted.channels || [];
        const persistedChannelIds = new Set(
          persistedChannels.map((c) => c.id)
        );
        const mergedChannels = [
          ...persistedChannels,
          ...seedChannels.filter((c) => !persistedChannelIds.has(c.id)),
        ];

        // Merge videos: use persisted videos, add any seed videos not already present
        const persistedVideos = persisted.videos || [];
        const persistedVideoIds = new Set(persistedVideos.map((v) => v.id));
        const mergedVideos = [
          ...persistedVideos,
          ...seedVideos.filter((v) => !persistedVideoIds.has(v.id)),
        ];

        return {
          ...currentState,
          channels: mergedChannels,
          videos: mergedVideos,
        };
      },
    }
  )
);
