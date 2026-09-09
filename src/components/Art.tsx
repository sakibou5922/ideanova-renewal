import styles from './Art.module.css';

/**
 * 当社制作のオリジナル線画（権利問題なし）。
 * HeroArt: 「芽と雫」— 土（農業）と水（化粧水）を1本の線で結ぶ。
 * MotifAgri / MotifCosme: 各事業の小さなモチーフ。
 * すべて stroke ベースで、pathLength=1 により CSS で描画アニメーションを制御する。
 */

export function HeroArt({ className }: { className?: string }) {
  return (
    <svg
      className={[styles.hero, className].filter(Boolean).join(' ')}
      viewBox="0 0 520 560"
      fill="none"
      role="img"
      aria-label="土から伸びる芽と、雫が落ちて広がる波紋の線画"
    >
      {/* 地面（畝） */}
      <g className={styles.soil} stroke="var(--color-agri)" strokeWidth="1.6" strokeLinecap="round">
        <path pathLength={1} className={styles.draw} d="M20 452 C 120 430, 180 470, 280 448 S 440 420, 500 446" />
        <path pathLength={1} className={styles.draw} d="M40 484 C 140 462, 200 500, 300 480 S 450 454, 505 476" strokeOpacity="0.55" />
        <path pathLength={1} className={styles.draw} d="M70 514 C 170 494, 230 528, 330 508 S 470 486, 510 504" strokeOpacity="0.3" />
      </g>

      {/* 芽 */}
      <g className={styles.sprout} stroke="var(--color-agri)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path pathLength={1} className={styles.draw} d="M236 446 C 240 380, 232 320, 246 262" />
        <path
          pathLength={1}
          className={styles.draw}
          d="M243 318 C 200 318, 166 290, 160 246 C 206 240, 240 268, 243 318 Z"
        />
        <path
          pathLength={1}
          className={styles.draw}
          d="M246 286 C 250 232, 290 202, 340 200 C 336 252, 300 288, 246 286 Z"
        />
        <path pathLength={1} className={styles.draw} d="M243 318 C 218 300, 196 280, 178 258" strokeOpacity="0.5" strokeWidth="1.2" />
        <path pathLength={1} className={styles.draw} d="M246 286 C 274 262, 300 236, 322 214" strokeOpacity="0.5" strokeWidth="1.2" />
      </g>

      {/* 雫 */}
      <g className={styles.drop} stroke="var(--color-cosme)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path
          pathLength={1}
          className={styles.draw}
          d="M396 78 C 396 78, 344 148, 344 186 C 344 216, 367 238, 396 238 C 425 238, 448 216, 448 186 C 448 148, 396 78, 396 78 Z"
        />
        <path pathLength={1} className={styles.draw} d="M366 190 C 366 206, 376 218, 390 222" strokeOpacity="0.55" strokeWidth="1.4" />
      </g>

      {/* 波紋 */}
      <g className={styles.ripple} stroke="var(--color-cosme)" strokeWidth="1.4" strokeLinecap="round">
        <path pathLength={1} className={styles.draw} d="M338 336 C 366 322, 426 322, 454 336 C 426 350, 366 350, 338 336 Z" />
        <path pathLength={1} className={styles.draw} d="M304 342 C 350 316, 442 316, 488 342" strokeOpacity="0.55" />
        <path pathLength={1} className={styles.draw} d="M304 342 C 350 368, 442 368, 488 342" strokeOpacity="0.55" />
        <path pathLength={1} className={styles.draw} d="M270 350 C 336 306, 456 306, 520 350" strokeOpacity="0.3" />
        <path pathLength={1} className={styles.draw} d="M270 350 C 336 394, 456 394, 520 350" strokeOpacity="0.3" />
        {/* 落下線 */}
        <path pathLength={1} className={styles.draw} d="M396 252 L 396 300" strokeOpacity="0.5" strokeDasharray="2 8" />
      </g>
    </svg>
  );
}

export function MotifAgri({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 160"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M60 150 C 62 110, 58 70, 62 30" />
      <path d="M61 96 C 40 92, 28 78, 26 60 C 46 60, 60 74, 61 96 Z" />
      <path d="M62 78 C 66 54, 82 40, 100 38 C 98 62, 84 78, 62 78 Z" />
      <path d="M61 124 C 44 122, 32 112, 30 98 C 46 100, 58 108, 61 124 Z" />
      <path d="M62 112 C 66 96, 78 86, 92 84 C 90 100, 80 110, 62 112 Z" />
      <path d="M62 30 C 60 22, 62 14, 66 8" strokeOpacity="0.5" />
    </svg>
  );
}

export function MotifCosme({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 160"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M60 14 C 60 14, 34 50, 34 70 C 34 86, 46 98, 60 98 C 74 98, 86 86, 86 70 C 86 50, 60 14, 60 14 Z" />
      <path d="M46 72 C 46 80, 51 87, 58 89" strokeOpacity="0.5" />
      <path d="M40 126 C 52 120, 68 120, 80 126 C 68 132, 52 132, 40 126 Z" />
      <path d="M22 130 C 44 116, 76 116, 98 130" strokeOpacity="0.55" />
      <path d="M22 130 C 44 144, 76 144, 98 130" strokeOpacity="0.55" />
      <path d="M8 134 C 40 110, 80 110, 112 134" strokeOpacity="0.3" />
      <path d="M8 134 C 40 158, 80 158, 112 134" strokeOpacity="0.3" />
    </svg>
  );
}
