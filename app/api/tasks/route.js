import { NextResponse } from 'next/server';
import { connectDB } from '../../lib/db';

// Temporary In-Memory Database Array
let dummyTasksDatabase = [
  { id: '1', text: 'Review Next.js production architecture docs', priority: 'High', completed: false },
  { id: '2', text: 'Evening cardio session & meditation', priority: 'Medium', completed: true },
];

// 1. GET Method: Fetch tasks
export async function GET() {
  try {
    return NextResponse.json(dummyTasksDatabase, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch tasks', error: error.message }, { status: 500 });
  }
}

// 2. POST Method: Create task
export async function POST(request) {
  try {
    const body = await request.json();
    const { text, priority } = body;

    if (!text) {
      return NextResponse.json({ message: 'Task text is required' }, { status: 400 });
    }

    const newTask = {
      id: Date.now().toString(),
      text,
      priority: priority || 'Medium',
      completed: false
    };

    dummyTasksDatabase.unshift(newTask);
    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to create task', error: error.message }, { status: 500 });
  }
}

// 2. DELETE Method: Delete task
export async function DELETE(request) {
  try {
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { message: 'Task ID is required' }, 
        { status: 400 }
      );
    }

  
    const taskIndex = dummyTasksDatabase.findIndex(task => task.id === id);

    if (taskIndex === -1) {
      return NextResponse.json(
        { message: 'Task not found' }, 
        { status: 404 }
      );
    }

    
    dummyTasksDatabase.splice(taskIndex, 1);

    return NextResponse.json(
      { message: 'Task deleted successfully', id }, 
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to delete task', error: error.message }, 
      { status: 500 }
    );
  }
}

// 4.update task
export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, text, priority } = body;

    
    if (!id) {
      return NextResponse.json(
        { message: 'Task ID is required' }, 
        { status: 400 }
      );
    }

    
    const taskIndex = dummyTasksDatabase.findIndex(task => task.id === id);

    if (taskIndex === -1) {
      return NextResponse.json(
        { message: 'Task not found' }, 
        { status: 404 }
      );
    }

    
    dummyTasksDatabase[taskIndex] = {
      ...dummyTasksDatabase[taskIndex],
      text: text !== undefined ? text : dummyTasksDatabase[taskIndex].text,
      priority: priority !== undefined ? priority : dummyTasksDatabase[taskIndex].priority
    };

    return NextResponse.json(
      { message: 'Task updated successfully', task: dummyTasksDatabase[taskIndex] }, 
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to update task', error: error.message }, 
      { status: 500 }
    );
  }
}