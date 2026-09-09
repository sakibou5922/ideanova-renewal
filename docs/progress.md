# 進捗記録 — REQ-20260909-01（ideanova.jp リニューアル）

## 1. 現在目標
- 目標(1文): ideanova.jp を「農業支援事業」と「化粧水事業」の2本柱サイトとして、Vite + React + TypeScript + CSS Modules で再構築する。
- 対象案件フォルダ: `C:\Users\panda\Downloads\web\web-agency-claude\projects\ideanova-renewal`（新規作成）
- 希望公開日 / 期限: 要確認

## 2. 完了条件チェックリスト
| # | 完了条件(判定可能な形で) | 状態 | 証拠・備考 |
| --- | --- | --- | --- |
| 1 | `npm run build`、`npm run typecheck`、`npm run lint` がエラー0で完了する | 合格 | docs/qa-report.md |
| 2 | ナビ・フッター・事業一覧から「キャッシュレス」「廃校再利用」「WFCサポート」の文言・リンクが消えている | 合格 | docs/qa-report.md |
| 3 | 事業内容が「農業支援事業」「化粧水事業」の2つのみで構成され、それぞれ専用セクション（/service#agriculture, /service#cosmetics）がある | 合格 | docs/qa-report.md |
| 4 | 現行サイトの農業支援事業の本文（サブタイトル＋3段落＋WFCストアURL）が原文どおり移植されている | 合格 | docs/qa-report.md |
| 5 | 会社概要の会社名・代表・設立・所在地・TEL・FAX が現行と一致し（関連企業はユーザー指示で削除）、事業内容が「農業支援事業、化粧水事業」になっている | 合格 | docs/qa-report.md |
| 6 | 化粧水事業の未確定情報はすべて `[要確認]` 表記で、創作した数値・実績がない | 合格 | docs/qa-report.md |
| 7 | 375px / 768px / 1280px 幅で横スクロールが発生しない（document.scrollWidth <= innerWidth） | 合格 | docs/qa-report.md |
| 8 | 全内部リンクが存在するルートに解決し、404がない | 合格 | docs/qa-report.md |
| 9 | ブラウザコンソールにエラーが出ない | 合格 | docs/qa-report.md |
| 10 | 各ページに固有の `<title>` と meta description が設定される | 合格 | docs/qa-report.md |
| 11 | 主要テキストのコントラスト比が WCAG AA（4.5:1）以上、キーボードでナビ操作可能 | 合格 | docs/qa-report.md |

## 3. スコープ
- 変更してよい範囲: 新規プロジェクト `projects/ideanova-renewal` 配下すべて
- 変更してはいけない範囲: `web-agency-claude` 直下の運用ファイル（CLAUDE.md, AGENTS.md, .claude/ 等）、現行 ideanova.jp 本番環境
- 指定文言(変更禁止): 社名「株式会社ideanova」、代表「荒木 裕子」、設立「2019年8月30日」、所在地「〒963-8061 福島県郡山市富久山町福原字陣場176番地2」、TEL「024-905-2746」、FAX「024-905-2107」、農業支援事業の本文、WFCストアURL「https://wfca-p.com/」
- 既知の制約: 現行サイトの画像はWordPressテーマ内の素材で権利が未確認のため再利用しない（プレースホルダー画像で代替）。お問い合わせフォームは送信先未確定のためフロント側の検証のみ実装し送信はダミー。
- 未確定事項(要確認): 化粧水事業のブランド名・商品名・特徴・価格・販売チャネル／新着情報の運用方法（CMS要否）／フォーム送信先／ホスティング先／ドメイン切替時期／ロゴデータ／代表挨拶文の更新有無

## 4. 正式なコマンド(案件から確認したもの)
| 用途 | コマンド | 出典 |
| --- | --- | --- |
| build | `npm run build` | package.json |
| lint | `npm run lint` | package.json |
| typecheck | `npm run typecheck` | package.json |
| dev | `npm run dev` | package.json |
| preview | `npm run preview` | package.json |

## 5. 編集所有権
| ファイル / 領域 | 所有者(部署) | 状態 | 引き継ぎメモ |
| --- | --- | --- | --- |
| `src/**`, `index.html`, 設定ファイル | engineering-dept | 完了 | 差し戻し1件（ヘッダー）修正済み |
| `docs/design-spec.md` | design-dept | 完了 | 実装の正 |
| `docs/content.md` | content-production-dept | 完了 | 原稿の正 |
| `docs/progress.md`, `docs/qa-report.md` | direction-dept / qa-review-dept | 更新中 | QAはファイル編集しない（報告のみ） |

## 6. ハンドオフ台帳
| 依頼ID | 依頼先 | 依頼内容(要約) | 状態 | 成果物の場所 |
| --- | --- | --- | --- | --- |
| REQ-20260909-01 | design-dept | 2事業構成のデザイントークン・ページ構成 | 完了 | docs/design-spec.md |
| REQ-20260909-02 | content-production-dept | 全ページ原稿・メタ・alt（化粧水は要確認） | 完了 | docs/content.md |
| REQ-20260909-03 | engineering-dept | Vite+React+TS+CSS Modules 実装 | 完了 | src/ |
| REQ-20260909-04 | qa-review-dept | 完了条件1〜11の独立検証 | 完了（-R1 で全合格） | docs/qa-report.md |

## 7. 検証結果ログ
| 日時 | 検証項目 | 担当 | 結果 | 証拠・理由 |
| --- | --- | --- | --- | --- |
| 2026-09-09 | build / typecheck / lint | engineering-dept | 合格 | exit 0、oxlint 0/0 |
| 2026-09-09 | 完了条件 #1〜#12 | qa-review-dept | 合格 | docs/qa-report.md 初回 |
| 2026-09-09 | 375px 目視（メニュー重なり） | qa-review-dept | 不合格 | backdrop-filter による fixed 包含ブロック |
| 2026-09-09 | 再検証（メニュー・inert・横スクロール・ヘッダー・キーボード） | qa-review-dept | 合格 | docs/qa-report.md R1 |
| 2026-09-09 | 768px以上へのリサイズでメニュー閉鎖 | engineering-dept | 合格（QA未実施） | Playwright で aria-expanded=false / inert=false を確認 |
| 2026-09-09 | v2 デザイン刷新（REQ-20260909-06） | qa-review-dept | 不合格2件（320px H1 欠落・「メニュー」折返し）＋軽微1件 | docs/qa-report.md |
| 2026-09-09 | v2.1 再検証（-R1） | qa-review-dept | 全合格 | docs/qa-report.md |
| 2026-09-09 | v3 Luminous（REQ-20260909-07） | qa-review-dept | 不合格2件（muted コントラスト・768px 列反転）＋軽微1件 | docs/qa-report.md |
| 2026-09-09 | v3 再検証（-R1） | qa-review-dept | 全合格 | docs/qa-report.md |

## 8. 失敗履歴
| 検証項目 | 失敗回数 | 試した修正 | 結果 | 次の方針 |
| --- | --- | --- | --- | --- |
| モバイルメニュー展開（375px 目視） | 1 | `.header` の `backdrop-filter` 除去＋ `inert` 付与 | 合格 | — |
| 320px H1 行内収まり | 1 | `--text-display` 下限 1.85rem | 合格 | — |
| 320px「メニュー」折返し | 1 | `flex: none` + `white-space: nowrap` | 合格 | — |
| 淡色面上の muted 文字コントラスト | 1 | `--color-ink-muted` #5c635f | 合格 | — |
| 768px /service 偶数セクションの列幅 | 1 | 列定義ごと反転、レール2カラムは ≥1024px | 合格 | — |

## 9. ユーザー判断待ち
| 事項 | 提示した選択肢 | 状態 |
| --- | --- | --- |
| 技術構成 | Vite+React+TS+CSS Modules | 決定 |
| 化粧水情報 | 後で提供（プレースホルダー） | 決定 |
| WFC/キャッシュレス/廃校 | 全削除 | 決定 |

## 10. 次の処理
- [x] engineering-dept 実装
- [x] qa-review-dept 検証
- [x] 納品（projects/ideanova-renewal）
- [ ] 化粧水事業の原稿受領 → src/data/pillars.ts 反映 → 再検証
- [x] 化粧水写真（株式会社エックスワン提供）を導入。許諾書面の保管と関係表記は要確認
- [ ] 農業支援・ヒーローの写真受領（docs/images.md の仕様）→ images.ts 設定 → 再検証
- [ ] 旧コンポーネント SectionHead / PillarCard のファイル削除（ユーザー承認待ち）
- [ ] 代表挨拶・ミッション文の改稿承認
- [ ] フォーム送信先の接続
