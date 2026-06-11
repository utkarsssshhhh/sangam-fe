import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Sparkles } from 'lucide-react';
import { services } from '../data/services';
import Footer from '../components/FooterHome';
import ServiceCard from '../components/ServiceCard';

const ServicesPage = () => {
  const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: gridRef, inView: gridInView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const { ref: ctaRef, inView: ctaInView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div className="min-h-screen bg-white font-body antialiased">
      {/* ===== HERO SECTION ===== */}
      <section
        ref={heroRef}
        className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden"
      >
        {/* Background Decorations */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-gradient-to-bl from-mist/80 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-gradient-to-tr from-secondary/5 via-transparent to-transparent" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />

          {/* Grid Pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(#0B3C5D 1px, transparent 1px), linear-gradient(90deg, #0B3C5D 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/5 border border-secondary/10 mb-8"
          >
            <Sparkles className="w-3.5 h-3.5 text-secondary" />
            <span className="text-secondary font-bold text-xs uppercase tracking-wider">11 Capability Areas</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black text-primary leading-[1.05] tracking-tight mb-6"
          >
            Environmental{' '}
            <span className="gradient-text">Intelligence</span>
            <br />
            <span className="text-secondary">Services</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10"
          >
            From satellite sensing to digital twins — comprehensive technology
            solutions for water, waste, and environmental monitoring across India.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#services-grid"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white font-semibold px-8 py-3.5 rounded-xl hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 text-sm"
            >
              Explore All Services <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* Floating Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="relative max-w-4xl mx-auto px-6 md:px-12 mt-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '11', label: 'Service Areas' },
              { value: '42+', label: 'Active Nodes' },
              { value: '14+', label: 'Field Events' },
              { value: '2,800+', label: 'Kg Impact' },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white/70 backdrop-blur-sm border border-slate-100 rounded-2xl p-5 text-center hover:shadow-lg hover:border-secondary/20 transition-all duration-300"
              >
                <div className="text-2xl md:text-3xl font-heading font-black text-primary">{stat.value}</div>
                <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ===== SERVICES GRID ===== */}
      <section
        id="services-grid"
        ref={gridRef}
        className="section-padding bg-gradient-to-b from-white via-slate-50/50 to-white"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={gridInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
              Our Capabilities
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm md:text-base">
              Click any service to explore it in depth — each opens in a new tab with complete details.
            </p>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ServiceCard
                key={service.slug}
                service={service}
                index={index}
                inView={gridInView}
              />
            ))}

            {/* Why Pravayan Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: services.length * 0.08 }}
              className="relative bg-gradient-to-br from-primary via-primary to-secondary rounded-2xl p-7 overflow-hidden flex flex-col justify-center shadow-xl"
            >
              {/* Pattern overlay */}
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                  backgroundSize: '24px 24px',
                }}
              />

              <div className="relative z-10">
                <h3 className="text-2xl font-heading font-bold text-white mb-5">
                  Why Pravayan
                </h3>
                <ul className="space-y-3">
                  {[
                    { label: 'Integrated', desc: 'End-to-end sensing to decision' },
                    { label: 'Decision-first', desc: 'Built for action, not just data' },
                    { label: 'Built for India', desc: 'Engineered for local conditions' },
                    { label: 'Scalable', desc: 'From pilot to national deployment' },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-accent mt-1.5 shrink-0" />
                      <div>
                        <span className="text-white font-semibold text-sm">{item.label}</span>
                        <span className="text-white/60 text-xs ml-2">— {item.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section ref={ctaRef} className="section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center bg-gradient-to-br from-navy via-primary to-secondary rounded-3xl p-12 md:p-16 relative overflow-hidden shadow-2xl"
        >
          {/* Ambient glows */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Ready to transform your environmental operations?
            </h2>
            <p className="text-white/70 text-sm md:text-base max-w-xl mx-auto mb-8">
              Get in touch with our team to discuss how Pravayan's technology can address your specific challenges.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-3.5 rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 text-sm"
            >
              Contact Us <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;
