import type { Step } from "@shared/schema";

interface ProcessTimelineProps {
  steps: Step[];
}

export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  const sortedSteps = [...steps].sort((a, b) => a.stepNumber - b.stepNumber);

  if (sortedSteps.length === 0) return null;

  return (
    <section className="py-16 md:py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-center tracking-tight">
          Process Overview
        </h2>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-0.5" />

          <div className="space-y-8">
            {sortedSteps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div 
                  key={step.id}
                  className={`relative flex items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary border-4 border-background -translate-x-1.5 md:-translate-x-1.5 z-10" />

                  <div className={`ml-12 md:ml-0 md:w-1/2 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div 
                      className="p-4 rounded-lg bg-card border border-card-border hover-elevate transition-all duration-300"
                      data-testid={`timeline-step-${step.stepNumber}`}
                    >
                      <span className="text-sm font-medium text-primary">Step {step.stepNumber}</span>
                      <h4 className="font-semibold mt-1">{step.title}</h4>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
