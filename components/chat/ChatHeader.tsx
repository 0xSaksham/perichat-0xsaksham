"use client";

import React from "react";
import { Contact } from "@/utils/chatService";
import { IoPersonSharp } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { GenerateIcon } from "@/utils/Icons";
import Image from "next/image";
import { FaRobot } from "react-icons/fa";

interface ChatHeaderProps {
  selectedContact: Contact | null;
  isAIChat?: boolean;
}

export const ChatHeader = ({ selectedContact, isAIChat }: ChatHeaderProps) => {
  // This function will be implemented later to handle message search
  const handleSearch = () => {
    console.log("Search functionality to be implemented");
    // Future implementation: Open search modal or toggle search input
  };

  return (
    <div className="flex items-center justify-between h-14 px-2 sm:px-3 border-b border-dark-700 bg-dark-800">
      <div className="flex items-center">
        {selectedContact ? (
          <>
            <div className="relative h-8 w-8 rounded-full flex items-center justify-center bg-dark-600 mr-2">
              {isAIChat ? (
                <FaRobot className="text-blue-500 h-5 w-5" />
              ) : selectedContact.avatar_url ? (
                <Image
                  src={selectedContact.avatar_url}
                  alt="Avatar"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              ) : (
                <IoPersonSharp className="text-white h-3 w-3 sm:h-4 sm:w-4" />
              )}
            </div>
            <div className="flex flex-col max-w-[200px] sm:max-w-none">
              <h3 className="text-xs sm:text-sm font-semibold truncate text-dark-50">
                {selectedContact.username}
                {isAIChat && (
                  <span className="ml-2 text-xs text-blue-500">
                    (AI Assistant)
                  </span>
                )}
              </h3>
              <div className="text-xs font-normal text-dark-300 truncate">
                {isAIChat
                  ? "Powered by Groq AI"
                  : selectedContact.phone || "Click here for contact info"}
              </div>
            </div>
          </>
        ) : null}
      </div>

      {/* Right side buttons - only visible when a chat is selected */}
      {selectedContact && (
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <div className="w-6 h-6 flex items-center justify-center">
              <GenerateIcon className="h-4 w-4 text-dark-200 cursor-pointer" />
            </div>
          </div>
          <div className="relative">
            <button
              className="p-1.5 rounded-full text-dark-200"
              onClick={handleSearch}
            >
              <FiSearch className="h-4 w-4 cursor-pointer" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
