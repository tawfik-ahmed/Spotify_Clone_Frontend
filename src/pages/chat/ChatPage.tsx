import Topbar from "@/components/Topbar";
import { useChatStore } from "@/stores/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useRef } from "react";
import UsersList from "./components/UsersList";
import NoConversationSelected from "@/pages/chat/components/NoConversationSelected";
import MessageInput from "@/pages/chat/components/MessageInput";
import ChatHeader from "@/pages/chat/components/ChatHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { formatDate } from "../../utils/formatDate";
const ChatPage = () => {
  const scrollAreaRef = useRef<any>(null);

  const { user } = useUser();
  const { messages, selectedUser, fetchUsers, fetchMessages, isTyping } =
    useChatStore();

  const scrollToBottom = () => {
    if (!scrollAreaRef.current) {
      return;
    }
    scrollAreaRef.current.scrollIntoView(false);
  };
  useEffect(() => {
    if (user) {
      fetchUsers();
    }
  }, [user, fetchUsers]);

  useEffect(() => {
    if (selectedUser) {
      fetchMessages(selectedUser.clerkId);
    }
  }, [selectedUser, fetchMessages]);

  useEffect(() => {
    scrollToBottom();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <main className="h-full rounded-lg bg-gradient-to-b from-zinc-800 to-zinc-900 overflow-hidden">
      <Topbar />

      <div className="grid grid-cols-[80px_1fr] lg:grid-cols-[300px_1fr] h-[calc(100vh-180px)] relative">
        <UsersList />

        <div className="flex flex-col h-full">
          {selectedUser ? (
            <>
              <ChatHeader />
              <ScrollArea className="h-[calc(100vh-340px)]">
                <div ref={scrollAreaRef} className="p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message._id}
                      className={`flex items-start gap-3 ${
                        message.senderId === user?.id ? "flex-row-reverse" : ""
                      }`}
                    >
                      <Avatar className="size-8">
                        <AvatarImage
                          src={
                            message.senderId === user?.id
                              ? user.imageUrl
                              : selectedUser.imageUrl
                          }
                        />
                      </Avatar>

                      <div
                        className={`rounded-lg p-3 max-w-[70%] break-all ${
                          message.senderId === user?.id
                            ? "bg-green-500"
                            : "bg-zinc-800"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <span className="text-[10px] text-zinc-300 mt-1 block">
                          {formatDate(message.createdAt)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              {isTyping && selectedUser && (
                <div className="absolute bottom-18 left-18 flex items-center justify-start gap-2 px-4 py-2 mt-2">
                  <Avatar className="size-4">
                    <AvatarImage
                      src={selectedUser.imageUrl}
                      alt={selectedUser.fullName[0]}
                    />
                  </Avatar>

                  <div className="flex items-center justify-center gap-1 bg-zinc-800 rounded-lg px-2 py-1">
                    <span className="size-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="size-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="size-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              )}
              <MessageInput />
            </>
          ) : (
            <NoConversationSelected />
          )}
        </div>
      </div>
    </main>
  );
};

export default ChatPage;
