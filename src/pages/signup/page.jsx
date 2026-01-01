import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "@/context/app-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, Eye, EyeOff, ArrowLeft, User, Building2, CheckCircle } from "lucide-react";

export default function SignupPage() {
    const navigate = useNavigate();
    const { signup } = useApp();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedRole, setSelectedRole] = useState("jobseeker");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        companyName: "",
    });

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }
        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters");
            setLoading(false);
            return;
        }
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const userData = {
            name: formData.name,
            email: formData.email,
            role: selectedRole,
            ...(selectedRole === "employer" && { company: { name: formData.companyName } }),
            ...(selectedRole === "jobseeker" && {
                profile: {
                    title: "",
                    location: "",
                    about: "",
                    skills: [],
                    experience: [],
                    education: [],
                    certifications: [],
                    projects: [],
                    visibility: true,
                },
            }),
        };
        const result = signup(userData);
        if (result.success) {
            switch (selectedRole) {
                case "jobseeker":
                    navigate("/profile");
                    break;
                case "employer":
                    navigate("/dashboard/employer");
                    break;
                default:
                    navigate("/");
            }
        }
        else {
            setError("Failed to create account. Please try again.");
        }
        setLoading(false);
    };

    const benefits = {
        jobseeker: [
            "Create a professional profile",
            "Get discovered by top employers",
            "Track your applications",
            "Access exclusive job opportunities",
        ],
        employer: [
            "Search verified candidates",
            "Advanced filtering options",
            "Save and bookmark profiles",
            "Direct messaging with candidates",
        ],
    };

    return (<div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="p-4">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4"/>
          Back to home
        </Link>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Briefcase className="h-6 w-6"/>
              </div>
              <span className="text-2xl font-bold text-foreground">TalentHub</span>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Benefits section */}
            <div className="hidden md:flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">
                Join thousands of professionals on TalentHub
              </h2>
              <p className="text-muted-foreground mb-8">
                Create your free account and start connecting with opportunities that match your skills.
              </p>
              <ul className="space-y-3">
                {benefits[selectedRole]?.map((benefit, index) => (<li key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0"/>
                    <span className="text-foreground">{benefit}</span>
                  </li>))}
              </ul>
            </div>

            {/* Form */}
            <Card className="border-border bg-card">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Create your account</CardTitle>
                <CardDescription>Get started with TalentHub today</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="jobseeker" className="w-full" onValueChange={(value) => setSelectedRole(value)}>
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="jobseeker" className="gap-1.5">
                      <User className="h-4 w-4"/>
                      Job Seeker
                    </TabsTrigger>
                    <TabsTrigger value="employer" className="gap-1.5">
                      <Building2 className="h-4 w-4"/>
                      Employer
                    </TabsTrigger>
                  </TabsList>

                  {["jobseeker", "employer"].map((role) => (<TabsContent key={role} value={role}>
                      <form onSubmit={handleSignup} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor={`${role}-name`}>Full Name</Label>
                          <Input id={`${role}-name`} type="text" placeholder="John Doe" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="bg-secondary border-input" required/>
                        </div>

                        {role === "employer" && (<div className="space-y-2">
                            <Label htmlFor="company-name">Company Name</Label>
                            <Input id="company-name" type="text" placeholder="Acme Inc." value={formData.companyName} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} className="bg-secondary border-input" required/>
                          </div>)}

                        <div className="space-y-2">
                          <Label htmlFor={`${role}-signup-email`}>Email</Label>
                          <Input id={`${role}-signup-email`} type="email" placeholder="you@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="bg-secondary border-input" required/>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`${role}-signup-password`}>Password</Label>
                          <div className="relative">
                            <Input id={`${role}-signup-password`} type={showPassword ? "text" : "password"} placeholder="••••••••" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="bg-secondary border-input pr-10" required/>
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                              {showPassword ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`${role}-confirm-password`}>Confirm Password</Label>
                          <Input id={`${role}-confirm-password`} type="password" placeholder="••••••••" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} className="bg-secondary border-input" required/>
                        </div>

                        {error && (<div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>)}

                        <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
                          {loading ? "Creating account..." : "Create Account"}
                        </Button>

                        <p className="text-xs text-muted-foreground text-center">
                          By signing up, you agree to our{" "}
                          <Link to="#" className="text-primary hover:text-primary/80">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link to="#" className="text-primary hover:text-primary/80">
                            Privacy Policy
                          </Link>
                        </p>
                      </form>
                    </TabsContent>))}
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
                    Sign in
                  </Link>
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>);
}