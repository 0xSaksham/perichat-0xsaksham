"use client";

import {
  AnalyticsIcon,
  BroadcastIcon,
  CollapseIcon,
  PeriskopeIcon,
  RulesIcon,
} from "@/utils/Icons";
import { IconType } from "react-icons";
import { IoChatbubbleEllipses, IoTicket } from "react-icons/io5";
import { FaListUl } from "react-icons/fa";
import { RiContactsBookFill, RiFolderImageFill } from "react-icons/ri";
import { MdChecklist } from "react-icons/md";
import { BsGearFill } from "react-icons/bs";
import { TbStarsFilled } from "react-icons/tb";
import { AiFillHome } from "react-icons/ai";
import SidebarNavLink from "./SidebarNavLink";
import { usePathname } from "next/navigation";
import { useAuth } from "@/utils/AuthProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoPersonSharp } from "react-icons/io5";

interface MenuItem {
  href?: string;
  icon?: IconType;
  divider?: boolean;
  isNew?: boolean;
  isImplemented?: boolean;
}

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { user, profile, signOut } = useAuth();

  // Define which routes are actually implemented in the app
  const menuItems: MenuItem[] = [
    { href: "/dashboard", icon: AiFillHome, isImplemented: false },
    { divider: true },
    { href: "/chats", icon: IoChatbubbleEllipses, isImplemented: true },
    { href: "/tickets", icon: IoTicket, isImplemented: false },
    { href: "/analytics", icon: AnalyticsIcon, isImplemented: false },
    { divider: true },
    { href: "/list", icon: FaListUl, isImplemented: false },
    { href: "/broadcast", icon: BroadcastIcon, isImplemented: false },
    { href: "/rules", icon: RulesIcon, isNew: true, isImplemented: false },
    { divider: true },
    { href: "/contacts", icon: RiContactsBookFill, isImplemented: true },
    { href: "/media", icon: RiFolderImageFill, isImplemented: false },
    { divider: true },
    { href: "/logs", icon: MdChecklist, isImplemented: false },
    { href: "/settings", icon: BsGearFill, isImplemented: false },
  ];

  return (
    <div className="h-screen w-14 p-1 flex flex-col justify-between border-r border-gray-200">
      <div className="flex flex-col gap-y-1 p-1">
        <div className="flex justify-center items-center p-2">
          <PeriskopeIcon className="h-10 w-10" />
        </div>
        {menuItems.map((item, index) =>
          item.divider ? (
            <hr key={`divider-${index}`} className="border-gray-200 m-1" />
          ) : (
            item.href &&
            item.icon && (
              <SidebarNavLink
                key={item.href}
                href={item.href}
                icon={item.icon}
                isNew={item.isNew}
                isImplemented={item.isImplemented}
              />
            )
          )
        )}
      </div>
      <div className="flex flex-col gap-y-1 p-1">
        <div className="flex items-center justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <Avatar className="size-8 cursor-pointer hover:opacity-80">
                {profile?.avatar_url ? (
                  <AvatarImage
                    src={profile.avatar_url}
                    alt={profile.username || "User avatar"}
                  />
                ) : (
                  <AvatarFallback className="bg-gray-200">
                    <IoPersonSharp className="text-gray-400 size-4" />
                  </AvatarFallback>
                )}
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={signOut}
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center justify-center px-2 py-1.5 rounded-md hover:bg-gray-100 cursor-pointer text-gray-600">
          <CollapseIcon className="h-5 w-5 rotate-180" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
