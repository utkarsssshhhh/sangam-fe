import React from 'react';
import { motion } from 'framer-motion';
import { Target, Lightbulb, Compass, Shield, Zap, Globe } from 'lucide-react';
import FooterHome from '../components/FooterHome';



const statements = [
  {
    icon: Shield,
    title: 'Integrity in Data',
    desc: 'We believe environmental decisions must be backed by unassailable, precision-calibrated data streams.'
  },
  {
    icon: Globe,
    title: 'Global Impact, Local Action',
    desc: 'Our models are globally informed but locally tuned to empower municipalities and regional planners directly.'
  },
  {
    icon: Zap,
    title: 'Agile Innovation',
    desc: 'The climate crisis moves fast; our hardware and software pipelines iterate faster to stay ahead of the curve.'
  }
];

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-body pt-24 md:pt-32">
      
      {/* ===== HEADER ===== */}
      <section className="relative px-6 md:px-12 max-w-7xl mx-auto mb-20 md:mb-32">
        <div className="text-center max-w-3xl mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block py-1.5 px-4 rounded-full bg-[#3DA5C4]/10 text-[#3DA5C4] font-bold text-xs uppercase tracking-widest mb-6"
          >
            Who We Are
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-8 leading-tight"
          >
            Pioneering the Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1C7C9C] to-[#3DA5C4]">Environmental Intelligence</span>
          </motion.h1>
        </div>
      </section>

      {/* ===== VISION & AMBITION ===== */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto mb-32">
        <div className="flex flex-col gap-12 lg:gap-16">
          
          {/* Vision */}
          <div className="relative rounded-[3rem] overflow-hidden group min-h-[400px] flex items-center p-8 lg:p-16 shadow-2xl">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img src="/about_vision.png" alt="Vision" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-[1.5s] ease-out" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/20" />
            </div>

            <div className="relative z-10 max-w-2xl">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center shadow-inner mb-8 text-white">
                <Compass size={32} strokeWidth={2.5} />
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">Our Vision</h2>
              <p className="text-white/90 leading-relaxed text-lg md:text-xl font-medium">
                To create a world where absolute ecological transparency exists—where governments, industries, and communities have instant, irrefutable access to the health metrics of their water, air, and soil ecosystems, enabling a truly sustainable coexistence.
              </p>
            </div>
          </div>

          {/* Ambition */}
          <div className="relative rounded-[3rem] overflow-hidden group min-h-[400px] flex items-center justify-end p-8 lg:p-16 shadow-2xl">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img src="/about_ambition.png" alt="Ambition" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-[1.5s] ease-out" />
              <div className="absolute inset-0 bg-gradient-to-l from-[#0B3C5D]/95 via-[#0B3C5D]/80 to-[#0B3C5D]/20" />
            </div>

            <div className="relative z-10 max-w-2xl text-right flex flex-col items-end">
              <div className="w-16 h-16 bg-[#3DA5C4]/20 backdrop-blur-md border border-[#3DA5C4]/30 rounded-2xl flex items-center justify-center shadow-inner mb-8 text-white">
                <Target size={32} strokeWidth={2.5} />
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">Our Ambition</h2>
              <p className="text-white/90 leading-relaxed text-lg md:text-xl font-medium text-right">
                To deploy the world's most robust and spatially dense IoT sensor networks across the global south by 2030. We aim to translate raw environmental data into predictive, actionable intelligence that permanently shifts how infrastructure and conservation are funded.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ===== STATEMENTS ===== */}
      <section className="bg-slate-50 py-32 border-y border-slate-100">
        <div className="px-6 md:px-12 max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Core Statements</h2>
            <p className="text-slate-500 max-w-2xl mx-auto font-medium text-lg">The principles that drive our research, engineering, and partnerships.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {statements.map((stmt, idx) => {
              const Icon = stmt.icon;
              return (
                <div key={idx} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-[#3DA5C4]/10 text-[#3DA5C4] flex items-center justify-center mb-6">
                    <Icon size={24} strokeWidth={2.5} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{stmt.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{stmt.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>



      <FooterHome />
    </div>
  );
};

export default AboutUs;
