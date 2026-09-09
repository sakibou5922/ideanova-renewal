import { Link, useParams } from 'react-router-dom';
import { news, formatDate } from '../data/news';
import { pageTitle, useDocumentMeta } from '../lib/useDocumentMeta';
import { NotFound } from './NotFound';
import styles from './News.module.css';

export function NewsList() {
  useDocumentMeta({
    title: pageTitle('新着情報'),
    description: '株式会社ideanovaからのお知らせ一覧です。',
  });

  return (
    <div className="container">
      <div className="pageHead">
        <h1 className="pageTitle">新着情報</h1>
      </div>
      <ul className={styles.list}>
        {news.map((n) => (
          <li key={n.slug} className={styles.item}>
            <time dateTime={n.date ?? undefined} className={styles.date}>
              {formatDate(n.date)}
            </time>
            <Link to={`/news/${n.slug}`} className={styles.link}>
              {n.title}
              {n.pending && <span className={styles.pending}>要確認</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function NewsDetail() {
  const { slug } = useParams();
  const item = news.find((n) => n.slug === slug);
  return item ? <NewsArticle item={item} /> : <NotFound />;
}

function NewsArticle({ item }: { item: (typeof news)[number] }) {
  useDocumentMeta({
    title: pageTitle(item.title),
    description: `${item.title} — 株式会社ideanovaからのお知らせ`,
  });

  return (
    <article className="container container--narrow">
      <div className={`pageHead ${styles.articleHead}`}>
        <p className={styles.crumb}>
          <Link to="/news">新着情報</Link>
          <span aria-hidden="true"> / </span>
          <span>{item.title}</span>
        </p>
        <time dateTime={item.date ?? undefined} className={styles.date}>
          {formatDate(item.date)}
        </time>
        <h1 className={styles.title}>{item.title}</h1>
      </div>
      <div className={styles.body} data-pending={item.pending}>
        {item.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <p className={styles.back}>
        <Link to="/news" className="textLink">
          <span aria-hidden="true">←</span>
          新着情報一覧へ戻る
        </Link>
      </p>
    </article>
  );
}
