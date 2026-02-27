import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Terminal, Shield, Cpu, Zap, Code, GitBranch, Folder,
    ArrowRight, MessageSquare, Archive, Bug, Eye,
    Link2, VolumeX, Search, Plus, Users, CheckCircle
} from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }) => (
    <div className="glass glow-hover" style={{
        padding: '2rem',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        transition: 'var(--transition-base)'
    }}>
        <div className="bg-gold" style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Icon size={20} color="#0d1117" />
        </div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{title}</h3>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>{description}</p>
    </div>
);

const Landing = () => {
    const [activeMode, setActiveMode] = useState('bug');

    return (
        <div style={{ background: 'var(--color-bg-deep)' }}>

            {/* HERO SECTION */}
            <section className="landing-bg" style={{
                minHeight: '90vh',
                display: 'flex',
                alignItems: 'center',
                padding: '0 4rem',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div className="noise"></div>
                <div style={{
                    position: 'absolute',
                    top: '-10%',
                    right: '-5%',
                    width: '600px',
                    height: '600px',
                    background: 'radial-gradient(circle, rgba(240, 165, 0, 0.1) 0%, transparent 70%)',
                    zIndex: -1
                }}></div>

                <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 style={{ fontSize: '4.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>
                            Chat in Rooms with your team's <span className="text-gold">private engineering brain.</span><br />AI-powered bug fixes delivered instantly.
                        </h1>
                        <p style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)', marginBottom: '2.5rem', maxWidth: '800px', margin: '0 auto 3rem', lineHeight: 1.6 }}>
                            From <code style={{ color: 'var(--color-accent)' }}>git clone</code> to shipped feature, entirely inside DevRooms.
                        </p>

                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            <Link to="/workspace" className="glow-hover" style={{
                                backgroundColor: 'var(--color-accent)',
                                color: '#0d1117',
                                padding: '16px 32px',
                                borderRadius: '8px',
                                fontSize: '1.1rem',
                                fontWeight: 700,
                                display: 'flex',
                                alignItems: 'center', gap: '8px'
                            }}>
                                <Terminal size={18} />
                                Create Workspace
                            </Link>
                            <Link to="/invite" className="glass glow-hover" style={{
                                padding: '16px 32px',
                                borderRadius: '8px',
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                color: 'var(--color-text-primary)'
                            }}>
                                Join Workspace
                            </Link>
                            <a href="#demo" className="glow-hover-blue" style={{
                                padding: '16px 32px',
                                borderRadius: '8px',
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                color: 'var(--color-accent-2)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                Open Live Demo <ArrowRight size={18} />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* NEW SECTION 1 — The Workflow Strip */}
            <section style={{ borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', background: 'rgba(255,255,255,0.02)' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex' }}>
                    {[
                        { icon: MessageSquare, cmd: 'Open Room', desc: 'Start a chat tied to a file, bug, or feature.' },
                        { icon: Bug, cmd: 'Describe', desc: 'Explain what’s broken or what you need.' },
                        { icon: MessageSquare, cmd: '@AI fix', desc: 'Let AI suggest patches, refactors, or explanations.' },
                        { icon: CheckCircle, cmd: 'Resolve', desc: 'Mark the thread done and archive for future reference.' }
                    ].map((step, idx) => (
                        <div key={idx} className="workflow-step">
                            <div style={{ color: 'var(--color-accent)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                                <step.icon size={24} />
                            </div>
                            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: '0.5rem' }}>{step.cmd}</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', maxWidth: '200px', margin: '0 auto' }}>{step.desc}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* NEW SECTION 2 — The IDE Preview */}
            <section id="demo" style={{ padding: '8rem 4rem', maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>A real editor. Inside your team's chat.</h2>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.25rem' }}>No more pasting code into ChatGPT. Select, ask, fix — right where your team is already talking.</p>
                </div>

                <div className="ide-preview" style={{ position: 'relative' }}>
                    {/* Sidebar */}
                    <div style={{ background: '#161b22', borderRight: '1px solid var(--color-border)', padding: '1rem' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>Explorer</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Folder size={14} /> src</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', paddingLeft: '1rem' }}><Folder size={14} /> components</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', paddingLeft: '2rem', color: 'var(--color-accent)' }}><Code size={14} /> Button.tsx</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', paddingLeft: '2rem' }}><Code size={14} /> Navbar.tsx</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Folder size={14} /> api</div>
                        </div>
                    </div>
                    {/* Editor */}
                    <div style={{ background: '#0d1117', padding: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
                        <div style={{ display: 'flex' }}>
                            <div style={{ color: 'var(--color-text-muted)', borderRight: '1px solid var(--color-border)', paddingRight: '1rem', marginRight: '1rem', textAlign: 'right', minWidth: '30px' }}>
                                1<br />2<br />3<br />4<br />5<br />6<br />7<br />8<br />9
                            </div>
                            <div style={{ color: 'var(--color-text-primary)' }}>
                                <span style={{ color: '#ff7b72' }}>export const</span> <span style={{ color: '#d2a8ff' }}>Button</span> = ({`{ children, onClick }`}) =&gt; {'{'}<br />
                                &nbsp;&nbsp;<span style={{ color: '#ff7b72' }}>return</span> (<br />
                                <div style={{ background: 'rgba(240, 165, 0, 0.1)', borderLeft: '2px solid var(--color-accent)' }}>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span style={{ color: '#7ee787' }}>button</span> <span style={{ color: '#79c0ff' }}>onClick</span>={'{onClick}'}&gt;<br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'{children}'}<br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span style={{ color: '#7ee787' }}>button</span>&gt;
                                </div>
                                &nbsp;&nbsp;);<br />
                                {'}'};
                            </div>
                        </div>
                    </div>
                    {/* AI Chat */}
                    <div style={{ background: '#010409', borderLeft: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)', fontWeight: 600, fontSize: '0.9rem' }}>AI Assistant</div>
                        <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ background: 'var(--color-bg-card)', padding: '0.75rem', borderRadius: '8px', fontSize: '0.8rem' }}>
                                <span style={{ color: 'var(--color-accent)', fontWeight: 700 }}>@Alex:</span> @AI fix selected
                            </div>
                            <div style={{ border: '1px solid var(--color-border)', padding: '0.75rem', borderRadius: '8px', fontSize: '0.8rem' }}>
                                <div style={{ color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>AI Response:</div>
                                <div style={{ background: '#1c1f23', padding: '0.5rem', borderRadius: '4px', marginBottom: '0.5rem' }}>
                                    <div style={{ color: '#f85149' }}>- &lt;button onClick={'{onClick}'}&gt;</div>
                                    <div style={{ color: '#3fb950' }}>+ &lt;button onClick={'{onClick}'} className="btn"&gt;</div>
                                </div>
                                <div style={{ color: 'var(--color-accent)', fontSize: '0.7rem' }}>Click to apply fix →</div>
                            </div>
                        </div>
                        <div style={{ padding: '1rem', borderTop: '1px solid var(--color-border)' }}>
                            <div style={{ background: 'var(--color-bg-card)', padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--color-border)', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Type Command (@AI)...</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* NEW SECTION 3 — Feature Deep Dives */}
            <section style={{ padding: '8rem 4rem', maxWidth: '1200px', margin: '0 auto' }}>
                {[
                    {
                        title: 'Persistent Rooms',
                        desc: 'Each issue or file lives in its own room so your team can pick up conversations where they left off.',
                        visual: (
                            <div className="glass" style={{ padding: '1.5rem', borderRadius: '12px' }}>
                                <MessageSquare size={24} color="var(--color-accent)" />
                                <div style={{ fontWeight: 600, marginTop: '0.5rem' }}>#bug-fix-123</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>8 messages, 2 participants</div>
                            </div>
                        )
                    },
                    {
                        title: 'AI Context Awareness',
                        desc: 'The assistant knows your stack and codebase so its bug fixes feel like talking to a teammate.',
                        visual: (
                            <div className="terminal-box">
                                <div style={{ color: 'var(--color-text-secondary)', marginBottom: '10px' }}>// env: node/express/postgres</div>
                                <div style={{ color: 'var(--color-accent)' }}>@AI fix null pointer</div>
                                <div style={{ marginTop: '1rem', borderLeft: '2px solid #3fb950', paddingLeft: '1rem', color: '#7ee787' }}>
                                    // fix applied: added optional chaining
                                </div>
                            </div>
                        )
                    },

                    {
                        title: 'AI-Assisted Code Editing',
                        desc: 'Highlight any block of code, hit @AI, and choose: Fix Bug, Refactor, Add Comments, Explain, or Write Tests. The AI edits inline with a diff preview before you accept.',
                        visual: (
                            <div className="terminal-box">
                                <div style={{ color: 'var(--color-text-muted)', marginBottom: '10px' }}>// Selected code...</div>
                                <div style={{ color: 'var(--color-accent)' }}>@AI generate unit tests</div>
                                <div style={{ marginTop: '1rem', borderLeft: '2px solid #3fb950', paddingLeft: '1rem', color: '#7ee787' }}>
                                    test('renders button', () =&gt; {'{'}<br />
                                    &nbsp;&nbsp;render(&lt;Button&gt;Click me&lt;/Button&gt;);<br />
                                    {'}'});
                                </div>
                            </div>
                        )
                    },
                    {
                        title: 'Resolved Thread Archive',
                        desc: 'Mark any conversation as Resolved. It gets archived and indexed so the next engineer with the same bug finds the answer in seconds.',
                        visual: (
                            <div className="glass" style={{ padding: '1.5rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '1rem', border: '1px solid #3fb950' }}>
                                <CheckCircle style={{ color: '#3fb950' }} />
                                <div>
                                    <div style={{ fontWeight: 700 }}>Thread Resolved by @Sarah</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Stored in Engineering Knowledge Base</div>
                                </div>
                            </div>
                        )
                    }
                ].map((feature, idx) => (
                    <motion.div
                        key={idx}
                        className="zigzag-row"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div style={{ flex: 1 }}>
                            <h3 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>{feature.title}</h3>
                            <p style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{feature.desc}</p>
                        </div>
                        <div style={{ flex: 1 }}>
                            {feature.visual}
                        </div>
                    </motion.div>
                ))}
            </section>

            {/* NEW SECTION 4 — The @AI Command Reference */}
            <section style={{ padding: '8rem 4rem', background: '#000' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '3rem' }}>One mention. Infinite context.</h2>
                    <div className="terminal-box" style={{ textAlign: 'left', maxWidth: '700px', margin: '0 auto' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', fontFamily: 'var(--font-mono)' }}>
                            <div style={{ color: 'var(--color-accent)' }}>@AI fix selected</div><div style={{ color: 'var(--color-text-secondary)' }}>→ auto-fix highlighted code</div>
                            <div style={{ color: 'var(--color-accent)' }}>@AI explain</div><div style={{ color: 'var(--color-text-secondary)' }}>→ plain English explanation</div>
                            <div style={{ color: 'var(--color-accent)' }}>@AI refactor</div><div style={{ color: 'var(--color-text-secondary)' }}>→ cleaner version of your code</div>
                            <div style={{ color: 'var(--color-accent)' }}>@AI add tests</div><div style={{ color: 'var(--color-text-secondary)' }}>→ generate unit tests</div>
                            <div style={{ color: 'var(--color-accent)' }}>@AI document</div><div style={{ color: 'var(--color-text-secondary)' }}>→ add JSDoc/docstring comments</div>
                            <div style={{ color: 'var(--color-accent)' }}>@AI why is this slow</div><div style={{ color: 'var(--color-text-secondary)' }}>→ performance analysis</div>
                            <div style={{ color: 'var(--color-accent)' }}>@AI debug</div><div style={{ color: 'var(--color-text-secondary)' }}>→ find the bug in snippet</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* NEW SECTION 5 — Modes */}
            <section style={{ padding: '8rem 4rem', maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>Set the mood for your session.</h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem' }}>
                    {[
                        { id: 'bug', name: 'Bug Hunt', icon: Bug, desc: 'AI proactive watching.', color: 'var(--color-mode-bug)' },
                        { id: 'review', name: 'Code Review', icon: Eye, desc: 'Lightweight PR reviews.', color: 'var(--color-mode-review)' },
                        { id: 'brain', name: 'Brainstorm', icon: Zap, desc: 'Low distraction.', color: 'var(--color-mode-brainstorm)' },
                        { id: 'pair', name: 'Pair Program', icon: Link2, desc: 'Synced editor.', color: 'var(--color-mode-pair)' },
                        { id: 'silent', name: 'Silent Mode', icon: VolumeX, desc: 'Zero interruptions.', color: 'var(--color-mode-silent)' },
                    ].map(mode => (
                        <div
                            key={mode.id}
                            onClick={() => setActiveMode(mode.id)}
                            className={`mode-card ${activeMode === mode.id ? `active-${mode.id}` : ''}`}
                            style={{
                                textAlign: 'center',
                                background: activeMode === mode.id ? 'rgba(255,255,255,0.05)' : 'transparent'
                            }}
                        >
                            <mode.icon size={32} style={{ color: mode.color, marginBottom: '1rem' }} />
                            <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>{mode.name}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{mode.desc}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* NEW SECTION 6 — Social Proof Strip */}
            <section style={{ padding: '4rem', background: '#0d1117', borderTop: '1px solid var(--color-border)' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '6rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    {[
                        { name: 'Meridian Labs', quote: '"We replaced our entire Slack + GitHub workflow."' },
                        { name: 'Stackforge', quote: '"Saves our team 2 hours daily."' },
                        { name: 'NovaBuild', quote: '"Engineering intelligence at its best."' }
                    ].map(logo => (
                        <div key={logo.name} style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--color-text-muted)', marginBottom: '0.5rem', letterSpacing: '-0.05em' }}>{logo.name}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', fontStyle: 'italic', maxWidth: '200px' }}>{logo.quote}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* NEW SECTION 7 — Workspace Setup CTA */}
            <section style={{ padding: '8rem 4rem', textAlign: 'center' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '4rem' }}>Ready to ship?</h2>

                    <div style={{ display: 'flex', gap: '2rem', marginBottom: '4rem' }}>
                        {[
                            { step: '1', title: 'Create Workspace', desc: 'Secure your team name (30s).' },
                            { step: '2', title: 'Invite Engineers', desc: 'Link or email domain.' },
                            { step: '3', title: 'Clone & Ship', desc: 'Your first room awaits.' }
                        ].map(item => (
                            <div key={item.step} style={{ flex: 1, textAlign: 'left' }}>
                                <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--color-accent)', marginBottom: '1rem' }}>{item.step}</div>
                                <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>{item.title}</div>
                                <div style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>{item.desc}</div>
                            </div>
                        ))}
                    </div>

                    <Link to="/workspace" className="glow-hover" style={{
                        backgroundColor: 'var(--color-accent)',
                        color: '#0d1117',
                        padding: '18px 48px',
                        borderRadius: '8px',
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        display: 'inline-block',
                        marginBottom: '1.5rem'
                    }}>
                        Create Your Workspace — Free
                    </Link>
                    <br />
                    <Link to="/invite" style={{ color: 'var(--color-text-secondary)', fontSize: '1rem' }}>
                        Or join an existing workspace →
                    </Link>
                </div>
            </section>

            {/* FOOTER UPGRADES */}
            <footer style={{ padding: '8rem 4rem 4rem', background: '#010409', borderTop: '1px solid var(--color-border)' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr repeat(4, 1fr)', gap: '4rem' }}>
                    <div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '1rem', color: '#fff' }}>DevRooms.ai</div>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                            Engineering intelligence, built for teams.
                        </p>
                    </div>
                    {[
                        { title: 'Product', links: ['Features', 'Modes', 'Pricing', 'Changelog'] },
                        { title: 'Company', links: ['About', 'Hackathon 2026', 'Team Alpha'] },
                        { title: 'Developers', links: ['Docs', 'API', 'GitHub'] },
                        { title: 'Legal', links: ['Privacy', 'Terms'] }
                    ].map(col => (
                        <div key={col.title}>
                            <h4 style={{ fontWeight: 700, marginBottom: '1.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{col.title}</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                                {col.links.map(link => <a key={link} href="#">{link}</a>)}
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{ maxWidth: '1200px', margin: '4rem auto 0', paddingTop: '2rem', borderTop: '1px solid #161b22', color: 'var(--color-text-muted)', fontSize: '0.8rem', textAlign: 'center' }}>
                    © 2026 DevRooms. All rights reserved. Built for the Hackathon by Team Alpha.
                </div>
            </footer>

            {/* Keyboard Shortcuts Hint */}
            <div style={{ position: 'fixed', left: '2rem', bottom: '2rem', fontSize: '0.7rem', color: 'var(--color-text-muted)', display: 'flex', gap: '1rem' }}>
                <div><code>⌘K</code> Search rooms</div>
                <div><code>⌘Enter</code> Send</div>
                <div><code>⌘Shift+A</code> @AI</div>
            </div>
        </div>
    );
};

export default Landing;
