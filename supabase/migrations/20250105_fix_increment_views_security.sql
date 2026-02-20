CREATE OR REPLACE FUNCTION increment_views(vid UUID)
RETURNS void AS $$
BEGIN
  UPDATE videos SET views = views + 1 WHERE id = vid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
