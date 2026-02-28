import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import MessageBubble from '../components/MessageBubble';
import AIResponseCard from '../components/AIResponseCard';
import ChatInput from '../components/ChatInput';
import { useRoom } from '../contexts/RoomContext';
import { useAuth } from '../contexts/AuthContext';
import { socketService } from '../services/socket';
import { Users, Info, MoreVertical, Hash, Terminal, Send } from 'lucide-react';

const ChatRoom = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const scrollRef = useRef(null);
    const { rooms, currentRoom, messages, joinRoom, sendMessage } = useRoom();
    const { user } = useAuth();
    const [typingMembers, setTypingMembers] = useState([]);
    const [inputValue, setInputValue] = useState('');

    // Join room on mount or when room ID changes
    useEffect(() => {
        if (id && rooms.length > 0) {
            const roomId = parseInt(id);
            joinRoom(roomId);
        }
    }, [id, rooms.length]);

    // Scroll to bottom when messages change
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = (text) => {
        if (!currentRoom || !text.trim()) return;

        sendMessage(text);
        setInputValue('');
    };

    if (!currentRoom) {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                color: 'var(--color-text-secondary)'
            }}>
                Loading room...
            </div>
        );
    }

    // Map backend room to display format
    const room = {
        id: currentRoom.id,
        name: currentRoom.name,
        topic: currentRoom.topic,
        members: 5,
        owner: 'unknown'
    };

    // Get unique members from messages
    const members = [
        { name: user?.name || 'You', status: 'online', isYou: true },
        { name: 'AI Assistant', status: 'online', isAI: true },
        ...Array.from(
            new Set(
                messages
                    .filter(m => m.user_id && m.user_name)
                    .map(m => ({ name: m.user_name, status: 'online' }))
            ),
            ({ name, status }) => ({ name, status })
        ).slice(0, 3)
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-bg-deep)' }}>
            <Sidebar joinedRooms={rooms.slice(0, 3)} />

            <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Room Header */}
                <div style={{
                    padding: '1rem 2rem',
                    borderBottom: '1px solid var(--color-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: '64px'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Hash size={20} color="var(--color-accent)" />
                        <div>
                            <div style={{ fontWeight: 700, fontSize: '1rem' }}>{room.name}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{room.topic || 'General discussion'}</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                            <Users size={16} />
                            {members.length} members
                        </div>
                        <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                            <Info size={20} color="var(--color-text-secondary)" />
                        </button>
                    </div>
                </div>

                {/* Messages */}
                <div
                    ref={scrollRef}
                    style={{
                        flex: 1,
                        overflowY: 'auto',
                        padding: '2rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem'
                    }}
                >
                    {messages.length === 0 ? (
                        <div style={{ textAlign: 'center', color: 'var(--color-text-secondary)', marginTop: '2rem' }}>
                            <p>No messages yet. Start the conversation!</p>
                        </div>
                    ) : (
                        messages.map((msg, idx) => {
                            if (msg.is_ai) {
                                return (
                                    <AIResponseCard
                                        key={msg.id || idx}
                                        user="AI Assistant"
                                        timestamp={new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        text={msg.content}
                                    />
                                );
                            }
                            return (
                                <MessageBubble
                                    key={msg.id || idx}
                                    user={msg.user_name || 'Unknown'}
                                    timestamp={new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    text={msg.content}
                                    isCode={msg.is_code}
                                    language={msg.language}
                                />
                            );
                        })
                    )}
                </div>

                {/* Input */}
                <div style={{
                    padding: '1.5rem 2rem',
                    borderTop: '1px solid var(--color-border)',
                    background: 'var(--color-bg-deep)'
                }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSendMessage(inputValue);
                                }
                            }}
                            placeholder="Type a message... (@ai for help)"
                            style={{
                                flex: 1,
                                padding: '0.75rem 1rem',
                                borderRadius: '8px',
                                border: '1px solid var(--color-border)',
                                background: 'var(--color-bg-card)',
                                color: 'var(--color-text-primary)',
                                fontSize: '0.95rem',
                                outline: 'none'
                            }}
                        />
                        <button
                            onClick={() => handleSendMessage(inputValue)}
                            disabled={!inputValue.trim()}
                            style={{
                                padding: '0.75rem 1.25rem',
                                borderRadius: '8px',
                                background: inputValue.trim() ? 'var(--color-accent)' : 'rgba(240, 165, 0, 0.3)',
                                color: inputValue.trim() ? '#0d1117' : 'var(--color-text-muted)',
                                border: 'none',
                                cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            <Send size={16} />
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ChatRoom;
