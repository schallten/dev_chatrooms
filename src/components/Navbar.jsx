import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Github, Bell } from 'lucide-react';

import { useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const isLanding = location.pathname === '/';
    const isDesignGuide = location.pathname === '/design-guide';

    if (isDesignGuide) return null;

    React.useEffect(() => {
        const body = document.body;
        // ensure we start with a known theme state
        body.classList.remove('theme-dark');
        if (!body.classList.contains('theme-slate') && !body.classList.contains('theme-black')) {
            body.classList.add('theme-slate');
        }
    }, []);

    const toggleTheme = () => {
        const body = document.body;
        body.classList.remove('theme-dark');
        if (body.classList.contains('theme-black')) {
            body.classList.replace('theme-black', 'theme-slate');
        } else {
            body.classList.replace('theme-slate', 'theme-black');
        }
    };

    return (
        <nav className="glass" style={{
            position: 'sticky',
            top: 0,
            left: 0,
            right: 0,
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 2rem',
            zIndex: 1000,
            borderTop: 'none',
            borderLeft: 'none',
            borderRight: 'none'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div className="bg-gold" style={{
                    padding: '6px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Terminal size={20} color="#0d1117" />
                </div>
                <span style={{
                    fontWeight: 700,
                    fontSize: '1.25rem',
                    letterSpacing: '-0.02em',
                    fontFamily: 'var(--font-ui)'
                }}>
                    DevRooms<span className="text-gold">.ai</span>
                </span>
            </div>

            {isLanding ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <Link to="/design-guide" style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>Pitch Deck</Link>
                    <a href="#features" style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>Features</a>
                    <a href="#about" style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>Pricing</a>
                    <Link to="/workspace" className="glow-hover" style={{
                        backgroundColor: 'var(--color-accent)',
                        color: '#0d1117',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        transition: 'var(--transition-fast)'
                    }}>
                        Get Started
                    </Link>
                    <button
                        onClick={toggleTheme}
                        style={{ color: 'var(--color-text-secondary)', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                        🌓
                    </button>
                </div>
            ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    {/* search shortcut hint */}
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>⌘K</span>
                    <button style={{ position: 'relative', color: 'var(--color-text-secondary)' }}>
                        <Bell size={20} />
                        <div style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', background: 'var(--color-accent)', borderRadius: '50%', border: '2px solid var(--color-bg-deep)' }}></div>
                    </button>
                    <button
                        onClick={toggleTheme}
                        style={{ color: 'var(--color-text-secondary)', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                        🌓
                    </button>
                    <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--color-accent)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                            color: '#0d1117',
                            fontSize: '0.9rem'
                        }}>
                            AR
                        </div>
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
