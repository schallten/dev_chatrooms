import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import RoomCard from '../components/RoomCard';
import { useAuth } from '../contexts/AuthContext';
import { useRoom } from '../contexts/RoomContext';
import { Search, Bell, LogOut } from 'lucide-react';

const Dashboard = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { rooms, loading } = useRoom();
    const [searchQuery, setSearchQuery] = useState('');

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const filteredRooms = rooms.filter(room =>
        room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (room.topic && room.topic.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                fontSize: '1.2rem',
                color: 'var(--color-text-secondary)'
            }}>
                Loading rooms...
            </div>
        );
    }

    const joinedRooms = filteredRooms.slice(0, 3); // Show first 3 as "joined"

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-bg-deep)' }}>
            <Sidebar joinedRooms={joinedRooms} />

            <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Workspace Banner */}
                <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--color-bg-card)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', fontWeight: 700 }}>
                            {user?.name?.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                            <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{user?.name || 'User'}</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Workspace ID: {user?.workspace_id}</div>
                        </div>
                    </div>
                </div>

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
                            placeholder="Search rooms..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
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

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button
                            onClick={handleLogout}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '8px 16px',
                                borderRadius: '6px',
                                background: 'transparent',
                                border: '1px solid var(--color-border)',
                                color: 'var(--color-text-secondary)',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                fontWeight: 600
                            }}
                        >
                            <LogOut size={16} />
                            Logout
                        </button>
                    </div>
                </header>

                {/* Content Area */}
                <div style={{ padding: '2rem', flex: 1, overflowY: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
                        <div>
                            <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>Rooms Dashboard</h1>
                            <p style={{ color: 'var(--color-text-secondary)' }}>{filteredRooms.length} room{filteredRooms.length !== 1 ? 's' : ''} available</p>
                        </div>
                    </div>

                    {filteredRooms.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '6rem 0' }}>
                            <p style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)' }}>
                                {searchQuery ? 'No rooms match your search.' : 'No rooms available yet.'}
                            </p>
                        </div>
                    ) : (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                            gap: '1.5rem'
                        }}>
                            {filteredRooms.map(room => (
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
