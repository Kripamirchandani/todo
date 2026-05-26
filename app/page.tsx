'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import SidebarFilters from '@/components/SidebarFilters';
import TodoStats from '@/components/TodoStats';
import TodoInput from '@/components/TodoInput';
import TodoItem from '@/components/TodoItem';

export interface Todo {
  id: string; 
  _id?: string; 
  text: string;
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [loading, setLoading] = useState<boolean>(true);

  // 1. BACKEND DATA LOAD (Axios GET Request)
  useEffect(() => {
    async function loadTodos() {
      try {
        const response = await axios.get<Todo[]>('/api/task');
        if (response.status === 200) {
          setTodos(response.data);
        }
      } catch (err: any) {
        console.error("Error loading tasks via Axios operation stack:", err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    }
    loadTodos();
  }, []);

  // 2. CREATE NEW TASK (Axios POST Request)
  const addTodo = async (text: string, priority: 'High' | 'Medium' | 'Low') => {
    try {
      const response = await axios.post<Todo>('/api/task', { text, priority });
      if (response.status === 201 || response.status === 200) {
        setTodos((prevTodos) => [response.data, ...prevTodos]);
      }
    } catch (err: any) {
      console.error("Error creating task entry:", err.response?.data?.error || err.message);
    }
  };

  
  const toggleTodo = async (id: string) => {
    const targetTodo = todos.find(todo => (todo.id || todo._id) === id);
    if (!targetTodo) return;

    try {
      const response = await axios.put(`/api/task`, {
        id,
        completed: !targetTodo.completed
      });

      if (response.status === 200) {
        setTodos(prevTodos =>
          prevTodos.map(todo =>
            (todo.id || todo._id) === id ? { ...todo, completed: !todo.completed } : todo
          )
        );
      }
    } catch (err: any) {
      console.error("Fulfillment transaction interrupted during state patch:", err.response?.data?.error || err.message);
    }
  };

  
  const deleteTodo = async (id: string) => {
    try {
      
      const response = await axios.delete(`/api/task?id=${id}`);
      if (response.status === 200) {
        setTodos(prevTodos => prevTodos.filter(todo => (todo.id || todo._id) !== id));
      }
    } catch (err: any) {
      console.error("Pipeline breakdown tracking state execution deletions:", err.response?.data?.error || err.message);
    }
  };

  
  const editTodo = async (id: string, newText: string, newPriority: 'High' | 'Medium' | 'Low') => {
    try {
      const response = await axios.put(`/api/task`, {
        id,
        text: newText,
        priority: newPriority
      });

      if (response.status === 200) {
        setTodos(prevTodos =>
          prevTodos.map(todo =>
            (todo.id || todo._id) === id ? { ...todo, text: newText, priority: newPriority } : todo
          )
        );
      }
    } catch (err: any) {
      console.error("Failed executing item modifications interface pipeline stack:", err.response?.data?.error || err.message);
    }
  };

  
  const filteredTodos = todos.filter(todo => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Completed') return todo.completed;
    return !todo.completed;
  });

  return (
    <main style={{ display: 'flex', minHeight: '100vh', padding: '2rem', gap: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Left Sidebar Links Shell Container Grid Area layout */}
      <div style={{ width: '260px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <SidebarFilters 
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
      </div>

      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <TodoStats todos={todos} />
        <TodoInput onAdd={addTodo} />
        
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
          {loading ? (
            <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', color: 'var(--primary)' }}>
              Loading dashboard tasks database telemetry...
            </div>
          ) : filteredTodos.length > 0 ? (
            filteredTodos.map(todo => (
              <TodoItem 
                key={todo.id || todo._id} 
                todo={todo} 
                onToggle={toggleTodo} 
                onDelete={deleteTodo} 
                onEdit={editTodo} 
              />
            ))
          ) : (
            <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', color: 'var(--muted-foreground)' }}>
              No platform tasks located inside active profile filter.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}