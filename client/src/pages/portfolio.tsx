import { useState } from "react";
import { Link } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/theme-toggle";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, ArrowRight, Briefcase, Clock, Users } from "lucide-react";
import type { CaseStudy } from "@shared/schema";

export default function Portfolio() {
  const { toast } = useToast();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newCaseStudy, setNewCaseStudy] = useState({
    title: "",
    subtitle: "",
    role: "",
    timeline: "",
    teamSize: "",
  });

  const { data: caseStudies = [], isLoading } = useQuery<CaseStudy[]>({
    queryKey: ["/api/case-studies"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof newCaseStudy) => {
      return apiRequest("POST", "/api/case-studies", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/case-studies"] });
      toast({ title: "Case study created" });
      setCreateDialogOpen(false);
      setNewCaseStudy({ title: "", subtitle: "", role: "", timeline: "", teamSize: "" });
    },
    onError: () => {
      toast({ title: "Failed to create case study", variant: "destructive" });
    },
  });

  const handleCreate = () => {
    if (!newCaseStudy.title.trim()) {
      toast({ title: "Please enter a title", variant: "destructive" });
      return;
    }
    createMutation.mutate(newCaseStudy);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        <div className="max-w-6xl mx-auto px-6 py-16">
          <Skeleton className="h-12 w-64 mb-4" />
          <Skeleton className="h-6 w-96 mb-12" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Skeleton className="h-64" />
            <Skeleton className="h-64" />
            <Skeleton className="h-64" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4" data-testid="text-portfolio-title">
            Case Study Portfolio
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Documenting the design process and outcomes of AI-powered applications
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((study) => (
            <Link key={study.id} href={`/case-study/${study.id}`}>
              <Card 
                className="group cursor-pointer hover-elevate transition-all h-full"
                data-testid={`card-case-study-${study.id}`}
              >
                <CardHeader>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {study.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {study.subtitle || "No description"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    {study.role && (
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        <span>{study.role}</span>
                      </div>
                    )}
                    {study.timeline && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{study.timeline}</span>
                      </div>
                    )}
                    {study.teamSize && (
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{study.teamSize}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center text-sm text-primary font-medium">
                    View case study
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}

          <Card 
            className="cursor-pointer hover-elevate transition-all border-dashed flex items-center justify-center min-h-[200px]"
            onClick={() => setCreateDialogOpen(true)}
            data-testid="button-create-case-study"
          >
            <div className="text-center p-6">
              <Plus className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm font-medium text-muted-foreground">Add New Case Study</p>
            </div>
          </Card>
        </div>
      </div>

      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Case Study</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title *</Label>
              <Input
                id="title"
                value={newCaseStudy.title}
                onChange={(e) => setNewCaseStudy({ ...newCaseStudy, title: e.target.value })}
                placeholder="e.g., Agent Studio"
                data-testid="input-case-study-title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtitle</Label>
              <Textarea
                id="subtitle"
                value={newCaseStudy.subtitle}
                onChange={(e) => setNewCaseStudy({ ...newCaseStudy, subtitle: e.target.value })}
                placeholder="Brief description of the project"
                data-testid="input-case-study-subtitle"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="role">Your Role</Label>
                <Input
                  id="role"
                  value={newCaseStudy.role}
                  onChange={(e) => setNewCaseStudy({ ...newCaseStudy, role: e.target.value })}
                  placeholder="e.g., Lead Designer"
                  data-testid="input-case-study-role"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeline">Timeline</Label>
                <Input
                  id="timeline"
                  value={newCaseStudy.timeline}
                  onChange={(e) => setNewCaseStudy({ ...newCaseStudy, timeline: e.target.value })}
                  placeholder="e.g., 3 months"
                  data-testid="input-case-study-timeline"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="teamSize">Team Size</Label>
                <Input
                  id="teamSize"
                  value={newCaseStudy.teamSize}
                  onChange={(e) => setNewCaseStudy({ ...newCaseStudy, teamSize: e.target.value })}
                  placeholder="e.g., 5 people"
                  data-testid="input-case-study-team-size"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleCreate} 
              disabled={createMutation.isPending}
              data-testid="button-save-case-study"
            >
              {createMutation.isPending ? "Creating..." : "Create Case Study"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
