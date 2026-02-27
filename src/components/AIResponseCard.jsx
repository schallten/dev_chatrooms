import React from 'react';
import { Sparkles } from 'lucide-react';
import CodeBlock from './CodeBlock';

const AIResponseCard = ({ content, code, language }) => {
    return (
        <div className="glass-card" style={{
            margin: '1.5rem 0',
            padding: '1.5rem',
            borderRadius: '12px',
            backgroundColor: 'rgba(240, 165, 0, 0.05)',
            border: '1px solid rgba(240, 165, 0, 0.2)',
            position: 'relative',
            overflow: 'hidden',
            animation: 'shimmer 1.5s ease-in-out'
        }}>
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '4px',
                height: '100%',
                backgroundColor: 'var(--color-accent)'
            }}></div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                <div style={{
                    position: 'relative',
                    width: '24px',
                    height: '24px',
                    borderRadius: '4px',
                    backgroundColor: 'var(--color-accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Sparkles size={14} color="#0d1117" />
                    <span style={{
                        position: 'absolute',
                        top: '-4px',
                        right: '-4px',
                        fontSize: '0.6rem',
                        color: '#0d1117'
                    }}>✦</span>
                </div>
                <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--color-accent)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    AI Assistant
                </span>
            </div>

            <div style={{ fontSize: '0.95rem', color: 'var(--color-text-primary)', lineHeight: 1.6, marginBottom: code ? '1rem' : 0 }}>
                {content}
            </div>

            {code && (
                <CodeBlock code={code} language={language} />
            )}
            {/* reactions */}
            <div style={{ position: 'absolute', bottom: '8px', right: '12px', display: 'flex', gap: '8px' }}>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)' }}>👍</button>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)' }}>👎</button>
            </div>
        </div>
    );
};

export default AIResponseCard;
