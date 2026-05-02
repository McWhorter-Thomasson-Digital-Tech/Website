"use client"; 

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Hero.module.css';
import { motion, AnimatePresence } from 'motion/react';

// Define the two parts of your hook independently
const adjectives = ["bad", "slow", "clunky", "broken", "generic", "boring"];
const nouns = ["website.", "app.", "design."];

export function Hero() {
  const [adjectiveIndex, setAdjectiveIndex] = useState(0);
  const [nounIndex, setNounIndex] = useState(0);

  useEffect(() => {
    const adjectiveInterval = setInterval(() => {
      // Assumes both arrays are the same length
      setAdjectiveIndex((prev) => (prev + 1) % adjectives.length);
    }, 3000);
    return () => clearInterval(adjectiveInterval);
  }, []);

   useEffect(() => {
    const nounInterval = setInterval(() => {
      // Assumes both arrays are the same length
      setNounIndex((prev) => (prev + 1) % nouns.length);
    }, 6000);
    return () => clearInterval(nounInterval);
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.content}>
        
        <h1 className={styles.heading}>
          You're paying too much for a{' '}
        </h1>
        
        <h1 className={styles.highlight} style={{
          display: 'flex', 
          gap: '0.25em', 
          flexWrap: 'wrap', 
          justifyContent: 'center'  }}>
          <AnimatePresence mode="popLayout">
            
            {/* The Adjective Block */}
            <motion.span
              key={`adj-${adjectiveIndex}`} // Distinct key for the first word
              initial={{ opacity: 0, rotateX: -90, y: 30, filter: "blur(4px)" }}
              animate={{ opacity: 1, rotateX: 0, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, rotateX: 90, y: -30, filter: "blur(4px)" }}
              transition={{ 
                duration: 0.6, 
                type: "spring", 
                bounce: 0.3,
                delay: 0 // Rotates instantly
              }}
              style={{ 
                display: 'inline-block',
                transformPerspective: 1000, 
                transformOrigin: '50% 50% -30px'
              }}
            >
              {adjectives[adjectiveIndex]}
            </motion.span>

            {/* The Noun Block */}
            <motion.span
              key={`noun-${nounIndex}`} // Distinct key for the second word
              initial={{ opacity: 0, rotateX: -90, y: 30, filter: "blur(4px)" }}
              animate={{ opacity: 1, rotateX: 0, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, rotateX: 90, y: -30, filter: "blur(4px)" }}
              transition={{ 
                duration: 0.6, 
                type: "spring", 
                bounce: 0.3,
                delay: 0.15 // Hardcoded fraction of a second delay for the cascade
              }}
              style={{ 
                display: 'inline-block',
                transformPerspective: 1000, 
                transformOrigin: '50% 50% -30px'
              }}
            >
              {nouns[nounIndex]}
            </motion.span>

          </AnimatePresence>
        </h1>
        
        <p className={styles.subtitle}>
          We can fix that.
        </p>
        <p className={styles.subtitle2}>
          Starting at just $300/mo.
        </p>
        
        <div className={styles.buttons}>
          <Link href="#react-websites" className={styles.primaryButton}>
            View services
          </Link>
          <Link href="/contact" className={styles.outlineButton}>
            Start project
          </Link>
        </div>
      </div>
    </section>
  );
}