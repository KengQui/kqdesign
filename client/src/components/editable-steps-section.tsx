import { EditableStepCard } from "@/components/editable-step-card";
import type { Step } from "@shared/schema";

interface EditableStepsSectionProps {
  steps: Step[];
  isEditMode: boolean;
  onEditStep: (step: Step) => void;
}

export function EditableStepsSection({ steps, isEditMode, onEditStep }: EditableStepsSectionProps) {
  const sortedSteps = [...steps].sort((a, b) => a.stepNumber - b.stepNumber);

  if (sortedSteps.length === 0) {
    return (
      <section className="py-16 md:py-24 px-6 bg-muted/30">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6 tracking-tight">
            Design Process
          </h2>
          <p className="text-muted-foreground text-lg">
            {isEditMode 
              ? "Click 'Add Step' below to document your first design step." 
              : "No steps documented yet."}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 px-6 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold mb-16 text-center tracking-tight">
          Design Process
        </h2>

        <div className="space-y-16 md:space-y-24">
          {sortedSteps.map((step, index) => (
            <EditableStepCard 
              key={step.id} 
              step={step} 
              isEven={index % 2 === 1}
              isEditMode={isEditMode}
              onEdit={() => onEditStep(step)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
