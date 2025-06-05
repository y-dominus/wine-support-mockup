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
    
    // 郵便番号関連機能の初期化
    initPostalCodeFeatures();
    
    // ワイン売上タイプ切替機能
    initWineSalesTypeToggle();
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
    
    // ワイン提供状況フォーム
    const wineStatusForm = document.getElementById('wine-status-form');
    if (wineStatusForm) {
        wineStatusForm.addEventListener('submit', function(event) {
            if (!validateWineStatusForm()) {
                event.preventDefault();
            } else {
                // フォームデータの保存
                saveWineStatusData();
            }
        });
    }
    
    // ワイン要望フォーム
    const wineRequirementsForm = document.getElementById('wine-requirements-form');
    if (wineRequirementsForm) {
        wineRequirementsForm.addEventListener('submit', function(event) {
            if (!validateWineRequirementsForm()) {
                event.preventDefault();
            } else {
                // フォームデータの保存
                saveWineRequirementsData();
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
    
    // 郵便番号の形式チェック（入力されている場合のみ）
    const postalCode = document.getElementById('postal-code');
    if (postalCode && postalCode.value.trim()) {
        const postalPattern = /^\d{7}$/;
        if (!postalPattern.test(postalCode.value.trim())) {
            showError(postalCode, '郵便番号は7桁の数字で入力してください（例：1000001）');
            isValid = false;
        } else {
            clearError(postalCode);
        }
    }
    
    // ワイン売上金額のチェック（選択されている場合のみ）
    const wineSalesType = document.getElementById('wine-sales-type');
    const monthlyWineSales = document.getElementById('monthly-wine-sales');
    
    if (wineSalesType && wineSalesType.value === 'wine-direct') {
        if (!monthlyWineSales || !monthlyWineSales.value.trim()) {
            showError(monthlyWineSales, 'ワイン売上金額を入力してください');
            isValid = false;
        } else {
            clearError(monthlyWineSales);
        }
    } else if (wineSalesType && wineSalesType.value === 'alcohol-ratio') {
        const alcoholSales = document.getElementById('alcohol-sales');
        const wineRatio = document.getElementById('wine-ratio');
        
        if (!alcoholSales || !alcoholSales.value.trim()) {
            showError(alcoholSales, 'アルコール売上総額を入力してください');
            isValid = false;
        } else {
            clearError(alcoholSales);
        }
        
        if (!wineRatio || !wineRatio.value.trim()) {
            showError(wineRatio, 'ワインの割合を入力してください');
            isValid = false;
        } else {
            clearError(wineRatio);
        }
    }
    
    return isValid;
}

/**
 * ワイン要望フォームのバリデーション
 * @return {boolean} バリデーション結果
 */
function validateWineRequirementsForm() {
    let isValid = true;
    
    // 現在アクティブな方法を確認
    const activeMethodBtn = document.querySelector('.method-btn.active');
    const activeMethod = activeMethodBtn ? activeMethodBtn.dataset.method : 'price-sku';
    
    if (activeMethod === 'price-sku') {
        // 売価・SKU数指定方式のバリデーション
        const minPrice = document.getElementById('min-price');
        const maxPrice = document.getElementById('max-price');
        const skuCount = document.getElementById('sku-count');
        const volumeZone = document.getElementById('volume-zone');
        
        // 売価の指定は必須
        if (!minPrice || !minPrice.value.trim()) {
            showError(minPrice, '最低売価を入力してください');
            isValid = false;
        } else {
            clearError(minPrice);
        }
        
        if (!maxPrice || !maxPrice.value.trim()) {
            showError(maxPrice, '最高売価を入力してください');
            isValid = false;
        } else {
            clearError(maxPrice);
        }
        
        // SKU数とボリュームゾーンのどちらかは必須
        if ((!skuCount || !skuCount.value.trim()) && (!volumeZone || !volumeZone.value.trim())) {
            const skuSection = document.getElementById('price-sku-section');
            showError(skuSection, 'SKU数またはボリュームゾーンのどちらかを入力してください');
            isValid = false;
        } else {
            const skuSection = document.getElementById('price-sku-section');
            clearError(skuSection);
        }
        
    } else if (activeMethod === 'wine-allocation') {
        // 赤白泡割合指定方式のバリデーション
        const hasWineAllocation = checkWineAllocation();
        
        if (!hasWineAllocation) {
            const allocationSection = document.getElementById('wine-allocation-section');
            showError(allocationSection, '赤白泡の割合を入力してください');
            isValid = false;
        } else {
            const allocationSection = document.getElementById('wine-allocation-section');
            clearError(allocationSection);
        }
    }
    
    return isValid;
}

/**
 * 赤白泡の割合入力があるかチェック
 * @return {boolean} 入力があるかどうか
 */
function checkWineAllocation() {
    const allocationInputs = [
        'red-low', 'white-low', 'spark-low',
        'red-mid', 'white-mid', 'spark-mid',
        'red-high', 'white-high', 'spark-high'
    ];
    
    return allocationInputs.some(inputName => {
        const input = document.querySelector(`input[name="${inputName}"]`);
        return input && input.value.trim() !== '';
    });
}

/**
 * ワイン提供状況フォームのバリデーション
 * @return {boolean} バリデーション結果
 */
function validateWineStatusForm() {
    let isValid = true;
    
    // ワイン売上金額のチェック（選択されている場合のみ）
    const wineSalesType = document.getElementById('wine-sales-type');
    const monthlyWineSales = document.getElementById('monthly-wine-sales');
    
    if (wineSalesType && wineSalesType.value === 'wine-direct') {
        if (!monthlyWineSales || !monthlyWineSales.value.trim()) {
            showError(monthlyWineSales, 'ワイン売上金額を入力してください');
            isValid = false;
        } else {
            clearError(monthlyWineSales);
        }
    } else if (wineSalesType && wineSalesType.value === 'alcohol-ratio') {
        const alcoholSales = document.getElementById('alcohol-sales');
        const wineRatio = document.getElementById('wine-ratio');
        
        if (!alcoholSales || !alcoholSales.value.trim()) {
            showError(alcoholSales, 'アルコール売上総額を入力してください');
            isValid = false;
        } else {
            clearError(alcoholSales);
        }
        
        if (!wineRatio || !wineRatio.value.trim()) {
            showError(wineRatio, 'ワインの割合を入力してください');
            isValid = false;
        } else {
            clearError(wineRatio);
        }
    }
    
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
    
    // 所在地情報も含めて保存
    formData.postalCode = document.getElementById('postal-code')?.value;
    formData.address = document.getElementById('address')?.value;
    formData.addressDetail = document.getElementById('address-detail')?.value;
    formData.hasSommelier = document.querySelector('input[name="has-sommelier"]:checked')?.value;
    formData.hasCellar = document.querySelector('input[name="has-cellar"]:checked')?.value;
    formData.wineSalesType = document.getElementById('wine-sales-type')?.value;
    formData.monthlyWineSales = document.getElementById('monthly-wine-sales')?.value;
    
    localStorage.setItem('storeInfoData', JSON.stringify(formData));
}

/**
 * ワイン提供状況データの保存
 */
function saveWineStatusData() {
    const formData = {
        hasSommelier: document.querySelector('input[name="has-sommelier"]:checked')?.value,
        hasCellar: document.querySelector('input[name="has-cellar"]:checked')?.value,
        wineSalesType: document.getElementById('wine-sales-type')?.value,
        monthlyWineSales: document.getElementById('monthly-wine-sales')?.value,
        alcoholSales: document.getElementById('alcohol-sales')?.value,
        wineRatio: document.getElementById('wine-ratio')?.value,
        priceBandSalesLow: document.querySelector('input[name="price-band-sales-low"]')?.value,
        priceBandSalesMid: document.querySelector('input[name="price-band-sales-mid"]')?.value,
        priceBandSalesHigh: document.querySelector('input[name="price-band-sales-high"]')?.value,
        priceBandSalesPremium: document.querySelector('input[name="price-band-sales-premium"]')?.value
    };
    
    localStorage.setItem('wineStatusData', JSON.stringify(formData));
}

/**
 * ワイン要望データの保存
 */
function saveWineRequirementsData() {
    const formData = {
        minPrice: document.getElementById('min-price')?.value,
        maxPrice: document.getElementById('max-price')?.value,
        skuCount: document.getElementById('sku-count')?.value,
        volumeZone: document.getElementById('volume-zone')?.value,
        redLow: document.querySelector('input[name="red-low"]')?.value,
        whiteLow: document.querySelector('input[name="white-low"]')?.value,
        sparkLow: document.querySelector('input[name="spark-low"]')?.value,
        redMid: document.querySelector('input[name="red-mid"]')?.value,
        whiteMid: document.querySelector('input[name="white-mid"]')?.value,
        sparkMid: document.querySelector('input[name="spark-mid"]')?.value,
        redHigh: document.querySelector('input[name="red-high"]')?.value,
        whiteHigh: document.querySelector('input[name="white-high"]')?.value,
        sparkHigh: document.querySelector('input[name="spark-high"]')?.value
    };
    
    // チェックボックスの値を収集
    const checkboxGroups = ['main-varieties', 'catchy-wines', 'regions', 'production-method', 'ng-brands', 'ng-regions', 'ng-service'];
    checkboxGroups.forEach(groupName => {
        const checkedValues = [];
        document.querySelectorAll(`input[name="${groupName}"]:checked`).forEach(checkbox => {
            checkedValues.push(checkbox.value);
        });
        formData[groupName.replace('-', '')] = checkedValues;
    });
    
    // ラジオボタンの値を収集
    formData.halfBottles = document.querySelector('input[name="half-bottles"]:checked')?.value;
    
    // テキストエリアの値を収集
    formData.regionDetail = document.querySelector('textarea[name="region-detail"]')?.value;
    formData.productionDetail = document.querySelector('textarea[name="production-detail"]')?.value;
    formData.ngDetail = document.querySelector('textarea[name="ng-detail"]')?.value;
    
    localStorage.setItem('wineRequirementsData', JSON.stringify(formData));
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
        ['store-name', 'store-type', 'price-range', 'target-customers', 'postal-code', 'address', 'address-detail', 'seats', 'wine-sales-type', 'monthly-wine-sales'].forEach(id => {
            const element = document.getElementById(id);
            const key = camelCase(id);
            if (element && savedData[key]) {
                element.value = savedData[key];
            }
        });
        
        // ラジオボタンの復元
        if (savedData.hasSommelier) {
            const sommelierRadio = document.querySelector(`input[name="has-sommelier"][value="${savedData.hasSommelier}"]`);
            if (sommelierRadio) sommelierRadio.checked = true;
        }
        
        if (savedData.hasCellar) {
            const cellarRadio = document.querySelector(`input[name="has-cellar"][value="${savedData.hasCellar}"]`);
            if (cellarRadio) cellarRadio.checked = true;
        }
        
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

/**
 * 郵便番号関連機能の初期化
 */
function initPostalCodeFeatures() {
    const postalCodeInput = document.getElementById('postal-code');
    const postalSearchBtn = document.getElementById('postal-search-btn');
    const addressInput = document.getElementById('address');
    
    if (!postalCodeInput || !postalSearchBtn || !addressInput) return;
    
    // 郵便番号入力時の処理
    postalCodeInput.addEventListener('input', function() {
        const value = this.value.replace(/[^0-9]/g, ''); // 数字以外を除去
        this.value = value;
    });
    
    // 住所検索ボタンのクリック処理
    postalSearchBtn.addEventListener('click', function() {
        const postalCode = postalCodeInput.value.trim();
        if (postalCode.length < 7) {
            alert('郵便番号を7桁で入力してください');
            return;
        }
        
        searchAddressByPostalCode(postalCode);
    });
    
    // Enterキーで住所検索
    postalCodeInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (this.value.length >= 7) {
                searchAddressByPostalCode(this.value);
            }
        }
    });
}

/**
 * 郵便番号から住所を検索
 * @param {string} postalCode - 郵便番号
 */
function searchAddressByPostalCode(postalCode) {
    const postalSearchBtn = document.getElementById('postal-search-btn');
    const addressInput = document.getElementById('address');
    const btnText = postalSearchBtn.querySelector('.btn-text');
    const btnSpinner = postalSearchBtn.querySelector('.btn-spinner');
    
    // ローディング状態に変更
    postalSearchBtn.disabled = true;
    btnText.style.display = 'none';
    btnSpinner.style.display = 'inline';
    
    // モックデータで住所を返す（実際は郵便番号APIを使用）
    setTimeout(() => {
        const mockAddresses = {
            '1000001': '東京都千代田区千代田',
            '1000002': '東京都千代田区皇居外苑',
            '1000003': '東京都千代田区一ツ橋',
            '1000004': '東京都千代田区大手町',
            '1000005': '東京都千代田区丸の内',
            '1000006': '東京都千代田区有楽町',
            '1050001': '東京都港区虎ノ門',
            '1050011': '東京都港区芝公園',
            '1070052': '東京都港区赤坂',
            '1500002': '東京都渋谷区渋谷',
            '1040032': '東京都中央区八丁堀',
            '1030027': '東京都中央区日本橋',
            '1110032': '東京都台東区浅草',
            '1130033': '東京都文京区本郷',
            '1600023': '東京都新宿区西新宿',
            '1700013': '東京都豊島区東池袋',
            '1350091': '東京都江東区豊洲',
            '1440052': '東京都大田区蒲田',
            '1540024': '東京都世田谷区三軒茶屋',
            '1640011': '東京都中野区中央'
        };
        
        let address = mockAddresses[postalCode];
        
        // 特定の郵便番号がない場合は、ランダムなダミー住所を生成
        if (!address) {
            const prefectures = ['東京都', '神奈川県', '千葉県', '埼玉県', '大阪府', '京都府', '兵庫県', '愛知県'];
            const cities = [
                '千代田区', '中央区', '港区', '新宿区', '文京区', '台東区', '墨田区', '江東区',
                '品川区', '目黒区', '大田区', '世田谷区', '渋谷区', '中野区', '杉並区', '豊島区',
                '横浜市中区', '川崎市川崎区', '千葉市中央区', 'さいたま市大宮区', '大阪市中央区',
                '京都市中京区', '神戸市中央区', '名古屋市中区'
            ];
            const towns = [
                '本町', '中央', '東', '西', '南', '北', '栄町', '幸町', '緑町', '桜町',
                '新町', '元町', '旭町', '美原', '若葉', '花園', '松原', '竹町'
            ];
            
            const randomPrefecture = prefectures[Math.floor(Math.random() * prefectures.length)];
            const randomCity = cities[Math.floor(Math.random() * cities.length)];
            const randomTown = towns[Math.floor(Math.random() * towns.length)];
            
            address = `${randomPrefecture}${randomCity}${randomTown}`;
        }
        
        if (address) {
            addressInput.value = address;
            addressInput.classList.add('auto-filled');
            
            // 成功メッセージを表示
            showSuccessMessage('住所を自動入力しました');
        } else {
            // エラーの場合
            addressInput.value = '';
            addressInput.placeholder = '住所が見つかりませんでした。手動で入力してください';
            addressInput.focus();
        }
        
        // ボタンを元の状態に戻す
        postalSearchBtn.disabled = false;
        btnText.style.display = 'inline';
        btnSpinner.style.display = 'none';
        
    }, 1000); // 1秒遅延でリアルなAPIコールをシミュレート
}

/**
 * ワイン売上タイプ切替機能の初期化
 */
function initWineSalesTypeToggle() {
    const wineSalesTypeSelect = document.getElementById('wine-sales-type');
    const alcoholRatioSection = document.getElementById('alcohol-ratio-section');
    const monthlyWineSalesInput = document.getElementById('monthly-wine-sales');
    
    if (!wineSalesTypeSelect || !alcoholRatioSection || !monthlyWineSalesInput) return;
    
    wineSalesTypeSelect.addEventListener('change', function() {
        const selectedValue = this.value;
        
        if (selectedValue === 'wine-direct') {
            // ワイン売上直接入力
            monthlyWineSalesInput.disabled = false;
            alcoholRatioSection.style.display = 'none';
            
        } else if (selectedValue === 'alcohol-ratio') {
            // アルコール売上から算出
            monthlyWineSalesInput.disabled = true;
            monthlyWineSalesInput.value = '';
            alcoholRatioSection.style.display = 'block';
            
        } else {
            // 選択されていない場合
            monthlyWineSalesInput.disabled = false;
            alcoholRatioSection.style.display = 'none';
        }
    });
    
    // アルコール売上とワインの割合から自動算出
    const alcoholSalesInput = document.getElementById('alcohol-sales');
    const wineRatioInput = document.getElementById('wine-ratio');
    
    if (alcoholSalesInput && wineRatioInput) {
        const calculateWineSales = () => {
            const alcoholSales = parseFloat(alcoholSalesInput.value) || 0;
            const wineRatio = parseFloat(wineRatioInput.value) || 0;
            
            if (alcoholSales > 0 && wineRatio > 0) {
                const calculatedWineSales = Math.round(alcoholSales * (wineRatio / 100));
                monthlyWineSalesInput.value = calculatedWineSales;
            }
        };
        
        alcoholSalesInput.addEventListener('input', calculateWineSales);
        wineRatioInput.addEventListener('input', calculateWineSales);
    }
}

/**
 * 成功メッセージを表示
 * @param {string} message - 表示するメッセージ
 */
function showSuccessMessage(message) {
    // 既存の成功メッセージを削除
    const existingSuccess = document.querySelector('.success-message');
    if (existingSuccess) {
        existingSuccess.remove();
    }
    
    // 成功メッセージ要素を作成
    const successElement = document.createElement('div');
    successElement.className = 'success-message';
    successElement.textContent = message;
    successElement.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 12px 16px;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        z-index: 1000;
        font-size: 14px;
        font-weight: 500;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(successElement);
    
    // 3秒後に自動で削除
    setTimeout(() => {
        if (successElement.parentNode) {
            successElement.style.animation = 'slideOutRight 0.3s ease-out forwards';
            setTimeout(() => {
                successElement.remove();
            }, 300);
        }
    }, 3000);
}