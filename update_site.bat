@echo off
echo =====================================================
echo ワイサポ GitHub Pages アップデートスクリプト
echo =====================================================
echo.

echo [1/4] Git状態を確認中...
git status

echo.
echo [2/4] すべての変更をステージング中...
git add .

echo.
echo [3/4] コミット作成中...
git commit -m "Major update: GitHub Pages完全対応 - PWA機能追加、レスポンシブUI改善、Sommia AI統合強化、404エラーページ追加、Service Worker実装"

echo.
echo [4/4] GitHub Pagesにプッシュ中...
git push origin main

echo.
echo =====================================================
echo ✅ アップデート完了！
echo 🌐 サイトURL: https://y-dominus.github.io/wine-support-mockup/
echo ⏱️  反映まで1-10分程度お待ちください
echo =====================================================
echo.
pause