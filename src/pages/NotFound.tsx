import { LinkButton } from '../components/Button';
import { pageTitle, useDocumentMeta } from '../lib/useDocumentMeta';
import styles from './NotFound.module.css';

export function NotFound() {
  useDocumentMeta({
    title: pageTitle('ページが見つかりません'),
    description: 'お探しのページは見つかりませんでした。',
  });

  return (
    <div className={`container container--narrow ${styles.wrap}`}>
      <p className={styles.code} aria-hidden="true">
        404
      </p>
      <h1 className={styles.title}>ページが見つかりません</h1>
      <p className={styles.text}>
        お探しのページは移動または削除された可能性があります。URLをご確認いただくか、トップページからお進みください。
      </p>
      <LinkButton to="/" variant="ghost">
        トップページへ
      </LinkButton>
    </div>
  );
}
