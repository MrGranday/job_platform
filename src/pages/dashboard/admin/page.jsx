import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useApp } from "@/context/app-context";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Building2, UserCheck, ArrowUpRight, BarChart3, Tags, Activity, ExternalLink } from "lucide-react";

export default function AdminDashboard() {
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
    const activeUsers = allUsers.filter((u) => u.status === "active");

    const stats = [
        {
            label: "Total Users",
            value: allUsers.length.toString(),
            change: "+12%",
            icon: Users,
            color: "text-chart-1",
        },
        {
            label: "Job Seekers",
            value: jobSeekers.length.toString(),
            change: "+8%",
            icon: UserCheck,
            color: "text-chart-2",
        },
        {
            label: "Employers",
            value: employers.length.toString(),
            change: "+15%",
            icon: Building2,
            color: "text-chart-3",
        },
        {
            label: "Active Users",
            value: activeUsers.length.toString(),
            change: "+5%",
            icon: Activity,
            color: "text-chart-4",
        },
    ];

    const recentUsers = allUsers.slice(0, 5);

    const platformStats = [
        { label: "Total Candidates", value: candidates.length },
        { label: "Categories", value: categories.length },
        { label: "Messages Sent", value: 156 },
        { label: "Profile Views", value: "2.4K" },
    ];

    return (<DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Monitor and manage your platform</p>
          </div>
          <Link to="/dashboard/admin/users">
            <Button className="bg-primary hover:bg-primary/90">
              <Users className="mr-2 h-4 w-4"/>
              Manage Users
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (<Card key={index} className="bg-card border-border hover:border-primary/30 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 rounded-lg bg-secondary ${stat.color}`}>
                      <Icon className="h-5 w-5"/>
                    </div>
                    <span className="text-xs text-primary font-medium flex items-center gap-1">
                      {stat.change}
                      <ArrowUpRight className="h-3 w-3"/>
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>);
        })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Users */}
          <div className="lg:col-span-2">
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Users</CardTitle>
                  <CardDescription>Latest registered users on the platform</CardDescription>
                </div>
                <Link to="/dashboard/admin/users">
                  <Button variant="ghost" size="sm">
                    View All
                    <ExternalLink className="ml-2 h-4 w-4"/>
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUsers.map((u) => (<div key={u.id} className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50 border border-border">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={u.avatar || "/placeholder.svg"} alt={u.name}/>
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {u.name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">{u.name}</p>
                        <p className="text-sm text-muted-foreground truncate">{u.email}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={u.role === "employer" ? "default" : "secondary"} className="capitalize">
                          {u.role}
                        </Badge>
                        <Badge variant={u.status === "active" ? "outline" : "destructive"} className="capitalize">
                          {u.status}
                        </Badge>
                      </div>
                    </div>))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats & Actions */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Platform Overview</CardTitle>
              <CardDescription>Key metrics at a glance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {platformStats.map((stat, index) => (<div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                    <span className="font-semibold text-foreground">{stat.value}</span>
                  </div>))}
              </div>

              <div className="pt-4 border-t border-border space-y-2">
                <h4 className="text-sm font-medium text-foreground mb-3">Quick Actions</h4>
                <Link to="/dashboard/admin/users" className="block">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Users className="mr-2 h-4 w-4"/>
                    User Management
                  </Button>
                </Link>
                <Link to="/dashboard/admin/categories" className="block">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Tags className="mr-2 h-4 w-4"/>
                    Manage Categories
                  </Button>
                </Link>
                <Link to="/dashboard/admin/analytics" className="block">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <BarChart3 className="mr-2 h-4 w-4"/>
                    View Analytics
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Distribution Chart */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>User Distribution</CardTitle>
            <CardDescription>Breakdown of users by role and status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 rounded-lg bg-secondary/50 border border-border">
                <div className="text-4xl font-bold text-chart-1 mb-2">{jobSeekers.length}</div>
                <p className="text-sm text-muted-foreground">Job Seekers</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {Math.round((jobSeekers.length / allUsers.length) * 100)}% of total
                </p>
              </div>
              <div className="text-center p-6 rounded-lg bg-secondary/50 border border-border">
                <div className="text-4xl font-bold text-chart-2 mb-2">{employers.length}</div>
                <p className="text-sm text-muted-foreground">Employers</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {Math.round((employers.length / allUsers.length) * 100)}% of total
                </p>
              </div>
              <div className="text-center p-6 rounded-lg bg-secondary/50 border border-border">
                <div className="text-4xl font-bold text-chart-3 mb-2">{activeUsers.length}</div>
                <p className="text-sm text-muted-foreground">Active Users</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {Math.round((activeUsers.length / allUsers.length) * 100)}% of total
                </p>
              </div>
              <div className="text-center p-6 rounded-lg bg-secondary/50 border border-border">
                <div className="text-4xl font-bold text-chart-4 mb-2">{allUsers.length - activeUsers.length}</div>
                <p className="text-sm text-muted-foreground">Inactive Users</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {Math.round(((allUsers.length - activeUsers.length) / allUsers.length) * 100)}% of total
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>);
}