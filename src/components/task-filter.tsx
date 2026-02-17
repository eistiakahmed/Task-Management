"use client"

import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

interface TaskFilterProps {
  currentFilter: "all" | "pending" | "completed"
  onFilterChange: (filter: "all" | "pending" | "completed") => void
}

export function TaskFilter({ currentFilter, onFilterChange }: TaskFilterProps) {
  return (
    <div className="flex items-center space-x-2">
      <Button
        variant={currentFilter === "all" ? "default" : "outline"}
        size="sm"
        onClick={() => onFilterChange("all")}
        className={cn(
          "transition-all",
          currentFilter === "all" && "shadow-md"
        )}
      >
        All
      </Button>
      <Button
        variant={currentFilter === "pending" ? "default" : "outline"}
        size="sm"
        onClick={() => onFilterChange("pending")}
        className={cn(
          "transition-all",
          currentFilter === "pending" && "shadow-md"
        )}
      >
        Pending
      </Button>
      <Button
        variant={currentFilter === "completed" ? "default" : "outline"}
        size="sm"
        onClick={() => onFilterChange("completed")}
        className={cn(
          "transition-all",
          currentFilter === "completed" && "shadow-md"
        )}
      >
        Completed
      </Button>
    </div>
  )
}
