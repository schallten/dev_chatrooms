import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Sparkles, User, ShieldCheck } from 'lucide-react';

const MockChat = () => {
    const [messages, setMessages] = React.useState([
        { id: 1, user: 'dev_alex', text: 'Hey @AI, why is my React component re-rendering infinitely?', color: 'var(--color-accent-2)' },
        { id: 2, user: 'AI', text: 'It looks like you might be updating state inside the render body. Check your `useEffect` dependency array or ensure state updates are inside handlers.', isAI: true },
        { id: 3, user: 'dev_alex', text: 'Ah, you’re right! I missed the dependency array. Fixed!', color: 'var(--color-accent-2)' },
    ]);

    // simulate typing of @AI and AI response on mount
    React.useEffect(() => {
        const timer1 = setTimeout(() => {
            setMessages(prev => [...prev, { id: 4, user: 'dev_alex', text: '@AI fix this', color: 'var(--color-accent-2)', isTyping: true }]);
        }, 1000);

        const timer2 = setTimeout(() => {
            setMessages(prev => prev.map(m => m.id === 4 ? { ...m, isTyping: false } : m));
        }, 2000);

        const timer3 = setTimeout(() => {
            setMessages(prev => [...prev, { id: 5, user: 'AI', text: 'Looks like you forgot to add a dependency to your useEffect array.', isAI: true }]);
        }, 2600);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, []);

    return (
        <div className="glass" style={{
            borderRadius: '12px',
            overflow: 'hidden',
            maxWidth: '450px',
            width: '100%',
            boxShadow: 'var(--shadow-md)',
            border: '1px solid var(--color-border)'
        }}>
            <div style={{
                padding: '12px 16px',
                backgroundColor: 'rgba(255,255,255,0.03)',
                borderBottom: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
            }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f56' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27c93f' }}></div>
                <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>debug-room.js</span>
            </div>

            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {messages.map((msg, index) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.5 + 1 }}
                        style={{
                            display: 'flex',
                            gap: '12px',
                            alignItems: 'flex-start'
                        }}
                    >
                        <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '6px',
                            backgroundColor: msg.isAI ? 'var(--color-accent)' : msg.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                        }}>
                            {msg.isAI ? <Sparkles size={16} color="#0d1117" /> : <User size={16} color="#0d1117" />}
                        </div>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{msg.user}</span>
                                {msg.isAI && <span style={{ fontSize: '0.65rem', padding: '2px 6px', background: 'rgba(240,165,0,0.1)', color: 'var(--color-accent)', borderRadius: '4px', border: '1px solid var(--color-accent)' }}>AI ASSISTANT</span>}
                            </div>
                            <div style={{
                                fontSize: '0.9rem',
                                color: 'var(--color-text-secondary)',
                                padding: msg.isAI ? '12px' : '0',
                                backgroundColor: msg.isAI ? 'rgba(240,165,0,0.05)' : 'transparent',
                                borderRadius: '8px',
                                border: msg.isAI ? '1px solid rgba(240,165,0,0.15)' : 'none',
                                position: 'relative',
                                boxShadow: msg.text && msg.text.includes('@AI') ? '0 0 6px var(--color-accent)' : 'none'
                            }}>
                                {msg.isTyping ? (
                                    <span className="typing-dots" style={{fontFamily: 'var(--font-mono)'}}>• • •</span>
                                ) : (
                                    msg.text.split('@AI').map((part, i, arr) => (
                                        <React.Fragment key={i}>
                                            {part}
                                            {i < arr.length - 1 && <span className="text-gold">@AI</span>}
                                        </React.Fragment>
                                    ))
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default MockChat;
