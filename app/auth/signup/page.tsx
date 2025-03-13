"use client";

import { SignupForm } from "@/components/auth/SignupForm";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground px-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <SignupForm />
    </div>
  );
}
