import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "next-themes";
import { useApp } from "@/context/app-context";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Sun, Moon, Menu, X, Briefcase, User, Settings, LogOut, Building2, Shield } from "lucide-react";

export function Navbar() {
    const { user, logout } = useApp();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const { pathname } = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const getDashboardLink = () => {
        if (!user)
            return "/login";
        switch (user.role) {
            case "jobseeker":
                return "/dashboard/jobseeker";
            case "employer":
                return "/dashboard/employer";
            case "admin":
                return "/dashboard/admin";
            default:
                return "/login";
        }
    };

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/search", label: "Find Talent" },
    ];

    return (<nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl transition-theme">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform group-hover:scale-105">
              <Briefcase className="h-5 w-5"/>
            </div>
            <span className="text-xl font-bold text-foreground">TalentHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (<Link key={link.href} to={link.href} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === link.href
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}`}>
                {link.label}
              </Link>))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="rounded-lg" aria-label="Toggle theme">
              {mounted && theme === "dark" ? (<Sun className="h-5 w-5"/>) : (<Moon className="h-5 w-5"/>)}
            </Button>

            {user ? (<DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9 ring-2 ring-border">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name}/>
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to={getDashboardLink()} className="flex items-center cursor-pointer">
                      {user.role === "admin" ? (<Shield className="mr-2 h-4 w-4"/>) : user.role === "employer" ? (<Building2 className="mr-2 h-4 w-4"/>) : (<User className="mr-2 h-4 w-4"/>)}
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  {user.role === "jobseeker" && (<DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center cursor-pointer">
                        <Settings className="mr-2 h-4 w-4"/>
                        Edit Profile
                      </Link>
                    </DropdownMenuItem>)}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-destructive cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4"/>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>) : (<div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" className="hidden sm:flex">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-primary hover:bg-primary/90">Get Started</Button>
                </Link>
              </div>)}

            {/* Mobile menu button */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-5 w-5"/> : <Menu className="h-5 w-5"/>}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (<div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (<Link key={link.href} to={link.href} onClick={() => setMobileMenuOpen(false)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === link.href
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}`}>
                  {link.label}
                </Link>))}
              {!user && (<Link to="/login" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50">
                  Sign In
                </Link>)}
            </div>
          </div>)}
      </div>
    </nav>);
}