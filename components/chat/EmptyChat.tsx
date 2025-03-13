"use client";

import { HiFolderArrowDown } from "react-icons/hi2";

export const EmptyChat = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-dark-300 bg-dark-800">
      <HiFolderArrowDown size={48} className="mb-3" />
      <p className="text-xl font-medium mb-1">No chat selected</p>
      <p className="text-sm">Select a contact to start chatting</p>
    </div>
  );
};
