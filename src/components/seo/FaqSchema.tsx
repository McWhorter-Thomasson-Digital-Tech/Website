import React from "react";

export default function FaqSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What does MTDT Agency specialize in?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "MTDT Agency (McWhorter-Thomasson Digital Technologies) specializes in engineering high-velocity React ecosystems and immutable backend pipelines. We focus on industrial-grade digital architecture for modern innovators."
        }
      },
      {
        "@type": "Question",
        "name": "Who are the founders of MTDT?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "MTDT was founded by Matthew McWhorter and Graham Thomasson, veteran software engineers with expertise in complex digital systems and automation."
        }
      },
      {
        "@type": "Question",
        "name": "What is a high-velocity React ecosystem?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A high-velocity React ecosystem is a performance-optimized frontend architecture that utilizes modern patterns like Server Components, edge-runtime optimization, and strict type safety to deliver near-instant user experiences."
        }
      },
      {
        "@type": "Question",
        "name": "Does MTDT provide backend automation services?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, MTDT specializes in immutable backend pipelines and automated workflows, ensuring that data processing and infrastructure deployments are predictable, secure, and highly scalable."
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
