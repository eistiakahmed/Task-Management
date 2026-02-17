"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { TaskCard } from "@/components/task-card"
import { TaskForm } from "@/components/task-form"
import { TaskFilter } from "@/components/task-filter"
import { SearchBar } from "@/components/search-bar"
import { Button } from "@/components/ui/button"
import { Plus, ListTodo, TrendingUp, CheckCircle2, Clock } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { motion, AnimatePresence } from "framer-motion"

interface Task {
  id: string
  title: string
  description?: string
  status: "pending" | "completed"
  createdAt: Date
  dueDate?: Date
}

// Mock data
const mockTasks: Task[] = [
  {
    id: "1",
    title: "Complete project documentation",
    description: "Write comprehensive documentation for the new feature",
    status: "pending",
    createdAt: new Date("2024-01-15"),
    dueDate: new Date("2024-02-01"),
  },
  {
    id: "2",
    title: "Review pull requests",
    description: "Review and merge pending pull requests from the team",
    status: "pending",
    createdAt: new Date("2024-01-16"),
  },
  {
    id: "3",
    title: "Update dependencies",
    description: "Update all npm packages to their latest versions",
    status: "completed",
    createdAt: new Date("2024-01-10"),
  },
  {
    id: "4",
    title: "Fix authentication bug",
    description: "Investigate and fix the login issue reported by users",
    status: "pending",
    createdAt: new Date("2024-01-17"),
    dueDate: new Date("2024-01-20"),
  },
  {
    id: "5",
    title: "Design new landing page",
    description: "Create mockups for the new landing page design",
    status: "completed",
    createdAt: new Date("2024-01-12"),
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks)
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | undefined>()
  const { toast } = useToast()

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === "all" || task.status === filter
    const matchesSearch =
      searchQuery === "" ||
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const handleCreateTask = async (data: { title: string; description?: string; dueDate?: string }) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: data.title,
      description: data.description,
      status: "pending",
      createdAt: new Date(),
      dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
    }
    setTasks([newTask, ...tasks])
    toast({
      title: "Task Created",
      description: "Your task has been created successfully.",
    })
  }

  const handleUpdateTask = async (data: { title: string; description?: string; dueDate?: string }) => {
    if (!editingTask) return
    
    setTasks(tasks.map((task) =>
      task.id === editingTask.id
        ? {
            ...task,
            title: data.title,
            description: data.description,
            dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
          }
        : task
    ))
    toast({
      title: "Task Updated",
      description: "Your task has been updated successfully.",
    })
    setEditingTask(undefined)
  }

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
    toast({
      title: "Task Deleted",
      description: "Your task has been deleted successfully.",
    })
  }

  const handleToggleStatus = (taskId: string, status: "pending" | "completed") => {
    setTasks(tasks.map((task) =>
      task.id === taskId ? { ...task, status } : task
    ))
    toast({
      title: status === "completed" ? "Task Completed" : "Task Reopened",
      description: status === "completed" 
        ? "Great job! Task marked as completed." 
        : "Task marked as pending.",
    })
  }

  const handleEdit = (task: Task) => {
    setEditingTask(task)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingTask(undefined)
  }

  const stats = {
    total: tasks.length,
    pending: tasks.filter((t) => t.status === "pending").length,
    completed: tasks.filter((t) => t.status === "completed").length,
  }

  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              My Tasks
            </h1>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <Button 
                onClick={() => setIsFormOpen(true)} 
                className="shadow-lg shadow-primary/25 group"
                size="lg"
              >
                <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
                New Task
              </Button>
            </motion.div>
          </div>
          <p className="text-muted-foreground">
            Manage and track your tasks efficiently
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          <motion.div variants={item} whileHover={{ y: -4, scale: 1.02 }}>
            <div className="bg-gradient-to-br from-card to-card/50 border border-border/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1 font-medium">Total Tasks</p>
                  <motion.p 
                    className="text-4xl font-bold"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                  >
                    {stats.total}
                  </motion.p>
                </div>
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <ListTodo className="w-12 h-12 text-primary/30" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={item} whileHover={{ y: -4, scale: 1.02 }}>
            <div className="bg-gradient-to-br from-orange-500/10 to-card border border-orange-500/20 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1 font-medium">Pending</p>
                  <motion.p 
                    className="text-4xl font-bold text-orange-500"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: "spring" }}
                  >
                    {stats.pending}
                  </motion.p>
                </div>
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Clock className="w-12 h-12 text-orange-500/30" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={item} whileHover={{ y: -4, scale: 1.02 }}>
            <div className="bg-gradient-to-br from-green-500/10 to-card border border-green-500/20 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1 font-medium">Completed</p>
                  <motion.p 
                    className="text-4xl font-bold text-green-500"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                  >
                    {stats.completed}
                  </motion.p>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <CheckCircle2 className="w-12 h-12 text-green-500/30" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={item} whileHover={{ y: -4, scale: 1.02 }}>
            <div className="bg-gradient-to-br from-blue-500/10 to-card border border-blue-500/20 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1 font-medium">Completion</p>
                  <motion.p 
                    className="text-4xl font-bold text-blue-500"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6, type: "spring" }}
                  >
                    {completionRate}%
                  </motion.p>
                </div>
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <TrendingUp className="w-12 h-12 text-blue-500/30" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 mb-6 bg-card/50 backdrop-blur-sm p-4 rounded-xl border border-border/50"
        >
          <div className="flex-1">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
          <TaskFilter currentFilter={filter} onFilterChange={setFilter} />
        </motion.div>

        {/* Tasks Grid */}
        <AnimatePresence mode="wait">
          {filteredTasks.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-20"
            >
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 mb-6"
              >
                <ListTodo className="w-12 h-12 text-primary" />
              </motion.div>
              <h3 className="text-2xl font-semibold mb-2">No tasks found</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                {searchQuery
                  ? "Try adjusting your search or filter to find what you're looking for"
                  : "Get started by creating your first task and boost your productivity"}
              </p>
              {!searchQuery && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button onClick={() => setIsFormOpen(true)} size="lg">
                    <Plus className="w-5 h-5 mr-2" />
                    Create Your First Task
                  </Button>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="tasks"
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  variants={item}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <TaskCard
                    task={task}
                    onEdit={handleEdit}
                    onDelete={handleDeleteTask}
                    onToggleStatus={handleToggleStatus}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <TaskForm
        task={editingTask}
        open={isFormOpen}
        onOpenChange={handleCloseForm}
        onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
      />
    </div>
  )
}
