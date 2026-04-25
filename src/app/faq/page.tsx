import React from 'react';
import { Metadata } from 'next';
import { FaqClient, FAQ } from './FaqClient';
import { Header } from '@/components/layout/Header/Header';
import { Footer } from '@/components/layout/Footer/Footer';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | MTDT Agency',
  description: 'Learn about our Website-as-a-Service model, AI Search Optimization (AEO), and our subscription terms.',
};

const faqData: FAQ[] = [
  {
    question: "What is a WaaS subscription?",
    answer: "Instead of paying $10,000+ upfront for a custom website, our Website-as-a-Service model lets you subscribe to a managed web app for a flat monthly or annual fee. This covers hosting, maintenance, performance, and security."
  },
  {
    question: "Do you use WordPress or Squarespace?",
    answer: "No. We build custom architectures using React, Next.js, and full stack technologies. This ensures sub-second page loads, high security, and maximum SEO capability."
  },
  {
    question: "What is AI search optimization (AEO)?",
    answer: "Standard SEO optimizes for Google search. AEO optimizes your codebase, metadata, and site architecture to be actively read and recommended by AI engines like ChatGPT, Claude, and Perplexity."
  },
  {
    question: "Who owns the code?",
    answer: "Under our standard subscription, we retain ownership of the custom code while leasing you the platform. Every contract includes an IP buyout clause, so you can purchase the full repository to self-host whenever you want."
  },
  {
    question: "Where is my website hosted?",
    answer: "We deploy on premium global edge networks. This ensures 99.99% uptime and instant load times globally."
  },
  {
    question: "Can I upgrade my package later?",
    answer: "Yes. Our architectures are fully modular. You can start with a business website and upgrade to a SaaS portal later without rebuilding the foundation."
  }
];

export default function FAQPage() {
  // Construct the JSON-LD schema dynamically
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <Header />
      {/* Inject JSON-LD directly into the <head> using Next.js safe injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className={styles.container}>
        <div className={styles.heroSection}>
          <h1 className={styles.title}>Frequently asked questions</h1>
          <p className={styles.subtitle}>
            Everything you need to know about our engineering pipelines, IP ownership, and subscription model.
          </p>
        </div>
        
        {/* Client Component handling state and glass UI rendering */}
        <FaqClient faqs={faqData} />
      </main>
      <Footer />
    </>
  );
}
