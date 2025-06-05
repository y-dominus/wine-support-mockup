// 共通パーツの管理
class CommonParts {
    constructor() {
        this.isGitHubPages = window.location.hostname.includes('github.io');
        this.basePath = this.isGitHubPages ? this.getBasePath() : '';
    }

    getBasePath() {
        const pathParts = window.location.pathname.split('/');
        return pathParts.length > 2 ? '/' + pathParts[1] : '';
    }

    // ヘッダーHTMLを生成
    generateHeader() {
        return `
        <header class="main-header">
            <div class="container">
                <div class="header-content">
                    <div class="logo-section">
                        <img src="${this.getImagePath('assets/images/winesupport_logo.png')}" alt="ワイサポ" class="logo" onerror="this.style.display='none'">
                        <span class="logo-text">ワイサポ</span>
                    </div>
                    <nav class="main-nav">
                        <a href="${this.getPagePath('dashboard.html')}" class="nav-link">
                            <span class="nav-icon">📊</span>
                            ダッシュボード
                        </a>
                        <a href="${this.getPagePath('my_cellar/my_cellar.html')}" class="nav-link">
                            <span class="nav-icon">🍷</span>
                            マイセラー
                        </a>
                        <a href="${this.getPagePath('products/product_list.html')}" class="nav-link">
                            <span class="nav-icon">📦</span>
                            商品リスト
                        </a>
                        <a href="${this.getPagePath('orders/order_history.html')}" class="nav-link">
                            <span class="nav-icon">📋</span>
                            注文履歴
                        </a>
                        <a href="${this.getPagePath('reports/sales_history.html')}" class="nav-link">
                            <span class="nav-icon">📈</span>
                            レポート
                        </a>
                    </nav>
                    <div class="user-section">
                        <button class="notification-btn" onclick="toggleNotifications()">
                            <span class="notification-icon">🔔</span>
                            <span class="notification-badge">3</span>
                        </button>
                        <div class="user-menu">
                            <img src="${this.getImagePath('sommia.png')}" alt="ユーザー" class="user-avatar" onerror="this.style.display='none'">
                            <div class="user-dropdown">
                                <a href="${this.getPagePath('account/mypage.html')}">マイページ</a>
                                <a href="${this.getPagePath('account/account_settings.html')}">設定</a>
                                <a href="${this.getPagePath('../index.html')}">ログアウト</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <style>
        .main-header {
            background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
            border-bottom: 1px solid #e2e8f0;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            position: sticky;
            top: 0;
            z-index: 100;
        }
        
        .header-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1rem 0;
            gap: 2rem;
        }
        
        .logo-section {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        
        .logo {
            height: 40px;
            width: auto;
        }
        
        .logo-text {
            font-size: 1.5rem;
            font-weight: 700;
            background: linear-gradient(135deg, #FF4D00, #884591);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .main-nav {
            display: flex;
            gap: 0.5rem;
        }
        
        .nav-link {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.75rem 1rem;
            color: #4b5563;
            text-decoration: none;
            border-radius: 8px;
            transition: all 0.2s ease;
            font-weight: 500;
        }
        
        .nav-link:hover, .nav-link.active {
            background: #f3f4f6;
            color: #FF4D00;
        }
        
        .nav-icon {
            font-size: 1.1rem;
        }
        
        .user-section {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .notification-btn {
            position: relative;
            background: none;
            border: none;
            padding: 0.5rem;
            border-radius: 50%;
            cursor: pointer;
            transition: background-color 0.2s ease;
        }
        
        .notification-btn:hover {
            background: #f3f4f6;
        }
        
        .notification-icon {
            font-size: 1.2rem;
        }
        
        .notification-badge {
            position: absolute;
            top: 0;
            right: 0;
            background: #ef4444;
            color: white;
            font-size: 0.75rem;
            padding: 0.25rem 0.5rem;
            border-radius: 50px;
            min-width: 1.2rem;
            text-align: center;
        }
        
        .user-menu {
            position: relative;
        }
        
        .user-avatar {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            cursor: pointer;
            border: 2px solid #e2e8f0;
        }
        
        .user-dropdown {
            position: absolute;
            top: 100%;
            right: 0;
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            padding: 0.5rem 0;
            min-width: 150px;
            display: none;
        }
        
        .user-menu:hover .user-dropdown {
            display: block;
        }
        
        .user-dropdown a {
            display: block;
            padding: 0.75rem 1rem;
            color: #4b5563;
            text-decoration: none;
            transition: background-color 0.2s ease;
        }
        
        .user-dropdown a:hover {
            background: #f3f4f6;
        }
        
        @media (max-width: 768px) {
            .header-content {
                flex-direction: column;
                gap: 1rem;
            }
            
            .main-nav {
                flex-wrap: wrap;
                justify-content: center;
            }
            
            .nav-link {
                padding: 0.5rem 0.75rem;
                font-size: 0.9rem;
            }
        }
        </style>
        `;
    }

    // フッターHTMLを生成
    generateFooter() {
        return `
        <footer class="main-footer">
            <div class="container">
                <div class="footer-content">
                    <div class="footer-section">
                        <h3>ワイサポ</h3>
                        <p>ワイン畑の妖精Sommiaがサポートする<br>ワインマネジメントシステム</p>
                    </div>
                    <div class="footer-section">
                        <h4>機能</h4>
                        <ul>
                            <li><a href="${this.getPagePath('my_cellar/my_cellar.html')}">在庫管理</a></li>
                            <li><a href="${this.getPagePath('products/product_list.html')}">商品検索</a></li>
                            <li><a href="${this.getPagePath('wine_optimization.html')}">AI最適化</a></li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h4>サポート</h4>
                        <ul>
                            <li><a href="#" onclick="alert('モックアップ版のため実装されていません')">ヘルプ</a></li>
                            <li><a href="#" onclick="alert('モックアップ版のため実装されていません')">お問い合わせ</a></li>
                            <li><a href="${this.getGitHubUrl()}" target="_blank">GitHub</a></li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h4>Sommia AI</h4>
                        <div class="sommia-footer">
                            <img src="${this.getImagePath('sommia.png')}" alt="Sommia" class="sommia-avatar-footer" onerror="this.style.display='none'">
                            <p>24時間あなたのワイン業務をサポートします</p>
                        </div>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; 2024 ワイサポ (Wine Support System) - モックアップ版</p>
                    ${this.isGitHubPages ? '<p class="demo-notice">🚧 これはGitHub Pagesで公開されているデモ版です</p>' : ''}
                </div>
            </div>
        </footer>
        <style>
        .main-footer {
            background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
            color: white;
            margin-top: 4rem;
        }
        
        .footer-content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            padding: 3rem 0 2rem;
        }
        
        .footer-section h3 {
            background: linear-gradient(135deg, #FF4D00, #884591);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-size: 1.5rem;
            margin-bottom: 1rem;
        }
        
        .footer-section h4 {
            color: #f3f4f6;
            margin-bottom: 1rem;
            font-size: 1.1rem;
        }
        
        .footer-section p {
            color: #d1d5db;
            line-height: 1.6;
        }
        
        .footer-section ul {
            list-style: none;
            padding: 0;
        }
        
        .footer-section li {
            margin-bottom: 0.5rem;
        }
        
        .footer-section a {
            color: #d1d5db;
            text-decoration: none;
            transition: color 0.2s ease;
        }
        
        .footer-section a:hover {
            color: #FF4D00;
        }
        
        .sommia-footer {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .sommia-avatar-footer {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            border: 2px solid #FF4D00;
        }
        
        .footer-bottom {
            border-top: 1px solid #4b5563;
            padding: 2rem 0;
            text-align: center;
            color: #9ca3af;
        }
        
        .demo-notice {
            color: #fbbf24;
            font-weight: 500;
            margin-top: 0.5rem;
        }
        
        @media (max-width: 768px) {
            .footer-content {
                grid-template-columns: 1fr;
                gap: 1.5rem;
            }
            
            .sommia-footer {
                flex-direction: column;
                text-align: center;
            }
        }
        </style>
        `;
    }

    // パスヘルパー関数
    getImagePath(imagePath) {
        const currentPath = window.location.pathname;
        const isInSubfolder = currentPath.includes('/html/');
        
        if (isInSubfolder) {
            return '../' + imagePath;
        }
        return './' + imagePath;
    }

    getPagePath(pagePath) {
        const currentPath = window.location.pathname;
        const isInSubfolder = currentPath.includes('/html/');
        
        if (isInSubfolder) {
            // すでにhtmlフォルダ内にいる場合
            if (pagePath.startsWith('../')) {
                return pagePath;
            }
            return './' + pagePath;
        }
        // ルートにいる場合
        return './html/' + pagePath;
    }

    getGitHubUrl() {
        if (this.isGitHubPages) {
            const pathParts = window.location.pathname.split('/');
            const repoName = pathParts[1] || 'wine-support-mockup';
            const username = window.location.hostname.split('.')[0];
            return `https://github.com/${username}/${repoName}`;
        }
        return 'https://github.com/your-username/wine-support-mockup';
    }

    // ヘッダーとフッターを挿入
    init() {
        // ヘッダーの挿入
        const headerPlaceholder = document.getElementById('header-placeholder');
        if (headerPlaceholder) {
            headerPlaceholder.innerHTML = this.generateHeader();
            this.setActiveNavLink();
        }

        // フッターの挿入
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (footerPlaceholder) {
            footerPlaceholder.innerHTML = this.generateFooter();
        }

        // その他の初期化
        this.setupEventListeners();
    }

    // アクティブなナビゲーションリンクを設定
    setActiveNavLink() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            if (link.href && currentPath.includes(link.getAttribute('href'))) {
                link.classList.add('active');
            }
        });
    }

    // イベントリスナーの設定
    setupEventListeners() {
        // 通知ボタンの処理
        window.toggleNotifications = () => {
            alert('通知機能はモックアップ版のため実装されていません');
        };

        // エラーハンドリング
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[href="#"]')) {
                e.preventDefault();
                alert('この機能はモックアップ版のため実装されていません');
            }
        });
    }
}

// DOM読み込み完了後に初期化
document.addEventListener('DOMContentLoaded', () => {
    const commonParts = new CommonParts();
    commonParts.init();
});

// グローバルに利用可能にする
window.CommonParts = CommonParts;