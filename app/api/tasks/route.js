// app/api/todos/route.js
import { NextResponse } from 'next/server';

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