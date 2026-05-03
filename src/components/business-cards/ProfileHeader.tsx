import Image from 'next/image';
import { BusinessCardData } from '@/types/businessCard';
import styles from './ProfileHeader.module.css';

interface ProfileHeaderProps {
  data: BusinessCardData;
}

export default function ProfileHeader({ data }: ProfileHeaderProps) {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          src={data.profileImageUrl}
          alt={`${data.firstName} ${data.lastName}`}
          fill
          className={styles.image}
          priority
        />
      </div>
      
      <div className={styles.infoContainer}>
        <h1 className={styles.name}>
          {data.firstName} {data.lastName}
        </h1>
        <p className={styles.title}>
          {data.title}
        </p>
        {data.department && (
          <p className={styles.department}>
            {data.department}
          </p>
        )}
      </div>

      <div className={styles.logoContainer}>
        <Image 
          src="/Logo_Clear_Center_smaller.png" 
          alt={data.companyName}
          width={150}
          height={50}
          className={styles.logo}
        />
      </div>
    </div>
  );
}
