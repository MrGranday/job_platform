import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useApp } from "@/context/app-context";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Mail, Calendar, Briefcase, GraduationCap, Award, FolderOpen, ExternalLink, Edit, ArrowLeft, } from "lucide-react";

export default function PublicProfilePage() {
    const navigate = useNavigate();
    const { user } = useApp();
    
    useEffect(() => {
        if (!user || user.role !== "jobseeker") {
            navigate("/login");
        }
    }, [user, navigate]);

    if (!user || user.role !== "jobseeker") {
        return null;
    }

    const profile = user.profile || {};
    const formatDate = (dateString) => {
        if (!dateString)
            return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    };

    return (<div className="min-h-screen bg-background">
      <Navbar />

      <main className="py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <div className="mb-6 flex items-center justify-between">
            <Link to="/profile" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4"/>
              Back to edit profile
            </Link>
            <Link to="/profile">
              <Button variant="outline" size="sm" className="bg-transparent">
                <Edit className="mr-2 h-4 w-4"/>
                Edit Profile
              </Button>
            </Link>
          </div>

          {/* Profile Header */}
          <Card className="bg-card border-border mb-6">
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row gap-6">
                <Avatar className="h-32 w-32 ring-4 ring-primary/20 mx-auto sm:mx-0">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name}/>
                  <AvatarFallback className="text-4xl bg-primary text-primary-foreground">
                    {user.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-center sm:text-left">
                  <h1 className="text-3xl font-bold text-foreground mb-2">{user.name}</h1>
                  <p className="text-xl text-muted-foreground mb-4">{profile.title || "Job Title"}</p>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm text-muted-foreground">
                    {profile.location && (<span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4"/>
                        {profile.location}
                      </span>)}
                    <span className="flex items-center gap-1">
                      <Mail className="h-4 w-4"/>
                      {user.email}
                    </span>
                    {profile.category && (<Badge variant="secondary" className="font-normal">
                        {profile.category}
                      </Badge>)}
                    {profile.jobRole && (<Badge variant="outline" className="font-normal">
                        {profile.jobRole}
                      </Badge>)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* About */}
          {profile.about && (<Card className="bg-card border-border mb-6">
              <CardHeader>
                <CardTitle className="text-lg">About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{profile.about}</p>
              </CardContent>
            </Card>)}

          {/* Skills */}
          {profile.skills && profile.skills.length > 0 && (<Card className="bg-card border-border mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (<Badge key={index} variant="secondary" className="px-3 py-1">
                      {skill}
                    </Badge>))}
                </div>
              </CardContent>
            </Card>)}

          {/* Experience */}
          {profile.experience && profile.experience.length > 0 && (<Card className="bg-card border-border mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Briefcase className="h-5 w-5"/>
                  Experience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {profile.experience.map((exp, index) => (<div key={exp.id || index} className="relative pl-6 border-l-2 border-border">
                      <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary"/>
                      <div>
                        <h3 className="font-semibold text-foreground">{exp.title}</h3>
                        <p className="text-primary font-medium">{exp.company}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <Calendar className="h-3 w-3"/>
                          {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                        </p>
                        {exp.description && (<p className="text-muted-foreground mt-2 text-sm leading-relaxed">{exp.description}</p>)}
                      </div>
                    </div>))}
                </div>
              </CardContent>
            </Card>)}

          {/* Education */}
          {profile.education && profile.education.length > 0 && (<Card className="bg-card border-border mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <GraduationCap className="h-5 w-5"/>
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profile.education.map((edu, index) => (<div key={edu.id || index} className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-secondary">
                        <GraduationCap className="h-5 w-5 text-primary"/>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{edu.degree}</h3>
                        <p className="text-muted-foreground">{edu.institution}</p>
                        <p className="text-sm text-muted-foreground">{edu.year}</p>
                      </div>
                    </div>))}
                </div>
              </CardContent>
            </Card>)}

          {/* Certifications */}
          {profile.certifications && profile.certifications.length > 0 && (<Card className="bg-card border-border mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="h-5 w-5"/>
                  Certifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {profile.certifications.map((cert, index) => (<div key={index} className="flex items-center gap-3">
                      <div className="p-1.5 rounded-lg bg-primary/10">
                        <Award className="h-4 w-4 text-primary"/>
                      </div>
                      <span className="text-foreground">{cert}</span>
                    </div>))}
                </div>
              </CardContent>
            </Card>)}

          {/* Projects */}
          {profile.projects && profile.projects.length > 0 && (<Card className="bg-card border-border mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FolderOpen className="h-5 w-5"/>
                  Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {profile.projects.map((project, index) => (<div key={project.id || index} className="p-4 rounded-lg bg-secondary/50 border border-border">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-foreground">{project.name}</h3>
                        {project.url && (<a href={project.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                            <ExternalLink className="h-4 w-4"/>
                          </a>)}
                      </div>
                      {project.description && (<p className="text-sm text-muted-foreground mt-2">{project.description}</p>)}
                    </div>))}
                </div>
              </CardContent>
            </Card>)}
        </div>
      </main>

      <Footer />
    </div>);
}