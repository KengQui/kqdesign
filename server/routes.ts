import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertCaseStudySchema,
  insertStepSchema, 
  insertInsightSchema,
  insertNoteSchema,
  updateCaseStudySchema,
  updateStepSchema,
  updateInsightSchema,
  updateNoteSchema
} from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Case Studies endpoints
  app.get("/api/case-studies", async (req, res) => {
    try {
      const caseStudies = await storage.getCaseStudies();
      res.json(caseStudies);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch case studies" });
    }
  });

  app.get("/api/case-studies/:id", async (req, res) => {
    try {
      const caseStudy = await storage.getCaseStudy(req.params.id);
      if (!caseStudy) {
        return res.status(404).json({ error: "Case study not found" });
      }
      res.json(caseStudy);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch case study" });
    }
  });

  app.post("/api/case-studies", async (req, res) => {
    try {
      const parseResult = insertCaseStudySchema.safeParse(req.body);
      if (!parseResult.success) {
        return res.status(400).json({ error: parseResult.error.message });
      }
      const caseStudy = await storage.createCaseStudy(parseResult.data);
      res.status(201).json(caseStudy);
    } catch (error) {
      res.status(500).json({ error: "Failed to create case study" });
    }
  });

  app.patch("/api/case-studies/:id", async (req, res) => {
    try {
      const parseResult = updateCaseStudySchema.safeParse(req.body);
      if (!parseResult.success) {
        return res.status(400).json({ error: parseResult.error.message });
      }
      const updated = await storage.updateCaseStudy(req.params.id, parseResult.data);
      if (!updated) {
        return res.status(404).json({ error: "Case study not found" });
      }
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: "Failed to update case study" });
    }
  });

  app.delete("/api/case-studies/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteCaseStudy(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Case study not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete case study" });
    }
  });

  // Steps endpoints
  app.get("/api/case-studies/:caseStudyId/steps", async (req, res) => {
    try {
      const steps = await storage.getStepsByCaseStudy(req.params.caseStudyId);
      res.json(steps);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch steps" });
    }
  });

  app.get("/api/steps/:id", async (req, res) => {
    try {
      const step = await storage.getStep(req.params.id);
      if (!step) {
        return res.status(404).json({ error: "Step not found" });
      }
      res.json(step);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch step" });
    }
  });

  app.post("/api/steps", async (req, res) => {
    try {
      const parseResult = insertStepSchema.safeParse(req.body);
      if (!parseResult.success) {
        return res.status(400).json({ error: parseResult.error.message });
      }
      const step = await storage.createStep(parseResult.data);
      res.status(201).json(step);
    } catch (error) {
      res.status(500).json({ error: "Failed to create step" });
    }
  });

  app.patch("/api/steps/:id", async (req, res) => {
    try {
      const parseResult = updateStepSchema.safeParse(req.body);
      if (!parseResult.success) {
        return res.status(400).json({ error: parseResult.error.message });
      }
      const updated = await storage.updateStep(req.params.id, parseResult.data);
      if (!updated) {
        return res.status(404).json({ error: "Step not found" });
      }
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: "Failed to update step" });
    }
  });

  app.delete("/api/steps/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteStep(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Step not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete step" });
    }
  });

  // Insights endpoints
  app.get("/api/case-studies/:caseStudyId/insights", async (req, res) => {
    try {
      const insights = await storage.getInsightsByCaseStudy(req.params.caseStudyId);
      res.json(insights);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch insights" });
    }
  });

  app.get("/api/insights/:id", async (req, res) => {
    try {
      const insight = await storage.getInsight(req.params.id);
      if (!insight) {
        return res.status(404).json({ error: "Insight not found" });
      }
      res.json(insight);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch insight" });
    }
  });

  app.post("/api/insights", async (req, res) => {
    try {
      const parseResult = insertInsightSchema.safeParse(req.body);
      if (!parseResult.success) {
        return res.status(400).json({ error: parseResult.error.message });
      }
      const insight = await storage.createInsight(parseResult.data);
      res.status(201).json(insight);
    } catch (error) {
      res.status(500).json({ error: "Failed to create insight" });
    }
  });

  app.patch("/api/insights/:id", async (req, res) => {
    try {
      const parseResult = updateInsightSchema.safeParse(req.body);
      if (!parseResult.success) {
        return res.status(400).json({ error: parseResult.error.message });
      }
      const updated = await storage.updateInsight(req.params.id, parseResult.data);
      if (!updated) {
        return res.status(404).json({ error: "Insight not found" });
      }
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: "Failed to update insight" });
    }
  });

  app.delete("/api/insights/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteInsight(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Insight not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete insight" });
    }
  });

  // Notes endpoints
  app.get("/api/notes", async (req, res) => {
    try {
      const notes = await storage.getAllNotes();
      res.json(notes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch notes" });
    }
  });

  app.get("/api/case-studies/:caseStudyId/notes", async (req, res) => {
    try {
      const notes = await storage.getNotesByCaseStudy(req.params.caseStudyId);
      res.json(notes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch notes" });
    }
  });

  app.post("/api/notes", async (req, res) => {
    try {
      const parseResult = insertNoteSchema.safeParse(req.body);
      if (!parseResult.success) {
        return res.status(400).json({ error: parseResult.error.message });
      }
      const note = await storage.createNote(parseResult.data);
      res.status(201).json(note);
    } catch (error) {
      res.status(500).json({ error: "Failed to create note" });
    }
  });

  app.patch("/api/notes/:id", async (req, res) => {
    try {
      const parseResult = updateNoteSchema.safeParse(req.body);
      if (!parseResult.success) {
        return res.status(400).json({ error: parseResult.error.message });
      }
      const updated = await storage.updateNote(req.params.id, parseResult.data);
      if (!updated) {
        return res.status(404).json({ error: "Note not found" });
      }
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: "Failed to update note" });
    }
  });

  app.delete("/api/notes/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteNote(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Note not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete note" });
    }
  });

  return httpServer;
}
