import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BOT_RESPONSES: Record<string, string> = {
  default: "Hello! I'm Pravayan's virtual assistant. I can help you with information about our environmental monitoring solutions, research areas, or how to get in touch. What would you like to know?",
  water: "Pravayan monitors 40+ water quality parameters including pH, dissolved oxygen, BOD/COD, turbidity, heavy metals, and microplastics. Our sensor networks span 12 major Indian rivers with 99.9% uptime. Would you like to know more?",
  air: "Our air quality monitoring covers PM2.5, PM10, NOx, SO2, Ozone, and VOC concentrations. We provide hyper-local pollution mapping for smart cities and industrial zones. Ask me more!",
  contact: "You can reach us at hello@pravayan.com or call +91 12345 67890. Our team is at IIT Varanasi Campus. We respond within 24 hours. Shall I help you with anything else?",
  research: "Pravayan's research spans 6 domains: Water Quality, Air Monitoring, Soil Health, Hydrology, Climate & Micrometeorology, and Biomonitoring. Which area interests you most?",
  soil: "Our soil sensing technology measures NPK levels, moisture, salinity, pH, and microbial activity in real time — helping farmers optimize inputs and improve crop sustainability.",
  services: "We offer IoT sensor deployment, real-time data dashboards, environmental consulting, and custom sensing solutions. Would you like details on any specific service?",
};

function getBotReply(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes('water') || lower.includes('river') || lower.includes('lake')) return BOT_RESPONSES.water;
  if (lower.includes('air') || lower.includes('pm') || lower.includes('pollution')) return BOT_RESPONSES.air;
  if (lower.includes('contact') || lower.includes('email') || lower.includes('phone') || lower.includes('reach')) return BOT_RESPONSES.contact;
  if (lower.includes('research') || lower.includes('study')) return BOT_RESPONSES.research;
  if (lower.includes('soil') || lower.includes('farm') || lower.includes('agri')) return BOT_RESPONSES.soil;
  if (lower.includes('service') || lower.includes('solution') || lower.includes('product')) return BOT_RESPONSES.services;
  return BOT_RESPONSES.default;
}

interface ChatMessage {
  id: number;
  from: 'bot' | 'user';
  text: string;
  time: Date;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [email, setEmail] = useState('');
  const [query, setQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, from: 'bot', text: BOT_RESPONSES.default, time: new Date() },
  ]);
  const [input, setInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("http://localhost:3001/api/v1/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, query }),
      });
      if (res.ok) {
        setIsContactOpen(false);
        setEmail('');
        setQuery('');
        alert("Thank you! Your query has been submitted.");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch {
      alert("Could not connect to server. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const send = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = { id: Date.now(), from: 'user', text: trimmed, time: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: Date.now() + 1,
        from: 'bot',
        text: getBotReply(trimmed),
        time: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const fmt = (d: Date) =>
    d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  const quickReplies = ['Water Quality', 'Air Monitoring', 'Soil Sensing', 'Contact Us'];

  return (
    <>
      {/* Chat Window */}
      <div className={`chatbot-window ${isOpen ? 'chatbot-window--open' : ''}`} role="dialog" aria-label="Chatbot" aria-hidden={!isOpen}>
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-header__left">
            <div className="chatbot-avatar">
              <Bot size={18} />
              <span className="chatbot-online-dot" />
            </div>
            <div>
              <strong>Pravayan Assistant</strong>
              <span>Online · Ask me anything</span>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="chatbot-close" aria-label="Close chat">
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="chatbot-messages" role="log" aria-live="polite">
          {messages.map((msg) => (
            <div key={msg.id} className={`chatbot-msg chatbot-msg--${msg.from}`}>
              {msg.from === 'bot' && (
                <div className="chatbot-msg__avatar">
                  <Bot size={14} />
                </div>
              )}
              <div className="chatbot-msg__bubble">
                <p>{msg.text}</p>
                <time>{fmt(msg.time)}</time>
              </div>
              {msg.from === 'user' && (
                <div className="chatbot-msg__avatar chatbot-msg__avatar--user">
                  <User size={14} />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="chatbot-msg chatbot-msg--bot">
              <div className="chatbot-msg__avatar">
                <Bot size={14} />
              </div>
              <div className="chatbot-msg__bubble chatbot-msg__bubble--typing">
                <span /><span /><span />
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Quick Replies */}
        <div className="chatbot-quick-replies">
          {quickReplies.map((qr) => (
            <button
              key={qr}
              className="chatbot-quick-reply"
              onClick={() => {
                setInput(qr);
                setTimeout(send, 0);
              }}
            >
              {qr}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="chatbot-input-area">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Type your message..."
            rows={1}
            className="chatbot-input"
            aria-label="Chat message input"
          />
          <button onClick={send} className="chatbot-send" aria-label="Send message" disabled={!input.trim()}>
            <Send size={16} />
          </button>
        </div>
      </div>

      {/* Floating Buttons */}
      <div className="floating-buttons" aria-label="Floating action buttons">
        {/* Chat Toggle (Swapped to top) */}
        <button
          onClick={() => setIsOpen((o) => !o)}
          className={`fab fab--chat ${isOpen ? 'fab--chat-open' : ''}`}
          aria-label={isOpen ? 'Close chat' : 'Open chat'}
          title="Chat with us"
        >
          {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
          {!isOpen && <span className="fab__badge">1</span>}
        </button>

        {/* Contact Button (Swapped to bottom) */}
        <button 
          onClick={() => setIsContactOpen(true)}
          className="fab fab--contact" 
          aria-label="Open contact form" 
          title="Contact Us"
        >
          <Mail size={20} />
          <span className="fab__label">Contact</span>
        </button>
      </div>

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

export default ChatBot;

