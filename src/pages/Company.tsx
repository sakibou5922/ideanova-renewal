import { site } from '../data/site';
import { pageTitle, useDocumentMeta } from '../lib/useDocumentMeta';
import styles from './Company.module.css';

const profile: Array<[string, React.ReactNode]> = [
  ['会社名', site.name],
  ['代表取締役', site.representative],
  ['設立', site.founded],
  [
    '所在地',
    <>
      {site.postalCode}
      <br />
      {site.address}
    </>,
  ],
  ['TEL', site.tel],
  ['FAX', site.fax],
  ['事業内容', site.business],
  ['関連企業', site.relatedCompany],
];

export function Company() {
  useDocumentMeta({
    title: pageTitle('会社概要'),
    description:
      '株式会社ideanovaの会社概要。福島県郡山市、代表取締役 荒木裕子。農業支援事業・化粧水事業を展開しています。',
  });

  return (
    <div className="container">
      <div className="pageHead">
        <h1 className="pageTitle">会社概要</h1>
      </div>

      {/* 代表挨拶: レター型 */}
      <section className={styles.letter} aria-labelledby="greeting-title">
        <h2 id="greeting-title" className={styles.h2}>
          代表挨拶
        </h2>
        <div className={styles.letterBody}>
          <p className={styles.opening}>
            少子高齢化などの影響で都市部に人口が集中し、地方部では年々過疎化が進んでおります。
          </p>
          <p>私が住んでいる福島でもそれが顕著に出ており、地域の過疎化が危惧されています。</p>
          <p>
            当社では、独自のITプラットフォームを用いて、農業支援、化粧水事業など、様々な目線から、地域を盛り上げていくことを使命として事業を進めてまいります。
          </p>
          <p className={styles.sign}>
            <span className={styles.signCompany}>{site.name}</span>
            <span className={styles.signName}>代表取締役　{site.representative}</span>
          </p>
        </div>
      </section>

      {/* 会社情報: タビュラー仕様表 */}
      <section className={styles.profile} aria-labelledby="profile-title">
        <h2 id="profile-title" className={styles.h2}>
          会社情報
        </h2>
        <dl className={styles.dl}>
          {profile.map(([k, v]) => (
            <div key={k} className={styles.row}>
              <dt className={styles.dt}>{k}</dt>
              <dd className={styles.dd}>{v}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
