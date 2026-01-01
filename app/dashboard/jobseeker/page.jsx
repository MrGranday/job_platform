"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useApp } from "@/context/app-context"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import {
  Eye,
  Users,
  MessageSquare,
  TrendingUp,
  ArrowUpRight,
  FileText,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
} from "lucide-react"

export default function JobSeekerDashboard() {
  const router = useRouter()
  const { user } = useApp()

  useEffect(() => {
    if (!user || user.role !== "jobseeker") {
      router.push("/login")
    }
  }, [user, router])

  if (!user || user.role !== "jobseeker") {
    return null
  }

  const profile = user.profile || {}

  // Calculate profile completion
  const profileFields = ["title", "location", "about", "skills", "experience", "education"]
  const completedFields = profileFields.filter((field) => {
    const value = profile[field]
    return Array.isArray(value) ? value.length > 0 : Boolean(value)
  })
  const profileCompletion = Math.round((completedFields.length / profileFields.length) * 100)

  const stats = [
    { label: "Profile Views", value: "1,284", change: "+12%", icon: Eye, color: "text-chart-1" },
    { label: "Interested Employers", value: "48", change: "+8%", icon: Users, color: "text-chart-2" },
    { label: "Messages", value: "12", change: "+3", icon: MessageSquare, color: "text-chart-3" },
    { label: "Profile Rank", value: "Top 15%", change: "+5%", icon: TrendingUp, color: "text-chart-4" },
  ]

  const recentActivity = [
    { type: "view", company: "TechCorp Inc.", time: "2 hours ago" },
    { type: "save", company: "StartupXYZ", time: "5 hours ago" },
    { type: "message", company: "InnovateTech", time: "1 day ago" },
    { type: "view", company: "DataDriven Co.", time: "2 days ago" },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Welcome back, {user.name?.split(" ")[0]}</h1>
            <p className="text-muted-foreground">Here's what's happening with your profile</p>
          </div>
          <Link href="/profile">
            <Button className="bg-primary hover:bg-primary/90">
              <FileText className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="bg-card border-border hover:border-primary/30 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 rounded-lg bg-secondary ${stat.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs text-primary font-medium flex items-center gap-1">
                      {stat.change}
                      <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="lg:col-span-1 bg-card border-border">
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
              <CardDescription>Profile completion status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4 ring-4 ring-primary/20">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                    {user.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-foreground text-lg">{user.name}</h3>
                <p className="text-muted-foreground text-sm">{profile.title || "Add your job title"}</p>
                {profile.location && (
                  <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
                    <MapPin className="h-3 w-3" />
                    {profile.location}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Profile Completion</span>
                  <span className="font-medium text-foreground">{profileCompletion}%</span>
                </div>
                <Progress value={profileCompletion} className="h-2" />
              </div>

              {profile.skills && profile.skills.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Top Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.slice(0, 4).map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {profile.skills.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{profile.skills.length - 4} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Link href="/profile" className="flex-1">
                  <Button variant="outline" className="w-full bg-transparent">
                    Edit Profile
                  </Button>
                </Link>
                <Link href="/profile/public" className="flex-1">
                  <Button variant="secondary" className="w-full">
                    View Public
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats & Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Summary */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Profile Summary</CardTitle>
                <CardDescription>Quick overview of your profile sections</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-chart-1/10 text-chart-1">
                        <Briefcase className="h-4 w-4" />
                      </div>
                      <span className="font-medium text-foreground">Experience</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">{profile.experience?.length || 0}</p>
                    <p className="text-xs text-muted-foreground">positions added</p>
                  </div>

                  <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-chart-2/10 text-chart-2">
                        <GraduationCap className="h-4 w-4" />
                      </div>
                      <span className="font-medium text-foreground">Education</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">{profile.education?.length || 0}</p>
                    <p className="text-xs text-muted-foreground">degrees/certifications</p>
                  </div>

                  <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-chart-3/10 text-chart-3">
                        <Award className="h-4 w-4" />
                      </div>
                      <span className="font-medium text-foreground">Skills</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">{profile.skills?.length || 0}</p>
                    <p className="text-xs text-muted-foreground">skills listed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Employers interested in your profile</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg ${
                            activity.type === "view"
                              ? "bg-chart-1/10 text-chart-1"
                              : activity.type === "save"
                                ? "bg-chart-2/10 text-chart-2"
                                : "bg-chart-3/10 text-chart-3"
                          }`}
                        >
                          {activity.type === "view" ? (
                            <Eye className="h-4 w-4" />
                          ) : activity.type === "save" ? (
                            <Users className="h-4 w-4" />
                          ) : (
                            <MessageSquare className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-foreground text-sm">{activity.company}</p>
                          <p className="text-xs text-muted-foreground">
                            {activity.type === "view"
                              ? "viewed your profile"
                              : activity.type === "save"
                                ? "saved your profile"
                                : "sent you a message"}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
