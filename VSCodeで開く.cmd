@echo off
cd /d "%~dp0"
where code >/dev/null 2>nul
if errorlevel 1 (
  echo VS Code の code コマンドが見つかりません。VS Code で「フォルダーを開く」からこのフォルダを選択してください。
  pause
  exit /b 1
)
start "" code "%~dp0"
