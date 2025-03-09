import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the SSR package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  console.log("Starting callback route...");
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;
  const redirectTo = requestUrl.searchParams.get("redirect_to")?.toString();

  if (code) {
    console.log("Auth code found, exchanging for session...");
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.exchangeCodeForSession(code);

    if (authError) {
      console.error("Auth error:", authError);
    }

    if (user) {
      console.log("User authenticated:", user.id);
      // Check if user exists in database
      const { data: existingUser, error: fetchError } = await supabase
        .from("users")
        .select()
        .eq("id", user.id)
        .single();

      if (fetchError) {
        console.error("Error fetching user:", fetchError);
      }

      if (!existingUser && !fetchError) {
        console.log("Creating new user in database...");
        // Insert new user
        const { error: insertError } = await supabase.from("users").insert([
          {
            id: user.id,
            email: user.email,
            created_at: new Date().toISOString(),
          },
        ]);

        if (insertError) {
          console.error("Error creating user:", insertError);
        } else {
          console.log("User created successfully");
        }
      } else {
        console.log("User already exists in database");
      }
    }
  }

  if (redirectTo) {
    console.log("Redirecting to:", `${origin}${redirectTo}`);
    return NextResponse.redirect(`${origin}${redirectTo}`);
  }

  console.log("Redirecting to /users");
  return NextResponse.redirect(`${origin}/users`);
}
