import React from 'react';
import Hero from '@/components/Hero';
import ValueProps from '@/components/ValueProps';

export default function Home() {
  return (
    <>
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
      <Hero />
      <ValueProps />
    </>
  );
}
