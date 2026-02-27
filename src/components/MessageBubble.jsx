import React from 'react';

const MessageBubble = ({ message }) => {
    const isMe = message.user === 'You';

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '4px',
            marginBottom: '1rem'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    color: isMe ? 'var(--color-accent)' : 'var(--color-text-primary)'
                }}>
                    {message.user}
                </span>
                <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
                    {message.timestamp}
                </span>
            </div>
            <div style={{
                fontSize: '0.95rem',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.5,
                wordBreak: 'break-word',
                maxWidth: '90%'
            }}>
                {message.text}
            </div>
        </div>
    );
};

export default MessageBubble;
