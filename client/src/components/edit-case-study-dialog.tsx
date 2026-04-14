import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Settings } from "lucide-react";
import type { CaseStudy } from "@shared/schema";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().optional(),
  heroImageUrl: z.string().optional(),
  challenge: z.string().optional(),
  goal: z.string().optional(),
  outcome: z.string().optional(),
  role: z.string().optional(),
  timeline: z.string().optional(),
  teamSize: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface EditCaseStudyDialogProps {
  caseStudy: CaseStudy;
  onSave: (data: FormValues) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditCaseStudyDialog({ 
  caseStudy, 
  onSave, 
  open, 
  onOpenChange 
}: EditCaseStudyDialogProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: caseStudy.title || "",
      subtitle: caseStudy.subtitle || "",
      heroImageUrl: caseStudy.heroImageUrl || "",
      challenge: caseStudy.challenge || "",
      goal: caseStudy.goal || "",
      outcome: caseStudy.outcome || "",
      role: caseStudy.role || "",
      timeline: caseStudy.timeline || "",
      teamSize: caseStudy.teamSize || "",
    },
  });

  const onSubmit = (data: FormValues) => {
    onSave(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Case Study</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Agent Studio" {...field} data-testid="input-title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subtitle</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Empowering teams to build AI apps without writing prompts" 
                      {...field} 
                      data-testid="input-subtitle"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="heroImageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hero Image URL</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://example.com/hero-image.png" 
                      {...field} 
                      data-testid="input-hero-image"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Role</FormLabel>
                    <FormControl>
                      <Input placeholder="Lead UX Designer" {...field} data-testid="input-role" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="timeline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Timeline</FormLabel>
                    <FormControl>
                      <Input placeholder="3 months" {...field} data-testid="input-timeline" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="teamSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Team Size</FormLabel>
                    <FormControl>
                      <Input placeholder="5 people" {...field} data-testid="input-team-size" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="challenge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Challenge</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="What problem were you solving?" 
                      className="min-h-[100px]"
                      {...field} 
                      data-testid="input-challenge"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="goal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Goal</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="What did you aim to achieve?" 
                      className="min-h-[100px]"
                      {...field} 
                      data-testid="input-goal"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="outcome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Outcome</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="What were the results?" 
                      className="min-h-[100px]"
                      {...field} 
                      data-testid="input-outcome"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" data-testid="button-save-case-study">
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
