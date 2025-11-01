import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useChatStore } from "@/stores/useChatStore";

const ChatHeader = () => {
  const { isTyping, selectedUser, onlineUsers } = useChatStore();

  return (
    <div className="p-4 border-b border-zinc-800">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={selectedUser?.imageUrl} />

          <AvatarFallback>{selectedUser?.fullName[0]}</AvatarFallback>
        </Avatar>

        <div>
          <h2>{selectedUser?.fullName}</h2>
          <p className="text-sm text-zinc-400">
            {isTyping
              ? "Typing..."
              : onlineUsers.has(selectedUser?.clerkId as string)
              ? "Online"
              : "Offline"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
