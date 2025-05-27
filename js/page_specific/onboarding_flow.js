/**
 * オンボーディングフロー用JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // フォームのバリデーション処理
    initFormValidation();
    
    // プログレスバーのアニメーション
    animateProgressBar();
    
    // 保存されたデータの復元
    restoreFormData();
    
    // 次へボタンのイベント処理
    setupNavigationButtons();
});

/**
 * フォームのバリデーション処理を初期化
 */
function initFormValidation() {
    // 店舗情報フォーム
    const storeInfoForm = document.getElementById('store-info-form');
    if (storeInfoForm) {
        storeInfoForm.addEventListener('submit', function(event) {
            if (!validateStoreInfoForm()) {
                event.preventDefault();
            } else {
                // フォームデータの保存
                saveStoreInfoData();
            }
        });
    }
    
    // メニュー情報フォーム
    const menuInfoForm = document.getElementById('menu-info-form');
    if (menuInfoForm) {
        menuInfoForm.addEventListener('submit', function(event) {
            if (!validateMenuInfoForm()) {
                event.preventDefault();
            } else {
                // フォームデータの保存
                saveMenuInfoData();
            }
        });
    }
    
    // アカウント登録フォーム
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            if (!validateSignupForm()) {
                event.preventDefault();
            } else {
                // フォームデータの保存
                saveSignupData();
            }
        });
    }
}

/**
 * 店舗情報フォームのバリデーション
 * @return {boolean} バリデーション結果
 */
function validateStoreInfoForm() {
    let isValid = true;
    
    // 必須フィールドのチェック
    const requiredFields = [
        { id: 'store-name', message: '店舗名を入力してください' },
        { id: 'store-type', message: '業態を選択してください' },
        { id: 'price-range', message: '客単価帯を選択してください' },
        { id: 'target-customers', message: '主要顧客層を選択してください' }
    ];
    
    requiredFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || element.value.trim() === '') {
            showError(element, field.message);
            isValid = false;
        } else {
            clearError(element);
        }
    });
    
    return isValid;
}

/**
 * メニュー情報フォームのバリデーション
 * @return {boolean} バリデーション結果
 */
function validateMenuInfoForm() {
    let isValid = true;
    
    // 料理ジャンルのチェック
    const cuisineType = document.querySelectorAll('input[name="cuisine-type"]:checked');
    if (cuisineType.length === 0) {
        const cuisineTypeContainer = document.querySelector('.form-checkbox-group');
        showError(cuisineTypeContainer, '少なくとも1つの料理ジャンルを選択してください');
        isValid = false;
    }
    
    // 看板メニューのチェック
    const signatureDishes = document.getElementById('signature-dishes');
    if (!signatureDishes || signatureDishes.value.trim() === '') {
        showError(signatureDishes, '看板メニュー・人気メニューを入力してください');
        isValid = false;
    } else {
        clearError(signatureDishes);
    }
    
    return isValid;
}

/**
 * アカウント登録フォームのバリデーション
 * @return {boolean} バリデーション結果
 */
function validateSignupForm() {
    let isValid = true;
    
    // 必須フィールドのチェック
    const requiredFields = [
        { id: 'name', message: 'お名前を入力してください' },
        { id: 'position', message: '役職を選択してください' },
        { id: 'email', message: 'メールアドレスを入力してください' },
        { id: 'password', message: 'パスワードを入力してください' },
        { id: 'password-confirm', message: 'パスワード（確認）を入力してください' }
    ];
    
    requiredFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || element.value.trim() === '') {
            showError(element, field.message);
            isValid = false;
        } else {
            clearError(element);
        }
    });
    
    // メールアドレスの形式チェック
    const email = document.getElementById('email');
    if (email && email.value.trim() !== '') {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value)) {
            showError(email, '有効なメールアドレスを入力してください');
            isValid = false;
        }
    }
    
    // パスワードの一致チェック
    const password = document.getElementById('password');
    const passwordConfirm = document.getElementById('password-confirm');
    if (password && passwordConfirm && password.value && passwordConfirm.value) {
        if (password.value !== passwordConfirm.value) {
            showError(passwordConfirm, 'パスワードが一致しません');
            isValid = false;
        }
    }
    
    // パスワードの強度チェック
    if (password && password.value) {
        if (password.value.length < 8) {
            showError(password, 'パスワードは8文字以上である必要があります');
            isValid = false;
        } else if (!/[A-Za-z]/.test(password.value) || !/[0-9]/.test(password.value)) {
            showError(password, 'パスワードは英字と数字を含む必要があります');
            isValid = false;
        }
    }
    
    // 利用規約への同意チェック
    const termsCheckbox = document.querySelector('input[name="terms"]');
    if (termsCheckbox && !termsCheckbox.checked) {
        const termsContainer = termsCheckbox.parentElement;
        showError(termsContainer, '利用規約とプライバシーポリシーに同意してください');
        isValid = false;
    }
    
    return isValid;
}

/**
 * エラーメッセージを表示
 * @param {Element} element - 対象要素
 * @param {string} message - エラーメッセージ
 */
function showError(element, message) {
    if (!element) return;
    
    element.classList.add('error');
    
    // エラーメッセージ要素の取得または作成
    let errorElement = element.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains('error-message')) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        element.parentNode.insertBefore(errorElement, element.nextSibling);
    }
    
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

/**
 * エラー表示をクリア
 * @param {Element} element - 対象要素
 */
function clearError(element) {
    if (!element) return;
    
    element.classList.remove('error');
    
    // エラーメッセージ要素の非表示
    const errorElement = element.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.style.display = 'none';
    }
}

/**
 * プログレスバーのアニメーション
 */
function animateProgressBar() {
    const progressSteps = document.querySelectorAll('.progress-step');
    if (!progressSteps.length) return;
    
    // アクティブなステップのインデックスを取得
    let activeIndex = -1;
    progressSteps.forEach((step, index) => {
        if (step.classList.contains('active')) {
            activeIndex = index;
        }
    });
    
    if (activeIndex >= 0) {
        // プログレスラインのアニメーション
        const progressLines = document.querySelectorAll('.progress-line');
        for (let i = 0; i < activeIndex; i++) {
            progressLines[i].classList.add('completed');
        }
    }
}

/**
 * 店舗情報データの保存
 */
function saveStoreInfoData() {
    const formData = {
        storeName: document.getElementById('store-name')?.value,
        storeType: document.getElementById('store-type')?.value,
        priceRange: document.getElementById('price-range')?.value,
        targetCustomers: document.getElementById('target-customers')?.value,
        location: document.getElementById('location')?.value,
        seats: document.getElementById('seats')?.value,
        storeConcept: document.getElementById('store-concept')?.value,
        wineFocus: document.querySelector('input[name="wine-focus"]:checked')?.value
    };
    
    localStorage.setItem('storeInfoData', JSON.stringify(formData));
}

/**
 * メニュー情報データの保存
 */
function saveMenuInfoData() {
    // 料理ジャンルの取得
    const cuisineTypes = [];
    document.querySelectorAll('input[name="cuisine-type"]:checked').forEach(checkbox => {
        cuisineTypes.push(checkbox.value);
    });
    
    // 味わいの取得
    const tastePreferences = [];
    document.querySelectorAll('input[name="taste-preference"]:checked').forEach(checkbox => {
        tastePreferences.push(checkbox.value);
    });
    
    // ワインタイプの取得
    const wineTypes = [];
    document.querySelectorAll('input[name="current-wine-type"]:checked').forEach(checkbox => {
        wineTypes.push(checkbox.value);
    });
    
    const formData = {
        cuisineTypes: cuisineTypes,
        signatureDishes: document.getElementById('signature-dishes')?.value,
        menuCharacteristics: document.getElementById('menu-characteristics')?.value,
        tastePreferences: tastePreferences,
        currentWineTypes: wineTypes,
        wineRequest: document.getElementById('wine-request')?.value
    };
    
    localStorage.setItem('menuInfoData', JSON.stringify(formData));
}

/**
 * アカウント登録データの保存
 */
function saveSignupData() {
    const formData = {
        name: document.getElementById('name')?.value,
        position: document.getElementById('position')?.value,
        email: document.getElementById('email')?.value,
        phone: document.getElementById('phone')?.value,
        notificationEmail: document.querySelector('input[name="notification-email"]')?.checked,
        notificationRecommendation: document.querySelector('input[name="notification-recommendation"]')?.checked,
        notificationPromotion: document.querySelector('input[name="notification-promotion"]')?.checked
    };
    
    localStorage.setItem('signupData', JSON.stringify(formData));
}

/**
 * 保存されたフォームデータの復元
 */
function restoreFormData() {
    // 店舗情報フォームの復元
    const storeInfoForm = document.getElementById('store-info-form');
    if (storeInfoForm) {
        const savedData = JSON.parse(localStorage.getItem('storeInfoData') || '{}');
        
        // テキスト入力とセレクトボックスの復元
        ['store-name', 'store-type', 'price-range', 'target-customers', 'location', 'seats', 'store-concept'].forEach(id => {
            const element = document.getElementById(id);
            const key = camelCase(id);
            if (element && savedData[key]) {
                element.value = savedData[key];
            }
        });
        
        // ラジオボタンの復元
        if (savedData.wineFocus) {
            const radioBtn = document.querySelector(`input[name="wine-focus"][value="${savedData.wineFocus}"]`);
            if (radioBtn) {
                radioBtn.checked = true;
            }
        }
    }
    
    // メニュー情報フォームの復元
    const menuInfoForm = document.getElementById('menu-info-form');
    if (menuInfoForm) {
        const savedData = JSON.parse(localStorage.getItem('menuInfoData') || '{}');
        
        // テキストエリアの復元
        ['signature-dishes', 'menu-characteristics', 'wine-request'].forEach(id => {
            const element = document.getElementById(id);
            const key = camelCase(id);
            if (element && savedData[key]) {
                element.value = savedData[key];
            }
        });
        
        // チェックボックスの復元
        if (savedData.cuisineTypes) {
            savedData.cuisineTypes.forEach(type => {
                const checkbox = document.querySelector(`input[name="cuisine-type"][value="${type}"]`);
                if (checkbox) {
                    checkbox.checked = true;
                }
            });
        }
        
        if (savedData.tastePreferences) {
            savedData.tastePreferences.forEach(pref => {
                const checkbox = document.querySelector(`input[name="taste-preference"][value="${pref}"]`);
                if (checkbox) {
                    checkbox.checked = true;
                }
            });
        }
        
        if (savedData.currentWineTypes) {
            savedData.currentWineTypes.forEach(type => {
                const checkbox = document.querySelector(`input[name="current-wine-type"][value="${type}"]`);
                if (checkbox) {
                    checkbox.checked = true;
                }
            });
        }
    }
    
    // アカウント登録フォームの復元
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        const savedData = JSON.parse(localStorage.getItem('signupData') || '{}');
        
        // テキスト入力とセレクトボックスの復元
        ['name', 'position', 'email', 'phone'].forEach(id => {
            const element = document.getElementById(id);
            if (element && savedData[id]) {
                element.value = savedData[id];
            }
        });
        
        // チェックボックスの復元
        ['notification-email', 'notification-recommendation', 'notification-promotion'].forEach(name => {
            const checkbox = document.querySelector(`input[name="${name}"]`);
            const key = camelCase(name);
            if (checkbox && savedData[key] !== undefined) {
                checkbox.checked = savedData[key];
            }
        });
    }
}

/**
 * ナビゲーションボタンの設定
 */
function setupNavigationButtons() {
    // 「次へ」ボタンのクリック時にフォームをバリデーション
    const nextButtons = document.querySelectorAll('.btn-primary[type="submit"]');
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const form = this.closest('form');
            if (form) {
                form.reportValidity();
            }
        });
    });
}

/**
 * ハイフン区切りの文字列をキャメルケースに変換
 * @param {string} str - 変換する文字列
 * @return {string} キャメルケースの文字列
 */
function camelCase(str) {
    return str.replace(/-([a-z])/g, function(g) { return g[1].toUpperCase(); });
}