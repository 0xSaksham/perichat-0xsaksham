"use client";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("Your Name");
  const [message, setMessage] = useState("Hi, This is my message!");

  const handleNameFocus = () => {
    if (name === "Your Name") {
      setName("");
    }
  };

  const handleMessageFocus = () => {
    if (message === "Hi, This is my message!") {
      setMessage("");
    }
  };

  const constructWhatsAppUrl = () => {
    const phoneNumber = encodeURIComponent("+918447999145");
    const encodedMessage = encodeURIComponent(
      `Name: ${name}\nMessage: ${message}`
    );
    return `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=${encodedMessage}&type=phone_number&app_absent=0`;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-4 max-w-7xl mx-auto">
        <div className="text-2xl font-bold">perichat</div>
        <div className="flex gap-4">
          <Button
            asChild
            className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition"
          >
            <Link href="/auth/signin">Login</Link>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="space-y-8">
          <div className="group relative w-fit mx-auto flex items-center justify-center rounded-full px-3 py-1 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f] ">
            <span
              className={cn(
                "absolute inset-0 block h-full w-full animate-gradient rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]"
              )}
              style={{
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "destination-out",
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "subtract",
                WebkitClipPath: "padding-box",
              }}
            />
            🎉 <hr className="mx-1.5 h-3 w-px shrink-0 bg-neutral-500" />
            <AnimatedGradientText className="text-xs font-medium">
              Introducing perichat
            </AnimatedGradientText>
            <ChevronRight
              className="ml-0.5 size-3 stroke-neutral-500 transition-transform
                duration-300 ease-in-out group-hover:translate-x-0.5"
            />
          </div>
          {/* Animated Shiny Text */}

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight font-family: Manrope">
            Does your business run on{" "}
            <span className="text-green-500">WhatsApp Groups and Chats?</span>{" "}
          </h1>

          {/* Subheading */}
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Try Perichat to manage your WhatsApp groups, chats, and customer
            support more efficiently.
            <br />
            <Link
              href={{
                pathname: "https://periskope.app/",
              }}
            >
              <span className="text-green-500">A product by periskope</span>
            </Link>
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-4 justify-center mt-8">
            <Button
              className="px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 transition font-medium"
              asChild
            >
              <Link href="/auth/signup">Sign Up for Free</Link>
            </Button>
          </div>
        </div>
      </main>

      {/* WhatsApp Chat Button */}
      <Sheet>
        <SheetTrigger asChild>
          <Button className="fixed bottom-4 right-4 px-4 py-2 bg-green-600 rounded-full flex items-center gap-2 hover:bg-green-700 transition">
            Chat on WhatsApp
          </Button>
        </SheetTrigger>
        <SheetContent className="bg-black text-white border-black">
          <SheetHeader>
            <SheetTitle>Send Message to Saksham?</SheetTitle>
            <SheetDescription>
              Send a WhatsApp message directly to our team. We&apos;ll get back
              to you shortly.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={handleNameFocus}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="message" className="text-right">
                Message
              </Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onFocus={handleMessageFocus}
                className="col-span-3"
              />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">
                <a
                  href={constructWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white"
                >
                  Send
                </a>
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
