import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import type { Step } from "@shared/schema";

const formSchema = z.object({
  stepNumber: z.coerce.number().min(1, "Step number is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  imageCaption: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface EditStepDialogProps {
  step?: Step;
  caseStudyId: string;
  nextStepNumber: number;
  onSave: (data: FormValues & { caseStudyId: string }) => void;
  onDelete?: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditStepDialog({ 
  step, 
  caseStudyId,
  nextStepNumber,
  onSave, 
  onDelete,
  open, 
  onOpenChange 
}: EditStepDialogProps) {
  const isEditing = !!step;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stepNumber: step?.stepNumber || nextStepNumber,
      title: step?.title || "",
      description: step?.description || "",
      imageUrl: step?.imageUrl || "",
      imageCaption: step?.imageCaption || "",
    },
  });

  const onSubmit = (data: FormValues) => {
    onSave({ ...data, caseStudyId });
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Step" : "Add New Step"}</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="stepNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Step Number</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min={1}
                      {...field} 
                      data-testid="input-step-number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Step Title</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., Wizard Flow Design" 
                      {...field} 
                      data-testid="input-step-title"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe what you did in this step..."
                      className="min-h-[150px]"
                      {...field} 
                      data-testid="input-step-description"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://example.com/screenshot.png" 
                      {...field} 
                      data-testid="input-step-image"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageCaption"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image Caption</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Caption for the image" 
                      {...field} 
                      data-testid="input-step-caption"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between">
              <div>
                {isEditing && onDelete && (
                  <Button 
                    type="button" 
                    variant="destructive" 
                    onClick={onDelete}
                    data-testid="button-delete-step"
                  >
                    Delete Step
                  </Button>
                )}
              </div>
              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button type="submit" data-testid="button-save-step">
                  {isEditing ? "Save Changes" : "Add Step"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
