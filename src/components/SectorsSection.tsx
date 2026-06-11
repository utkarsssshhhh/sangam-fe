import React, { useEffect, useRef, useState } from 'react';
import { Landmark, Wrench, Factory, GraduationCap, CheckCircle } from 'lucide-react';

interface Sector {
  title: string;
  subBodies: string;
  icon: React.ElementType;
  color: string;
  details: string[];
}

const sectors: Sector[] = [
  {
    title: 'Government & Public Bodies',
    subBodies: 'Municipal corporations, river basin authorities, pollution control boards, tourism departments, planning agencies.',
    icon: Landmark,
    color: '#0B3C5D',
    details: ['Urban Environmental Management', 'River Basin Conservation', 'Pollution Control & Auditing', 'Smart City Planning'],
  },
  {
    title: 'Utilities',
    subBodies: 'Municipal and metropolitan water supply companies, wastewater treatment operators, infrastructure asset managers.',
    icon: Wrench,
    color: '#1C7C9C',
    details: ['Water Loss Control (NRW)', 'Wastewater Treatment Monitoring', 'Asset Integrity Tracking', 'Predictive Leak Detection'],
  },
  {
    title: 'Industry',
    subBodies: 'Industrial water and effluent treatment facilities, landfill operators, hydropower and irrigation operators.',
    icon: Factory,
    color: '#3DA5C4',
    details: ['Effluent Compliance Monitoring', 'Hydropower Reservoir Management', 'Solid Waste Auditing', 'Industrial Water Efficiency'],
  },
  {
    title: 'Research & Civil Society',
    subBodies: 'Universities, research institutions, environmental consultancies, and NGOs.',
    icon: GraduationCap,
    color: '#5A9E6F',
    details: ['Hydrological Studies', 'Ecology Baseline Surveys', 'Community Advocacy Data', 'Climate Risk Assessments'],
  },
];

const capabilities: string[] = [
  'Water security & climate resilience',
  'River health & ecosystem assessment',
  'Spectral & multi-sensor intelligence',
  'Pollution source attribution',
  'Digital twin modelling & simulation',
  'IoT edge AI for real-time monitoring',
  'Environmental compliance automation',
  'Decentralised water treatment',
];

const SectorsSection: React.FC = () => {
  const [activeSector, setActiveSector] = useState<Sector>(sectors[0]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('sectors--visible');
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const ActiveIcon = activeSector.icon;

  return (
    <section ref={sectionRef} id="sectors" className="py-24 bg-white relative overflow-hidden" aria-label="Who We Serve">
      {/* Decorative background circle */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-slate-50 rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[13px] font-bold uppercase tracking-widest text-[#3DA5C4] bg-[#3DA5C4]/10 px-4 py-1.5 rounded-full border border-[#3DA5C4]/20">Client Sectors</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mt-6 mb-6">Who We Serve</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Providing environmental intelligence and data products across public and private sectors.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Client Sectors list */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {sectors.map((sector) => {
              const Icon = sector.icon;
              const isActive = activeSector.title === sector.title;
              return (
                <button
                  key={sector.title}
                  onClick={() => setActiveSector(sector)}
                  className={`group text-left p-6 rounded-[1.5rem] border transition-all duration-500 flex items-center gap-6 w-full ${
                    isActive 
                      ? 'border-transparent bg-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] scale-[1.02]' 
                      : 'border-slate-100 bg-slate-50 hover:bg-white hover:shadow-lg hover:border-slate-200'
                  }`}
                >
                  <div 
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500 shadow-sm ${
                      isActive ? 'scale-110 rotate-3' : 'group-hover:scale-110'
                    }`}
                    style={{ backgroundColor: isActive ? sector.color : `${sector.color}15`, color: isActive ? '#fff' : sector.color }}
                  >
                    <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                  </div>
                  <div className="flex-grow pr-4">
                    <h4 className={`text-lg font-extrabold mb-1.5 transition-colors ${isActive ? 'text-slate-900' : 'text-slate-700'}`}>{sector.title}</h4>
                    <p className="text-[13.5px] text-slate-500 leading-relaxed line-clamp-2">{sector.subBodies}</p>
                  </div>
                  {/* Active Indicator Line */}
                  <div 
                    className={`w-1.5 h-12 rounded-full transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`} 
                    style={{ backgroundColor: sector.color }} 
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Focus Areas & Sector Details */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            
            {/* Sector Details Panel (Dynamic Color) */}
            <div 
              key={activeSector.title}
              className="rounded-[2rem] p-8 md:p-10 transition-all duration-500 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] relative overflow-hidden animate-[fadeInUp_0.5s_ease-out_forwards]"
              style={{ backgroundColor: activeSector.color }}
            >
              {/* Subtle background pattern */}
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white bg-white/20 backdrop-blur-md shadow-inner border border-white/30">
                    <ActiveIcon size={24} strokeWidth={2.5} />
                  </div>
                  <h4 className="text-2xl font-extrabold text-white">{activeSector.title}</h4>
                </div>
                
                <p className="text-[15px] text-white/90 mb-8 leading-relaxed font-medium">
                  We empower {activeSector.title.toLowerCase()} with tailored environmental metrics and operational workflows designed to simplify complexity and drive action.
                </p>
                
                <ul className="space-y-4">
                  {activeSector.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                      <CheckCircle size={18} className="text-white shrink-0 mt-0.5" />
                      <span className="text-[14px] font-bold text-white">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Capabilities Focus Areas */}
            <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100">
              <h4 className="text-[13px] font-bold text-slate-900 uppercase tracking-widest mb-5 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#3DA5C4]" />
                Capability Focus Areas
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {capabilities.map((capability) => (
                  <span 
                    key={capability}
                    className="text-[13px] font-bold text-slate-600 bg-white hover:bg-slate-100 border border-slate-200 px-4 py-2 rounded-xl transition-all cursor-default shadow-sm hover:shadow-md"
                  >
                    {capability}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default SectorsSection;
