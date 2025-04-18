
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ArrowLeft, MessageSquare, FileText } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatDistanceToNow } from "date-fns";

// Mock feedback data (would be fetched from API in a real application)
const mockFeedback = [
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
      }
    ]
  }
];

// Mock project summary data
const mockProjectSummary = {
  name: "Website Redesign",
  client: "Acme Corporation",
  startDate: "2025-01-15",
  dueDate: "2025-05-15",
  status: "In Progress",
  completionPercentage: 65,
  deliverables: [
    { name: "Homepage Design", status: "Approved" },
    { name: "About Page Design", status: "Delivered" },
    { name: "Contact Form Implementation", status: "In Progress" },
    { name: "Mobile Responsiveness", status: "Not Started" }
  ],
  milestones: [
    { name: "Design Phase", status: "Completed", date: "2025-02-28" },
    { name: "Development Phase", status: "In Progress", date: "2025-04-15" },
    { name: "Testing Phase", status: "Not Started", date: "2025-05-01" }
  ]
};

export default function ClientPDF() {
  const { type, id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate API call to get data
    setTimeout(() => {
      if (type === "feedback") {
        setData(mockFeedback);
      } else if (type === "project") {
        setData(mockProjectSummary);
      }
      setLoading(false);
    }, 1000);
  }, [type, id]);
  
  const handleDownload = () => {
    toast({
      title: "PDF Download Started",
      description: "Your document is being prepared for download."
    });
    
    // In a real app, this would trigger a PDF generation and download
    setTimeout(() => {
      toast({
        title: "PDF Downloaded",
        description: "Your document has been downloaded successfully."
      });
    }, 2000);
  };
  
  const handleBack = () => {
    window.history.back();
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  if (loading) {
    return (
      <div className="container py-8 max-w-4xl mx-auto">
        <Card>
          <CardContent className="pt-6">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-muted rounded-md w-1/3"></div>
              <div className="h-4 bg-muted rounded-md w-1/2"></div>
              <div className="h-40 bg-muted rounded-md"></div>
              <div className="h-40 bg-muted rounded-md"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <Button variant="ghost" onClick={handleBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button onClick={handleDownload} className="gap-2">
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
      </div>
      
      {type === "feedback" && data && (
        <Card className="print:shadow-none" id="pdf-content">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                <CardTitle>Feedback Summary</CardTitle>
              </div>
              <div className="text-sm text-muted-foreground">
                Generated on {new Date().toLocaleDateString()}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {data.map((feedback: any) => (
                <div key={feedback.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <Badge>{feedback.deliverableName}</Badge>
                    <Badge variant={feedback.status === 'open' ? 'outline' : 'secondary'}>
                      {feedback.status === 'open' ? 'Open' : 'Resolved'}
                    </Badge>
                  </div>
                  
                  <div className="flex gap-3 mb-4">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${feedback.authorName}`} />
                      <AvatarFallback>{getInitials(feedback.authorName)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{feedback.authorName}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(feedback.createdAt), { addSuffix: true })}
                        </span>
                      </div>
                      <p className="mt-1">{feedback.content}</p>
                    </div>
                  </div>
                  
                  {feedback.replies && feedback.replies.length > 0 && (
                    <div className="ml-8 pl-4 border-l">
                      <h4 className="text-sm font-medium mb-2">Responses:</h4>
                      <div className="space-y-4">
                        {feedback.replies.map((reply: any) => (
                          <div key={reply.id} className="flex gap-3">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${reply.authorName}`} />
                              <AvatarFallback>{getInitials(reply.authorName)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-sm">{reply.authorName}</span>
                                <span className="text-xs text-muted-foreground">
                                  {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}
                                </span>
                              </div>
                              <p className="mt-1 text-sm">{reply.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {type === "project" && data && (
        <Card className="print:shadow-none" id="pdf-content">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                <CardTitle>Project Summary: {data.name}</CardTitle>
              </div>
              <div className="text-sm text-muted-foreground">
                Generated on {new Date().toLocaleDateString()}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Client</h3>
                  <p>{data.client}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                  <Badge>{data.status}</Badge>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Start Date</h3>
                  <p>{new Date(data.startDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Due Date</h3>
                  <p>{new Date(data.dueDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Completion</h3>
                  <p>{data.completionPercentage}%</p>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-3">Deliverables</h3>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left py-2 px-4">Deliverable</th>
                        <th className="text-left py-2 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.deliverables.map((deliverable: any, index: number) => (
                        <tr key={index} className="border-t">
                          <td className="py-2 px-4">{deliverable.name}</td>
                          <td className="py-2 px-4">
                            <Badge variant="outline">{deliverable.status}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-3">Milestones</h3>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left py-2 px-4">Milestone</th>
                        <th className="text-left py-2 px-4">Status</th>
                        <th className="text-left py-2 px-4">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.milestones.map((milestone: any, index: number) => (
                        <tr key={index} className="border-t">
                          <td className="py-2 px-4">{milestone.name}</td>
                          <td className="py-2 px-4">
                            <Badge variant="outline">{milestone.status}</Badge>
                          </td>
                          <td className="py-2 px-4">
                            {new Date(milestone.date).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="pt-4 text-xs text-muted-foreground text-center">
                This is an automatically generated document. The information contained herein represents the current status of the project.
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
