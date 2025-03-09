import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/app/components/sidebar/Sidebar";
import Navbar from "@/app/components/Navbar";
import { AuthProvider } from "@/app/utils/AuthProvider";
import ProtectedRoute from "@/app/components/ProtectedRoute";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Periskope",
  description: "Periskope",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <ProtectedRoute>
            <div className="flex h-screen">
              <Sidebar  />

              <div className="flex flex-col flex-1 overflow-hidden">
                <Navbar />
                <div className="flex-1 overflow-auto bg-white">{children}</div>
              </div>
            </div>
          </ProtectedRoute>
        </AuthProvider>
      </body>
    </html>
  );
}
