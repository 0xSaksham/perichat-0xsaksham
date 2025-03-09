import { IconType } from "react-icons";
import Link from "next/link";
import clsx from "clsx";
import { useState } from "react";
import { BsStars } from "react-icons/bs";

interface DesktopItemProps {
  label: string;
  href: string;
  icon: IconType;
  active?: boolean;
  onClick?: () => void;
  isNew?: boolean;
  isImplemented?: boolean;
}

const DesktopItem: React.FC<DesktopItemProps> = ({
  label,
  href,
  icon: Icon,
  active,
  onClick,
  isNew = false,
  isImplemented = false,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (!isImplemented && href !== "/chats") {
      e.preventDefault();
      setShowTooltip(true);
      setTimeout(() => {
        setShowTooltip(false);
      }, 2000);
      return;
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <li className="relative" onMouseLeave={() => setShowTooltip(false)}>
      <Link
        href={isImplemented || href === "/chats" ? href : "#"}
        className={clsx(
          `
          relative
          flex
          items-center
          justify-center
          px-2
          py-1.5
          rounded-md
          hover:bg-gray-100
          cursor-pointer
          text-gray-600
        `,
          active && "bg-gray-100 text-green-700"
        )}
        onClick={handleClick}
      >
        <Icon className="h-5 w-5 shrink-0" />
        <span className="sr-only">{label}</span>
        {isNew && (
          <BsStars className="absolute top-1 right-1 text-yellow-500 h-3 w-3 rounded-full" />
        )}
      </Link>
    </li>
  );
};

export default DesktopItem;
