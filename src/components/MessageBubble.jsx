import React from 'react';

// Note: props come from ChatRoom.map, not a single `message` object
const MessageBubble = ({
  user = 'Unknown',
  timestamp = '',
  text = '',
  isCode = false,
  language,
  isAI = false,
}) => {
  // mark messages from current client as 'You' if necessary
  const isMe = user === 'You';

  // simple code block rendering for code messages
  const content = isCode ? (
    <pre style={{
      background: 'rgba(240,165,0,0.05)',
      padding: '8px',
      borderRadius: '6px',
      overflowX: 'auto',
      fontFamily: 'var(--font-mono)',
      fontSize: '0.9rem',
      color: 'var(--color-text-secondary)',
    }}>
      {text}
    </pre>
  ) : (
    text
  );

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
          {user}
        </span>
        <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
          {timestamp}
        </span>
      </div>
      <div style={{
          fontSize: '0.95rem',
          color: 'var(--color-text-secondary)',
          lineHeight: 1.5,
          wordBreak: 'break-word',
          maxWidth: '90%'
      }}>
        {content}
      </div>
    </div>
  );
};

export default MessageBubble;
