"use client"

import { useState, useMemo } from "react"
import { useApp } from "@/context/app-context"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Search,
  MapPin,
  Briefcase,
  Bookmark,
  BookmarkCheck,
  Mail,
  X,
  SlidersHorizontal,
  Clock,
  DollarSign,
} from "lucide-react"

export default function SearchPage() {
  const { user, candidates, categories, jobRoles, saveCandidateAction } = useApp()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedRole, setSelectedRole] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [selectedExperience, setSelectedExperience] = useState([])
  const [selectedAvailability, setSelectedAvailability] = useState([])
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCandidate, setSelectedCandidate] = useState(null)

  const locations = [...new Set(candidates.map((c) => c.location))]
  const experienceLevels = ["1-2 years", "3-5 years", "5+ years", "7+ years"]
  const availabilityOptions = ["Immediate", "2 weeks", "1 month"]

  const filteredCandidates = useMemo(() => {
    return candidates.filter((candidate) => {
      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesSearch =
          candidate.name.toLowerCase().includes(query) ||
          candidate.title.toLowerCase().includes(query) ||
          candidate.skills.some((skill) => skill.toLowerCase().includes(query))
        if (!matchesSearch) return false
      }

      // Category filter
      if (selectedCategory && candidate.category !== selectedCategory) {
        return false
      }

      // Role filter
      if (selectedRole && candidate.jobRole !== selectedRole) {
        return false
      }

      // Location filter
      if (selectedLocation && candidate.location !== selectedLocation) {
        return false
      }

      // Experience filter
      if (selectedExperience.length > 0) {
        const expMatch = selectedExperience.some((exp) => candidate.experience.includes(exp.split(" ")[0]))
        if (!expMatch) return false
      }

      // Availability filter
      if (selectedAvailability.length > 0 && !selectedAvailability.includes(candidate.availability)) {
        return false
      }

      return true
    })
  }, [
    searchQuery,
    selectedCategory,
    selectedRole,
    selectedLocation,
    selectedExperience,
    selectedAvailability,
    candidates,
  ])

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("")
    setSelectedRole("")
    setSelectedLocation("")
    setSelectedExperience([])
    setSelectedAvailability([])
  }

  const hasFilters =
    searchQuery ||
    selectedCategory ||
    selectedRole ||
    selectedLocation ||
    selectedExperience.length > 0 ||
    selectedAvailability.length > 0

  const isSaved = (candidateId) => user?.savedCandidates?.includes(candidateId)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Find Talent</h1>
            <p className="text-muted-foreground">Search and filter through our pool of verified professionals</p>
          </div>

          {/* Search and Filters */}
          <div className="mb-6 space-y-4">
            {/* Search Bar */}
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search by name, title, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-secondary border-input h-12"
                />
              </div>
              <Sheet open={showFilters} onOpenChange={setShowFilters}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="h-12 gap-2 bg-transparent">
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters
                    {hasFilters && (
                      <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                        !
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-md">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="py-6 space-y-6">
                    {/* Category */}
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="bg-secondary">
                          <SelectValue placeholder="All categories" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All categories</SelectItem>
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Role */}
                    {selectedCategory && selectedCategory !== "all" && (
                      <div className="space-y-2">
                        <Label>Job Role</Label>
                        <Select value={selectedRole} onValueChange={setSelectedRole}>
                          <SelectTrigger className="bg-secondary">
                            <SelectValue placeholder="All roles" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All roles</SelectItem>
                            {(jobRoles[selectedCategory] || []).map((role) => (
                              <SelectItem key={role} value={role}>
                                {role}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {/* Location */}
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                        <SelectTrigger className="bg-secondary">
                          <SelectValue placeholder="All locations" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All locations</SelectItem>
                          {locations.map((loc) => (
                            <SelectItem key={loc} value={loc}>
                              {loc}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Experience */}
                    <div className="space-y-3">
                      <Label>Experience Level</Label>
                      {experienceLevels.map((exp) => (
                        <div key={exp} className="flex items-center space-x-2">
                          <Checkbox
                            id={exp}
                            checked={selectedExperience.includes(exp)}
                            onCheckedChange={(checked) => {
                              setSelectedExperience(
                                checked ? [...selectedExperience, exp] : selectedExperience.filter((e) => e !== exp),
                              )
                            }}
                          />
                          <label htmlFor={exp} className="text-sm text-foreground cursor-pointer">
                            {exp}
                          </label>
                        </div>
                      ))}
                    </div>

                    {/* Availability */}
                    <div className="space-y-3">
                      <Label>Availability</Label>
                      {availabilityOptions.map((avail) => (
                        <div key={avail} className="flex items-center space-x-2">
                          <Checkbox
                            id={avail}
                            checked={selectedAvailability.includes(avail)}
                            onCheckedChange={(checked) => {
                              setSelectedAvailability(
                                checked
                                  ? [...selectedAvailability, avail]
                                  : selectedAvailability.filter((a) => a !== avail),
                              )
                            }}
                          />
                          <label htmlFor={avail} className="text-sm text-foreground cursor-pointer">
                            {avail}
                          </label>
                        </div>
                      ))}
                    </div>

                    {/* Clear and Apply */}
                    <div className="flex gap-2 pt-4">
                      <Button variant="outline" onClick={clearFilters} className="flex-1 bg-transparent">
                        Clear All
                      </Button>
                      <Button onClick={() => setShowFilters(false)} className="flex-1 bg-primary hover:bg-primary/90">
                        Apply Filters
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-auto bg-secondary border-input">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-auto bg-secondary border-input">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {hasFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">
                  <X className="mr-1 h-4 w-4" />
                  Clear filters
                </Button>
              )}
            </div>
          </div>

          {/* Results count */}
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium text-foreground">{filteredCandidates.length}</span> candidates
            </p>
          </div>

          {/* Results Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCandidates.map((candidate) => (
              <Card
                key={candidate.id}
                className="bg-card border-border hover:border-primary/30 transition-all duration-300 cursor-pointer group"
                onClick={() => setSelectedCandidate(candidate)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-14 w-14 ring-2 ring-border group-hover:ring-primary/30 transition-all">
                      <AvatarImage src={candidate.avatar || "/placeholder.svg"} alt={candidate.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {candidate.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {candidate.name}
                      </h3>
                      <p className="text-sm text-muted-foreground truncate">{candidate.title}</p>
                    </div>
                    {user?.role === "employer" && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="flex-shrink-0"
                        onClick={(e) => {
                          e.stopPropagation()
                          saveCandidateAction(candidate.id)
                        }}
                      >
                        {isSaved(candidate.id) ? (
                          <BookmarkCheck className="h-5 w-5 text-primary" />
                        ) : (
                          <Bookmark className="h-5 w-5" />
                        )}
                      </Button>
                    )}
                  </div>

                  <div className="mt-4 space-y-3">
                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {candidate.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-3 w-3" />
                        {candidate.experience}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {candidate.availability}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {candidate.skills.slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {candidate.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{candidate.skills.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        {candidate.salary}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {candidate.category}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCandidates.length === 0 && (
            <div className="text-center py-16">
              <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-medium text-foreground mb-2">No candidates found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
              <Button variant="outline" onClick={clearFilters} className="bg-transparent">
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Candidate Detail Sheet */}
      <Sheet open={!!selectedCandidate} onOpenChange={() => setSelectedCandidate(null)}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          {selectedCandidate && (
            <>
              <SheetHeader className="pb-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-20 w-20 ring-4 ring-primary/20">
                    <AvatarImage src={selectedCandidate.avatar || "/placeholder.svg"} alt={selectedCandidate.name} />
                    <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                      {selectedCandidate.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <SheetTitle className="text-xl">{selectedCandidate.name}</SheetTitle>
                    <p className="text-muted-foreground">{selectedCandidate.title}</p>
                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {selectedCandidate.location}
                    </div>
                  </div>
                </div>
              </SheetHeader>

              <div className="space-y-6 py-4">
                {/* Quick Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-secondary">
                    <p className="text-xs text-muted-foreground">Experience</p>
                    <p className="font-medium text-foreground">{selectedCandidate.experience}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary">
                    <p className="text-xs text-muted-foreground">Availability</p>
                    <p className="font-medium text-foreground">{selectedCandidate.availability}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary">
                    <p className="text-xs text-muted-foreground">Expected Salary</p>
                    <p className="font-medium text-foreground">{selectedCandidate.salary}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary">
                    <p className="text-xs text-muted-foreground">Category</p>
                    <p className="font-medium text-foreground">{selectedCandidate.category}</p>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h4 className="font-medium text-foreground mb-3">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCandidate.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-border">
                  {user?.role === "employer" && (
                    <Button
                      variant="outline"
                      onClick={() => saveCandidateAction(selectedCandidate.id)}
                      className="flex-1 bg-transparent"
                    >
                      {isSaved(selectedCandidate.id) ? (
                        <>
                          <BookmarkCheck className="mr-2 h-4 w-4" />
                          Saved
                        </>
                      ) : (
                        <>
                          <Bookmark className="mr-2 h-4 w-4" />
                          Save Profile
                        </>
                      )}
                    </Button>
                  )}
                  <Button className="flex-1 bg-primary hover:bg-primary/90">
                    <Mail className="mr-2 h-4 w-4" />
                    Contact
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <Footer />
    </div>
  )
}
