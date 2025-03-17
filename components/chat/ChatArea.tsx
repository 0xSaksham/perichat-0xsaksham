"use client";

import { Contact, Message } from "@/utils/chatService";
import { ChatHeader } from "./ChatHeader";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { EmptyChat } from "./EmptyChat";
import { RefObject, useState } from "react";

interface ChatAreaProps {
  selectedContact: Contact | null;
  messages: Message[];
  newMessage: string;
  setNewMessage: (message: string) => void;
  sendMessage: () => void;
  userId?: string;
  username?: string;
  userAvatar?: string | null;
  userPhone?: string;
  messagesEndRef: RefObject<HTMLDivElement>;
  onMessagesViewed?: (messageIds: string[]) => void;
  isAIChat?: boolean;
}

export const ChatArea = ({
  selectedContact,
  messages,
  newMessage,
  setNewMessage,
  sendMessage,
  userId,
  username,
  userAvatar,
  userPhone,
  messagesEndRef,
  onMessagesViewed,
}: ChatAreaProps) => {
  const isAIChat = selectedContact?.is_ai ?? false;

  return (
    <div className="flex flex-col flex-1 bg-dark-800">
      <ChatHeader selectedContact={selectedContact} isAIChat={isAIChat} />
      {selectedContact ? (
        <>
          <MessageList
            messages={messages}
            userId={userId}
            selectedContactName={selectedContact.username}
            selectedContactPhone={selectedContact.phone}
            currentUserName={username}
            currentUserPhone={userPhone}
            messagesEndRef={messagesEndRef}
            onMessagesViewed={onMessagesViewed}
            isAIChat={isAIChat}
          />
          <MessageInput
            message={newMessage}
            setMessage={setNewMessage}
            sendMessage={sendMessage}
            userAvatar={userAvatar}
            userName={username}
            isAIChat={isAIChat}
          />
        </>
      ) : (
        <EmptyChat />
      )}
    </div>
  );
};
