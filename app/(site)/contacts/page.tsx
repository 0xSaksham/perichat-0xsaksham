"use client";

import { useAuth } from "@/utils/AuthProvider";
import { useEffect, useRef, useState } from "react";
import { ChatService, Contact as ContactType } from "@/utils/chatService";
import { ContactItem } from "@/components/Contact";
import { FiSearch, FiX } from "react-icons/fi";
import { HiFolderArrowDown } from "react-icons/hi2";
import { MdOutlineFilterList } from "react-icons/md";
import { getUsers } from "@/components/contact/getUsers";
import { useRouter } from "next/navigation";

const ContactsPage = () => {
  const { user } = useAuth();
  const [contacts, setContacts] = useState<ContactType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<ContactType[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [permissionError, setPermissionError] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [filterUnread, setFilterUnread] = useState(false);
  const [availableUsers, setAvailableUsers] = useState<{ username: string }[]>(
    []
  );

  const chatService = useRef(new ChatService()).current;
  const router = useRouter();

  // Load contacts and available users when component mounts
  useEffect(() => {
    if (user?.id) {
      loadContacts();
      loadAvailableUsers();
    }
  }, [user?.id]);

  const loadAvailableUsers = async () => {
    try {
      const users = await getUsers();
      setAvailableUsers(users);
    } catch (error) {
      console.error("Error loading available users:", error);
    }
  };

  const loadContacts = async () => {
    if (!user?.id) return;

    setIsLoading(true);
    setPermissionError(false);
    try {
      const contactsList = await chatService.getContacts(user.id);
      setContacts(contactsList);
    } catch (error: any) {
      console.error("Error loading contacts:", error);
      if (error?.message?.includes("permission denied")) {
        setPermissionError(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchUsers = async () => {
    if (!searchQuery.trim() || !user?.id) return;

    setIsLoading(true);
    try {
      // First try server search
      const results = await chatService.searchUsers(searchQuery, user.id);

      // If no server results, filter available users locally
      if (results.length === 0) {
        const localResults = availableUsers
          .filter((u) =>
            u.username.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((u) => ({ username: u.username, id: "", avatar_url: null }));
        setSearchResults(localResults);
      } else {
        setSearchResults(results);
      }
      setIsSearching(true);
    } catch (error) {
      console.error("Error searching users:", error);
      // Fallback to local search on error
      const localResults = availableUsers
        .filter((u) =>
          u.username.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((u) => ({ username: u.username, id: "", avatar_url: null }));
      setSearchResults(localResults);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddContact = async (contactId: string) => {
    if (!user?.id) return;

    try {
      const success = await chatService.addContact(user.id, contactId);
      if (success) {
        loadContacts();
        setIsSearching(false);
        setSearchResults([]);
        setSearchQuery("");
      }
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  const handleContactClick = (contactId: string) => {
    router.push(`/chats?contactId=${contactId}`);
  };

  // Filter contacts based on search query and unread filter
  const filteredContacts = contacts.filter((contact) => {
    const passesUnreadFilter =
      !filterUnread || (contact.unreadCount && contact.unreadCount > 0);
    const passesSearchFilter =
      !searchQuery.trim() ||
      contact.username.toLowerCase().includes(searchQuery.toLowerCase());
    return passesUnreadFilter && passesSearchFilter;
  });

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="h-14 px-4 flex items-center justify-between bg-gray-50 border-b border-gray-200">
        <h1 className="text-lg font-semibold text-gray-800">Contacts</h1>
        <div className="flex gap-2">
          <button
            className={`flex items-center px-2 py-1 text-sm border rounded-md
              ${
                showSearchInput
                  ? "text-green-600 border-green-600"
                  : "text-gray-600 border-gray-300"
              }`}
            onClick={() => setShowSearchInput(!showSearchInput)}
          >
            <FiSearch className="h-4 w-4 mr-1" />
            Search
          </button>
          <button
            className={`flex items-center px-2 py-1 text-sm border rounded-md
              ${
                filterUnread
                  ? "text-green-600 border-green-600"
                  : "text-gray-600 border-gray-300"
              }`}
            onClick={() => setFilterUnread(!filterUnread)}
          >
            <MdOutlineFilterList className="h-4 w-4 mr-1" />
            Filter Unread
          </button>
        </div>
      </div>

      {/* Search Bar */}
      {showSearchInput && (
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder="Search contacts..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearchUsers()}
            />
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSearchResults([]);
                  setIsSearching(false);
                }}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                <FiX className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Contacts List */}
      <div className="flex-1 overflow-y-auto">
        {permissionError ? (
          <div className="p-4 text-center">
            <p className="text-red-500 mb-2">
              Failed to load contacts. Permission denied.
            </p>
            <button onClick={loadContacts} className="text-blue-500 underline">
              Try Again
            </button>
          </div>
        ) : isLoading ? (
          <div className="p-4 text-center text-gray-500">
            Loading contacts...
          </div>
        ) : filteredContacts.length > 0 ? (
          filteredContacts.map((contact) => (
            <ContactItem
              key={contact.id}
              name={contact.username}
              latestMessage={contact.latestMessage || "No messages yet"}
              phone={contact.phone || ""}
              unreadCount={contact.unreadCount}
              date={contact.lastMessageDate || ""}
              avatar={contact.avatar_url || undefined}
              userSentState={contact.userSentState}
              onClick={() => handleContactClick(contact.id)}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <HiFolderArrowDown size={48} className="mb-3" />
            <p className="text-xl font-medium mb-1">No contacts found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactsPage;
