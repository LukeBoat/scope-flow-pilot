
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart3, 
  PieChart, 
  LineChart, 
  Download,
  Calendar,
  Users,
  CreditCard,
  CheckSquare,
  ArrowUpRight,
  ArrowDownRight,
  FileSpreadsheet,
  FileChartLine
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { useToast } from "@/components/ui/use-toast";

const Reports = () => {
  const [year, setYear] = useState("2025");
  const [timeframe, setTimeframe] = useState("monthly");
  const [activeTab, setActiveTab] = useState("financial");
  const { toast } = useToast();

  // Mock data for the charts
  const revenueExpensesData = {
    monthly: [
      { name: 'Jan', revenue: 42000, expenses: 28400 },
      { name: 'Feb', revenue: 38000, expenses: 21398 },
      { name: 'Mar', revenue: 45000, expenses: 29800 },
      { name: 'Apr', revenue: 50000, expenses: 33908 },
      { name: 'May', revenue: 47890, expenses: 32800 },
      { name: 'Jun', revenue: 55390, expenses: 34800 },
      { name: 'Jul', revenue: 49000, expenses: 32780 },
      { name: 'Aug', revenue: 51500, expenses: 36500 },
      { name: 'Sep', revenue: 54780, expenses: 35800 },
      { name: 'Oct', revenue: 58900, expenses: 38780 },
      { name: 'Nov', revenue: 62700, expenses: 40800 },
      { name: 'Dec', revenue: 67500, expenses: 43900 },
    ],
    quarterly: [
      { name: 'Q1', revenue: 125000, expenses: 79598 },
      { name: 'Q2', revenue: 153280, expenses: 101508 },
      { name: 'Q3', revenue: 155280, expenses: 105080 },
      { name: 'Q4', revenue: 189100, expenses: 123480 },
    ],
    yearly: [
      { name: '2023', revenue: 523000, expenses: 384500 },
      { name: '2024', revenue: 578000, expenses: 405200 },
      { name: '2025', revenue: 622660, expenses: 409666 },
    ]
  };

  const projectStatusData = [
    { name: 'Completed', value: 18, color: '#4ade80' },
    { name: 'In Progress', value: 12, color: '#3b82f6' },
    { name: 'Planning', value: 8, color: '#8b5cf6' },
    { name: 'On Hold', value: 3, color: '#f59e0b' },
    { name: 'Overdue', value: 2, color: '#ef4444' },
  ];

  const clientRevenueData = [
    { name: 'Wayne Enterprises', revenue: 42000 },
    { name: 'Stark Industries', revenue: 31500 },
    { name: 'Acme Inc.', revenue: 27700 },
    { name: 'Globex Corp', revenue: 18750 },
    { name: 'Initech', revenue: 7200 },
    { name: 'Others', revenue: 15600 },
  ];

  const projectCompletionData = [
    { name: 'Jan', onTime: 3, late: 1 },
    { name: 'Feb', onTime: 2, late: 0 },
    { name: 'Mar', onTime: 4, late: 1 },
    { name: 'Apr', onTime: 3, late: 2 },
    { name: 'May', onTime: 5, late: 0 },
    { name: 'Jun', onTime: 2, late: 1 },
    { name: 'Jul', onTime: 3, late: 1 },
    { name: 'Aug', onTime: 4, late: 0 },
    { name: 'Sep', onTime: 3, late: 0 },
    { name: 'Oct', onTime: 5, late: 1 },
    { name: 'Nov', onTime: 4, late: 1 },
    { name: 'Dec', onTime: 3, late: 0 },
  ];

  // Calculate summary stats
  const currentYearRevenue = revenueExpensesData.yearly.find(item => item.name === year)?.revenue || 0;
  const lastYearRevenue = revenueExpensesData.yearly.find(item => item.name === "2024")?.revenue || 0;
  const revenueGrowth = ((currentYearRevenue - lastYearRevenue) / lastYearRevenue) * 100;

  const currentYearExpenses = revenueExpensesData.yearly.find(item => item.name === year)?.expenses || 0;
  const lastYearExpenses = revenueExpensesData.yearly.find(item => item.name === "2024")?.expenses || 0;
  const expensesGrowth = ((currentYearExpenses - lastYearExpenses) / lastYearExpenses) * 100;

  const totalProjects = projectStatusData.reduce((sum, item) => sum + item.value, 0);
  const completedProjects = projectStatusData.find(item => item.name === 'Completed')?.value || 0;
  const activeProjects = projectStatusData.find(item => item.name === 'In Progress')?.value || 0;

  const totalClients = clientRevenueData.length;
  const averageRevenuePerClient = clientRevenueData.reduce((sum, item) => sum + item.revenue, 0) / totalClients;

  const handleExport = (format) => {
    toast({
      title: "Report Exported",
      description: `The ${activeTab} report has been exported as ${format}.`,
    });
  };

  return (
    <MainLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Reports</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Analyze your business performance and trends
          </p>
        </div>
        <div className="flex space-x-2">
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
            </SelectContent>
          </Select>
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="pdf">
            <SelectTrigger className="w-[120px]">
              <Download className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Export" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf" onSelect={() => handleExport('PDF')}>Export PDF</SelectItem>
              <SelectItem value="excel" onSelect={() => handleExport('Excel')}>Export Excel</SelectItem>
              <SelectItem value="csv" onSelect={() => handleExport('CSV')}>Export CSV</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex justify-between text-sm font-medium">
              <span>Revenue</span>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(currentYearRevenue / 1000).toFixed(1)}k</div>
            <div className="flex items-center mt-1">
              <span className={`text-xs ${revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'} flex items-center`}>
                {revenueGrowth >= 0 ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                {Math.abs(revenueGrowth).toFixed(1)}%
              </span>
              <span className="text-xs text-muted-foreground ml-1">vs last year</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex justify-between text-sm font-medium">
              <span>Expenses</span>
              <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(currentYearExpenses / 1000).toFixed(1)}k</div>
            <div className="flex items-center mt-1">
              <span className={`text-xs ${expensesGrowth <= 0 ? 'text-green-600' : 'text-red-600'} flex items-center`}>
                {expensesGrowth <= 0 ? <ArrowDownRight className="h-3 w-3 mr-1" /> : <ArrowUpRight className="h-3 w-3 mr-1" />}
                {Math.abs(expensesGrowth).toFixed(1)}%
              </span>
              <span className="text-xs text-muted-foreground ml-1">vs last year</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex justify-between text-sm font-medium">
              <span>Projects</span>
              <CheckSquare className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProjects}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {completedProjects} completed, {activeProjects} active
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex justify-between text-sm font-medium">
              <span>Clients</span>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClients}</div>
            <p className="text-xs text-muted-foreground mt-1">
              ${Math.round(averageRevenuePerClient).toLocaleString()} avg. revenue
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="financial" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6 grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="clients">Clients</TabsTrigger>
        </TabsList>
        
        <TabsContent value="financial">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Revenue vs Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueExpensesData[timeframe]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                      <Legend />
                      <Bar dataKey="revenue" fill="#8A63D2" name="Revenue" />
                      <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Profit Margin</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart
                        data={revenueExpensesData.monthly.map(item => ({
                          name: item.name,
                          value: ((item.revenue - item.expenses) / item.revenue * 100).toFixed(1)
                        }))}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 50]} tickFormatter={(value) => `${value}%`} />
                        <Tooltip formatter={(value) => `${value}%`} />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#3b82f6"
                          strokeWidth={2}
                          activeDot={{ r: 6 }}
                          name="Profit Margin"
                        />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Revenue by Quarter</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={revenueExpensesData.quarterly}
                          cx="50%"
                          cy="50%"
                          innerRadius={70}
                          outerRadius={90}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="revenue"
                          nameKey="name"
                          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        >
                          {revenueExpensesData.quarterly.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={['#8b5cf6', '#3b82f6', '#22c55e', '#f59e0b'][index % 4]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="projects">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Project Completion Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={projectCompletionData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="onTime" stackId="a" fill="#22c55e" name="On Time" />
                      <Bar dataKey="late" stackId="a" fill="#ef4444" name="Late" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Project Status Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={projectStatusData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        >
                          {projectStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Project Timeline Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart
                        data={[
                          { month: 'Jan', planned: 5, actual: 5.5 },
                          { month: 'Feb', planned: 10, actual: 10.2 },
                          { month: 'Mar', planned: 15, actual: 14 },
                          { month: 'Apr', planned: 20, actual: 18 },
                          { month: 'May', planned: 25, actual: 23 },
                          { month: 'Jun', planned: 30, actual: 29 },
                          { month: 'Jul', planned: 35, actual: 33 },
                          { month: 'Aug', planned: 40, actual: 39 },
                          { month: 'Sep', planned: 45, actual: 43.5 },
                          { month: 'Oct', planned: 50, actual: 48 },
                          { month: 'Nov', planned: 55, actual: 52 },
                          { month: 'Dec', planned: 60, actual: 56 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="planned"
                          stroke="#8884d8"
                          activeDot={{ r: 8 }}
                          name="Planned Projects"
                        />
                        <Line type="monotone" dataKey="actual" stroke="#82ca9d" name="Completed Projects" />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="clients">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Revenue by Client</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={clientRevenueData}
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 80, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="name" width={80} />
                      <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                      <Bar dataKey="revenue" fill="#8A63D2" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Client Acquisition</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart
                        data={[
                          { month: 'Jan', value: 12 },
                          { month: 'Feb', value: 13 },
                          { month: 'Mar', value: 15 },
                          { month: 'Apr', value: 16 },
                          { month: 'May', value: 17 },
                          { month: 'Jun', value: 18 },
                          { month: 'Jul', value: 18 },
                          { month: 'Aug', value: 19 },
                          { month: 'Sep', value: 20 },
                          { month: 'Oct', value: 21 },
                          { month: 'Nov', value: 24 },
                          { month: 'Dec', value: 27 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => `${value} clients`} />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#3b82f6"
                          strokeWidth={2}
                          name="Total Clients"
                        />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Client Retention Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart
                        data={[
                          { month: 'Jan', rate: 92 },
                          { month: 'Feb', rate: 93 },
                          { month: 'Mar', rate: 93 },
                          { month: 'Apr', rate: 94 },
                          { month: 'May', rate: 96 },
                          { month: 'Jun', rate: 95 },
                          { month: 'Jul', rate: 94 },
                          { month: 'Aug', rate: 95 },
                          { month: 'Sep', rate: 95 },
                          { month: 'Oct', rate: 96 },
                          { month: 'Nov', rate: 97 },
                          { month: 'Dec', rate: 97 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[80, 100]} tickCount={5} tickFormatter={(value) => `${value}%`} />
                        <Tooltip formatter={(value) => `${value}%`} />
                        <Line
                          type="monotone"
                          dataKey="rate"
                          stroke="#22c55e"
                          strokeWidth={2}
                          name="Retention Rate"
                        />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Additional help text at the bottom */}
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          Need custom reports? <Button variant="link" className="p-0 h-auto">Contact support</Button> to request specialized analytics.
        </p>
      </div>
    </MainLayout>
  );
};

export default Reports;
