import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [query, setQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const location = useLocation();

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    const handleOpenContact = () => setIsContactOpen(true);
    window.addEventListener('openContactModal', handleOpenContact);
    return () => window.removeEventListener('openContactModal', handleOpenContact);
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const API_URL = 'https://pravayan-be-v3.onrender.com';
      const res = await fetch(`${API_URL}/api/v1/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, query }),
      });
      if (res.ok) {
        setIsContactOpen(false);
        setEmail('');
        setQuery('');
        triggerToast("Thank you! Your query has been submitted.");
      } else {
        triggerToast("Something went wrong. Please try again.");
      }
    } catch {
      triggerToast("Could not connect to server. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Toast Notification Banner */}
      <AnimatePresence>
        {(isSubmitting || toastMessage) && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3 pointer-events-none"
          >
            {isSubmitting && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white text-slate-800 text-[14px] font-medium px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 pointer-events-auto border border-slate-200/60"
              >
                <Loader2 size={16} className="animate-spin text-slate-400" />
                Submitting...
              </motion.div>
            )}
            {!isSubmitting && toastMessage && (
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

      <nav
        className="fixed top-0 left-0 right-0 z-40 bg-white/70 backdrop-blur-[24px] saturate-[1.5] border-b border-black/5 shadow-[0_4px_30px_rgba(0,0,0,0.03)] transition-all duration-500"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-24 md:h-28">

            {/* Logo - Just the image, even larger size, no text */}
            <Link to="/" className="flex items-center group h-full">
              <img
                src="/LOGO.png"
                alt="Logo"
                className="w-auto h-full max-h-[8rem] object-contain drop-shadow-md scale-100 md:scale-150 origin-left hover:scale-110 md:hover:scale-[1.55] transition-transform duration-500"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-7 lg:gap-10">
              <Link
                to="/"
                className={`text-[15px] font-bold transition-colors duration-300 ${location.pathname === '/' ? 'text-[#3DA5C4]' : 'text-slate-700 hover:text-[#3DA5C4]'
                  }`}
              >
                Home
              </Link>
              <Link
                to="/products"
                className={`text-[15px] font-bold transition-colors duration-300 ${location.pathname === '/products' ? 'text-[#3DA5C4]' : 'text-slate-700 hover:text-[#3DA5C4]'
                  }`}
              >
                Products
              </Link>
              <Link
                to="/treatment"
                className={`text-[15px] font-bold transition-colors duration-300 ${location.pathname === '/treatment' ? 'text-[#3DA5C4]' : 'text-slate-700 hover:text-[#3DA5C4]'
                  }`}
              >
                Treatments
              </Link>
              <Link
                to="/careers"
                className={`text-[15px] font-bold transition-colors duration-300 ${location.pathname === '/careers' ? 'text-[#3DA5C4]' : 'text-slate-700 hover:text-[#3DA5C4]'
                  }`}
              >
                Careers
              </Link>
              <Link
                to="/about"
                className={`text-[15px] font-bold transition-colors duration-300 ${location.pathname === '/about' ? 'text-[#3DA5C4]' : 'text-slate-700 hover:text-[#3DA5C4]'
                  }`}
              >
                About Us
              </Link>
              <button
                onClick={() => setIsContactOpen(true)}
                className="bg-slate-900 text-white text-[15px] font-bold px-6 py-3 rounded-full hover:bg-[#3DA5C4] hover:shadow-lg hover:shadow-[#3DA5C4]/20 transition-all duration-300 hover:-translate-y-0.5"
              >
                Contact Us
              </button>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden p-2 text-slate-800 hover:text-[#3DA5C4] transition-colors bg-slate-50 hover:bg-slate-100 rounded-full"
              aria-label="Toggle navigation"
            >
              {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden overflow-hidden border-t border-slate-200/50"
              >
                <div className="flex flex-col gap-3 py-6 px-2">
                  <Link
                    to="/"
                    onClick={() => setIsMobileOpen(false)}
                    className="text-base font-bold text-slate-800 hover:text-[#3DA5C4] transition-colors px-4 py-2 rounded-xl hover:bg-white/50"
                  >
                    Home
                  </Link>
                  <Link
                    to="/products"
                    onClick={() => setIsMobileOpen(false)}
                    className="text-base font-bold text-slate-800 hover:text-[#3DA5C4] transition-colors px-4 py-2 rounded-xl hover:bg-white/50"
                  >
                    Products
                  </Link>
                  <Link
                    to="/treatment"
                    onClick={() => setIsMobileOpen(false)}
                    className="text-base font-bold text-slate-800 hover:text-[#3DA5C4] transition-colors px-4 py-2 rounded-xl hover:bg-white/50"
                  >
                    Treatments
                  </Link>
                  <Link
                    to="/careers"
                    onClick={() => setIsMobileOpen(false)}
                    className="text-base font-bold text-slate-800 hover:text-[#3DA5C4] transition-colors px-4 py-2 rounded-xl hover:bg-white/50"
                  >
                    Careers
                  </Link>
                  <Link
                    to="/about"
                    onClick={() => setIsMobileOpen(false)}
                    className="text-base font-bold text-slate-800 hover:text-[#3DA5C4] transition-colors px-4 py-2 rounded-xl hover:bg-white/50"
                  >
                    About Us
                  </Link>
                  <button
                    onClick={() => {
                      setIsMobileOpen(false);
                      setIsContactOpen(true);
                    }}
                    className="mt-2 text-center bg-slate-900 text-white text-base font-bold px-5 py-3.5 rounded-xl shadow-md"
                  >
                    Contact Us
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Contact Modal (Pop-up) */}
      <AnimatePresence>
        {isContactOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setIsContactOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-3xl shadow-2xl p-8 sm:p-10 w-full max-w-lg overflow-hidden"
            >
              <button
                onClick={() => setIsContactOpen(false)}
                className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-3xl font-extrabold text-slate-900 mb-2">Get in Touch</h3>
              <p className="text-slate-500 text-[15px] mb-8 leading-relaxed">
                Drop us a line and our environmental intelligence team will get back to you as soon as possible.
              </p>

              <form onSubmit={handleContactSubmit} className="flex flex-col gap-5">
                <div>
                  <label htmlFor="email" className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-widest mb-2">
                    Gmail Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@gmail.com" 
                    className="w-full px-5 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3DA5C4] focus:border-transparent transition-all text-slate-800 font-medium placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <label htmlFor="query" className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-widest mb-2">
                    Your Query
                  </label>
                  <textarea
                    id="query"
                    required
                    rows={4}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="How can we help you?" 
                    className="w-full px-5 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3DA5C4] focus:border-transparent transition-all resize-none text-slate-800 font-medium placeholder:text-slate-400"
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-[#3DA5C4] hover:bg-[#1C7C9C] text-white font-extrabold py-4 rounded-xl transition-colors mt-2 shadow-lg shadow-[#3DA5C4]/20 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Query'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
