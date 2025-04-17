
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";

interface PlanFeature {
  name: string;
  included: boolean;
  tooltip?: string;
}

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  billingPeriod: "monthly" | "yearly";
  features: PlanFeature[];
  popular?: boolean;
}

export function PricingPlans() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");

  const plans: PricingPlan[] = [
    {
      id: "free",
      name: "Free",
      description: "For small teams or freelancers getting started",
      price: 0,
      billingPeriod,
      features: [
        { name: "Up to 3 projects", included: true },
        { name: "Basic client portal", included: true },
        { name: "Unlimited deliverables", included: true },
        { name: "Email notifications", included: true },
        { name: "Client branding", included: false },
        { name: "AI assistance", included: false },
        { name: "Advanced analytics", included: false },
        { name: "White-label option", included: false },
      ],
    },
    {
      id: "pro",
      name: "Pro",
      description: "For growing agencies and studios",
      price: billingPeriod === "monthly" ? 29 : 290,
      billingPeriod,
      popular: true,
      features: [
        { name: "Up to 20 projects", included: true },
        { name: "Advanced client portal", included: true },
        { name: "Unlimited deliverables", included: true },
        { name: "Email notifications", included: true },
        { name: "Client branding", included: true },
        { name: "AI assistance", included: true },
        { name: "Advanced analytics", included: false },
        { name: "White-label option", included: false },
      ],
    },
    {
      id: "studio",
      name: "Studio",
      description: "For established studios and agencies",
      price: billingPeriod === "monthly" ? 79 : 790,
      billingPeriod,
      features: [
        { name: "Unlimited projects", included: true },
        { name: "Advanced client portal", included: true },
        { name: "Unlimited deliverables", included: true },
        { name: "Email notifications", included: true },
        { name: "Client branding", included: true },
        { name: "AI assistance", included: true },
        { name: "Advanced analytics", included: true },
        { name: "White-label option", included: true },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center text-center space-y-3">
        <h2 className="text-3xl font-bold">Choose Your Plan</h2>
        <p className="text-muted-foreground max-w-xl">
          Scale your workflow management as your business grows. 
          All plans include updates and customer support.
        </p>
        
        <div className="inline-flex items-center rounded-full border p-1 mt-6">
          <Button
            variant={billingPeriod === "monthly" ? "default" : "ghost"}
            size="sm"
            onClick={() => setBillingPeriod("monthly")}
            className="rounded-full"
          >
            Monthly
          </Button>
          <Button
            variant={billingPeriod === "yearly" ? "default" : "ghost"}
            size="sm"
            onClick={() => setBillingPeriod("yearly")}
            className="rounded-full"
          >
            Yearly (10% off)
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`flex flex-col ${
              plan.popular ? "border-primary shadow-lg" : ""
            }`}
          >
            {plan.popular && (
              <div className="py-1 px-4 bg-primary text-primary-foreground text-xs font-medium text-center">
                Most Popular
              </div>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <p className="text-muted-foreground text-sm">{plan.description}</p>
              <div className="mt-4">
                <span className="text-3xl font-bold">
                  ${plan.price}
                </span>
                <span className="text-muted-foreground ml-1">
                  /{billingPeriod === "monthly" ? "month" : "year"}
                </span>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    {feature.included ? (
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-4 w-4 text-gray-300 flex-shrink-0" />
                    )}
                    <span className={!feature.included ? "text-muted-foreground" : ""}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                variant={plan.id === "free" ? "outline" : "default"} 
                className="w-full"
              >
                {plan.id === "free" ? "Get Started" : "Start Free Trial"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
