import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChatStore } from "@/stores/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { Send } from "lucide-react";
import { useState } from "react";

const MessageInput = () => {
  const [newMessage, setNewMessage] = useState<string>("");
  const { user } = useUser();
  const { sendTyping, stopTyping, selectedUser, sendMessage } = useChatStore();

  let typingTimeout: NodeJS.Timeout;

  const handleTyping = (value: string) => {
    setNewMessage(value);

    if (!user || !selectedUser) {
      return;
    }

    sendTyping(user.id, selectedUser.clerkId);

    clearTimeout(typingTimeout);

    typingTimeout = setTimeout(() => {
      stopTyping(user.id, selectedUser.clerkId);
    }, 2500);
  };

  const handleSend = () => {
    if (!selectedUser || !user || newMessage.trim() === "") {
      return;
    }

    sendMessage(user.id, selectedUser.clerkId, newMessage.trim());
    setNewMessage("");
  };

  return (
    <div className="p-4 mt-auto border-t border-zinc-800">
      <div className="flex gap-2">
        <Input
          className="bg-zinc-800 border-none"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => handleTyping(e.target.value)}
        />

        <Button
          size={"icon"}
          onClick={handleSend}
          disabled={newMessage.trim() === ""}
        >
          <Send className="size-4" />
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
