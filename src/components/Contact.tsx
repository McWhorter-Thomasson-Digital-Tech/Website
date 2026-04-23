import React from 'react';
import styles from '@/app/CSS/Modules/Page.module.css';

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

export default Contact;
