CREATE TABLE IF NOT EXISTS channels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  banner_url TEXT,
  description TEXT,
  subscriber_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  channel_id UUID NOT NULL REFERENCES channels(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  thumbnail_url TEXT NOT NULL,
  video_url TEXT NOT NULL,
  views INTEGER DEFAULT 0,
  duration TEXT DEFAULT '0:00',
  uploaded_at TIMESTAMPTZ DEFAULT NOW(),
  tags TEXT[] DEFAULT '{}'
);

CREATE INDEX IF NOT EXISTS idx_videos_channel_id ON videos(channel_id);
CREATE INDEX IF NOT EXISTS idx_videos_uploaded_at ON videos(uploaded_at DESC);
CREATE INDEX IF NOT EXISTS idx_channels_slug ON channels(slug);

ALTER TABLE channels REPLICA IDENTITY FULL;
ALTER TABLE videos REPLICA IDENTITY FULL;

ALTER PUBLICATION supabase_realtime ADD TABLE channels;
ALTER PUBLICATION supabase_realtime ADD TABLE videos;

INSERT INTO channels (id, name, slug, avatar_url, banner_url, description, subscriber_count, created_at) VALUES
  ('a0000000-0000-0000-0000-000000000001', 'Tech Explained', 'tech-explained', 'https://images.unsplash.com/photo-1535303311164-664fc9ec6532?w=100&q=80', 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80', 'Making technology simple and accessible for everyone. Weekly uploads on the latest tech trends.', 245000, '2024-01-15T10:00:00Z'),
  ('a0000000-0000-0000-0000-000000000002', 'Creative Studio', 'creative-studio', 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=100&q=80', 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1200&q=80', 'Tutorials, tips, and creative inspiration for artists and designers.', 89000, '2024-02-20T14:30:00Z'),
  ('a0000000-0000-0000-0000-000000000003', 'Cooking Mastery', 'cooking-mastery', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=100&q=80', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80', 'Master the art of cooking with chef-level techniques broken down for home cooks.', 412000, '2023-11-05T08:00:00Z'),
  ('a0000000-0000-0000-0000-000000000004', 'Travel Diaries', 'travel-diaries', 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=100&q=80', 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80', 'Exploring the world one destination at a time. Travel vlogs, tips, and hidden gems.', 178000, '2024-03-10T12:00:00Z'),
  ('a0000000-0000-0000-0000-000000000005', 'Fitness Flow', 'fitness-flow', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&q=80', 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80', 'Full body workouts, nutrition advice, and fitness motivation.', 560000, '2023-08-22T06:00:00Z')
ON CONFLICT (id) DO NOTHING;

INSERT INTO videos (id, channel_id, title, description, thumbnail_url, video_url, views, duration, uploaded_at, tags) VALUES
  ('b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'Why AI Will Change Everything in 2025', 'Artificial intelligence is rapidly transforming every industry. In this video, we break down the top AI trends for 2025 and what they mean for everyday people.', 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 1240000, '12:34', '2025-02-18T10:00:00Z', '{"ai","technology","2025"}'),
  ('b0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000002', 'Digital Art Masterclass: From Sketch to Final', 'Watch the complete process of creating a digital artwork from initial sketch to polished final piece.', 'https://images.unsplash.com/photo-1561998338-13ad7883b20f?w=400&q=80', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', 356000, '18:22', '2025-02-17T14:30:00Z', '{"art","design","tutorial"}'),
  ('b0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000003', 'Perfect Homemade Pasta in 30 Minutes', 'Learn how to make restaurant-quality fresh pasta at home with just 3 ingredients.', 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', 892000, '8:15', '2025-02-16T08:00:00Z', '{"cooking","pasta","recipe"}'),
  ('b0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000004', 'Hidden Gems of Kyoto: A Complete Travel Guide', 'Discover the lesser-known temples, gardens, and food spots in Kyoto, Japan.', 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&q=80', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', 567000, '22:10', '2025-02-15T12:00:00Z', '{"travel","japan","kyoto"}'),
  ('b0000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000005', '30 Minute Full Body HIIT Workout - No Equipment', 'Get a complete workout in just 30 minutes! High-intensity interval training for all fitness levels.', 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', 2100000, '31:05', '2025-02-14T06:00:00Z', '{"fitness","hiit","workout"}'),
  ('b0000000-0000-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000001', 'Building Your First App with React & Next.js', 'A beginner-friendly tutorial on building a complete web application using React and Next.js.', 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&q=80', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4', 445000, '45:30', '2025-02-13T10:00:00Z', '{"react","nextjs","tutorial"}'),
  ('b0000000-0000-0000-0000-000000000007', 'a0000000-0000-0000-0000-000000000002', 'Color Theory Explained: A Designer''s Guide', 'Understanding color theory is essential for any designer.', 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&q=80', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4', 223000, '15:48', '2025-02-12T14:30:00Z', '{"design","color","theory"}'),
  ('b0000000-0000-0000-0000-000000000008', 'a0000000-0000-0000-0000-000000000003', '5 Japanese Recipes You Must Try at Home', 'From ramen to gyoza, these 5 Japanese recipes are easier than you think.', 'https://images.unsplash.com/photo-1617196034183-421b4917c92d?w=400&q=80', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4', 678000, '24:15', '2025-02-11T08:00:00Z', '{"cooking","japanese","recipe"}'),
  ('b0000000-0000-0000-0000-000000000009', 'a0000000-0000-0000-0000-000000000004', 'Backpacking Through Southeast Asia on a Budget', 'Everything you need to know about traveling through Thailand, Vietnam, and Cambodia on less than $50/day.', 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=400&q=80', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4', 334000, '19:33', '2025-02-10T12:00:00Z', '{"travel","budget","asia"}'),
  ('b0000000-0000-0000-0000-000000000010', 'a0000000-0000-0000-0000-000000000005', 'Yoga for Beginners: Morning Flow Routine', 'Start your day with this gentle 20-minute yoga flow. Perfect for beginners.', 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4', 1560000, '20:00', '2025-02-09T06:00:00Z', '{"yoga","fitness","beginners"}'),
  ('b0000000-0000-0000-0000-000000000011', 'a0000000-0000-0000-0000-000000000001', 'The Future of Electric Vehicles Explained', 'EVs are taking over the automotive industry. We explore battery technology and charging infrastructure.', 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&q=80', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4', 789000, '16:42', '2025-02-08T10:00:00Z', '{"ev","technology","cars"}'),
  ('b0000000-0000-0000-0000-000000000012', 'a0000000-0000-0000-0000-000000000002', 'UI/UX Design Trends 2025', 'Stay ahead of the curve with these emerging design trends.', 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&q=80', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4', 198000, '11:20', '2025-02-07T14:30:00Z', '{"design","ui","ux","trends"}')
ON CONFLICT (id) DO NOTHING;
