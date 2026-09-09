# ideanova.jp リニューアル（農業支援事業・化粧水事業）

Vite + React 19 + TypeScript + CSS Modules で構築した株式会社ideanova コーポレートサイトのリニューアル版です。

## VS Code で開く

フォルダを VS Code で開くと、推奨拡張（oxlint / CSS Modules）の案内が出ます。`Ctrl+Shift+B` で build、「実行とデバッグ」の「Vite dev server を Edge/Chrome で開く」で dev サーバーとブラウザが起動します（ターミナルからは `npm run dev`）。

## ローカルで確認する（Windows）

1. Node.js（LTS 版）がインストールされていることを確認します。未導入の場合は https://nodejs.org/ から入手してください。
2. このフォルダ内の **`ローカル確認.cmd`** をダブルクリックします。
   - 初回だけ `npm install` が自動で走ります（1〜2分）。
   - 開発サーバーが起動し、ブラウザで `http://localhost:5173/` が自動的に開きます。
3. 終了するときは、開いた黒いウィンドウで `Ctrl + C` を押します。

コマンドで実行する場合:

```bash
npm install
npm run dev        # 開発サーバー（http://localhost:5173/）
npm run build      # 本番ビルド → dist/
npm run preview    # dist/ をローカル配信（http://localhost:4173/）
npm run typecheck  # 型チェック
npm run lint       # oxlint
```

## 構成

```
src/
  data/        サイト情報・事業・新着情報（原稿の差し替えはここ）
  components/  Header / Footer / Button / Art（線画SVG）/ Pending
  pages/       Home / Service / Company / News / Contact / Privacy / NotFound
  styles/      tokens.css（デザイントークン）
  lib/         useDocumentMeta（title/description）・ScrollManager
docs/
  progress.md     進捗記録（完了条件・検証ログ）
  design-spec.md  デザイン仕様書 v2 / v2.1
  content.md      完成原稿（事実 / 提案 / 要確認 の区別つき）
  images.md       画像仕様書・AI生成プロンプト・現行画像の流用条件
  qa-report.md    QA検証レポート
.vscode/          VS Code 推奨拡張・タスク（npm: dev/build/typecheck/lint）・デバッグ起動
```

## 原稿・素材の差し替え

- 化粧水事業: `src/data/pillars.ts` の `cosme` エントリの `lead` / `subtitle` / `paragraphs` を埋め、`pending` を削除する。
- 写真: `public/images/` に置き、`src/data/images.ts` の `src` を設定するとトップ・事業内容の図版が写真に切り替わる（未設定時は線画プレート）。サイズ・被写体・AI生成プロンプト・現行画像の流用条件は `docs/images.md`。線画（`src/components/Art.tsx`）は当社制作のオリジナル。
- 新着情報: `src/data/news.ts` に追加（新しい順）。`date` 確定後に `pending` を外す。
- 会社情報: `src/data/site.ts`。

## デプロイ時の注意

- SPA のため、静的ホスティングでは全パスを `index.html` へフォールバックする設定が必要（旧 URL `/staret-hp/` は `/news/staret-hp` へアプリ内リダイレクト）。
- Web フォント（Google Fonts: Shippori Mincho / Noto Sans JP）は `index.html` で読み込み。自己ホストへ切り替える場合は `tokens.css` の `--font-*` と合わせて変更。
- お問い合わせフォームは送信処理が未接続（`src/pages/Contact.tsx` の `onSubmit`）。本番前に送信先を接続すること。
