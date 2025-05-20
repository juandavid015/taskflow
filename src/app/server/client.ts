import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/lib/types/database.types";

export function createServerSupabaseClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,
    {
      async accessToken() {
        return (await auth()).getToken();
      },
    }
  );
}