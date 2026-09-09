import { Link } from 'react-router-dom';
import { footerNav, site } from '../data/site';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.mast}>
          <p className={styles.wordmark}>{site.name}</p>
          <p className={styles.tagline}>{site.tagline}</p>
        </div>
        <div className={styles.side}>
          <address className={styles.address}>
            {site.postalCode} {site.address}
            <br />
            TEL <a href={`tel:${site.tel.replaceAll('-', '')}`}>{site.tel}</a>
            <span aria-hidden="true">　</span>FAX {site.fax}
          </address>
          <nav aria-label="フッターナビゲーション">
            <ul className={styles.list}>
              {footerNav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className={styles.link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <div className={`container ${styles.bottom}`}>
        <p className={styles.copy}>Copyright © {site.name}. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
