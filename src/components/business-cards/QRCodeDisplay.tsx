'use client';

import { QRCodeSVG } from 'qrcode.react';
import styles from './QRCodeDisplay.module.css';

interface QRCodeDisplayProps {
  url: string;
}

export default function QRCodeDisplay({ url }: QRCodeDisplayProps) {
  return (
    <div className={styles.container}>
      <div className={styles.qrWrapper}>
        <QRCodeSVG
          value={url}
          size={180}
          level="H"
          includeMargin={false}
          className={styles.qrCode}
          fgColor="#000000"
          bgColor="#ffffff"
        />
      </div>
      <p className={styles.hint}>
        Scan to view on your device
      </p>
    </div>
  );
}
