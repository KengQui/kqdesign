# AI App Creation Case Study Portfolio

## Overview

This is a design portfolio application for showcasing AI app creation case studies. It presents a narrative-driven experience that documents both the final AI application and the design process behind it. The app follows a clean, minimalist design approach inspired by Linear, Notion, and Behance, featuring a hero section, project overview, step-by-step process documentation, and key insights.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript, using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state and caching
- **Styling**: Tailwind CSS with custom design tokens defined in CSS variables
- **Component Library**: shadcn/ui components built on Radix UI primitives
- **Theme Support**: Light/dark mode with a custom ThemeProvider

### Backend Architecture
- **Runtime**: Node.js with Express 5
- **API Pattern**: RESTful endpoints under `/api/*` prefix
- **Development**: Vite dev server with HMR integration via middleware mode
- **Production**: Static file serving from built assets

### Data Storage
- **Schema Definition**: Drizzle ORM with PostgreSQL dialect
- **Database**: PostgreSQL with DatabaseStorage class for persistent data across deployments
- **Connection**: `server/db.ts` configures pg Pool using DATABASE_URL environment variable
- **Tables**: case_studies, steps, insights, notes, users defined in `shared/schema.ts`
- **Validation**: Zod schemas generated from Drizzle schemas using drizzle-zod
- **Seed Script**: `server/seed.ts` for initial data population (run with `npx tsx server/seed.ts`)

### Key Design Patterns
- **Shared Types**: Schema definitions in `shared/` directory accessible to both client and server
- **Path Aliases**: `@/` maps to client source, `@shared/` maps to shared code
- **Edit Mode**: Toggle between preview and edit modes with inline editing dialogs
- **Component Composition**: Editable wrapper components that add edit functionality to base display components
- **Multi-Case-Study Support**: The app supports multiple case studies, each with their own steps, insights, and notes

### Routes
- `/` - Portfolio listing page showing all case studies as cards
- `/case-study/:id` - Individual case study detail page with steps and insights
- `/notes` - Notes page for documenting process across all case studies

### API Endpoints
- `GET /api/case-studies` - List all case studies
- `POST /api/case-studies` - Create new case study
- `GET /api/case-studies/:id` - Get single case study by ID
- `PUT /api/case-studies/:id` - Update case study
- `DELETE /api/case-studies/:id` - Delete case study (cascades to related steps/insights/notes)
- `GET /api/case-studies/:id/steps` - Get steps for a case study
- `GET /api/case-studies/:id/insights` - Get insights for a case study
- `GET /api/case-studies/:id/notes` - Get notes for a case study
- `GET /api/notes` - Get all notes across all case studies
- CRUD endpoints for steps, insights, and notes

### Build System
- **Client**: Vite builds to `dist/public`
- **Server**: esbuild bundles server code with selective dependency bundling for faster cold starts
- **Scripts**: `dev` for development, `build` for production, `db:push` for schema migrations

## External Dependencies

### Database
- **PostgreSQL**: Required for production (configured via `DATABASE_URL` environment variable)
- **Drizzle Kit**: Used for schema migrations (`drizzle-kit push`)

### UI Components
- **Radix UI**: Full suite of accessible, unstyled primitives
- **Lucide React**: Icon library
- **Embla Carousel**: Carousel functionality
- **React Day Picker**: Calendar component
- **Vaul**: Drawer component

### Form Handling
- **React Hook Form**: Form state management
- **Zod**: Schema validation
- **@hookform/resolvers**: Zod resolver for React Hook Form

### Replit-Specific
- **@replit/vite-plugin-runtime-error-modal**: Error overlay in development
- **@replit/vite-plugin-cartographer**: Development tooling (dev only)
- **@replit/vite-plugin-dev-banner**: Development banner (dev only)