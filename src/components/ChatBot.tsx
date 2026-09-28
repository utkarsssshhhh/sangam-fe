import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Mail, Loader2, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const DEFAULT_MESSAGE = "Hello! I'm Coth. I can help you with information about our environmental monitoring solutions, research areas, or how to get in touch. What would you like to know?";

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
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, from: 'bot', text: DEFAULT_MESSAGE, time: new Date() },
  ]);
  const [input, setInput] = useState<string>('');
  const [language, setLanguage] = useState<string>('English');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
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

  const send = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = { id: Date.now(), from: 'user', text: trimmed, time: new Date() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    try {
      // Build conversation history for the backend
      const backendMessages = [
        { role: 'system', content: `You are Coth, a helpful virtual assistant for Sangam, an environmental intelligence company. Keep your answers concise and friendly. You have knowledge of water quality, air monitoring, soil sensing, and climate data. IMPORTANT: ALWAYS respond in ${language}.` },
        ...newMessages.slice(1).map(msg => ({
          role: msg.from === 'bot' ? 'bot' : 'user',
          content: msg.text
        }))
      ];

      const res = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: backendMessages })
      });

      if (!res.ok) {
        let errorDetail = res.statusText;
        try {
          const errorData = await res.json();
          errorDetail = errorData.detail || errorDetail;
        } catch (e) {}
        throw new Error(errorDetail);
      }

      if (!res.body) throw new Error("No response body from server");

      const botMsgId = Date.now() + 1;
      setMessages((prev) => [...prev, {
        id: botMsgId,
        from: 'bot',
        text: '',
        time: new Date(),
      }]);
      setIsTyping(false); // Stop typing indicator since we're starting to stream

      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        setMessages((prev) => prev.map(msg => 
          msg.id === botMsgId ? { ...msg, text: msg.text + chunk } : msg
        ));
      }

    } catch (error: any) {
      console.error(error);
      const errorMsg: ChatMessage = {
        id: Date.now() + 1,
        from: 'bot',
        text: `Error connecting to backend: ${error.message || error}`,
        time: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
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

      {/* Chat Window */}
      <div className={`chatbot-window ${isOpen ? 'chatbot-window--open' : ''}`} role="dialog" aria-label="Chatbot" aria-hidden={!isOpen}>
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-header__left">
            <div className="chatbot-avatar overflow-hidden p-0 border border-white/20 rounded-full flex-shrink-0 aspect-square relative">
              <img src="/download.jpg" alt="Coth" className="w-full h-full object-cover object-top" />
              <span className="chatbot-online-dot" />
            </div>
            <div>
              <strong>Coth</strong>
              <span>Online · Ask me anything</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative flex items-center bg-white/10 rounded-md px-2 py-1 text-xs text-white" title="Change Language">
              <Globe size={14} className="mr-1 opacity-70" />
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent outline-none appearance-none cursor-pointer font-medium"
              >
                <option value="English" className="text-black">English</option>
                <option value="Hindi" className="text-black">हिंदी (Hindi)</option>
                <option value="Tamil" className="text-black">தமிழ் (Tamil)</option>
                <option value="Japanese" className="text-black">日本語 (Japanese)</option>
              </select>
            </div>
            <button onClick={() => setIsOpen(false)} className="chatbot-close ml-1" aria-label="Close chat">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="chatbot-messages" role="log" aria-live="polite">
          {messages.map((msg) => (
            <div key={msg.id} className={`chatbot-msg chatbot-msg--${msg.from}`}>
              {msg.from === 'bot' && (
                <div className="chatbot-msg__avatar overflow-hidden p-0 border border-slate-200 rounded-full flex-shrink-0 aspect-square">
                  <img src="/download.jpg" alt="Coth" className="w-full h-full object-cover object-top" />
                </div>
              )}
              <div className="chatbot-msg__bubble text-sm" style={{ wordBreak: 'break-word' }}>
                {msg.from === 'bot' ? (
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                      p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-2 space-y-1" {...props} />,
                      ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-2 space-y-1" {...props} />,
                      li: ({node, ...props}) => <li className="" {...props} />,
                      a: ({node, ...props}) => <a className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
                      strong: ({node, ...props}) => <strong className="font-bold text-inherit" {...props} />
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                ) : (
                  <p>{msg.text}</p>
                )}
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
              <div className="chatbot-msg__avatar overflow-hidden p-0 border border-slate-200 rounded-full flex-shrink-0 aspect-square">
                <img src="/download.jpg" alt="Coth" className="w-full h-full object-cover object-top" />
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

