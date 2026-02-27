import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Zap, Target, Layers, Sparkles, Code2, Users2, Cpu, BarChart, Rocket, Folder, CheckCircle } from 'lucide-react';
import '../styles/design-guide.css';

const slides = [
    {
        id: 1,
        tag: "A Paradigm Shift In Debugging",
        title: "DEVROOMS",
        titleSuffix: ".AI",
        subtitle: "Your engineering team's private context brain. Chat, code, and ship fixes in one focused room.",
        type: "hero",
        content: (
            <div className="mt-auto">
                <div style={{ background: 'rgba(0,242,255,0.05)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(0,242,255,0.2)', marginBottom: '3rem' }}>
                    <code className="text-accent" style={{ fontSize: '1.1rem' }}>🔗 https://dev-chatrooms-lv48drayl-schalltens-projects.vercel.app</code>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3rem' }}>
                    <div className="p-stat-box">
                        <span className="p-stat-value">Scale</span>
                        <span className="p-stat-label">Built for Teams</span>
                    </div>
                    <div className="p-stat-box">
                        <span className="p-stat-value">Neural</span>
                        <span className="p-stat-label">Context-Aware AI</span>
                    </div>
                    <div className="p-stat-box">
                        <span className="p-stat-value">Velocity</span>
                        <span className="p-stat-label">Instant Patches</span>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 2,
        tag: "The Market Problem",
        title: "THE CONTEXT",
        titleSuffix: " GAP",
        subtitle: "Generic AI tools have zero visibility into your team's live conversations and project structure.",
        content: (
            <div className="p-grid-content">
                <ul className="p-list">
                    <li className="p-list-item">
                        <div className="p-icon-circle"><Users2 size={24} /></div>
                        <span>Fragmented Slack Threads</span>
                    </li>
                    <li className="p-list-item">
                        <div className="p-icon-circle" style={{ color: '#ff3e3e', background: 'rgba(255,62,62,0.1)' }}><Layers size={24} /></div>
                        <span>Manual Folder Navigation</span>
                    </li>
                    <li className="p-list-item">
                        <div className="p-icon-circle"><Cpu size={24} /></div>
                        <span>Disconnected IDE Context</span>
                    </li>
                </ul>
                <div className="p-stat-box" style={{ borderColor: 'rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)' }}>
                    <p style={{ fontSize: '1.25rem', color: 'var(--p-text-dim)', fontStyle: 'italic', lineHeight: '1.6' }}>
                        "The average developer wastes 4+ hours a week just re-explaining bugs from Slack to their IDE."
                    </p>
                </div>
            </div>
        )
    },
    {
        id: 3,
        tag: "The Solution",
        title: "AI AGENTS",
        titleSuffix: " IN SYNC",
        subtitle: "DevRooms.ai maps your folder structure to the AI context, allowing agents to edit code and show output in real-time.",
        content: (
            <div className="p-grid-content">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
                    <div className="p-stat-box flex items-center gap-4">
                        <Folder className="text-accent" />
                        <div>
                            <h4 style={{ fontWeight: 800 }}>Folder Integration</h4>
                            <p className="text-sm p-text-dim">Full workspace visibility for the AI agents.</p>
                        </div>
                    </div>
                    <div className="p-stat-box flex items-center gap-4">
                        <Cpu className="text-accent" />
                        <div>
                            <h4 style={{ fontWeight: 800 }}>Agentic Editing</h4>
                            <p className="text-sm p-text-dim">AI suggests, edits, and verifies output automatically.</p>
                        </div>
                    </div>
                </div>
                <div style={{ background: '#000', borderRadius: '24px', padding: '2rem', border: '1px solid rgba(0,242,255,0.2)' }}>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem' }}>
                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f56' }} />
                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e' }} />
                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#27c93f' }} />
                    </div>
                    <code style={{ color: 'var(--p-accent)', fontSize: '0.9rem' }}>@ai fix auth.jsx overflow</code><br />
                    <code style={{ fontSize: '0.9rem', color: '#666' }}>[System] Editing folder: src/auth/...</code><br />
                    <code style={{ fontSize: '0.9rem', color: '#4ade80' }}>[Success] Diff generated. Ready to apply.</code>
                </div>
            </div>
        )
    },
    {
        id: 4,
        tag: "Feature Deep Dive",
        title: "COMMAND",
        titleSuffix: " DRIVEN",
        subtitle: "One mention. Infinite context. The AI reads the entire thread to provide the perfect fix.",
        content: (
            <div className="p-grid-content">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                    <div className="p-stat-box" style={{ background: 'rgba(0,242,255,0.03)' }}>
                        <span className="p-tag" style={{ margin: 0 }}>@ai fix</span>
                        <p className="text-sm p-text-dim mt-2">Instant bug patches</p>
                    </div>
                    <div className="p-stat-box">
                        <span className="p-tag" style={{ margin: 0, color: '#d2a8ff' }}>@ai refactor</span>
                        <p className="text-sm p-text-dim mt-2">Clean, optimal code</p>
                    </div>
                    <div className="p-stat-box">
                        <span className="p-tag" style={{ margin: 0, color: '#7ee787' }}>@ai tests</span>
                        <p className="text-sm p-text-dim mt-2">Unit test generation</p>
                    </div>
                    <div className="p-stat-box">
                        <span className="p-tag" style={{ margin: 0, color: '#79c0ff' }}>@ai explain</span>
                        <p className="text-sm p-text-dim mt-2">Code walkthroughs</p>
                    </div>
                </div>
                <div className="p-stat-box" style={{ background: '#000' }}>
                    <h4 style={{ fontWeight: 800, marginBottom: '1rem' }}>Interactive Diffs</h4>
                    <div style={{ background: '#1c1f23', padding: '1rem', borderRadius: '8px', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
                        <div style={{ color: '#f85149' }}>- return user && children;</div>
                        <div style={{ color: '#3fb950' }}>+ return user ? children : &lt;Login /&gt;;</div>
                    </div>
                    <button className="mt-4" style={{ background: 'var(--p-accent-glow)', color: 'var(--p-accent)', border: '1px solid var(--p-accent)', padding: '4px 12px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>CLICK TO APPLY</button>
                </div>
            </div>
        )
    },
    {
        id: 5,
        tag: "What We Built",
        title: "BEYOND",
        titleSuffix: " THE CHAT",
        subtitle: "A fully functional workspace ecosystem designed for collaborative engineering.",
        content: (
            <div className="p-grid-content">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                    <div className="p-list-item" style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
                        <div className="p-icon-circle" style={{ width: '2rem', height: '2rem' }}><CheckCircle size={16} /></div>
                        <span>Active File Explorer & Folder Navigation</span>
                    </div>
                    <div className="p-list-item" style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
                        <div className="p-icon-circle" style={{ width: '2rem', height: '2rem' }}><CheckCircle size={16} /></div>
                        <span>Persistent Rooms with Thread Indexing</span>
                    </div>
                    <div className="p-list-item" style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
                        <div className="p-icon-circle" style={{ width: '2rem', height: '2rem' }}><CheckCircle size={16} /></div>
                        <span>AI Agent Integration with Result Terminal</span>
                    </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                    <div className="p-stat-box">
                        <span className="p-stat-value">10+</span>
                        <span className="p-stat-label">Views</span>
                    </div>
                    <div className="p-stat-box">
                        <span className="p-stat-value">100%</span>
                        <span className="p-stat-label">React</span>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 6,
        tag: "Get Started",
        title: "JOIN THE",
        titleSuffix: " FUTURE",
        subtitle: "Try the live MVP today and experience context-driven engineering.",
        type: "hero",
        content: (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    style={{ textAlign: 'center' }}
                >
                    <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--p-accent)', marginBottom: '3rem' }}>
                        dev-chatrooms-lv48drayl-schalltens-projects.vercel.app
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', justifyContent: 'center' }}>
                        <a href="https://dev-chatrooms-lv48drayl-schalltens-projects.vercel.app" target="_blank" rel="noopener noreferrer" style={{ background: 'var(--p-accent)', color: 'black', padding: '1.25rem 4rem', borderRadius: '12px', fontWeight: 800, textTransform: 'uppercase', fontSize: '1.1rem', boxShadow: '0 10px 40px var(--p-accent-glow)' }}>Launch Live App</a>
                    </div>
                    <p style={{ marginTop: '2rem', color: 'var(--p-text-dim)', fontSize: '0.9rem' }}>© 2026 HackathonTeam — Built with React + Vite + Framer Motion</p>
                </motion.div>
            </div>
        )
    }
];

const DesignGuide = () => {
    const [current, setCurrent] = useState(0);

    const prev = () => current > 0 && setCurrent(current - 1);
    const next = () => current < slides.length - 1 && setCurrent(current + 1);

    const slide = slides[current];
    const progress = ((current + 1) / slides.length) * 100;

    return (
        <div className="design-guide-container">
            <div className="p-bg-grid" />
            <div className="p-bg-noise" />
            <div className="p-orb" style={{ top: '-10%', left: '-10%', width: 600, height: 600, background: 'var(--p-accent)' }} />
            <div className="p-orb" style={{ bottom: '-10%', right: '-10%', width: 800, height: 800, background: '#7000ff', opacity: 0.05 }} />

            <header className="p-brand">
                <div className="p-brand-logo">
                    <Zap size={18} fill="black" />
                </div>
                <span className="p-brand-name">DEVROOMS // PITCH DECK</span>
            </header>

            <main className="p-viewport">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="p-slide-card"
                    >
                        <div className="p-progress-bar" style={{ width: `${progress}%` }} />

                        <div className="p-slide-inner">
                            <span className="p-tag">{slide.tag}</span>

                            <h1 className={slide.type === 'hero' ? 'p-title-huge' : 'p-title-standard'}>
                                {slide.title}<span className="p-serif text-accent">{slide.titleSuffix}</span>
                            </h1>

                            <p className="p-subtitle">{slide.subtitle}</p>

                            <div style={{ marginTop: '4rem', flex: 1 }}>
                                {slide.content}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </main>

            <nav className="p-nav">
                <button className="p-nav-btn" onClick={prev} disabled={current === 0}>
                    <ChevronLeft size={24} />
                </button>
                <div className="p-counter">
                    {current + 1} / {slides.length}
                </div>
                <button className="p-nav-btn" onClick={next} disabled={current === slides.length - 1}>
                    <ChevronRight size={24} />
                </button>
            </nav>
        </div>
    );
};

export default DesignGuide;
