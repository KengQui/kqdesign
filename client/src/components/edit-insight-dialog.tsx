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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Insight } from "@shared/schema";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  category: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const categories = [
  "Design Decision",
  "Technical Learning",
  "User Research",
  "Process Improvement",
];

interface EditInsightDialogProps {
  insight?: Insight;
  caseStudyId: string;
  onSave: (data: FormValues & { caseStudyId: string }) => void;
  onDelete?: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditInsightDialog({ 
  insight, 
  caseStudyId,
  onSave, 
  onDelete,
  open, 
  onOpenChange 
}: EditInsightDialogProps) {
  const isEditing = !!insight;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: insight?.title || "",
      description: insight?.description || "",
      category: insight?.category || "Design Decision",
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
          <DialogTitle>{isEditing ? "Edit Insight" : "Add New Insight"}</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-insight-category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., Wizard patterns reduce cognitive load" 
                      {...field} 
                      data-testid="input-insight-title"
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
                      placeholder="Explain this insight in detail..."
                      className="min-h-[150px]"
                      {...field} 
                      data-testid="input-insight-description"
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
                    data-testid="button-delete-insight"
                  >
                    Delete Insight
                  </Button>
                )}
              </div>
              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button type="submit" data-testid="button-save-insight">
                  {isEditing ? "Save Changes" : "Add Insight"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
