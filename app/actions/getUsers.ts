import { createClient } from "@/utils/supabase/server";

export default async function getUsers() {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.from("users").select("*");

    if (error) {
      throw error;
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}
