import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useApp } from "@/context/app-context";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Briefcase, Filter, ExternalLink, ArrowRight } from "lucide-react";

export default function SearchPage() {
    const navigate = useNavigate();
    const { candidates } = useApp();
    
    // In a real app, we would have state for search query, filters, etc.
    // const [searchQuery, setSearchQuery] = useState("");

    return (<div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Search Header */}
        <div className="bg-secondary/30 border-b border-border py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">Find Top Talent</h1>
            <p className="text-muted-foreground max-w-2xl mb-8">
              Browse our database of verified professionals or post a job to find the perfect match for your team.
            </p>

            <div className="flex flex-col md:flex-row gap-4 max-w-3xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"/>
                <Input placeholder="Search by job title, skill, or keyword..." className="pl-10 h-12 text-base bg-background border-input"/>
              </div>
              <div className="relative md:w-48">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"/>
                <Input placeholder="Location" className="pl-10 h-12 text-base bg-background border-input"/>
              </div>
              <Button size="lg" className="h-12 px-8 bg-primary hover:bg-primary/90">
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar (Hidden on mobile for simplicity in this demo) */}
            <div className="hidden lg:block w-64 space-y-8">
              <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Filter className="h-4 w-4"/> Filters
                </h3>
                {/* Filter content would go here */}
                <div className="p-4 rounded-lg border border-border bg-card/50 text-sm text-muted-foreground">
                  Filters are simulated in this demo.
                </div>
              </div>
            </div>

            {/* Candidate List */}
            <div className="flex-1 space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">Showing {candidates.length} candidates</p>
                <Select defaultValue="relevant">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by"/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevant">Most Relevant</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="experience">Experience</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {candidates.map((candidate) => (<Card key={candidate.id} className="bg-card border-border hover:border-primary/30 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-6">
                      <Avatar className="h-20 w-20 ring-2 ring-border">
                        <AvatarImage src={candidate.avatar || "/placeholder.svg"} alt={candidate.name}/>
                        <AvatarFallback className="text-xl bg-primary text-primary-foreground">
                          {candidate.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                          <div>
                            <h3 className="text-xl font-bold text-foreground hover:text-primary transition-colors cursor-pointer">
                              {candidate.name}
                            </h3>
                            <p className="text-muted-foreground flex items-center gap-1.5 mt-1">
                              <Briefcase className="h-4 w-4"/>
                              {candidate.title}
                            </p>
                          </div>
                          <Button variant="outline" className="bg-transparent" onClick={() => navigate(`/search?id=${candidate.id}`)}>
                            View Profile <ArrowRight className="ml-2 h-4 w-4"/>
                          </Button>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3"/> {candidate.location}
                          </span>
                          <span>•</span>
                          <span>{candidate.experience} exp</span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {candidate.skills.map((skill, index) => (<Badge key={index} variant="secondary">
                              {skill}
                            </Badge>))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
        </div>);
    }
    