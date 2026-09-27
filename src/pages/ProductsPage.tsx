import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { services } from '../data/services';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../products.css';


const ProductsPage: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('products-visible');
          }
        });
      },
      { threshold: 0.05 }
    );

    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="products-page">
      <Navbar />

      {/* Hero Section */}
      <section className="products-hero">
        <div className="products-hero__bg" aria-hidden="true">
          <div className="products-hero__grid-pattern" />
          <div className="products-hero__glow products-hero__glow--1" />
          <div className="products-hero__glow products-hero__glow--2" />
        </div>
        <div className="products-hero__content">
          <span className="products-hero__badge">Our Products</span>
          <h1 className="products-hero__title">
            Environmental Intelligence <span className="products-hero__title--accent">Products</span>
          </h1>
          <p className="products-hero__subtitle">
            From satellite sensing to digital twins — comprehensive technology solutions for water, waste, and environmental monitoring across India.
          </p>
        </div>
      </section>

      {/* Products List */}
      <section ref={sectionRef} className="products-list">
        <div className="products-list__container">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <a
                key={service.slug}
                href={`/services/${service.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="product-card"
                id={`product-card-${service.slug}`}
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                {/* Image Section */}
                <div className="product-card__image">
                  {service.imgUrl ? (
                    <img
                      src={service.imgUrl}
                      alt={service.title}
                      className="product-card__image-img"
                    />
                  ) : (
                    <div className="product-card__image-placeholder">
                      <Icon className="product-card__image-icon" size={40} />
                      <span className="product-card__image-label">Image Coming Soon</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="product-card__content">
                  <div className="product-card__header">
                    <div className="product-card__icon-title">
                      <div className="product-card__icon-wrap">
                        <Icon size={20} />
                      </div>
                      <h3 className="product-card__title">{service.title}</h3>
                    </div>
                    <div className="product-card__arrow">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>

                  <p className="product-card__desc">{service.shortDesc}</p>

                  {/* Feature bullets */}
                  <ul className="product-card__features">
                    {service.features.slice(0, 4).map((feature, i) => (
                      <li key={i} className="product-card__feature">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="products-cta">
        <div className="products-cta__inner">
          <div className="products-cta__glow products-cta__glow--1" />
          <div className="products-cta__glow products-cta__glow--2" />
          <div className="products-cta__content">
            <h2 className="products-cta__title">Ready to transform your environmental operations?</h2>
            <p className="products-cta__subtitle">
              Get in touch with our team to discuss how Sangam's technology can address your specific challenges.
            </p>
            <a href="#contact" className="products-cta__btn">
              Contact Us <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductsPage;
