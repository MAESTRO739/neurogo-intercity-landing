# Overview

This is a full-stack taxi/transportation service website for "NeuroGO" - a modern intercity ride and airport transfer service. The application is built as a single-page React application with a Node.js/Express backend, featuring a contemporary design with gradient styling and comprehensive service information including pricing, testimonials, and booking functionality.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Styling**: Tailwind CSS with custom design system featuring neuro-inspired color palette and gradients
- **UI Components**: Radix UI primitives with shadcn/ui components for consistent, accessible interface elements
- **State Management**: TanStack React Query for server state management
- **Routing**: React Router for client-side navigation
- **Form Handling**: React Hook Form with Zod validation schemas

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Development**: Custom Vite integration for SSR-style development with middleware support
- **Storage Interface**: Abstracted storage layer with in-memory implementation (MemStorage) and interface for future database integration
- **API Structure**: RESTful API design with /api prefix for all backend routes

## Database & ORM
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Database**: PostgreSQL (via Neon serverless)
- **Schema Management**: Drizzle migrations with shared schema definitions
- **Validation**: Zod schemas for runtime type checking and validation

## Design System
- **Color Scheme**: HSL-based color system with CSS custom properties
- **Brand Colors**: Deep violet primary (#7c3aed) and modern teal secondary (#006666)
- **Typography**: Custom gradient text effects and consistent font sizing
- **Components**: Comprehensive UI component library with variants for different use cases

## Development Environment
- **Build System**: Vite with React plugin and TypeScript support
- **Code Quality**: TypeScript strict mode with comprehensive type checking
- **Path Aliases**: Organized imports with @ for client, @shared for shared code
- **Hot Reload**: Vite HMR with custom error overlay for development

# External Dependencies

## Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **drizzle-orm**: Type-safe SQL query builder and ORM
- **@tanstack/react-query**: Server state management and caching
- **react-hook-form**: Form state management and validation
- **@hookform/resolvers**: Zod integration for form validation

## UI Framework
- **@radix-ui/react-***: Comprehensive set of accessible UI primitives including dialogs, dropdowns, form elements
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant handling for components
- **lucide-react**: Modern icon library

## Utility Libraries
- **zod**: Runtime type validation and schema definition
- **date-fns**: Date manipulation and formatting
- **clsx**: Conditional className utility
- **cmdk**: Command palette component

## Development Tools
- **vite**: Fast build tool and development server
- **typescript**: Type safety and developer experience
- **@replit/vite-plugin-runtime-error-modal**: Development error handling