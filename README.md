# Task Management System

A modern, professional task management application built with Next.js 16+, TypeScript, MongoDB, and shadcn/ui.

## Features

- ✨ Modern and professional UI with shadcn/ui components
- 🎬 Smooth animations with Framer Motion
- 🌓 Dark/Light theme support with smooth transitions
- 📝 Create, read, update, and delete tasks
- 🔍 Search and filter tasks
- ✅ Mark tasks as completed/pending
- 📅 Set due dates for tasks
- 🎨 Beautiful gradient backgrounds and animations
- 💫 Engaging micro-interactions and hover effects
- 📱 Fully responsive design
- 🔐 Authentication UI (Login & Register pages)

## Tech Stack

- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript
- **Database**: MongoDB Atlas
- **UI Library**: shadcn/ui with Radix UI
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Theme**: next-themes

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open Browser
Visit [http://localhost:3000](http://localhost:3000)

## Available Pages

- `/` - Landing page with features overview
- `/login` - Login page (UI ready)
- `/register` - Register page with validation (UI ready)
- `/dashboard` - Main dashboard with task management
- `/api/health` - MongoDB connection test

## MongoDB Connection

Your MongoDB Atlas connection is configured in `.env.local`:
```
MONGODB_URI=mongodb+srv://taskDB:Efjh8yxN71uakzda@fureverlydb.o2jukph.mongodb.net/?appName=fureverlyDB
```

Test connection: [http://localhost:3000/api/health](http://localhost:3000/api/health)

## Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/          # Login page
│   │   └── register/       # Register page
│   ├── api/
│   │   └── health/         # MongoDB health check
│   ├── dashboard/          # Dashboard page
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── navbar.tsx          # Navigation bar
│   ├── task-card.tsx       # Task card component
│   ├── task-form.tsx       # Task form dialog
│   ├── task-filter.tsx     # Task filter buttons
│   ├── search-bar.tsx      # Search input
│   └── providers.tsx       # Theme & Toast providers
├── lib/
│   ├── mongodb.ts          # MongoDB connection
│   ├── db.ts               # Database helpers
│   └── utils.ts            # Utility functions
└── types/
    └── index.ts            # TypeScript types
```

## Features in Detail

### Task Management (with Mock Data)
- Create new tasks with title, description, and due date
- Edit existing tasks
- Delete tasks with confirmation dialog
- Mark tasks as completed or pending
- View task creation date and due date
- Statistics dashboard showing total, pending, and completed tasks

### Filtering & Search
- Filter tasks by status (All, Pending, Completed)
- Search tasks by title or description
- Real-time filtering and search

### Theme Support
- Light and dark mode
- System theme detection
- Smooth theme transitions
- Persistent theme preference

## Color Palette

### Light Mode
- Primary: `#4F46E5` (Indigo)
- Background: `#F9FAFB`
- Card: `#FFFFFF`
- Text: `#111827`

### Dark Mode
- Primary: `#818CF8` (Light Indigo)
- Background: `#020617`
- Card: `#0F172A`
- Text: `#E5E7EB`

## Scripts

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type check
npm run type-check

# Lint
npm run lint
```

## Next Steps

The UI is fully functional with mock data. To complete the backend:

1. **Create API Routes**:
   - `/api/auth/register` - User registration
   - `/api/auth/login` - User login
   - `/api/tasks` - CRUD operations for tasks

2. **Implement Authentication**:
   - Hash passwords with bcrypt
   - Create JWT tokens or sessions
   - Add protected route middleware

3. **Connect Dashboard**:
   - Replace mock data with API calls
   - Add loading states
   - Implement error handling

## License

MIT
