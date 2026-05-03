'use client';

import { Download } from 'lucide-react';
import { useState } from 'react';
import styles from './SaveButton.module.css';

interface SaveButtonProps {
  employeeId: string;
}

export default function SaveButton({ employeeId }: SaveButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch(`/api/vcard/${employeeId}`);
      if (!response.ok) throw new Error('Failed to generate vCard');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `contact-${employeeId}.vcf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading vCard:', error);
      alert('There was an error saving the contact. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className={styles.container}>
      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className={styles.button}
      >
        <Download className={styles.icon} />
        <span>{isDownloading ? 'Saving...' : 'Save Contact'}</span>
      </button>
    </div>
  );
}
