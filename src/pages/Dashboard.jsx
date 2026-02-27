import React from 'react';
import Sidebar from '../components/Sidebar';
import { Link } from 'react-router-dom';
import RoomCard from '../components/RoomCard';
import { Search, Bell, User } from 'lucide-react';

const Dashboard = () => {
    const joinedRooms = [
        { id: '1', name: 'react-explorers', topic: 'React, Vite', members: 12, lastUser: 'dave_codes', lastMessage: 'Anyone know why my Vite build is failing?' },
        { id: '2', name: 'rust-beginners', topic: 'Rust', members: 45, lastUser: 'ferris_wheel', lastMessage: 'Ownership is finally clicking for me!' },
        { id: '3', name: 'python-ai-lab', topic: 'Python, ML', members: 89, lastUser: 'ml_guru', lastMessage: '@AI help me optimize this numpy broadcast' },
    ];

    const pinnedRooms = [
        { id: '3', name: 'python-ai-lab' }
    ];

    const publicRooms = [
        ...joinedRooms,
        { id: '4', name: 'typescript-gurus', topic: 'TypeScript', members: 156, lastUser: 'type_safe', lastMessage: 'I love mapped types.' },
        { id: '5', name: 'docker-masters', topic: 'DevOps', members: 32, lastUser: 'whale_container', lastMessage: 'Multi-stage builds are awesome.' },
        { id: '6', name: 'frontend-performance', topic: 'Performance', members: 21, lastUser: 'speed_demon', lastMessage: 'Lighthouse score 100!' },
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-bg-deep)' }}>
            <Sidebar joinedRooms={joinedRooms} pinnedRooms={pinnedRooms} />

            <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Top Header */}
                <header style={{
                    height: '64px',
                    borderBottom: '1px solid var(--color-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 2rem'
                }}>
                    <div style={{ position: 'relative', width: '300px' }}>
                        <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-accent-2)' }} />
                        <input
                            type="text"
                            placeholder="Search (⌘K) rooms or members..."
                            style={{
                                width: '100%',
                                padding: '8px 12px 8px 36px',
                                backgroundColor: 'rgba(255,255,255,0.03)',
                                border: '1px solid var(--color-border)',
                                borderRadius: '6px',
                                color: 'var(--color-text-primary)',
                                fontSize: '0.85rem',
                                outline: 'none'
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <button style={{ color: 'var(--color-text-secondary)', position: 'relative' }}>
                            <Bell size={20} />
                            <div style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', background: 'var(--color-accent)', borderRadius: '50%', border: '2px solid var(--color-bg-deep)' }}></div>
                        </button>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingLeft: '1.5rem', borderLeft: '1px solid var(--color-border)' }}>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Alex Rivers</div>
                                <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>Pro Developer</div>
                            </div>
                            <div style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                backgroundColor: 'var(--color-accent)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 700,
                                color: '#0d1117',
                                fontSize: '0.9rem'
                            }}>
                                AR
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <div style={{ padding: '2rem', flex: 1, overflowY: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
                        <div>
                            <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>Rooms Dashboard</h1>
                            <p style={{ color: 'var(--color-text-secondary)' }}>Welcome back! You have 3 active conversations today.</p>
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <button className="glow-hover-blue" style={{ padding: '8px 16px', borderRadius: '6px', fontSize: '0.9rem', fontWeight: 500 }}>All</button>
                            <button className="glow-hover-blue" style={{ padding: '8px 16px', borderRadius: '6px', fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>Favorites</button>
                            <button className="glow-hover-blue" style={{ padding: '8px 16px', borderRadius: '6px', fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>Official</button>
                        </div>
                    </div>

                    {joinedRooms.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '6rem 0' }}>
                            <p style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)' }}>You haven't joined any rooms yet.</p>
                            <Link to="/create-room" className="bg-gold glow-hover" style={{ padding: '12px 24px', borderRadius: '8px', fontWeight: 600, color: '#0d1117', fontSize: '0.95rem' }}>Create your first room</Link>
                        </div>
                    ) : (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                            gap: '1.5rem'
                        }}>
                            {publicRooms.map(room => (
                                <RoomCard key={room.id} room={room} />
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
