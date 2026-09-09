/**
 * 会社情報（現行 ideanova.jp 会社概要ページからの移植・指定文言）
 * 「事業内容」のみ 2 事業構成へ更新（提案・要承認）。
 */
export const site = {
  name: '株式会社ideanova',
  nameEn: 'ideanova Inc.',
  tagline: '農業支援事業・化粧水事業',
  url: 'https://ideanova.jp/',
  representative: '荒木 裕子',
  founded: '2019年8月30日',
  postalCode: '〒963-8061',
  address: '福島県郡山市富久山町福原字陣場176番地2',
  tel: '024-905-2746',
  fax: '024-905-2107',
  business: '農業支援事業、化粧水事業',
  relatedCompany: 'DDE FINTECH HOLDING',
} as const;

export type NavItem = { to: string; label: string };

export const primaryNav: NavItem[] = [
  { to: '/service', label: '事業内容' },
  { to: '/company', label: '会社概要' },
  { to: '/news', label: '新着情報' },
  { to: '/contact', label: 'お問い合わせ' },
];

export const footerNav: NavItem[] = [
  { to: '/service#agriculture', label: '農業支援事業' },
  { to: '/service#cosmetics', label: '化粧水事業' },
  { to: '/company', label: '会社概要' },
  { to: '/news', label: '新着情報' },
  { to: '/contact', label: 'お問い合わせ' },
  { to: '/privacy', label: 'プライバシーポリシー' },
];
