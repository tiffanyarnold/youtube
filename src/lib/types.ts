export interface Channel {
  id: string;
  name: string;
  slug: string;
  avatarUrl?: string;
  bannerUrl?: string;
  description?: string;
  subscriberCount: number;
  createdAt: string;
}

export interface Video {
  id: string;
  channelId: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  views: number;
  duration: string;
  uploadedAt: string;
  tags?: string[];
}
