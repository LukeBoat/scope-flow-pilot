
import React from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, CheckCircle, Clock, MessageCircle } from "lucide-react";

interface Notification {
  id: number;
  title: string;
  message: string;
  user: {
    name: string;
    avatar?: string;
    initials: string;
  };
  time: string;
  type: 'feedback' | 'approval' | 'mention' | 'system';
  read: boolean;
}

const Notifications = () => {
  const [notifications, setNotifications] = React.useState<Notification[]>([
    {
      id: 1,
      title: "New Feedback",
      message: "Acme Inc. left feedback on Website Redesign deliverable",
      user: {
        name: "John Doe",
        avatar: "https://i.pravatar.cc/150?img=1",
        initials: "JD"
      },
      time: "5 minutes ago",
      type: "feedback",
      read: false
    },
    {
      id: 2,
      title: "Deliverable Approved",
      message: "Globex Corp approved Logo Design deliverable",
      user: {
        name: "Jane Smith",
        avatar: "https://i.pravatar.cc/150?img=2",
        initials: "JS"
      },
      time: "2 hours ago",
      type: "approval",
      read: false
    },
    {
      id: 3,
      title: "You were mentioned",
      message: "Alex mentioned you in a comment on Mobile App project",
      user: {
        name: "Alex Johnson",
        avatar: "https://i.pravatar.cc/150?img=3",
        initials: "AJ"
      },
      time: "Yesterday",
      type: "mention",
      read: true
    },
    {
      id: 4,
      title: "Invoice Paid",
      message: "Initech paid invoice #INV-001 ($1,200.00)",
      user: {
        name: "System",
        initials: "SY"
      },
      time: "2 days ago",
      type: "system",
      read: true
    },
    {
      id: 5,
      title: "Project Deadline",
      message: "Website Redesign is due in 3 days",
      user: {
        name: "System",
        initials: "SY"
      },
      time: "3 days ago",
      type: "system",
      read: true
    }
  ]);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const getNotificationIcon = (type: string) => {
    switch(type) {
      case 'feedback':
        return <MessageCircle className="h-5 w-5 text-blue-500" />;
      case 'approval':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'mention':
        return <Bell className="h-5 w-5 text-purple-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">
            {unreadCount > 0 
              ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}.` 
              : "You're all caught up!"}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" onClick={markAllAsRead}>
            Mark all as read
          </Button>
        )}
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">
            All
            {notifications.length > 0 && (
              <span className="ml-2 bg-muted px-2 py-0.5 rounded-full text-xs">
                {notifications.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="unread">
            Unread
            {unreadCount > 0 && (
              <span className="ml-2 bg-primary/20 text-primary px-2 py-0.5 rounded-full text-xs">
                {unreadCount}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`flex items-start p-3 rounded-md transition-colors ${
                        notification.read ? 'bg-card' : 'bg-muted/30'
                      }`}
                    >
                      <div className="mr-4 mt-0.5">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={notification.user.avatar} />
                          <AvatarFallback>{notification.user.initials}</AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p className="font-medium mb-1">
                            {notification.title}
                          </p>
                          <span className="text-xs text-muted-foreground">
                            {notification.time}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {notification.message}
                        </p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        {getNotificationIcon(notification.type)}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Bell className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No notifications</h3>
                    <p className="text-muted-foreground">You're all caught up!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="unread">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {notifications.filter(n => !n.read).length > 0 ? (
                  notifications
                    .filter(n => !n.read)
                    .map((notification) => (
                      <div 
                        key={notification.id} 
                        className="flex items-start p-3 rounded-md bg-muted/30"
                      >
                        <div className="mr-4 mt-0.5">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={notification.user.avatar} />
                            <AvatarFallback>{notification.user.initials}</AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <p className="font-medium mb-1">
                              {notification.title}
                            </p>
                            <span className="text-xs text-muted-foreground">
                              {notification.time}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {notification.message}
                          </p>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          {getNotificationIcon(notification.type)}
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="text-center py-12">
                    <CheckCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No unread notifications</h3>
                    <p className="text-muted-foreground">You're all caught up!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="feedback">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {notifications.filter(n => n.type === 'feedback').length > 0 ? (
                  notifications
                    .filter(n => n.type === 'feedback')
                    .map((notification) => (
                      <div 
                        key={notification.id} 
                        className={`flex items-start p-3 rounded-md transition-colors ${
                          notification.read ? 'bg-card' : 'bg-muted/30'
                        }`}
                      >
                        <div className="mr-4 mt-0.5">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={notification.user.avatar} />
                            <AvatarFallback>{notification.user.initials}</AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <p className="font-medium mb-1">
                              {notification.title}
                            </p>
                            <span className="text-xs text-muted-foreground">
                              {notification.time}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {notification.message}
                          </p>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <MessageCircle className="h-5 w-5 text-blue-500" />
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="text-center py-12">
                    <MessageCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No feedback notifications</h3>
                    <p className="text-muted-foreground">You'll see client feedback here</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="system">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {notifications.filter(n => n.type === 'system').length > 0 ? (
                  notifications
                    .filter(n => n.type === 'system')
                    .map((notification) => (
                      <div 
                        key={notification.id} 
                        className={`flex items-start p-3 rounded-md transition-colors ${
                          notification.read ? 'bg-card' : 'bg-muted/30'
                        }`}
                      >
                        <div className="mr-4 mt-0.5">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={notification.user.avatar} />
                            <AvatarFallback>{notification.user.initials}</AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <p className="font-medium mb-1">
                              {notification.title}
                            </p>
                            <span className="text-xs text-muted-foreground">
                              {notification.time}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {notification.message}
                          </p>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <Clock className="h-5 w-5 text-gray-500" />
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="text-center py-12">
                    <Clock className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No system notifications</h3>
                    <p className="text-muted-foreground">System alerts will appear here</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Notifications;
