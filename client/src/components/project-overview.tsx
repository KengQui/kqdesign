import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Lightbulb, Trophy, User, Clock, Users } from "lucide-react";
import type { CaseStudy } from "@shared/schema";

interface ProjectOverviewProps {
  caseStudy: CaseStudy;
}

export function ProjectOverview({ caseStudy }: ProjectOverviewProps) {
  return (
    <section id="project-overview" className="py-16 md:py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          {caseStudy.role && (
            <Badge variant="secondary" className="text-sm px-4 py-1.5">
              <User className="w-3.5 h-3.5 mr-1.5" />
              {caseStudy.role}
            </Badge>
          )}
          {caseStudy.timeline && (
            <Badge variant="secondary" className="text-sm px-4 py-1.5">
              <Clock className="w-3.5 h-3.5 mr-1.5" />
              {caseStudy.timeline}
            </Badge>
          )}
          {caseStudy.teamSize && (
            <Badge variant="secondary" className="text-sm px-4 py-1.5">
              <Users className="w-3.5 h-3.5 mr-1.5" />
              {caseStudy.teamSize}
            </Badge>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="hover-elevate transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-destructive/10">
                  <Target className="w-5 h-5 text-destructive" />
                </div>
                <h3 className="font-semibold text-lg">Challenge</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed" data-testid="text-challenge">
                {caseStudy.challenge || "Define the problem you're solving..."}
              </p>
            </CardContent>
          </Card>

          <Card className="hover-elevate transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Lightbulb className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Goal</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed" data-testid="text-goal">
                {caseStudy.goal || "What you aimed to achieve..."}
              </p>
            </CardContent>
          </Card>

          <Card className="hover-elevate transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-chart-2/10">
                  <Trophy className="w-5 h-5 text-chart-2" />
                </div>
                <h3 className="font-semibold text-lg">Outcome</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed" data-testid="text-outcome">
                {caseStudy.outcome || "The results and impact..."}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
