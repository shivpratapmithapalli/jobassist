# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

JobHive (also referred to as JobHive) is an AI-powered job application management platform built as a React TypeScript SPA. The application helps job seekers track applications, get AI-powered resume suggestions, and manage their career journey with a modern glassmorphism dark theme.

## Architecture

### Frontend Structure
The application is a single-page React app using:
- **React Router** for client-side routing with protected routes
- **Zustand** for state management with persistent storage
- **shadcn/ui** + **Radix UI** for component library
- **Framer Motion** for animations and transitions
- **TailwindCSS** for styling with custom glassmorphism theme

### Key Architectural Patterns

**State Management**: Centralized Zustand store (`src/store/useStore.ts`) managing:
- User authentication and profile data
- Job applications CRUD operations  
- Resume upload and AI suggestions
- Persistent storage using zustand/middleware

**Authentication Flow**: Mock authentication system with protected routes. Users are redirected based on auth state between landing page, login, and authenticated app sections.

**Component Architecture**: 
- Page-level components in `src/pages/` handle main views
- Shared layout wrapper (`src/components/Layout.tsx`) with navbar
- UI components in `src/components/ui/` following shadcn/ui patterns
- Custom `glass-card.tsx` component for consistent glassmorphism styling

**Data Flow**: Mock data patterns throughout with realistic samples in `src/data/mockData.ts`. No backend integration - all data lives in Zustand store with localStorage persistence.

## Common Development Commands

All commands should be run from the `frontend/` directory:

```bash
# Start development server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint
npm run lint
```

## Development Workflow

### Working with State
- All app state lives in `src/store/useStore.ts`
- Use Zustand patterns: destructure needed state and actions from `useStore()`
- State is automatically persisted to localStorage for user data and job applications

### Adding New Features
1. Define TypeScript interfaces in `src/types/index.ts`
2. Add state/actions to Zustand store if needed
3. Create page component in `src/pages/` or reusable component in `src/components/`
4. Add routes in `App.tsx` if creating new pages
5. Use existing UI components from `src/components/ui/` for consistency

### UI Development
- Follow existing glassmorphism design patterns using `glass-card` component
- Use Tailwind utility classes with established color palette:
  - Primary: Deep blue (#4F46E5)
  - Secondary: Teal (#14B8A6) 
  - Accent: Orange (#F97316)
- Implement responsive design with mobile-first approach
- Add smooth transitions using Framer Motion for consistency

### Authentication
- Mock authentication accepts any email/password combination
- Use `isAuthenticated` from store to protect routes
- User data is auto-generated on login (see `login` action in store)

### File Upload
- Resume upload uses `react-dropzone` in `ResumeSuggestionsPage`
- Mock AI suggestions are generated based on file upload
- File is stored in component state, not persisted

## Tech Stack Details

- **Vite** - Build tool and dev server
- **React 18+** with TypeScript
- **React Router 7** for routing
- **Zustand** for state management  
- **TailwindCSS** with custom dark theme
- **Framer Motion** for animations
- **shadcn/ui + Radix UI** for accessible components
- **React Dropzone** for file uploads
- **Lucide React** for icons
- **date-fns** for date utilities

## Project Structure Context

```
frontend/src/
├── components/
│   ├── ui/              # shadcn/ui components + custom glass-card
│   ├── Layout.tsx       # Main app layout wrapper  
│   └── Navbar.tsx       # Navigation component
├── pages/               # Route-level page components
├── store/useStore.ts    # Centralized Zustand store
├── types/index.ts       # TypeScript interface definitions
├── data/mockData.ts     # Sample data for development
└── lib/utils.ts         # Utility functions (cn helper, etc.)
```

The root directory contains only a minimal README, with the main application living entirely in the `frontend/` subdirectory.