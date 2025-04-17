
import React, { useState } from "react";
import { Paperclip, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useFeedback } from "@/contexts/FeedbackContext";

interface FeedbackInputProps {
  placeholder?: string;
}

export function FeedbackInput({ placeholder = "Add your feedback..." }: FeedbackInputProps) {
  const [content, setContent] = useState("");
  const [fileUrl, setFileUrl] = useState<string | undefined>();
  const [fileName, setFileName] = useState<string | undefined>();
  const { addFeedback, isLoading } = useFeedback();
  
  // Mock user data - in a real app this would come from authentication
  const user = {
    name: "John Client",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=John%20Client"
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  const handleFileUpload = () => {
    // Mock file upload - in a real app this would open a file picker
    // and upload to storage
    const mockFileUrl = "https://picsum.photos/800/600";
    const mockFileName = "screenshot.png";
    
    setFileUrl(mockFileUrl);
    setFileName(mockFileName);
  };
  
  const removeFile = () => {
    setFileUrl(undefined);
    setFileName(undefined);
  };
  
  const submitFeedback = async () => {
    if (content.trim()) {
      await addFeedback(content, fileUrl);
      setContent("");
      setFileUrl(undefined);
      setFileName(undefined);
    }
  };
  
  return (
    <div className="w-full border rounded-lg overflow-hidden">
      <div className="p-3 bg-muted/10">
        <div className="flex items-start gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <Textarea 
              placeholder={placeholder}
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              className="min-h-[80px] mb-2 resize-none"
              disabled={isLoading}
            />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  size="sm" 
                  type="button" 
                  onClick={handleFileUpload}
                  disabled={isLoading || !!fileUrl}
                >
                  <Paperclip className="h-4 w-4 mr-1" />
                  Attach File
                </Button>
                {fileUrl && fileName && (
                  <div className="ml-2 flex items-center text-xs text-muted-foreground">
                    <span className="max-w-[120px] truncate">{fileName}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={removeFile} 
                      className="h-6 w-6 p-0 ml-1"
                      disabled={isLoading}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
              
              <Button 
                size="sm" 
                onClick={submitFeedback} 
                disabled={isLoading || !content.trim()}
              >
                <Send className="h-4 w-4 mr-1" />
                Submit Feedback
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
