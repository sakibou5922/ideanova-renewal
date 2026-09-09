import { MotifAgri, MotifCosme } from './Art';
import { asset, type ImageSlot } from '../data/images';
import type { PillarId } from '../data/pillars';
import styles from './Plate.module.css';

type Props = {
  image: ImageSlot;
  pillar: PillarId;
  /** 図版番号（印刷物の「図版」風キャプション） */
  figure?: string;
  caption?: string;
  /** CSS aspect-ratio 値（例 '4/5', '980/340'） */
  ratio?: string;
  className?: string;
};

const motif = { agri: MotifAgri, cosme: MotifCosme } as const;

/**
 * 写真スロット。image.src があれば写真、なければ線画プレートで代替。
 * 2px のインク枠と版下風キャプションで「パキッと」した印象に揃える。
 */
export function Plate({ image, pillar, figure, caption, ratio = '4/5', className }: Props) {
  const Motif = motif[pillar];
  const hasPhoto = Boolean(image.src);
  return (
    <figure className={[styles.figure, className].filter(Boolean).join(' ')} data-pillar={pillar}>
      <div className={styles.frame} style={{ aspectRatio: ratio }}>
        {hasPhoto ? (
          <img src={asset(image.src ?? '')} alt={image.alt} loading="lazy" decoding="async" className={styles.img} />
        ) : (
          <div className={styles.plate} role="img" aria-label={image.alt || '図版プレースホルダー'}>
            <Motif className={styles.motif} />
          </div>
        )}
      </div>
      {(figure || caption || !hasPhoto) && (
        <figcaption className={styles.caption}>
          {figure && <span className={styles.figNum}>{figure}</span>}
          <span>{hasPhoto ? caption : '写真素材 要確認 — 受領後に差し替え'}</span>
        </figcaption>
      )}
    </figure>
  );
}
