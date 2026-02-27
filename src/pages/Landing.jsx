import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MockChat from '../components/MockChat';
import { Terminal, Shield, Cpu, Zap, Code } from 'lucide-react';

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
    return (
        <div style={{ paddingTop: '64px' }}>
            <Navbar />

            {/* Hero Section */}
            <section className="landing-bg" style={{
                minHeight: 'calc(100vh - 64px)',
                display: 'flex',
                alignItems: 'center',
                padding: '0 4rem',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div className="noise"></div>
                {/* Background Gradients */}
                <div style={{
                    position: 'absolute',
                    top: '-10%',
                    right: '-5%',
                    width: '500px',
                    height: '500px',
                    background: 'radial-gradient(circle, rgba(240, 165, 0, 0.08) 0%, transparent 70%)',
                    zIndex: -1
                }}></div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'center', width: '100%', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '6px 12px',
                            borderRadius: '20px',
                            background: 'rgba(240, 165, 0, 0.1)',
                            border: '1px solid rgba(240, 165, 0, 0.2)',
                            marginBottom: '2rem'
                        }}>
                            <Zap size={14} className="text-gold" />
                            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                Next-Gen Dev Collaboration
                            </span>
                        </div>

                        <h1 style={{ fontSize: '4.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>
                            Built for <span className="text-gold">Engineering Teams</span>, Powered by <span style={{ fontStyle: 'italic' }}>AI.</span>
                        </h1>
                        <p style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)', marginBottom: '2.5rem', maxWidth: '540px', lineHeight: 1.6 }}>
                            Real-time chat rooms with integrated AI assistants that understand your code. Debug, brainstorm, and build faster together.
                        </p>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <Link to="/workspace" className="glow-hover" style={{
                                backgroundColor: 'var(--color-accent)',
                                color: '#0d1117',
                                padding: '14px 28px',
                                borderRadius: '8px',
                                fontSize: '1rem',
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center', gap: '8px'
                            }}>
                                <Terminal size={18} />
                                Create Workspace
                            </Link>
                            <Link to="/invite" className="glass glow-hover" style={{
                                padding: '14px 28px',
                                borderRadius: '8px',
                                fontSize: '1rem',
                                fontWeight: 600,
                                color: 'var(--color-text-primary)'
                            }}>
                                Join Workspace
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <MockChat />
                    </motion.div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how" style={{ padding: '6rem 4rem', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1.5rem' }}>How It Works</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                    {[
                        {step: '1', title: 'Join a Room', desc: 'Hop into an existing dev space or spin one up instantly.'},
                        {step: '2', title: 'Share Your Code', desc: 'Post snippets, ask questions, and collaborate in real time.'},
                        {step: '3', title: 'Mention @AI', desc: "Trigger the AI helper to analyze, debug, or explain code."}
                    ].map(item => (
                        <div key={item.step} className="glass-card" style={{ padding: '2rem', borderRadius: '12px' }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-accent-2)' }}>{item.step}</div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, margin: '0.5rem 0' }}>{item.title}</h3>
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section id="features" style={{ padding: '8rem 4rem', maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>Engineered for Performance</h2>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem' }}>Everything you need to ship better software as a team.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    <FeatureCard
                        icon={Cpu}
                        title="Context-Aware AI"
                        description="Mention @AI in any chat to get instant help with debugging, refactoring, or documentation."
                    />
                    <FeatureCard
                        icon={Code}
                        title="Rich Code Blocks"
                        description="Automatic syntax highlighting for 100+ languages with copy-to-clipboard functionality."
                    />
                    <FeatureCard
                        icon={Shield}
                        title="Private Dev Spaces"
                        description="Create secure, encrypted rooms for your private projects or enterprise-grade security."
                    />
                </div>
            </section>

            {/* Footer */}
            <footer style={{ padding: '4rem 2rem', textAlign: 'center', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                <div>AI-Powered Dev Chat Rooms &mdash; Team Alpha</div>
                <div>Hackathon 2026</div>
            </footer>
        </div>
    );
};

export default Landing;
