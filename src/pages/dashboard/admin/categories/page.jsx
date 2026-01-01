import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/context/app-context";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, FolderOpen, Briefcase } from "lucide-react";

export default function CategoriesPage() {
    const navigate = useNavigate();
    const { user, categories, jobRoles } = useApp();
    const [localCategories, setLocalCategories] = useState([]);
    const [localJobRoles, setLocalJobRoles] = useState({});
    const [addCategoryOpen, setAddCategoryOpen] = useState(false);
    const [addRoleOpen, setAddRoleOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [newRoleName, setNewRoleName] = useState("");

    useEffect(() => {
        if (!user || user.role !== "admin") {
            navigate("/login");
        }
        setLocalCategories(categories);
        setLocalJobRoles(jobRoles);
    }, [user, navigate, categories, jobRoles]);

    if (!user || user.role !== "admin") {
        return null;
    }

    const handleAddCategory = () => {
        if (newCategoryName.trim() && !localCategories.includes(newCategoryName.trim())) {
            setLocalCategories([...localCategories, newCategoryName.trim()]);
            setLocalJobRoles({ ...localJobRoles, [newCategoryName.trim()]: [] });
            setNewCategoryName("");
            setAddCategoryOpen(false);
        }
    };

    const handleDeleteCategory = (category) => {
        setLocalCategories(localCategories.filter((c) => c !== category));
        const newRoles = { ...localJobRoles };
        delete newRoles[category];
        setLocalJobRoles(newRoles);
        if (selectedCategory === category) {
            setSelectedCategory(null);
        }
    };

    const handleAddRole = () => {
        if (selectedCategory && newRoleName.trim()) {
            const currentRoles = localJobRoles[selectedCategory] || [];
            if (!currentRoles.includes(newRoleName.trim())) {
                setLocalJobRoles({
                    ...localJobRoles,
                    [selectedCategory]: [...currentRoles, newRoleName.trim()],
                });
                setNewRoleName("");
                setAddRoleOpen(false);
            }
        }
    };

    const handleDeleteRole = (role) => {
        if (selectedCategory) {
            setLocalJobRoles({
                ...localJobRoles,
                [selectedCategory]: localJobRoles[selectedCategory].filter((r) => r !== role),
            });
        }
    };

    return (<DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Categories & Job Roles</h1>
            <p className="text-muted-foreground">Manage job categories and available roles</p>
          </div>
          <Dialog open={addCategoryOpen} onOpenChange={setAddCategoryOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="mr-2 h-4 w-4"/>
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
                <DialogDescription>Create a new job category</DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <div className="space-y-2">
                  <Label htmlFor="category-name">Category Name</Label>
                  <Input id="category-name" placeholder="e.g. Artificial Intelligence" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} className="bg-secondary border-input"/>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setAddCategoryOpen(false)} className="bg-transparent">
                  Cancel
                </Button>
                <Button onClick={handleAddCategory} className="bg-primary hover:bg-primary/90">
                  Add Category
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Categories List */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FolderOpen className="h-5 w-5"/>
                Categories ({localCategories.length})
              </CardTitle>
              <CardDescription>Click a category to manage its job roles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {localCategories.map((category) => (<div key={category} className={`flex items-center justify-between p-3 rounded-lg border transition-colors cursor-pointer ${selectedCategory === category
                ? "bg-primary/10 border-primary"
                : "bg-secondary/50 border-border hover:border-primary/30"}`} onClick={() => setSelectedCategory(category)}>
                    <div className="flex items-center gap-3">
                      <FolderOpen className={`h-4 w-4 ${selectedCategory === category ? "text-primary" : "text-muted-foreground"}`}/>
                      <span className="font-medium text-foreground">{category}</span>
                      <Badge variant="secondary" className="text-xs">
                        {(localJobRoles[category] || []).length} roles
                      </Badge>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={(e) => {
                e.stopPropagation();
                handleDeleteCategory(category);
            }}>
                      <Trash2 className="h-4 w-4"/>
                    </Button>
                  </div>))}
              </div>
            </CardContent>
          </Card>

          {/* Job Roles */}
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5"/>
                  Job Roles
                </CardTitle>
                <CardDescription>
                  {selectedCategory ? `Roles in ${selectedCategory}` : "Select a category to view roles"}
                </CardDescription>
              </div>
              {selectedCategory && (<Dialog open={addRoleOpen} onOpenChange={setAddRoleOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      <Plus className="mr-2 h-4 w-4"/>
                      Add Role
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Role</DialogTitle>
                      <DialogDescription>Add a job role to {selectedCategory}</DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <div className="space-y-2">
                        <Label htmlFor="role-name">Role Name</Label>
                        <Input id="role-name" placeholder="e.g. ML Engineer" value={newRoleName} onChange={(e) => setNewRoleName(e.target.value)} className="bg-secondary border-input"/>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setAddRoleOpen(false)} className="bg-transparent">
                        Cancel
                      </Button>
                      <Button onClick={handleAddRole} className="bg-primary hover:bg-primary/90">
                        Add Role
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>)}
            </CardHeader>
            <CardContent>
              {selectedCategory ? (<div className="space-y-2">
                  {(localJobRoles[selectedCategory] || []).length === 0 ? (<div className="text-center py-8 text-muted-foreground">
                      <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-50"/>
                      <p>No roles in this category</p>
                      <p className="text-sm">Click "Add Role" to get started</p>
                    </div>) : ((localJobRoles[selectedCategory] || []).map((role) => (<div key={role} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border">
                        <div className="flex items-center gap-3">
                          <Briefcase className="h-4 w-4 text-muted-foreground"/>
                          <span className="text-foreground">{role}</span>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4"/>
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleDeleteRole(role)}>
                            <Trash2 className="h-4 w-4"/>
                          </Button>
                        </div>
                      </div>)))}
                </div>) : (<div className="text-center py-8 text-muted-foreground">
                  <FolderOpen className="h-12 w-12 mx-auto mb-4 opacity-50"/>
                  <p>Select a category from the left</p>
                  <p className="text-sm">to view and manage its job roles</p>
                </div>)}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>);
}