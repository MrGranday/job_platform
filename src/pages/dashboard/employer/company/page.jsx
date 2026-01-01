import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/context/app-context";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Save, Upload } from "lucide-react";

export default function CompanyProfilePage() {
    const navigate = useNavigate();
    const { user } = useApp();
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        industry: "",
        size: "",
        website: "",
        description: "",
        location: "",
    });

    useEffect(() => {
        if (!user || user.role !== "employer") {
            navigate("/login");
            return;
        }
        if (user.company) {
            setFormData({ ...formData, ...user.company });
        }
    }, [user, navigate]);

    if (!user || user.role !== "employer") {
        return null;
    }

    const handleSave = async () => {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setSaved(true);
        setLoading(false);
        setTimeout(() => setSaved(false), 3000);
    };

    const industries = [
        "Technology",
        "Finance",
        "Healthcare",
        "Education",
        "E-commerce",
        "Marketing",
        "Manufacturing",
        "Consulting",
        "Media",
        "Other",
    ];
    const sizes = [
        "1-10 employees",
        "11-50 employees",
        "51-200 employees",
        "201-500 employees",
        "501-1000 employees",
        "1000+ employees",
    ];

    return (<DashboardLayout>
      <div className="space-y-6 max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Company Profile</h1>
            <p className="text-muted-foreground">Manage your company information</p>
          </div>
          <Button onClick={handleSave} disabled={loading} className="bg-primary hover:bg-primary/90">
            <Save className="mr-2 h-4 w-4"/>
            {loading ? "Saving..." : saved ? "Saved!" : "Save Changes"}
          </Button>
        </div>

        {/* Company Logo */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Company Logo</CardTitle>
            <CardDescription>Upload your company logo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="h-24 w-24 rounded-xl bg-primary/10 flex items-center justify-center">
                <Building2 className="h-10 w-10 text-primary"/>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Recommended size: 200x200px</p>
                <Button variant="outline" size="sm" className="bg-transparent">
                  <Upload className="mr-2 h-4 w-4"/>
                  Upload Logo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Company Info */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
            <CardDescription>Basic details about your company</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Company Name</Label>
              <Input id="name" placeholder="Your company name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="bg-secondary border-input"/>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Select value={formData.industry} onValueChange={(value) => setFormData({ ...formData, industry: value })}>
                  <SelectTrigger className="bg-secondary border-input">
                    <SelectValue placeholder="Select industry"/>
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((ind) => (<SelectItem key={ind} value={ind}>
                        {ind}
                      </SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="size">Company Size</Label>
                <Select value={formData.size} onValueChange={(value) => setFormData({ ...formData, size: value })}>
                  <SelectTrigger className="bg-secondary border-input">
                    <SelectValue placeholder="Select size"/>
                  </SelectTrigger>
                  <SelectContent>
                    {sizes.map((s) => (<SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="e.g. San Francisco, CA" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="bg-secondary border-input"/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input id="website" placeholder="https://example.com" value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} className="bg-secondary border-input"/>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">About the Company</Label>
              <Textarea id="description" placeholder="Describe your company, culture, and what makes it a great place to work..." rows={4} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="bg-secondary border-input resize-none"/>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>);
}