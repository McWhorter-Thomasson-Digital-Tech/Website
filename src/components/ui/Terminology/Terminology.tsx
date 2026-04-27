"use client";

import React, { useState, useEffect, useRef } from 'react';
import { HelpCircle, X } from 'lucide-react';
import styles from './Terminology.module.css';

interface TerminologyProps {
  children: React.ReactNode;
  description: string;
}

export function Terminology({ children, description }: TerminologyProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check for mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close on click outside for mobile
  useEffect(() => {
    if (!isOpen || !isMobile) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, isMobile]);

  const toggleOpen = (e: React.MouseEvent) => {
    if (isMobile) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  return (
    <span className={styles.container} ref={containerRef}>
      <span 
        className={styles.term} 
        onClick={toggleOpen}
        onMouseEnter={() => !isMobile && setIsOpen(true)}
        onMouseLeave={() => !isMobile && setIsOpen(false)}
      >
        {children}
        {isMobile && (
          <HelpCircle 
            size={14} 
            className={`${styles.icon} ${isOpen ? styles.iconActive : ''}`} 
          />
        )}
      </span>
      
      {isOpen && (
        <div className={styles.tooltip}>
          <div className={styles.tooltipInner}>
            <p className={styles.description}>{description}</p>
            {isMobile && (
              <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
                <X size={14} />
              </button>
            )}
          </div>
          <div className={styles.arrow} />
        </div>
      )}
    </span>
  );
}
