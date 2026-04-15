import { Channel, Video } from "./types";

export const DEMO_CHANNELS: Channel[] = [
  {
    id: "a0000000-0000-0000-0000-000000000001",
    name: "Tech Explained",
    slug: "tech-explained",
    avatarUrl:
      "https://images.unsplash.com/photo-1535303311164-664fc9ec6532?w=100&q=80",
    bannerUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
    description:
      "Making technology simple and accessible for everyone. Weekly uploads on the latest tech trends.",
    subscriberCount: 245000,
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "a0000000-0000-0000-0000-000000000002",
    name: "Creative Studio",
    slug: "creative-studio",
    avatarUrl:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=100&q=80",
    bannerUrl:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1200&q=80",
    description:
      "Tutorials, tips, and creative inspiration for artists and designers.",
    subscriberCount: 89000,
    createdAt: "2024-02-20T14:30:00Z",
  },
  {
    id: "a0000000-0000-0000-0000-000000000003",
    name: "Cooking Mastery",
    slug: "cooking-mastery",
    avatarUrl:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=100&q=80",
    bannerUrl:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80",
    description:
      "Master the art of cooking with chef-level techniques broken down for home cooks.",
    subscriberCount: 412000,
    createdAt: "2023-11-05T08:00:00Z",
  },
  {
    id: "a0000000-0000-0000-0000-000000000004",
    name: "Travel Diaries",
    slug: "travel-diaries",
    avatarUrl:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=100&q=80",
    bannerUrl:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80",
    description:
      "Exploring the world one destination at a time. Travel vlogs, tips, and hidden gems.",
    subscriberCount: 178000,
    createdAt: "2024-03-10T12:00:00Z",
  },
  {
    id: "a0000000-0000-0000-0000-000000000005",
    name: "Fitness Flow",
    slug: "fitness-flow",
    avatarUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&q=80",
    bannerUrl:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80",
    description:
      "Full body workouts, nutrition advice, and fitness motivation.",
    subscriberCount: 560000,
    createdAt: "2023-08-22T06:00:00Z",
  },
];

export const DEMO_VIDEOS: Video[] = [
  {
    id: "b0000000-0000-0000-0000-000000000001",
    channelId: "a0000000-0000-0000-0000-000000000001",
    title: "Why AI Will Change Everything in 2025",
    description:
      "Artificial intelligence is rapidly transforming every industry. In this video, we break down the top AI trends for 2025 and what they mean for everyday people.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    views: 1240000,
    duration: "12:34",
    uploadedAt: "2025-02-18T10:00:00Z",
    tags: ["ai", "technology", "2025"],
  },
  {
    id: "b0000000-0000-0000-0000-000000000002",
    channelId: "a0000000-0000-0000-0000-000000000002",
    title: "Digital Art Masterclass: From Sketch to Final",
    description:
      "Watch the complete process of creating a digital artwork from initial sketch to polished final piece.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1561998338-13ad7883b20f?w=400&q=80",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    views: 356000,
    duration: "18:22",
    uploadedAt: "2025-02-17T14:30:00Z",
    tags: ["art", "design", "tutorial"],
  },
  {
    id: "b0000000-0000-0000-0000-000000000003",
    channelId: "a0000000-0000-0000-0000-000000000003",
    title: "Perfect Homemade Pasta in 30 Minutes",
    description:
      "Learn how to make restaurant-quality fresh pasta at home with just 3 ingredients.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    views: 892000,
    duration: "8:15",
    uploadedAt: "2025-02-16T08:00:00Z",
    tags: ["cooking", "pasta", "recipe"],
  },
  {
    id: "b0000000-0000-0000-0000-000000000004",
    channelId: "a0000000-0000-0000-0000-000000000004",
    title: "Hidden Gems of Kyoto: A Complete Travel Guide",
    description:
      "Discover the lesser-known temples, gardens, and food spots in Kyoto, Japan.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&q=80",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    views: 567000,
    duration: "22:10",
    uploadedAt: "2025-02-15T12:00:00Z",
    tags: ["travel", "japan", "kyoto"],
  },
  {
    id: "b0000000-0000-0000-0000-000000000005",
    channelId: "a0000000-0000-0000-0000-000000000005",
    title: "30 Minute Full Body HIIT Workout - No Equipment",
    description:
      "Get a complete workout in just 30 minutes! High-intensity interval training for all fitness levels.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    views: 2100000,
    duration: "31:05",
    uploadedAt: "2025-02-14T06:00:00Z",
    tags: ["fitness", "hiit", "workout"],
  },
  {
    id: "b0000000-0000-0000-0000-000000000006",
    channelId: "a0000000-0000-0000-0000-000000000001",
    title: "Building Your First App with React & Next.js",
    description:
      "A beginner-friendly tutorial on building a complete web application using React and Next.js.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&q=80",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    views: 445000,
    duration: "45:30",
    uploadedAt: "2025-02-13T10:00:00Z",
    tags: ["react", "nextjs", "tutorial"],
  },
  {
    id: "b0000000-0000-0000-0000-000000000007",
    channelId: "a0000000-0000-0000-0000-000000000002",
    title: "Color Theory Explained: A Designer's Guide",
    description:
      "Understanding color theory is essential for any designer.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&q=80",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    views: 223000,
    duration: "15:48",
    uploadedAt: "2025-02-12T14:30:00Z",
    tags: ["design", "color", "theory"],
  },
  {
    id: "b0000000-0000-0000-0000-000000000008",
    channelId: "a0000000-0000-0000-0000-000000000003",
    title: "5 Japanese Recipes You Must Try at Home",
    description:
      "From ramen to gyoza, these 5 Japanese recipes are easier than you think.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1617196034183-421b4917c92d?w=400&q=80",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    views: 678000,
    duration: "24:15",
    uploadedAt: "2025-02-11T08:00:00Z",
    tags: ["cooking", "japanese", "recipe"],
  },
  {
    id: "b0000000-0000-0000-0000-000000000009",
    channelId: "a0000000-0000-0000-0000-000000000004",
    title: "Backpacking Through Southeast Asia on a Budget",
    description:
      "Everything you need to know about traveling through Thailand, Vietnam, and Cambodia on less than $50/day.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=400&q=80",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
    views: 334000,
    duration: "19:33",
    uploadedAt: "2025-02-10T12:00:00Z",
    tags: ["travel", "budget", "asia"],
  },
  {
    id: "b0000000-0000-0000-0000-000000000010",
    channelId: "a0000000-0000-0000-0000-000000000005",
    title: "Yoga for Beginners: Morning Flow Routine",
    description:
      "Start your day with this gentle 20-minute yoga flow. Perfect for beginners.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    views: 1560000,
    duration: "20:00",
    uploadedAt: "2025-02-09T06:00:00Z",
    tags: ["yoga", "fitness", "beginners"],
  },
  {
    id: "b0000000-0000-0000-0000-000000000011",
    channelId: "a0000000-0000-0000-0000-000000000001",
    title: "The Future of Electric Vehicles Explained",
    description:
      "EVs are taking over the automotive industry. We explore battery technology and charging infrastructure.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&q=80",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
    views: 789000,
    duration: "16:42",
    uploadedAt: "2025-02-08T10:00:00Z",
    tags: ["ev", "technology", "cars"],
  },
  {
    id: "b0000000-0000-0000-0000-000000000012",
    channelId: "a0000000-0000-0000-0000-000000000002",
    title: "UI/UX Design Trends 2025",
    description:
      "Stay ahead of the curve with these emerging design trends.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&q=80",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
    views: 198000,
    duration: "11:20",
    uploadedAt: "2025-02-07T14:30:00Z",
    tags: ["design", "ui", "ux", "trends"],
  },
];

export function getDemoVideosWithChannels(): { video: Video; channel: Channel }[] {
  const channelMap: Record<string, Channel> = {};
  DEMO_CHANNELS.forEach((c) => {
    channelMap[c.id] = c;
  });

  return DEMO_VIDEOS.map((video) => ({
    video,
    channel: channelMap[video.channelId],
  }));
}

export function getDemoChannelMap(): Record<string, Channel> {
  const map: Record<string, Channel> = {};
  DEMO_CHANNELS.forEach((c) => {
    map[c.id] = c;
  });
  return map;
}
