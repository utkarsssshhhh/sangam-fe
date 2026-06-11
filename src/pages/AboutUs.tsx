import React from 'react';
import { motion } from 'framer-motion';
import { Target, Lightbulb, Compass, Shield, Zap, Globe, Users } from 'lucide-react';
import FooterHome from '../components/FooterHome';

const members = [
  {
    name: 'Mrs. Swati Gupta',
    role: 'Director & Majority Promoter',
    location: 'Lucknow, Uttar Pradesh',
    image: '/SWATI.jpg',
    points: [
      'B.Tech in Computer Science & Engineering',
      'Expertise in AI/ML systems, cloud platform design & digital twin integration',
      'Leads product development, technology strategy & day-to-day business operations'
    ]
  },
  {
    name: 'Dr. Pawan Labhasetwar',
    role: 'Director & Strategic Advisor',
    location: 'Nagpur, Maharashtra',
    image: '/Pawan_Labhasetwar_Photo.jpeg',
    points: [
      'Professor of Practice, IIT Madras; formerly Chief Scientist, CSIR-NEERI, Nagpur',
      '30+ years in water treatment technologies, environmental policy & sustainability',
      'Provides strategic direction on water science & facilitates govt./industry partnerships'
    ]
  },
  {
    name: 'Mr. Yaswanth Aragonda',
    role: 'Director — Geospatial & Operations',
    location: 'Tirupathi, Andhra Pradesh',
    image: '/yaswanth_aragonda.jpeg',
    points: [
      'B.Tech Civil Engg; M.Tech in Remote Sensing & GIS; PhD (pursuing), IIT Roorkee',
      'Specialises in geospatial analytics, satellite data processing & hydrological modelling',
      'Leads technical team in system integration, computational modelling & field deployment'
    ]
  }
];

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

      {/* ===== TEAM MEMBERS ===== */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-slate-100 text-slate-600 font-bold text-xs uppercase tracking-widest mb-6">
            <Users size={14} /> Leadership
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Meet the Team</h2>
          <p className="text-slate-500 max-w-2xl mx-auto font-medium text-lg">The scientists, engineers, and visionaries building Pravayan.</p>
        </div>

        <div className="flex flex-col gap-12">
          {members.map((member, idx) => (
            <div key={idx} className="bg-white rounded-[2rem] p-8 md:p-10 border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col md:flex-row gap-8 lg:gap-12 items-start md:items-center">
              
              {/* Image Container */}
              <div className="w-full md:w-1/3 shrink-0">
                <div className="aspect-[3/4] md:aspect-square lg:aspect-[4/5] rounded-[1.5rem] overflow-hidden bg-slate-50 relative border border-slate-100 shadow-inner">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                </div>
              </div>
              
              {/* Text Info */}
              <div className="w-full md:w-2/3 flex flex-col justify-center">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="text-3xl font-extrabold text-slate-900">{member.name}</h3>
                </div>
                
                <p className="text-lg font-bold text-[#3DA5C4] mb-6">{member.role}</p>
                
                <ul className="space-y-4 mb-8">
                  {member.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-slate-300" />
                      <span className="text-slate-600 font-medium leading-relaxed text-[15px]">{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-2 text-slate-500 text-sm font-semibold pt-4 border-t border-slate-100">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  {member.location}
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      <FooterHome />
    </div>
  );
};

export default AboutUs;
