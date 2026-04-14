import { 
  type User, type InsertUser,
  type CaseStudy, type InsertCaseStudy,
  type Step, type InsertStep,
  type Insight, type InsertInsight,
  type Note, type InsertNote,
  users, caseStudies, steps, insights, notes
} from "@shared/schema";
import { db } from "./db";
import { eq, asc, desc } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Case Studies
  getCaseStudies(): Promise<CaseStudy[]>;
  getCaseStudy(id: string): Promise<CaseStudy | undefined>;
  createCaseStudy(data: InsertCaseStudy): Promise<CaseStudy>;
  updateCaseStudy(id: string, data: Partial<CaseStudy>): Promise<CaseStudy | undefined>;
  deleteCaseStudy(id: string): Promise<boolean>;
  
  // Steps
  getStepsByCaseStudy(caseStudyId: string): Promise<Step[]>;
  getStep(id: string): Promise<Step | undefined>;
  createStep(step: InsertStep): Promise<Step>;
  updateStep(id: string, data: Partial<Step>): Promise<Step | undefined>;
  deleteStep(id: string): Promise<boolean>;
  
  // Insights
  getInsightsByCaseStudy(caseStudyId: string): Promise<Insight[]>;
  getInsight(id: string): Promise<Insight | undefined>;
  createInsight(insight: InsertInsight): Promise<Insight>;
  updateInsight(id: string, data: Partial<Insight>): Promise<Insight | undefined>;
  deleteInsight(id: string): Promise<boolean>;
  
  // Notes
  getNotesByCaseStudy(caseStudyId: string): Promise<Note[]>;
  getAllNotes(): Promise<Note[]>;
  getNote(id: string): Promise<Note | undefined>;
  createNote(note: InsertNote): Promise<Note>;
  updateNote(id: string, data: Partial<Note>): Promise<Note | undefined>;
  deleteNote(id: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Case Study methods
  async getCaseStudies(): Promise<CaseStudy[]> {
    return db.select().from(caseStudies);
  }

  async getCaseStudy(id: string): Promise<CaseStudy | undefined> {
    const [caseStudy] = await db.select().from(caseStudies).where(eq(caseStudies.id, id));
    return caseStudy;
  }

  async createCaseStudy(data: InsertCaseStudy): Promise<CaseStudy> {
    const [created] = await db.insert(caseStudies).values(data).returning();
    return created;
  }

  async updateCaseStudy(id: string, data: Partial<CaseStudy>): Promise<CaseStudy | undefined> {
    const [updated] = await db
      .update(caseStudies)
      .set(data)
      .where(eq(caseStudies.id, id))
      .returning();
    return updated;
  }

  async deleteCaseStudy(id: string): Promise<boolean> {
    // Delete related data first
    await db.delete(steps).where(eq(steps.caseStudyId, id));
    await db.delete(insights).where(eq(insights.caseStudyId, id));
    await db.delete(notes).where(eq(notes.caseStudyId, id));
    // Delete the case study
    const result = await db.delete(caseStudies).where(eq(caseStudies.id, id)).returning();
    return result.length > 0;
  }

  // Steps methods
  async getStepsByCaseStudy(caseStudyId: string): Promise<Step[]> {
    return db.select().from(steps).where(eq(steps.caseStudyId, caseStudyId)).orderBy(asc(steps.stepNumber));
  }

  async getStep(id: string): Promise<Step | undefined> {
    const [step] = await db.select().from(steps).where(eq(steps.id, id));
    return step;
  }

  async createStep(insertStep: InsertStep): Promise<Step> {
    const [step] = await db.insert(steps).values(insertStep).returning();
    return step;
  }

  async updateStep(id: string, data: Partial<Step>): Promise<Step | undefined> {
    const [updated] = await db
      .update(steps)
      .set(data)
      .where(eq(steps.id, id))
      .returning();
    return updated;
  }

  async deleteStep(id: string): Promise<boolean> {
    const result = await db.delete(steps).where(eq(steps.id, id)).returning();
    return result.length > 0;
  }

  // Insights methods
  async getInsightsByCaseStudy(caseStudyId: string): Promise<Insight[]> {
    return db.select().from(insights).where(eq(insights.caseStudyId, caseStudyId));
  }

  async getInsight(id: string): Promise<Insight | undefined> {
    const [insight] = await db.select().from(insights).where(eq(insights.id, id));
    return insight;
  }

  async createInsight(insertInsight: InsertInsight): Promise<Insight> {
    const [insight] = await db.insert(insights).values(insertInsight).returning();
    return insight;
  }

  async updateInsight(id: string, data: Partial<Insight>): Promise<Insight | undefined> {
    const [updated] = await db
      .update(insights)
      .set(data)
      .where(eq(insights.id, id))
      .returning();
    return updated;
  }

  async deleteInsight(id: string): Promise<boolean> {
    const result = await db.delete(insights).where(eq(insights.id, id)).returning();
    return result.length > 0;
  }

  // Notes methods
  async getNotesByCaseStudy(caseStudyId: string): Promise<Note[]> {
    return db.select().from(notes).where(eq(notes.caseStudyId, caseStudyId)).orderBy(desc(notes.createdAt));
  }

  async getAllNotes(): Promise<Note[]> {
    return db.select().from(notes).orderBy(desc(notes.createdAt));
  }

  async getNote(id: string): Promise<Note | undefined> {
    const [note] = await db.select().from(notes).where(eq(notes.id, id));
    return note;
  }

  async createNote(insertNote: InsertNote): Promise<Note> {
    const noteWithTimestamp = {
      ...insertNote,
      createdAt: new Date().toISOString(),
    };
    const [note] = await db.insert(notes).values(noteWithTimestamp).returning();
    return note;
  }

  async updateNote(id: string, data: Partial<Note>): Promise<Note | undefined> {
    const [updated] = await db
      .update(notes)
      .set(data)
      .where(eq(notes.id, id))
      .returning();
    return updated;
  }

  async deleteNote(id: string): Promise<boolean> {
    const result = await db.delete(notes).where(eq(notes.id, id)).returning();
    return result.length > 0;
  }
}

export const storage = new DatabaseStorage();
