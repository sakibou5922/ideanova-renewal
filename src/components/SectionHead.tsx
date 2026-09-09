import styles from './SectionHead.module.css';

type Props = {
  labelEn: string;
  title: string;
  as?: 'h1' | 'h2';
  id?: string;
  align?: 'left' | 'center';
};

export function SectionHead({ labelEn, title, as: Tag = 'h2', id, align = 'left' }: Props) {
  return (
    <div className={styles.head} data-align={align}>
      <span className={styles.label} aria-hidden="true">
        {labelEn}
      </span>
      <Tag id={id} className={styles.title}>
        {title}
      </Tag>
    </div>
  );
}
