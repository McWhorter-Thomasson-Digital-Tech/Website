'use client';

import { useGlobalCursor, type CursorType } from '@/lib/CursorContext';
import styles from './page.module.css';

const EFFECTS: { id: CursorType; name: string; description: string }[] = [
  {
    id: 'glow',
    name: 'Prismatic Glow',
    description: 'A color-cycling radial gradient that follows the cursor — subtle and ambient.',
  },
  {
    id: 'bubbles',
    name: 'Bubble Stream',
    description: 'Glassy bubbles rise and drift from your cursor with soft physics and lighting.',
  },
  {
    id: 'snake',
    name: 'Glow Snake',
    description: 'A chain of glowing orbs that flexibly follow your cursor like a luminous snake.',
  },
];

export function DemoClient() {
  const { cursorType, setCursorType } = useGlobalCursor();

  const selected = EFFECTS.find((e) => e.id === cursorType)!;

  return (
    <>
      <section className={styles.heroSection}>
        <span className={styles.label}>Interactive Demo</span>
        <h1 className={styles.heading}>Custom Cursor Effects</h1>
        <p className={styles.subtitle}>
          We design and build bespoke cursor effects tailored to your brand.
          Move your cursor around to experience each style in real time — then imagine what we can craft for you.
        </p>
        <div className={styles.desktopNote}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
          <span>Best experienced on Desktop. Mobile Safari is optimized for immersive browsing without these effects.</span>
        </div>
      </section>

      <section className={styles.controlSection}>
        <div className={styles.controlCard}>
          <div className={styles.toggleGroup}>
            {EFFECTS.map((effect) => (
              <button
                key={effect.id}
                id={`toggle-${effect.id}`}
                className={`${styles.toggleButton} ${cursorType === effect.id ? styles.active : ''}`}
                onClick={() => setCursorType(effect.id)}
              >
                {effect.name}
              </button>
            ))}
          </div>

          <div className={styles.effectInfo}>
            <h3 className={styles.effectName}>{selected.name}</h3>
            <p className={styles.effectDescription}>{selected.description}</p>
          </div>
        </div>

        <div className={styles.promptArea}>
          <svg className={styles.cursorIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4l7.07 17 2.51-7.39L21 11.07z" />
          </svg>
          <p className={styles.promptText}>Move your cursor anywhere</p>
        </div>
      </section>
    </>
  );
}
