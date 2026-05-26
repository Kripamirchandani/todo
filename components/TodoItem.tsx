
'use client';

import { useState } from 'react';
import { Todo } from '@/app/page';

interface ItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string, priority: 'High' | 'Medium' | 'Low') => void;
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: ItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editPriority, setEditPriority] = useState(todo.priority);

  const pColors = {
    High: 'var(--high)',
    Medium: 'var(--medium)',
    Low: 'var(--low)'
  };

  const handleSave = () => {
    if (!editText.trim()) return;
    onEdit(todo.id, editText, editPriority);
    setIsEditing(false);
  };

  const actionButtonStyle = {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.9rem',
    opacity: 0.7,
    transition: 'opacity 0.2s'
  };

  
  if (isEditing) {
    return (
      <div className="glass-panel" style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '4px solid var(--primary)' }}>
        <input 
          type="text" 
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          style={{ flex: 1, background: 'rgba(0,0,0,0.2)', border: '1px solid var(--card-border)', color: 'var(--foreground)', padding: '0.4rem 0.75rem', borderRadius: '8px', fontSize: '0.95rem', outline: 'none' }}
        />
        
        <select value={editPriority} onChange={(e) => setEditPriority(e.target.value as any)} style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid var(--card-border)', color: 'var(--foreground)', padding: '0.2rem 0.4rem', borderRadius: '6px', fontSize: '0.8rem', outline: 'none', cursor: 'pointer' }}>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={handleSave} style={{ ...actionButtonStyle, color: 'var(--low)', fontWeight: '600' }}>Save</button>
          <button onClick={() => setIsEditing(false)} style={{ ...actionButtonStyle, color: 'var(--muted-foreground)' }}>Cancel</button>
        </div>
      </div>
    );
  }

  // --- NORMAL TASK VIEW ---
  return (
    <div className="glass-panel animate-fade-in" style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', opacity: todo.completed ? 0.6 : 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
        <input 
          type="checkbox" 
          checked={todo.completed} 
          onChange={() => onToggle(todo.id)}
          style={{ width: '18px', height: '18px', accentColor: 'var(--primary)', cursor: 'pointer' }}
        />
        <span style={{ textDecoration: todo.completed ? 'line-through' : 'none', color: todo.completed ? 'var(--muted-foreground)' : 'var(--foreground)', fontSize: '1rem', transition: 'all 0.2s' }}>
          {todo.text}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: '700', color: pColors[todo.priority], border: `1px solid ${pColors[todo.priority]}`, padding: '0.2rem 0.5rem', borderRadius: '6px' }}>
          {todo.priority}
        </span>
        
        <div style={{ display: 'flex', gap: '0.75rem', marginLeft: '0.5rem', borderLeft: '1px solid var(--card-border)', paddingLeft: '0.75rem' }}>
          <button onClick={() => setIsEditing(true)} style={{ ...actionButtonStyle, color: 'var(--primary)' }}>✏️</button>
          <button onClick={() => onDelete(todo.id)} style={{ ...actionButtonStyle, color: '#ff4444', fontSize: '1.1rem' }}>✕</button>
        </div>
      </div>
    </div>
  );
}