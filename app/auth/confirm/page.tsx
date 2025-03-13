"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createBrowserSupabaseClient } from "@/utils/supabase-client";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function ConfirmPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      const supabase = createBrowserSupabaseClient();

      // Get the token from URL parameters
      const token_hash = searchParams.get("token_hash");
      const type = searchParams.get("type");

      if (!token_hash) {
        setError("Invalid confirmation link");
        return;
      }

      try {
        let result;

        switch (type) {
          case "signup":
            result = await supabase.auth.verifyOtp({
              token_hash,
              type: "signup",
            });
            if (result.error) throw result.error;
            setSuccess(
              "Email confirmed successfully! Redirecting to sign in..."
            );
            await new Promise((resolve) => setTimeout(resolve, 2000));
            router.push("/auth/signin?confirmed=true");
            break;

          case "email_change":
            result = await supabase.auth.verifyOtp({
              token_hash,
              type: "email_change",
            });
            if (result.error) throw result.error;
            setSuccess("Email updated successfully! Redirecting...");
            await new Promise((resolve) => setTimeout(resolve, 2000));
            router.push("/settings");
            break;

          default:
            setError("Invalid confirmation type");
        }
      } catch (err: any) {
        setError(err.message || "Failed to confirm email");
        console.error("Email confirmation error:", err);
      }
    };

    handleEmailConfirmation();
  }, [router, searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground px-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md p-8 space-y-6 bg-card text-card-foreground rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">
          {success ? "Email Confirmed!" : "Confirming your email"}
        </h1>
        {error ? (
          <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
            {error}
          </div>
        ) : success ? (
          <div className="p-3 text-sm text-green-600 bg-green-600/10 rounded-md">
            {success}
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}
      </div>
    </div>
  );
}
