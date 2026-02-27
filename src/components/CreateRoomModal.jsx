import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Hash, Globe, Lock, PlusCircle } from 'lucide-react';

const CreateRoomModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0,0,0,0.8)',
                backdropFilter: 'blur(4px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                padding: '1rem'
            }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="glass"
                    style={{
                        width: '100%',
                        maxWidth: '500px',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                    }}
                >
                    <div style={{
                        padding: '1.5rem',
                        borderBottom: '1px solid var(--color-border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Deploy New Room</h2>
                        <button onClick={onClose} style={{ color: 'var(--color-text-muted)' }}><X size={20} /></button>
                    </div>

                    <form style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Room Name</label>
                            <div style={{ position: 'relative' }}>
                                <Hash size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                                <input
                                    type="text"
                                    placeholder="e.g. backend-refactor"
                                    style={{
                                        width: '100%',
                                        padding: '12px 12px 12px 40px',
                                        backgroundColor: 'rgba(0,0,0,0.2)',
                                        border: '1px solid var(--color-border)',
                                        borderRadius: '8px',
                                        color: 'var(--color-text-primary)',
                                        fontSize: '0.95rem',
                                        outline: 'none'
                                    }}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Topic / Language Tag</label>
                            <input
                                type="text"
                                placeholder="e.g. Node.js, Typescript, AWS"
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    backgroundColor: 'rgba(0,0,0,0.2)',
                                    border: '1px solid var(--color-border)',
                                    borderRadius: '8px',
                                    color: 'var(--color-text-primary)',
                                    fontSize: '0.95rem',
                                    outline: 'none'
                                }}
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div style={{
                                padding: '1rem',
                                borderRadius: '8px',
                                border: '1px solid var(--color-accent)',
                                backgroundColor: 'rgba(240,165,0,0.05)',
                                cursor: 'pointer',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '4px'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-accent)' }}>
                                    <Globe size={16} />
                                    <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Public</span>
                                </div>
                                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Anyone can join via link</span>
                            </div>

                            <div style={{
                                padding: '1rem',
                                borderRadius: '8px',
                                border: '1px solid var(--color-border)',
                                cursor: 'pointer',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '4px'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-secondary)' }}>
                                    <Lock size={16} />
                                    <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Private</span>
                                </div>
                                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Invitation only</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="bg-gold glow-hover"
                            style={{
                                width: '100%',
                                padding: '14px',
                                borderRadius: '8px',
                                fontWeight: 700,
                                fontSize: '1rem',
                                color: '#0d1117',
                                marginTop: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px'
                            }}
                        >
                            <PlusCircle size={20} /> Create Room
                        </button>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default CreateRoomModal;
