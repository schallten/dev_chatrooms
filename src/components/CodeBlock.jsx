import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';

const CodeBlock = ({ code, language }) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div style={{
            margin: '1rem 0',
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1px solid var(--color-border)',
            backgroundColor: '#1e1e1e'
        }}>
            <div style={{
                padding: '6px 12px',
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderBottom: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'lowercase' }}>
                    {language || 'text'}
                </span>
                <button
                    onClick={copyToClipboard}
                    style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', color: 'var(--color-text-secondary)' }}
                >
                    {copied ? <Check size={14} className="text-gold" /> : <Copy size={14} />}
                    {copied ? 'Copied' : 'Copy'}
                </button>
            </div>
            <SyntaxHighlighter
                language={language || 'javascript'}
                style={vscDarkPlus}
                showLineNumbers={true}
                lineNumberStyle={{ color: 'var(--color-text-muted)', paddingRight: '12px' }}
                wrapLines={true}
                customStyle={{
                    margin: 0,
                    padding: '1rem',
                    fontSize: '0.9rem',
                    background: 'transparent'
                }}
                codeTagProps={{
                    style: { fontFamily: 'var(--font-mono)' }
                }}
            >
                {code}
            </SyntaxHighlighter>
        </div>
    );
};

export default CodeBlock;
