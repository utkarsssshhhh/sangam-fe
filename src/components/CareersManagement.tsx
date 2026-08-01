import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Briefcase, MapPin, Building2, Loader2, AlertCircle } from 'lucide-react';

interface Position {
  id: string;
  title: string;
  department: string;
  location: string;
  description: string;
  createdAt: string;
}

const CareersManagement: React.FC<{ triggerToast: (msg: string) => void }> = ({ triggerToast }) => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchPositions();
  }, []);

  const fetchPositions = async () => {
    try {
      const API_URL = 'https://pravayan-be-v3.onrender.com';
      const res = await fetch(`${API_URL}/api/v1/positions`);
      if (res.ok) {
        const data = await res.json();
        setPositions(data);
      }
    } catch (e) {
      console.error('Failed to fetch positions', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPosition = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const API_URL = 'https://pravayan-be-v3.onrender.com';
      const res = await fetch(`${API_URL}/api/v1/positions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, department, location, description })
      });

      if (res.ok) {
        triggerToast('Position added successfully!');
        setTitle('');
        setDepartment('');
        setLocation('');
        setDescription('');
        fetchPositions();
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to add position');
      }
    } catch (e) {
      setError('Could not connect to server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (id: string) => {
    setConfirmDeleteId(id);
  };

  const executeDelete = async (id: string) => {
    try {
      const API_URL = 'https://pravayan-be-v3.onrender.com';
      const res = await fetch(`${API_URL}/api/v1/positions/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        triggerToast('Position deleted.');
        fetchPositions();
      } else {
        triggerToast('Failed to delete position.');
      }
    } catch (e) {
      triggerToast('Error deleting position.');
    } finally {
      setConfirmDeleteId(null);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 relative">
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
              <h3 className="text-xl font-extrabold text-slate-900 mb-2">Delete Position?</h3>
              <p className="text-slate-500 text-sm mb-8">
                Are you sure you want to delete this position? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmDeleteId(null)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => executeDelete(confirmDeleteId)}
                  className="flex-1 bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-rose-500/20"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Create Form */}
      <div className="w-full lg:w-1/3">
        <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm p-6 sticky top-24">
          <h3 className="text-lg font-extrabold text-slate-900 mb-6 flex items-center gap-2">
            <Plus size={20} className="text-[#3DA5C4]" />
            Add New Position
          </h3>
          
          <form onSubmit={handleAddPosition} className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Job Title</label>
              <input required type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Senior Data Scientist" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#3DA5C4] text-sm" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Department</label>
              <input required type="text" value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="e.g. Engineering" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#3DA5C4] text-sm" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Location</label>
              <input required type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Remote / Mumbai" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#3DA5C4] text-sm" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Description</label>
              <textarea required value={description} onChange={(e) => setDescription(e.target.value)} rows={4} placeholder="Brief role description..." className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#3DA5C4] text-sm resize-none" />
            </div>
            
            {error && (
              <div className="flex items-center gap-2 text-rose-500 text-xs font-bold bg-rose-50 p-3 rounded-xl border border-rose-100">
                <AlertCircle size={14} /> {error}
              </div>
            )}

            <button type="submit" disabled={isSubmitting} className="w-full bg-[#0B3C5D] hover:bg-[#1C7C9C] text-white font-bold py-3 rounded-xl transition-all shadow-md mt-2 flex justify-center items-center gap-2">
              {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : 'Publish Position'}
            </button>
          </form>
        </div>
      </div>

      {/* Positions List */}
      <div className="w-full lg:w-2/3">
        <h3 className="text-xl font-extrabold text-slate-900 mb-6 flex items-center gap-2">
          <Briefcase size={22} className="text-[#3DA5C4]" />
          Active Openings
        </h3>

        {isLoading ? (
          <div className="flex justify-center p-10"><Loader2 size={30} className="animate-spin text-[#3DA5C4]" /></div>
        ) : positions.length === 0 ? (
          <div className="bg-white p-10 rounded-3xl border border-slate-200/60 shadow-sm text-center">
            <p className="text-slate-500">No active positions found.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {positions.map((pos) => (
              <div key={pos.id} className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                <div className="flex-1">
                  <h4 className="text-lg font-extrabold text-slate-900 mb-2">{pos.title}</h4>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-[#1C7C9C] bg-[#1C7C9C]/10 px-2.5 py-1 rounded-md">
                      <Building2 size={13} /> {pos.department}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                      <MapPin size={13} /> {pos.location}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 line-clamp-2">{pos.description}</p>
                </div>
                <button 
                  onClick={() => handleDelete(pos.id)}
                  className="shrink-0 flex items-center gap-2 text-rose-500 hover:text-white bg-rose-50 hover:bg-rose-500 px-4 py-2 rounded-xl transition-colors font-bold text-sm"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CareersManagement;
