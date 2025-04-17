
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

type FeedbackStatus = "unresolved" | "resolved";
type FeedbackAuthorType = "client" | "admin";

export interface FeedbackReply {
  id: string;
  content: string;
  authorId: string;
  authorType: FeedbackAuthorType;
  authorName: string;
  createdAt: Date;
  fileUrl?: string;
}

export interface Feedback {
  id: string;
  content: string;
  authorId: string;
  authorType: FeedbackAuthorType;
  authorName: string;
  createdAt: Date;
  status: FeedbackStatus;
  fileUrl?: string;
  replies: FeedbackReply[];
}

interface FeedbackContextType {
  feedback: Feedback[];
  isLoading: boolean;
  addFeedback: (content: string, fileUrl?: string) => Promise<void>;
  addReply: (feedbackId: string, content: string, fileUrl?: string) => Promise<void>;
  resolveFeedback: (feedbackId: string) => Promise<void>;
  hasUnresolvedFeedback: boolean;
}

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

export const useFeedback = () => {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error("useFeedback must be used within a FeedbackProvider");
  }
  return context;
};

interface FeedbackProviderProps {
  children: React.ReactNode;
  projectId: string;
  deliverableId: string;
}

// Mock data for now - would be replaced by Firebase logic
const mockFeedback: Feedback[] = [
  {
    id: "1",
    content: "Could we make the header text larger? It's hard to read on mobile.",
    authorId: "client1",
    authorType: "client",
    authorName: "John Client",
    createdAt: new Date(Date.now() - 86400000), // 1 day ago
    status: "unresolved",
    replies: [
      {
        id: "1-1",
        content: "I'll increase the font size. What size would work better for you?",
        authorId: "admin1",
        authorType: "admin",
        authorName: "Sarah Admin",
        createdAt: new Date(Date.now() - 43200000), // 12 hours ago
      }
    ]
  },
  {
    id: "2",
    content: "The colors match our brand guidelines perfectly. Great job!",
    authorId: "client1",
    authorType: "client",
    authorName: "John Client",
    createdAt: new Date(Date.now() - 172800000), // 2 days ago
    status: "resolved",
    replies: []
  }
];

export const FeedbackProvider: React.FC<FeedbackProviderProps> = ({ 
  children, 
  projectId, 
  deliverableId 
}) => {
  const [feedback, setFeedback] = useState<Feedback[]>(mockFeedback);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // In a real implementation, this would fetch from Firebase
  useEffect(() => {
    // Fetch feedback for this deliverable
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setFeedback(mockFeedback);
      setIsLoading(false);
    }, 500);
  }, [projectId, deliverableId]);

  const addFeedback = async (content: string, fileUrl?: string) => {
    setIsLoading(true);
    try {
      // In a real implementation, this would be a Firebase call
      const newFeedback: Feedback = {
        id: `feedback-${Date.now()}`,
        content,
        authorId: "client1", // Would come from auth
        authorType: "client", // Would come from auth
        authorName: "John Client", // Would come from user profile
        createdAt: new Date(),
        status: "unresolved",
        fileUrl,
        replies: []
      };

      // Add to state
      setFeedback(prev => [...prev, newFeedback]);
      toast({
        title: "Feedback submitted",
        description: "Your feedback has been submitted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit feedback",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addReply = async (feedbackId: string, content: string, fileUrl?: string) => {
    setIsLoading(true);
    try {
      // In a real implementation, this would be a Firebase call
      const newReply: FeedbackReply = {
        id: `reply-${Date.now()}`,
        content,
        authorId: "admin1", // Would come from auth
        authorType: "admin", // Would come from auth
        authorName: "Sarah Admin", // Would come from user profile
        createdAt: new Date(),
        fileUrl,
      };

      // Add reply to the specified feedback
      setFeedback(prev => prev.map(item => {
        if (item.id === feedbackId) {
          return {
            ...item,
            replies: [...item.replies, newReply]
          };
        }
        return item;
      }));

      toast({
        title: "Reply added",
        description: "Your reply has been added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add reply",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resolveFeedback = async (feedbackId: string) => {
    setIsLoading(true);
    try {
      // In a real implementation, this would be a Firebase call
      setFeedback(prev => prev.map(item => {
        if (item.id === feedbackId) {
          return {
            ...item,
            status: "resolved"
          };
        }
        return item;
      }));

      toast({
        title: "Feedback resolved",
        description: "The feedback has been marked as resolved",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to resolve feedback",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const hasUnresolvedFeedback = feedback.some(item => item.status === "unresolved");

  return (
    <FeedbackContext.Provider 
      value={{ 
        feedback, 
        isLoading, 
        addFeedback, 
        addReply, 
        resolveFeedback,
        hasUnresolvedFeedback
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};
