"use client";

import useRoutes from "@/app/hooks/useRoutes";
import DesktopItem from "./DesktopItem";
import { User } from "@supabase/supabase-js";
import { useState } from "react";
import Avatar from "../Avatar";
import {
  AnalyticsIcon,
  BroadcastIcon,
  CollapseIcon,
  PeriskopeIcon,
  RulesIcon,
} from "@/app/utils/Icons";
import { IoChatbubbleEllipses, IoTicket } from "react-icons/io5";
import { FaListUl } from "react-icons/fa";
import { RiContactsBookFill, RiFolderImageFill } from "react-icons/ri";
import { MdChecklist } from "react-icons/md";
import { BsGearFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { usePathname } from "next/navigation";

interface DesktopSidebarProps {
  currentUser: User | null;
}

interface MenuItem {
  href?: string;
  icon?: any;
  divider?: boolean;
  isNew?: boolean;
  isImplemented?: boolean;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ currentUser }) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems: MenuItem[] = [
    { href: "https://periskope.app", icon: PeriskopeIcon, isImplemented: true },
    { href: "/", icon: AiFillHome, isImplemented: false },
    { divider: true },
    { href: "/conversations", icon: IoChatbubbleEllipses, isImplemented: true },
    { href: "/tickets", icon: IoTicket, isImplemented: false },
    { href: "/analytics", icon: AnalyticsIcon, isImplemented: false },
    { divider: true },
    { href: "/list", icon: FaListUl, isImplemented: false },
    { href: "/broadcast", icon: BroadcastIcon, isImplemented: false },
    { href: "/rules", icon: RulesIcon, isNew: true, isImplemented: false },
    { divider: true },
    { href: "/users", icon: RiContactsBookFill, isImplemented: true },
    { href: "/media", icon: RiFolderImageFill, isImplemented: false },
    { divider: true },
    { href: "/logs", icon: MdChecklist, isImplemented: false },
    { href: "/settings", icon: BsGearFill, isImplemented: false },
  ];

  return (
    <div
      className="
        hidden
        lg:fixed
        lg:inset-y-0
        lg:left-0
        lg:z-40
        lg:w-20
        xl:px-6
        lg:overflow-y-auto
        lg:bg-white
        lg:border-r-[1px]
        lg:pb-4
        lg:flex
        lg:flex-col
        justify-between
        h-screen
        w-14
        p-1
        flex-col
        border-r
        border-gray-200
      "
    >
      <nav className="flex flex-col gap-y-1 p-1">
        <ul role="list" className="flex flex-col items-center space-y-1">
          {menuItems.map((item, index) =>
            item.divider ? (
              <li key={`divider-${index}`} className="border-black m-1" />
            ) : (
              <DesktopItem
                key={item.href}
                href={item.href!}
                label={item.href!.slice(1)}
                icon={item.icon}
                active={pathname === item.href}
                isNew={item.isNew}
                isImplemented={item.isImplemented}
              />
            )
          )}
        </ul>
      </nav>

      <nav className="mt-4 flex flex-col justify-between items-center">
        <div className="flex flex-col gap-y-1 p-1">
          <div className="flex items-center justify-center px-2 py-1.5 rounded-md hover:bg-gray-100 cursor-pointer text-gray-600">
            <CollapseIcon className="h-5 w-5 rotate-180" />
          </div>
        </div>
        <div
          className="cursor-pointer hover:opacity-75 transition"
          onClick={() => setIsOpen(true)}
        >
          <Avatar user={currentUser} />
        </div>
      </nav>
    </div>
  );
};

export default DesktopSidebar;
