# 🚀 GitHub Pages デプロイメントガイド

## 概要
このガイドでは、ワイサポ（Wine Support System）モックアップをGitHub Pagesで公開する手順を説明します。

## 📋 前提条件
- GitHubアカウントを持っていること
- Git がローカル環境にインストールされていること
- 基本的なGitコマンドの知識があること

## 🔧 デプロイ手順

### 1. GitHubリポジトリの作成

1. [GitHub](https://github.com) にログイン
2. 「New repository」をクリック
3. リポジトリ名を入力（例：`wine-support-mockup`）
4. 「Public」を選択（GitHub Pages は無料版では公開リポジトリのみ）
5. 「Create repository」をクリック

### 2. ローカルファイルをリポジトリにプッシュ

```bash
# プロジェクトフォルダに移動
cd /path/to/250522_wine-support_mockup

# Gitリポジトリを初期化
git init

# すべてのファイルをステージング
git add .

# 初回コミット
git commit -m "Initial commit: ワイサポ モックアップ版"

# リモートリポジトリを追加（YOUR_USERNAMEを実際のユーザー名に置換）
git remote add origin https://github.com/YOUR_USERNAME/wine-support-mockup.git

# メインブランチにプッシュ
git branch -M main
git push -u origin main
```

### 3. GitHub Pages の設定

1. GitHubリポジトリページで「Settings」タブをクリック
2. 左サイドバーの「Pages」をクリック
3. 「Source」セクションで「Deploy from a branch」を選択
4. 「Branch」で「main」を選択
5. フォルダは「/ (root)」を選択
6. 「Save」をクリック

### 4. 公開URLの確認

数分後に以下のURLでアクセス可能になります：
```
https://YOUR_USERNAME.github.io/wine-support-mockup/
```

## 🛠 カスタマイズ

### リポジトリ名の変更
リポジトリ名を変更する場合は、以下のファイルも更新してください：

1. `README.md` - URLの例を更新
2. `index.html` - GitHub Pages バナーのリンクを更新
3. `js/common_parts.js` - GitHubリンクの生成ロジックを更新

### カスタムドメインの設定（オプション）

独自ドメインを使用する場合：

1. リポジトリのルートに `CNAME` ファイルを作成
2. ファイル内にドメイン名を記載（例：`wine-support.example.com`）
3. DNSレコードでCNAMEを設定

## ⚙️ 設定ファイルの説明

### `_config.yml`
Jekyll（GitHub Pagesの静的サイトジェネレータ）の設定ファイル

### `manifest.json`
PWA（Progressive Web App）として機能するためのマニフェストファイル

### `sw.js`
Service Worker - オフライン機能とキャッシュ管理

### `.gitignore`
Gitで追跡しないファイルの指定

## 📊 アクセス解析の設定（オプション）

Google Analytics を追加する場合：

1. Google Analytics でプロパティを作成
2. 測定IDを取得
3. 全HTMLファイルの`<head>`内に以下を追加：

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🔄 更新手順

コードを更新する場合：

```bash
# 変更をステージング
git add .

# コミット
git commit -m "Update: 機能追加・修正内容の説明"

# プッシュ
git push origin main
```

GitHub Pages は自動的に更新されます（通常1-5分以内）。

## 🚨 トラブルシューティング

### ページが表示されない
1. GitHub Pages の設定を確認
2. リポジトリが公開設定になっているか確認
3. `index.html` がルートにあるか確認

### 画像が表示されない
1. ファイルパスが正しいか確認
2. ファイル名の大文字小文字が一致しているか確認
3. ファイルがリポジトリにプッシュされているか確認

### CSSが適用されない
1. CSSファイルのパスが正しいか確認
2. CSSファイルがリポジトリにプッシュされているか確認
3. ブラウザのキャッシュをクリア

### JavaScriptエラー
1. ブラウザの開発者ツールでエラーを確認
2. JSファイルのパスが正しいか確認
3. 外部ライブラリ（Chart.js等）が正しく読み込まれているか確認

## 🔗 参考リンク

- [GitHub Pages 公式ドキュメント](https://docs.github.com/en/pages)
- [Jekyll 公式サイト](https://jekyllrb.com/)
- [PWA 開発ガイド](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)

## 📞 サポート

問題が発生した場合は、以下の方法でサポートを受けられます：

1. **GitHubのIssues**: リポジトリでIssueを作成
2. **コミュニティ**: GitHub Discussions を利用
3. **ドキュメント**: このREADMEと公式ドキュメントを参照

---

## 🎉 デモサイト例

実際に公開されたデモサイトの例：
- https://your-username.github.io/wine-support-mockup/

## 📝 注意事項

- これはモックアップ版です
- データの永続化や実際のAPI連携は実装されていません
- 商用利用前には適切なバックエンド開発が必要です
- セキュリティ対策の実装が必要です

---

**🍷 素晴らしいワインマネジメント体験をお楽しみください！**