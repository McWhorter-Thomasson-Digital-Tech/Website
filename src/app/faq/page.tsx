import React from 'react';
import { Metadata } from 'next';
import { FaqClient, FAQ } from './FaqClient';
import { Header } from '@/components/layout/Header/Header';
import { Footer } from '@/components/layout/Footer/Footer';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Web Architecture WaaS',
  description: 'Learn about our Website-as-a-Service model, Generative Engine Optimization, and our intellectual property IP buyout terms.',
};

const faqData: FAQ[] = [
  {
    question: "What is Website-as-a-Service (WaaS)?",
    answer: "Instead of paying $10,000+ upfront for a custom website, our WaaS model allows you to subscribe to a fully managed, enterprise-grade Next.js web application for a flat monthly or annual fee. This covers hosting, continuous maintenance, performance optimization, and security updates."
  },
  {
    question: "Do you build with WordPress or Squarespace?",
    answer: "No. We engineer custom architectures strictly using React, Next.js, and modern headless frameworks. Traditional builders like WordPress are inherently bloated and slow. We write custom code to ensure sub-second page loads, impenetrable security, and maximum SEO capability."
  },
  {
    question: "What is Generative Engine Optimization (GEO)?",
    answer: "Standard SEO optimizes for traditional Google search results. GEO optimizes your codebase, localized metadata, and site architecture to be actively read, understood, and recommended by AI engines like ChatGPT, Claude, and Perplexity. We engineer your site to ensure AI models suggest your business directly to conversing users."
  },
  {
    question: "Who owns the source code and Intellectual Property?",
    answer: "Under our standard subscription model, we retain ownership of the advanced custom source code while leasing you the platform and services with zero upfront build costs. However, every contract includes an IP Buyout clause. If you outgrow the subscription and wish to bring the codebase in-house, you can securely purchase the full repository to self-host."
  },
  {
    question: "Where is my website hosted?",
    answer: "We deploy our React architectures strictly on premium global edge networks like Vercel or AWS. This ensures 99.99% uptime, global CDN delivery, and instantaneous load times no matter where your customers are located."
  },
  {
    question: "Can I upgrade my package later?",
    answer: "Absolutely. Our architectures are fully modular. You can start with a High-Performance Marketing Site and seamlessly upgrade to a Digital Storefront or a Custom SaaS portal later without needing to rebuild the foundational code."
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
          <h1 className={styles.title}>Frequently Asked Questions</h1>
          <p className={styles.subtitle}>
            Everything you need to know about our Next.js engineering pipelines, ownership IP, and the WaaS model.
          </p>
        </div>
        
        {/* Client Component handling state and glass UI rendering */}
        <FaqClient faqs={faqData} />
      </main>
      <Footer />
    </>
  );
}
