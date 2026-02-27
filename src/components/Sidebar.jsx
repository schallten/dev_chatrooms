import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Terminal, LayoutDashboard, Search, PlusCircle, Settings, LogOut, MessageSquare } from 'lucide-react';

const Sidebar = ({ pinnedRooms = [], joinedRooms = [] }) => {
    return (
        <aside style={{
            width: '280px',
            backgroundColor: 'var(--color-bg-card)',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            borderTop: 'none',
            borderBottom: 'none',
            borderLeft: 'none',
            zIndex: 50
        }}>
            <div style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid var(--color-border)' }}>
                <div className="bg-gold" style={{ padding: '6px', borderRadius: '8px' }}>
                    <Terminal size={18} color="#0d1117" />
                </div>
                <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>DevRooms<span className="text-gold">.ai</span></span>
            </div>

            <nav style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ color: 'var(--color-text-muted)', fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', paddingLeft: '0.5rem', marginBottom: '0.5rem' }}>
                    Main Menu
                </div>

                <NavLink to="/dashboard" style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    backgroundColor: isActive ? 'rgba(240, 165, 0, 0.1)' : 'transparent',
                    color: isActive ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                    fontWeight: 500,
                    fontSize: '0.9rem'
                })}>
                    <LayoutDashboard size={18} /> Dashboard
                </NavLink>

                <button className="glow-hover-blue" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    color: 'var(--color-text-secondary)',
                    fontWeight: 500,
                    fontSize: '0.9rem',
                    width: '100%',
                    textAlign: 'left'
                }}>
                    <Search size={18} color="var(--color-accent-2)" /> Browse Rooms
                </button>

                {pinnedRooms.length > 0 && (
                    <>
                        <div style={{ color: 'var(--color-text-muted)', fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', paddingLeft: '0.5rem', marginBottom: '0.5rem' }}>
                            Pinned
                        </div>
                        {pinnedRooms.map(room => (
                            <NavLink key={room.id} to={`/room/${room.id}`} style={({ isActive }) => ({
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '10px 12px',
                                borderRadius: '8px',
                                backgroundColor: isActive ? 'rgba(88,166,255,0.1)' : 'transparent',
                                color: isActive ? 'var(--color-accent-2)' : 'var(--color-text-secondary)',
                                fontWeight: 500,
                                fontSize: '0.9rem'
                            })}>
                                <MessageSquare size={16} style={{ color: 'var(--color-accent-2)' }} /> {room.name}
                            </NavLink>
                        ))}
                        <div style={{ height: '1px', background: 'var(--color-border)', margin: '0.75rem 0' }}></div>
                    </>
                )}

                <div style={{ color: 'var(--color-text-muted)', fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', paddingLeft: '0.5rem', marginTop: pinnedRooms.length > 0 ? '0' : '1.5rem', marginBottom: '0.5rem' }}>
                    Joined Rooms
                </div>

                {joinedRooms.map(room => (
                    <NavLink key={room.id} to={`/room/${room.id}`} style={({ isActive }) => ({
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        backgroundColor: isActive ? 'rgba(255,255,255,0.05)' : 'transparent',
                        color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                        fontWeight: 500,
                        fontSize: '0.9rem'
                    })}>
                        <MessageSquare size={16} style={{ color: 'var(--color-accent)' }} /> {room.name}
                    </NavLink>
                ))}

                <NavLink to="/create-room" className="glow-hover" style={{
                    marginTop: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    color: 'var(--color-accent)',
                    background: 'rgba(240, 165, 0, 0.05)',
                    border: '1px dashed var(--color-accent)',
                    fontWeight: 500,
                    fontSize: '0.9rem',
                    width: '100%',
                    textAlign: 'left'
                }}>
                    <PlusCircle size={18} /> Create New Room
                </NavLink>
            </nav>

            <div style={{ padding: '1rem', borderTop: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <NavLink to="/profile" style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    color: 'var(--color-text-secondary)',
                    fontWeight: 500,
                    fontSize: '0.9rem'
                })}>
                    <Settings size={18} /> Settings
                </NavLink>
                <Link to="/" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    color: '#ff4444',
                    fontWeight: 500,
                    fontSize: '0.9rem'
                }}>
                    <LogOut size={18} /> Logout
                </Link>
            </div>
        </aside>
    );
};

export default Sidebar;
