import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Terminal, Github, Bell, LogOut, Settings } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const isLanding = location.pathname === '/';
    const isDesignGuide = location.pathname === '/design-guide';
    const [showDropdown, setShowDropdown] = useState(false);

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

    const handleLogout = () => {
        logout();
        navigate('/');
        setShowDropdown(false);
    };

    const userInitials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';

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
            <Link to={isLanding ? '/' : '/dashboard'} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
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
                    fontFamily: 'var(--font-ui)',
                    color: 'var(--color-text-primary)'
                }}>
                    DevRooms<span className="text-gold">.ai</span>
                </span>
            </Link>

            {isLanding && !user ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <Link to="/design-guide" style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>Pitch Deck</Link>
                    <a href="#features" style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>Features</a>
                    <a href="#about" style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>Pricing</a>
                    <button
                        onClick={toggleTheme}
                        style={{ color: 'var(--color-text-secondary)', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                        🌓
                    </button>
                </div>
            ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', position: 'relative' }}>
                    {/* search shortcut hint */}
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>⌘K</span>
                    <button style={{ position: 'relative', color: 'var(--color-text-secondary)', background: 'none', border: 'none', cursor: 'pointer' }}>
                        <Bell size={20} />
                        <div style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', background: 'var(--color-accent)', borderRadius: '50%', border: '2px solid var(--color-bg-deep)' }}></div>
                    </button>
                    <button
                        onClick={toggleTheme}
                        style={{ color: 'var(--color-text-secondary)', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                        🌓
                    </button>
                    
                    {/* User dropdown */}
                    <div style={{ position: 'relative' }}>
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '6px',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: 'var(--color-text-secondary)'
                            }}
                        >
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
                                {userInitials}
                            </div>
                        </button>

                        {showDropdown && (
                            <div style={{
                                position: 'absolute',
                                top: '100%',
                                right: 0,
                                marginTop: '0.5rem',
                                background: 'var(--color-bg-card)',
                                border: '1px solid var(--color-border)',
                                borderRadius: '8px',
                                minWidth: '200px',
                                zIndex: 1001
                            }}>
                                <div style={{
                                    padding: '1rem',
                                    borderBottom: '1px solid var(--color-border)',
                                    fontSize: '0.9rem'
                                }}>
                                    <div style={{ fontWeight: 600 }}>{user?.name || 'User'}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{user?.email}</div>
                                </div>
                                <button
                                    onClick={() => navigate('/profile')}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 1rem',
                                        border: 'none',
                                        background: 'transparent',
                                        cursor: 'pointer',
                                        textAlign: 'left',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        color: 'var(--color-text-primary)',
                                        fontSize: '0.9rem',
                                        transition: 'background 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                >
                                    <Settings size={16} />
                                    Profile
                                </button>
                                <button
                                    onClick={handleLogout}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 1rem',
                                        border: 'none',
                                        background: 'transparent',
                                        cursor: 'pointer',
                                        textAlign: 'left',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        color: '#f85149',
                                        fontSize: '0.9rem',
                                        transition: 'background 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(248, 81, 73, 0.1)'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                >
                                    <LogOut size={16} />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
