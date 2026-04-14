import React from 'react';
import { Zap, Code2, MapPin, MonitorSmartphone, Database, ShoppingCart, TrendingUp, ArrowRight } from 'lucide-react';
import styles from './CSS/Modules/Page.module.css';

const Navbar = () => (
  <nav className={styles.navbar}>
    <div className={styles.navContent}>
      <span className={styles.logo}>MTDT</span>
      <a href="#contact" className={styles.navButton}>
        Request a Project Quote
      </a>
    </div>
  </nav>
);

const Hero = () => (
  <section className={styles.hero}>
    <div className={styles.heroContent}>
      <h1 className={styles.headline}>
        Design. Software. Visibility.<br/>
        <span className={styles.accentText}>Engineered for Growth.</span>
      </h1>
      <p className={styles.subHeadline}>
        High-converting website design, custom SaaS applications, e-commerce solutions, and next-generation SEO & GEO strategies. Based in Lynchburg, VA.
      </p>
      <a href="#contact" className={styles.primaryCta}>
       Build Your Digital Asset <ArrowRight className={styles.ctaIcon} size={20} />
      </a>
    </div>
  </section>
);

const ValueProps = () => (
  <section className={styles.valueProps}>
    <div className={styles.grid3}>
      <div className={styles.card}>
        <Zap className={styles.cardIcon} size={32} />
        <h3 className={styles.cardTitle}>Speed & Architecture</h3>
        <p className={styles.cardText}>
          Sub-second load times built on Next.js. We ensure your business platform outpaces competitors and captures maximum traffic.
        </p>
      </div>
      <div className={styles.card}>
        <Code2 className={styles.cardIcon} size={32} />
        <h3 className={styles.cardTitle}>Full-Stack Engineering</h3>
        <p className={styles.cardText}>
          From pixel-perfect frontends to robust backend database architecture, we write bespoke code to bring your vision to life.
        </p>
      </div>
      <div className={styles.card}>
        <MapPin className={styles.cardIcon} size={32} />
        <h3 className={styles.cardTitle}>Local Partnership</h3>
        <p className={styles.cardText}>
          We are your dedicated digital growth partners in Central Virginia, providing direct communication without the agency runaround.
        </p>
      </div>
    </div>
  </section>
);

const Capabilities = () => (
  <section className={styles.capabilities}>
    <h2 className={styles.sectionTitle}>Our Capabilities</h2>
    <div className={styles.grid2}>
      <div className={styles.featureBox}>
        <MonitorSmartphone className={styles.featureIcon} size={40} />
        <div>
          <h3 className={styles.featureTitle}>Website Design</h3>
          <p className={styles.featureText}>
            High-converting, responsive websites optimized for local businesses, contractors, and professional service providers.
          </p>
        </div>
      </div>
      <div className={styles.featureBox}>
        <Database className={styles.featureIcon} size={40} />
        <div>
          <h3 className={styles.featureTitle}>Custom SaaS Development</h3>
          <p className={styles.featureText}>
            End-to-end software application engineering. We build the intuitive UI and scalable backend infrastructure required to launch your product.
          </p>
        </div>
      </div>
      <div className={styles.featureBox}>
        <ShoppingCart className={styles.featureIcon} size={40} />
        <div>
          <h3 className={styles.featureTitle}>Custom E-Commerce</h3>
          <p className={styles.featureText}>
            Bespoke digital storefronts designed for premium brands that demand custom user experiences, seamless checkouts, and maximum conversion rates.
          </p>
        </div>
      </div>
      <div className={styles.featureBox}>
        <TrendingUp className={styles.featureIcon} size={40} />
        <div>
          <h3 className={styles.featureTitle}>SEO & GEO</h3>
          <p className={styles.featureText}>
            Dominate traditional search and AI-driven queries. We utilize Search Engine and Generative Engine Optimization to put your brand in front of high-intent buyers.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section id="contact" className={styles.contact}>
    <div className={styles.contactWrapper}>
      <h2 className={styles.contactHeadline}>
        Ready to scale your digital presence?
      </h2>
      <form
        action="https://formspree.io/f/xnjgvwvr"
        method="POST"
        className={styles.form}
      >
        <div className={styles.formGroup}>
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" name="name" required placeholder="John Doe" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="business">Business Name</label>
          <input type="text" id="business" name="business" required placeholder="Acme Corp" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Work Email</label>
          <input type="email" id="email" name="email" required placeholder="john@acmecorp.com" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="projectType">Service Needed</label>
          <select 
            id="projectType" 
            name="projectType" 
            required 
            defaultValue="" 
            className={styles.formSelect} 
            style={{ width: '100%', padding: '0.875rem 1.25rem', background: 'rgba(var(--color-surface), 0.3)', border: '1px solid rgba(var(--color-mid), 0.8)', color: 'rgb(var(--color-text))', borderRadius: '6px', fontFamily: 'inherit' }}
          >
            <option value="" disabled>Select an option...</option>
            <option value="website-design">Website Design</option>
            <option value="custom-saas">Custom SaaS Development</option>
            <option value="ecommerce">Custom E-Commerce</option>
            <option value="seo-geo">SEO & GEO Services</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="details">Project Details</label>
          <textarea id="details" name="details" rows={4} required placeholder="Tell us about your goals..."></textarea>
        </div>
        <button type="submit" className={styles.submitButton}>
          Submit Inquiry
        </button>
      </form>
    </div>
  </section>
);

export default function MTDTLandingPage() {
  return (
    <div className={styles.pageContainer}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "McWhorter-Thomassen Digital Technologies",
            "url": "https://mtdigitaltech.com",
            "logo": "https://mtdigitaltech.com/logo.png",
            "description": "Premium website design, custom SaaS application development, e-commerce solutions, and SEO/GEO services.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Lynchburg",
              "addressRegion": "VA",
              "addressCountry": "US"
            },
            "inLanguage": "en",
            "industry": "Software Development and Marketing",
            "founders": [
              {
                "@type": "Person",
                "name": "Matthew McWhorter"
              },
              {
                "@type": "Person",
                "name": "Graham Thomassen"
              }
            ],
            "areaServed": [
              {
                "@type": "City",
                "name": "Lynchburg",
                "sameAs": "https://en.wikipedia.org/wiki/Lynchburg,_Virginia"
              },
              {
                "@type": "State",
                "name": "Virginia"
              }
            ],
            "makesOffer": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Website Design",
                  "description": "High-converting, responsive websites optimized for local businesses and professional services."
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Custom SaaS Development",
                  "description": "Full-stack software application engineering, building scalable SaaS products from frontend UI to backend infrastructure."
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Custom E-Commerce Solutions",
                  "description": "Bespoke digital storefronts designed for seamless checkouts and maximum conversion rates."
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "SEO & GEO",
                  "description": "Search Engine Optimization and Generative Engine Optimization strategies to capture high-intent traffic."
                }
              }
            ],
            "sameAs": []
          })
        }}
      />
      
      <Navbar />
      <div className={styles.scrollBox}>
        <main>
          <Hero />
          <ValueProps />
          <Capabilities />
          <Contact />
        </main>
      </div>
    </div>
  );
}