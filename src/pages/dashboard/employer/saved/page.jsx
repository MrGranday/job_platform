import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/context/app-context";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bookmark, MapPin, Mail, Trash2 } from "lucide-react";

export default function SavedCandidatesPage() {
    const navigate = useNavigate();
    const { user, candidates, saveCandidateAction } = useApp();
    
    useEffect(() => {
        if (!user || user.role !== "employer") {
            navigate("/login");
        }
    }, [user, navigate]);

    if (!user || user.role !== "employer") {
        return null;
    }

    const savedCandidates = candidates.filter((c) => user.savedCandidates?.includes(c.id));

    return (<DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Saved Candidates</h1>
          <p className="text-muted-foreground">Candidates you've bookmarked for later</p>
        </div>

        {savedCandidates.length === 0 ? (<Card className="bg-card border-border">
            <CardContent className="py-16 text-center">
              <Bookmark className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50"/>
              <h3 className="text-lg font-medium text-foreground mb-2">No saved candidates</h3>
              <p className="text-muted-foreground mb-4">
                Start browsing candidates and save the ones you're interested in.
              </p>
              <Button onClick={() => navigate("/search")} className="bg-primary hover:bg-primary/90">
                Find Candidates
              </Button>
            </CardContent>
          </Card>) : (<div className="grid md:grid-cols-2 gap-4">
            {savedCandidates.map((candidate) => (<Card key={candidate.id} className="bg-card border-border hover:border-primary/30 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-14 w-14">
                      <AvatarImage src={candidate.avatar || "/placeholder.svg"} alt={candidate.name}/>
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {candidate.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground">{candidate.name}</h3>
                      <p className="text-sm text-muted-foreground">{candidate.title}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3"/>
                        {candidate.location}
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => saveCandidateAction(candidate.id)} className="text-destructive hover:text-destructive hover:bg-destructive/10">
                      <Trash2 className="h-4 w-4"/>
                    </Button>
                  </div>

                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {candidate.skills.slice(0, 3).map((skill, index) => (<Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>))}
                      {candidate.skills.length > 3 && (<Badge variant="outline" className="text-xs">
                          +{candidate.skills.length - 3}
                        </Badge>)}
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Mail className="mr-2 h-4 w-4"/>
                        Contact
                      </Button>
                      <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90">
                        View Profile
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>))}
          </div>)}
      </div>
    </DashboardLayout>);
}