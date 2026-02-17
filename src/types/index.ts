export interface User {
  id: string
  email: string
  name: string
  createdAt: Date
}

export interface Task {
  id: string
  title: string
  description?: string
  status: TaskStatus
  userId: string
  createdAt: Date
  dueDate?: Date
}

export enum TaskStatus {
  PENDING = "pending",
  COMPLETED = "completed"
}

export interface CreateTaskInput {
  title: string
  description?: string
  dueDate?: Date
}

export interface UpdateTaskInput {
  title?: string
  description?: string
  status?: TaskStatus
  dueDate?: Date
}

export interface TaskFilter {
  status?: TaskStatus
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}
