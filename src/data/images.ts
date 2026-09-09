/**
 * 写真スロット。ファイルを public/images/ に置き、ここでパスを設定すると各所に反映される。
 * null の間は当社制作の線画プレート（SVG）で代替表示する。
 * 仕様（サイズ・被写体・生成プロンプト）は docs/images.md を参照。
 */
export type ImageSlot = {
  src: string | null;
  alt: string;
};

export const images = {
  /** トップのヒーロー右（4:5 縦位置）。未設定なら線画「芽と雫」を表示 */
  hero: { src: null, alt: '' } as ImageSlot,
  /** トップ diptych・事業内容の農業支援（4:5） */
  agri: { src: null, alt: '農業支援事業のイメージ' } as ImageSlot,
  /** トップ・事業内容の化粧水（4:5）。出典: 株式会社エックスワン公式サイト（使用許可あり・ユーザー申告） */
  cosme: { src: '/images/cosme.jpg', alt: 'INUP EX（インナップEX）の化粧水・クリームなどスキンケア製品' } as ImageSlot,
  /** 事業内容の化粧水（横長 980×340）。出典: 同上 */
  cosmeWide: { src: '/images/cosme-wide.jpg', alt: 'INUP EX（インナップEX）スキンケアシリーズのキービジュアル' } as ImageSlot,
  /** 事業内容の化粧水ラインナップ（横長 980×408、XLUXES）。出典: 同上。任意 */
  cosmeLineup: { src: '/images/cosme-lineup.jpg', alt: 'XLUXES スキンケアシリーズの製品ラインナップ' } as ImageSlot,
  /** 会社概要の代表挨拶横（3:4）。任意 */
  greeting: { src: null, alt: '' } as ImageSlot,
} as const;

export type ImageKey = keyof typeof images;

/** サブパス配信（GitHub Pages 等）でも public/ 配下の画像を正しく参照する */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return path.startsWith('/') ? `${base}${path}` : path;
}
