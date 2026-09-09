import { useEffect, useState } from 'react';
import { LinkButton } from '../components/Button';
import { Pending } from '../components/Pending';
import { Plate } from '../components/Plate';
import { images } from '../data/images';
import { pillars } from '../data/pillars';
import { pageTitle, useDocumentMeta } from '../lib/useDocumentMeta';
import styles from './Service.module.css';

/** 画面内にあるセクションの anchor を返す（sticky レールの現在地表示用） */
function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? '');
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el));
    if (els.length === 0 || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.2, 0.5] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return active;
}

const anchors = pillars.map((p) => p.anchor);

export function Service() {
  useDocumentMeta({
    title: pageTitle('事業内容'),
    description:
      '株式会社ideanovaの事業内容。地域の農産物を全国に広める農業支援事業（WFCストア）と、化粧水事業をご紹介します。',
  });
  const active = useActiveSection(anchors);

  return (
    <div className="container">
      <div className="pageHead">
        <h1 className="pageTitle">事業内容</h1>
        <p className="pageLede">
          土に根ざす農業支援と、肌に寄り添う化粧水。二つの事業で、地域の暮らしと産業を支えます。
        </p>
      </div>

      <div className={styles.layout}>
        <nav className={styles.rail} aria-label="事業一覧">
          <ol className={styles.railList}>
            {pillars.map((p, i) => (
              <li key={p.id}>
                <a
                  href={`#${p.anchor}`}
                  className={styles.railLink}
                  data-pillar={p.id}
                  aria-current={active === p.anchor ? 'location' : undefined}
                >
                  <span className={styles.railNum}>{String(i + 1).padStart(2, '0')}</span>
                  <span>{p.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className={styles.sections}>
          {pillars.map((p, i) => {
            return (
              <section
                key={p.id}
                id={p.anchor}
                tabIndex={-1}
                className={styles.pillar}
                data-pillar={p.id}
                aria-labelledby={`${p.anchor}-title`}
              >
                <span className={styles.bigNum} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className={styles.pillarGrid}>
                  <Plate
                    image={{ ...images[p.id], alt: images[p.id].alt || p.imageAlt }}
                    pillar={p.id}
                    figure={`Fig. ${String(i + 2).padStart(2, '0')}`}
                    caption={p.title}
                    className={styles.figure}
                  />
                  <div className={styles.body}>
                    <h2 id={`${p.anchor}-title`} className={styles.title}>
                      {p.title}
                    </h2>
                    <p className={styles.subtitle} data-pending={p.subtitle.startsWith('[要確認]')}>
                      {p.subtitle}
                    </p>
                    <div className={styles.prose}>
                      {p.paragraphs.map((text) => (
                        <p key={text}>{text}</p>
                      ))}
                      {p.externalLink && (
                        <p>
                          <a href={p.externalLink.href} target="_blank" rel="noopener noreferrer" className={styles.ext}>
                            {p.externalLink.label}
                            <span className="visually-hidden">（新しいタブで開きます）</span>
                          </a>
                        </p>
                      )}
                    </div>
                    {p.pending && (
                      <Pending
                        items={p.pending}
                        note="効能効果を示す表現は薬機法・景表法の確認が必要です（法務確認要）。"
                      />
                    )}
                    <div className={styles.actions}>
                      <LinkButton to="/contact">お問い合わせはこちら</LinkButton>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
