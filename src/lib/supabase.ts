import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

// Client-side only Supabase client using public env vars.
// Do NOT import this from Server Components — use @supabase/ssr instead.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
