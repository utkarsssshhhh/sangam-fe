import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { Service } from '../data/services';

interface ServiceCardProps {
  service: Service;
  index: number;
  inView: boolean;
}

const ServiceCard = ({ service, index, inView }: ServiceCardProps) => {
  const Icon = service.icon;

  return (
    <motion.a
      href={`/services/${service.slug}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      className="group relative bg-white border border-slate-100 rounded-2xl p-7 overflow-hidden cursor-pointer hover-lift block no-underline"
      id={`service-card-${service.slug}`}
    >
      {/* Hover gradient border effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-secondary/20 via-accent/10 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute inset-[1px] rounded-[15px] bg-white z-0" />

      {/* Bottom accent bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-accent transform translate-y-1 group-hover:translate-y-0 transition-transform duration-500 z-10" />

      {/* Ambient glow on hover */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-mist rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-mist to-white border border-slate-100 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:border-secondary/30 group-hover:shadow-lg group-hover:shadow-secondary/5 transition-all duration-500">
          <Icon className="w-7 h-7 text-secondary group-hover:text-primary transition-colors duration-500" />
        </div>

        {/* Title + Arrow */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-lg font-heading font-bold text-primary leading-snug">
            {service.title}
          </h3>
          <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-secondary group-hover:border-secondary transition-all duration-300">
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors duration-300" />
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-500 text-sm leading-relaxed">
          {service.shortDesc}
        </p>

        {/* Learn More link */}
        <div className="mt-5 flex items-center gap-1.5 text-secondary text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <span>Learn More</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </motion.a>
  );
};

export default ServiceCard;
