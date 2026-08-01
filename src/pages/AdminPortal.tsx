import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock,
  User,
  Mail,
  Clock,
  CheckCircle,
  Trash2,
  LogOut,
  Search,
  Filter,
  Download,
  RefreshCw,
  AlertCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Inbox,
  Loader2
} from 'lucide-react';
import CareersManagement from '../components/CareersManagement';
import JobApplicationsTab from '../components/JobApplicationsTab';

// Define feedback query structure
interface FeedbackQuery {
  id: string | number;
  email: string;
  query: string;
  date: string;
  status: 'Pending' | 'Resolved';
}

const AdminPortal: React.FC = () => {
  // Authentication states
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('pravayan_admin_logged_in') === 'true';
  });
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Tabs state
  const [activeTab, setActiveTab] = useState<'queries' | 'careers' | 'applications'>('queries');

  // Queries states
  const [queries, setQueries] = useState<FeedbackQuery[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMode, setSyncMode] = useState<'live' | 'local'>('local');
  const [expandedQueryId, setExpandedQueryId] = useState<string | number | null>(null);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'Resolved'>('All');

  // UI Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | number | null>(null);

  // Trigger brief alert/toast message
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Seed queries in localStorage or load them
  const loadInitialQueries = async () => {
    setIsSyncing(true);
    try {
      // 1. Try to fetch from real backend first
      const response = await fetch('http://localhost:3001/api/v1/feedback', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          // Normalize structure if backend model is slightly different
          const parsedQueries: FeedbackQuery[] = data.map((item: any, idx: number) => ({
            id: item.id || item._id || idx + 100,
            email: item.email || 'unknown@gmail.com',
            query: item.query || item.message || '',
            date: item.createdAt || item.date || new Date().toISOString(),
            status: item.status === 'Resolved' || item.resolved ? 'Resolved' : 'Pending',
          }));
          setQueries(parsedQueries);
          localStorage.setItem('pravayan_queries', JSON.stringify(parsedQueries));
          setSyncMode('live');
          triggerToast('Synced feedback list with live backend server.');
          setIsSyncing(false);
          return;
        }
      }
    } catch (err) {
      console.log('Backend server not reachable, falling back to local storage cache.', err);
    }

    // 2. Fallback to localStorage or empty array
    const local = localStorage.getItem('pravayan_queries');
    if (local) {
      setQueries(JSON.parse(local));
    } else {
      setQueries([]);
    }
    setSyncMode('local');
    setIsSyncing(false);
  };

  useEffect(() => {
    if (isLoggedIn) {
      loadInitialQueries();
    }
  }, [isLoggedIn]);

  // Handle authentication form submission
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    try {
      const uTrim = emailInput.trim();
      const pTrim = passwordInput;

      const response = await fetch('http://localhost:3001/api/v1/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: uTrim, password: pTrim })
      });

      if (response.ok) {
        setIsLoggedIn(true);
        localStorage.setItem('pravayan_admin_logged_in', 'true');
        setEmailInput('');
        setPasswordInput('');
        triggerToast('Welcome back, Admin.');
      } else {
        const data = await response.json();
        setLoginError(data.error || 'Invalid administrative email or password.');
      }
    } catch (err) {
      setLoginError('Failed to connect to authentication server.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Log user out
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('pravayan_admin_logged_in');
    triggerToast('Logged out successfully.');
  };

  // Toggle feedback query status (Pending <-> Resolved)
  const handleToggleStatus = async (id: string | number) => {
    const item = queries.find(q => q.id === id);
    if (!item) return;
    const nextStatus = item.status === 'Pending' ? 'Resolved' : 'Pending';

    // Update locally first for optimistic UI
    const updated = queries.map(q => {
      if (q.id === id) {
        return { ...q, status: nextStatus as 'Pending' | 'Resolved' };
      }
      return q;
    });
    setQueries(updated);
    if (syncMode === 'local') localStorage.setItem('pravayan_queries', JSON.stringify(updated));

    // Backend update if live
    if (syncMode === 'live') {
      try {
        await fetch(`http://localhost:3001/api/v1/feedback/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: nextStatus })
        });
      } catch (e) {
        console.error('Failed to sync status to backend', e);
      }
    }

    triggerToast(`Query marked as ${nextStatus}.`);
  };

  // Delete query
  const executeDeleteQuery = async (id: string | number) => {
    const updated = queries.filter(q => q.id !== id);
    setQueries(updated);
    if (syncMode === 'local') localStorage.setItem('pravayan_queries', JSON.stringify(updated));

    if (syncMode === 'live') {
      try {
        await fetch(`http://localhost:3001/api/v1/feedback/${id}`, {
          method: 'DELETE'
        });
      } catch (e) {
        console.error('Failed to delete query from backend', e);
      }
    }

    triggerToast('Query record deleted successfully.');
    setConfirmDeleteId(null);
  };

  const handleDeleteQuery = (id: string | number) => {
    setConfirmDeleteId(id);
  };

  // Export data as CSV
  const handleExportCSV = () => {
    const headers = ['ID', 'Date', 'Email', 'Query Message', 'Status'];
    const rows = queries.map(q => [
      q.id.toString(),
      new Date(q.date).toLocaleString('en-IN'),
      q.email,
      q.query.replace(/"/g, '""').replace(/\n/g, ' '),
      q.status
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.map(val => `"${val}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `pravayan_feedback_export_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast('Exported query records to CSV.');
  };

  // Sync / Refresh with server
  const handleSyncData = () => {
    loadInitialQueries();
  };

  // Filter queries based on status and search query
  const filteredQueries = queries.filter(q => {
    const matchesSearch =
      q.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.query.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' || q.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate metrics
  const totalCount = queries.length;
  const pendingCount = queries.filter(q => q.status === 'Pending').length;
  const resolvedCount = queries.filter(q => q.status === 'Resolved').length;

  return (
    <div className="min-h-screen font-body relative">

      {/* Toast Notification Banner */}
      <AnimatePresence>
        {(isLoggingIn || toastMessage) && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3 pointer-events-none"
          >
            {isLoggingIn && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white text-slate-800 text-[14px] font-medium px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 pointer-events-auto border border-slate-200/60"
              >
                <Loader2 size={16} className="animate-spin text-slate-400" />
                Signing in...
              </motion.div>
            )}
            {!isLoggingIn && toastMessage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-[#0B1525] text-white text-[14px] font-medium px-6 py-3.5 rounded-full shadow-2xl flex items-center gap-3 pointer-events-auto border border-white/5"
              >
                {toastMessage}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {confirmDeleteId && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setConfirmDeleteId(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-3xl shadow-2xl p-8 w-full max-w-sm overflow-hidden text-center"
            >
              <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 mx-auto mb-4">
                <Trash2 size={28} />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-2">Delete Query?</h3>
              <p className="text-slate-500 text-sm mb-8">
                Are you sure you want to delete this query? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmDeleteId(null)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => executeDeleteQuery(confirmDeleteId)}
                  className="flex-1 bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-rose-500/20"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {!isLoggedIn ? (
        /* ==================== LOGIN VIEW ==================== */
        <div className="min-h-screen bg-[#040E17] flex items-center justify-center p-6 relative overflow-hidden">

          {/* Decorative Background Elements */}
          <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] rounded-full bg-[#1C7C9C]/15 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-[#3DA5C4]/10 blur-[150px] pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] z-10"
          >
            <div className="text-center mb-8">
              <img
                src="/LOGO.png"
                alt="Pravayan Logo"
                className="w-auto h-20 mx-auto object-contain drop-shadow-md mb-6 hover:scale-105 transition-transform duration-300"
              />
              <h1 className="text-2xl font-heading font-extrabold text-white tracking-tight">
                Admin Control Portal
              </h1>
              <p className="text-white/50 text-xs font-bold uppercase tracking-widest mt-2">
                Authorized Personnel Only
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="flex flex-col gap-6">

              {/* Email Input */}
              <div className="flex flex-col gap-2">
                <label className="text-white/60 font-bold uppercase tracking-widest text-[11px] flex items-center gap-1.5">
                  <Mail size={13} className="text-[#3DA5C4]" /> Email Address
                </label>
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter administrator email"
                  className="w-full px-5 py-3.5 rounded-xl border border-white/10 bg-white/5 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#3DA5C4] focus:border-transparent transition-all text-white placeholder:text-white/20 font-medium text-sm"
                />
              </div>

              {/* Password Input */}
              <div className="flex flex-col gap-2">
                <label className="text-white/60 font-bold uppercase tracking-widest text-[11px] flex items-center gap-1.5">
                  <Lock size={13} className="text-[#3DA5C4]" /> Password
                </label>
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-5 py-3.5 rounded-xl border border-white/10 bg-white/5 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#3DA5C4] focus:border-transparent transition-all text-white placeholder:text-white/20 font-medium text-sm"
                />
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {loginError && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-center gap-2.5 text-rose-400 bg-rose-500/10 border border-rose-500/20 px-4 py-3 rounded-xl text-sm font-semibold">
                      <AlertCircle size={16} className="shrink-0" />
                      {loginError}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full bg-gradient-to-r from-[#1C7C9C] to-[#3DA5C4] hover:from-[#0B3C5D] hover:to-[#1C7C9C] text-white font-extrabold py-4 rounded-xl transition-all shadow-lg shadow-[#3DA5C4]/10 text-base disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0 mt-2 flex justify-center items-center gap-2"
              >
                {isLoggingIn ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Authenticate Securely'
                )}
              </button>
            </form>
          </motion.div>
        </div>
      ) : (
        /* ==================== DASHBOARD VIEW ==================== */
        <div className="min-h-screen bg-slate-50 text-slate-800">

          {/* Header Bar */}
          <header className="bg-white border-b border-slate-200/80 sticky top-0 z-30 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">

              {/* Brand Logo & Name */}
              <div className="flex items-center gap-4">
                <img
                  src="/LOGO.png"
                  alt="Logo"
                  className="w-auto h-12 object-contain"
                />
                <div className="h-6 w-px bg-slate-200" />
                <div>
                  <h2 className="text-lg font-heading font-extrabold text-[#0B3C5D] leading-none">
                    Pravayan Admin
                  </h2>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#3DA5C4] leading-none mt-1 inline-block">
                    Environmental Control
                  </span>
                </div>
              </div>

              {/* Status Sync & Logout */}
              <div className="flex items-center gap-4">

                {/* Sync Badge */}
                <div
                  className={`hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${syncMode === 'live'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${syncMode === 'live' ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`} />
                  {syncMode === 'live' ? 'Live DB Synced' : 'Offline Mode (Local Cache)'}
                </div>

                {/* Refresh Database */}
                <button
                  onClick={handleSyncData}
                  disabled={isSyncing}
                  title="Force Sync Feedback Database"
                  className="p-2.5 text-slate-500 hover:text-[#3DA5C4] hover:bg-slate-100 rounded-full transition-all border border-slate-100"
                >
                  <RefreshCw size={16} className={`${isSyncing ? 'animate-spin text-[#3DA5C4]' : ''}`} />
                </button>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-slate-900 text-white text-sm font-bold px-4 py-2.5 rounded-full hover:bg-rose-600 hover:shadow-lg hover:shadow-rose-500/10 transition-all duration-300"
                >
                  <LogOut size={14} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>

            </div>
          </header>

          {/* Main Dashboard Space */}
          <main className="max-w-7xl mx-auto px-6 md:px-12 py-10">

            {/* TABS */}
            <div className="flex gap-4 mb-8 border-b border-slate-200">
              <button
                onClick={() => setActiveTab('queries')}
                className={`py-3 px-6 font-bold border-b-2 transition-colors ${activeTab === 'queries' ? 'border-[#3DA5C4] text-[#3DA5C4]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
              >
                Feedback Queries
              </button>
              <button
                onClick={() => setActiveTab('careers')}
                className={`py-3 px-6 font-bold border-b-2 transition-colors ${activeTab === 'careers' ? 'border-[#3DA5C4] text-[#3DA5C4]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
              >
                Job Portal
              </button>
              <button
                onClick={() => setActiveTab('applications')}
                className={`py-3 px-6 font-bold border-b-2 transition-colors ${activeTab === 'applications' ? 'border-[#3DA5C4] text-[#3DA5C4]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
              >
                Job Applications
              </button>
            </div>

            {activeTab === 'queries' ? (
              <>
                {/* Page Header */}
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div></div>

                  {/* CSV Export Button */}
                  <button
                    onClick={handleExportCSV}
                    disabled={queries.length === 0}
                    className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 hover:text-[#1C7C9C] hover:border-[#1C7C9C] text-sm font-bold px-5 py-3 rounded-xl shadow-sm hover:shadow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Download size={15} />
                    Export CSV Records
                  </button>
                </div>

                {/* Metrics cards grid */}
                <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">

                  {/* Total queries Card */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex items-center gap-5">
                    <div className="w-12 h-12 rounded-xl bg-[#0B3C5D]/10 text-[#0B3C5D] flex items-center justify-center shrink-0">
                      <Mail size={22} />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Total Queries</span>
                      <span className="text-2xl font-extrabold text-slate-900 leading-none mt-1 inline-block">{totalCount}</span>
                    </div>
                  </div>

                  {/* Pending queries Card */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex items-center gap-5">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                      <Clock size={22} />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Awaiting Attention</span>
                      <span className="text-2xl font-extrabold text-slate-900 leading-none mt-1 inline-block">{pendingCount}</span>
                    </div>
                  </div>

                  {/* Resolved queries Card */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex items-center gap-5">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                      <CheckCircle size={22} />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Resolved Tickets</span>
                      <span className="text-2xl font-extrabold text-slate-900 leading-none mt-1 inline-block">{resolvedCount}</span>
                    </div>
                  </div>

                </section>

                {/* Filters and List Box */}
                <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden mb-10">

                  {/* Filter controls bar */}
                  <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/30">

                    {/* Search Bar */}
                    <div className="relative flex-1 max-w-md">
                      <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                        <Search size={16} />
                      </span>
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by sender email or message text..."
                        className="w-full pl-11 pr-5 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#3DA5C4] focus:border-transparent bg-white text-sm font-medium transition-all"
                      />
                    </div>

                    {/* Status Selector */}
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Filter size={13} /> Filter:
                      </span>

                      <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1">
                        {(['All', 'Pending', 'Resolved'] as const).map((filterOpt) => (
                          <button
                            key={filterOpt}
                            onClick={() => setStatusFilter(filterOpt)}
                            className={`px-4 py-2 rounded-lg text-xs font-extrabold transition-all ${statusFilter === filterOpt
                                ? 'bg-[#0B3C5D] text-white shadow-sm'
                                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                              }`}
                          >
                            {filterOpt}
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Queries Grid/Table list */}
                  <div className="overflow-x-auto w-full">
                    {filteredQueries.length > 0 ? (
                      <table className="w-full min-w-[700px] border-collapse">
                        <thead>
                          <tr className="bg-slate-50/50">
                            <th className="text-left text-[11px] font-bold uppercase tracking-wider text-slate-400 py-4 px-6 border-b border-slate-100 w-1/5">
                              Sender Address
                            </th>
                            <th className="text-left text-[11px] font-bold uppercase tracking-wider text-slate-400 py-4 px-6 border-b border-slate-100 w-[15%]">
                              Date Submitted
                            </th>
                            <th className="text-left text-[11px] font-bold uppercase tracking-wider text-slate-400 py-4 px-6 border-b border-slate-100 w-2/5">
                              Inquiry Message
                            </th>
                            <th className="text-left text-[11px] font-bold uppercase tracking-wider text-slate-400 py-4 px-6 border-b border-slate-100 w-[12%]">
                              Status
                            </th>
                            <th className="text-center text-[11px] font-bold uppercase tracking-wider text-slate-400 py-4 px-6 border-b border-slate-100 w-[13%]">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredQueries.map((item) => {
                            const isExpanded = expandedQueryId === item.id;
                            return (
                              <tr
                                key={item.id}
                                className="hover:bg-slate-50/40 border-b border-slate-100 last:border-b-0 transition-colors"
                              >
                                {/* Email */}
                                <td className="py-4 px-6 align-top">
                                  <span className="font-bold text-slate-800 text-sm break-all">
                                    {item.email}
                                  </span>
                                </td>

                                {/* Date */}
                                <td className="py-4 px-6 align-top text-xs text-slate-500 font-semibold">
                                  {new Date(item.date).toLocaleDateString('en-IN', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric'
                                  })}
                                  <span className="block text-[10px] text-slate-400 font-medium mt-0.5">
                                    {new Date(item.date).toLocaleTimeString('en-IN', {
                                      hour: '2-digit',
                                      minute: '2-digit'
                                    })}
                                  </span>
                                </td>

                                {/* Inquiry Message */}
                                <td className="py-4 px-6 align-top">
                                  <div className="flex flex-col items-start gap-1">
                                    <p className={`text-slate-600 text-sm leading-relaxed ${isExpanded ? 'whitespace-pre-wrap' : 'line-clamp-2'}`}>
                                      {item.query}
                                    </p>
                                    {item.query.length > 100 && (
                                      <button
                                        onClick={() => setExpandedQueryId(isExpanded ? null : item.id)}
                                        className="text-xs font-bold text-[#1C7C9C] hover:text-[#0B3C5D] mt-1 flex items-center gap-0.5 transition-colors"
                                      >
                                        {isExpanded ? (
                                          <>Collapse Message <ChevronUp size={12} /></>
                                        ) : (
                                          <>Expand Message <ChevronDown size={12} /></>
                                        )}
                                      </button>
                                    )}
                                  </div>
                                </td>

                                {/* Status Pill */}
                                <td className="py-4 px-6 align-top">
                                  <button
                                    onClick={() => handleToggleStatus(item.id)}
                                    title="Click to toggle status"
                                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-extrabold uppercase border cursor-pointer select-none transition-all active:scale-95 ${item.status === 'Resolved'
                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200/70 hover:bg-emerald-100/70'
                                        : 'bg-amber-50 text-amber-700 border-amber-200/70 hover:bg-amber-100/70'
                                      }`}
                                  >
                                    {item.status === 'Resolved' ? (
                                      <>
                                        <CheckCircle size={10} strokeWidth={3} /> Resolved
                                      </>
                                    ) : (
                                      <>
                                        <Clock size={10} strokeWidth={3} /> Pending
                                      </>
                                    )}
                                  </button>
                                </td>

                                {/* Actions Group */}
                                <td className="py-4 px-6 align-top">
                                  <div className="flex items-center justify-center gap-2">

                                    {/* Reply (mailto) Link */}
                                    <a
                                      href={`mailto:${item.email}?subject=Re: Pravayan Inquiry&body=Dear%20Sender,%20%0A%0AThank%20you%20for%20reaching%20out%20to%20Pravayan.%20In%20regards%20to%20your%20query:%20%0A"${encodeURIComponent(item.query)}"%20%0A%0A`}
                                      title="Draft response in email app"
                                      className="p-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-lg transition-colors border border-slate-200"
                                    >
                                      <ExternalLink size={14} />
                                    </a>

                                    {/* Delete Button */}
                                    <button
                                      onClick={() => handleDeleteQuery(item.id)}
                                      title="Delete Feedback Record"
                                      className="p-2 text-slate-400 hover:text-white hover:bg-rose-600 hover:border-rose-600 rounded-lg transition-all border border-slate-200"
                                    >
                                      <Trash2 size={14} />
                                    </button>

                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    ) : (
                      /* Empty state rendering */
                      <div className="text-center py-20 px-6 flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
                          <Inbox size={28} />
                        </div>
                        <h3 className="text-lg font-heading font-extrabold text-slate-800">
                          No Records Found
                        </h3>
                        <p className="text-slate-500 font-medium text-sm max-w-sm mt-1.5 leading-relaxed">
                          We couldn't find any feedbacks matching your search query or status filter. Try resetting filters.
                        </p>
                        {(searchTerm || statusFilter !== 'All') && (
                          <button
                            onClick={() => {
                              setSearchTerm('');
                              setStatusFilter('All');
                            }}
                            className="mt-6 text-sm font-bold text-[#1C7C9C] hover:text-[#0B3C5D] transition-colors"
                          >
                            Reset All Filters
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : activeTab === 'careers' ? (
              <CareersManagement triggerToast={triggerToast} />
            ) : (
              <JobApplicationsTab triggerToast={triggerToast} />
            )}

          </main>
        </div>
      )}
    </div>
  );
};

export default AdminPortal;
