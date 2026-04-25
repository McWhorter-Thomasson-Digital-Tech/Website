import React from "react";

export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "McWhorter-Thomasson Digital Technologies",
    "alternateName": "MTDT",
    "url": "https://mtdigitaltech.com",
    "logo": "https://mtdigitaltech.com/logo.png",
    "founder": [
      {
        "@type": "Person",
        "name": "Matthew McWhorter"
      },
      {
        "@type": "Person",
        "name": "Graham Thomasson"
      }
    ],
    "description": "MTDT Agency builds high-performance business websites, e-commerce storefronts, and custom SaaS platforms optimized for AI search and conversion.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-704-254-0084",
      "contactType": "customer service",
      "email": "matt@mtdigitaltech.com"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Lynchburg",
      "addressRegion": "VA",
      "addressCountry": "US"
    },
    "sameAs": [
      "https://instagram.com/mtdigitaltech",
      "https://linkedin.com/company/mtdigitaltech",
      "https://x.com/mtdigitaltech",
      "https://github.com/mtdigitaltech"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
