import React, { useEffect } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import FooterHome from '../components/FooterHome';

interface ProductData {
  title: string;
  subtitle: string;
  capacity: string;
  cardLabel: string;
  description: string;
  image: string;
  features: string[];
}

const treatmentProducts: ProductData[] = [
  {
    title: "Packaged STP",
    subtitle: "Apartments, schools, hospitals, hotels",
    capacity: "5 KLD – 500 KLD",
    cardLabel: "PACKAGED STP",
    description: "Our Packaged Sewage Treatment Plants (STP) are compact, high-efficiency systems designed to treat wastewater in space-constrained environments. Built with robust materials and automated controls, they ensure reliable operation, minimal footprint, and compliance with stringent environmental standards.",
    image: "/packaged_stp.png",
    features: ["Compact Design", "Automated Operation", "Low Maintenance", "High Quality Effluent"]
  },
  {
    title: "Packaged ETP",
    subtitle: "Industries, food, textile",
    capacity: "1 KLD – 200 KLD",
    cardLabel: "PACKAGED ETP",
    description: "Designed specifically for complex industrial wastewater, our Packaged Effluent Treatment Plants (ETP) utilize advanced physio-chemical and biological processes to remove heavy metals, toxic chemicals, and high organic loads. They are pre-engineered for rapid installation.",
    image: "/packaged_etp.png",
    features: ["Customized Treatment", "Robust Construction", "Regulatory Compliance", "Resource Recovery"]
  },
  {
    title: "RO & Membrane Systems",
    subtitle: "Drinking & industrial water",
    capacity: "250 LPH – 50,000 LPH",
    cardLabel: "RO SYSTEMS",
    description: "Our state-of-the-art reverse osmosis and membrane filtration systems deliver high-purity water for drinking and industrial processes. By employing advanced membrane technology, these systems effectively remove dissolved solids, bacteria, and other contaminants.",
    image: "/ro_membrane.png",
    features: ["High Rejection Rates", "Energy Efficient", "Scalable Capacity", "Smart Monitoring"]
  },
  {
    title: "Containerised / Mobile Plant",
    subtitle: "Remote sites, disaster relief",
    capacity: "10 KLD – 100 KLD",
    cardLabel: "MOBILE PLANT",
    description: "Built for extreme mobility and rapid deployment, our containerized water treatment plants are housed within standard shipping containers. They are fully integrated 'plug-and-play' systems, perfect for remote construction sites or emergency disaster relief operations.",
    image: "/mobile_plant.png",
    features: ["Plug-and-Play", "Ruggedized Build", "Rapid Deployment", "Self-Contained"]
  },
  {
    title: "Tank-Based Systems",
    subtitle: "Homes, schools, communities",
    capacity: "500 L – 25,000 L+",
    cardLabel: "TANK SYSTEMS",
    description: "Our tank-based treatment systems provide scalable and cost-effective water purification and wastewater management for communities and large facilities. Featuring durable, large-capacity tanks and integrated treatment modules, they offer a reliable long-term solution.",
    image: "/tank_system.png",
    features: ["Large Scale Capacity", "Durable Materials", "Cost Effective", "Flexible Layout"]
  }
];

const Treatment: React.FC = () => {

  useEffect(() => {
    // Ensure we scroll to top on mount/reload
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="flex-grow">
        {/* Hero Section */}
        <section className="bg-slate-900 text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Treatment Solutions
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              High-performance, scalable systems engineered for reliable water and wastewater treatment across municipal, industrial, and decentralized applications.
            </p>
          </div>
        </section>

        {/* Capabilities Overview */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Column: List */}
            <div className="space-y-8">
              {treatmentProducts.map((product, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                    <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-slate-900">{product.title}</h3>
                    <p className="text-slate-500 mt-1">{product.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: Capacity Cards */}
            <div className="relative">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-4 pt-0 sm:pt-8">
                  {/* Packaged STP Card */}
                  <div className="bg-[#f0f4f8] rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-all">
                    <span className="text-xl font-black text-slate-800 mb-2">{treatmentProducts[0].capacity}</span>
                    <span className="text-xs font-semibold text-slate-500 tracking-widest uppercase">{treatmentProducts[0].cardLabel}</span>
                  </div>
                  {/* RO Systems Card */}
                  <div className="bg-[#f0f4f8] rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-all">
                    <span className="text-xl font-black text-slate-800 mb-2">{treatmentProducts[2].capacity}</span>
                    <span className="text-xs font-semibold text-slate-500 tracking-widest uppercase">{treatmentProducts[2].cardLabel}</span>
                  </div>
                  {/* Tank Systems Card */}
                  <div className="bg-[#f0f4f8] rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-all">
                    <span className="text-xl font-black text-slate-800 mb-2">{treatmentProducts[4].capacity}</span>
                    <span className="text-xs font-semibold text-slate-500 tracking-widest uppercase">{treatmentProducts[4].cardLabel}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  {/* Packaged ETP Card */}
                  <div className="bg-[#f0f4f8] rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-all">
                    <span className="text-xl font-black text-slate-800 mb-2">{treatmentProducts[1].capacity}</span>
                    <span className="text-xs font-semibold text-slate-500 tracking-widest uppercase">{treatmentProducts[1].cardLabel}</span>
                  </div>
                  {/* Mobile Plant Card */}
                  <div className="bg-[#f0f4f8] rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-all">
                    <span className="text-xl font-black text-slate-800 mb-2">{treatmentProducts[3].capacity}</span>
                    <span className="text-xs font-semibold text-slate-500 tracking-widest uppercase">{treatmentProducts[3].cardLabel}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Products Section */}
        <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-24">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Technology</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">Explore our range of treatment systems designed for efficiency, reliability, and scale.</p>
            </div>
            
            {treatmentProducts.map((product, index) => (
              <div key={index} className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="w-full lg:w-1/2">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative bg-slate-100 group">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80`;
                      }}
                    />
                    <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl"></div>
                  </div>
                </div>
                <div className="w-full lg:w-1/2 space-y-6">
                  <div>
                    <h3 className="text-3xl font-bold text-slate-900">{product.title}</h3>
                    <p className="text-lg text-blue-600 font-medium mt-2">{product.capacity}</p>
                  </div>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    {product.description}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    {product.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center text-slate-700">
                        <CheckCircle2 className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
                        <span className="font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      
      <FooterHome />
    </div>
  );
};

export default Treatment;
