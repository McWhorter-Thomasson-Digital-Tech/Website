import React, { HTMLAttributes } from 'react';
import styles from './Card.module.css';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  elevated?: boolean;
  glass?: boolean;
}

export function Card({ 
  children, 
  elevated = false, 
  glass = false,
  className = '', 
  ...props 
}: CardProps) {
  const baseClass = `${styles.card} ${elevated ? styles.elevated : ''} ${glass ? styles.glass : ''} ${className}`;

  return (
    <div className={baseClass} {...props}>
      {children}
    </div>
  );
}
