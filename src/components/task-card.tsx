"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "./ui/card"
import { Button } from "./ui/button"
import { Checkbox } from "./ui/checkbox"
import { Edit, Trash2, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog"

interface Task {
  id: string
  title: string
  description?: string
  status: "pending" | "completed"
  createdAt: Date
  dueDate?: Date
}

interface TaskCardProps {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (taskId: string) => void
  onToggleStatus: (taskId: string, status: "pending" | "completed") => void
}

export function TaskCard({ task, onEdit, onDelete, onToggleStatus }: TaskCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const isCompleted = task.status === "completed"

  const handleDelete = () => {
    onDelete(task.id)
    setShowDeleteDialog(false)
  }

  return (
    <>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
      >
        <Card className={cn(
          "group hover:shadow-2xl transition-all duration-300 border-border/50 backdrop-blur-sm relative overflow-hidden",
          isCompleted && "opacity-75"
        )}>
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          {/* Status indicator */}
          <motion.div 
            className={cn(
              "absolute top-0 left-0 w-1 h-full transition-all",
              isCompleted ? "bg-green-500" : "bg-orange-500"
            )}
            initial={{ height: 0 }}
            animate={{ height: "100%" }}
            transition={{ duration: 0.3 }}
          />

          <CardContent className="pt-6 relative">
            <div className="flex items-start space-x-3">
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Checkbox
                  checked={isCompleted}
                  onCheckedChange={() => onToggleStatus(task.id, isCompleted ? "pending" : "completed")}
                  className="mt-1"
                />
              </motion.div>
              <div className="flex-1 space-y-2">
                <motion.h3 
                  className={cn(
                    "font-semibold text-lg leading-tight transition-all",
                    isCompleted && "line-through text-muted-foreground"
                  )}
                  layout
                >
                  {task.title}
                </motion.h3>
                {task.description && (
                  <motion.p 
                    className="text-sm text-muted-foreground line-clamp-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    {task.description}
                  </motion.p>
                )}
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Created {new Date(task.createdAt).toLocaleDateString()}
                  </motion.span>
                  {task.dueDate && (
                    <motion.span 
                      className="flex items-center"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Calendar className="w-3 h-3 mr-1" />
                      Due {new Date(task.dueDate).toLocaleDateString()}
                    </motion.span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0 pb-4 flex justify-end space-x-2 relative">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(task)}
                  className="h-8"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDeleteDialog(true)}
                  className="h-8 text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              </motion.div>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the task
              &quot;{task.title}&quot;.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
