import { Button } from "@/components/ui/button";
import { ExternalLink, Mail, Linkedin } from "lucide-react";

interface FooterSectionProps {
  projectUrl?: string;
}

export function FooterSection({ projectUrl }: FooterSectionProps) {
  return (
    <footer className="py-16 md:py-24 px-6 bg-muted/30 border-t">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 tracking-tight">
          Interested in working together?
        </h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
          I'm currently seeking Principal Designer opportunities where I can lead product design initiatives and mentor growing teams.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          {projectUrl && (
            <Button size="lg" data-testid="button-view-project">
              <ExternalLink className="w-4 h-4 mr-2" />
              View Live Project
            </Button>
          )}
          <Button variant="outline" size="lg" data-testid="button-contact">
            <Mail className="w-4 h-4 mr-2" />
            Get in Touch
          </Button>
          <Button variant="outline" size="lg" data-testid="button-linkedin">
            <Linkedin className="w-4 h-4 mr-2" />
            LinkedIn
          </Button>
        </div>

        <div className="mt-16 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Case study created with care to demonstrate design thinking and process documentation.
          </p>
        </div>
      </div>
    </footer>
  );
}
