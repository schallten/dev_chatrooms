import React from 'react';
import { motion } from 'framer-motion';
import { Users, Hash, MessageCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const RoomCard = ({ room }) => {
    return (
        <motion.div
            whileHover={{ y: -4 }}
            className="glass glow-hover"
            style={{
                padding: '1.5rem',
                borderRadius: '12px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                transition: 'var(--transition-base)'
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div className="bg-gold" style={{
                    padding: '8px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Hash size={18} color="#0d1117" />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                    <Users size={14} color="var(--color-accent-2)" />
                    <span>{room.members} active</span>
                </div>
            </div>

            <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.25rem' }}>{room.name}</h3>
                    {room.resolved && <span style={{ fontSize: '0.7rem', color: 'var(--color-accent-2)', background: 'rgba(88,166,255,0.1)', padding: '2px 6px', borderRadius: '6px' }}>Resolved</span>}
                </div>
                {/* topic tag with colored dot */}
                <span style={{
                    fontSize: '0.75rem',
                    padding: '2px 8px',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '12px',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-text-secondary)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                }}>
                    <span style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: (() => {
                            const map = {
                                React: '#61dafb',
                                Vite: '#646cff',
                                Rust: '#dea584',
                                Python: '#3572A5',
                                TypeScript: '#3178c6',
                                Docker: '#2496ed',
                                Performance: '#ff6e52'
                            };
                            const key = room.topic.split(/[, ]+/)[0];
                            return map[key] || 'var(--color-accent)';
                        })()
                    }}></span>
                    {room.topic}
                </span>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>
                    Owner: {room.owner || 'unknown'}
                </div>
            </div>

            <div style={{
                marginTop: '0.5rem',
                padding: '0.75rem',
                backgroundColor: 'rgba(0,0,0,0.15)',
                borderRadius: '8px',
                fontSize: '0.85rem'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.75rem' }}>{room.lastUser}</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>• 2m ago</span>
                </div>
                <p style={{ color: 'var(--color-text-secondary)', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {room.lastMessage}
                </p>
            </div>

            <Link to={`/room/${room.id}`} style={{
                marginTop: '0.5rem',
                textAlign: 'center',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: 'var(--color-accent)'
            }}>
                Join Room
            </Link>
        </motion.div>
    );
};

export default RoomCard;
