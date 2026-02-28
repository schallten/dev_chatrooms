import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { RoomProvider } from './contexts/RoomContext';
import Landing from './pages/Landing';
import Invite from './pages/Invite';
import WorkspaceOnboarding from './pages/WorkspaceOnboarding';
import Dashboard from './pages/Dashboard';
import ChatRoom from './pages/ChatRoom';
import CreateRoom from './pages/CreateRoom';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel';
import DesignGuide from './pages/DesignGuide';
import Navbar from './components/Navbar';
import { Zap } from 'lucide-react';

// Protected route component
const ProtectedRoute = ({ element }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                fontSize: '1.2rem',
                color: 'var(--color-text-secondary)'
            }}>
                Loading...
            </div>
        );
    }

    return isAuthenticated ? element : <Navigate to="/" replace />;
};

// App content component (uses auth hook)
const AppContent = () => {
    const { isAuthenticated } = useAuth();

    return (
        <Router>
            {isAuthenticated && <Navbar />}
            <div className="app-container">
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/design-guide" element={<DesignGuide />} />
                    <Route path="/workspace" element={<ProtectedRoute element={<WorkspaceOnboarding />} />} />
                    <Route path="/invite" element={<ProtectedRoute element={<Invite />} />} />
                    <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
                    <Route path="/room/:id" element={<ProtectedRoute element={<ChatRoom />} />} />
                    <Route path="/create-room" element={<ProtectedRoute element={<CreateRoom />} />} />
                    <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
                    <Route path="/admin" element={<ProtectedRoute element={<AdminPanel />} />} />
                </Routes>
            </div>

            {!isAuthenticated && (
                <a href="#demo" className="floating-demo">
                    <Zap size={18} />
                    Live Demo
                </a>
            )}
        </Router>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <RoomProvider>
                <AppContent />
            </RoomProvider>
        </AuthProvider>
    );
};

export default App;
