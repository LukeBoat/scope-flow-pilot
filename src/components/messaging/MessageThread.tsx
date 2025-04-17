
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PaperclipIcon, Send, Sparkles, ThumbsUp } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
    role: "client" | "admin";
  };
  createdAt: Date;
  attachments?: Array<{
    id: string;
    name: string;
    url: string;
    type: string;
  }>;
  isAiAssisted?: boolean;
}

interface MessageThreadProps {
  deliverableId: string;
  projectId: string;
  initialMessages?: Message[];
  canReply?: boolean;
}

export function MessageThread({
  deliverableId,
  projectId,
  initialMessages = [],
  canReply = true
}: MessageThreadProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Mock user for demo
  const currentUser = {
    id: "user1",
    name: "Alex Johnson",
    role: "admin" as const,
    avatar: "https://github.com/shadcn.png"
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    setIsSubmitting(true);
    
    // In a real app, this would be an API call
    setTimeout(() => {
      const message: Message = {
        id: Date.now().toString(),
        content: newMessage,
        sender: currentUser,
        createdAt: new Date(),
      };
      
      setMessages([...messages, message]);
      setNewMessage("");
      setIsSubmitting(false);
    }, 500);
  };

  const handleAiSummarize = () => {
    // In a real app, this would call an AI service
    setIsSubmitting(true);
    
    setTimeout(() => {
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: "Based on the feedback, the client would like the following changes: 1) Adjust the color scheme to be more aligned with their brand guidelines, 2) Simplify the navigation for mobile users, 3) Add their company tagline to the header.",
        sender: {
          id: "ai",
          name: "AI Assistant",
          role: "admin",
          avatar: "/ai-assistant.png" // In a real app, use an actual image
        },
        createdAt: new Date(),
        isAiAssisted: true
      };
      
      setMessages([...messages, aiMessage]);
      setIsSubmitting(false);
      
      toast({
        title: "AI Summary Generated",
        description: "Feedback has been analyzed and summarized"
      });
    }, 1500);
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(date);
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  // Group messages by date
  const groupedMessages: { [date: string]: Message[] } = {};
  messages.forEach(message => {
    const dateKey = formatDate(message.createdAt);
    if (!groupedMessages[dateKey]) {
      groupedMessages[dateKey] = [];
    }
    groupedMessages[dateKey].push(message);
  });

  return (
    <div className="flex flex-col h-full">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {Object.keys(groupedMessages).length > 0 ? (
          Object.entries(groupedMessages).map(([date, dateMessages]) => (
            <div key={date} className="space-y-4">
              <div className="flex justify-center">
                <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                  {date}
                </span>
              </div>
              {dateMessages.map(message => (
                <div 
                  key={message.id} 
                  className={`flex ${
                    message.sender.role === "admin" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div className={`flex max-w-[80%] ${
                    message.sender.role === "admin" ? "flex-row-reverse" : "flex-row"
                  } gap-2 items-end`}>
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={message.sender.avatar} />
                      <AvatarFallback>
                        {message.sender.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div 
                      className={`rounded-lg px-4 py-2 ${
                        message.isAiAssisted 
                          ? "bg-purple-100 text-purple-900 dark:bg-purple-900 dark:text-purple-100" 
                          : message.sender.role === "admin"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium">
                          {message.sender.name}
                        </span>
                        {message.isAiAssisted && (
                          <Sparkles className="w-3 h-3" />
                        )}
                      </div>
                      <p className="text-sm">{message.content}</p>
                      <div className="text-xs text-right mt-1 opacity-70">
                        {formatTime(message.createdAt)}
                      </div>
                      {message.attachments && message.attachments.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {message.attachments.map(attachment => (
                            <div 
                              key={attachment.id}
                              className="flex items-center gap-1 text-xs p-1 rounded bg-black/10"
                            >
                              <PaperclipIcon className="w-3 h-3" />
                              <span>{attachment.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-muted-foreground">
              <p>No messages yet</p>
              <p className="text-sm">Start the conversation</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Input area */}
      {canReply && (
        <div className="border-t p-4">
          <div className="flex gap-2 mb-2">
            <Button 
              type="button" 
              size="sm" 
              variant="outline" 
              onClick={handleAiSummarize}
              disabled={messages.length === 0 || isSubmitting}
              className="text-xs"
            >
              <Sparkles className="w-3 h-3 mr-1" />
              AI Summarize Feedback
            </Button>
            <Button 
              type="button" 
              size="sm" 
              variant="outline" 
              className="text-xs"
            >
              <PaperclipIcon className="w-3 h-3 mr-1" />
              Attach
            </Button>
          </div>
          <div className="flex gap-2">
            <Textarea
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="min-h-10 resize-none"
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={!newMessage.trim() || isSubmitting}
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
