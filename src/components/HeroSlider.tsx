import React, { useState, useEffect, useCallback } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Droplets, 
  MapPin, 
  Trash2, 
  Eye, 
  Cpu, 
  Activity, 
  Waves, 
  CloudRain, 
  FileText, 
  Layers, 
  Filter 
} from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  badge: string;
  bgColor: string;
  imgUrl: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'Digital Twins',
    description: 'Living virtual replicas to test decisions before you build.',
    icon: Layers,
    badge: 'Digital Twins',
    bgColor: 'from-[#0d1b2a] via-[#3DA5C4] to-[#0d1b2a]',
    imgUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1920&auto=format&fit=crop',
  },
  {
    id: 11,
    title: 'Water Quality Monitoring',
    description: 'Live, predictive monitoring of rivers, reservoirs, and networks — from satellites to sensors.',
    icon: Droplets,
    badge: 'Real-time Sensing',
    bgColor: 'from-[#0B3C5D] via-[#1C7C9C] to-[#0B3C5D]',
    imgUrl: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?q=80&w=1920&auto=format&fit=crop',
  },

  {
    id: 3,
    title: 'Geospatial Pollution Tracking',
    description: 'Finding and quantifying pollution sources across whole landscapes.',
    icon: MapPin,
    badge: 'GIS & Mapping',
    bgColor: 'from-[#0B3C5D] via-[#3DA5C4] to-[#0B3C5D]',
    imgUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Smart Waste Management',
    description: 'Mapping, measuring, and managing solid waste, including tourist hotspots.',
    icon: Trash2,
    badge: 'Waste Management',
    bgColor: 'from-[#1a2a6c] via-[#5A9E6F] to-[#1a2a6c]',
    imgUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1920&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'Spectral Intelligence',
    description: 'Seeing what the eye can\'t — in multispectral and hyperspectral data.',
    icon: Eye,
    badge: 'Remote Sensing',
    bgColor: 'from-[#6D5E9E] via-[#1C7C9C] to-[#6D5E9E]',
    imgUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1920&auto=format&fit=crop',
  },
  {
    id: 6,
    title: 'IoT Sensor Networks',
    description: 'An always-on nervous system for your water and environmental systems.',
    icon: Cpu,
    badge: 'Edge AI & IoT',
    bgColor: 'from-[#0d1b2a] via-[#1C7C9C] to-[#0d1b2a]',
    imgUrl: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=1920&auto=format&fit=crop',
  },
  {
    id: 7,
    title: 'River Health Assessment',
    description: 'Objective, science-based health checks for river corridors.',
    icon: Activity,
    badge: 'Eco Assessment',
    bgColor: 'from-[#0B3C5D] via-[#5A9E6F] to-[#0B3C5D]',
    imgUrl: 'https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?q=80&w=1920&auto=format&fit=crop',
  },
  {
    id: 8,
    title: 'Urban Water & Leak Detection',
    description: 'Digital twins that cut water loss and protect infrastructure.',
    icon: Waves,
    badge: 'Infrastructure',
    bgColor: 'from-[#1C7C9C] via-[#0B3C5D] to-[#1C7C9C]',
    imgUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1920&auto=format&fit=crop',
  },
  {
    id: 9,
    title: 'Climate Resilience Planning',
    description: 'Planning water security for an uncertain and changing climate.',
    icon: CloudRain,
    badge: 'Climate Security',
    bgColor: 'from-[#6D5E9E] via-[#0d1b2a] to-[#6D5E9E]',
    imgUrl: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?q=80&w=1920&auto=format&fit=crop',
  },
  {
    id: 10,
    title: 'Compliance & Reporting',
    description: 'Automated, audit-ready environmental compliance reporting.',
    icon: FileText,
    badge: 'Compliance',
    bgColor: 'from-[#0B3C5D] via-[#1C7C9C] to-[#0B3C5D]',
    imgUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1920&auto=format&fit=crop',
  },

  {
    id: 12,
    title: 'Treatment Solutions',
    description: 'Compact STP, ETP, RO, and tank systems that treat water on site.',
    icon: Filter,
    badge: 'Decentralized Treatment',
    bgColor: 'from-[#1a2a6c] via-[#1C7C9C] to-[#1a2a6c]',
    imgUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1920&auto=format&fit=crop',
  },
];

const HeroSlider: React.FC = () => {
  const [current, setCurrent] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent(index);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 1000);
    },
    [isTransitioning]
  );

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length);
  }, [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next]);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEndHandler = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      next();
    } else if (isRightSwipe) {
      prev();
    }
  };

  return (
    <section 
      className="hero-slider hero-slider--services" 
      aria-label="Hero Slideshow"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEndHandler}
    >
      
      {/* Sliding Track */}
      <div 
        className="hero-slider-track"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => {
          const SlideIcon = slide.icon;
          const isActive = index === current;
          return (
            <div 
              key={slide.id} 
              className={`hero-slide-item ${isActive ? 'active' : ''}`}
              aria-hidden={!isActive}
            >
              {/* Background Layer */}
              <div
                className="hero-bg"
                style={{ backgroundImage: `url(${slide.imgUrl})` }}
              />
              <div className="hero-overlay" />

              {/* Animated Particles */}
              <div className="hero-particles" aria-hidden="true">
                {[...Array(6)].map((_, i) => (
                  <span key={i} className="particle" style={{ '--i': i } as React.CSSProperties} />
                ))}
              </div>

              {/* Content */}
              <div className="hero-content">
                <div className="hero-badge">
                  <SlideIcon className="hero-badge__icon" />
                  <span>{slide.badge}</span>
                </div>

                <h1 className="hero-title">{slide.title}</h1>
                <div className="hero-desc-wrapper">
                  <p className="hero-desc">{slide.description}</p>
                </div>

        <div className="hero-actions">
          <a href="/products" target="_blank" rel="noopener noreferrer" className="btn btn--primary">Explore Products</a>
          <a href="#contact" className="btn btn--outline">Consult with Us</a>
        </div>
      </div>
            </div>
          );
        })}
      </div>

      {/* Edge Arrows */}
      <div className="hero-edge-arrows" aria-hidden="true">
        <button onClick={prev} className="hero-arrow hero-arrow--left" aria-label="Previous slide">
          <ChevronLeft size={32} />
        </button>
        <button onClick={next} className="hero-arrow hero-arrow--right" aria-label="Next slide">
          <ChevronRight size={32} />
        </button>
      </div>

      {/* Bottom Controls */}
      <div className="hero-bottom-controls">
        <div className="hero-dots-container">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`hero-dot-small ${i === current ? 'hero-dot-small--active' : ''}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="hero-progress" aria-hidden="true">
        <div key={current} className="hero-progress__bar" />
      </div>
    </section>
  );
};

export default HeroSlider;
