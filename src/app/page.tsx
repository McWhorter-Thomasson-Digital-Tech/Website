import React from 'react';
import Script from 'next/script';
import { Zap, Code2, MapPin, Building2, ShoppingCart, ArrowRight } from 'lucide-react';
import styles from './CSS/Modules/Page.module.css';

const Navbar = () => (
  <nav className={styles.navbar}>
    <div className={styles.navContent}>
      <span className={styles.logo}>MTDT</span>
      <a href="#contact" className={styles.navButton}>
        Start a Project
      </a>
    </div>
  </nav>
);

const Hero = () => (
  <section className={styles.hero}>
    <div className={styles.heroContent}>
      <h1 className={styles.headline}>
        High-Performance Digital Assets <br />
        <span className={styles.accentText}>for Your Business.</span>
      </h1>
      <p className={styles.subHeadline}>
        We replace slow, outdated websites with custom-coded lead generation engines that dominate local search.
      </p>
      <a href="#contact" className={styles.primaryCta}>
        Upgrade Your Digital Presence <ArrowRight className={styles.ctaIcon} size={20} />
      </a>
    </div>
  </section>
);

const ValueProps = () => (
  <section className={styles.valueProps}>
    <div className={styles.grid3}>
      <div className={styles.card}>
        <Zap className={styles.cardIcon} size={32} />
        <h3 className={styles.cardTitle}>Speed & SEO</h3>
        <p className={styles.cardText}>
          Built on Next.js. We deliver sub-second load times that Google rewards.
        </p>
      </div>
      <div className={styles.card}>
        <Code2 className={styles.cardIcon} size={32} />
        <h3 className={styles.cardTitle}>Custom Engineering</h3>
        <p className={styles.cardText}>
          No bloated WordPress templates. We write bespoke code that scales.
        </p>
      </div>
      <div className={styles.card}>
        <MapPin className={styles.cardIcon} size={32} />
        <h3 className={styles.cardTitle}>Local Partnership</h3>
        <p className={styles.cardText}>
          Based in Lynchburg. We are your dedicated digital growth partners, not an offshore call center.
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
        <Building2 className={styles.featureIcon} size={40} />
        <div>
          <h3 className={styles.featureTitle}>B2B Service Platforms</h3>
          <p className={styles.featureText}>
            High-converting lead generation systems optimized for contractors, law firms, and professional services.
          </p>
        </div>
      </div>
      <div className={styles.featureBox}>
        <ShoppingCart className={styles.featureIcon} size={40} />
        <div>
          <h3 className={styles.featureTitle}>High-Converting E-Commerce</h3>
          <p className={styles.featureText}>
            Custom headless storefronts designed for premium brands that demand maximum conversion rates.
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
				Stop losing leads to bad design.
			</h2>
			<form
				action="https://formspree.io/f/xnjgvwvr"
				method="POST"
				className={styles.form}
			>
				<div className={styles.formGroup}>
					<label htmlFor="name">Full Name</label>
					<input
						type="text"
						id="name"
						name="name"
						required
						placeholder="John Doe"
					/>
				</div>
				<div className={styles.formGroup}>
					<label htmlFor="business">Business Name</label>
					<input
						type="text"
						id="business"
						name="business"
						required
						placeholder="Acme Corp"
					/>
				</div>
				<div className={styles.formGroup}>
					<label htmlFor="email">Work Email</label>
					<input
						type="email"
						id="email"
						name="email"
						required
						placeholder="john@acmecorp.com"
					/>
				</div>
				<div className={styles.formGroup}>
					<label htmlFor="url">Current Website URL (Optional)</label>
					<input
						type="url"
						id="url"
						name="url"
						placeholder="https://www.example.com"
					/>
				</div>
				<div className={styles.formGroup}>
					<label htmlFor="details">Project Details</label>
					<textarea
						id="details"
						name="details"
						rows={4}
						required
						placeholder="Tell us about your goals..."
					></textarea>
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
      <Navbar />
      <main>
        <Hero />
        <ValueProps />
        <Capabilities />
        <Contact />
      </main>
    </div>
  );
}