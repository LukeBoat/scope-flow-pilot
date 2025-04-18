
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle2, 
  Clock, 
  MessageSquare, 
  AlertCircle, 
  Download,
  Filter
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { formatDistanceToNow } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock feedback data
const feedbackItems = [
  {
    id: "f1",
    deliverableName: "Homepage Design",
    content: "The hero section needs more contrast between the text and background image.",
    status: "open",
    authorName: "John Client",
    authorType: "client",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    replies: [
      {
        id: "r1",
        content: "We'll adjust the overlay opacity to improve readability.",
        authorName: "Alex Manager",
        authorType: "admin",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day ago
      }
    ]
  },
  {
    id: "f2",
    deliverableName: "About Page Design",
    content: "The team photos look pixelated. Can we get higher resolution versions?",
    status: "resolved",
    authorName: "John Client",
    authorType: "client",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
    replies: [
      {
        id: "r2",
        content: "I've uploaded higher resolution photos.",
        authorName: "Alex Manager",
        authorType: "admin",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4) // 4 days ago
      },
      {
        id: "r3",
        content: "These look much better, thank you!",
        authorName: "John Client",
        authorType: "client",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4 + 1000 * 60 * 60) // 4 days ago + 1 hour
      }
    ]
  },
  {
    id: "f3",
    deliverableName: "Contact Form Implementation",
    content: "The submit button should be primary color to match our brand guidelines.",
    status: "open",
    authorName: "John Client",
    authorType: "client",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    replies: []
  }
];

export function ClientFeedback() {
  const [activeTab, setActiveTab] = useState<"all" | "open" | "resolved">("all");
  const [selectedDeliverable, setSelectedDeliverable] = useState<string>("all");
  const { toast } = useToast();
  
  // Filter feedback based on active tab and selected deliverable
  const filteredFeedback = feedbackItems.filter(item => {
    const statusMatch = activeTab === "all" || item.status === activeTab;
    const deliverableMatch = selectedDeliverable === "all" || item.deliverableName === selectedDeliverable;
    return statusMatch && deliverableMatch;
  });
  
  // Get unique deliverable names for the filter
  const deliverableOptions = Array.from(new Set(feedbackItems.map(item => item.deliverableName)));
  
  const handleExportFeedback = () => {
    toast({
      title: "Export Initiated",
      description: "Your feedback PDF is being generated and will download shortly."
    });
    // In a real implementation, this would trigger a PDF generation and download
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            <CardTitle>Project Feedback</CardTitle>
          </div>
          <div className="flex items-center gap-3">
            <Select value={selectedDeliverable} onValueChange={setSelectedDeliverable}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by deliverable" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Deliverables</SelectItem>
                {deliverableOptions.map(option => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={handleExportFeedback} className="gap-2">
              <Download className="h-4 w-4" />
              Export as PDF
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "all" | "open" | "resolved")}>
            <TabsList className="mb-4 w-[300px]">
              <TabsTrigger value="all">All Feedback</TabsTrigger>
              <TabsTrigger value="open">
                <Clock className="h-4 w-4 mr-1" />
                Open
              </TabsTrigger>
              <TabsTrigger value="resolved">
                <CheckCircle2 className="h-4 w-4 mr-1" />
                Resolved
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-0">
              {filteredFeedback.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <MessageSquare className="h-12 w-12 text-muted-foreground/30" />
                  <h3 className="mt-4 text-lg font-medium">No feedback found</h3>
                  <p className="mt-2 text-sm text-muted-foreground max-w-sm">
                    {activeTab === "all" 
                      ? "You haven't provided any feedback yet." 
                      : activeTab === "open" 
                        ? "You don't have any open feedback items." 
                        : "You don't have any resolved feedback items."}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredFeedback.map(feedback => (
                    <div 
                      key={feedback.id} 
                      className={`border rounded-lg overflow-hidden transition-colors duration-300 ${
                        feedback.status === 'resolved' 
                          ? 'bg-muted/10 border-muted' 
                          : 'border-primary/20'
                      }`}
                    >
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                            {feedback.deliverableName}
                          </Badge>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                              {formatDistanceToNow(new Date(feedback.createdAt), { addSuffix: true })}
                            </span>
                            {feedback.status === 'resolved' ? (
                              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Resolved
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                                <Clock className="h-3 w-3 mr-1" />
                                Open
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3 mt-4">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${feedback.authorName}`} />
                            <AvatarFallback>{getInitials(feedback.authorName)}</AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1">
                            <div className="flex items-center mb-1">
                              <span className="font-medium">{feedback.authorName}</span>
                              <Badge variant="outline" className="ml-2 text-xs bg-blue-100 text-blue-800 border-blue-200">
                                Client
                              </Badge>
                            </div>
                            <p className="text-sm">{feedback.content}</p>
                          </div>
                        </div>
                        
                        {feedback.replies && feedback.replies.length > 0 && (
                          <div className="ml-11 mt-4 space-y-4">
                            {feedback.replies.map(reply => (
                              <div key={reply.id} className="flex items-start gap-3">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${reply.authorName}`} />
                                  <AvatarFallback>{getInitials(reply.authorName)}</AvatarFallback>
                                </Avatar>
                                
                                <div className="flex-1">
                                  <div className="flex items-center mb-1">
                                    <span className="font-medium text-sm">{reply.authorName}</span>
                                    <Badge variant="outline" className="ml-2 text-[10px] bg-purple-100 text-purple-800 border-purple-200">
                                      Team
                                    </Badge>
                                    <span className="ml-2 text-xs text-muted-foreground">
                                      {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}
                                    </span>
                                  </div>
                                  <p className="text-sm">{reply.content}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      {feedback.status === 'open' && (
                        <div className="border-t p-3 bg-muted/5">
                          <div className="flex items-center">
                            <Button 
                              variant="ghost" 
                              size="sm"
                            >
                              Add Reply
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
