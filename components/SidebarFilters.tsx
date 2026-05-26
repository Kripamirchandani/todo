
'use client';

interface SidebarProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

export default function SidebarFilters({ activeFilter, setActiveFilter }: SidebarProps) {
  const statusFilters = ['All', 'Active', 'Completed'];

  const buttonStyle = (isActive: boolean) => ({
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: '10px',
    background: isActive ? 'var(--primary)' : 'transparent',
    border: 'none',
    color: 'var(--foreground)',
    textAlign: 'left' as const,
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontWeight: isActive ? '600' : '400',
    opacity: isActive ? 1 : 0.7,
  });

  return (
    <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: '700', color: 'var(--primary)' }}>Workspace</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {statusFilters.map(filter => (
            <button 
              key={filter} 
              style={buttonStyle(activeFilter === filter)}
              onClick={() => setActiveFilter(filter)}
            >
              {filter} Tasks
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}