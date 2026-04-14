import { EditableInsightCard } from "@/components/editable-insight-card";
import type { Insight } from "@shared/schema";

interface EditableInsightsSectionProps {
  insights: Insight[];
  isEditMode: boolean;
  onEditInsight: (insight: Insight) => void;
}

export function EditableInsightsSection({ insights, isEditMode, onEditInsight }: EditableInsightsSectionProps) {
  if (insights.length === 0) {
    return (
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6 tracking-tight">
            Key Insights
          </h2>
          <p className="text-muted-foreground text-lg">
            {isEditMode 
              ? "Click 'Add Insight' below to share your learnings." 
              : "No insights documented yet."}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-center tracking-tight">
          Key Insights
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {insights.map((insight) => (
            <EditableInsightCard
              key={insight.id}
              insight={insight}
              isEditMode={isEditMode}
              onEdit={() => onEditInsight(insight)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
