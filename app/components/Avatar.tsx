"use client";

import Image from "next/image";
import { User } from "@supabase/supabase-js";

interface AvatarProps {
  user: User | null;
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  if (!user) {
    return <div className="w-8 h-8 rounded-full bg-gray-200" />;
  }

  return (
    <div className="relative">
      {user?.user_metadata?.avatar_url ? (
        <div className="relative">
          <Image
            src={"/placeholder.jpg"}
            alt="Avatar"
            width={32}
            height={32}
            className="rounded-full"
          />
          <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
        </div>
      ) : (
        <div className="relative">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-gray-600 text-sm">
              {user.email?.[0].toUpperCase()}
            </span>
          </div>
          <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
        </div>
      )}
    </div>
  );
};

export default Avatar;
