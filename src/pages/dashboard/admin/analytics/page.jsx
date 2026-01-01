import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/context/app-context";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, Eye, MessageSquare, Activity, Globe, Clock, Zap } from "lucide-react";

export default function AnalyticsPage() {
    const navigate = useNavigate();
    const { user, allUsers, candidates, categories } = useApp();
    
    useEffect(() => {
        if (!user || user.role !== "admin") {
            navigate("/login");
        }
    }, [user, navigate]);

    if (!user || user.role !== "admin") {
        return null;
    }

    const jobSeekers = allUsers.filter((u) => u.role === "jobseeker");
    const employers = allUsers.filter((u) => u.role === "employer");
    
    const overviewStats = [
        { label: "Total Users", value: allUsers.length, icon: Users, trend: "+12%", color: "text-chart-1" },
        { label: "Profile Views", value: "12.4K", icon: Eye, trend: "+28%", color: "text-chart-2" },
        { label: "Messages Sent", value: "3.2K", icon: MessageSquare, trend: "+15%", color: "text-chart-3" },
        { label: "Active Sessions", value: "847", icon: Activity, trend: "+8%", color: "text-chart-4" },
    ];

    const engagementMetrics = [
        { label: "Average Session Duration", value: "8m 42s", icon: Clock },
        { label: "Pages per Session", value: "5.3", icon: Zap },
        { label: "Bounce Rate", value: "32%", icon: TrendingUp },
        { label: "Geographic Regions", value: "42", icon: Globe },
    ];

    const categoryDistribution = categories.slice(0, 6).map((cat, index) => ({
        name: cat,
        candidates: Math.floor(Math.random() * 50) + 10,
        percentage: Math.floor(Math.random() * 30) + 10,
    }));

    const recentActivity = [
        { action: "New user registered", user: "John Doe", time: "2 minutes ago", type: "signup" },
        { action: "Profile updated", user: "Jane Smith", time: "15 minutes ago", type: "update" },
        { action: "New employer joined", user: "Tech Corp", time: "1 hour ago", type: "signup" },
        { action: "Message sent", user: "Bob Wilson", time: "2 hours ago", type: "message" },
        { action: "Profile viewed", user: "Alice Brown", time: "3 hours ago", type: "view" },
    ];

    return (<DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">Platform performance and user engagement metrics</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {overviewStats.map((stat, index) => {
            const Icon = stat.icon;
            return (<Card key={index} className="bg-card border-border hover:border-primary/30 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 rounded-lg bg-secondary ${stat.color}`}>
                      <Icon className="h-5 w-5"/>
                    </div>
                    <Badge variant="outline" className="text-primary border-primary/30">
                      {stat.trend}
                    </Badge>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>);
        })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* User Growth Chart Placeholder */}
          <Card className="lg:col-span-2 bg-card border-border">
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
              <CardDescription>New user registrations over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center border border-dashed border-border rounded-lg">
                <div className="text-center text-muted-foreground">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50"/>
                  <p>User growth visualization</p>
                  <p className="text-sm">Connect to analytics backend to display data</p>
                </div>
              </div>

              {/* Simple bar representation */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground w-16">Jan</span>
                  <div className="flex-1 h-6 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-chart-1 rounded-full" style={{ width: "45%" }}/>
                  </div>
                  <span className="text-sm font-medium text-foreground w-12">45</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground w-16">Feb</span>
                  <div className="flex-1 h-6 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-chart-1 rounded-full" style={{ width: "58%" }}/>
                  </div>
                  <span className="text-sm font-medium text-foreground w-12">58</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground w-16">Mar</span>
                  <div className="flex-1 h-6 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-chart-1 rounded-full" style={{ width: "72%" }}/>
                  </div>
                  <span className="text-sm font-medium text-foreground w-12">72</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground w-16">Apr</span>
                  <div className="flex-1 h-6 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-chart-1 rounded-full" style={{ width: "85%" }}/>
                  </div>
                  <span className="text-sm font-medium text-foreground w-12">85</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Engagement Metrics */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Engagement</CardTitle>
              <CardDescription>Key performance indicators</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {engagementMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (<div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4 text-muted-foreground"/>
                      <span className="text-sm text-muted-foreground">{metric.label}</span>
                    </div>
                    <span className="font-semibold text-foreground">{metric.value}</span>
                  </div>);
        })}
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Category Distribution */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Talent by Category</CardTitle>
              <CardDescription>Distribution of candidates across categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryDistribution.map((cat, index) => (<div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-foreground">{cat.name}</span>
                      <span className="text-sm text-muted-foreground">{cat.candidates} candidates</span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary overflow-hidden">
                      <div className={`h-full rounded-full ${index % 4 === 0
                ? "bg-chart-1"
                : index % 4 === 1
                    ? "bg-chart-2"
                    : index % 4 === 2
                        ? "bg-chart-3"
                        : "bg-chart-4"} transition-all duration-500`} style={{ width: `${cat.percentage}%` }}/>
                    </div>
                  </div>))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest actions on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (<div key={index} className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${activity.type === "signup"
                ? "bg-chart-1/10 text-chart-1"
                : activity.type === "update"
                    ? "bg-chart-2/10 text-chart-2"
                    : activity.type === "message"
                        ? "bg-chart-3/10 text-chart-3"
                        : "bg-chart-4/10 text-chart-4"}`}>
                      {activity.type === "signup" ? (<Users className="h-4 w-4"/>) : activity.type === "update" ? (<TrendingUp className="h-4 w-4"/>) : activity.type === "message" ? (<MessageSquare className="h-4 w-4"/>) : (<Eye className="h-4 w-4"/>)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.user}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Distribution Summary */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Platform Summary</CardTitle>
            <CardDescription>Overall platform statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 rounded-lg bg-chart-1/10 border border-chart-1/20">
                <Users className="h-8 w-8 mx-auto mb-3 text-chart-1"/>
                <p className="text-3xl font-bold text-chart-1">{jobSeekers.length}</p>
                <p className="text-sm text-muted-foreground">Job Seekers</p>
              </div>
              <div className="text-center p-6 rounded-lg bg-chart-2/10 border border-chart-2/20">
                <Users className="h-8 w-8 mx-auto mb-3 text-chart-2"/>
                <p className="text-3xl font-bold text-chart-2">{employers.length}</p>
                <p className="text-sm text-muted-foreground">Employers</p>
              </div>
              <div className="text-center p-6 rounded-lg bg-chart-3/10 border border-chart-3/20">
                <Users className="h-8 w-8 mx-auto mb-3 text-chart-3"/>
                <p className="text-3xl font-bold text-chart-3">{candidates.length}</p>
                <p className="text-sm text-muted-foreground">Total Candidates</p>
              </div>
              <div className="text-center p-6 rounded-lg bg-chart-4/10 border border-chart-4/20">
                <Activity className="h-8 w-8 mx-auto mb-3 text-chart-4"/>
                <p className="text-3xl font-bold text-chart-4">{categories.length}</p>
                <p className="text-sm text-muted-foreground">Categories</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>);
}