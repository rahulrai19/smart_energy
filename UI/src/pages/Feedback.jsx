import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { submitFeedback, getFeedback, updateFeedbackStatus } from '../services/api';
import { Send, AlertCircle, MessageSquare, CheckCircle, List, User, Lock, Unlock } from 'lucide-react';

const Feedback = () => {
    const { user } = useAuth();
    const [type, setType] = useState('query');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // 'success' | 'error'
    const [statusMsg, setStatusMsg] = useState('');

    // Admin State
    const [feedbacks, setFeedbacks] = useState([]);
    const isAdmin = user?.email === 'protocolpsi@gmail.com';

    useEffect(() => {
        if (isAdmin) {
            fetchFeedbacks();
        }
    }, [isAdmin]);

    const fetchFeedbacks = async () => {
        try {
            const data = await getFeedback();
            setFeedbacks(data);
        } catch (error) {
            console.error("Failed to fetch feedback", error);
        }
    };

    const handleStatusToggle = async (id, currentStatus) => {
        try {
            const newStatus = currentStatus === 'open' ? 'closed' : 'open';
            await updateFeedbackStatus(id, newStatus);
            fetchFeedbacks();
        } catch (error) {
            alert("Failed to update status");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            await submitFeedback(type, message);
            setStatus('success');
            setStatusMsg('Thank you! Your feedback has been submitted successfully.');
            setMessage('');
            if (isAdmin) fetchFeedbacks(); // Refresh list if admin submits (for testing)
        } catch (error) {
            setStatus('error');
            setStatusMsg('Failed to submit feedback. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8 fade-in pb-10 max-w-4xl mx-auto">

            {/* Header */}
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
                    <MessageSquare className="h-8 w-8 text-primary" />
                    Feedback & Support
                </h1>
                <p className="text-muted-foreground">
                    Have a question or found a bug? Let us know.
                </p>
            </div>

            {/* Submission Form - Only for Non-Admins */}
            {!isAdmin && (
                <div className="rounded-3xl glass-card p-8 border border-white/5 shadow-xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Feedback Type</label>
                                <select
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                >
                                    <option value="query" className="bg-background text-foreground">General Query</option>
                                    <option value="bug" className="bg-background text-foreground">Report a Bug</option>
                                    <option value="feature" className="bg-background text-foreground">Feature Request</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Your Email</label>
                                <input
                                    type="text"
                                    value={user?.email || ''}
                                    disabled
                                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-muted-foreground cursor-not-allowed"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Message</label>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                                rows={5}
                                placeholder="Describe your issue or query here..."
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
                            />
                        </div>

                        {status && (
                            <div className={`p-4 rounded-xl flex items-center gap-3 ${status === 'success' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-destructive/10 text-destructive border border-destructive/20'}`}>
                                {status === 'success' ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                                <p className="text-sm font-medium">{statusMsg}</p>
                            </div>
                        )}

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={loading || !message.trim()}
                                className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <span className="animate-pulse">Submitting...</span>
                                ) : (
                                    <>
                                        <Send className="mr-2 h-4 w-4" />
                                        Submit Feedback
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Admin Section */}
            {isAdmin && (
                <div className="space-y-6 pt-8 border-t border-white/10">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent flex items-center gap-2">
                            <User className="h-6 w-6 text-red-400" />
                            Admin Dashboard
                        </h2>
                        <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-muted-foreground">
                            {feedbacks.length} Items
                        </span>
                    </div>

                    <div className="rounded-3xl glass-card border border-white/5 shadow-xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-white/5 text-muted-foreground font-medium">
                                    <tr>
                                        <th className="px-6 py-4">Date</th>
                                        <th className="px-6 py-4">User</th>
                                        <th className="px-6 py-4">Type</th>
                                        <th className="px-6 py-4">Message</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {feedbacks.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                                                No feedback found.
                                            </td>
                                        </tr>
                                    ) : (
                                        feedbacks.map((item) => (
                                            <tr key={item._id} className="hover:bg-white/5 transition-colors">
                                                <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">
                                                    {new Date(item.timestamp).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-medium text-foreground">{item.name}</div>
                                                    <div className="text-xs text-muted-foreground">{item.email}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize
                                                        ${item.type === 'bug' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                                                            item.type === 'feature' ? 'bg-purple-500/10 text-purple-500 border border-purple-500/20' :
                                                                'bg-blue-500/10 text-blue-500 border border-blue-500/20'}`}>
                                                        {item.type}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-foreground/80 max-w-xs truncate" title={item.message}>
                                                    {item.message}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium uppercase tracking-wider border
                                                        ${item.status === 'closed' 
                                                            ? 'bg-red-500/10 text-red-500 border-red-500/20' 
                                                            : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'}`}>
                                                        {item.status || 'open'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <button
                                                        onClick={() => handleStatusToggle(item._id, item.status || 'open')}
                                                        className={`p-2 rounded-lg transition-colors flex items-center gap-2 text-xs font-medium border
                                                            ${item.status === 'closed' 
                                                                ? 'text-emerald-500 hover:bg-emerald-500/10 border-emerald-500/20' 
                                                                : 'text-red-500 hover:bg-red-500/10 border-red-500/20'}`}
                                                    >
                                                        {item.status === 'closed' ? (
                                                            <>
                                                                <Unlock className="h-4 w-4" />
                                                                Re-open
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Lock className="h-4 w-4" />
                                                                Close
                                                            </>
                                                        )}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Feedback;
