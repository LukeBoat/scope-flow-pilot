
import React from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { DeliverableView } from "@/components/feedback/DeliverableView";

const mockDeliverable = {
  id: "deliverable-1",
  name: "Homepage Design v2",
  status: "Delivered" as const,
  notes: "Updated design with the new brand colors and typography. Includes responsive layouts for mobile, tablet and desktop.",
  dueDate: new Date("2023-06-15"),
  fileUrl: "https://picsum.photos/1200/800"
};

export default function DeliverableFeedbackPage() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Deliverable Review</h1>
        <DeliverableView 
          deliverable={mockDeliverable}
          projectId="project-1"
          isAdmin={true}
        />
      </div>
    </MainLayout>
  );
}
