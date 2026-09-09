export type PillarId = 'agri' | 'cosme';

export type Pillar = {
  id: PillarId;
  anchor: 'agriculture' | 'cosmetics';
  labelEn: string;
  title: string;
  /** トップのヒーロー用短文 */
  lead: string;
  /** 事業詳細のサブタイトル */
  subtitle: string;
  paragraphs: string[];
  externalLink?: { href: string; label: string };
  /** 未提供情報のプレースホルダー（[要確認]表示） */
  pending?: string[];
  imageAlt: string;
};

/**
 * 農業支援事業: 現行 ideanova.jp/service#agriculture の本文を原文のまま移植。
 * 化粧水事業: 情報未提供のため、すべて [要確認] プレースホルダー。
 */
export const pillars: Pillar[] = [
  {
    id: 'agri',
    anchor: 'agriculture',
    labelEn: 'Agriculture',
    title: '農業支援事業',
    lead: '地域の農産物を、全国へ。',
    subtitle: '地域の農産物を全国に広めるショッピング市場',
    paragraphs: [
      '地域の農産物を独自の経済圏を用いて全国に広める取り組みのひとつとしてWFCストアがあります。',
      'WFCストアの潜在顧客は2万人以上います。（2020年4月現在）',
      '農産物以外にも様々な商品が掲載されておりますので、ご自身が生産された商品を全国に向けて広げたい方は、弊社までお問い合わせください。',
    ],
    externalLink: { href: 'https://wfca-p.com/', label: 'https://wfca-p.com/' },
    imageAlt: '農業支援事業のイメージ',
  },
  {
    id: 'cosme',
    anchor: 'cosmetics',
    labelEn: 'Skincare',
    title: '化粧水事業',
    lead: '[要確認] 化粧水事業の一言コピー',
    subtitle: '[要確認] ブランドコンセプト',
    paragraphs: [],
    pending: [
      'ブランド名・商品名',
      '商品の特徴・成分・製法（薬機法の表現確認要）',
      '容量・価格',
      '販売チャネル（自社EC / 店舗 / 卸）',
    ],
    imageAlt: '化粧水事業のイメージ',
  },
];
