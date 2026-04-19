import React from "react";

export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "name": "McWhorter-Thomasson Digital Technologies",
    "alternateName": "MTDT",
    "url": "https://mtdigitaltech.com",
    "logo": "https://mtdigitaltech.com/logo.png",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Lynchburg",
      "addressRegion": "VA",
      "addressCountry": "US"
    },
    "telephone": "(704) 254-0084",
    "priceRange": "$$$",
    "openingHours": "Mon-Sat 9am-7pm",
    "email": "matt@mtdigitaltech.com"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
