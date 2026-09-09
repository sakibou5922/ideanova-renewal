import { useEffect } from 'react';
import { site } from '../data/site';

type Meta = {
  title: string;
  description: string;
};

/** ページごとの <title> / meta description を設定する */
export function useDocumentMeta({ title, description }: Meta): void {
  useEffect(() => {
    document.title = title;
    let el = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!el) {
      el = document.createElement('meta');
      el.name = 'description';
      document.head.appendChild(el);
    }
    el.content = description;
  }, [title, description]);
}

export function pageTitle(label: string): string {
  return `${label}｜${site.name}`;
}
