import { Link } from 'react-router-dom';
import { HeroArt } from '../components/Art';
import { LinkButton } from '../components/Button';
import { Plate } from '../components/Plate';
import { asset, images } from '../data/images';
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
      {/* Hero: 左＝紙の面、右＝アーチ形の写真スロット。ページで唯一のリビール */}
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroCopy}>
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
        </div>
        <div className={styles.heroVisual}>
          {images.hero.src ? (
            <img src={asset(images.hero.src)} alt={images.hero.alt} fetchPriority="high" decoding="async" className={styles.heroImg} />
          ) : (
            <div className={styles.heroField} role="img" aria-label="土から伸びる芽と、雫が落ちて広がる波紋の線画">
              <HeroArt className={styles.heroArt} />
            </div>
          )}
        </div>
      </section>

      {/* 事実のみの仕様行 */}
      <dl className={`container ${styles.spec}`}>
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

      {/* 二つの柱: 色面を上下に積む */}
      <section aria-labelledby="pillars-title">
        <h2 id="pillars-title" className="visually-hidden">
          当社の主なサービス
        </h2>
        {pillars.map((p, i) => {
          const pending = p.lead.startsWith('[要確認]');
          return (
            <div key={p.id} className={styles.field} data-pillar={p.id}>
              <div className={`container ${styles.fieldGrid}`} data-reverse={i % 2 === 1}>
                <Plate image={images[p.id]} pillar={p.id} ratio="4/5" className={styles.fieldPlate} />
                <div className={styles.fieldBody}>
                  <p className={styles.fieldNum} aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className={styles.fieldTitle}>
                    <span className={styles.fieldTitleEn}>{p.labelEn}</span>
                    {p.title}
                  </h3>
                  <p className={styles.fieldLead} data-pending={pending}>
                    {p.lead}
                  </p>
                  <LinkButton to={`/service#${p.anchor}`} variant="ghost">
                    詳しく見る
                  </LinkButton>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Mission: 余白の多い中央段組 */}
      <section className={styles.mission} aria-labelledby="mission-title">
        <div className="container container--narrow">
          <h2 id="mission-title" className={styles.missionHead}>
            私たちについて
          </h2>
          <p className={styles.missionText}>
            {site.name}
            は地域に根付いた活動を続けており、当社独自のITプラットフォームを活用し、活気ある地域作りを目指します。
          </p>
          <p className={styles.missionText}>
            農業支援と化粧水事業の二つの柱で、地方部の暮らしと産業を支えることを目指します。
          </p>
          <div className={styles.missionLink}>
            <Link to="/company" className="textLink">
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

      {/* Close: 淡いグラデーション面 */}
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
            <LinkButton to="/contact">お問い合わせフォーム</LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}
