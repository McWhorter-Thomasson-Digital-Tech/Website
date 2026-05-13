import { notFound } from 'next/navigation';
import { getBusinessCard } from '@/lib/businessCards';
import ProfileHeader from '@/components/business-cards/ProfileHeader';
import ActionRow from '@/components/business-cards/ActionRow';
import SaveButton from '@/components/business-cards/SaveButton';
import WalletActionRow from '@/components/business-cards/WalletActionRow';
import QRCodeDisplay from '@/components/business-cards/QRCodeDisplay';
import styles from './page.module.css';

export const revalidate = 60;

export default async function BusinessCardPage({
  params,
}: {
  params: Promise<{ employeeId: string }>;
}) {
  const { employeeId } = await params;
  const employeeData = await getBusinessCard(employeeId);

  if (!employeeData) {
    notFound();
  }

  // Get the base URL from the environment or default to localhost in de
  const baseDomain = process.env.NEXT_PUBLIC_SITE_DOMAIN || 'mtdigitaltech.com';
  const profileUrl = `https://${employeeId}.${baseDomain}`;

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
          <WalletActionRow employeeId={employeeId} />
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
