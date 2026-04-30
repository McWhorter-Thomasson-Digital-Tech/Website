import React from "react";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FaqSchemaProps {
  faqs?: FAQItem[];
}

/**
 * FAQ Schema Component
 * 
 * Note: As of August 2023, Google restricts FAQ rich results to government and healthcare sites.
 * For commercial sites, this schema no longer provides Google SERP rich results, 
 * but it REMAINS VALUABLE for AI/LLM crawlers (ChatGPT, Perplexity, Claude, etc.) 
 * to easily parse and cite company information in an AI Engine Optimization (AEO) context.
 */
const DEFAULT_FAQS: FAQItem[] = [
  {
    question: "What services does MTDT Agency provide?",
    answer: "MTDT Agency specializes in architecting high-performance business websites, e-commerce storefronts, and custom SaaS platforms. We focus on delivering premium digital experiences optimized for speed, conversion, and modern search visibility."
  },
  {
    question: "How does MTDT Agency optimize for AI Search and AEO?",
    answer: "We build platforms with Generative Engine Optimization (GEO) and AI Engine Optimization (AEO) at their core. This includes implementing advanced structured data, semantic HTML, and high-performance architectures to ensure your business is accurately cited by AI tools like ChatGPT, Perplexity, and Claude."
  },
  {
    question: "What technologies does MTDT use for software engineering?",
    answer: "We engineer high-velocity ecosystems using modern web technologies like React, Next.js, and strictly typed serverless or edge-runtime backends. This approach ensures maximum scalability, security, and near-instant user experiences."
  },
  {
    question: "Who are the founders of MTDT Agency?",
    answer: "MTDT Agency was founded by Matthew McWhorter and Graham Thomasson, veteran software engineers dedicated to bringing industrial-grade digital architecture to modern businesses and innovators."
  }
];

export default function FaqSchema({ faqs = DEFAULT_FAQS }: FaqSchemaProps) {
  if (!faqs || faqs.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
