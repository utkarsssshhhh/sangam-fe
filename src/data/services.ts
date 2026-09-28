import type { LucideIcon } from 'lucide-react';
import {
  Waves,
  Plane,
  MapPin,
  Trash2,
  Camera,
  Cpu,
  ActivitySquare,
  Droplets,
  CloudRain,
  FileCheck,
  Layers,
} from 'lucide-react';

export interface ServiceBenefit {
  title: string;
  desc: string;
}

export interface ServiceStat {
  value: string;
  label: string;
}

export interface Service {
  slug: string;
  title: string;
  shortDesc: string;
  icon: LucideIcon;
  heroTagline: string;
  fullDescription: string;
  features: string[];
  useCases: string[];
  techStack: string[];
  benefits: ServiceBenefit[];
  stats: ServiceStat[];
  imgUrl?: string;
}

export const services: Service[] = [
  {
    slug: 'digital-twins-simulation',
    title: 'Digital Twins',
    shortDesc: 'Living virtual replicas to test decisions before you build.',
    icon: Layers,
    imgUrl: '/DigitalTwinImg.png',
    heroTagline: 'Build it digitally. Perfect it virtually. Deploy confidently.',
    fullDescription:
      'Sangam\'s Digital Twin platform creates living, data-driven virtual replicas of water infrastructure, river systems, and environmental assets. These digital twins continuously ingest real-time sensor data, satellite feeds, and operational inputs to mirror the physical world with high fidelity. Engineers and planners use them to simulate scenarios — testing the impact of new infrastructure, climate events, or operational changes — without touching the real system. The result: better decisions, fewer surprises, and optimised performance.',
    features: [
      'Real-time synchronised digital replicas',
      'Physics-based hydraulic and hydrological simulation',
      'What-if scenario modelling and comparison',
      'Integration with live IoT sensor networks',
      'Infrastructure lifecycle management',
      '3D visualisation and VR/AR compatibility',
    ],
    useCases: [
      'Water distribution network digital twins',
      'River basin hydrological simulation',
      'Wastewater treatment process optimisation',
      'Dam and reservoir operations planning',
      'Urban stormwater drainage design and testing',
    ],
    techStack: ['Unity 3D', 'EPANET', 'MIKE+', 'Azure Digital Twins', 'IoT Integration', 'WebGL Visualisation'],
    benefits: [
      { title: 'Risk-Free Testing', desc: 'Simulate changes without touching real infrastructure.' },
      { title: 'Real-Time Mirror', desc: 'Digital twin stays synchronised with the physical world.' },
      { title: 'Optimise Operations', desc: 'Find the best operational settings through simulation.' },
      { title: 'Future Planning', desc: 'Test 20-year infrastructure scenarios in minutes.' },
    ],
    stats: [
      { value: '12', label: 'Active Twins' },
      { value: '1:1', label: 'Fidelity Ratio' },
      { value: '100+', label: 'Scenarios Tested' },
      { value: '3D', label: 'Visualisation' },
    ],
  },
  {
    slug: 'water-quality-monitoring',
    title: 'Water Quality Monitoring',
    shortDesc: 'Live, predictive monitoring of rivers, reservoirs, and networks from satellites to sensors.',
    icon: Waves,
    imgUrl: '/WaterQualityMeasurement.png',
    heroTagline: 'Real-time intelligence for every drop',
    fullDescription:
      'Our Water Quality Monitoring platform delivers continuous, AI-powered surveillance of freshwater bodies across India. By fusing satellite imagery, in-situ IoT sensors, and advanced machine-learning models, we provide actionable insights into pH, dissolved oxygen, turbidity, BOD, COD, and over 20 additional parameters — all updated in real time. Municipalities, industries, and research institutions use our dashboards to detect contamination events within minutes, forecast algal blooms days in advance, and ensure compliance with CPCB and WHO standards.',
    features: [
      'Multi-parameter real-time sensing (pH, DO, TDS, turbidity, temperature, BOD, COD)',
      'AI-driven anomaly detection and early-warning alerts',
      'Satellite + ground-truth data fusion for basin-wide coverage',
      'Predictive water quality forecasting using ML models',
      'Automated CPCB/WHO compliance reporting',
      'Cloud-native dashboards with role-based access',
    ],
    useCases: [
      'River basin surveillance for state pollution control boards',
      'Drinking water treatment plant inlet monitoring',
      'Industrial effluent discharge compliance',
      'Aquaculture farm water health tracking',
      'Smart city water infrastructure oversight',
    ],
    techStack: ['IoT Sensors', 'Satellite Remote Sensing', 'TensorFlow', 'AWS IoT Core', 'Time-Series DB', 'React Dashboards'],
    benefits: [
      { title: 'Instant Alerts', desc: 'Detect contamination events within minutes, not days.' },
      { title: 'Predictive Power', desc: 'Forecast water quality trends up to 7 days ahead.' },
      { title: 'Full Compliance', desc: 'Automated reports aligned to CPCB and WHO standards.' },
      { title: 'Cost Reduction', desc: 'Cut manual sampling costs by up to 60%.' },
    ],
    stats: [
      { value: '500+', label: 'Monitoring Points' },
      { value: '99.8%', label: 'Uptime' },
      { value: '<2 min', label: 'Alert Latency' },
      { value: '20+', label: 'Parameters Tracked' },
    ],
  },
  {
    slug: 'geospatial-pollution-tracking',
    title: 'Geospatial Pollution Tracking',
    shortDesc: 'Finding and quantifying pollution sources across whole landscapes.',
    icon: MapPin,
    imgUrl: '/geospatial_pollution.png',
    heroTagline: 'Map every source. Track every plume.',
    fullDescription:
      'Our geospatial pollution tracking platform combines satellite imagery, aerial surveys, and ground-level sensor data into a unified spatial intelligence layer. Using advanced change detection algorithms and AI-powered source attribution, we pinpoint industrial discharges, agricultural runoff hotspots, and illegal dumping sites with geo-referenced precision. Decision-makers receive interactive maps, time-lapse visualisations, and quantified impact assessments that support enforcement actions and remediation planning.',
    features: [
      'Multi-source satellite imagery analysis (Sentinel, Landsat, Planet)',
      'AI-powered pollution source attribution',
      'Interactive GIS dashboards with time-lapse playback',
      'Automated change detection and trend analysis',
      'Quantified impact radius and dispersion modelling',
      'Integration with government environmental databases',
    ],
    useCases: [
      'Industrial discharge identification and tracking',
      'Agricultural runoff hotspot mapping',
      'Illegal dumping site detection',
      'Urban air quality spatial analysis',
      'Cross-border pollution event tracking',
    ],
    techStack: ['Google Earth Engine', 'Sentinel Hub', 'PostGIS', 'Mapbox GL', 'Python', 'Deep Learning'],
    benefits: [
      { title: 'Landscape Scale', desc: 'Monitor pollution across entire river basins and regions.' },
      { title: 'Source Attribution', desc: 'AI identifies the origin of contamination automatically.' },
      { title: 'Evidence Grade', desc: 'Geo-referenced data suitable for regulatory enforcement.' },
      { title: 'Temporal Analysis', desc: 'Track how pollution patterns evolve over months and years.' },
    ],
    stats: [
      { value: '25K km²', label: 'Area Monitored' },
      { value: '340+', label: 'Sources Identified' },
      { value: '95%', label: 'Detection Accuracy' },
      { value: '6', label: 'Satellite Platforms' },
    ],
  },
  {
    slug: 'spectral-intelligence',
    title: 'Spectral Intelligence',
    shortDesc: 'Seeing what the eye can\'t — in multispectral and hyperspectral data.',
    icon: Camera,
    imgUrl: '/spectral_intel.png',
    heroTagline: 'Beyond visible. Beyond imagination.',
    fullDescription:
      'Spectral Intelligence unlocks the invisible signatures of environmental change. Sangam\'s spectral analysis team processes multispectral and hyperspectral imagery from satellites, drones, and ground-based instruments to detect subtle changes in vegetation health, water composition, soil contamination, and atmospheric conditions that are invisible to the naked eye. Our proprietary spectral indices and classification algorithms transform raw reflectance data into decision-ready environmental intelligence.',
    features: [
      'Multispectral vegetation index analysis (NDVI, EVI, SAVI)',
      'Hyperspectral mineral and contaminant mapping',
      'Custom spectral index development for specific applications',
      'Atmospheric correction and radiometric calibration',
      'Supervised and unsupervised land-cover classification',
      'Temporal spectral change detection',
    ],
    useCases: [
      'Crop health monitoring and precision agriculture',
      'Water body chlorophyll and algae concentration mapping',
      'Mine tailings and industrial contamination detection',
      'Urban heat island analysis',
      'Forest fire scar assessment and recovery tracking',
    ],
    techStack: ['ENVI', 'Spectral Python (SPy)', 'TensorFlow', 'Google Earth Engine', 'R Spatial', 'Custom Indices'],
    benefits: [
      { title: 'Invisible Made Visible', desc: 'Detect contamination and stress before it\'s visible.' },
      { title: 'Precision Analysis', desc: 'Hundreds of spectral bands for fine-grained insight.' },
      { title: 'Early Warning', desc: 'Spot environmental changes weeks before they escalate.' },
      { title: 'Custom Solutions', desc: 'Bespoke spectral indices for your specific challenges.' },
    ],
    stats: [
      { value: '200+', label: 'Spectral Bands' },
      { value: '98%', label: 'Classification Accuracy' },
      { value: '15+', label: 'Custom Indices' },
      { value: '5 nm', label: 'Spectral Resolution' },
    ],
  },
  {
    slug: 'iot-sensor-networks',
    title: 'IoT Sensor Networks',
    shortDesc: 'An always-on nervous system for your water systems.',
    icon: Cpu,
    imgUrl: '/iot_sensor.png',
    heroTagline: 'Connected. Intelligent. Always on.',
    fullDescription:
      'Sangam designs, deploys, and maintains rugged IoT sensor networks purpose-built for harsh environmental conditions across India. From Himalayan headwaters to coastal estuaries, our sensor nodes deliver continuous, tamper-resistant telemetry over LoRaWAN, NB-IoT, and satellite backhaul. Each node is engineered for solar-powered autonomy, edge computing capability, and seamless integration with our cloud analytics platform — creating an always-on nervous system for water infrastructure.',
    features: [
      'Ruggedised IP68-rated sensor enclosures',
      'Multi-protocol connectivity (LoRaWAN, NB-IoT, Satellite)',
      'Solar-powered with 30-day battery backup',
      'Edge computing for local anomaly detection',
      'Over-the-air firmware updates',
      'Tamper detection and anti-theft mechanisms',
    ],
    useCases: [
      'River and canal monitoring networks',
      'Groundwater level and quality surveillance',
      'Dam and reservoir instrumentation',
      'Wastewater treatment plant monitoring',
      'Stormwater and urban drainage sensing',
    ],
    techStack: ['Custom PCB Design', 'LoRaWAN', 'NB-IoT', 'MQTT', 'Edge AI', 'AWS IoT Greengrass'],
    benefits: [
      { title: 'Built for India', desc: 'IP68-rated hardware that survives monsoons and heat.' },
      { title: 'Always Connected', desc: 'Multi-protocol fallback ensures zero data gaps.' },
      { title: 'Edge Intelligence', desc: 'Local processing reduces bandwidth and latency.' },
      { title: 'Scalable', desc: 'From 10 to 10,000 nodes with the same architecture.' },
    ],
    stats: [
      { value: '42+', label: 'Active Nodes' },
      { value: '99.9%', label: 'Uptime' },
      { value: '30 days', label: 'Battery Backup' },
      { value: '10 km', label: 'LoRa Range' },
    ],
  },
  {
    slug: 'river-health-assessment',
    title: 'River Health Assessment',
    shortDesc: 'Objective, science-based health checks for river corridors.',
    icon: ActivitySquare,
    imgUrl: '/river_health.png',
    heroTagline: 'The pulse of every river, measured.',
    fullDescription:
      'Sangam\'s River Health Assessment framework provides a standardised, science-backed methodology to evaluate the ecological, hydrological, and socio-cultural health of river corridors. Combining field surveys, remote sensing, water quality analytics, and biodiversity indices, we generate comprehensive River Health Scorecards that translate complex data into intuitive ratings. These assessments inform policy decisions, restoration priorities, and public awareness campaigns for river rejuvenation programmes.',
    features: [
      'Standardised multi-dimensional health scoring framework',
      'Ecological, hydrological, and geomorphological assessment',
      'Biodiversity surveys and biological indices (EPT, BMWP)',
      'Riparian zone health evaluation',
      'Stakeholder engagement and community input integration',
      'Interactive River Health Scorecard dashboards',
    ],
    useCases: [
      'National river rejuvenation programme assessments',
      'Pre and post-restoration impact evaluation',
      'Environmental flow determination studies',
      'Urban river corridor planning',
      'Environmental clearance baseline surveys',
    ],
    techStack: ['Field Survey Protocols', 'R Statistics', 'GIS Analysis', 'Remote Sensing', 'Dashboard Platforms', 'Mobile Data Collection'],
    benefits: [
      { title: 'Standardised', desc: 'Consistent methodology enables comparisons across rivers.' },
      { title: 'Holistic View', desc: 'Ecology, hydrology, and community perspectives combined.' },
      { title: 'Policy Ready', desc: 'Outputs designed for regulatory and planning use.' },
      { title: 'Visual Scorecards', desc: 'Complex data distilled into intuitive ratings.' },
    ],
    stats: [
      { value: '28', label: 'Rivers Assessed' },
      { value: '1,500 km', label: 'Corridor Length' },
      { value: '12', label: 'Health Dimensions' },
      { value: '5', label: 'States Covered' },
    ],
  },
  {
    slug: 'urban-water-leak-detection',
    title: 'Urban Water & Leak Detection',
    shortDesc: 'Digital twins that cut water loss and protect infrastructure.',
    icon: Droplets,
    imgUrl: '/urban_leak.png',
    heroTagline: 'Every litre accounted for.',
    fullDescription:
      'India\'s urban water networks lose 40-60% of treated water to leaks, theft, and unmetered consumption. Sangam\'s Urban Water & Leak Detection platform deploys acoustic sensors, pressure loggers, and flow meters across distribution networks, feeding real-time data into hydraulic digital twins that model the entire system. Our AI algorithms detect leaks as small as 0.5 litres per minute, pinpoint their location within metres, and prioritise repairs by projected water savings and infrastructure risk.',
    features: [
      'Acoustic leak detection sensors with AI classification',
      'Pressure and flow monitoring at district metered areas',
      'Hydraulic digital twin modelling of distribution networks',
      'AI-powered leak localisation (±5m accuracy)',
      'Non-revenue water (NRW) analytics and reduction planning',
      'Pipe burst prediction and preventive maintenance alerts',
    ],
    useCases: [
      'Municipal water distribution network optimisation',
      'Non-revenue water reduction programmes',
      'Industrial campus water loss management',
      'Smart city water infrastructure monitoring',
      'Ageing pipeline assessment and replacement planning',
    ],
    techStack: ['Acoustic Sensors', 'Hydraulic Modelling (EPANET)', 'Digital Twin Platform', 'AI/ML', 'SCADA Integration', 'GIS'],
    benefits: [
      { title: 'Find Every Leak', desc: 'Detect leaks as small as 0.5 L/min with precision.' },
      { title: 'Save Water', desc: 'Reduce non-revenue water by up to 30%.' },
      { title: 'Prevent Bursts', desc: 'Predict pipe failures before they happen.' },
      { title: 'Digital Twin', desc: 'Virtual replica of your entire water network.' },
    ],
    stats: [
      { value: '30%', label: 'NRW Reduction' },
      { value: '±5m', label: 'Leak Accuracy' },
      { value: '850 km', label: 'Network Monitored' },
      { value: '24/7', label: 'Monitoring' },
    ],
  },
  {
    slug: 'climate-resilience-planning',
    title: 'Climate Resilience Planning',
    shortDesc: 'Planning water security for an uncertain climate.',
    icon: CloudRain,
    imgUrl: '/climate_planning.png',
    heroTagline: 'Prepare today for tomorrow\'s climate.',
    fullDescription:
      'Climate change is redrawing India\'s water map — intensifying floods, deepening droughts, and disrupting monsoon patterns. Sangam\'s Climate Resilience Planning service combines downscaled climate projections, hydrological modelling, and vulnerability assessments to help cities, states, and industries build water-secure futures. Our scenario planning tools let decision-makers explore "what-if" pathways under RCP 4.5 and RCP 8.5 scenarios, evaluate adaptation strategies, and prioritise investments with confidence.',
    features: [
      'Downscaled climate projections (CMIP6 models)',
      'Hydrological impact modelling under future scenarios',
      'Water balance and availability forecasting',
      'Flood and drought risk mapping',
      'Adaptation strategy evaluation and cost-benefit analysis',
      'Scenario planning dashboards for decision-makers',
    ],
    useCases: [
      'State-level water security master planning',
      'Urban flood resilience assessment',
      'Agricultural water availability forecasting',
      'Industrial water risk and continuity planning',
      'Climate-proofing water infrastructure investments',
    ],
    techStack: ['CMIP6 Climate Models', 'SWAT/HEC-HMS', 'Python', 'R Climate', 'GIS', 'Scenario Dashboard'],
    benefits: [
      { title: 'Future-Proof', desc: 'Plan for 2030, 2050, and 2100 water scenarios.' },
      { title: 'Evidence-Based', desc: 'Decisions grounded in peer-reviewed climate science.' },
      { title: 'Actionable', desc: 'Ranked adaptation strategies with cost-benefit analysis.' },
      { title: 'Interactive', desc: 'Scenario dashboards for stakeholder engagement.' },
    ],
    stats: [
      { value: '2100', label: 'Planning Horizon' },
      { value: '12', label: 'Climate Scenarios' },
      { value: '3', label: 'States Planned' },
      { value: '₹500Cr', label: 'Investments Guided' },
    ],
  },
  {
    slug: 'environmental-compliance',
    title: 'Environmental Compliance',
    shortDesc: 'Automated, audit-ready environmental compliance reporting.',
    icon: FileCheck,
    imgUrl: '/compliance_img.png',
    heroTagline: 'Compliance without complexity.',
    fullDescription:
      'Environmental regulations are growing more stringent — and so are the penalties for non-compliance. Sangam\'s Environmental Compliance platform automates the entire compliance lifecycle: from continuous monitoring and threshold tracking to report generation and submission. Our system integrates with CPCB OCEMS, state pollution control board portals, and internal ERP systems to ensure that every data point is captured, every exceedance is flagged, and every report is audit-ready.',
    features: [
      'Automated CPCB OCEMS data integration',
      'Real-time threshold monitoring and exceedance alerts',
      'Auto-generated compliance reports (monthly, quarterly, annual)',
      'Consent-to-operate (CTO) condition tracking',
      'Audit trail and evidence management',
      'Multi-plant centralised compliance dashboard',
    ],
    useCases: [
      'Industrial effluent and emission compliance',
      'Mining and extractive industry environmental reporting',
      'Pharmaceutical and chemical plant compliance',
      'Power plant emission monitoring and reporting',
      'Multi-site corporate environmental governance',
    ],
    techStack: ['OCEMS Integration', 'Regulatory APIs', 'Document Automation', 'Cloud Platform', 'Role-Based Access', 'Audit Logging'],
    benefits: [
      { title: 'Zero Penalties', desc: 'Stay ahead of every regulatory deadline automatically.' },
      { title: 'Audit Ready', desc: 'Complete evidence trail for any inspection or audit.' },
      { title: 'Time Savings', desc: 'Cut compliance reporting effort by 80%.' },
      { title: 'Multi-Plant View', desc: 'Centralised dashboard across all facilities.' },
    ],
    stats: [
      { value: '100%', label: 'Report Accuracy' },
      { value: '80%', label: 'Time Saved' },
      { value: '0', label: 'Penalties Incurred' },
      { value: '50+', label: 'Plants Connected' },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getRelatedServices(currentSlug: string, count: number = 3): Service[] {
  const filtered = services.filter((s) => s.slug !== currentSlug);
  const shuffled = [...filtered].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
