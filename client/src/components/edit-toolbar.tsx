import { Button } from "@/components/ui/button";
import { Settings, Plus, Lightbulb, Eye, Pencil, FileText } from "lucide-react";

interface EditToolbarProps {
  isEditMode: boolean;
  onToggleEditMode: () => void;
  onEditCaseStudy: () => void;
  onAddStep: () => void;
  onAddInsight: () => void;
}

export function EditToolbar({
  isEditMode,
  onToggleEditMode,
  onEditCaseStudy,
  onAddStep,
  onAddInsight,
}: EditToolbarProps) {
  const scrollToNotes = () => {
    const notesSection = document.querySelector('[data-testid="button-toggle-notes"]');
    if (notesSection) {
      notesSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 p-2 bg-card border border-card-border rounded-full shadow-lg backdrop-blur-sm">
        <Button
          variant={isEditMode ? "default" : "ghost"}
          size="sm"
          onClick={onToggleEditMode}
          className="rounded-full"
          data-testid="button-toggle-edit"
        >
          {isEditMode ? (
            <>
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </>
          ) : (
            <>
              <Pencil className="w-4 h-4 mr-2" />
              Edit
            </>
          )}
        </Button>

        {isEditMode && (
          <>
            <div className="w-px h-6 bg-border" />
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onEditCaseStudy}
              className="rounded-full"
              data-testid="button-edit-case-study"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={onAddStep}
              className="rounded-full"
              data-testid="button-add-step"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Step
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={onAddInsight}
              className="rounded-full"
              data-testid="button-add-insight"
            >
              <Lightbulb className="w-4 h-4 mr-2" />
              Add Insight
            </Button>
              <div className="w-px h-6 bg-border" />

            <Button
              variant="ghost"
              size="sm"
              onClick={scrollToNotes}
              className="rounded-full"
              data-testid="button-notes"
            >
              <FileText className="w-4 h-4 mr-2" />
              Notes
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
