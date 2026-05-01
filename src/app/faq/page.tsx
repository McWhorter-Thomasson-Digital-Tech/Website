import React from 'react';
import { Metadata } from 'next';
import { FaqClient, FAQ } from './FaqClient';
import { Header } from '@/components/layout/Header/Header';
import { Footer } from '@/components/layout/Footer/Footer';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | MTDT Agency',
  description: 'Learn about our Managed Premium Platforms, Answer Engine Optimization (AEO), and our architectural standards.',
};

const faqData: FAQ[] = [
  {
    question: "What is a Managed Premium Platform (WaaS)?",
    answer: "Instead of a large upfront investment, our Website-as-a-Service model allows you to subscribe to a fully managed, high-performance platform for a monthly or annual fee. This ensures your technology is always modern, secure, and optimized without the burden of maintenance."
  },
  {
    question: "Do you use WordPress or Squarespace?",
    answer: "No. We architect custom solutions using industry-leading technologies like React and Next.js. This allows us to deliver sub-second load times and custom functionality that generic builders simply cannot match."
  },
  {
    question: "What is Answer Engine Optimization (AEO)?",
    answer: "While standard SEO focuses on Google's search results, AEO and GEO (Generative Engine Optimization) ensure your business is accurately cited and recommended by modern tools like ChatGPT, Claude, and Perplexity. We optimize your data so these engines understand and trust your brand."
  },
  {
    question: "Who owns the architecture?",
    answer: "In our partnership model, we manage the platform architecture while you enjoy full use of the service. For teams that wish to transition to internal management, every agreement includes a seamless IP buyout option to purchase the full repository."
  },
  {
    question: "Where is my platform hosted?",
    answer: "We utilize premium global edge networks to ensure your site is instantly accessible from anywhere in the world, maintaining a 99.99% uptime standard."
  },
  {
    question: "Can we expand our platform over time?",
    answer: "Absolutely. Our architectures are modular by design. We partner with you to start with a premium business presence and scale into a full SaaS or E-commerce platform as your requirements grow."
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
            Insights into our architectural standards, intellectual property, and strategic partnership model.
          </p>
        </div>

        {/* Client Component handling state and glass UI rendering */}
        <FaqClient faqs={faqData} />
      </main>
      <Footer />
    </>
  );
}
