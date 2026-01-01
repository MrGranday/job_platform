import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "@/context/app-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, Eye, EyeOff, ArrowLeft, User, Building2, Shield } from "lucide-react";

export default function LoginPage() {
    const navigate = useNavigate();
    const { login } = useApp();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleLogin = async (role) => {
        setLoading(true);
        setError("");
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const result = login(formData.email, formData.password, role);
        if (result.success) {
            switch (role) {
                case "jobseeker":
                    navigate("/dashboard/jobseeker");
                    break;
                case "employer":
                    navigate("/dashboard/employer");
                    break;
                case "admin":
                    navigate("/dashboard/admin");
                    break;
                default:
                    navigate("/");
            }
        }
        else {
            setError("Invalid credentials. Please try again.");
        }
        setLoading(false);
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
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Briefcase className="h-6 w-6"/>
              </div>
              <span className="text-2xl font-bold text-foreground">TalentHub</span>
            </Link>
          </div>

          <Card className="border-border bg-card">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Welcome back</CardTitle>
              <CardDescription>Sign in to your account to continue</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="jobseeker" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="jobseeker" className="gap-1.5">
                    <User className="h-4 w-4"/>
                    <span className="hidden sm:inline">Job Seeker</span>
                  </TabsTrigger>
                  <TabsTrigger value="employer" className="gap-1.5">
                    <Building2 className="h-4 w-4"/>
                    <span className="hidden sm:inline">Employer</span>
                  </TabsTrigger>
                  <TabsTrigger value="admin" className="gap-1.5">
                    <Shield className="h-4 w-4"/>
                    <span className="hidden sm:inline">Admin</span>
                  </TabsTrigger>
                </TabsList>

                {["jobseeker", "employer", "admin"].map((role) => (<TabsContent key={role} value={role}>
                    <form onSubmit={(e) => {
                e.preventDefault();
                handleLogin(role);
            }} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor={`${role}-email`}>Email</Label>
                        <Input id={`${role}-email`} type="email" placeholder="you@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="bg-secondary border-input"/>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor={`${role}-password`}>Password</Label>
                          <Link to="#" className="text-xs text-primary hover:text-primary/80 transition-colors">
                            Forgot password?
                          </Link>
                        </div>
                        <div className="relative">
                          <Input id={`${role}-password`} type={showPassword ? "text" : "password"} placeholder="••••••••" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="bg-secondary border-input pr-10"/>
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                            {showPassword ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
                          </button>
                        </div>
                      </div>

                      {error && (<div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>)}

                      <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
                        {loading ? "Signing in..." : "Sign In"}
                      </Button>

                      {/* Demo credentials hint */}
                      <div className="p-3 rounded-lg bg-secondary text-muted-foreground text-xs">
                        <strong>Demo:</strong> Enter any email/password and click Sign In to access the {role}{" "}
                        dashboard.
                      </div>
                    </form>
                  </TabsContent>))}
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border"/>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary hover:text-primary/80 font-medium transition-colors">
                  Create one
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>);
}