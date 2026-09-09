import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages（https://<user>.github.io/<repo>/）へ配信する場合は
// 環境変数 BASE_PATH="/<repo>/" を指定してビルドする（.github/workflows/deploy.yml 参照）。
// ローカル開発・通常のビルドは "/" のまま。
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  plugins: [react()],
})
