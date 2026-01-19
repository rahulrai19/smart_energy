import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Assistant from './pages/Assistant';
import Forecast from './pages/Forecast';
import Devices from './pages/Devices';
import Insights from './pages/Insights';
import Reports from './pages/Reports';
import ChatInterface from './components/chat/ChatInterface';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Feedback from './pages/Feedback';
import { Bot, X, Loader } from 'lucide-react';

function AppContent() {
    const { user, loading, logout } = useAuth();
    const [activePage, setActivePage] = useState('dashboard');
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [showSignup, setShowSignup] = useState(false);

    React.useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    const handleNavigate = (page) => {
        setActivePage(page);
        if (page === 'assistant') {
            setIsChatOpen(false);
        }
    };

    const renderPage = () => {
        switch (activePage) {
            case 'dashboard': return <Dashboard onOpenChat={() => setIsChatOpen(true)} />;
            case 'devices': return <Devices />;
            case 'forecast': return <Forecast />;
            case 'insights': return <Insights />;
            case 'reports': return <Reports />;
            case 'feedback': return <Feedback />;
            case 'assistant': return <Assistant onNavigate={handleNavigate} />;
            case 'settings': return <Settings />;
            default: return <Dashboard />;
        }
    }

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-background text-foreground">
                <Loader className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!user) {
        if (showSignup) {
            return <Signup onNavigateLogin={() => setShowSignup(false)} />;
        }
        return <Login onNavigateSignup={() => setShowSignup(true)} />;
    }

    return (
        <MainLayout
            activePage={activePage}
            setActivePage={setActivePage}
            onLogout={logout}
            user={user}
            isDarkMode={isDarkMode}
            toggleTheme={toggleTheme}
        >
            {renderPage()}

            {/* Floating Chat Popup */}
            {isChatOpen && activePage !== 'assistant' && (
                <div className="fixed bottom-24 right-6 w-[350px] sm:w-[500px] z-50">
                    <ChatInterface
                        className="h-[600px] shadow-2xl border-primary/20"
                        onNavigate={handleNavigate}
                        onClose={() => setIsChatOpen(false)}
                    />
                </div>
            )}

            {/* Floating Toggle Button */}
            {activePage !== 'assistant' && (
                <button
                    onClick={() => setIsChatOpen(!isChatOpen)}
                    className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-primary shadow-xl hover:bg-primary/90 flex items-center justify-center text-primary-foreground transition-transform hover:scale-105 z-50"
                >
                    {isChatOpen ? <X className="h-6 w-6" /> : <Bot className="h-8 w-8" />}
                </button>
            )}
        </MainLayout>
    );
}

function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

export default App;
