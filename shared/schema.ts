import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Case Study - The main project being documented
export const caseStudies = pgTable("case_studies", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  heroImageUrl: text("hero_image_url"),
  challenge: text("challenge"),
  goal: text("goal"),
  outcome: text("outcome"),
  role: text("role"),
  timeline: text("timeline"),
  teamSize: text("team_size"),
});

export const insertCaseStudySchema = createInsertSchema(caseStudies).omit({ id: true });
export const updateCaseStudySchema = insertCaseStudySchema.partial();
export type InsertCaseStudy = z.infer<typeof insertCaseStudySchema>;
export type UpdateCaseStudy = z.infer<typeof updateCaseStudySchema>;
export type CaseStudy = typeof caseStudies.$inferSelect;

// Steps - Individual documentation steps
export const steps = pgTable("steps", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  caseStudyId: varchar("case_study_id").notNull(),
  stepNumber: integer("step_number").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
  imageCaption: text("image_caption"),
});

export const insertStepSchema = createInsertSchema(steps).omit({ id: true });
export const updateStepSchema = insertStepSchema.partial();
export type InsertStep = z.infer<typeof insertStepSchema>;
export type UpdateStep = z.infer<typeof updateStepSchema>;
export type Step = typeof steps.$inferSelect;

// Insights - Key learnings and takeaways
export const insights = pgTable("insights", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  caseStudyId: varchar("case_study_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  category: text("category"), // e.g., "Design Decision", "Technical Learning", "User Research"
});

export const insertInsightSchema = createInsertSchema(insights).omit({ id: true });
export const updateInsightSchema = insertInsightSchema.partial();
export type InsertInsight = z.infer<typeof insertInsightSchema>;
export type UpdateInsight = z.infer<typeof updateInsightSchema>;
export type Insight = typeof insights.$inferSelect;

// Notes - Raw scratchpad for recording process notes
export const notes = pgTable("notes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  caseStudyId: varchar("case_study_id").notNull(),
  content: text("content").notNull(),
  createdAt: text("created_at"),
});

export const insertNoteSchema = createInsertSchema(notes).omit({ id: true });
export const updateNoteSchema = insertNoteSchema.partial();
export type InsertNote = z.infer<typeof insertNoteSchema>;
export type UpdateNote = z.infer<typeof updateNoteSchema>;
export type Note = typeof notes.$inferSelect;

// Keep existing users table for compatibility
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
