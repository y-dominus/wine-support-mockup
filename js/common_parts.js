// ヘッダーとフッターの共通コンポーネント管理 - 確実動作版
class CommonParts {
    constructor() {
        this.isGitHubPages = window.location.hostname.includes('github.io');
        // 強力なキャッシュバスター: 現在時刻 + ランダム値
        this.version = `FINAL_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        this.currentPage = this.getCurrentPage();
        console.log('🔧 CommonParts初期化:', { currentPage: this.currentPage, version: this.version });
    }

    // 現在のページを取得
    getCurrentPage() {
        const path = window.location.pathname;
        console.log('📍 現在のパス:', path);
        
        if (path.includes('dashboard') || path === '/' || path.includes('index')) {
            return 'dashboard';
        } else if (path.includes('my_cellar')) {
            return 'my_cellar';
        } else if (path.includes('product_list')) {
            return 'products';
        } else if (path.includes('order_history')) {
            return 'orders';
        } else if (path.includes('mypage') || path.includes('account')) {
            return 'mypage';
        }
        return 'dashboard'; // デフォルト
    }

    // ヘッダーHTML生成 - 完全版
    generateHeader() {
        console.log('🏗️ ヘッダー生成開始');
        
        // パスをより簡単に設定
        const currentPath = window.location.pathname;
        let basePath = '';
        
        // パスの深さで判定
        if (currentPath.includes('/html/')) {
            // htmlフォルダ内のファイルの場合
            if (currentPath.includes('/html/my_cellar/') || 
                currentPath.includes('/html/products/') || 
                currentPath.includes('/html/orders/') ||
                currentPath.includes('/html/account/')) {
                basePath = '../..'; // 2階層上
            } else {
                basePath = '..'; // 1階層上
            }
        } else {
            basePath = '.'; // ルートディレクトリ
        }
        
        console.log('📍 パス情報:', {
            currentPath,
            basePath,
            hostname: window.location.hostname
        });
        
        const navigationItems = [
            { id: 'dashboard', name: 'トップ', path: '/html/dashboard.html', icon: '🏠' },
            { id: 'my_cellar', name: 'マイセラー', path: '/html/my_cellar/my_cellar.html', icon: '🍷' },
            { id: 'products', name: '商品リスト', path: '/html/products/product_list.html', icon: '📋' },
            { id: 'orders', name: '注文履歴', path: '/html/orders/order_history.html', icon: '📦' },
            { id: 'mypage', name: 'マイページ', path: '/html/account/mypage.html', icon: '👤' }
        ];

        const navItemsHtml = navigationItems.map(item => {
            const isActive = this.currentPage === item.id ? 'active' : '';
            const fullPath = `${basePath}${item.path}`;
            const activeStyle = isActive ? 'background-color: #f3f0f5; color: #884591; font-weight: 600;' : '';
            
            return `
                <a href="${fullPath}" class="nav-item ${isActive}" style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; border-radius: 6px; text-decoration: none; color: #6b7280; font-weight: 500; font-size: 0.875rem; ${activeStyle}">
                    <span class="nav-icon" style="font-size: 1rem; display: flex; align-items: center; justify-content: center; width: 20px; height: 20px;">${item.icon}</span>
                    <span class="nav-text" style="white-space: nowrap;">${item.name}</span>
                </a>
            `;
        }).join('');

        const headerHTML = `
            <header class="main-header" style="background: #ffffff; border-bottom: 1px solid #e5e7eb; position: sticky; top: 0; z-index: 1000; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);">
                <div class="header-container" style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; padding: 0 1rem; height: 64px;">
                    <div class="header-left" style="display: flex; align-items: center; gap: 2rem;">
                        <div class="logo-section" style="display: flex; align-items: center;">
                            <a href="${basePath}/html/dashboard.html" style="display: flex; align-items: center;">
                                <img src="${basePath}/assets/images/winesupport_logo.png" alt="ワイサポ" style="height: 36px; width: auto;" onerror="console.error('ロゴ画像読み込みエラー'); this.style.display='none';">
                            </a>
                        </div>
                        <nav class="main-nav" id="mainNav" style="display: flex; align-items: center; gap: 0.25rem;">
                            ${navItemsHtml}
                        </nav>
                        <button class="mobile-menu-toggle" id="mobileMenuToggle" aria-label="メニューを開く" style="display: none;">
                            ☰
                        </button>
                    </div>
                    <div class="header-right" style="display: flex; align-items: center; gap: 1rem;">
                        <div class="action-icons" style="display: flex; align-items: center; gap: 0.25rem;">
                            <button class="action-btn" data-action="search" title="商品検索" style="display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; border: none; border-radius: 6px; background: transparent; color: #6b7280; font-size: 1.1rem; cursor: pointer;">
                                🔍
                            </button>
                            <button class="action-btn has-notification" data-action="notifications" title="通知" style="display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; border: none; border-radius: 6px; background: transparent; color: #6b7280; font-size: 1.1rem; cursor: pointer; position: relative;">
                                🔔
                                <span style="position: absolute; top: 8px; right: 8px; width: 8px; height: 8px; background-color: #ef4444; border-radius: 50%; border: 2px solid #ffffff;"></span>
                            </button>
                            <button class="action-btn" data-action="cart" title="カート" style="display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; border: none; border-radius: 6px; background: transparent; color: #6b7280; font-size: 1.1rem; cursor: pointer;">
                                🛒
                            </button>
                        </div>
                        <button class="logout-btn" onclick="handleLogout()" style="padding: 0.5rem 1rem; border: 1px solid #e5e7eb; border-radius: 6px; background: #ffffff; color: #dc2626; font-weight: 500; font-size: 0.875rem; cursor: pointer;">
                            ログアウト
                        </button>
                    </div>
                </div>
            </header>
        `;
        
        console.log('✅ ヘッダーHTML生成完了');
        return headerHTML;
    }

    // ヘッダーを挿入 - 確実版
    insertHeader() {
        console.log('🚀 ヘッダー挿入開始');
        
        // 既存のヘッダーを完全に削除
        const existingHeaders = document.querySelectorAll('header, .header, .main-header, .site-header');
        existingHeaders.forEach(header => {
            console.log('🗑️ 既存ヘッダー削除:', header);
            header.remove();
        });
        
        const headerHtml = this.generateHeader();
        
        // body の最初に挿入
        if (document.body) {
            document.body.insertAdjacentHTML('afterbegin', headerHtml);
            console.log('✅ ヘッダーをbodyに挿入完了');
        } else {
            console.error('❌ document.bodyが存在しません');
            return false;
        }
        
        this.initializeHeaderEvents();
        
        console.log('✅ ヘッダー挿入とイベント初期化完了');
        return true;
    }

    // ヘッダーイベント初期化
    initializeHeaderEvents() {
        console.log('🎮 ヘッダーイベント初期化開始');
        
        // モバイルメニュートグル
        const mobileToggle = document.getElementById('mobileMenuToggle');
        const mainNav = document.getElementById('mainNav');
        
        if (mobileToggle && mainNav) {
            mobileToggle.addEventListener('click', () => {
                mainNav.classList.toggle('mobile-open');
                const isOpen = mainNav.classList.contains('mobile-open');
                mobileToggle.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
            });
        }

        // アクションボタンイベント
        const actionButtons = document.querySelectorAll('.action-btn');
        actionButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.getAttribute('data-action');
                this.handleActionClick(action);
            });
        });
        
        console.log('✅ ヘッダーイベント初期化完了');
    }

    // アクションボタンクリック処理
    handleActionClick(action) {
        const currentPath = window.location.pathname;
        let basePath = '';
        
        // パスの深さで判定
        if (currentPath.includes('/html/')) {
            if (currentPath.includes('/html/my_cellar/') || 
                currentPath.includes('/html/products/') || 
                currentPath.includes('/html/orders/') ||
                currentPath.includes('/html/account/')) {
                basePath = '../..'; // 2階層上
            } else {
                basePath = '..'; // 1階層上
            }
        } else {
            basePath = '.'; // ルートディレクトリ
        }
        
        switch (action) {
            case 'search':
                window.location.href = `${basePath}/html/products/product_list.html`;
                break;
            case 'notifications':
                window.location.href = `${basePath}/html/notifications.html`;
                break;
            case 'cart':
                window.location.href = `${basePath}/html/cart.html`;
                break;
            default:
                console.log(`アクション: ${action}`);
        }
    }

    // 初期化 - 確実版
    init() {
        console.log('🚀 CommonParts初期化開始');
        
        try {
            const result = this.insertHeader();
            if (result) {
                console.log('✅ CommonParts初期化完了 - ヘッダー生成済み');
                return true;
            } else {
                console.error('❌ ヘッダー挿入に失敗');
                return false;
            }
        } catch (error) {
            console.error('❌ CommonParts初期化エラー:', error);
            return false;
        }
    }
}

// ログアウト処理（グローバル関数）
function handleLogout() {
    if (confirm('ログアウトしますか？')) {
        // 実際のログアウト処理はここに実装
        alert('ログアウト機能はモックアップ版のため実装されていません');
        // window.location.href = '/login.html';
    }
}

// 確実な初期化 - 複数のタイミングで実行
function initializeCommonParts() {
    console.log('🔧 CommonParts初期化関数実行');
    
    try {
        const commonParts = new CommonParts();
        const success = commonParts.init();
        
        if (success) {
            console.log('✅ ヘッダー初期化成功');
            // グローバルに保存
            window.commonPartsInstance = commonParts;
        } else {
            console.error('❌ ヘッダー初期化失敗');
        }
        
        return success;
    } catch (error) {
        console.error('❌ CommonParts初期化中にエラー:', error);
        return false;
    }
}

// DOM読み込み完了後に初期化
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 DOMContentLoaded - CommonParts初期化開始');
    
    // 即座に実行
    const success = initializeCommonParts();
    
    if (!success) {
        // 失敗した場合は少し待ってから再試行
        console.log('🔄 初回失敗 - 500ms後に再試行');
        setTimeout(() => {
            const retrySuccess = initializeCommonParts();
            if (!retrySuccess) {
                console.error('❌ 再試行も失敗');
            }
        }, 500);
    }
});

// ページ読み込み完了後にも実行（フォールバック）
window.addEventListener('load', () => {
    console.log('🌐 Window load - フォールバック初期化チェック');
    
    // ヘッダーが存在しない場合のみ実行
    if (!document.querySelector('.main-header')) {
        console.log('🔄 ヘッダーが存在しないため初期化実行');
        initializeCommonParts();
    } else {
        console.log('✅ ヘッダーは既に存在しています');
    }
});

// グローバルに利用可能にする
window.CommonParts = CommonParts;
window.initializeCommonParts = initializeCommonParts;

console.log('📦 common_parts.js読み込み完了 - 確実動作版');