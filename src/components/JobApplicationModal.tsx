import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, Send } from 'lucide-react';

interface JobApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  positionId?: string;
  positionTitle?: string;
  triggerToast: (msg: string) => void;
}

const JobApplicationModal: React.FC<JobApplicationModalProps> = ({ isOpen, onClose, positionId, positionTitle, triggerToast }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resumeLink: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const API_URL = 'https://pravayan-be-v3.onrender.com';
      const res = await fetch(`${API_URL}/api/v1/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          positionId: positionId || null,
          ...formData
        })
      });

      if (res.ok) {
        triggerToast('Application submitted successfully!');
        setFormData({ name: '', email: '', phone: '', resumeLink: '', message: '' });
        onClose();
      } else {
        triggerToast('Failed to submit application. Please try again.');
      }
    } catch (e) {
      triggerToast('Server connection error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100]"
          />
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col pointer-events-auto"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    {positionTitle ? `Apply for ${positionTitle}` : 'General Application'}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1 font-medium">
                    {positionTitle ? 'We are excited to review your application.' : 'Interested in joining us? Send us your details!'}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 hover:text-slate-800 transition-colors shrink-0"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Full Name *</label>
                    <input required name="name" value={formData.name} onChange={handleChange} type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#3DA5C4] text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Email Address *</label>
                    <input required name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Your Email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#3DA5C4] text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Phone Number</label>
                    <input name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="Your Phone Number" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#3DA5C4] text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">LinkedIn / GitHub Link</label>
                    <input name="resumeLink" value={formData.resumeLink} onChange={handleChange} type="url" placeholder="Your LinkedIn / GitHub Link" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#3DA5C4] text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Resume Link *</label>
                    <input required name="message" value={formData.message} onChange={handleChange} type="url" placeholder="Link to your Google Drive / Dropbox Resume" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#3DA5C4] text-sm" />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-slate-900 hover:bg-[#3DA5C4] text-white font-bold py-3.5 rounded-xl transition-all shadow-md mt-4 flex justify-center items-center gap-2"
                  >
                    {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <><Send size={16} /> Submit Application</>}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default JobApplicationModal;
