import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, ArrowUpRight, ExternalLink } from 'lucide-react';

const FooterHome: React.FC = () => {
  const year = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Products', path: '/products' },
    { label: 'Treatments', path: '/treatment' },
    { label: 'Careers', path: '/careers' }
  ];
  const researchLinks = [
    { label: 'Water Quality', id: 'water' },
    { label: 'Air Monitoring', id: 'air' },
    { label: 'Soil Sensing', id: 'soil' },
    { label: 'Hydrological Modeling', id: 'hydrology' },
    { label: 'Climate Data', id: 'climate' }
  ];

  return (
    <footer id="footer" className="footer-home" aria-label="Site Footer">
      {/* Top Wave */}
      <div className="footer-wave" aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" fill="#0B1929" />
        </svg>
      </div>

      <div className="footer-home__inner">
        {/* Main Grid */}
        <div className="footer-home__grid">
          {/* Brand */}
          <div className="footer-home__brand">
            <div className="footer-home__logo">
              <Link to="/">
                <img src="/LogoHead.jpeg" alt="Pravayan Logo" className="h-10 w-auto object-contain rounded-md" />
              </Link>
            </div>
            <p className="footer-home__brand-desc">
              Sensing the pulse of the planet. Pravayan pioneers environmental intelligence through precision IoT sensor networks — empowering communities with real-time data for a sustainable future.
            </p>
            <div className="footer-home__socials flex gap-3 text-sm">
              <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
              <span className="text-slate-300">|</span>
              <a href="#" className="hover:text-primary transition-colors">Twitter</a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-home__col">
            <h4 className="footer-home__col-title">Quick Links</h4>
            <ul className="footer-home__link-list">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="footer-home__link"
                  >
                    <ArrowUpRight size={13} className="footer-home__link-icon" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Research */}
          <div className="footer-home__col">
            <h4 className="footer-home__col-title">Research Areas</h4>
            <ul className="footer-home__link-list">
              {researchLinks.map((link) => (
                <li key={link.id}>
                  <Link to={`/?tab=${link.id}#research`} className="footer-home__link">
                    <ArrowUpRight size={13} className="footer-home__link-icon" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-home__col" id="contact">
            <h4 className="footer-home__col-title">Get in Touch</h4>
            <div className="footer-home__contact-list">
              <a href="mailto:pravayanpvtltd@gmail.com" className="footer-home__contact-item">
                <Mail size={15} />
                <span>pravayanpvtltd@gmail.com</span>
              </a>
              <a href="tel:+919956080370" className="footer-home__contact-item">
                <Phone size={15} />
                <span>+91 9956080370</span>
              </a>
            </div>

            <button 
              onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent('openContactModal'));
              }}
              className="footer-home__cta w-full text-left border-none bg-transparent cursor-pointer font-inherit"
            >
              Send us a Message <ExternalLink size={14} />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-home__bottom">
          <p>© {year} Pravayan Pvt Ltd. All rights reserved.</p>
          <div className="footer-home__bottom-links">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((l) => (
              <a key={l} href="#" className="footer-home__bottom-link">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterHome;
