import React, { useEffect, useRef } from 'react';
import { Layers, TrendingUp, Globe, Maximize2, Quote } from 'lucide-react';

interface Pillar {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

const pillars: Pillar[] = [
  { 
    icon: Layers, 
    title: 'Integrated, not siloed', 
    description: 'Satellite, IoT, and field engineering under one roof for unified intelligence.',
    color: '#1C7C9C' 
  },
  { 
    icon: TrendingUp, 
    title: 'Decision-first', 
    description: 'Dashboards, alerts, and reports that lead to action, not raw data overload.',
    color: '#3DA5C4' 
  },
  { 
    icon: Globe, 
    title: 'Built for Indian conditions', 
    description: 'Designed specifically for the regulations and budgets Indian utilities actually work within.',
    color: '#0B3C5D' 
  },
  { 
    icon: Maximize2, 
    title: 'Scalable', 
    description: 'Built to expand seamlessly from a single river survey to a city-wide digital twin.',
    color: '#6BC5E8' 
  },
];

const IntroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('intro--visible');
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="intro-section relative py-24 bg-[#f8fafc] overflow-hidden" aria-label="About Sangam">
      {/* Background accents */}
      <div className="intro-blob intro-blob--tl" aria-hidden="true" />
      <div className="intro-blob intro-blob--br" aria-hidden="true" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left: Image Collage */}
          <div className="relative h-[600px] w-full hidden lg:block">
            {/* Main Image */}
            <div className="absolute top-0 left-0 w-4/5 h-[450px] rounded-[2rem] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?q=80&w=800&auto=format&fit=crop" 
                alt="Global Environmental Intelligence & Data" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            
            {/* Secondary Image */}
            <div className="absolute bottom-0 right-0 w-[65%] h-[350px] rounded-[2rem] overflow-hidden shadow-2xl border-8 border-[#f8fafc] z-10">
              <img 
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop" 
                alt="Environmental water science and monitoring" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Floating Experience Badge */}
            <div className="absolute top-1/2 left-[75%] transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-6 shadow-xl z-20 flex items-center gap-4">
              <div className="text-4xl font-black text-[#1C7C9C]"></div>
              <div className="text-sm font-bold text-slate-500 leading-tight uppercase tracking-wide">Gaining Experience<br/></div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="intro-text">
            <span className="text-[#1C7C9C] font-bold tracking-widest text-sm uppercase mb-4 block">What We Are</span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
              Sangam — <br/><span className="text-[#1C7C9C]">The Flow of Insight</span>
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Sangam is an environmental intelligence company. We help cities, utilities, government bodies, and industry understand and manage their water and environmental systems — by combining satellite remote sensing, IoT sensor networks, GIS, and digital twin modelling into clear, decision-ready insight.
            </p>

            {/* Vision Box */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 relative mb-12">
              <Quote className="absolute top-4 right-4 text-slate-100" size={40} />
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#3DA5C4] mb-2">Our Vision</h4>
              <p className="text-slate-700 italic leading-relaxed font-medium">
                "To make the health of our water and environment continuously visible, measurable, and manageable — so every decision can be made with evidence rather than guesswork."
              </p>
            </div>

            {/* Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {pillars.map(({ icon: Icon, title, description, color }) => (
                <div key={title} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center gap-4 mb-3">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${color}15`, color: color }}
                    >
                      <Icon size={24} strokeWidth={2.5} />
                    </div>
                    <h4 className="text-[15px] font-bold text-slate-900">{title}</h4>
                  </div>
                  <p className="text-[13px] text-slate-500 leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default IntroSection;
