import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowRight, Droplets, Wind, Sprout, Activity, Waves, CloudRain } from 'lucide-react';

interface ResearchArea {
  id: string;
  icon: React.ElementType;
  title: string;
  shortDesc: string;
  longDesc: string;
  image: string;
  color: string;
  tags: string[];
}

const researchAreas: ResearchArea[] = [
  {
    id: 'water',
    icon: Droplets,
    title: 'Water Quality Monitoring',
    shortDesc: 'Continuous chemical, physical, and biological water intelligence.',
    longDesc: 'We develop robust, end-to-end water quality sensing systems. By pairing custom IoT hardware with satellite remote sensing pipelines, we track parameters like pH, dissolved oxygen, BOD, and heavy metals. Machine learning models predict contaminant plumes and algal blooms before they impact networks.',
    image: '/research_water.png',
    color: '#1C7C9C',
    tags: ['Eutrophication', 'Turbidity Maps', 'IoT Telemetry', 'Heavy Metals'],
  },
  {
    id: 'air',
    icon: Wind,
    title: 'Air Quality & Emissions',
    shortDesc: 'Spatially dense particulate and gas monitoring.',
    longDesc: 'Using high-resolution atmospheric models and micro-sensor networks, we monitor PM2.5, PM10, NOx, and greenhouse gases. Our algorithms attribute pollution incidents to local industrial sources, helping regulatory bodies enforce standards effectively.',
    image: '/research_air.png',
    color: '#3DA5C4',
    tags: ['Aerosol Optical Depth', 'Source Apportionment', 'Gas Sensing', 'Micro-climate'],
  },
  {
    id: 'soil',
    icon: Sprout,
    title: 'Soil & Agriculture Analytics',
    shortDesc: 'Soil moisture, nutrients, and agricultural runoff tracking.',
    longDesc: 'Our agricultural soil sensors measure moisture gradients and NPK levels, feeding into crop yield and runoff projection models. We trace fertilizer leaching into aquifers to design optimal buffer zones for river health preservation.',
    image: '/research_soil.png',
    color: '#5A9E6F',
    tags: ['NPK Analysis', 'Moisture Profiling', 'Runoff Modeling', 'Precision Ag'],
  },
  {
    id: 'hydrology',
    icon: Waves,
    title: 'Hydrological Modeling',
    shortDesc: 'Catchment dynamics, flood routing, and groundwater simulation.',
    longDesc: 'We construct physics-based 3D models of watersheds, simulating rainfall-runoff, flow routing, and groundwater recharge. These digital twins allow planners to model urban flood mitigation and reservoir operations safely.',
    image: '/research_hydro.png',
    color: '#0B3C5D',
    tags: ['Runoff Simulation', 'District Leak Twins', 'Catchment Yield', 'Water Balance'],
  },
  {
    id: 'climate',
    icon: CloudRain,
    title: 'Climate Risk & Resilience',
    shortDesc: 'Long-term environmental security scenario planning.',
    longDesc: 'Downscaling global GCM data, we translate global climate warming models into localized rainfall, temperature, and sea-level risk reports. We help municipalities design climate-proof stormwater and drinking water infrastructure.',
    image: '/research_climate.png',
    color: '#6D5E9E',
    tags: ['CMIP6 Downscaling', 'Vulnerability Audits', 'Asset Protection', 'Carbon Sink Maps'],
  },

];

const ResearchAreas: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>('water');
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab && researchAreas.some(a => a.id === tab)) {
      setActiveTab(tab);
    }
  }, [location.search]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('research--visible');
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const activeArea = researchAreas.find((a) => a.id === activeTab) || researchAreas[0];
  const ActiveIcon = activeArea.icon;

  return (
    <section ref={sectionRef} id="research" className="py-24 bg-[#f8fafc] relative" aria-label="Areas of Research">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[13px] font-bold uppercase tracking-widest text-[#1C7C9C] bg-[#1C7C9C]/10 px-4 py-1.5 rounded-full border border-[#1C7C9C]/20">Domains</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mt-6 mb-6">Areas of Research</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Exploring the intersection of data science, sensor physics, and environmental biology.
          </p>
        </div>

        {/* Enhanced Tabbed Layout Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white rounded-[2rem] p-4 lg:p-6 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-slate-100 min-h-[650px]">
          
          {/* Left Panel: Sleek Tabs */}
          <div className="lg:col-span-4 flex flex-col gap-2 relative z-20">
            {researchAreas.map((area) => {
              const TabIcon = area.icon;
              const isActive = area.id === activeTab;
              return (
                <button
                  key={area.id}
                  onClick={() => setActiveTab(area.id)}
                  className={`group flex items-center gap-4 p-4 lg:p-5 rounded-2xl transition-all duration-300 text-left w-full ${
                    isActive 
                      ? 'bg-slate-900 text-white shadow-xl translate-x-2' 
                      : 'hover:bg-slate-50 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <div 
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}
                    style={{ backgroundColor: isActive ? `${area.color}20` : `${area.color}15`, color: isActive ? '#fff' : area.color }}
                  >
                    <TabIcon size={22} strokeWidth={isActive ? 2.5 : 2} />
                  </div>
                  <div>
                    <h4 className={`text-[15px] font-bold mb-1 transition-colors ${isActive ? 'text-white' : 'text-slate-900'}`}>{area.title}</h4>
                    <p className={`text-[13px] line-clamp-1 leading-snug transition-colors ${isActive ? 'text-slate-400' : 'text-slate-500'}`}>{area.shortDesc}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Panel: Cinematic Full-Image Background */}
          <div className="lg:col-span-8 relative rounded-3xl overflow-hidden shadow-2xl flex items-end min-h-[400px] lg:min-h-full group">
            {/* Background Image that changes based on active tab */}
            <img 
              key={activeArea.id}
              src={activeArea.image} 
              alt={activeArea.title} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out scale-100 group-hover:scale-105"
            />
            
            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B3C5D]/95 via-[#0B3C5D]/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B3C5D]/90 via-[#0B3C5D]/40 to-transparent" />

            {/* Content Container (Frosted Glass) */}
            <div className="relative z-10 p-8 md:p-12 w-full max-w-3xl">
              <div className="flex items-center gap-4 mb-4 animate-[fadeInUp_0.6s_ease-out_forwards]">
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white backdrop-blur-md border border-white/20 shadow-lg shrink-0"
                  style={{ backgroundColor: `${activeArea.color}90` }}
                >
                  <ActiveIcon size={28} strokeWidth={2.5} />
                </div>
                <h3 key={`title-${activeArea.id}`} className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                  {activeArea.title}
                </h3>
              </div>
              
              <p key={`desc-${activeArea.id}`} className="text-[15px] md:text-[17px] text-slate-300 leading-relaxed mb-8 animate-[fadeInUp_0.7s_ease-out_forwards]">
                {activeArea.longDesc}
              </p>
              
              {/* Tags */}
              <div key={`tags-${activeArea.id}`} className="flex flex-wrap gap-2.5 mb-8 animate-[fadeInUp_0.8s_ease-out_forwards]">
                {activeArea.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="text-[11px] font-bold text-white bg-white/10 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-full uppercase tracking-wider hover:bg-white/20 transition-colors cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <a 
                href="/products"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-accent hover:text-white hover:gap-3 transition-all animate-[fadeInUp_0.9s_ease-out_forwards]"
              >
                <span>View Related Products</span>
                <ArrowRight size={14} />
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default ResearchAreas;
