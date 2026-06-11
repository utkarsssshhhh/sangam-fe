import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  ChevronRight,
  Zap,
  Target,
  Cpu,
  BarChart3,
  Shield,
  Lightbulb,
} from 'lucide-react';
import { getServiceBySlug, getRelatedServices } from '../data/services';
import Footer from '../components/FooterHome';

const benefitIcons = [Shield, Zap, Target, Lightbulb];

const ServiceDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = getServiceBySlug(slug || '');
  const relatedServices = getRelatedServices(slug || '', 3);

  const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: overviewRef, inView: overviewInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: featuresRef, inView: featuresInView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const { ref: useCasesRef, inView: useCasesInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: techRef, inView: techInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: statsRef, inView: statsInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: benefitsRef, inView: benefitsInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: relatedRef, inView: relatedInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  if (!service) {
    return (
      <div className="min-h-screen bg-white font-body flex items-center justify-center">
        <div className="text-center pt-32">
          <h1 className="text-4xl font-heading font-bold text-primary mb-4">Service Not Found</h1>
          <p className="text-slate-500 mb-8">The service you're looking for doesn't exist.</p>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </Link>
        </div>
      </div>
    );
  }

  const Icon = service.icon;

  return (
    <div className="min-h-screen bg-white font-body antialiased">
      {/* ===== HERO SECTION ===== */}
      <section
        ref={heroRef}
        className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-primary to-secondary" />
        {service.imgUrl && (
          <div 
            className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-70"
            style={{ backgroundImage: `url(${service.imgUrl})` }}
          />
        )}
        {/* Contrast overlay to ensure readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/30 via-navy/50 to-navy/80 pointer-events-none" />
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-white/50 text-xs font-medium mb-8"
          >
            <Link to="/services" className="hover:text-white/80 transition-colors">Services</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/80">{service.title}</span>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16">
            {/* Left Content */}
            <div className="flex-1">
              {/* Icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5 }}
                className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-6"
              >
                <Icon className="w-8 h-8 text-accent" />
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-white leading-[1.1] tracking-tight mb-4"
              >
                {service.title}
              </motion.h1>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-white/70 text-lg md:text-xl font-light max-w-lg mb-8"
              >
                {service.heroTagline}
              </motion.p>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <a
                  href="#"
                  className="inline-flex items-center justify-center gap-2 bg-white text-primary font-bold px-7 py-3.5 rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 text-sm"
                >
                  Get Started <ArrowUpRight className="w-4 h-4" />
                </a>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-white/10 transition-all duration-300 text-sm"
                >
                  <ArrowLeft className="w-4 h-4" /> All Services
                </Link>
              </motion.div>
            </div>

            {/* Right: Stats Grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="w-full lg:w-auto grid grid-cols-2 gap-4 lg:min-w-[320px]"
            >
              {service.stats.map((stat, i) => (
                <div
                  key={i}
                  className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-5 text-center hover:bg-white/15 transition-all duration-300"
                >
                  <div className="text-2xl md:text-3xl font-heading font-black text-white">{stat.value}</div>
                  <div className="text-[10px] text-white/50 font-bold uppercase tracking-wider mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== OVERVIEW SECTION ===== */}
      <section ref={overviewRef} className="section-padding">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={overviewInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-6">
              Overview
            </h2>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed">
              {service.fullDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== KEY FEATURES ===== */}
      <section
        ref={featuresRef}
        className="section-padding bg-gradient-to-b from-slate-50/50 to-white"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-3">
              Key Features
            </h2>
            <p className="text-slate-500 text-sm max-w-lg mx-auto">
              Core capabilities that power this service
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {service.features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group bg-white border border-slate-100 rounded-xl p-6 hover:shadow-lg hover:border-secondary/20 transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0 group-hover:bg-secondary/20 transition-colors duration-300">
                    <Check className="w-4 h-4 text-secondary" />
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed font-medium">{feature}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== USE CASES ===== */}
      <section ref={useCasesRef} className="section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={useCasesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-3">
              Real-World Use Cases
            </h2>
            <p className="text-slate-500 text-sm max-w-lg mx-auto">
              Where this service makes the biggest impact
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {service.useCases.map((useCase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={useCasesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative bg-gradient-to-br from-mist/50 to-white border border-slate-100 rounded-xl p-6 hover:shadow-md transition-all duration-300 group"
              >
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-secondary/5 flex items-center justify-center text-xs font-heading font-bold text-secondary">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <Target className="w-5 h-5 text-secondary mb-3 group-hover:scale-110 transition-transform duration-300" />
                <p className="text-sm text-slate-700 font-medium leading-relaxed pr-8">{useCase}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TECHNOLOGY STACK ===== */}
      <section
        ref={techRef}
        className="section-padding bg-gradient-to-b from-white to-slate-50/50"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={techInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-3">
              Technology Stack
            </h2>
            <p className="text-slate-500 text-sm max-w-lg mx-auto">
              The tools and platforms powering this service
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3">
            {service.techStack.map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={techInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                className="inline-flex items-center gap-2 bg-white border border-slate-100 px-5 py-3 rounded-xl text-sm font-semibold text-primary hover:border-secondary/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <Cpu className="w-4 h-4 text-secondary" />
                {tech}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== IMPACT STATS ===== */}
      <section ref={statsRef} className="py-16 md:py-20 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={statsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto bg-gradient-to-br from-navy via-primary to-secondary rounded-3xl p-10 md:p-14 relative overflow-hidden shadow-xl"
        >
          {/* Pattern */}
          <div className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '28px 28px',
            }}
          />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-8 justify-center">
              <BarChart3 className="w-5 h-5 text-accent" />
              <h2 className="text-xl md:text-2xl font-heading font-bold text-white">
                Impact Metrics
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {service.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={statsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-heading font-black text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-[10px] text-white/50 font-bold uppercase tracking-widest">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== BENEFITS ===== */}
      <section ref={benefitsRef} className="section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-3">
              Key Benefits
            </h2>
            <p className="text-slate-500 text-sm max-w-lg mx-auto">
              The value this service delivers to your organisation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {service.benefits.map((benefit, i) => {
              const BenefitIcon = benefitIcons[i % benefitIcons.length];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  animate={benefitsInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-start gap-4 bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-lg hover:border-secondary/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary/10 to-accent/10 flex items-center justify-center shrink-0">
                    <BenefitIcon className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-base font-heading font-bold text-primary mb-1.5">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {benefit.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-16 md:py-20 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center bg-gradient-to-br from-mist to-white border border-slate-100 rounded-3xl p-12 md:p-16 relative overflow-hidden shadow-sm"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-4">
              Interested in {service.title}?
            </h2>
            <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto mb-8">
              Our team is ready to discuss how this service can be tailored to your specific requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white font-bold px-8 py-3.5 rounded-xl hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 text-sm"
              >
                Contact Us <ArrowUpRight className="w-4 h-4" />
              </a>
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 border border-slate-200 text-primary font-semibold px-8 py-3.5 rounded-xl hover:bg-slate-50 transition-all duration-300 text-sm"
              >
                <ArrowLeft className="w-4 h-4" /> Browse All Services
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== RELATED SERVICES ===== */}
      <section
        ref={relatedRef}
        className="section-padding bg-gradient-to-b from-white to-slate-50/30"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={relatedInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-3">
              Related Services
            </h2>
            <p className="text-slate-500 text-sm max-w-lg mx-auto">
              Explore more of our environmental intelligence capabilities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedServices.map((related, i) => {
              const RelatedIcon = related.icon;
              return (
                <motion.a
                  key={related.slug}
                  href={`/services/${related.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 30 }}
                  animate={relatedInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-xl hover:border-secondary/20 hover:-translate-y-1 transition-all duration-500 block no-underline"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-mist flex items-center justify-center group-hover:bg-secondary/10 transition-colors duration-300">
                      <RelatedIcon className="w-6 h-6 text-secondary" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-secondary transition-colors duration-300" />
                  </div>
                  <h3 className="text-base font-heading font-bold text-primary mb-2">
                    {related.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {related.shortDesc}
                  </p>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServiceDetailPage;
