"use client";

import { useState, useEffect, useRef } from "react";
import { MessageInput } from "./MessageInput";
import { AIChatService } from "@/services/aiChatService";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export const AIChatWindow = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const chatServiceRef = useRef<AIChatService | null>(null);

  useEffect(() => {
    chatServiceRef.current = new AIChatService();
  }, []);

  const handleSendMessage = async () => {
    if (!currentMessage.trim() || !chatServiceRef.current) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: currentMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setCurrentMessage("");
    setIsProcessing(true);

    try {
      const response = await chatServiceRef.current.sendMessage(currentMessage);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message to AI:", error);
      // Optionally add an error message to the chat
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 ${message.isUser ? "text-right" : "text-left"}`}
          >
            <div
              className={`inline-block p-3 rounded-lg ${
                message.isUser
                  ? "bg-green-500 text-white"
                  : "bg-dark-700 text-dark-50"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>
      <MessageInput
        message={currentMessage}
        setMessage={setCurrentMessage}
        sendMessage={handleSendMessage}
        isAIChat={true}
        isProcessing={isProcessing}
      />
    </div>
  );
};
