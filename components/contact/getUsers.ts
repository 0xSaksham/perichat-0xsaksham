import { createBrowserSupabaseClient } from "@/utils/supabase-client";
import { Database } from "@/types/supabase";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export async function getUsers(): Promise<{ username: string }[]> {
  const supabase = createBrowserSupabaseClient();

  try {
    // First check if user is authenticated
    const { data: session, error: authError } =
      await supabase.auth.getSession();
    if (authError || !session.session) {
      console.error("Authentication error:", authError?.message);
      return [];
    }

    // Query profiles table for usernames
    const { data: profiles, error } = await supabase
      .from("profiles")
      .select("username")
      .order("username");

    if (error) {
      console.error("Error fetching users:", error.message);
      return [];
    }

    return profiles || [];
  } catch (error) {
    console.error("Error in getUsers:", error);
    return [];
  }
}
