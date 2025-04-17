
import { CheckCircle, XCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const revisions = [
  {
    id: "1",
    title: "Landing Page Hero Section Adjustments",
    requester: {
      name: "John Smith",
      avatar: "https://github.com/shadcn.png",
      role: "Client",
    },
    requestDate: new Date("2023-03-15T14:30:00"),
    status: "approved",
    description: "Please make the hero headline more impactful and change the CTA button color to match our brand guidelines.",
    attachments: [
      { id: "a1", name: "revision-notes.pdf", size: "245 KB" },
      { id: "a2", name: "screenshot.jpg", size: "1.2 MB" },
    ],
    responses: [
      {
        id: "r1",
        author: {
          name: "Alex Johnson",
          avatar: "https://github.com/shadcn.png",
          role: "Project Manager",
        },
        date: new Date("2023-03-15T16:45:00"),
        message: "I've updated the hero section with a stronger headline and aligned the CTA button color with your brand guidelines. Please review the attached preview.",
      },
    ],
  },
  {
    id: "2",
    title: "About Page Content Update",
    requester: {
      name: "John Smith",
      avatar: "https://github.com/shadcn.png",
      role: "Client",
    },
    requestDate: new Date("2023-03-18T10:15:00"),
    status: "pending",
    description: "We need to update the team section with new photos and bios for two new team members.",
    attachments: [
      { id: "a3", name: "new-team-members.docx", size: "320 KB" },
    ],
    responses: [],
  },
  {
    id: "3",
    title: "Mobile Navigation Improvements",
    requester: {
      name: "Jane Doe",
      avatar: "",
      role: "Client",
    },
    requestDate: new Date("2023-03-20T09:45:00"),
    status: "in-progress",
    description: "The mobile navigation menu is difficult to use. Can we make it more intuitive and fix the dropdown menu issue?",
    attachments: [],
    responses: [
      {
        id: "r2",
        author: {
          name: "Alex Johnson",
          avatar: "https://github.com/shadcn.png",
          role: "Project Manager",
        },
        date: new Date("2023-03-20T11:30:00"),
        message: "I've taken a look at this issue and our development team is working on improving the mobile navigation. We'll have an update for you by tomorrow.",
      },
    ],
  },
];

export function RevisionLog() {
  const statusColors = {
    approved: "bg-success/20 text-success",
    pending: "bg-warning/20 text-warning",
    "in-progress": "bg-primary/20 text-primary",
    rejected: "bg-destructive/20 text-destructive",
  };

  return (
    <div className="space-y-6">
      {revisions.map((revision) => (
        <Card key={revision.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-medium">{revision.title}</h4>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <span>Requested: {revision.requestDate.toLocaleDateString()}</span>
                    <span className="mx-2">•</span>
                    <span>{revision.requestDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={statusColors[revision.status as keyof typeof statusColors]}
                >
                  {revision.status === "approved" && <CheckCircle className="h-3 w-3 mr-1" />}
                  {revision.status === "rejected" && <XCircle className="h-3 w-3 mr-1" />}
                  {revision.status.charAt(0).toUpperCase() + revision.status.slice(1)}
                </Badge>
              </div>
              
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={revision.requester.avatar} />
                  <AvatarFallback>{revision.requester.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{revision.requester.name}</p>
                  <p className="text-xs text-muted-foreground">{revision.requester.role}</p>
                </div>
              </div>
              
              <p className="text-sm mb-3">{revision.description}</p>
              
              {revision.attachments.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs font-medium text-muted-foreground mb-2">Attachments</p>
                  <div className="flex flex-wrap gap-2">
                    {revision.attachments.map((attachment) => (
                      <div 
                        key={attachment.id}
                        className="flex items-center gap-2 text-xs bg-muted/50 px-3 py-1.5 rounded-md"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-3.5 w-3.5 text-muted-foreground"
                        >
                          <path d="m18.5 2-8.57 8.57a4 4 0 0 0 5.66 5.66L20.5 12"></path>
                          <path d="m2 12.5 8.57-8.57a4 4 0 0 1 5.66 5.66L12 13.5"></path>
                        </svg>
                        <span>{attachment.name}</span>
                        <span className="text-muted-foreground">({attachment.size})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {revision.responses.length > 0 && (
              <div className="border-t">
                {revision.responses.map((response) => (
                  <div key={response.id} className="p-4 bg-muted/50">
                    <div className="flex items-center gap-3 mb-2">
                      <Avatar className="h-7 w-7">
                        <AvatarImage src={response.author.avatar} />
                        <AvatarFallback>{response.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{response.author.name}</p>
                        <span className="text-xs text-muted-foreground">{response.date.toLocaleDateString()} at {response.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>
                    <p className="text-sm pl-10">{response.message}</p>
                  </div>
                ))}
              </div>
            )}
            
            <div className="p-4 border-t flex justify-end gap-2">
              {revision.status === "pending" && (
                <>
                  <Button variant="outline" size="sm">Reject</Button>
                  <Button size="sm">Approve</Button>
                </>
              )}
              {revision.status === "in-progress" && (
                <Button size="sm">Mark as Complete</Button>
              )}
              {revision.status === "approved" && (
                <Button variant="outline" size="sm">View Details</Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
