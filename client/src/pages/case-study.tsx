import { useState } from "react";
import { useRoute, Link } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/theme-toggle";
import { HeroSection } from "@/components/hero-section";
import { ProjectOverview } from "@/components/project-overview";
import { EditableStepsSection } from "@/components/editable-steps-section";
import { ProcessTimeline } from "@/components/process-timeline";
import { EditableInsightsSection } from "@/components/editable-insights-section";
import { NotesSection } from "@/components/notes-section";
import { FooterSection } from "@/components/footer-section";
import { EditToolbar } from "@/components/edit-toolbar";
import { EditCaseStudyDialog } from "@/components/edit-case-study-dialog";
import { EditStepDialog } from "@/components/edit-step-dialog";
import { EditInsightDialog } from "@/components/edit-insight-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import type { CaseStudy, Step, Insight } from "@shared/schema";

export default function CaseStudyPage() {
  const [, params] = useRoute("/case-study/:id");
  const caseStudyId = params?.id;

  const { toast } = useToast();
  const [isEditMode, setIsEditMode] = useState(false);
  const [editCaseStudyOpen, setEditCaseStudyOpen] = useState(false);
  const [editStepOpen, setEditStepOpen] = useState(false);
  const [editInsightOpen, setEditInsightOpen] = useState(false);
  const [selectedStep, setSelectedStep] = useState<Step | undefined>();
  const [selectedInsight, setSelectedInsight] = useState<Insight | undefined>();

  const { data: caseStudy, isLoading: caseStudyLoading } = useQuery<CaseStudy>({
    queryKey: ["/api/case-studies", caseStudyId],
    queryFn: async () => {
      const res = await fetch(`/api/case-studies/${caseStudyId}`);
      if (!res.ok) throw new Error("Failed to fetch case study");
      return res.json();
    },
    enabled: !!caseStudyId,
  });

  const { data: steps = [], isLoading: stepsLoading } = useQuery<Step[]>({
    queryKey: ["/api/case-studies", caseStudyId, "steps"],
    queryFn: async () => {
      const res = await fetch(`/api/case-studies/${caseStudyId}/steps`);
      if (!res.ok) throw new Error("Failed to fetch steps");
      return res.json();
    },
    enabled: !!caseStudyId,
  });

  const { data: insights = [], isLoading: insightsLoading } = useQuery<Insight[]>({
    queryKey: ["/api/case-studies", caseStudyId, "insights"],
    queryFn: async () => {
      const res = await fetch(`/api/case-studies/${caseStudyId}/insights`);
      if (!res.ok) throw new Error("Failed to fetch insights");
      return res.json();
    },
    enabled: !!caseStudyId,
  });

  const updateCaseStudyMutation = useMutation({
    mutationFn: async (data: Partial<CaseStudy>) => {
      return apiRequest("PATCH", `/api/case-studies/${caseStudyId}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/case-studies", caseStudyId] });
      toast({ title: "Case study updated" });
    },
    onError: () => {
      toast({ title: "Failed to update case study", variant: "destructive" });
    },
  });

  const createStepMutation = useMutation({
    mutationFn: async (data: Omit<Step, "id">) => {
      return apiRequest("POST", "/api/steps", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/case-studies", caseStudyId, "steps"] });
      toast({ title: "Step added" });
    },
    onError: () => {
      toast({ title: "Failed to add step", variant: "destructive" });
    },
  });

  const updateStepMutation = useMutation({
    mutationFn: async ({ id, ...data }: Partial<Step> & { id: string }) => {
      return apiRequest("PATCH", `/api/steps/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/case-studies", caseStudyId, "steps"] });
      toast({ title: "Step updated" });
    },
    onError: () => {
      toast({ title: "Failed to update step", variant: "destructive" });
    },
  });

  const deleteStepMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/steps/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/case-studies", caseStudyId, "steps"] });
      toast({ title: "Step deleted" });
      setEditStepOpen(false);
    },
    onError: () => {
      toast({ title: "Failed to delete step", variant: "destructive" });
    },
  });

  const createInsightMutation = useMutation({
    mutationFn: async (data: Omit<Insight, "id">) => {
      return apiRequest("POST", "/api/insights", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/case-studies", caseStudyId, "insights"] });
      toast({ title: "Insight added" });
    },
    onError: () => {
      toast({ title: "Failed to add insight", variant: "destructive" });
    },
  });

  const updateInsightMutation = useMutation({
    mutationFn: async ({ id, ...data }: Partial<Insight> & { id: string }) => {
      return apiRequest("PATCH", `/api/insights/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/case-studies", caseStudyId, "insights"] });
      toast({ title: "Insight updated" });
    },
    onError: () => {
      toast({ title: "Failed to update insight", variant: "destructive" });
    },
  });

  const deleteInsightMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/insights/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/case-studies", caseStudyId, "insights"] });
      toast({ title: "Insight deleted" });
      setEditInsightOpen(false);
    },
    onError: () => {
      toast({ title: "Failed to delete insight", variant: "destructive" });
    },
  });

  const handleEditStep = (step: Step) => {
    setSelectedStep(step);
    setEditStepOpen(true);
  };

  const handleAddStep = () => {
    setSelectedStep(undefined);
    setEditStepOpen(true);
  };

  const handleSaveStep = (data: { title: string; stepNumber: number; description?: string; imageUrl?: string; imageCaption?: string; caseStudyId: string }) => {
    const stepData = {
      ...data,
      description: data.description ?? null,
      imageUrl: data.imageUrl ?? null,
      imageCaption: data.imageCaption ?? null,
    };
    if (selectedStep) {
      updateStepMutation.mutate({ id: selectedStep.id, ...stepData });
    } else {
      createStepMutation.mutate(stepData);
    }
  };

  const handleEditInsight = (insight: Insight) => {
    setSelectedInsight(insight);
    setEditInsightOpen(true);
  };

  const handleAddInsight = () => {
    setSelectedInsight(undefined);
    setEditInsightOpen(true);
  };

  const handleSaveInsight = (data: { title: string; description?: string; category?: string; caseStudyId: string }) => {
    const insightData = {
      ...data,
      description: data.description ?? null,
      category: data.category ?? null,
    };
    if (selectedInsight) {
      updateInsightMutation.mutate({ id: selectedInsight.id, ...insightData });
    } else {
      createInsightMutation.mutate(insightData);
    }
  };

  const isLoading = caseStudyLoading || stepsLoading || insightsLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="space-y-4 w-full max-w-xl px-6">
            <Skeleton className="h-12 w-3/4 mx-auto" />
            <Skeleton className="h-6 w-1/2 mx-auto" />
          </div>
        </div>
        <div className="py-16 px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
            <Skeleton className="h-40" />
            <Skeleton className="h-40" />
            <Skeleton className="h-40" />
          </div>
        </div>
      </div>
    );
  }

  if (!caseStudy) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-2">Case study not found</h1>
          <p className="text-muted-foreground mb-4">The requested case study could not be found.</p>
          <Link href="/">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Portfolio
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const nextStepNumber = steps.length > 0 
    ? Math.max(...steps.map(s => s.stepNumber)) + 1 
    : 1;

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-4 left-4 z-50">
        <Link href="/">
          <Button variant="outline" size="sm" data-testid="button-back-to-portfolio">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Portfolio
          </Button>
        </Link>
      </div>
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <HeroSection caseStudy={caseStudy} />
      <ProjectOverview caseStudy={caseStudy} />
      <EditableStepsSection 
        steps={steps} 
        isEditMode={isEditMode}
        onEditStep={handleEditStep}
      />
      <ProcessTimeline steps={steps} />
      <EditableInsightsSection 
        insights={insights}
        isEditMode={isEditMode}
        onEditInsight={handleEditInsight}
      />
      {isEditMode && <NotesSection caseStudyId={caseStudy.id} />}
      <FooterSection />

      <EditToolbar
        isEditMode={isEditMode}
        onToggleEditMode={() => setIsEditMode(!isEditMode)}
        onEditCaseStudy={() => setEditCaseStudyOpen(true)}
        onAddStep={handleAddStep}
        onAddInsight={handleAddInsight}
      />

      <EditCaseStudyDialog
        caseStudy={caseStudy}
        open={editCaseStudyOpen}
        onOpenChange={setEditCaseStudyOpen}
        onSave={(data) => updateCaseStudyMutation.mutate(data)}
      />

      <EditStepDialog
        step={selectedStep}
        caseStudyId={caseStudy.id}
        nextStepNumber={nextStepNumber}
        open={editStepOpen}
        onOpenChange={setEditStepOpen}
        onSave={handleSaveStep}
        onDelete={selectedStep ? () => deleteStepMutation.mutate(selectedStep.id) : undefined}
      />

      <EditInsightDialog
        insight={selectedInsight}
        caseStudyId={caseStudy.id}
        open={editInsightOpen}
        onOpenChange={setEditInsightOpen}
        onSave={handleSaveInsight}
        onDelete={selectedInsight ? () => deleteInsightMutation.mutate(selectedInsight.id) : undefined}
      />
    </div>
  );
}
