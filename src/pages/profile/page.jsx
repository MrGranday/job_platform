import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/context/app-context";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Briefcase, GraduationCap, Award, FolderOpen, X, Plus, Save, Eye, Camera, Trash2 } from "lucide-react";

export default function ProfileEditPage() {
    const navigate = useNavigate();
    const { user, updateProfile, categories, jobRoles } = useApp();
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);
    const [newSkill, setNewSkill] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        location: "",
        about: "",
        skills: [],
        experience: [],
        education: [],
        certifications: [],
        projects: [],
        category: "",
        jobRole: "",
        visibility: true,
    });

    useEffect(() => {
        if (!user || user.role !== "jobseeker") {
            navigate("/login");
            return;
        }
        if (user.profile) {
            setFormData({ ...formData, ...user.profile });
        }
    }, [user, navigate]);

    if (!user || user.role !== "jobseeker") {
        return null;
    }

    const handleSave = async () => {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        updateProfile(formData);
        setSaved(true);
        setLoading(false);
        setTimeout(() => setSaved(false), 3000);
    };

    const addSkill = () => {
        if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
            setFormData({ ...formData, skills: [...formData.skills, newSkill.trim()] });
            setNewSkill("");
        }
    };

    const removeSkill = (skillToRemove) => {
        setFormData({ ...formData, skills: formData.skills.filter((skill) => skill !== skillToRemove) });
    };

    const addExperience = () => {
        const newExp = {
            id: Date.now().toString(),
            company: "",
            title: "",
            startDate: "",
            endDate: "",
            current: false,
            description: "",
        };
        setFormData({ ...formData, experience: [...formData.experience, newExp] });
    };

    const updateExperience = (id, field, value) => {
        setFormData({
            ...formData,
            experience: formData.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
        });
    };

    const removeExperience = (id) => {
        setFormData({ ...formData, experience: formData.experience.filter((exp) => exp.id !== id) });
    };

    const addEducation = () => {
        const newEdu = {
            id: Date.now().toString(),
            institution: "",
            degree: "",
            year: "",
        };
        setFormData({ ...formData, education: [...formData.education, newEdu] });
    };

    const updateEducation = (id, field, value) => {
        setFormData({
            ...formData,
            education: formData.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
        });
    };

    const removeEducation = (id) => {
        setFormData({ ...formData, education: formData.education.filter((edu) => edu.id !== id) });
    };

    const addCertification = () => {
        setFormData({ ...formData, certifications: [...formData.certifications, ""] });
    };

    const updateCertification = (index, value) => {
        const updated = [...formData.certifications];
        updated[index] = value;
        setFormData({ ...formData, certifications: updated });
    };

    const removeCertification = (index) => {
        setFormData({ ...formData, certifications: formData.certifications.filter((_, i) => i !== index) });
    };

    const addProject = () => {
        const newProject = {
            id: Date.now().toString(),
            name: "",
            description: "",
            url: "",
        };
        setFormData({ ...formData, projects: [...formData.projects, newProject] });
    };

    const updateProject = (id, field, value) => {
        setFormData({
            ...formData,
            projects: formData.projects.map((proj) => (proj.id === id ? { ...proj, [field]: value } : proj)),
        });
    };

    const removeProject = (id) => {
        setFormData({ ...formData, projects: formData.projects.filter((proj) => proj.id !== id) });
    };

    return (<DashboardLayout>
      <div className="space-y-6 max-w-4xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Edit Profile</h1>
            <p className="text-muted-foreground">Build your professional profile</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/profile/public")} className="bg-transparent">
              <Eye className="mr-2 h-4 w-4"/>
              Preview
            </Button>
            <Button onClick={handleSave} disabled={loading} className="bg-primary hover:bg-primary/90">
              <Save className="mr-2 h-4 w-4"/>
              {loading ? "Saving..." : saved ? "Saved!" : "Save Changes"}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
            <TabsTrigger value="basic" className="gap-1.5">
              <User className="h-4 w-4"/>
              <span className="hidden sm:inline">Basic</span>
            </TabsTrigger>
            <TabsTrigger value="experience" className="gap-1.5">
              <Briefcase className="h-4 w-4"/>
              <span className="hidden sm:inline">Experience</span>
            </TabsTrigger>
            <TabsTrigger value="education" className="gap-1.5">
              <GraduationCap className="h-4 w-4"/>
              <span className="hidden sm:inline">Education</span>
            </TabsTrigger>
            <TabsTrigger value="certifications" className="gap-1.5">
              <Award className="h-4 w-4"/>
              <span className="hidden sm:inline">Certs</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="gap-1.5">
              <FolderOpen className="h-4 w-4"/>
              <span className="hidden sm:inline">Projects</span>
            </TabsTrigger>
          </TabsList>

          {/* Basic Info */}
          <TabsContent value="basic" className="space-y-6 mt-6">
            {/* Profile Photo */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Profile Photo</CardTitle>
                <CardDescription>Upload a professional photo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <Avatar className="h-24 w-24 ring-4 ring-primary/20">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name}/>
                      <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                        {user.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <button className="absolute bottom-0 right-0 p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                      <Camera className="h-4 w-4"/>
                    </button>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-2">
                      Upload a professional headshot. Recommended size: 400x400px
                    </p>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      Upload Photo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Basic Info Form */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Your professional summary</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title</Label>
                    <Input id="title" placeholder="e.g. Senior Frontend Developer" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="bg-secondary border-input"/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="e.g. San Francisco, CA" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="bg-secondary border-input"/>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value, jobRole: "" })}>
                      <SelectTrigger className="bg-secondary border-input">
                        <SelectValue placeholder="Select category"/>
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (<SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jobRole">Job Role</Label>
                    <Select value={formData.jobRole} onValueChange={(value) => setFormData({ ...formData, jobRole: value })} disabled={!formData.category}>
                      <SelectTrigger className="bg-secondary border-input">
                        <SelectValue placeholder="Select job role"/>
                      </SelectTrigger>
                      <SelectContent>
                        {(jobRoles[formData.category] || []).map((role) => (<SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="about">About</Label>
                  <Textarea id="about" placeholder="Write a brief introduction about yourself..." rows={4} value={formData.about} onChange={(e) => setFormData({ ...formData, about: e.target.value })} className="bg-secondary border-input resize-none"/>
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Skills</CardTitle>
                <CardDescription>Add your technical and soft skills</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input placeholder="Add a skill..." value={newSkill} onChange={(e) => setNewSkill(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())} className="bg-secondary border-input"/>
                  <Button onClick={addSkill} className="bg-primary hover:bg-primary/90">
                    <Plus className="h-4 w-4"/>
                  </Button>
                </div>
                {formData.skills.length > 0 && (<div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill, index) => (<Badge key={index} variant="secondary" className="pl-3 pr-1 py-1.5 gap-1">
                        {skill}
                        <button onClick={() => removeSkill(skill)} className="ml-1 p-0.5 rounded-full hover:bg-destructive/20 hover:text-destructive transition-colors">
                          <X className="h-3 w-3"/>
                        </button>
                      </Badge>))}
                  </div>)}
              </CardContent>
            </Card>

            {/* Visibility Settings */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Profile Visibility</CardTitle>
                <CardDescription>Control who can see your profile</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="font-medium text-foreground">Make profile public</p>
                    <p className="text-sm text-muted-foreground">Allow employers to discover and view your profile</p>
                  </div>
                  <Switch checked={formData.visibility} onCheckedChange={(checked) => setFormData({ ...formData, visibility: checked })}/>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Experience */}
          <TabsContent value="experience" className="space-y-6 mt-6">
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Work Experience</CardTitle>
                  <CardDescription>Add your professional experience</CardDescription>
                </div>
                <Button onClick={addExperience} size="sm" className="bg-primary hover:bg-primary/90">
                  <Plus className="mr-2 h-4 w-4"/>
                  Add Experience
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {formData.experience.length === 0 ? (<div className="text-center py-8 text-muted-foreground">
                    <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-50"/>
                    <p>No experience added yet</p>
                    <p className="text-sm">Click "Add Experience" to get started</p>
                  </div>) : (formData.experience.map((exp, index) => (<div key={exp.id} className="p-4 rounded-lg bg-secondary/50 border border-border space-y-4">
                      <div className="flex items-start justify-between">
                        <span className="text-sm text-muted-foreground">Experience {index + 1}</span>
                        <Button variant="ghost" size="icon" onClick={() => removeExperience(exp.id)} className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10">
                          <Trash2 className="h-4 w-4"/>
                        </Button>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Company</Label>
                          <Input placeholder="Company name" value={exp.company} onChange={(e) => updateExperience(exp.id, "company", e.target.value)} className="bg-background border-input"/>
                        </div>
                        <div className="space-y-2">
                          <Label>Job Title</Label>
                          <Input placeholder="Your role" value={exp.title} onChange={(e) => updateExperience(exp.id, "title", e.target.value)} className="bg-background border-input"/>
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Start Date</Label>
                          <Input type="month" value={exp.startDate} onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)} className="bg-background border-input"/>
                        </div>
                        <div className="space-y-2">
                          <Label>End Date</Label>
                          <Input type="month" value={exp.endDate} onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)} disabled={exp.current} className="bg-background border-input"/>
                          <div className="flex items-center gap-2">
                            <Switch checked={exp.current} onCheckedChange={(checked) => updateExperience(exp.id, "current", checked)} id={`current-${exp.id}`}/>
                            <Label htmlFor={`current-${exp.id}`} className="text-sm">
                              Currently working here
                            </Label>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea placeholder="Describe your responsibilities and achievements..." rows={3} value={exp.description} onChange={(e) => updateExperience(exp.id, "description", e.target.value)} className="bg-background border-input resize-none"/>
                      </div>
                    </div>)))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Education */}
          <TabsContent value="education" className="space-y-6 mt-6">
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Education</CardTitle>
                  <CardDescription>Add your educational background</CardDescription>
                </div>
                <Button onClick={addEducation} size="sm" className="bg-primary hover:bg-primary/90">
                  <Plus className="mr-2 h-4 w-4"/>
                  Add Education
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {formData.education.length === 0 ? (<div className="text-center py-8 text-muted-foreground">
                    <GraduationCap className="h-12 w-12 mx-auto mb-4 opacity-50"/>
                    <p>No education added yet</p>
                    <p className="text-sm">Click "Add Education" to get started</p>
                  </div>) : (formData.education.map((edu, index) => (<div key={edu.id} className="p-4 rounded-lg bg-secondary/50 border border-border space-y-4">
                      <div className="flex items-start justify-between">
                        <span className="text-sm text-muted-foreground">Education {index + 1}</span>
                        <Button variant="ghost" size="icon" onClick={() => removeEducation(edu.id)} className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10">
                          <Trash2 className="h-4 w-4"/>
                        </Button>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Institution</Label>
                          <Input placeholder="University or school name" value={edu.institution} onChange={(e) => updateEducation(edu.id, "institution", e.target.value)} className="bg-background border-input"/>
                        </div>
                        <div className="space-y-2">
                          <Label>Degree</Label>
                          <Input placeholder="e.g. B.S. Computer Science" value={edu.degree} onChange={(e) => updateEducation(edu.id, "degree", e.target.value)} className="bg-background border-input"/>
                        </div>
                      </div>
                      <div className="space-y-2 sm:w-1/2">
                        <Label>Year of Graduation</Label>
                        <Input placeholder="e.g. 2020" value={edu.year} onChange={(e) => updateEducation(edu.id, "year", e.target.value)} className="bg-background border-input"/>
                      </div>
                    </div>)))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Certifications */}
          <TabsContent value="certifications" className="space-y-6 mt-6">
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Certifications</CardTitle>
                  <CardDescription>Add your professional certifications</CardDescription>
                </div>
                <Button onClick={addCertification} size="sm" className="bg-primary hover:bg-primary/90">
                  <Plus className="mr-2 h-4 w-4"/>
                  Add Certification
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.certifications.length === 0 ? (<div className="text-center py-8 text-muted-foreground">
                    <Award className="h-12 w-12 mx-auto mb-4 opacity-50"/>
                    <p>No certifications added yet</p>
                    <p className="text-sm">Click "Add Certification" to get started</p>
                  </div>) : (formData.certifications.map((cert, index) => (<div key={index} className="flex gap-2">
                      <Input placeholder="e.g. AWS Certified Developer" value={cert} onChange={(e) => updateCertification(index, e.target.value)} className="bg-secondary border-input"/>
                      <Button variant="ghost" size="icon" onClick={() => removeCertification(index)} className="flex-shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10">
                        <Trash2 className="h-4 w-4"/>
                      </Button>
                    </div>)))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects */}
          <TabsContent value="projects" className="space-y-6 mt-6">
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Projects</CardTitle>
                  <CardDescription>Showcase your work and portfolio</CardDescription>
                </div>
                <Button onClick={addProject} size="sm" className="bg-primary hover:bg-primary/90">
                  <Plus className="mr-2 h-4 w-4"/>
                  Add Project
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {formData.projects.length === 0 ? (<div className="text-center py-8 text-muted-foreground">
                    <FolderOpen className="h-12 w-12 mx-auto mb-4 opacity-50"/>
                    <p>No projects added yet</p>
                    <p className="text-sm">Click "Add Project" to showcase your work</p>
                  </div>) : (formData.projects.map((project, index) => (<div key={project.id} className="p-4 rounded-lg bg-secondary/50 border border-border space-y-4">
                      <div className="flex items-start justify-between">
                        <span className="text-sm text-muted-foreground">Project {index + 1}</span>
                        <Button variant="ghost" size="icon" onClick={() => removeProject(project.id)} className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10">
                          <Trash2 className="h-4 w-4"/>
                        </Button>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Project Name</Label>
                          <Input placeholder="Project name" value={project.name} onChange={(e) => updateProject(project.id, "name", e.target.value)} className="bg-background border-input"/>
                        </div>
                        <div className="space-y-2">
                          <Label>Project URL</Label>
                          <Input placeholder="https://..." value={project.url} onChange={(e) => updateProject(project.id, "url", e.target.value)} className="bg-background border-input"/>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea placeholder="Describe the project..." rows={3} value={project.description} onChange={(e) => updateProject(project.id, "description", e.target.value)} className="bg-background border-input resize-none"/>
                      </div>
                    </div>)))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>);
}