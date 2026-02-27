import React from 'react';
import Sidebar from '../components/Sidebar';
import { Trash2, Archive, UserCheck } from 'lucide-react';

const AdminPanel = () => {
    const members = [
        { name: 'sarah_dev', role: 'Frontend', email: 'sarah@example.com' },
        { name: 'mike_j', role: 'Backend', email: 'mike@example.com' },
        { name: 'intern_tim', role: 'Intern', email: 'tim@example.com' }
    ];

    const rooms = [
        { name: 'react-explorers', owner: 'sarah_dev', privacy: 'workspace-wide' },
        { name: 'sys-ops', owner: 'mike_j', privacy: 'invite-only' }
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-bg-deep)' }}>
            <Sidebar joinedRooms={[]} />
            <main style={{ flex: 1, padding: '4rem 2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>Workspace Admin</h1>
                <section style={{ marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>Members</h2>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', color: 'var(--color-text-secondary)' }}>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Email</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map(m => (
                                <tr key={m.name} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                    <td style={{ padding: '8px 0' }}>{m.name}</td>
                                    <td>{m.role}</td>
                                    <td>{m.email}</td>
                                    <td><button style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer' }}><Trash2 size={16} /></button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
                {/* AI stack context */}
                <section style={{ marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>AI Stack Context</h2>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>Define the languages and tools your company uses.</p>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {['Node.js','Redis','AWS','PostgreSQL'].map(tag => (
                            <div key={tag} style={{ padding: '4px 10px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-border)', fontSize: '0.8rem' }}>{tag}</div>
                        ))}
                        <button style={{ background: 'none', border: 'none', color: 'var(--color-accent)', fontSize: '0.8rem', cursor: 'pointer' }}>+ Add</button>
                    </div>
                </section>
                <section>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>Rooms</h2>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', color: 'var(--color-text-secondary)' }}>
                                <th>Name</th>
                                <th>Owner</th>
                                <th>Privacy</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {rooms.map(r => (
                                <tr key={r.name} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                    <td style={{ padding: '8px 0' }}>{r.name}</td>
                                    <td>{r.owner}</td>
                                    <td>{r.privacy}</td>
                                    <td><button style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer' }}><Archive size={16} /></button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
};

export default AdminPanel;
