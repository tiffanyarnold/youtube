DROP POLICY IF EXISTS "Public update channels" ON channels;
CREATE POLICY "Public update channels"
  ON channels FOR UPDATE
  USING (true)
  WITH CHECK (true);
