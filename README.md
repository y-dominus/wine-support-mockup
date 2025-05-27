# ワイサポ（Wine Support）モックアップ実装概要

## 1. 実装済みのファイル・ページ

### 1.1 共通要素とスタイル
- `index.html` - ルートページ（Sommiaのウェルカムページ）
- 共通CSS
  - `css/style.css` - 基本スタイル定義
  - `css/layout.css` - レイアウト定義
  - `css/components/buttons.css` - ボタンスタイル
  - `css/components/ai_chat.css` - AIチャットスタイル
  - `css/components/cards.css` - カードスタイル
  - `css/components/forms.css` - フォームスタイル
  - `css/components/tables.css` - テーブルスタイル
  - `css/components/modals.css` - モーダルスタイル
- 共通JavaScript
  - `js/main.js` - 全ページ共通初期化処理
  - `js/common_parts.js` - 共通ヘッダー・フッターの定義と挿入
  - `js/ai_simulator.js` - Sommiaの振る舞いをシミュレート
  - `js/utils.js` - ユーティリティ関数

### 1.2 オンボーディングフロー
- `html/onboarding/0_welcome_ai.html` - ウェルカムページ
- `html/onboarding/1_store_info_form.html` - 店舗情報入力
- `html/onboarding/2_menu_info_form.html` - メニュー情報入力
- `html/onboarding/3_initial_proposal.html` - 初回ワイン提案
- `html/onboarding/4_signup_form.html` - アカウント登録
- `html/onboarding/5_initial_order_confirmation.html` - 登録完了・初回注文確認
- `css/pages/onboarding.css` - オンボーディング用スタイル
- `js/page_specific/onboarding_flow.js` - オンボーディングフロー用JavaScript

### 1.3 ダッシュボード
- `html/dashboard.html` - メインダッシュボード
- `css/pages/dashboard.css` - ダッシュボード用スタイル
- `js/page_specific/dashboard_actions.js` - ダッシュボード用JavaScript

### 1.4 マイセラー（在庫管理）
- `html/my_cellar/my_cellar.html` - 在庫一覧
- `html/my_cellar/sales_input.html` - 売上入力
- `css/pages/my_cellar.css` - マイセラー用スタイル
- `js/page_specific/my_cellar_interactions.js` - マイセラー用JavaScript（実装予定）

## 2. 未実装の主要ページ

### 2.1 商品（ワイン）管理
- `html/products/product_list.html` - 商品一覧
- `html/products/product_detail_example.html` - 商品詳細

### 2.2 発注管理
- `html/orders/replenish_order.html` - 補充発注
- `html/orders/order_history.html` - 発注履歴

### 2.3 レポート
- `html/reports/sales_report.html` - 売上レポート

### 2.4 アカウント設定
- `html/account/account_settings.html` - アカウント設定

## 3. 主要な機能と実装ポイント

### 3.1 Sommia（ソムリエAI）のインタラクション
- `js/ai_simulator.js` にSommiaのセリフデータとメッセージ表示ロジックを実装
- ページごとに適切なAIメッセージを表示
- チャットインターフェースでの対話シミュレーション
- 提案チップ機能によるガイド付きインタラクション
- AIプロンプトボックスでのアドバイス表示

### 3.2 オンボーディングフロー
- 6ステップのフロー（ウェルカム→店舗情報→メニュー情報→ワイン提案→アカウント登録→完了）
- プログレスバーによる進行状況の視覚化
- 入力データの一時保存と復元（localStorage使用）
- ワイン提案の選択と保存

### 3.3 ダッシュボード
- KPI概要（今月の売上、売れたボトル数、在庫アラート、回転率）
- 売上トレンドグラフ（Chart.js使用）
- 人気ワインランキング
- 在庫アラートセクション
- Sommiaからのお知らせ・提案

### 3.4 マイセラー（在庫管理）
- 在庫一覧表示と絞り込み機能
- 在庫ステータス表示（在庫あり、在庫少、要補充）
- 売上入力機能
- 補充発注への連携

## 4. UIコンポーネント一覧

### 4.1 共通コンポーネント
- ヘッダー（ロゴ、ナビゲーション）
- フッター（コピーライト、リンク）
- AIメッセージエリア
- AIチャットバブル
- ボタン（プライマリ、セカンダリ、アウトライン）
- カード
- モーダルダイアログ

### 4.2 フォームコンポーネント
- テキスト入力
- セレクトボックス
- ラジオボタン
- チェックボックス
- テキストエリア
- 日付入力
- 数値入力
- フォームグループ
- バリデーションメッセージ

### 4.3 データ表示コンポーネント
- テーブル
- ランキングリスト
- アラートリスト
- KPIカード
- チャート
- ページネーション

## 5. モバイル対応

- レスポンシブデザインの実装
- ブレイクポイント設定（768px, 1200px）
- モバイルでの表示最適化
  - グリッドレイアウトの調整
  - テーブルのスクロール対応
  - フォーム要素の全幅表示
  - ボタン配置の調整

## 6. 今後の拡張予定

### 6.1 未実装ページの作成
- 商品一覧・詳細ページ
- 発注管理ページ
- レポートページ
- アカウント設定ページ

### 6.2 機能拡張
- 商品検索・フィルタリング機能の強化
- ワイン詳細情報の拡充（料理とのペアリング、テイスティングノートなど）
- AIチャットの応答パターン拡充
- 売上データの可視化強化

### 6.3 インタラクション改善
- アニメーション・トランジションの追加
- ドラッグ＆ドロップ機能
- リアルタイム更新
- インラインフィードバック

## 7. 実装メモ

### 7.1 ファイル構造について
- ページごとに対応するHTML、CSS、JSファイルを用意
- コンポーネント別にCSSファイルを分割し、再利用性を高める
- 共通処理とページ固有処理を分離

### 7.2 Sommia（AI）の実装について
- メッセージの動的表示はローカルのJSで処理
- 実際のサービスでは、バックエンドAPIとの連携が必要
- ページごとの適切なAIセリフはコンテキスト管理が重要

### 7.3 データの扱いについて
- モックアップでは固定データまたはlocalStorageを使用
- 実サービスではデータベース連携が必要
- ユーザーアカウント、ワイン情報、在庫、注文、売上などの管理システム構築が必要

### 7.4 画像・アセットについて
- AIアバター画像（sommia.png）がルートディレクトリに必要
- その他の画像素材（ロゴ、アイコン、ワイン画像など）は `assets/images/` に配置予定
- フォントファイルは `assets/fonts/` に配置予定（NotoSansJP）

## 8. 動作確認方法

1. インデックスページ（`index.html`）をブラウザで開く
2. 「利用開始」ボタンをクリックしてオンボーディングを開始
3. 各ステップを順に進み、データを入力して機能を確認
4. ダッシュボードからマイセラーなどの各機能にアクセス
5. Sommiaとのインタラクションを試す（チャット、提案など）

※注：画像ファイル（sommia.png）がルートディレクトリに配置されていない場合、表示されません。