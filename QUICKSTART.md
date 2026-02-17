# Quick Start Guide

## 🚀 Get Started in 2 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the App
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📱 Pages to Explore

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Landing page with features |
| Login | `/login` | Professional login form |
| Register | `/register` | Registration with validation |
| Dashboard | `/dashboard` | Task management interface |
| Health Check | `/api/health` | MongoDB connection test |

## 🎯 Try These Features

### On Dashboard (`/dashboard`)
- ✅ Click "New Task" to create a task
- ✅ Edit any task by clicking the edit button
- ✅ Delete tasks (with confirmation dialog)
- ✅ Check/uncheck to toggle task status
- ✅ Use the search bar to find tasks
- ✅ Click filter buttons (All/Pending/Completed)
- ✅ View statistics cards

### Theme Switching
- Click the sun/moon icon in the top right
- Theme preference is saved automatically
- Works on all pages

### Forms
- All forms have validation
- Try submitting invalid data to see error messages
- Toast notifications appear on successful actions

## 🔧 MongoDB Connection

Your MongoDB Atlas is already configured:
- Database: `taskmanager`
- Cluster: `fureverlyDB`

Test it: [http://localhost:3000/api/health](http://localhost:3000/api/health)

## 🎨 Current State

**Working:**
- ✅ All UI pages and components
- ✅ Dark/Light theme system
- ✅ Form validation
- ✅ Mock data for testing
- ✅ Search and filtering
- ✅ Toast notifications
- ✅ Responsive design
- ✅ MongoDB connection

**Needs Backend:**
- ⏳ API endpoints for auth and tasks
- ⏳ Real authentication
- ⏳ Database operations

## 💡 Tips

- Dashboard has 5 sample tasks to test with
- All changes work in memory (not saved to database yet)
- Theme persists in localStorage
- Fully responsive - try resizing your browser
- All forms have proper validation

That's it! Start exploring your task management system. 🎉
