import React, { useEffect, useState } from 'react';
import { Briefcase, MapPin, Building2, ExternalLink, Loader2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import FooterHome from '../components/FooterHome';
import JobApplicationModal from '../components/JobApplicationModal';

interface Position {
  id: string;
  title: string;
  department: string;
  location: string;
  description: string;
  createdAt: string;
}

const Careers: React.FC = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<{ id: string, title: string } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
        const response = await fetch(`${API_URL}/api/v1/positions`);
        if (response.ok) {
          const data = await response.json();
          setPositions(data);
          setError(null);
        } else {
          setError('Failed to fetch positions. Please try again later.');
        }
      } catch (err) {
        console.error('Failed to fetch positions:', err);
        setError('An error occurred while fetching positions.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPositions();
  }, []);

  
  const handleApplyClick = (positionId?: string, positionTitle?: string) => {
    if (positionId && positionTitle) {
      setSelectedPosition({ id: positionId, title: positionTitle });
    } else {
      setSelectedPosition(null);
    }
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans">
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3 pointer-events-none"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#0B1525] text-white text-[14px] font-medium px-6 py-3.5 rounded-full shadow-2xl flex items-center gap-3 pointer-events-auto border border-white/5"
            >
              {toastMessage}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar />
      
      <JobApplicationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        positionId={selectedPosition?.id}
        positionTitle={selectedPosition?.title}
        triggerToast={triggerToast}
      />

      {/* Hero Section */}
      <section className="bg-[#0B3C5D] text-white pt-32 pb-20 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-[#1C7C9C]/20 blur-[150px] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-[#3DA5C4] font-bold tracking-widest text-sm uppercase mb-4 block">Join Our Mission</span>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Careers at Pravayan
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto mb-10">
            Help us build the next generation of environmental intelligence. We're looking for passionate individuals to join our team.
          </p>
          <button
            onClick={() => handleApplyClick()}
            className="inline-flex items-center gap-2 bg-white text-[#0B3C5D] font-bold py-4 px-8 rounded-full hover:bg-slate-100 hover:scale-105 transition-all shadow-xl shadow-white/10"
          >
            Interested in working with us? <ExternalLink size={18} />
          </button>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="py-20 px-6 lg:px-12 max-w-6xl mx-auto min-h-[400px]">
        <div className="flex items-center justify-between mb-10 border-b border-slate-200 pb-6">
          <h2 className="text-3xl font-extrabold text-slate-900">Open Positions</h2>
          <div className="bg-slate-100 text-slate-600 font-bold px-4 py-1.5 rounded-full text-sm">
            {positions.length} {positions.length === 1 ? 'Role' : 'Roles'} Available
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20 text-slate-400">
            <Loader2 className="w-10 h-10 animate-spin text-[#1C7C9C]" />
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-red-100 shadow-sm">
            <h3 className="text-xl font-bold text-red-600 mb-2">Oops! Something went wrong</h3>
            <p className="text-slate-500 max-w-md mx-auto">
              {error}
            </p>
          </div>
        ) : positions.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <Briefcase size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">No open positions right now</h3>
            <p className="text-slate-500 max-w-md mx-auto">
              We're not actively hiring for specific roles at the moment, but we're always on the lookout for great talent. Feel free to submit your interest!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {positions.map((pos) => (
              <div key={pos.id} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-[#1C7C9C]/30 transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-extrabold text-slate-900 group-hover:text-[#1C7C9C] transition-colors">{pos.title}</h3>
                </div>
                
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-[#1C7C9C] bg-[#1C7C9C]/10 px-3 py-1.5 rounded-lg">
                    <Building2 size={16} />
                    {pos.department}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg">
                    <MapPin size={16} />
                    {pos.location}
                  </span>
                </div>

                <p className="text-slate-600 leading-relaxed mb-8 line-clamp-3">
                  {pos.description}
                </p>

                <button
                  onClick={() => handleApplyClick(pos.id, pos.title)}
                  className="inline-flex items-center gap-2 text-[#1C7C9C] font-bold hover:text-[#0B3C5D] transition-colors"
                >
                  Apply Now <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <FooterHome />
    </div>
  );
};

export default Careers;
