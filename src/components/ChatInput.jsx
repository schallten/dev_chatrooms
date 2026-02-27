import React, { useState } from 'react';
import { Send, Code, AtSign, Paperclip, Smile } from 'lucide-react';

const ChatInput = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');
    const [isCodeMode, setIsCodeMode] = useState(false);
    const isAIMention = message.includes('@AI');
    const [showTooltip, setShowTooltip] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            onSendMessage(message, isCodeMode);
            setMessage('');
            setIsCodeMode(false);
        }
    };

    return (
        <div style={{
            padding: '1.5rem 2rem',
            borderTop: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-bg-deep)'
        }}>
            <form
                onSubmit={handleSubmit}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    padding: '8px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    border: `1px solid ${isAIMention ? 'var(--color-accent)' : 'var(--color-border)'}`,
                    boxShadow: isAIMention ? 'var(--shadow-glow)' : 'none',
                    transition: 'var(--transition-base)'
                }}
            >
                <div style={{ display: 'flex', gap: '8px', padding: '4px 8px' }}>
                    <button
                        type="button"
                        onClick={() => setIsCodeMode(!isCodeMode)}
                        style={{
                            color: isCodeMode ? 'var(--color-accent)' : 'var(--color-text-muted)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            padding: '4px 8px',
                            borderRadius: '4px',
                            backgroundColor: isCodeMode ? 'rgba(240,165,0,0.1)' : 'transparent'
                        }}
                    >
                        <Code size={16} /> Code Mode
                    </button>
                    <div style={{ width: '1px', height: '16px', borderLeft: '1px solid var(--color-border)', alignSelf: 'center' }}></div>
                    <button type="button" style={{ color: 'var(--color-text-muted)' }}><AtSign size={16} /></button>
                    <button type="button" style={{ color: 'var(--color-text-muted)' }}><Paperclip size={16} /></button>
                    <button type="button" style={{ color: 'var(--color-text-muted)' }}><Smile size={16} /></button>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                        <textarea
                            value={message}
                            onChange={(e) => {
                                setMessage(e.target.value);
                                if (e.target.value.includes('@AI')) {
                                    setShowTooltip(true);
                                } else {
                                    setShowTooltip(false);
                                }
                            }}
                            placeholder={isCodeMode ? "Paste your code snippet here..." : "Type a message or @AI to get help..."}
                            style={{
                                flex: 1,
                                backgroundColor: 'transparent',
                                border: 'none',
                                outline: 'none',
                                color: 'var(--color-text-primary)',
                                fontSize: '0.95rem',
                                resize: 'none',
                                minHeight: isCodeMode ? '120px' : '40px',
                                maxHeight: '300px',
                                padding: '8px',
                                fontFamily: isCodeMode ? 'var(--font-mono)' : 'var(--font-ui)'
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSubmit(e);
                                }
                            }}
                        />
                        {showTooltip && (
                            <div className="tooltip show">AI is ready — describe your issue or paste code.</div>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="bg-gold glow-hover"
                        style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            marginBottom: '4px'
                        }}
                    >
                        <Send size={18} color="#0d1117" />
                    </button>
                </div>
            </form>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
                    Press <kbd style={{ padding: '2px 4px', background: 'var(--color-bg-card)', borderRadius: '3px', border: '1px solid var(--color-border)' }}>⌘Enter</kbd> to send
                </span>
                {isAIMention && (
                    <span style={{ fontSize: '0.7rem', color: 'var(--color-accent)', fontWeight: 600 }}>
                        AI Assistant will respond to this message
                    </span>
                )}
            </div>
        </div>
    );
};

export default ChatInput;
