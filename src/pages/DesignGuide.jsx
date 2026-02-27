import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Zap, Target, Layers, Sparkles, Code2, Users2, Cpu,
    BarChart, Rocket, Folder, CheckCircle, GitMerge,
    Shield, Share2, MessageSquare, Terminal as TerminalIcon
} from 'lucide-react';
import '../styles/design-guide.css';

const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const Section = ({ tag, title, titleSuffix, subtitle, children, isHero = false }) => (
    <section className="p-section">
        <div className="p-section-inner">
            <motion.div {...fadeIn} className={!isHero ? "p-glass-card" : ""}>
                <span className="p-tag">{tag}</span>
                <h2 className={isHero ? "p-title-huge" : "p-title-standard"}>
                    {title}<span className="p-serif text-accent">{titleSuffix}</span>
                </h2>
                <p className="p-subtitle">{subtitle}</p>
                <div className="p-content-wrapper">
                    {children}
                </div>
            </motion.div>
        </div>
    </section>
);

const DesignGuide = () => {
    return (
        <div className="design-guide-container">
            {/* Background Atmosphere */}
            <div className="p-bg-wrapper">
                <div className="p-bg-grid" />
                <div className="p-bg-noise" />
                <div className="p-orb" style={{ top: '10%', left: '-5%', width: 800, height: 800, background: 'var(--p-accent)' }} />
                <div className="p-orb" style={{ bottom: '20%', right: '-10%', width: 1000, height: 1000, background: '#7000ff' }} />
            </div>

            <header className="p-header">
                <div className="p-brand">
                    <div className="p-brand-logo">
                        <Zap size={18} fill="black" />
                    </div>
                    <span className="p-brand-name">DEVROOMS // PITCH</span>
                </div>
                <Link to="/" className="text-accent" style={{ fontWeight: 800, fontSize: '0.8rem', letterSpacing: '0.1em' }}>LAUNCH MVP</Link>
            </header>

            {/* Slide 1: Hero */}
            <Section
                isHero
                tag="A Paradigm Shift In Debugging"
                title="DEVROOMS"
                titleSuffix=".AI"
                subtitle="Your engineering team's private context brain. Chat, code, and ship fixes in one focused room."
            >
                <div className="p-grid-content" style={{ marginTop: '4rem' }}>
                    <div className="p-stat-box">
                        <span className="p-stat-value">Neural</span>
                        <span className="p-stat-label">Context-Aware AI</span>
                    </div>
                    <div className="p-stat-box">
                        <span className="p-stat-value">Scale</span>
                        <span className="p-stat-label">Built for Teams</span>
                    </div>
                    <div className="p-stat-box">
                        <span className="p-stat-value">Velocity</span>
                        <span className="p-stat-label">Instant Patches</span>
                    </div>
                </div>
            </Section>

            {/* Slide 2: Problem */}
            <Section
                tag="The Friction"
                title="THE CONTEXT"
                titleSuffix=" GAP"
                subtitle="Developers waste hours context-switching between fragmented chat threads and their code."
            >
                <div className="p-grid-content">
                    <ul className="p-list">
                        <li className="p-list-item">
                            <div className="p-icon-circle"><Users2 size={24} /></div>
                            <span>Fragmented Slack Conversations</span>
                        </li>
                        <li className="p-list-item">
                            <div className="p-icon-circle" style={{ color: '#ff3e3e', background: 'rgba(255,62,62,0.1)' }}><Layers size={24} /></div>
                            <span>Shadow Knowledge Silos</span>
                        </li>
                        <li className="p-list-item">
                            <div className="p-icon-circle"><Cpu size={24} /></div>
                            <span>Disconnected AI Agents</span>
                        </li>
                    </ul>
                </div>
            </Section>

            {/* Slide 3: Engine (Targeting Repos) */}
            <Section
                tag="The Engine"
                title="GIT-NATIVE"
                titleSuffix=" ROOMS"
                subtitle="Every DevRoom targets a specific Git repository, bridging the gap between chat and codebase."
            >
                <div className="p-grid-content">
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        <div className="p-stat-box flex items-center gap-4">
                            <Code2 className="text-accent" />
                            <div>
                                <h4 style={{ fontWeight: 800 }}>Repo Targeting</h4>
                                <p className="text-sm p-text-dim">Connect any GitHub/GitLab URL to a room.</p>
                            </div>
                        </div>
                        <div className="p-stat-box flex items-center gap-4">
                            <Rocket className="text-accent" />
                            <div>
                                <h4 style={{ fontWeight: 800 }}>Zero-Config</h4>
                                <p className="text-sm p-text-dim">The system prepares the environment instantly.</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-terminal">
                        <div style={{ background: '#ff5f56', width: 8, height: 8, borderRadius: '50%', display: 'inline-block', marginRight: 6 }} />
                        <div style={{ background: '#ffbd2e', width: 8, height: 8, borderRadius: '50%', display: 'inline-block', marginRight: 6 }} />
                        <div style={{ background: '#27c93f', width: 8, height: 8, borderRadius: '50%', display: 'inline-block' }} />
                        <div style={{ marginTop: '1.5rem', color: 'var(--p-accent)', fontFamily: 'var(--font-mono)' }}>
                            $ devrooms connect hackathon/api<br />
                            <span style={{ color: '#666' }}>[System] Analyzing repository structure...</span><br />
                            <span style={{ color: '#4ade80' }}>[Success] Room #api-core connected.</span>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Slide 4: Deployment (Cloning) */}
            <Section
                tag="Deployment"
                title="AUTO"
                titleSuffix=" CLONING"
                subtitle="If the repo isn't already in your workspace, DevRooms.ai clones it automatically and indexes the context."
            >
                <div className="p-grid-content">
                    <div className="p-stat-box" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <span className="p-stat-value">Instant</span>
                        <span className="p-stat-label">Full Workspace Sync</span>
                        <p className="text-sm p-text-dim mt-4">Automated indexing ensures the AI knows every file and module before you even type.</p>
                    </div>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        <div className="p-stat-box" style={{ padding: '1.5rem' }}>
                            <div className="flex items-center gap-4">
                                <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--p-accent)' }} />
                                <span className="text-sm font-bold tracking-widest uppercase">cloning repo... 85%</span>
                            </div>
                        </div>
                        <div className="p-stat-box" style={{ padding: '1.5rem' }}>
                            <div className="flex items-center gap-4">
                                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#4ade80' }} />
                                <span className="text-sm font-bold tracking-widest uppercase text-accent">context ready</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Slide 5: Real-time (Socket.io) - NEW */}
            <Section
                tag="Network"
                title="SOCKET"
                titleSuffix=" POWERED"
                subtitle="Real-time multi-user synchronization. Experience zero-latency collaboration across chat and agent status."
            >
                <div className="p-grid-content">
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        <div className="p-stat-box flex items-center gap-4">
                            <Share2 className="text-accent" />
                            <div>
                                <h4 style={{ fontWeight: 800 }}>Bi-Directional Sync</h4>
                                <p className="text-sm p-text-dim">Instant message delivery across all participants.</p>
                            </div>
                        </div>
                        <div className="p-stat-box flex items-center gap-4">
                            <MessageSquare className="text-accent" />
                            <div>
                                <h4 style={{ fontWeight: 800 }}>Presence System</h4>
                                <p className="text-sm p-text-dim">See who is active in the room and what they are editing.</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-stat-box" style={{ background: 'rgba(0,242,255,0.03)' }}>
                        <div className="flex items-center gap-4 mb-4">
                            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#333' }} />
                            <div style={{ flex: 1 }}>
                                <div style={{ height: 10, width: '60%', background: 'rgba(255,255,255,0.1)', marginBottom: 6 }} />
                                <div style={{ height: 8, width: '40%', background: 'rgba(255,255,255,0.05)' }} />
                            </div>
                        </div>
                        <p className="p-serif" style={{ fontSize: '1.25rem', opacity: 0.8 }}>"Socket.io enables the heartbeat of the devroom."</p>
                    </div>
                </div>
            </Section>

            {/* Slide 6: Workflow (Agentic) */}
            <Section
                tag="The Workflow"
                title="AGENTIC"
                titleSuffix=" EDITING"
                subtitle="AI Agents don't just chat—they work. Agents navigate folders, modify files, and fix bugs autonomously."
            >
                <div className="p-grid-content">
                    <ul className="p-list">
                        <li className="p-list-item">
                            <div className="p-icon-circle"><Cpu size={24} /></div>
                            <span>Autonomous Action Proposals</span>
                        </li>
                        <li className="p-list-item">
                            <div className="p-icon-circle"><Folder size={24} /></div>
                            <span>Multi-File Refactoring</span>
                        </li>
                    </ul>
                    <div className="p-terminal">
                        <code style={{ color: 'var(--p-accent)' }}>@ai fix auth.jsx and update types</code><br />
                        <code style={{ color: '#666' }}>[Agent] Modifying src/auth/logic.js...</code><br />
                        <code style={{ color: '#4ade80' }}>[Done] Proposing internal diff.</code>
                    </div>
                </div>
            </Section>

            {/* Slide 7: Safety (Trusted Gate) */}
            <Section
                tag="Safety First"
                title="TRUSTED"
                titleSuffix=" GATE"
                subtitle="Nothing goes to production without your eyes. Review, test, and approve every line before it leaves the room."
            >
                <div className="p-grid-content">
                    <div className="p-stat-box" style={{ gridColumn: 'span 1' }}>
                        <h4 style={{ fontWeight: 800, marginBottom: '1.5rem' }}>Human Review</h4>
                        <div style={{ background: '#111', padding: '1rem', borderRadius: '12px', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
                            <div style={{ color: '#f85149' }}>- return data.map(i =&gt; i.val);</div>
                            <div style={{ color: '#3fb950' }}>+ return data?.map(i =&gt; i.val) || [];</div>
                        </div>
                        <div className="flex gap-4 mt-6">
                            <button style={{ background: '#4ade80', color: 'black', padding: '8px 20px', borderRadius: '8px', fontWeight: 800 }}>APPROVE</button>
                        </div>
                    </div>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        <div className="p-stat-box flex items-center gap-4">
                            <Shield className="text-accent" />
                            <span className="font-bold">Automated Verification</span>
                        </div>
                        <div className="p-stat-box flex items-center gap-4">
                            <BarChart className="text-accent" />
                            <span className="font-bold">Test Suite Feedback</span>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Slide 8: Delivery (Push) */}
            <Section
                tag="Delivery"
                title="SECURE"
                titleSuffix=" PUSH"
                subtitle="Once approved, DevRooms.ai pushes the changes back to your Git provider, closing the loop."
            >
                <div className="p-grid-content">
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        <div className="p-stat-box flex items-center gap-4">
                            <GitMerge className="text-accent" />
                            <div>
                                <h4 style={{ fontWeight: 800 }}>Auto-Push</h4>
                                <p className="text-sm p-text-dim">Pushes to your branch upon approval.</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-terminal">
                        <code style={{ color: '#666' }}>[System] Testing changes... Passed.</code><br />
                        <code style={{ color: '#666' }}>[System] Pushing to origin/main...</code><br />
                        <code style={{ color: '#4ade80' }}>[Success] Commit b5f2a1 pushed.</code>
                    </div>
                </div>
            </Section>

            {/* Slide 9: Toolbox (Commands) */}
            <Section
                tag="The Toolbox"
                title="AI COMMAND"
                titleSuffix=" CENTER"
                subtitle="One mention. Targeted actions. The AI reads the entire thread to provide the perfect fix."
            >
                <div className="p-grid-content">
                    <div className="p-stat-box">
                        <span className="p-tag" style={{ margin: 0 }}>@ai fix</span>
                        <p className="text-sm p-text-dim mt-2">Instant bug patches</p>
                    </div>
                    <div className="p-stat-box">
                        <span className="p-tag" style={{ margin: 0, color: '#d2a8ff' }}>@ai refactor</span>
                        <p className="text-sm p-text-dim mt-2">Clean, optimal code</p>
                    </div>
                    <div className="p-stat-box">
                        <span className="p-tag" style={{ margin: 0, color: '#7ee787' }}>@ai tests</span>
                        <p className="text-sm p-text-dim mt-2">Generate unit tests</p>
                    </div>
                    <div className="p-stat-box">
                        <span className="p-tag" style={{ margin: 0, color: '#79c0ff' }}>@ai explain</span>
                        <p className="text-sm p-text-dim mt-2">Code walkthroughs</p>
                    </div>
                </div>
            </Section>

            {/* Slide 10: Final */}
            <Section
                tag="Conclusion"
                title="FUTURE OF"
                titleSuffix=" DEV"
                subtitle="Built with passion by HackathonTeam. Context-driven engineering starts here."
            >
                <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                    <Link to="/" style={{
                        background: 'var(--p-accent)',
                        color: 'black',
                        padding: '1.5rem 5rem',
                        borderRadius: '16px',
                        fontWeight: 800,
                        display: 'inline-block',
                        textTransform: 'uppercase',
                        fontSize: '1.2rem',
                        boxShadow: '0 20px 40px var(--p-accent-glow)'
                    }}>
                        Launch MVP
                    </Link>
                    <p className="p-text-dim" style={{ marginTop: '3rem', fontSize: '0.9rem' }}>
                        © 2026 HackathonTeam — Real-time Git Intelligence
                    </p>
                </div>
            </Section>
        </div>
    );
};

export default DesignGuide;
