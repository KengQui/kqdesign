import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, FileText, ChevronDown, ChevronUp } from "lucide-react";
import type { Note } from "@shared/schema";

interface NotesSectionProps {
  caseStudyId: string;
}

export function NotesSection({ caseStudyId }: NotesSectionProps) {
  const { toast } = useToast();
  const [newNote, setNewNote] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const { data: notes = [], isLoading } = useQuery<Note[]>({
    queryKey: ["/api/case-studies", caseStudyId, "notes"],
    queryFn: async () => {
      const res = await fetch(`/api/case-studies/${caseStudyId}/notes`);
      if (!res.ok) throw new Error("Failed to fetch notes");
      return res.json();
    },
  });

  const createNoteMutation = useMutation({
    mutationFn: async (content: string) => {
      return apiRequest("POST", "/api/notes", {
        caseStudyId,
        content,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/case-studies", caseStudyId, "notes"] });
      setNewNote("");
      toast({ title: "Note saved" });
    },
  });

  const deleteNoteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/notes/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/case-studies", caseStudyId, "notes"] });
      toast({ title: "Note deleted" });
    },
  });

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    createNoteMutation.mutate(newNote);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <section className="py-16 px-6 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between mb-6 group"
          data-testid="button-toggle-notes"
        >
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-xl font-semibold">Process Notes</h2>
            <span className="text-sm text-muted-foreground">({notes.length})</span>
          </div>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          )}
        </button>

        {isExpanded && (
          <div className="space-y-6">
            <Card className="p-4">
              <Textarea
                placeholder="Jot down what you did, decisions you made, problems you solved..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="min-h-[100px] mb-3 resize-none"
                data-testid="input-new-note"
              />
              <Button
                onClick={handleAddNote}
                disabled={!newNote.trim() || createNoteMutation.isPending}
                size="sm"
                data-testid="button-add-note"
              >
                <Plus className="h-4 w-4 mr-2" />
                Save Note
              </Button>
            </Card>

            {isLoading ? (
              <div className="text-center py-4 text-muted-foreground">
                Loading notes...
              </div>
            ) : notes.length === 0 ? (
              <Card className="p-6 text-center">
                <p className="text-muted-foreground text-sm">
                  No notes yet. Document your process as you work on this project.
                </p>
              </Card>
            ) : (
              <div className="space-y-3">
                {notes.map((note) => (
                  <Card
                    key={note.id}
                    className="p-4 group"
                    data-testid={`card-note-${note.id}`}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="whitespace-pre-wrap text-sm" data-testid={`text-note-content-${note.id}`}>
                          {note.content}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {formatDate(note.createdAt)}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                        onClick={() => deleteNoteMutation.mutate(note.id)}
                        data-testid={`button-delete-note-${note.id}`}
                      >
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            <Card className="p-4 bg-muted/50">
              <p className="text-sm text-muted-foreground">
                These notes are private to this project. Later, AI can help turn them into polished portfolio steps.
              </p>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
}
