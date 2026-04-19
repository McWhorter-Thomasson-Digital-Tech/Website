import React from 'react';
import { Button } from '../../ui/Button/Button';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            {/* TODO: Insert Hero H1 here */}
            {`[INSERT_HERO_H1_HEADLINE]`}
          </h1>
          <p className={styles.subtitle}>
            {/* TODO: Insert Hero Subtitle/Paragraph here */}
            {`[INSERT_HERO_SUBTITLE_PARAGRAPH]`}
          </p>
          <div className={styles.actions}>
            <Button variant="primary" href="#react-websites">{`[INSERT_PRIMARY_CTA_TEXT]`}</Button>
            <Button variant="outline" href="#backend">{`[INSERT_SECONDARY_CTA_TEXT]`}</Button>
          </div>

        </div>
        <div className={styles.visuals}>
          {/* TODO: Insert Hero Image or 3D Element here */}
          <div className={styles.placeholderVisual}>
            [HERO_VISUAL_ASSET_PLACEHOLDER]
          </div>
        </div>
      </div>
    </section>
  );
}
