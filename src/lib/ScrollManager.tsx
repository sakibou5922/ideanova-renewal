import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** ルート遷移時に先頭へ、ハッシュがあれば該当要素へスクロールする */
export function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ block: 'start' });
        el.focus({ preventScroll: true });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
