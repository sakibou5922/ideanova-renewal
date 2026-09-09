import { useEffect, useId, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { primaryNav, site } from '../data/site';
import styles from './Header.module.css';

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuId = useId();
  const { pathname } = useLocation();
  const [openedAt, setOpenedAt] = useState(pathname);

  // ルート遷移でメニューを閉じる（レンダー中に派生させ、effect 内 setState を避ける）
  if (open && openedAt !== pathname) {
    setOpen(false);
    setOpenedAt(pathname);
  }

  // スクロール後にヘッダーの罫線・影を強める
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrolled(window.scrollY > 24));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // 開いている間は背景スクロールを固定し、背後を inert に、Esc で閉じる
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const behind = Array.from(document.querySelectorAll<HTMLElement>('main, footer'));
    behind.forEach((el) => {
      el.inert = true;
    });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const mq = window.matchMedia('(min-width: 768px)');
    const onMq = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    mq.addEventListener('change', onMq);
    return () => {
      document.body.style.overflow = prev;
      behind.forEach((el) => {
        el.inert = false;
      });
      window.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onMq);
    };
  }, [open]);

  return (
    <header className={styles.header} data-scrolled={scrolled} data-open={open}>
      <a className={styles.skip} href="#main">
        本文へスキップ
      </a>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand} aria-label={`${site.name} トップページ`}>
          <span className={styles.brandMark} aria-hidden="true">
            <span className={styles.brandMarkAgri} />
            <span className={styles.brandMarkCosme} />
          </span>
          <span className={styles.brandName}>{site.name}</span>
        </Link>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => {
            setOpenedAt(pathname);
            setOpen((v) => !v);
          }}
        >
          <span className={styles.toggleLabel}>{open ? '閉じる' : 'メニュー'}</span>
          <span className={styles.toggleBars} aria-hidden="true" data-open={open} />
        </button>

        <nav id={menuId} className={styles.nav} data-open={open} aria-label="グローバルナビゲーション">
          <ol className={styles.list}>
            {primaryNav.map((item, i) => (
              <li key={item.to} className={styles.item}>
                <NavLink
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    isActive ? `${styles.link} ${styles.linkActive}` : styles.link
                  }
                >
                  <span className={styles.num} aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className={styles.label}>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ol>
          <p className={styles.navFoot}>
            {site.postalCode} {site.address}
            <br />
            TEL {site.tel}
          </p>
        </nav>
      </div>
    </header>
  );
}
