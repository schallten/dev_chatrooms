import React from 'react';
import { motion } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import { Hash, Globe, Lock, PlusCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CreateRoom = () => {
    const navigate = useNavigate();

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-bg-deep)' }}>
            <Sidebar joinedRooms={[]} />

            <main style={{ flex: 1, padding: '4rem 2rem', display: 'flex', justifyContent: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ width: '100%', maxWidth: '600px' }}
                >
                    <button
                        onClick={() => navigate(-1)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            color: 'var(--color-text-secondary)',
                            fontSize: '0.9rem',
                            marginBottom: '2rem',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        <ArrowLeft size={18} /> Back to Dashboard
                    </button>

                    <header style={{ marginBottom: '3rem' }}>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Create Workspace</h1>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem' }}>Deploy a new real-time room for your team or project.</p>
                    </header>

                    <div className="glass" style={{ padding: '2.5rem', borderRadius: '16px', boxShadow: 'var(--shadow-md)' }}>
                        <form style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>Room Name</label>
                                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                    <Hash size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                                    <input
                                        id="room-name-input"
                                        type="text"
                                        placeholder="e.g. system-architecture"
                                        style={{
                                            width: '100%',
                                            padding: '14px 14px 14px 44px',
                                            backgroundColor: 'rgba(0,0,0,0.3)',
                                            border: '1px solid var(--color-border)',
                                            borderRadius: '10px',
                                            color: 'var(--color-text-primary)',
                                            fontSize: '1rem',
                                            outline: 'none'
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const langs = ['react','rust','python','node','vite','backend','frontend','devops'];
                                            const adj = ['midnight','frozen','atomic','silent','neon','lunar'];
                                            const noun = ['lab','den','sandbox','workshop','hub'];
                                            const name = `${adj[Math.floor(Math.random()*adj.length)]}-${langs[Math.floor(Math.random()*langs.length)]}-${noun[Math.floor(Math.random()*noun.length)]}`;
                                            document.getElementById('room-name-input').value = name;
                                        }}
                                        style={{
                                            marginLeft: '8px',
                                            background: 'none',
                                            border: '1px solid var(--color-border)',
                                            borderRadius: '6px',
                                            padding: '8px',
                                            color: 'var(--color-text-secondary)',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        🎲
                                    </button>
                                </div>
                                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Lower case, no spaces, hyphens allowed.</span>
                            </div>

                            {/* Room templates */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>Room Template</label>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    {[
                                        {name:'Bug Hunt',desc:'AI always active'},
                                        {name:'Code Review',desc:'Structured threads'},
                                        {name:'Brainstorm',desc:'Freeform'}
                                    ].map(t => (
                                        <div key={t.name} className="glass" style={{ padding: '1rem', borderRadius: '10px', cursor: 'pointer', flex: 1 }}>
                                            <strong>{t.name}</strong>
                                            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{t.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>Topic / Tags</label>
                                <input
                                    type="text"
                                    placeholder="e.g. React, Docker, ML"
                                    style={{
                                        width: '100%',
                                        padding: '14px',
                                        backgroundColor: 'rgba(0,0,0,0.3)',
                                        border: '1px solid var(--color-border)',
                                        borderRadius: '10px',
                                        color: 'var(--color-text-primary)',
                                        fontSize: '1rem',
                                        outline: 'none'
                                    }}
                                />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>Visibility</label>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div style={{
                                        padding: '1.5rem',
                                        borderRadius: '12px',
                                        border: '1px solid var(--color-accent)',
                                        backgroundColor: 'rgba(240,165,0,0.05)',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '8px'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-accent)' }}>
                                            <Globe size={18} />
                                            <span style={{ fontSize: '1rem', fontWeight: 600 }}>Workspace-wide</span>
                                        </div>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', lineHeight: 1.4 }}>Visible to everyone in the workspace.</p>
                                    </div>

                                    <div style={{
                                        padding: '1.5rem',
                                        borderRadius: '12px',
                                        border: '1px solid var(--color-border)',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '8px'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-secondary)' }}>
                                            <Lock size={18} />
                                            <span style={{ fontSize: '1rem', fontWeight: 600 }}>Invite-only</span>
                                        </div>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', lineHeight: 1.4 }}>Requires an invite link; not shown to others by default.</p>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="button"
                                className="bg-gold glow-hover"
                                style={{
                                    width: '100%',
                                    padding: '16px',
                                    borderRadius: '10px',
                                    fontWeight: 700,
                                    fontSize: '1.1rem',
                                    color: '#0d1117',
                                    marginTop: '1.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '12px'
                                }}
                            >
                                <PlusCircle size={22} /> Initialize Workspace
                            </button>
                        </form>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

export default CreateRoom;
