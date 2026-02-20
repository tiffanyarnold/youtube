import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders, status: 200 });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const {
      channel_name,
      title,
      description,
      thumbnail_url,
      video_url,
      duration,
      tags,
    } = await req.json();

    if (!channel_name || !title || !video_url) {
      throw new Error("channel_name, title, and video_url are required");
    }

    const slug = generateSlug(channel_name);

    const { data: existingChannel } = await supabase
      .from("channels")
      .select("*")
      .eq("slug", slug)
      .single();

    let channel = existingChannel;

    if (!channel) {
      const { data: newChannel, error: channelError } = await supabase
        .from("channels")
        .insert({
          name: channel_name,
          slug,
          subscriber_count: 0,
        })
        .select()
        .single();

      if (channelError) throw channelError;
      channel = newChannel;
    }

    const { data: video, error: videoError } = await supabase
      .from("videos")
      .insert({
        channel_id: channel.id,
        title: title.trim(),
        description: (description || "").trim(),
        thumbnail_url: thumbnail_url || `https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=400&q=80`,
        video_url,
        views: 0,
        duration: duration || "0:00",
        tags: (tags || []).map((t: string) => t.toLowerCase().trim()).filter(Boolean),
      })
      .select("*, channels!inner(id, name, slug, avatar_url, banner_url, description, subscriber_count, created_at)")
      .single();

    if (videoError) throw videoError;

    return new Response(JSON.stringify(video), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
