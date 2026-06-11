import React, { useEffect, useRef } from 'react';
import { Eye, Search, Layers, Send, ArrowRight } from 'lucide-react';

interface Stage {
  phase: string;
  goal: string;
  description: string;
  icon: React.ElementType;
  color: string;
  stepNumber: string;
}

const stages: Stage[] = [
  {
    phase: 'Sense',
    goal: 'Collect',
    description: 'Satellites, IoT sensors, and field sampling gather data directly from water bodies and environmental networks.',
    icon: Eye,
    color: '#3DA5C4',
    stepNumber: '01',
  },
  {
    phase: 'Analyse',
    goal: 'Understand',
    description: 'AI, GIS, and spectral analysis turn raw environmental data into precise water quality and pollution insights.',
    icon: Search,
    color: '#6BC5E8',
    stepNumber: '02',
  },
  {
    phase: 'Model',
    goal: 'Predict',
    description: 'Digital twins and predictive models simulate how physical systems will behave and respond to future decisions.',
    icon: Layers,
    color: '#5A9E6F',
    stepNumber: '03',
  },
  {
    phase: 'Act',
    goal: 'Report',
    description: 'Dashboards, alerts, and automated compliance reports put clear answers directly in front of decision-makers.',
    icon: Send,
    color: '#e0f4fb',
    stepNumber: '04',
  },
];

const WorkflowSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('workflow--visible');
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="workflow-section py-24 bg-[#0B3C5D] relative overflow-hidden" aria-label="Our Workflow">
      {/* Background glow and grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(61,165,196,0.15),transparent_70%)]" aria-hidden="true" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} aria-hidden="true" />
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-[13px] font-bold uppercase tracking-widest text-[#6BC5E8] bg-[#6BC5E8]/10 px-4 py-1.5 rounded-full border border-[#6BC5E8]/20">Methodology</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mt-6 mb-6">How We Work</h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed">
            Our <span className="text-white font-semibold">Sense → Analyse → Model → Act</span> pipeline turns environmental complexity into clear, actionable insight.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {stages.map((stage, i) => {
            const Icon = stage.icon;
            return (
              <div key={stage.phase} className="relative group">
                {/* Arrow connector for desktop */}
                {i < stages.length - 1 && (
                  <div className="hidden lg:block absolute top-[40%] -right-3 translate-x-1/2 z-20 text-slate-600 group-hover:text-[#6BC5E8] transition-colors duration-500">
                    <ArrowRight size={24} className="animate-pulse" />
                  </div>
                )}

                {/* Card body */}
                <div className="bg-[#0f172a]/40 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl hover:bg-[#0f172a]/60 hover:border-[#6BC5E8]/30 transition-all duration-500 hover:-translate-y-2 z-10 relative flex flex-col h-full group-hover:shadow-[0_0_30px_rgba(107,197,232,0.15)]">
                  
                  {/* Step number and Icon */}
                  <div className="flex justify-between items-start mb-8">
                    <span className="text-5xl font-black text-white/5 font-heading leading-none group-hover:text-white/10 transition-colors duration-300">
                      {stage.stepNumber}
                    </span>
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" 
                      style={{ backgroundColor: `${stage.color}15`, color: stage.color, border: `1px solid ${stage.color}30` }}
                    >
                      <Icon size={24} strokeWidth={2} />
                    </div>
                  </div>

                  {/* Copy */}
                  <div className="text-[11px] font-bold text-[#6BC5E8] uppercase tracking-widest mb-2">
                    Goal: {stage.goal}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {stage.phase}
                  </h3>
                  <p className="text-[14px] text-slate-400 leading-relaxed flex-grow group-hover:text-slate-300 transition-colors duration-300">
                    {stage.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
