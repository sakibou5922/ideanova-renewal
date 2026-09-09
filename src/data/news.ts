export type NewsItem = {
  slug: string;
  /** ISO 8601 (YYYY-MM-DD)。未確定は null */
  date: string | null;
  title: string;
  body: string[];
  pending?: boolean;
};

/** 新しい順に並べる */
export const news: NewsItem[] = [
  {
    slug: 'renewal',
    date: null,
    title: 'ホームページをリニューアルしました',
    body: ['[要確認] 公開日確定後に本文を差し替えてください。'],
    pending: true,
  },
  {
    // 現行 URL /staret-hp/ を維持
    slug: 'staret-hp',
    date: '2020-05-10',
    title: 'ホームページはじめました',
    body: ['ホームページはじめました'],
  },
];

export function formatDate(iso: string | null): string {
  if (!iso) return '日付未定';
  const [y, m, d] = iso.split('-').map(Number);
  return `${y}年${m}月${d}日`;
}
