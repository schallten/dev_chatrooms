import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Terminal, Mail, User, ArrowRight } from 'lucide-react';

const Invite = () => {
    const navigate = useNavigate();

    const handleJoin = (e) => {
        e.preventDefault();
        navigate('/dashboard');
    };

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(circle at center, #161b22 0%, #0d1117 100%)',
            padding: '2rem'
        }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass"
                style={{
                    width: '100%',
                    maxWidth: '440px',
                    padding: '2.5rem',
                    borderRadius: '16px',
                    boxShadow: 'var(--shadow-md)',
                    textAlign: 'center'
                }}
            >
                <div style={{ marginBottom: '2rem' }}>
                    <div className="bg-gold" style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1rem'
                    }}>
                        <Terminal size={24} color="#0d1117" />
                    </div>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>You're Invited</h1>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
                        You've been invited to join <strong>Acme Corp</strong>'s DevRooms workspace.
                    </p>
                </div>

                <form onSubmit={handleJoin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ textAlign: 'left' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
                            Name
                        </label>
                        <div style={{ position: 'relative' }}>
                            <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                            <input
                                type="text"
                                placeholder="Your Name"
                                required
                                style={{
                                    width: '100%',
                                    padding: '12px 12px 12px 40px',
                                    backgroundColor: 'rgba(0,0,0,0.2)',
                                    border: '1px solid var(--color-border)',
                                    borderRadius: '8px',
                                    color: 'var(--color-text-primary)',
                                    fontSize: '0.95rem',
                                    outline: 'none',
                                    transition: 'var(--transition-fast)'
                                }}
                                className="glow-focus"
                            />
                        </div>
                    </div>

                    <div style={{ textAlign: 'left' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
                            Work Email
                        </label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                            <input
                                type="email"
                                placeholder="you@acme.com"
                                required
                                style={{
                                    width: '100%',
                                    padding: '12px 12px 12px 40px',
                                    backgroundColor: 'rgba(0,0,0,0.2)',
                                    border: '1px solid var(--color-border)',
                                    borderRadius: '8px',
                                    color: 'var(--color-text-primary)',
                                    fontSize: '0.95rem',
                                    outline: 'none',
                                    transition: 'var(--transition-fast)'
                                }}
                            />
                        </div>
                    </div>

                    <button type="submit" className="glow-hover" style={{
                        backgroundColor: 'var(--color-accent)',
                        color: '#0d1117',
                        padding: '12px',
                        borderRadius: '8px',
                        fontWeight: 600,
                        fontSize: '1rem',
                        marginTop: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                    }}>
                        Join Workspace <ArrowRight size={18} />
                    </button>
                </form>

                {/* optionally some social login / or link */}
                <div style={{ marginTop: '2rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                    Need a workspace? <Link to="/" style={{ color: 'var(--color-accent)', fontWeight: 600 }}>Create one</Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Invite;
