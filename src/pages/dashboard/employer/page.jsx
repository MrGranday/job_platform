import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useApp } from "@/context/app-context";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Search, Bookmark, MessageSquare, ArrowUpRight, Building2, MapPin, ExternalLink } from "lucide-react";

export default function EmployerDashboard() {
    const navigate = useNavigate();
    const { user, candidates } = useApp();
    
    useEffect(() => {
        if (!user || user.role !== "employer") {
            navigate("/login");
        }
    }, [user, navigate]);

    if (!user || user.role !== "employer") {
        return null;
    }

    const savedCandidatesCount = user.savedCandidates?.length || 0;
    const recentCandidates = candidates.slice(0, 4);

    const stats = [
        {
            label: "Total Candidates",
            value: candidates.length.toString(),
            change: "+24",
            icon: Users,
            color: "text-chart-1",
        },
        {
            label: "Saved Profiles",
            value: savedCandidatesCount.toString(),
            change: "+5",
            icon: Bookmark,
            color: "text-chart-2",
        },
        { label: "Messages Sent", value: "18", change: "+8", icon: MessageSquare, color: "text-chart-3" },
        { label: "Search Activity", value: "156", change: "+32%", icon: Search, color: "text-chart-4" },
    ];

    const categoryStats = [
        { name: "Software Development", count: 3, percentage: 50 },
        { name: "Design", count: 1, percentage: 17 },
        { name: "Data Science", count: 1, percentage: 17 },
        { name: "Product", count: 1, percentage: 16 },
    ];

    return (<DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Employer Dashboard</h1>
            <p className="text-muted-foreground">Find and connect with top talent</p>
          </div>
          <Link to="/search">
            <Button className="bg-primary hover:bg-primary/90">
              <Search className="mr-2 h-4 w-4"/>
              Find Candidates
            </Button>
          </Link>
        </div>

        {/* Company Card */}
        {user.company && (<Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Building2 className="h-8 w-8 text-primary"/>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-foreground">{user.company.name}</h2>
                  <div className="flex flex-wrap gap-3 mt-1 text-sm text-muted-foreground">
                    {user.company.industry && <span>{user.company.industry}</span>}
                    {user.company.size && <span>• {user.company.size}</span>}
                  </div>
                </div>
                <Link to="/dashboard/employer/company">
                  <Button variant="outline" size="sm" className="bg-transparent">
                    Edit Company
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>)}

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
          {/* Recent Candidates */}
          <div className="lg:col-span-2">
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Candidates</CardTitle>
                  <CardDescription>Latest professionals on the platform</CardDescription>
                </div>
                <Link to="/search">
                  <Button variant="ghost" size="sm">
                    View All
                    <ExternalLink className="ml-2 h-4 w-4"/>
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentCandidates.map((candidate) => (<div key={candidate.id} className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50 border border-border hover:border-primary/30 transition-colors">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={candidate.avatar || "/placeholder.svg"} alt={candidate.name}/>
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {candidate.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground truncate">{candidate.name}</h3>
                        <p className="text-sm text-muted-foreground truncate">{candidate.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3"/>
                            {candidate.location}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {candidate.experience}
                          </Badge>
                        </div>
                      </div>
                      <Link to={`/search?id=${candidate.id}`}>
                        <Button variant="outline" size="sm" className="bg-transparent">
                          View Profile
                        </Button>
                      </Link>
                    </div>))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Talent Pool by Category */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Talent Pool</CardTitle>
              <CardDescription>Candidates by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryStats.map((cat, index) => (<div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-foreground">{cat.name}</span>
                      <span className="text-sm text-muted-foreground">{cat.count}</span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary overflow-hidden">
                      <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${cat.percentage}%` }}/>
                    </div>
                  </div>))}
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="text-sm font-medium text-foreground mb-3">Quick Actions</h4>
                <div className="space-y-2">
                  <Link to="/search" className="block">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Search className="mr-2 h-4 w-4"/>
                      Search Candidates
                    </Button>
                  </Link>
                  <Link to="/dashboard/employer/saved" className="block">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Bookmark className="mr-2 h-4 w-4"/>
                      Saved Profiles ({savedCandidatesCount})
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>);
}