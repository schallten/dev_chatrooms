import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Invite from './pages/Invite';
import WorkspaceOnboarding from './pages/WorkspaceOnboarding';
import Dashboard from './pages/Dashboard';
import ChatRoom from './pages/ChatRoom';
import CreateRoom from './pages/CreateRoom';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel';
import Navbar from './components/Navbar';

const App = () => {
    return (
        <Router>
            <Navbar />
            <div className="app-container" style={{ paddingTop: '64px' }}>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/workspace" element={<WorkspaceOnboarding />} />
                    <Route path="/invite" element={<Invite />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/room/:id" element={<ChatRoom />} />
                    <Route path="/create-room" element={<CreateRoom />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/admin" element={<AdminPanel />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
