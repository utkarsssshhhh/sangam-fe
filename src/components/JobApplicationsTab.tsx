import React, { useState, useEffect } from 'react';
import { Trash2, Loader2, User, Mail, Phone, ExternalLink, Briefcase, FileText, CheckCircle, Clock } from 'lucide-react';

interface JobApplication {
  id: string;
  positionId: string | null;
  name: string;
  email: string;
  phone: string | null;
  resumeLink: string | null;
  message: string;
  status: string;
  createdAt: string;
}

interface Position {
  id: string;
  title: string;
}

const JobApplicationsTab: React.FC<{ triggerToast: (msg: string) => void }> = ({ triggerToast }) => {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [positions, setPositions] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [appsRes, posRes] = await Promise.all([
        fetch('http://localhost:3001/api/v1/applications'),
        fetch('http://localhost:3001/api/v1/positions')
      ]);

      if (appsRes.ok && posRes.ok) {
        const appsData = await appsRes.json();
        const posData: Position[] = await posRes.json();
        
        const posMap: Record<string, string> = {};
        posData.forEach(p => posMap[p.id] = p.title);
        
        setApplications(appsData);
        setPositions(posMap);
      }
    } catch (e) {
      console.error('Failed to fetch applications', e);
      triggerToast('Failed to load applications');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this application?')) return;
    
    try {
      const res = await fetch(`http://localhost:3001/api/v1/applications/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        triggerToast('Application deleted');
        setApplications(prev => prev.filter(app => app.id !== id));
      } else {
        triggerToast('Failed to delete application');
      }
    } catch (e) {
      triggerToast('Error deleting application');
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'New' ? 'Reviewed' : 'New';
    
    try {
      const res = await fetch(`http://localhost:3001/api/v1/applications/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      });
      
      if (res.ok) {
        setApplications(prev => prev.map(app => app.id === id ? { ...app, status: nextStatus } : app));
        triggerToast(`Status updated to ${nextStatus}`);
      }
    } catch (e) {
      triggerToast('Error updating status');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-20">
        <Loader2 className="w-12 h-12 animate-spin text-[#3DA5C4]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
          <Briefcase className="text-[#3DA5C4]" /> Job Applications
        </h2>
        <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200 text-sm font-bold text-slate-600">
          Total: {applications.length}
        </div>
      </div>

      {applications.length === 0 ? (
        <div className="bg-white p-16 rounded-3xl border border-slate-200/60 shadow-sm text-center">
          <FileText size={48} className="mx-auto text-slate-300 mb-4" />
          <h3 className="text-xl font-bold text-slate-900 mb-2">No applications yet</h3>
          <p className="text-slate-500">When candidates apply, their applications will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((app) => (
            <div key={app.id} className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm flex flex-col relative group hover:border-[#3DA5C4]/30 hover:shadow-lg transition-all">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">{app.name}</h3>
                  <div className="text-xs font-bold text-slate-500 mt-1">
                    Applied: {new Date(app.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <button 
                  onClick={() => handleToggleStatus(app.id, app.status)}
                  className={`px-3 py-1 text-xs font-bold rounded-full flex items-center gap-1 border transition-colors ${
                    app.status === 'Reviewed' 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' 
                      : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                  }`}
                >
                  {app.status === 'Reviewed' ? <><CheckCircle size={12} /> Reviewed</> : <><Clock size={12} /> New</>}
                </button>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl mb-4 border border-slate-100 space-y-2">
                <div className="text-xs font-bold text-[#1C7C9C] flex items-center gap-2">
                  <Briefcase size={14} /> 
                  {app.positionId && positions[app.positionId] ? positions[app.positionId] : 'General Application'}
                </div>
                <div className="text-sm text-slate-600 flex items-center gap-2">
                  <Mail size={14} className="text-slate-400" /> 
                  <a href={`mailto:${app.email}`} className="hover:text-[#3DA5C4] transition-colors truncate">{app.email}</a>
                </div>
                {app.phone && (
                  <div className="text-sm text-slate-600 flex items-center gap-2">
                    <Phone size={14} className="text-slate-400" /> {app.phone}
                  </div>
                )}
                {app.resumeLink && (
                  <div className="text-sm text-slate-600 flex items-center gap-2">
                    <ExternalLink size={14} className="text-slate-400" />
                    <a href={app.resumeLink} target="_blank" rel="noreferrer" className="hover:text-[#3DA5C4] text-[#3DA5C4] truncate transition-colors">LinkedIn / GitHub Profile</a>
                  </div>
                )}
              </div>

              <div className="flex-1">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Resume Link</h4>
                <a href={app.message} target="_blank" rel="noreferrer" className="text-sm text-[#3DA5C4] hover:underline bg-white border border-slate-100 p-3 rounded-xl block truncate">{app.message}</a>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
                <button 
                  onClick={() => handleDelete(app.id)}
                  className="flex items-center gap-2 text-xs font-bold text-rose-500 hover:text-white bg-rose-50 hover:bg-rose-500 px-4 py-2 rounded-lg transition-colors"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobApplicationsTab;
