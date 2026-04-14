import { db } from "./db";
import { caseStudies, steps, insights, notes } from "@shared/schema";

const caseStudyData = {
  "id": "c5619e0b-7904-48fd-9b3e-d8658e9d1fe6",
  "title": "Agent Studio",
  "subtitle": "Empowering teams to build AI agents without writing prompts",
  "heroImageUrl": null,
  "challenge": "Teams without AI experience struggle to build and configure AI agents. They need to understand prompt engineering, error handling, and conversation management - skills that take months to develop.",
  "goal": "Create an intuitive platform that allows anyone to build production-ready AI agents by simply filling in forms, with built-in best practices for error management, turn management, and state management.",
  "outcome": "A wizard-driven configuration platform that reduced agent creation time from weeks to hours, enabling product teams to independently iterate on AI features.",
  "role": "Lead UX Designer",
  "timeline": "3 months",
  "teamSize": "5 people"
};

const stepsData = [
  {
    "caseStudyId": "c5619e0b-7904-48fd-9b3e-d8658e9d1fe6",
    "stepNumber": 1,
    "title": "Research & Discovery",
    "description": "Conducted user interviews with 12 product managers and developers to understand pain points with existing AI tooling. Key finding: 80% of time was spent on prompt engineering rather than solving business problems.",
    "imageUrl": null,
    "imageCaption": null,
    "id": "1b3fb074-7578-4ca4-9200-ebfdc2bcf78a"
  },
  {
    "caseStudyId": "c5619e0b-7904-48fd-9b3e-d8658e9d1fe6",
    "stepNumber": 2,
    "title": "Wizard Flow Design",
    "description": "Designed a 5-step wizard flow to guide users through agent configuration: Business Use Case → Description → Validation Rules → Guardrails → Review. Each step builds on the previous, reducing cognitive load.",
    "imageUrl": null,
    "imageCaption": null,
    "id": "210393f9-938d-4ac1-a6fc-083f244f02ef"
  },
  {
    "caseStudyId": "c5619e0b-7904-48fd-9b3e-d8658e9d1fe6",
    "stepNumber": 3,
    "title": "Best Practice Components",
    "description": "Built reusable components for error management, turn management, and state management. These are invisible to users but ensure their agents handle edge cases gracefully - like when the AI gets confused or users send unexpected inputs.",
    "imageUrl": null,
    "imageCaption": null,
    "id": "3946a330-7778-4f5b-9d32-3e3c2b365b64"
  },
  {
    "caseStudyId": "c5619e0b-7904-48fd-9b3e-d8658e9d1fe6",
    "stepNumber": 4,
    "title": "Agent Testing Interface",
    "description": "Created an integrated chat interface where users can immediately test their configured agents. Real-time feedback helps users iterate on their agent's behavior without leaving the platform.",
    "imageUrl": null,
    "imageCaption": null,
    "id": "cc599125-7e93-4c35-bf0e-0f35d5070da0"
  },
  {
    "caseStudyId": "c5619e0b-7904-48fd-9b3e-d8658e9d1fe6",
    "stepNumber": 99,
    "title": "Test Step for Persistence",
    "description": "This step tests file persistence",
    "imageUrl": "",
    "imageCaption": "",
    "id": "6ddd5aae-fd51-4a67-ae6e-1438ff11ae1d"
  }
];

const insightsData = [
  {
    "caseStudyId": "c5619e0b-7904-48fd-9b3e-d8658e9d1fe6",
    "title": "Wizard patterns dramatically reduce errors",
    "description": "By breaking the complex agent configuration into discrete steps, we reduced configuration errors by 73%. Users could focus on one decision at a time.",
    "category": "Design Decision",
    "id": "5049ac8a-a36a-42ea-a098-2258a3455351"
  },
  {
    "caseStudyId": "c5619e0b-7904-48fd-9b3e-d8658e9d1fe6",
    "title": "Hide complexity, not capability",
    "description": "The best practice components handle sophisticated AI patterns behind the scenes. Users don't need to understand turn management - they just get agents that work correctly.",
    "category": "Technical Learning",
    "id": "ca35bdfe-61f5-4d9f-b974-a9e873572175"
  },
  {
    "caseStudyId": "c5619e0b-7904-48fd-9b3e-d8658e9d1fe6",
    "title": "Immediate feedback accelerates learning",
    "description": "The integrated testing interface let users see their changes immediately. This tight feedback loop helped them understand cause and effect in agent behavior.",
    "category": "User Research",
    "id": "ce05c383-87f1-4e72-9e35-9e79e73da0bc"
  }
];

const notesData = [
  {
    "caseStudyId": "c5619e0b-7904-48fd-9b3e-d8658e9d1fe6",
    "content": "Today I designed the wizard flow for agent configuration",
    "id": "8000d6b2-f8ef-47a3-9053-85eb457e1093",
    "createdAt": "2026-01-27T18:50:22.821Z"
  },
  {
    "caseStudyId": "c5619e0b-7904-48fd-9b3e-d8658e9d1fe6",
    "content": "this is my initial prompt \nBuild an AI Agent Configuration Platform called \"Agent Studio\" with the following features:\nWizard Flow for Creating Agents (5 steps):\nBusiness Use Case - A text area where users define what problem the agent solves\nDescription - Input for agent name and a text area for the system prompt/personality\nValidation Rules - Optional text area for input/output validation rules\nGuardrails - Optional text area for safety boundaries and restrictions\nReview - Preview all configuration before creating the agent\nAgent Management:\nHome page showing a list of all created agents as cards\nEach agent card shows: name, status (draft/configured/active), business use case preview, and creation date\nButtons to open chat or edit settings for each agent\nSettings page to edit any agent configuration and delete agents\nChat Interface:\nChat page where users can test their configured agent\nMessage history with user and AI messages\nClear chat functionality\nThe AI should respond using the agent's configured description as the system prompt\nTechnical Requirements:\nUse in-memory storage\nSave agent configurations to YAML/markdown files in an /agents/{agent-id}/ folder structure\nSave chat history to JSON files\nModern UI with cards, progress indicators in the wizard, and responsive design\n",
    "id": "b76bbaec-152f-4b03-bdd8-229d7ef69542",
    "createdAt": "2026-01-27T18:59:23.191Z"
  },
  {
    "caseStudyId": "c5619e0b-7904-48fd-9b3e-d8658e9d1fe6",
    "content": " think I want to let the user see the difference between these three prompt engine principles, can we default use anthropic, but provide switcher for google gemini and Open AI? What do you think\n\nThat's a really smart idea! It would:\n\nEducate users - They see how different AI providers structure prompts\nGive flexibility - They can pick the style that resonates with them\nShow expertise - Demonstrates your platform understands prompt engineering\nHow it would work:\n\nOn the Review step, add a prompt style selector:\n\nAnthropic (Default) - XML tags, clear sections, role-first\nGoogle Gemini - Constraints at end, direct language, structured\nOpenAI - Examples-focused, explicit instructions, markdown\nThe user sees the prompt change as they switch styles, then picks their preferred format.\n\nExample difference:\n\nStyle\tStructure\nAnthropic\t<role>, <context>, <task>, <rules>\nGemini\tPurpose → Knowledge → Task → Constraints (at end)\nOpenAI\tRole + Instructions + Examples + Output Format\nI think this adds real value. ",
    "id": "0bbbb8c6-885e-471c-a7b6-d494c62956e4",
    "createdAt": "2026-01-27T22:17:38.020Z"
  },
  {
    "caseStudyId": "c5619e0b-7904-48fd-9b3e-d8658e9d1fe6",
    "content": "Summary of Your Work\nAI Model Selection Feature\n\nAdded the ability to choose which AI model generates content (validation rules, guardrails, system prompts)\nCreated a dropdown menu on \"Generate\" buttons with options: Gemini 2.5 Flash, 2.5 Pro (default), 3 Flash, and 3 Pro\nFixed API model names for compatibility (using gemini-3-flash-preview, gemini-3-pro-preview for Gemini 3 models)\nPrompt Review Improvements\n\nUpdated the prompt review screen to display which AI model was used for generation",
    "id": "cf92e511-33cd-4de7-b2db-85f18919a95e",
    "createdAt": "2026-01-27T23:57:12.102Z"
  },
  {
    "caseStudyId": "c5619e0b-7904-48fd-9b3e-d8658e9d1fe6",
    "content": "ummary of Your Work\n1. Sample Data Feature (Major Addition)\nAdded a new Sample Data step (Step 6) to the agent creation wizard\nUsers can now upload sample datasets (CSV, JSON, text files up to 5MB)\nAdded AI-powered sample data generation using Gemini",
    "id": "d6fdb203-e45a-4727-96ea-d4e00bb59b05",
    "createdAt": "2026-01-28T00:38:41.289Z"
  },
  {
    "caseStudyId": "c5619e0b-7904-48fd-9b3e-d8658e9d1fe6",
    "content": "Great idea! This will make the generation process much smarter. Here's what I'll build:\n\nHow it will work:\n\nWhen user clicks \"Generate\" for rules or guardrails, the AI first evaluates if there's enough context\nIf insufficient, instead of generating weak rules, it opens a chat dialog asking clarifying questions\nUser answers the questions conversationally\nOnce enough info is gathered, the AI generates quality rules/guardrails\nThe useful information from this Q&A gets saved and can be used in prompt generation\nExample flow:\n\nUser clicks \"Generate Rules\" with minimal business use case\nAI asks: \"What types of user inputs will this agent handle? Are there any specific data formats or restrictions?\"\nUser answers → AI asks follow-up if needed → AI generates comprehensive rules\nKey info from answers gets added to domain knowledge or stored separately for prompt use",
    "id": "6a989a43-1437-4da5-bd78-7e8fdb181d31",
    "createdAt": "2026-01-28T02:42:21.430Z"
  },
  {
    "caseStudyId": "c5619e0b-7904-48fd-9b3e-d8658e9d1fe6",
    "content": "Using this app, can help to track what wrong with the prompt\n\n Use ask\nwhat is the extra tax I have to pay as a result of my pay increase?\n\n\n\n\n\nbut instead of answering the question Chat bot replies\n10:02 PM\n\nDescribe your question or issue.\n\nANd we find out The problem is:\n\nYour question is actually answerable - the agent has your paycheck data showing tax withholdings for December 2025 vs January 2026\nExplaining the difference in tax withholding (factual data from your paychecks) is NOT tax advice - it's just reading the numbers\nBut the guardrails are too strict and causing the agent to freeze up and output garbage\nThe fix:\nI should update the agent's guardrails to clarify that explaining factual tax withholding differences from paycheck data is allowed - this is just reading numbers, not providing tax advice. The agent should be able to say \"Your federal tax withholding went from $X to $Y per paycheck.\"",
    "id": "ed23ce8c-8028-4227-9954-ebb232c9ff0d",
    "createdAt": "2026-01-29T03:08:58.535Z"
  },
  {
    "caseStudyId": "c5619e0b-7904-48fd-9b3e-d8658e9d1fe6",
    "content": "these are all the update done by my coworker, we collabrated\nContent to Revise\n1. Last Updated Date\nChange from January 28 to January 29, 2026\n2. Overview Section\nAdd authentication capability\nUpdate key capabilities list to include multi-session support\n3. Architecture → Project Structure\nAdd /data/users.json for user storage\nUpdate agent folder structure to show sessions/ subfolder\nAdd session-related files (sessions.json, session folders)\n4. API Reference\nAdd authentication endpoints (/api/auth/register, /api/auth/login, /api/auth/logout, /api/auth/me, /api/auth/reset-password)\nAdd session endpoints (/api/agents/:id/sessions, rename, delete)\nUpdate message endpoints to include sessionId\n5. Data Models Section\nAdd User schema\nAdd ChatSession schema\nUpdate ChatMessage to show sessionId field\nAdd tracing schemas\n6. Configuration Section\nAdd user storage location\nDocument session configuration options\n7. Version History\nAdd entry for January 29, 2026 covering authentication & sessions",
    "id": "dbf98eea-05f8-4341-8736-f270aa192782",
    "createdAt": "2026-01-29T03:37:31.943Z"
  },
  {
    "caseStudyId": "c5619e0b-7904-48fd-9b3e-d8658e9d1fe6",
    "content": "What We Built: Mock Mode for Testing Your AI Agents\nThink of this like a practice mode for your AI agents before they go live.\n\nThe Problem It Solves\nWhen you're building an AI agent (like a customer service bot), you want to test if it works correctly before connecting it to your real systems. For example, if your agent can \"add a dependent to an insurance policy,\" you don't want it actually changing real customer records while you're still testing.\n\nWhat Mock Mode Does\nIt lets your AI agent pretend to do things without actually doing them:\n\nFull Mock Mode (the default): The agent simulates everything. When a user asks to \"update my address,\" the agent acts like it did it and shows a success message, but nothing actually changes in your real systems.\n\nRead-Only Mock Mode: The agent can look at test data but can only pretend to make changes.\n\nDisabled: For when you're ready to connect to real systems.\n\nHow You Use It\nWhen creating or editing an agent, go to the \"Available Actions\" step\nChoose which mock mode you want\nAdd actions (things the agent can do) - either manually or let the AI generate them automatically from your policy documents\nTest your agent in the chat to see how it handles requests\nThis way, you can safely test realistic conversations without worrying about affecting real data or systems.",
    "id": "401b7d5c-f001-4830-b1bd-1c7e3770c2c5",
    "createdAt": "2026-01-29T21:49:54.228Z"
  }
];

async function seed() {
  console.log("Starting database seed...");
  
  try {
    // Check if data already exists
    const existingCaseStudy = await db.select().from(caseStudies);
    if (existingCaseStudy.length > 0) {
      console.log("Database already has data. Skipping seed.");
      return;
    }

    // Insert case study
    console.log("Inserting case study...");
    await db.insert(caseStudies).values(caseStudyData);
    
    // Insert steps
    console.log("Inserting steps...");
    for (const step of stepsData) {
      await db.insert(steps).values(step);
    }
    
    // Insert insights
    console.log("Inserting insights...");
    for (const insight of insightsData) {
      await db.insert(insights).values(insight);
    }
    
    // Insert notes
    console.log("Inserting notes...");
    for (const note of notesData) {
      await db.insert(notes).values(note);
    }
    
    console.log("Seed completed successfully!");
  } catch (error) {
    console.error("Seed error:", error);
    throw error;
  }
}

seed().then(() => process.exit(0)).catch(() => process.exit(1));
