"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import { Loader2, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Task {
  id: string
  title: string
  description?: string
  status: "pending" | "completed"
  createdAt: Date
  dueDate?: Date
}

interface TaskFormProps {
  task?: Task
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: { title: string; description?: string; dueDate?: string }) => Promise<void>
}

export function TaskForm({ task, open, onOpenChange, onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState(task?.title || "")
  const [description, setDescription] = useState(task?.description || "")
  const [dueDate, setDueDate] = useState(
    task?.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ""
  )
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await onSubmit({
        title,
        description: description || undefined,
        dueDate: dueDate || undefined,
      })
      onOpenChange(false)
      setTitle("")
      setDescription("")
      setDueDate("")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <Sparkles className="w-5 h-5 text-primary" />
              </motion.div>
              <span>{task ? "Edit Task" : "Create New Task"}</span>
            </DialogTitle>
            <DialogDescription>
              {task ? "Update your task details below." : "Add a new task to your list."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <motion.div 
              className="space-y-4 py-4"
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              <motion.div 
                className="space-y-2"
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  show: { opacity: 1, x: 0 }
                }}
              >
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter task title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  disabled={isLoading}
                  className="transition-all focus:scale-[1.01]"
                />
              </motion.div>
              <motion.div 
                className="space-y-2"
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  show: { opacity: 1, x: 0 }
                }}
              >
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  placeholder="Enter task description (optional)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={isLoading}
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 transition-all focus:scale-[1.01]"
                />
              </motion.div>
              <motion.div 
                className="space-y-2"
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  show: { opacity: 1, x: 0 }
                }}
              >
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  disabled={isLoading}
                  className="transition-all focus:scale-[1.01]"
                />
              </motion.div>
            </motion.div>
            <DialogFooter>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button type="submit" disabled={isLoading}>
                  <AnimatePresence mode="wait">
                    {isLoading ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center"
                      >
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </motion.div>
                    ) : (
                      <motion.span
                        key="text"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {task ? "Update Task" : "Create Task"}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </DialogFooter>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
