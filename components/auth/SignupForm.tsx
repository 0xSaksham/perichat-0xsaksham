"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createBrowserSupabaseClient } from "@/utils/supabase-client";
import { PeriskopeIcon } from "@/utils/Icons";
import {
  validateEmail,
  validateUsername,
  validatePassword,
  generateRandomPhone,
} from "@/utils/validationUtils";

export const SignupForm = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const supabase = createBrowserSupabaseClient();

  // Function to generate a UI Avatar URL from username
  const generateUIAvatarUrl = (username: string) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      username
    )}&background=random`;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!validateUsername(username)) {
      setError("Username must be between 3 and 30 characters");
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    // Generate a random phone number
    const randomPhone = generateRandomPhone();

    try {
      const { data: existingUsers, error: phoneCheckError } = await supabase
        .from("profiles")
        .select("id")
        .eq("phone", randomPhone);

      if (phoneCheckError) {
        console.error("Error checking phone uniqueness:", phoneCheckError);
      } else if (existingUsers && existingUsers.length > 0) {
        // If phone number exists, try again with a new random number
        setError("Generated phone number already exists. Please try again.");
        setLoading(false);
        return;
      }

      // Use UI Avatar if no avatar URL is provided
      const finalAvatarUrl = avatarUrl.trim()
        ? avatarUrl
        : generateUIAvatarUrl(username);

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            avatar_url: finalAvatarUrl,
            phone: randomPhone,
          },
        },
      });

      if (authError) throw authError;

      if (authData.user) {
        if (authData.session) {
          setSuccess("Account created successfully! Redirecting to app...");
          await new Promise((resolve) => setTimeout(resolve, 2000));
          router.push("/");
        } else {
          setSuccess(
            "Account created! Please check your email for confirmation before signing in."
          );
          await new Promise((resolve) => setTimeout(resolve, 3000));
          router.push("/auth/signin");
        }
      }
    } catch (error: any) {
      setError(error.message || "An error occurred during sign up");
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-4 sm:p-8 space-y-6 sm:space-y-8 bg-background rounded-lg shadow-md overflow-y-auto max-h-screen sm:max-h-none">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Create an Account
        </h1>
        <p className="mt-2 text-sm sm:text-base text-muted-foreground">
          Join Perichat and start chatting
        </p>
      </div>

      {error && (
        <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="p-3 bg-primary/10 text-primary rounded-md text-sm">
          {success}
        </div>
      )}

      <form onSubmit={handleSignUp} className="space-y-4">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-foreground"
          >
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-input rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-sm bg-background"
            autoComplete="username"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-foreground"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-input rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-sm bg-background"
            autoComplete="email"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-foreground"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-input rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-sm bg-background"
            autoComplete="new-password"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Password must be at least 6 characters long
          </p>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </div>
      </form>

      <div className="text-center mt-4">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/auth/signin"
            className="font-medium text-primary hover:text-primary/90"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};
