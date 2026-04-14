import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Code, Users, Zap } from "lucide-react";
import type { Insight } from "@shared/schema";

interface InsightsSectionProps {
  insights: Insight[];
}

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

export function InsightsSection({ insights }: InsightsSectionProps) {
  if (insights.length === 0) {
    return (
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6 tracking-tight">
            Key Insights
          </h2>
          <p className="text-muted-foreground text-lg">
            Add insights and learnings from your design process.
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
          {insights.map((insight) => {
            const IconComponent = categoryIcons[insight.category || "Design Decision"] || Sparkles;
            const colorClass = categoryColors[insight.category || "Design Decision"] || "bg-primary/10 text-primary";

            return (
              <Card 
                key={insight.id} 
                className="hover-elevate transition-all duration-300"
                data-testid={`insight-card-${insight.id}`}
              >
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
                        {insight.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
