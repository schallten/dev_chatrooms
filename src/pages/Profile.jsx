import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { User, Mail, Bell, Shield, Code, Save, Camera } from 'lucide-react';

const Profile = () => {
    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-bg-deep)' }}>
            <Sidebar joinedRooms={[]} />

            <main style={{ flex: 1, padding: '4rem 2rem', display: 'flex', justifyContent: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ width: '100%', maxWidth: '800px' }}
                >
                    <header style={{ marginBottom: '2.5rem' }}>
                        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>User Settings</h1>
                        <p style={{ color: 'var(--color-text-secondary)' }}>Manage your workspace profile and preferences.</p>
                    </header>

                    <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '3rem' }}>
                        <aside style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <button className="glass" style={{ padding: '12px 16px', borderRadius: '8px', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 600, color: 'var(--color-accent)' }}>
                                <User size={18} /> Profile Details
                            </button>
                            <button style={{ padding: '12px 16px', borderRadius: '8px', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                                <Bell size={18} /> Notifications
                            </button>
                            <button style={{ padding: '12px 16px', borderRadius: '8px', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                                <Shield size={18} /> Security
                            </button>
                            <button style={{ padding: '12px 16px', borderRadius: '8px', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                                <Code size={18} /> IDE Settings
                            </button>
                        </aside>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                            {/* Profile Header */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                                <div style={{ position: 'relative' }}>
                                    <div style={{
                                        width: '100px',
                                        height: '100px',
                                        borderRadius: '20px',
                                        backgroundColor: 'var(--color-accent)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '2.5rem',
                                        fontWeight: 800,
                                        color: '#0d1117',
                                        boxShadow: 'var(--shadow-glow)'
                                    }}>
                                        AR
                                    </div>
                                    <button style={{
                                        position: 'absolute',
                                        bottom: '-8px',
                                        right: '-8px',
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        backgroundColor: 'var(--color-bg-card)',
                                        border: '2px solid var(--color-border)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'var(--color-text-primary)'
                                    }}>
                                        <Camera size={16} />
                                    </button>
                                </div>
                                <div>
                                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Alex Rivers</h2>
                                    <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>Joined March 2024 • Pro Account</p>
                                    <button className="glass" style={{ padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600 }}>Remove Avatar</button>
                                </div>
                            </div>

                            <div className="glass" style={{ padding: '2rem', borderRadius: '12px' }}>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Recent Rooms</h3>
                                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                        {['react-explorers', 'python-ai-lab', 'rust-beginners'].map(r => (
                                            <Link key={r} to={`/room/${r}`} className="glass" style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '0.8rem', color: 'var(--color-text-primary)', textDecoration: 'none' }}>
                                                {r}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                                <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Display Name</label>
                                            <input type="text" defaultValue="Alex Rivers" className="glass" style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)', outline: 'none' }} />
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Username</label>
                                            <input type="text" defaultValue="alex_codes" className="glass" style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)', outline: 'none' }} />
                                        </div>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1rem' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Role</label>
                                            <input type="text" defaultValue="Senior Engineer" className="glass" style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)', outline: 'none' }} />
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Team</label>
                                            <input type="text" defaultValue="Platform Team" className="glass" style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)', outline: 'none' }} />
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Email Address</label>
                                        <input type="email" defaultValue="alex@developer.io" className="glass" style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)', outline: 'none' }} />
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Preferred Languages</label>
                                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                            {['React', 'TypeScript', 'Node.js', 'Python'].map(tag => (
                                                <div key={tag} style={{ padding: '4px 12px', borderRadius: '20px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-border)', fontSize: '0.8rem' }}>
                                                    {tag}
                                                </div>
                                            ))}
                                            <button style={{ color: 'var(--color-accent)', fontSize: '0.8rem', fontWeight: 600 }}>+ Add Language</button>
                                        </div>
                                        <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--color-text-secondary)', background: 'rgba(255,255,255,0.02)', padding: '8px 12px', borderRadius: '8px' }}>
                                            Your AI answers are personalized based on your language preferences.
                                        </div>
                                    </div>

                                    <div style={{ marginTop: '1rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
                                        <button className="bg-gold glow-hover" style={{ padding: '12px 24px', borderRadius: '8px', fontWeight: 700, color: '#0d1117', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <Save size={18} /> Save Changes
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

export default Profile;
