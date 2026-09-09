import { Link } from 'react-router-dom';
import { HeroArt } from '../components/Art';
import { LinkButton } from '../components/Button';
import { Plate } from '../components/Plate';
import { images } from '../data/images';
import { news, formatDate } from '../data/news';
import { pillars } from '../data/pillars';
import { site } from '../data/site';
import { useDocumentMeta } from '../lib/useDocumentMeta';
import styles from './Home.module.css';

export function Home() {
  useDocumentMeta({
    title: `${site.name}｜${site.tagline}（福島県郡山市）`,
    description:
      '株式会社ideanovaは福島県郡山市を拠点に、地域の農産物を全国へ広める農業支援事業と、化粧水事業を展開しています。50年後も持続する地域作りを目指します。',
  });

  const latest = news.slice(0, 3);

  return (
    <>
      {/* Hero: Letter + HP1 縦罫 + E5 線画（写真が設定されれば写真）。ページで唯一のリビール */}
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroGrid}>
          <p className={styles.rail} aria-hidden="true">
            {site.name}
            <span className={styles.railSep} />
            福島県郡山市
          </p>
          <div className={styles.heroBody}>
            <h1 id="hero-title" className={styles.heroTitle}>
              <span className={styles.line}>
                <span className={styles.lineInner}>50年後も持続する</span>
              </span>
              <span className={styles.line}>
                <span className={styles.lineInner}>地域作りを目指して</span>
              </span>
            </h1>
            <p className={styles.heroLede}>
              地域の農産物を全国へ広める農業支援と、化粧水事業。
              <br className={styles.brDesktop} />
              二つの柱で、地方部の暮らしと産業を支えます。
            </p>
            <div className={styles.heroActions}>
              <LinkButton to="/service">事業内容を見る</LinkButton>
              <Link to="/contact" className="textLink">
                お問い合わせ
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
          </div>
          <div className={styles.heroArt}>
            {images.hero.src ? (
              <figure className={styles.heroPhoto}>
                <img src={images.hero.src} alt={images.hero.alt} fetchPriority="high" decoding="async" />
              </figure>
            ) : (
              <figure className={styles.heroPlate}>
                <HeroArt />
                <figcaption className={styles.heroCaption}>
                  <span className={styles.heroCaptionNum}>Fig. 01</span>
                  土と水 — 芽と雫
                </figcaption>
              </figure>
            )}
          </div>
        </div>

        {/* 事実のみの仕様行 */}
        <dl className={styles.spec}>
          <div className={styles.specItem}>
            <dt>所在地</dt>
            <dd>福島県郡山市</dd>
          </div>
          <div className={styles.specItem}>
            <dt>設立</dt>
            <dd>{site.founded}</dd>
          </div>
          <div className={styles.specItem}>
            <dt>事業</dt>
            <dd>農業支援 ／ 化粧水</dd>
          </div>
        </dl>
      </section>

      {/* 二つの柱: 2px のインク罫で分割した diptych */}
      <section className={styles.pillars} aria-labelledby="pillars-title">
        <h2 id="pillars-title" className="visually-hidden">
          当社の主なサービス
        </h2>
        {pillars.map((p, i) => {
          const pending = p.lead.startsWith('[要確認]');
          return (
            <Link
              key={p.id}
              to={`/service#${p.anchor}`}
              className={styles.pillar}
              data-pillar={p.id}
            >
              <span className={styles.pillarHead}>
                <span className={styles.pillarNum} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className={styles.pillarTitle}>{p.title}</span>
              </span>
              <Plate image={images[p.id]} pillar={p.id} ratio="16/10" className={styles.pillarPlate} />
              <span className={styles.pillarLead} data-pending={pending}>
                {p.lead}
              </span>
              <span className={styles.pillarMore}>
                詳しく見る
                <span className={styles.pillarArrow} aria-hidden="true">
                  →
                </span>
              </span>
            </Link>
          );
        })}
      </section>

      {/* Mission: 欄外注つきの非対称段組 */}
      <section className={styles.mission} aria-labelledby="mission-title">
        <div className={`container ${styles.missionGrid}`}>
          <div className={styles.missionAside}>
            <h2 id="mission-title" className={styles.missionHead}>
              私たちについて
            </h2>
            <p className={styles.missionNote}>
              {site.name}
              <br />
              {site.postalCode}
              <br />
              {site.address}
            </p>
          </div>
          <div className={styles.missionBody}>
            <p className={styles.missionText}>
              {site.name}
              は地域に根付いた活動を続けており、当社独自のITプラットフォームを活用し、活気ある地域作りを目指します。
            </p>
            <p className={styles.missionText}>
              農業支援と化粧水事業の二つの柱で、地方部の暮らしと産業を支えることを目指します。
            </p>
            <Link to="/company" className={`textLink ${styles.missionLink}`}>
              代表挨拶・会社概要
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* News: 索引型 */}
      <section className={styles.news} aria-labelledby="news-title">
        <div className={`container ${styles.newsGrid}`}>
          <h2 id="news-title" className={styles.newsHead}>
            新着情報
          </h2>
          <div>
            <ul className={styles.newsList}>
              {latest.map((n) => (
                <li key={n.slug} className={styles.newsItem}>
                  <time dateTime={n.date ?? undefined} className={styles.newsDate}>
                    {formatDate(n.date)}
                  </time>
                  <Link to={`/news/${n.slug}`} className={styles.newsLink}>
                    {n.title}
                    {n.pending && <span className={styles.newsPending}>要確認</span>}
                  </Link>
                </li>
              ))}
            </ul>
            <Link to="/news" className={`textLink ${styles.newsMore}`}>
              新着情報一覧
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Statement close */}
      <section className={styles.close} aria-labelledby="close-title">
        <div className={`container ${styles.closeGrid}`}>
          <div>
            <h2 id="close-title" className={styles.closeTitle}>
              ご相談・お問い合わせ
            </h2>
            <p className={styles.closeText}>
              生産された商品を全国に広げたい方、当社の事業に関心をお持ちの方は、お気軽にご連絡ください。
            </p>
          </div>
          <div className={styles.closeActions}>
            <a href={`tel:${site.tel.replaceAll('-', '')}`} className={styles.closeTel}>
              <span className={styles.closeTelLabel}>TEL</span>
              <span className={styles.closeTelNum}>{site.tel}</span>
            </a>
            <LinkButton to="/contact" variant="ghost" className={styles.closeButton}>
              お問い合わせフォーム
            </LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}
