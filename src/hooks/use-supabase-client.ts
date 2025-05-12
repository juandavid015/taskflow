import { createClient } from "@supabase/supabase-js";
import { useSession } from '@clerk/nextjs'

export function useSupabaseClient() {
  const { session } = useSession();

  const supabaseClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      // Session accessed from Clerk SDK, either as Clerk.session (vanilla
      // JavaScript) or useSession (React)
      accessToken: async () => session?.getToken() ?? null,
    }
  )

  return supabaseClient;
}