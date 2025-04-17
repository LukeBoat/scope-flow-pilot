
import React from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, FileText, LifeBuoy, MessageSquare } from "lucide-react";

const Help = () => {
  // Mock data for FAQ
  const faqs = [
    {
      question: "How do I create a new project?",
      answer: "To create a new project, go to the Projects page and click on the 'New Project' button in the top-right corner. Fill in the project details in the form and click 'Create Project'."
    },
    {
      question: "How do I invite a client to view their project?",
      answer: "Navigate to the specific project, click on the 'Settings' tab, and then 'Client Access'. Enter the client's email and click 'Send Invitation'. They'll receive an email with instructions to create an account and access their project."
    },
    {
      question: "Can I set up automated invoice reminders?",
      answer: "Yes, go to Settings > Notifications > Invoice Settings. You can configure automatic reminders for invoices that are coming due or overdue. You can set the timing and frequency of these reminders."
    },
    {
      question: "How do revision limits work?",
      answer: "When creating or editing a project, you can specify a revision limit for each deliverable. Once a deliverable reaches its revision limit, clients will need to approve additional revisions, which can be billed separately as change orders."
    },
    {
      question: "How do I export my reports?",
      answer: "On the Reports page, select the date range for your report, then click the 'Export' button in the top-right corner. You can choose to export as PDF, CSV, or Excel format."
    },
  ];

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Help Center</h1>
        <p className="text-muted-foreground">Find answers to common questions and learn how to use Scope Sentinel.</p>
      </div>

      <div className="relative max-w-lg mx-auto mb-8">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search for help articles..." 
          className="pl-9 py-6"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader>
            <FileText className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Documentation</CardTitle>
            <CardDescription>
              Browse our detailed guides and tutorials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="link" className="p-0">View documentation →</Button>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader>
            <LifeBuoy className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Support</CardTitle>
            <CardDescription>
              Reach out to our support team for help
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="link" className="p-0">Contact support →</Button>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader>
            <MessageSquare className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Community</CardTitle>
            <CardDescription>
              Join discussions and share experiences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="link" className="p-0">Visit community →</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>
            Quick answers to common questions about using Scope Sentinel.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default Help;
