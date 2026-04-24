import React from "react";

export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "McWhorter-Thomasson Digital Technologies",
    "alternateName": "MTDT Agency",
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
    "description": "High-velocity React ecosystem engineering and immutable backend pipeline automation for modern innovators.",
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
      "https://mtdigitaltech.com"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
