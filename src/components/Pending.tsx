import styles from './Pending.module.css';

type Props = {
  /** 未確定項目のリスト */
  items: string[];
  note?: string;
};

/** 未提供情報の欄外注。本番文言に見えないよう明示的に区別する。 */
export function Pending({ items, note }: Props) {
  return (
    <aside className={styles.box} aria-label="要確認事項">
      <p className={styles.head}>
        <span className={styles.badge}>要確認</span>
        ご提供後に差し替える情報
      </p>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {note && <p className={styles.note}>{note}</p>}
    </aside>
  );
}
