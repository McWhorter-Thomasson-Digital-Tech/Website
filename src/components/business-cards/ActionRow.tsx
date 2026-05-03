import { Phone, Mail, Linkedin, Globe } from 'lucide-react';
import { BusinessCardData } from '@/types/businessCard';
import React from 'react';
import styles from './ActionRow.module.css';

interface ActionRowProps {
  data: BusinessCardData;
}

export default function ActionRow({ data }: ActionRowProps) {
  const actions = [
    {
      label: 'Call',
      icon: <Phone className={styles.icon} />,
      href: `tel:${data.phoneMobile}`,
      condition: !!data.phoneMobile,
    },
    {
      label: 'Email',
      icon: <Mail className={styles.icon} />,
      href: `mailto:${data.email}`,
      condition: !!data.email,
    },
    {
      label: 'Website',
      icon: <Globe className={styles.icon} />,
      href: data.companyWebsite,
      condition: !!data.companyWebsite,
    },
    {
      label: 'LinkedIn',
      icon: <Linkedin className={styles.icon} />,
      href: data.linkedInUrl,
      condition: !!data.linkedInUrl,
    },
  ].filter(action => action.condition);

  return (
    <div className={styles.container}>
      {actions.map((action, index) => (
        <a
          key={index}
          href={action.href!}
          target={action.label !== 'Call' && action.label !== 'Email' ? "_blank" : undefined}
          rel="noopener noreferrer"
          className={styles.actionLink}
        >
          <div className={styles.iconWrapper}>
            {action.icon}
          </div>
          <span className={styles.label}>
            {action.label}
          </span>
        </a>
      ))}
    </div>
  );
}
