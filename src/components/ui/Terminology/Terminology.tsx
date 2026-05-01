"use client";

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { HelpCircle, X } from 'lucide-react';
import styles from './Terminology.module.css';

interface TerminologyProps {
  children: React.ReactNode;
  description: string;
}

export function Terminology({ children, description }: TerminologyProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const updateCoords = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setCoords({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }
  };

  useEffect(() => {
    if (isOpen && !isMobile) {
      updateCoords();
      // Update coordinates on scroll or resize to keep tooltip attached
      window.addEventListener('scroll', updateCoords, true);
      window.addEventListener('resize', updateCoords);
      return () => {
        window.removeEventListener('scroll', updateCoords, true);
        window.removeEventListener('resize', updateCoords);
      };
    }
  }, [isOpen, isMobile]);

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

  const tooltipContent = (
    <div 
      className={`${styles.tooltip} ${isMobile ? styles.mobileTooltip : styles.portalTooltip}`}
      style={!isMobile ? { 
        top: `${coords.top - 12}px`,
        left: `${coords.left + coords.width / 2}px`,
      } : undefined}
    >
      <div className={styles.tooltipInner}>
        <p className={styles.description}>{description}</p>
        {isMobile && (
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            <X size={14} />
          </button>
        )}
      </div>
      {!isMobile && <div className={styles.arrow} />}
    </div>
  );

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
      
      {isOpen && mounted && createPortal(tooltipContent, document.body)}
    </span>
  );
}
