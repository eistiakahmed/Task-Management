import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('task_manager')
    
    // Test the connection
    await db.command({ ping: 1 })
    
    return NextResponse.json({ 
      success: true, 
      message: 'MongoDB connection successful',
      database: 'task_manager'
    })
  } catch (error) {
    console.error('MongoDB connection error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'MongoDB connection failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
