@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ==============================================
echo  ideanova リニューアルサイト ローカル確認
echo ==============================================
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js が見つかりません。https://nodejs.org/ から LTS 版をインストールしてから再実行してください。
  pause
  exit /b 1
)
if not exist node_modules (
  echo 初回のみ依存パッケージをインストールします（1〜2分）...
  call npm install
  if errorlevel 1 (
    echo npm install に失敗しました。ネットワーク設定をご確認ください。
    pause
    exit /b 1
  )
)
echo 開発サーバーを起動します。ブラウザが自動で開きます。
echo 終了するには、このウィンドウで Ctrl+C を押してください。
call npm run dev -- --open --port 5173
pause
