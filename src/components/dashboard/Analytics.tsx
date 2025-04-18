
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";

interface AnalyticsProps {
  isClientView?: boolean;
}

export function Analytics({ isClientView = false }: AnalyticsProps) {
  // Sample data for time to approval
  const timeToApprovalData = [
    { name: 'Jan', time: 2.5 },
    { name: 'Feb', time: 3.2 },
    { name: 'Mar', time: 2.1 },
    { name: 'Apr', time: 1.8 },
    { name: 'May', time: 2.4 },
  ];

  // Sample data for feedback completion
  const feedbackCompletionData = [
    { name: 'Project A', value: 85 },
    { name: 'Project B', value: 92 },
    { name: 'Project C', value: 78 },
    { name: 'Project D', value: 96 },
  ];

  // Sample data for deliverable statuses
  const deliverableStatusData = [
    { name: 'Approved', value: 65, color: '#4ade80' },
    { name: 'Pending', value: 25, color: '#f59e0b' },
    { name: 'Overdue', value: 10, color: '#ef4444' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-6">
        {isClientView ? "Project Analytics" : "Performance Analytics"}
      </h2>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* Time to Approval Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              {isClientView ? "Your Approval Timeline" : "Average Time to Approval"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeToApprovalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis label={{ value: 'Days', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value) => [`${value} days`, 'Time']} />
                  <Line 
                    type="monotone" 
                    dataKey="time" 
                    stroke="#8A63D2" 
                    strokeWidth={2}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Deliverable Status Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Deliverable Status Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deliverableStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {deliverableStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feedback Completion Rate */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            {isClientView ? "Your Feedback Completion Rate" : "Feedback Completion Rate by Project"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={feedbackCompletionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} label={{ value: '%', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value) => [`${value}%`, 'Completion Rate']} />
                <Bar 
                  dataKey="value" 
                  fill="#8884d8" 
                  radius={[4, 4, 0, 0]}
                  barSize={30}
                >
                  {feedbackCompletionData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`}
                      fill={entry.value > 90 ? '#4ade80' : entry.value > 80 ? '#f59e0b' : '#ef4444'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
