// components/TodoInput.tsx
'use client';

import { useState } from 'react';

export default function TodoInput({ onAdd }: { onAdd: (text: string, priority: 'High' | 'Medium' | 'Low') => void }) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text, priority);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <input 
        type="text" 
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new luxury execution metric..." 
        style={{ flex: 1, background: 'transparent', border: 'none', color: 'var(--foreground)', fontSize: '1rem', outline: 'none', padding: '0.5rem' }}
      />
      
      <select value={priority} onChange={(e) => setPriority(e.target.value as any)} style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--card-border)', color: 'var(--foreground)', padding: '0.5rem', borderRadius: '8px', outline: 'none', cursor: 'pointer' }}>
        <option value="High">🔴 High</option>
        <option value="Medium">🟡 Medium</option>
        <option value="Low">🟢 Low</option>
      </select>

      <button type="submit" style={{ background: 'var(--primary)', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', transition: 'transform 0.1s' }} onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'} onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}>
        Add Task
      </button>
    </form>
  );
}