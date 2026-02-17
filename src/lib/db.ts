import { Db, ObjectId } from 'mongodb'
import clientPromise from './mongodb'

let cachedDb: Db | null = null

export async function getDatabase(): Promise<Db> {
  if (cachedDb) {
    return cachedDb
  }

  const client = await clientPromise
  const db = client.db('task_manager')
  cachedDb = db
  
  return db
}

// User collection helpers
export async function getUsersCollection() {
  const db = await getDatabase()
  return db.collection('users')
}

// Task collection helpers
export async function getTasksCollection() {
  const db = await getDatabase()
  return db.collection('tasks')
}

// Initialize indexes
export async function initializeIndexes() {
  try {
    const db = await getDatabase()
    
    // Users collection indexes
    await db.collection('users').createIndex({ email: 1 }, { unique: true })
    
    // Tasks collection indexes
    await db.collection('tasks').createIndex({ userId: 1 })
    await db.collection('tasks').createIndex({ status: 1 })
    await db.collection('tasks').createIndex({ createdAt: -1 })
    
    console.log('Database indexes initialized successfully')
  } catch (error) {
    console.error('Error initializing indexes:', error)
  }
}

// Helper to convert MongoDB _id to id
export function serializeDoc<T extends { _id?: ObjectId }>(doc: T): Omit<T, '_id'> & { id: string } {
  const { _id, ...rest } = doc
  return {
    ...rest,
    id: _id?.toString() || '',
  } as Omit<T, '_id'> & { id: string }
}
