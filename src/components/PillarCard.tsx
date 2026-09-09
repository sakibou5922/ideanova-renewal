import { Link } from 'react-router-dom';
import type { Pillar } from '../data/pillars';
import styles from './PillarCard.module.css';

export function PillarCard({ pillar }: { pillar: Pillar }) {
  const isPending = pillar.lead.startsWith('[要確認]');
  return (
    <Link to={`/service#${pillar.anchor}`} className={styles.card} data-pillar={pillar.id}>
      <span className={styles.label} aria-hidden="true">
        {pillar.labelEn}
      </span>
      <span className={styles.title}>{pillar.title}</span>
      <span className={styles.lead} data-pending={isPending}>
        {pillar.lead}
      </span>
      <span className={styles.more}>
        詳しく見る
        <span aria-hidden="true">→</span>
      </span>
    </Link>
  );
}
