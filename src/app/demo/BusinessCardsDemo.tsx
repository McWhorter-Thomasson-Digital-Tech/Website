'use client';

import { useState } from 'react';
import { mockBusinessCards } from '@/data/mockBusinessCards';
import ProfileHeader from '@/components/business-cards/ProfileHeader';
import ActionRow from '@/components/business-cards/ActionRow';
import SaveButton from '@/components/business-cards/SaveButton';
import WalletActionRow from '@/components/business-cards/WalletActionRow';
import QRCodeDisplay from '@/components/business-cards/QRCodeDisplay';
import styles from './page.module.css';

export function BusinessCardsDemo() {
  const users = Object.keys(mockBusinessCards);
  const [selectedUser, setSelectedUser] = useState<string>(users[0]);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const employeeData = mockBusinessCards[selectedUser];
  const profileUrl = `${baseUrl}/business-cards/${selectedUser}`;

  return (
    <section className={styles.demoSection}>
      <div className={styles.demoSectionHeader}>
        <span className={styles.label}>NFC integration</span>
        <h2 className={styles.sectionHeading}>Digital Business Cards</h2>
        <p className={styles.sectionSubtitle}>
          Tap your custom NFC-enabled card to any smartphone to instantly share your contact details.
          The sleek, app-like interface makes a lasting impression.
        </p>
      </div>

      <div className={styles.demoSectionContent}>
        <div className={styles.controlPanel}>
          <div className={styles.controlCard}>
            <div className={styles.toggleGroup}>
              {users.map((userId) => {
                const user = mockBusinessCards[userId];
                return (
                  <button
                    key={userId}
                    className={`${styles.toggleButton} ${selectedUser === userId ? styles.active : ''}`}
                    onClick={() => setSelectedUser(userId)}
                  >
                    {user.firstName}
                  </button>
                );
              })}
            </div>
            <div className={styles.effectInfo}>
              <h3 className={styles.effectName}>Real-Time Preview</h3>
              <p className={styles.effectDescription}>
                Switch between team members to see how our scalable architecture handles dynamic data.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.phoneMockupContainer}>
          <div className={styles.mockPhone}>
            <div className={styles.phoneNotch}></div>
            <div className={styles.phoneScreen}>
              <div className={styles.cardContainer}>
                <ProfileHeader data={employeeData} />
                <div className={styles.cardInner}>
                  <ActionRow data={employeeData} />
                  <div className={styles.divider} />
                  <SaveButton employeeId={selectedUser} />
                  <WalletActionRow employeeId={selectedUser} />
                </div>
                <QRCodeDisplay url={profileUrl} />
                <footer className={styles.phoneFooter}>
                  <p className={styles.footerText}>
                    Powered by McWhorter-Thomasson Digital Technologies
                  </p>
                </footer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
