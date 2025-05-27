/**
 * 共通パーツ（ヘッダー・フッター）の定義とDOM挿入
 */

// ページ読み込み時に実行
document.addEventListener('DOMContentLoaded', function() {
    // ヘッダーとフッターを挿入
    insertHeader();
    insertFooter();
    
    // 通知スタイルシートの追加
    if (!document.querySelector('link[href*="notifications.css"]')) {
        const notificationsStyle = document.createElement('link');
        notificationsStyle.rel = 'stylesheet';
        notificationsStyle.href = calculateRelativePath() + 'css/components/notifications.css';
        document.head.appendChild(notificationsStyle);
    }
    
    // ログアウトトーストメッセージのチェック
    checkLogoutToast();
});

/**
 * ヘッダーをDOMに挿入
 */
function insertHeader() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (!headerPlaceholder) return;
    
    // 現在のページに対する相対パスを計算
    const relativePath = calculateRelativePath();
    
    // ヘッダーHTMLの構築
    const headerHTML = `
        <header>
            <div class="container header-container">
                <div class="logo-container">
                    <a href="${relativePath}html/dashboard.html">
                    <img src="${relativePath}assets/images/winesupport_logo.png" alt="ワイサポ" class="logo">
                    </a>
                </div>
                <nav>
                    <div class="main-nav-container">
                        <!-- テキストナビゲーション -->
                        <ul class="main-nav">
                            <li class="nav-item">
                                <a href="${relativePath}html/dashboard.html" class="nav-link nav-button">トップ</a>
                            </li>
                            <li class="nav-divider"></li>
                            <li class="nav-item">
                                <a href="${relativePath}html/my_cellar/my_cellar.html" class="nav-link nav-button">マイセラー</a>
                            </li>
                            <li class="nav-item">
                                <a href="${relativePath}html/products/product_list.html" class="nav-link nav-button">商品一覧</a>
                            </li>
                            <li class="nav-divider"></li>
                            <li class="nav-item">
                                <a href="${relativePath}html/account/mypage.html" class="nav-link nav-button">マイページ</a>
                            </li>
                            <li class="nav-item">
                                <a href="${relativePath}html/account/login.html" class="nav-link logout-button" onclick="showLogoutToast(event)">ログアウト</a>
                            </li>
                        </ul>
                        
                        <!-- アイコンナビゲーション -->
                        <ul class="icon-nav">
                            <li class="icon-nav-item">
                                <a href="${relativePath}html/notifications.html" class="icon-nav-link notification-link" title="お知らせ">
                                    <span class="icon-badge">3</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-bell"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                                </a>
                            </li>
                            <li class="icon-nav-item">
                                <a href="${relativePath}html/cart.html" class="icon-nav-link" title="カート">
                                    <span class="icon-badge">2</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-cart"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                                </a>
                            </li>
                            <li class="icon-nav-item">
                                <a href="${relativePath}html/products/product_list.html" class="icon-nav-link" title="検索">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    `;
    
    // ヘッダーをDOMに挿入
    headerPlaceholder.outerHTML = headerHTML;
}

/**
 * フッターをDOMに挿入
 */
function insertFooter() {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (!footerPlaceholder) return;
    
    // 現在のページに対する相対パスを計算
    const relativePath = calculateRelativePath();
    
    // フッターHTMLの構築
    const footerHTML = `
        <footer>
            <div class="container footer-container">
                <div class="footer-links">
                    <a href="#" class="footer-link">利用規約</a>
                    <a href="#" class="footer-link">プライバシーポリシー</a>
                    <a href="#" class="footer-link">ヘルプ</a>
                    <a href="#" class="footer-link">お問い合わせ</a>
                </div>
                <div class="copyright">
                    &copy; 2025 ワイサポ All Rights Reserved.
                </div>
            </div>
        </footer>
    `;
    
    // フッターをDOMに挿入
    footerPlaceholder.outerHTML = footerHTML;
}

/**
 * 現在のページに対するルートディレクトリへの相対パスを計算
 * @returns {string} 相対パス
 */
function calculateRelativePath() {
    const currentPath = window.location.pathname;
    
    // パスの深さに基づいて相対パスを構築
    // 例: /html/account/settings.html なら ../../ を返す
    
    // htmlディレクトリ内のファイルの場合
    if (currentPath.includes('/html/')) {
        const parts = currentPath.split('/');
        const depth = parts.length - (currentPath.endsWith('/') ? 1 : 0);
        
        // ルートからの深さに応じて ../ を連結
        if (depth > 2) { // html/page.html より深い場合
            return '../'.repeat(depth - 2);
        } else {
            return '../';
        }
    }
    
    // ルートディレクトリの場合
    return '';
}

/**
 * ログアウトトーストメッセージを表示
 */
function showLogoutToast(event) {
    // ログアウトフラグをセッションストレージに保存
    sessionStorage.setItem('showLogoutToast', 'true');
    
    // すぐにページ遷移（デフォルトのリンク動作を許可）
    return true;
}

/**
 * ページ読み込み時にログアウトトーストメッセージをチェック
 */
function checkLogoutToast() {
    // ログアウトフラグをチェック
    if (sessionStorage.getItem('showLogoutToast') === 'true') {
        // フラグを削除
        sessionStorage.removeItem('showLogoutToast');
        
        // 少し遅延してからトーストを表示（ページ読み込みが完了してから）
        setTimeout(() => {
            displayLogoutToast();
        }, 100);
    }
}

/**
 * 実際にトーストメッセージを表示する関数
 */
function displayLogoutToast() {
    // トーストメッセージを表示
    const toast = document.createElement('div');
    toast.className = 'logout-toast';
    toast.innerHTML = `
        <div class="toast-content">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16,17 21,12 16,7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            <span>ログアウトしました</span>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    // アニメーションで表示
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // 3秒後に非表示アニメーション開始
    setTimeout(() => {
        toast.classList.add('hide');
    }, 3000);
    
    // アニメーション完了後に要素を削除
    setTimeout(() => {
        if (document.body.contains(toast)) {
            document.body.removeChild(toast);
        }
    }, 3500);
}