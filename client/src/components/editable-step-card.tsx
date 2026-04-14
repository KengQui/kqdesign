import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import type { Step } from "@shared/schema";

interface EditableStepCardProps {
  step: Step;
  isEven: boolean;
  isEditMode: boolean;
  onEdit: () => void;
}

export function EditableStepCard({ step, isEven, isEditMode, onEdit }: EditableStepCardProps) {
  return (
    <div 
      className={`relative flex flex-col ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-12 items-center group`}
      data-testid={`step-card-${step.stepNumber}`}
    >
      {isEditMode && (
        <Button
          variant="secondary"
          size="icon"
          className="absolute -top-2 -right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity rounded-full shadow-md"
          onClick={onEdit}
          data-testid={`button-edit-step-${step.stepNumber}`}
        >
          <Pencil className="w-4 h-4" />
        </Button>
      )}

      <div className="flex-1 w-full">
        <div className="mb-4">
          <Badge 
            variant="outline" 
            className="text-base font-semibold px-4 py-1.5 border-primary text-primary"
          >
            Step {step.stepNumber}
          </Badge>
        </div>
        
        <h3 className="text-2xl md:text-3xl font-semibold mb-4 tracking-tight" data-testid={`text-step-title-${step.stepNumber}`}>
          {step.title}
        </h3>
        
        <p className="text-muted-foreground text-lg leading-relaxed max-w-prose" data-testid={`text-step-description-${step.stepNumber}`}>
          {step.description || "Add a description for this step..."}
        </p>
      </div>

      <div className="flex-1 w-full">
        {step.imageUrl ? (
          <Card className="overflow-hidden hover-elevate transition-all duration-300">
            <CardContent className="p-0">
              <img
                src={step.imageUrl}
                alt={step.imageCaption || step.title}
                className="w-full h-auto object-cover"
                data-testid={`img-step-${step.stepNumber}`}
              />
              {step.imageCaption && (
                <p className="text-sm text-muted-foreground p-4 text-center border-t">
                  {step.imageCaption}
                </p>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card className="aspect-video flex items-center justify-center bg-muted/50 border-dashed">
            <CardContent className="text-center text-muted-foreground">
              <p className="text-sm">Add an image URL to display a screenshot</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
