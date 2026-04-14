import { ChevronDown } from "lucide-react";
import type { CaseStudy } from "@shared/schema";

interface HeroSectionProps {
  caseStudy: CaseStudy;
}

export function HeroSection({ caseStudy }: HeroSectionProps) {
  const scrollToContent = () => {
    const element = document.getElementById("project-overview");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[80vh] flex flex-col justify-center items-center overflow-hidden">
      {caseStudy.heroImageUrl && (
        <div className="absolute inset-0 z-0">
          <img
            src={caseStudy.heroImageUrl}
            alt="Hero background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>
      )}
      
      {!caseStudy.heroImageUrl && (
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/20 via-background to-accent/20" />
      )}

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h1 
          className={`text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 ${
            caseStudy.heroImageUrl ? "text-white" : "text-foreground"
          }`}
          data-testid="text-hero-title"
        >
          {caseStudy.title}
        </h1>
        
        {caseStudy.subtitle && (
          <p 
            className={`text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto ${
              caseStudy.heroImageUrl ? "text-white/90" : "text-muted-foreground"
            }`}
            data-testid="text-hero-subtitle"
          >
            {caseStudy.subtitle}
          </p>
        )}
      </div>

      <button
        onClick={scrollToContent}
        className={`absolute bottom-8 z-10 p-2 rounded-full transition-all duration-300 hover:translate-y-1 ${
          caseStudy.heroImageUrl 
            ? "text-white/80 hover:text-white" 
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="Scroll to content"
        data-testid="button-scroll-down"
      >
        <ChevronDown className="w-8 h-8 animate-bounce" />
      </button>
    </section>
  );
}
