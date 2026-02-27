import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import MessageBubble from '../components/MessageBubble';
import AIResponseCard from '../components/AIResponseCard';
import ChatInput from '../components/ChatInput';
import { Users, Info, MoreVertical, Hash, Terminal } from 'lucide-react';

const ChatRoom = () => {
    const { id } = useParams();
    const scrollRef = useRef(null);

    const [messages, setMessages] = useState([
        { id: 1, user: 'sarah_dev', timestamp: '2:30 PM', text: 'Hey everyone! Working on the new auth flow.' },
        { id: 2, user: 'mike_j', timestamp: '2:32 PM', text: 'Nice! Are we using JWT or sessions?' },
        { id: 3, user: 'AI', timestamp: '2:32 PM', isAI: true, text: 'For modern React apps, JWT with HttpOnly cookies is generally recommended for a balance of security and scalability.', code: '// Example cookie config\nres.cookie("token", jwtToken, {\n  httpOnly: true,\n  secure: true,\n  sameSite: "Strict"\n});', language: 'javascript' },
        { id: 4, user: 'sarah_dev', timestamp: '2:35 PM', text: 'Thanks @AI, that helps! Mike, I think we will go with JWT.' },
    ]);

    const [members] = useState([
        { name: 'sarah_dev', status: 'online', lang: 'React' },
        { name: 'mike_j', status: 'online', lang: 'Python' },
        { name: 'alex_rivers', status: 'offline', lang: 'Rust' },
        { name: 'AI Assistant', status: 'online', isAI: true },
    ]);
    const [typingMembers, setTypingMembers] = useState(['mike_j']);

    const handleSendMessage = (text, isCode) => {
        const newMessage = {
            id: messages.length + 1,
            user: 'You',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            text: text,
            isCode: isCode
        };

        setMessages([...messages, newMessage]);

        // Simple AI trigger simulation
        if (text.includes('@AI')) {
            setTimeout(() => {
                setMessages(prev => [...prev, {
                    id: prev.length + 1,
                    user: 'AI',
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    isAI: true,
                    text: 'I am processing your request. How can I assist with your code today?'
                }]);
            }, 1000);
        }
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div style={{ display: 'flex', height: '100vh', backgroundColor: 'var(--color-bg-deep)' }}>
            <Sidebar joinedRooms={[]} />

            <main style={{ flex: 1, display: 'flex', flexDirection: 'column', borderRight: '1px solid var(--color-border)' }}>
                {/* Chat Header */}
                <header style={{
                    height: '64px',
                    borderBottom: '1px solid var(--color-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 2rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div className="bg-gold" style={{ padding: '6px', borderRadius: '8px' }}>
                            <Terminal size={18} color="#0d1117" />
                        </div>
                        <div>
                            <div style={{ fontSize: '1rem', fontWeight: 700 }}># react-explorers</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Frontend development and Vite optimization</div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--color-accent-2)', marginTop: '4px' }}>Purpose: backend API debugging — Node.js & PostgreSQL stack</div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button style={{ color: 'var(--color-text-secondary)' }}><Users size={20} /></button>
                        <button style={{ color: 'var(--color-text-secondary)' }}><Info size={20} /></button>
                        <button style={{ color: 'var(--color-text-secondary)' }}><MoreVertical size={20} /></button>
                    </div>
                </header>

                {/* Pinned messages */}
                <div style={{ padding: '1rem 2rem', borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-card)' }}>
                    <strong style={{ color: 'var(--color-text-secondary)' }}>Pinned:</strong>
                    <span style={{ marginLeft: '0.5rem', fontSize: '0.9rem' }}>📌 Remember to update API tokens before deploy</span>
                </div>
                {/* Messages Area */}
                <div
                    ref={scrollRef}
                    style={{
                        flex: 1,
                        overflowY: 'auto',
                        padding: '2rem',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    {messages.map(msg => (
                        msg.isAI ? (
                            <AIResponseCard
                                key={msg.id}
                                content={msg.text}
                                code={msg.code}
                                language={msg.language}
                            />
                        ) : (
                            <MessageBubble key={msg.id} message={msg} />
                        )
                    ))}
                </div>

                {/* Input Area */}
                <ChatInput onSendMessage={handleSendMessage} />
            </main>

            {/* Right Sidebar - Member List (Desktop only) */}
            <aside style={{ width: '240px', backgroundColor: 'rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--color-border)', fontSize: '0.9rem', fontWeight: 600 }}>
                    Members — {members.length}
                </div>
                <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {members.map(member => (
                        <div key={member.name} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ position: 'relative' }}>
                                <div style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '8px',
                                    backgroundColor: member.isAI ? 'var(--color-accent)' : 'var(--color-bg-card)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.8rem',
                                    fontWeight: 700
                                }}>
                                    {member.name.charAt(0).toUpperCase()}
                                </div>
                                {member.status === 'online' && (
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '-2px',
                                        right: '-2px',
                                        width: '10px',
                                        height: '10px',
                                        backgroundColor: 'var(--color-accent-2)',
                                        borderRadius: '50%',
                                        border: '2px solid var(--color-bg-deep)'
                                    }}></div>
                                )}
                            </div>
                            <div>
                                <div style={{ fontSize: '0.85rem', fontWeight: 500, color: member.isAI ? 'var(--color-accent)' : 'inherit' }}>
                                    {member.name}
                                    {typingMembers.includes(member.name) && <span style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)', marginLeft: '6px' }}>typing...</span>}
                                </div>
                                <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
                                    {member.isAI ? 'AI BOT' : member.status}
                                </div>
                                {member.lang && (
                                    <div style={{ fontSize: '0.65rem', color: 'var(--color-accent-2)', marginTop: '2px' }}>{member.lang}</div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </aside>
        </div>
    );
};

export default ChatRoom;
