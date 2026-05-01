"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './page.module.css';

export interface FAQ {
  question: string;
  answer: string;
}

interface FaqClientProps {
  faqs: FAQ[];
}

export function FaqClient({ faqs }: FaqClientProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Open the first one by default

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.faqSection}>
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;

        return (
          <div
            key={idx}
            className={`${styles.faqItem} ${isOpen ? styles.open : ''}`}
          >
            <button
              className={styles.faqQuestion}
              onClick={() => toggleAccordion(idx)}
              aria-expanded={isOpen}
            >
              <span>{faq.question}</span>
              <div className={styles.iconWrapper}>
                <ChevronDown size={20} />
              </div>
            </button>
            <div className={styles.faqAnswerWrapper}>
              <div className={styles.faqAnswerInner}>
                <p className={styles.faqAnswerText}>
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
