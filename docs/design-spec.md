# デザイン仕様書 v2 — REQ-20260909-05（design-dept / hallmark 監修基準）

v1（2事業の等価並置）を土台に、エディトリアル品質へ引き上げる。判断基準は `.claude/skills/hallmark` の規律（正直なコピー、トークン固定、1ページ1リビール、イタリック見出し禁止、320〜1280px 検証、アイブロウ既定OFF、hairline 優先）。

`/* Hallmark · genre: editorial · macrostructure: Letter+Diptych · theme: custom "Soil & Water" · enrichment: E5 (hand-built SVG) · polish: HP1 (vertical rail) · nav: N9 · footer: Ft1 */`

## v3「Luminous」— 美容・化粧品サイトの文法へ（ユーザー要望: SANKOU! 美容カテゴリ参考）
参考ギャラリー（sankoudesign.com/category/beauty-cosmetics-caregoods/）で共通する DNA を抽出（特定サイトの模写はしない）:
写真主導の大きなビジュアル／ミント・ブラッシュ・生成りの淡い色面／細めの明朝・広い字間／左右分割のヒーロー／角丸の写真マスク（アーチ）／英字の見出し語（Fragrance Collection 等）／たっぷりの余白。

ideanova への適用（構造は v2.1 を維持し、表層と余白を置き換える）:
- 色: 紙 #fbfaf7、農業＝セージ #e3ece5 / #3f7a52、化粧水＝ブラッシュ #f5e4e8 / #b8607c。インクは #2a2e2b に和らげる。2px のインク罫は廃止し hairline のみ。
- 形: 角丸を復活（sm 6 / md 16 / lg 32）。ヒーロー写真はアーチ形マスク。ボタンはピル型・枠線、hover でインク塗り。
- 型: display は 400/500 ウェイト、letter-spacing 0.02em、line-height 1.2。見出しに英字の display 行（Agriculture / Skincare）を添える（装飾アイブロウではなく h2 の一部）。
- ヒーロー: 左＝紙の面に縦罫＋H1＋リード＋CTA、右＝写真スロット（未設定時はセージ→ブラッシュのグラデーション面に線画）。
- 二つの柱: 左右並置から「上下に積んだ色面（セージ／ブラッシュ）」へ。各段は 5:7、写真は角丸 16。
- 締め: 黒ベタをやめ、淡いグラデーション面にインク文字。
- 画像スロット・原稿・a11y・モーション規律は v2.1 と同じ。

## v2.1「パキッと」調整（ユーザー要望: 独特のUI／パキッとお洒落）
- インクを #141816 に締め、hairline に加えて **2px のインク罫（`--rule`）** をページ見出し・diptych・フッター・図版枠に使う。角丸は全廃（`--radius: 0`）。
- 見出しは 700 ウェイト、line-height 1.08。ボタンは角型・インク塗り、hover で紙色に反転。
- 図版は `Plate` コンポーネントに統一: 2px インク枠＋版下風キャプション「Fig. 0n」。写真（`src/data/images.ts`）があれば写真、なければ線画プレート。
- ヒーロー直下に**事実のみの仕様行**（所在地／設立／事業）。数値は tabular-nums。
- diptych は写真スロット（16:10）＋序数＋角型「詳しく見る」（hover でインク反転）。
- 画像の指示書は `docs/images.md`（現行画像の流用条件・生成プロンプト・サイズ）。

## コンセプト「土と水」
農業支援＝土（深緑・穂・畝）、化粧水＝水（ローズ・雫・波紋）。1本の線画イラスト（芽と雫）がヒーローで2事業を結び、以降は左右／上下の分割で2事業を「対」として繰り返す。紙（生成り）の上に hairline と余白で組む。

## トークン（`src/styles/tokens.css`）— v1 から追加・変更
- 書体は 2+1: display `Shippori Mincho`（500/700）、body `Noto Sans JP`（400/500/700）、outlier なし（mono はコード用のみ）。数字は `font-variant-numeric: tabular-nums`。
- 追加: `--color-paper-2`（#f3efe7 帯背景）、`--color-ink-2`（#3d443f 見出し補助）、`--ease-out: cubic-bezier(0.16,1,0.3,1)`、`--ease-in-out`、`--duration-fast 120ms / --duration 180ms / --duration-slow 400ms`、`--hairline: 1px solid var(--color-line)`、`--text-display: clamp(2.6rem, 1.6rem + 4.2vw, 5.4rem)`、`--grain`（SVG feTurbulence data URI、ヒーローのみ 0.05 opacity）。
- 見出し: `letter-spacing: -0.01em`（和文なので控えめ）、`line-height: 1.12`。イタリック禁止。

## ページ構造

### `/` トップ
1. **Hero（Letter + HP1 縦罫 + E5 線画）**: 左に縦書きレール「株式会社ideanova ／ 福島県郡山市」、中央左寄せに H1「50年後も持続する地域作りを目指して」（display、2行、line-height 1.12）、リード2行、CTA（塗り「事業内容を見る」＋テキストリンク「お問い合わせ」）。右に手描き SVG「芽と雫」（stroke 1.5、`pathLength=1` で描画アニメ 1.2s、reduced-motion で静止）。高さ `clamp(60vh, 78dvh, 88dvh)`、`padding-block-end ≥ 1.3× start`。ヒーローだけ紙にグレイン。**リビールはここだけ**（H1 クリップ開き 0.6s → イラスト遅れてフェード）。
2. **二つの柱（Diptych）**: hairline で左右分割。各半分＝序数「01 / 02」（順序性ありのため許容）＋ display 見出し＋1行リード＋モチーフ SVG（穂／雫）＋「詳しく見る」。背景は各アクセントの淡色。カード枠なし。
3. **Mission（引用＋欄外注）**: 3:7 の非対称。左欄外に短い注（会社名・所在地）、右に本文2段落（既存コピー）＋会社概要リンク。
4. **News（索引型）**: 日付（tabular-nums）＋タイトルの hairline 行、最大3件。
5. **Statement close（Ft5 の要素をフッター前に）**: 「ご相談・お問い合わせ」見出し＋電話番号を display 大サイズで。塗りボタン1つ。

### `/service`
- ページ見出し + 右に短いリード。デスクトップは左に **sticky レール**（01 農業支援事業 / 02 化粧水事業、現在地を下線）。
- 各事業: 5:7 非対称。図版は「モチーフ SVG＋淡色面」の作図パネル（写真受領後に差し替え）。`<figcaption>` に「写真素材 要確認」を mono 小文字で明記。大きな装飾数字「01」を見出し背後に薄く（HP4 相当、セクション内1回）。
- 化粧水: 要確認ブロックは hairline の欄外注スタイルに。

### `/company`
- 代表挨拶＝レター型（narrow 46rem、冒頭1文を display で大きく、以降本文、署名右寄せ hairline 上）。
- 会社情報＝タビュラー仕様表（dt 右寄せ小文字、dd 左、hairline 区切り、tabular-nums）。

### `/contact`
- 4:8 分割。左レール: 電話（display 大）、所在地、受付時間（要確認）。右: フォーム。入力は下線型（hairline、focus で ink 2px）、高さ 48px 維持、エラーは赤の小文字＋`aria-describedby`。

### `/news`, `/news/:slug`, `/privacy`, 404
- 索引型／レター型の同系統。装飾は hairline のみ。

## Header / Footer
- Header（N9 edge-aligned）: ワードマーク左、リンク右、hairline 下。ヒーロー上では紙と同化、スクロール後 `data-scrolled` で hairline 濃度と影を上げる。`backdrop-filter` 不使用（fixed 子孫の包含ブロック問題を回避）。モバイル: 全面紙のメニュー、序数付き display リンク、`inert` で背後封じ。
- Footer（Ft1 mast-headed）: 大ワードマーク＋住所＋リンク1行、上に二重罫、下に copyright。

## モーション規律
- ヒーローの1回のリビールのみ（合計 ≤ 0.8s＋イラスト描画 1.2s）。スクロール連動フェードは使わない。
- hover/focus 180ms `--ease-out`。ボタンは矢印が 4px スライド、リンクは下線が伸びる。`transition-all` 禁止。
- `prefers-reduced-motion: reduce` で全アニメーション無効（静止状態＝完成状態）。

## アクセシビリティ
- v1 のコントラスト・フォーカス・ランドマーク・スキップリンクを維持。装飾 SVG は `aria-hidden`、意味を持つ図版は `role="img"` + `aria-label`。
- 縦書きレールは `aria-hidden`（同内容は本文に存在）。

## 完了事項 / 未完了事項 / 実装者への注意 / 検証観点 / 要確認事項
- 完了事項: 構造・トークン・モーション・a11y 仕様。
- 未完了事項: 写真・ロゴは未提供。線画 SVG は当社制作のオリジナル（権利問題なし）。
- 実装者への注意: アイブロウ（英字ラベル）は全廃。序数 01/02 のみ可。色・書体はトークン参照のみ。
- 検証観点: 320〜1280px 横スクロール、reduced-motion でヒーローが最終状態で静止、sticky レールがフッターに重ならない、モバイルメニューのタップ。
- 要確認事項: 化粧水の正式ブランドカラー、ロゴ、写真、CTA文言「事業内容を見る」（提案）。
