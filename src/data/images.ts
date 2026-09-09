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
  /** トップ diptych・事業内容の化粧水（4:5） */
  cosme: { src: null, alt: '化粧水事業のイメージ' } as ImageSlot,
  /** 会社概要の代表挨拶横（3:4）。任意 */
  greeting: { src: null, alt: '' } as ImageSlot,
} as const;

export type ImageKey = keyof typeof images;
