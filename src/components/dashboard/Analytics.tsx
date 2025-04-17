
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

  // Activity log data
  const activityLogData = [
    { 
      id: 1, 
      action: "Deliverable approved", 
      project: "Website Redesign", 
      user: "Client A", 
      time: "2 hours ago" 
    },
    { 
      id: 2, 
      action: "Feedback submitted", 
      project: "Mobile App", 
      user: "Client B", 
      time: "4 hours ago" 
    },
    { 
      id: 3, 
      action: "Milestone completed", 
      project: "Brand Identity", 
      user: "Design Team", 
      time: "Yesterday" 
    },
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
            <p className="text-sm text-muted-foreground mt-2">
              {isClientView 
                ? "How quickly you've been approving deliverables" 
                : "Average days from delivery to client approval"}
            </p>
          </CardContent>
        </Card>

        {/* Deliverable Status Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Deliverable Status Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] flex items-center justify-center">
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
            <div className="flex justify-center gap-4 mt-4">
              {deliverableStatusData.map((status) => (
                <div key={status.name} className="flex items-center">
                  <div 
                    className="w-3 h-3 mr-1 rounded-full" 
                    style={{ backgroundColor: status.color }}
                  />
                  <span className="text-xs">{status.name}</span>
                </div>
              ))}
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
          <p className="text-sm text-muted-foreground mt-2">
            Percentage of feedback requests completed within the requested timeframe
          </p>
        </CardContent>
      </Card>

      {/* Recent Activity Log */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {activityLogData.map((activity) => (
              <li key={activity.id} className="flex justify-between items-start border-b pb-3 border-border last:border-0 last:pb-0">
                <div>
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">
                    {activity.project} • {activity.user}
                  </p>
                </div>
                <span className="text-sm text-muted-foreground">{activity.time}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
