 "use client";

import { SigninForm } from "@/components/auth/SigninForm";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground px-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <SigninForm />
    </div>
  );
}
