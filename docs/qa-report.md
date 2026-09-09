# QA検証レポート — REQ-20260909-04 / -R1（qa-review-dept 報告を direction-dept が転記）

検証環境: `vite preview`（dist/）＋ Playwright Chromium（サンドボックス、外部ネットワーク遮断）。
QA部はファイルを編集せず、証拠（コマンドログ・DOM計測・スクリーンショット）に基づき判定。

## 初回検証（REQ-20260909-04）

| # | 完了条件 | 判定 | 証拠要約 |
| --- | --- | --- | --- |
| 1 | build / typecheck / lint エラー0 | 合格 | vite build exit 0、tsc exit 0、oxlint 0 warnings / 0 errors |
| 2 | 削除事業の文言・リンクなし | 合格 | dist/ src/ index.html public/ を grep → 0件 |
| 3 | 事業2つ、#agriculture / #cosmetics あり | 合格 | section[id] = agriculture, cosmetics のみ |
| 4 | 農業支援本文の原文一致 | 合格 | content.md と Buffer 比較 3/3 一致、リンク rel=noopener |
| 5 | 会社概要の指定文言 | 合格 | 8項目すべて一致 |
| 6 | 化粧水は要確認表記、創作数値なし | 合格 | 価格・成分・実績語の走査 0件 |
| 7 | 320/375/414/768/1280 横スクロールなし | 合格 | 50/50 ケース scrollWidth <= innerWidth |
| 8 | 内部リンク解決、404なし | 合格 | ユニーク10リンク全件OK、/staret-hp → /news/staret-hp |
| 9 | コンソールエラーなし | 合格（環境要因除く） | fonts.googleapis.com 遮断による ERR_TUNNEL_CONNECTION_FAILED のみ。pageerror 0 |
| 10 | 固有 title / description | 合格 | 10ルートすべて固有 |
| 11 | コントラスト AA、キーボード操作 | 合格 | ink 14.72:1、muted 5.91:1、agri 6.01:1、cosme 5.26:1、白/agri 6.37:1、白/cosme 5.58:1 |
| 12 | フォーム検証 | 合格 | 空送信でエラー5件＋先頭へフォーカス、形式エラー、正常送信で受付画面 |
| 13 | 375px 目視（はみ出し・重なり） | **不合格** | モバイルメニュー展開時に nav 高さ48pxしか確保されずヒーローと重なり、タップで遷移不可 |

**不合格原因**: `.header` の `backdrop-filter` が fixed 子孫の包含ブロックを生成し、`.nav { position: fixed; inset: 64px 0 0 0 }` がヘッダー基準で解決されていた。

## 差し戻し修正（engineering-dept）
1. `Header.module.css`: `backdrop-filter` を除去、背景を不透明に。
2. `Header.tsx`: メニュー展開中は main / footer に `inert` を付与。
3. `Header.tsx`: 768px 以上へリサイズ時にメニューを閉じる（QA観測事項への対応。engineering-dept が Playwright で inert 解除・aria-expanded=false を確認済み。QA部による再検証は未実施）。

## 再検証（REQ-20260909-04-R1）

| 項目 | 判定 | 証拠要約 |
| --- | --- | --- |
| build / typecheck / lint | 合格 | exit 0、oxlint 0/0 |
| 320/375/414/767px メニュー展開 | 合格 | nav height 736、リンク16件すべて elementFromPoint=link、クリックで /service 遷移 |
| inert によるフォーカス封じ込め | 合格 | 展開中 main/footer inert=true、Tab 巡回が背後へ抜けない、閉じると解除 |
| 5幅×全ルート横スクロール | 合格 | 50/50 |
| 1280px ヘッダー | 合格 | sticky 維持、ナビ横並び、重なりなし |
| キーボード操作 / スキップリンク | 合格 | Enter/Space/Escape 動作、スキップリンクで main へフォーカス |

**最終判定: 完了条件 #1〜#11 すべて合格。差し戻し事項なし。**

## 未検証項目
- Webフォント（Shippori Mincho / Noto Sans JP）適用時の表示（サンドボックスで Google Fonts 遮断のためフォールバック書体で検証）。
- 実機（iOS Safari / Android Chrome）でのタッチ操作。
- 本番ホスティング環境での SPA フォールバック設定。

---

## v2 / v2.1（デザイン刷新）検証 — REQ-20260909-06 / -R1

### 初回（v2）
| 項目 | 判定 | 要約 |
| --- | --- | --- |
| build / typecheck / lint | 合格 | exit 0、oxlint 0/0 |
| 完了条件 #2〜#6, #8, #10 回帰 | 合格 | 文言・会社概要・リンク・meta すべて維持 |
| 6幅×10ルート横スクロール | 合格 | 60/60 |
| ヒーロー H1 の行内収まり | **不合格** | 320px で `.lineInner` 325px > 280px、「て」欠落 |
| ヒーローのリビール | **不合格（軽微）** | イラスト描画完了 1.65s（目標 1.5s） |
| ヘッダー（スクロール罫・モバイルメニュー・inert） | 合格 | 320〜767px でタップ遷移、Escape、inert 確認 |
| /service sticky レール | 合格 | aria-current 連動、フッターと重なりなし |
| コンソール | 合格 | fonts 遮断以外 0 |
| コントラスト（新配色） | 合格 | 最小 #a24c66 on #f6e8ec 4.70:1 |
| a11y（見出し階層・スキップ・aria-hidden・SVG role） | 合格 | — |
| /contact 回帰 | 合格 | — |
| 375/1280 目視 | **不合格** | 320px で「メニュー」が2行折返し |
| ローカル確認.cmd | 合格 | CRLF・UTF-8・分岐妥当 |

### 差し戻し修正（engineering-dept）
- `--text-display` の下限を 1.85rem へ（320px で 266px < 280px）。
- `.toggle { flex: none }` / `.toggleLabel { white-space: nowrap }`。
- 線画描画 0.9s、delay 0.1〜0.4s（最長 1.3s）。
- あわせて v2.1「パキッと」調整（2px インク罫、角型ボタン反転、Plate 図版、仕様行、.vscode）。

### 再検証（v2.1, -R1）— 全項目合格
| 項目 | 判定 | 要約 |
| --- | --- | --- |
| build / typecheck / lint | 合格 | 23 files、0 warnings |
| 横スクロール 60/60 | 合格 | 要素内 overflow 0 |
| H1 行内収まり | 合格 | 320: 239/280、768: 318/392 |
| ヘッダー 320px | 合格 | 「メニュー」1行、高さ 44px |
| リビール | 合格 | 最長 1.3s、reduced-motion で即時最終状態 |
| コンソール・画像404 | 合格 | `document.images` 空、/images へのリクエストなし |
| 完了条件回帰 | 合格 | Plate の aria-label が content.md の alt と一致 |
| コントラスト | 合格 | #141816 on #faf8f4 16.89:1、反転時も同値 |
| a11y | 合格 | dl の dt/dd 対応、序数 aria-hidden、SVG role=img |
| /service・/contact | 合格 | — |
| 目視 375/1280、仕様行 768px | 合格 | 3列1行 |
| .vscode/.editorconfig | 合格 | JSON/INI 妥当 |

QA 観測事項への対応（engineering-dept、QA 未再検証）: `public/images/README.md` → `docs/images.md` へ移動（dist/images に配信されない）、締め見出しに `text-wrap: balance`。

### 未検証項目
- Web フォント適用時の縦書きレール・見出しの見た目（サンドボックスで Google Fonts 遮断）。
- 実機（iOS Safari / Android Chrome）のタッチ操作、`ローカル確認.cmd` の Windows 実行。
- 写真設定時（images.ts に src を入れた状態）の表示。

---

## v3「Luminous」検証 — REQ-20260909-07 / -R1

### 初回（v3）
| 項目 | 判定 | 要約 |
| --- | --- | --- |
| build / typecheck / lint | 合格 | 0/0 |
| 7幅×10ルート横スクロール | 合格 | 70/70 |
| ヒーロー H1・分割カラム | 合格 | ≥1024 で2カラム |
| 画像（cosme / cosme-wide、サブパス配信） | 合格 | BASE_PATH ビルドで `/ideanova-renewal/images/...` |
| 完了条件回帰（DDE・関連企業なし、会社概要7項目） | 合格 | — |
| コントラスト | **不合格** | `--color-ink-muted` #6b726d が淡色面上で 4.03〜4.22 |
| a11y / リビール / コンソール / レール / フォーム | 合格 | — |
| 目視 | **不合格** | 768px /service 化粧水側の本文列が 168px（列反転の不備）、320/375 で「Fig. 03」折返し |

### 修正（engineering-dept）
- `--color-ink-muted` → #5c635f（紙 5.91 / 淡色面 ≥5.04）。
- 偶数セクションは列定義ごと反転（7fr/5fr）、レールの sticky 2カラムは ≥1024px。
- `.figNum { flex: none; white-space: nowrap }`。/contact の h1 英字（Contact / Thank you）。

### 再検証（-R1）— 全合格
本文列幅 768px 168→384px、`.figNum` 1行、描画色サンプリング最小 5.04:1、70/70 横スクロールなし、レール sticky・aria-current 回帰OK。

### 未検証項目
- Web フォント適用時の見た目（サンドボックス遮断）。実機タッチ。
- 画像の許諾書面（ユーザー申告のみ）。ideanova と株式会社エックスワンの関係表記（要確認）。
