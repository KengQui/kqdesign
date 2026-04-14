import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Sparkles, Code, Users, Zap } from "lucide-react";
import type { Insight } from "@shared/schema";

const categoryIcons: Record<string, typeof Sparkles> = {
  "Design Decision": Sparkles,
  "Technical Learning": Code,
  "User Research": Users,
  "Process Improvement": Zap,
};

const categoryColors: Record<string, string> = {
  "Design Decision": "bg-primary/10 text-primary",
  "Technical Learning": "bg-chart-2/10 text-chart-2",
  "User Research": "bg-chart-4/10 text-chart-4",
  "Process Improvement": "bg-chart-3/10 text-chart-3",
};

interface EditableInsightCardProps {
  insight: Insight;
  isEditMode: boolean;
  onEdit: () => void;
}

export function EditableInsightCard({ insight, isEditMode, onEdit }: EditableInsightCardProps) {
  const IconComponent = categoryIcons[insight.category || "Design Decision"] || Sparkles;
  const colorClass = categoryColors[insight.category || "Design Decision"] || "bg-primary/10 text-primary";

  return (
    <Card 
      className="relative hover-elevate transition-all duration-300 group"
      data-testid={`insight-card-${insight.id}`}
    >
      {isEditMode && (
        <Button
          variant="secondary"
          size="icon"
          className="absolute -top-2 -right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity rounded-full shadow-md"
          onClick={onEdit}
          data-testid={`button-edit-insight-${insight.id}`}
        >
          <Pencil className="w-4 h-4" />
        </Button>
      )}

      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <div className={`p-2.5 rounded-lg shrink-0 ${colorClass}`}>
            <IconComponent className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            {insight.category && (
              <Badge variant="outline" className="mb-2 text-xs">
                {insight.category}
              </Badge>
            )}
            <h4 className="font-semibold text-lg mb-2">{insight.title}</h4>
            <p className="text-muted-foreground leading-relaxed">
              {insight.description || "Add a description for this insight..."}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
