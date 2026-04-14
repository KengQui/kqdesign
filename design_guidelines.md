# Design Guidelines: AI App Creation Case Study Portfolio

## Design Approach

**Reference-Based Strategy**: Drawing from Linear's clean minimalism + Notion's documentation clarity + Behance's portfolio presentation

**Core Principle**: Create a sophisticated, narrative-driven experience that showcases both the AI app AND your design process expertise.

## Typography System

**Primary Font**: Inter or 'SF Pro Display' via Google Fonts/system
- Hero/Headers: 48-64px, font-semibold to font-bold
- Section titles: 32-40px, font-semibold
- Step headers: 24-28px, font-medium
- Body text: 16-18px, font-normal
- Captions/metadata: 14px, font-normal

**Hierarchy**: Use letterspacing (tracking-tight for headers, tracking-normal for body)

## Layout System

**Spacing Units**: Tailwind units of 3, 4, 6, 8, 12, 16, 20, 24
- Section padding: py-20 to py-32 (desktop), py-12 to py-16 (mobile)
- Component gaps: gap-6 to gap-12
- Container max-width: max-w-6xl for content, max-w-7xl for wide sections

**Grid Structure**: 
- Single column narrative flow for main content (max-w-4xl)
- 2-column layouts for before/after comparisons, parallel workflows
- Asymmetric splits (60/40) for image + text pairings

## Core Components

### Hero Section (80vh)
- Large headline announcing the project
- Brief subtitle explaining the case study context
- Scroll indicator
- Background: Large hero image showing polished final AI app interface

### Project Overview Card
- Challenge/Goal/Outcome triptych layout
- Timeline and role badges
- Key metrics or impact statements

### Step Documentation Module (Repeating)
Each step features:
- Step number badge (large, prominent)
- Step title
- Description paragraph (max-w-prose)
- Supporting image/screenshot (full-width or contained)
- Optional annotations/callouts overlaid on images
- Micro-interactions: Images with subtle hover lift (translate-y-1)

### Process Timeline
- Vertical or horizontal timeline showing phases
- Milestone markers with dates
- Connecting lines between steps

### Image Showcase Grids
- Masonry or staggered grid for multiple screenshots
- Lightbox capability indicators
- Captions beneath each image

### Insights/Learnings Section
- Pull quotes or highlighted takeaways
- Bordered cards with key findings
- Icon markers for different insight types

### Next Steps/Footer
- Link to live project (if applicable)
- Related case studies
- Contact CTA

## Component Patterns

**Cards**: Rounded-xl borders, subtle shadows (shadow-sm to shadow-md), generous padding (p-6 to p-8)

**Buttons**: 
- Primary: px-6 py-3, rounded-lg, font-medium
- Secondary: Outline variant
- On images: Backdrop blur (backdrop-blur-md), semi-transparent background

**Badges**: px-3 py-1, rounded-full, text-sm, for categories/tags/roles

**Dividers**: Subtle horizontal rules between major sections

## Images Strategy

**Required Images**:
1. **Hero Image**: Polished screenshot of final AI app interface (full-width, subtle overlay for text readability)
2. **Step Screenshots**: 5-8 images documenting each phase of creation
3. **Workflow Diagrams**: Visual representations of process/architecture
4. **Before/After Comparisons**: Show iterations and improvements
5. **Detail Shots**: Close-ups of key features or design decisions

**Image Treatment**: Sharp, high-contrast screenshots with subtle shadows, consistent device frames (browser windows/mobile mockups)

## Animations

**Minimal & Purposeful**:
- Scroll-triggered fade-ins for step sections (opacity + translateY)
- Image parallax on hero (very subtle)
- Smooth transitions on hover states (transition-all duration-300)
- No continuous animations or distracting effects

## Accessibility

- High contrast text ratios throughout
- Focus states on all interactive elements
- Semantic HTML structure for screen readers
- Alt text for all process images with descriptive context