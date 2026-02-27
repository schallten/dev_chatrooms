import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Building, UserPlus, Key } from 'lucide-react';

const WorkspaceOnboarding = () => {
    const navigate = useNavigate();

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
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass"
                style={{
                    width: '100%',
                    maxWidth: '660px',
                    padding: '3rem',
                    borderRadius: '16px',
                    boxShadow: 'var(--shadow-md)',
                    textAlign: 'center'
                }}
            >
                <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>Welcome to DevRooms</h1>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', marginBottom: '2rem' }}>
                    Start by creating your workspace or join an existing one with an invite link.
                </p>

                <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <div className="glass-card" style={{ padding: '2rem', borderRadius: '12px', width: '240px', cursor: 'pointer' }} onClick={() => navigate('/create-room')}>
                        <Building size={40} className="text-gold" />
                        <h3 style={{ marginTop: '1rem', fontSize: '1.1rem', fontWeight: 600 }}>Create Workspace</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>Start a private environment for your team.</p>
                    </div>
                    <div className="glass-card" style={{ padding: '2rem', borderRadius: '12px', width: '240px', cursor: 'pointer' }} onClick={() => navigate('/invite')}>
                        <Key size={40} className="text-gold" />
                        <h3 style={{ marginTop: '1rem', fontSize: '1.1rem', fontWeight: 600 }}>Join Workspace</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>Use an invite link or company email to join.</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default WorkspaceOnboarding;
