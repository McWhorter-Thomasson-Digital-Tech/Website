import { notFound } from 'next/navigation';
import { mockBusinessCards } from '@/data/mockBusinessCards';
import ProfileHeader from '@/components/business-cards/ProfileHeader';
import ActionRow from '@/components/business-cards/ActionRow';
import SaveButton from '@/components/business-cards/SaveButton';
import QRCodeDisplay from '@/components/business-cards/QRCodeDisplay';
import styles from './page.module.css';

export function generateStaticParams() {
  return Object.keys(mockBusinessCards).map((employeeId) => ({
    employeeId,
  }));
}

export default async function BusinessCardPage({
  params,
}: {
  params: Promise<{ employeeId: string }>;
}) {
  const { employeeId } = await params;
  const employeeData = mockBusinessCards[employeeId];

  if (!employeeData) {
    notFound();
  }

  // Get the base URL from the environment or default to localhost in dev
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const profileUrl = `${baseUrl}/business-cards/${employeeId}`;

  return (
    <main className={styles.main}>
      {/* Decorative background blur */}
      <div className={styles.blurBackground} />
      
      <div className={styles.cardContainer}>
        <ProfileHeader data={employeeData} />
        
        <div className={styles.cardInner}>
          <ActionRow data={employeeData} />
          
          <div className={styles.divider} />
          
          <SaveButton employeeId={employeeId} />
        </div>
      </div>

      <QRCodeDisplay url={profileUrl} />
      
      <footer className={styles.footer}>
        <p className={styles.footerText}>
          Powered by McWhorter-Thomasson Digital Technologies
        </p>
      </footer>
    </main>
  );
}
