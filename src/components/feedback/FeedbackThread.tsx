
import React from "react";
import { MessageSquare, CheckCircle2, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FileAttachment } from "@/components/feedback/FileAttachment";
import { FeedbackInput } from "@/components/feedback/FeedbackInput";
import { useFeedback, Feedback } from "@/contexts/FeedbackContext";
import { formatDistanceToNow } from "date-fns";

interface FeedbackThreadProps {
  projectId: string;
  deliverableId: string;
}

export function FeedbackThread({ projectId, deliverableId }: FeedbackThreadProps) {
  const { feedback, isLoading, resolveFeedback } = useFeedback();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const formatDate = (date: Date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  // Display an empty state if there's no feedback
  if (!isLoading && feedback.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <MessageSquare className="h-12 w-12 text-muted-foreground/30" />
        <h3 className="mt-4 text-lg font-medium">No feedback yet</h3>
        <p className="mt-2 text-sm text-muted-foreground max-w-sm">
          Share your thoughts or suggestions about this deliverable.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium flex items-center gap-2">
        <MessageSquare className="h-5 w-5" />
        Feedback
        {feedback.length > 0 && (
          <Badge variant="outline" className="ml-2">
            {feedback.length}
          </Badge>
        )}
      </h3>

      {isLoading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-24 bg-muted rounded-lg"></div>
          <div className="h-24 bg-muted rounded-lg"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {feedback.map((feedbackItem) => (
            <FeedbackItem 
              key={feedbackItem.id} 
              feedback={feedbackItem} 
              onResolve={resolveFeedback}
            />
          ))}
        </div>
      )}

      <Separator className="my-6" />
      
      <FeedbackInput />
    </div>
  );
}

interface FeedbackItemProps {
  feedback: Feedback;
  onResolve: (feedbackId: string) => Promise<void>;
}

function FeedbackItem({ feedback, onResolve }: FeedbackItemProps) {
  const { addReply } = useFeedback();
  const [replyContent, setReplyContent] = React.useState("");
  const [showReplyInput, setShowReplyInput] = React.useState(false);
  const isResolved = feedback.status === "resolved";

  const handleReply = async () => {
    if (replyContent.trim()) {
      await addReply(feedback.id, replyContent);
      setReplyContent("");
      setShowReplyInput(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const formatDate = (date: Date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  const isAdmin = true; // This would be determined by authentication

  return (
    <div className={`border rounded-lg overflow-hidden ${
      isResolved ? 'bg-muted/10 border-muted' : 'border-primary/20'
    } transition-colors duration-300`}>
      <div className="p-4">
        <div className="flex items-start gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${feedback.authorName}`} />
            <AvatarFallback>{getInitials(feedback.authorName)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-1">
            <div className="flex justify-between items-center">
              <div className="font-medium flex items-center gap-2">
                {feedback.authorName}
                <Badge variant="outline" className={`text-xs ${
                  feedback.authorType === 'client' 
                    ? 'bg-blue-100 text-blue-800 border-blue-200' 
                    : 'bg-purple-100 text-purple-800 border-purple-200'
                }`}>
                  {feedback.authorType === 'client' ? 'Client' : 'Team'}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {formatDate(feedback.createdAt)}
                </span>
                {isResolved ? (
                  <Badge variant="outline" className="bg-success/20 text-success">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Resolved
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-warning/20 text-warning">
                    <Clock className="h-3 w-3 mr-1" />
                    Open
                  </Badge>
                )}
              </div>
            </div>
            
            <p className="text-sm">{feedback.content}</p>
            
            {feedback.fileUrl && (
              <div className="mt-2">
                <FileAttachment url={feedback.fileUrl} showPreview={true} />
              </div>
            )}
          </div>
        </div>
        
        {/* Replies section */}
        {feedback.replies && feedback.replies.length > 0 && (
          <div className="ml-11 mt-4 space-y-4">
            {feedback.replies.map(reply => (
              <div key={reply.id} className="flex items-start gap-3 animate-fade-in">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${reply.authorName}`} />
                  <AvatarFallback>{getInitials(reply.authorName)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-center">
                    <div className="font-medium text-sm flex items-center gap-2">
                      {reply.authorName}
                      <Badge variant="outline" className={`text-[10px] ${
                        reply.authorType === 'client' 
                          ? 'bg-blue-100 text-blue-800 border-blue-200' 
                          : 'bg-purple-100 text-purple-800 border-purple-200'
                      }`}>
                        {reply.authorType === 'client' ? 'Client' : 'Team'}
                      </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(reply.createdAt)}
                    </span>
                  </div>
                  
                  <p className="text-sm">{reply.content}</p>
                  
                  {reply.fileUrl && (
                    <div className="mt-2">
                      <FileAttachment url={reply.fileUrl} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="border-t p-3 bg-muted/5">
        {showReplyInput ? (
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=Admin User`} />
                <AvatarFallback>AU</AvatarFallback>
              </Avatar>
              <textarea 
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px]"
                placeholder="Reply to this feedback..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowReplyInput(false)}
              >
                Cancel
              </Button>
              <Button 
                size="sm" 
                onClick={handleReply}
                disabled={!replyContent.trim()}
              >
                Reply
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowReplyInput(true)}
            >
              Reply
            </Button>
            
            {isAdmin && !isResolved && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onResolve(feedback.id)}
              >
                <CheckCircle2 className="h-4 w-4 mr-1" />
                Mark as Resolved
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
