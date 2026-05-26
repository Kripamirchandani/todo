
import { Todo } from '@/app/page';

export default function TodoStats({ todos }: { todos: Todo[] }) {
  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;

  return (
    <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <div>
        <p style={{ color: 'var(--muted-foreground)', fontSize: '0.85rem' }}>Total Tasks</p>
        <p style={{ fontSize: '1.75rem', fontWeight: '700', marginTop: '0.25rem' }}>{total}</p>
      </div>
      <div style={{ borderLeft: '1px solid var(--card-border)', paddingLeft: '2rem' }}>
        <p style={{ color: 'var(--muted-foreground)', fontSize: '0.85rem' }}>Completed</p>
        <p style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--low)', marginTop: '0.25rem' }}>{completed}</p>
      </div>
    </div>
  );
}