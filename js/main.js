/**
 * ワイサポメインJavaScriptファイル
 * 全ページ共通の初期化処理を行います
 */

// ページ読み込み完了時の処理
document.addEventListener('DOMContentLoaded', function() {
    // 共通コンポーネントの初期化
    initializeCommonParts();
    
    // ページに応じたAIメッセージの表示
    initializeAiMessages();
    
    // フォームの初期化（バリデーションなど）
    initializeForms();
    
    // ナビゲーションのアクティブ状態設定
    setActiveNavItem();
    
    // レスポンシブ対応
    initializeResponsiveHandlers();
});

/**
 * 共通パーツ（ヘッダー・フッター）の初期化
 */
function initializeCommonParts() {
    // common_parts.jsで実装
}

/**
 * AIメッセージの初期化
 */
function initializeAiMessages() {
    // 現在のページパスを取得
    const currentPath = window.location.pathname;
    
    // ページ種別の判定
    let pageType = 'dashboard';
    let messageKey = 'greeting';
    
    if (currentPath.includes('/onboarding/')) {
        pageType = 'onboarding';
        
        // オンボーディングのステップを判定
        if (currentPath.includes('0_welcome_ai.html')) {
            messageKey = 'welcome';
        } else if (currentPath.includes('1_store_info_form.html')) {
            messageKey = 'storeInfoPrompt';
        } else if (currentPath.includes('2_menu_info_form.html')) {
            messageKey = 'menuInfoPrompt';
        } else if (currentPath.includes('3_initial_proposal.html')) {
            messageKey = 'initialProposal';
        } else if (currentPath.includes('4_signup_form.html')) {
            messageKey = 'signupPrompt';
        } else if (currentPath.includes('5_initial_order_confirmation.html')) {
            messageKey = 'orderConfirmation';
        }
    } else if (currentPath.includes('/my_cellar/')) {
        pageType = 'myCellar';
        messageKey = currentPath.includes('sales_input.html') ? 'salesInput' : 'overview';
    } else if (currentPath.includes('/products/')) {
        pageType = 'products';
        messageKey = currentPath.includes('product_detail') ? 'productDetail' : 'productList';
    } else if (currentPath.includes('/orders/')) {
        pageType = 'orders';
        messageKey = currentPath.includes('replenish_order.html') ? 'replenishOrder' : 'orderHistory';
    } else if (currentPath.includes('/reports/')) {
        pageType = 'reports';
        messageKey = 'salesReport';
    } else if (currentPath.includes('/account/')) {
        pageType = 'account';
        messageKey = 'accountSettings';
    } else if (currentPath === '/' || currentPath.includes('index.html')) {
        pageType = 'index';
        messageKey = 'welcome';
    }
    
    // AIメッセージの表示（ai_simulator.jsに実装された関数を使用）
    if (typeof displayAiMessage === 'function') {
        displayAiMessage(pageType, messageKey, null, '#ai-message-area');
    }
}

/**
 * フォームの初期化
 */
function initializeForms() {
    // 必須入力フィールドのチェック
    const requiredFields = document.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        field.addEventListener('blur', function() {
            validateField(this);
        });
    });
    
    // フォーム送信時のバリデーション
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            let isValid = true;
            
            // すべての必須フィールドをチェック
            const fields = this.querySelectorAll('[required]');
            fields.forEach(field => {
                if (!validateField(field)) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                event.preventDefault();
                // エラーメッセージを表示
                showFormErrorMessage('入力内容をご確認ください。');
            }
        });
    });
}

/**
 * フィールドのバリデーション
 * @param {HTMLElement} field - バリデーション対象のフィールド
 * @return {boolean} バリデーション結果
 */
function validateField(field) {
    const value = field.value.trim();
    const isValid = value !== '';
    
    if (!isValid) {
        field.classList.add('error');
        
        // エラーメッセージの表示
        const errorEl = field.nextElementSibling;
        if (errorEl && errorEl.classList.contains('error-message')) {
            errorEl.style.display = 'block';
        } else {
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = '入力必須です';
            field.parentNode.insertBefore(errorMessage, field.nextSibling);
        }
    } else {
        field.classList.remove('error');
        
        // エラーメッセージの非表示
        const errorEl = field.nextElementSibling;
        if (errorEl && errorEl.classList.contains('error-message')) {
            errorEl.style.display = 'none';
        }
    }
    
    return isValid;
}

/**
 * フォームエラーメッセージの表示
 * @param {string} message - エラーメッセージ
 */
function showFormErrorMessage(message) {
    let errorContainer = document.querySelector('.form-error-container');
    
    if (!errorContainer) {
        errorContainer = document.createElement('div');
        errorContainer.className = 'form-error-container';
        
        // フォームの先頭に挿入
        const form = document.querySelector('form');
        if (form) {
            form.insertBefore(errorContainer, form.firstChild);
        }
    }
    
    errorContainer.textContent = message;
    errorContainer.style.display = 'block';
    
    // 自動的に消える
    setTimeout(() => {
        errorContainer.style.display = 'none';
    }, 5000);
}

/**
 * ナビゲーションのアクティブ状態設定
 */
function setActiveNavItem() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // パスが含まれるか、もしくはホームページの場合
        if ((href !== '/' && href !== 'index.html' && currentPath.includes(href)) || 
            ((href === '/' || href === 'index.html') && (currentPath === '/' || currentPath.endsWith('index.html')))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * レスポンシブ対応の初期化
 */
function initializeResponsiveHandlers() {
    // ウィンドウサイズ変更時の処理
    window.addEventListener('resize', function() {
        // 必要に応じて実装
    });
    
    // モバイルメニューの処理
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            const mainNav = document.querySelector('.main-nav');
            mainNav.classList.toggle('active');
        });
    }
}