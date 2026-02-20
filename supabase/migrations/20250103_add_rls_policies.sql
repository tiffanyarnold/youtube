ALTER TABLE channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read channels" ON channels;
CREATE POLICY "Public read channels"
  ON channels FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Public insert channels" ON channels;
CREATE POLICY "Public insert channels"
  ON channels FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Public read videos" ON videos;
CREATE POLICY "Public read videos"
  ON videos FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Public insert videos" ON videos;
CREATE POLICY "Public insert videos"
  ON videos FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Public update videos" ON videos;
CREATE POLICY "Public update videos"
  ON videos FOR UPDATE
  USING (true)
  WITH CHECK (true);
