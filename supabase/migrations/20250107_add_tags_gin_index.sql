CREATE INDEX IF NOT EXISTS idx_videos_tags ON videos USING GIN(tags);
