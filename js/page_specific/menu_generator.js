/**
 * ワインメニュー生成機能のJavaScript
 */

// グローバル変数
let selectedWines = [];
let currentStep = 1;
let selectedTemplate = '';
let menuSettings = {
    sortOrder: 'type-price',
    displayOptions: ['origin', 'vintage', 'grape'],
    customOrder: []
};

// サンプルワインデータ（実際はAPIから取得）
const wineData = [
    { id: 1, name: 'キャンティ クラシコ リゼルヴァ', type: 'red', origin: 'イタリア・トスカーナ', price: 8000, vintage: '2019', grape: 'サンジョヴェーゼ', stock: 2 },
    { id: 2, name: 'ソーヴィニヨン・ブラン', type: 'white', origin: 'ニュージーランド・マールボロ', price: 7000, vintage: '2022', grape: 'ソーヴィニヨン・ブラン', stock: 1 },
    { id: 3, name: 'プロセッコ', type: 'sparkling', origin: 'イタリア・ヴェネト', price: 6000, vintage: '2021', grape: 'グレラ', stock: 5 },
    { id: 4, name: 'メルロー', type: 'red', origin: 'チリ・セントラルバレー', price: 6000, vintage: '2020', grape: 'メルロー', stock: 3 },
    { id: 5, name: 'シャルドネ', type: 'white', origin: 'カリフォルニア・ナパバレー', price: 7000, vintage: '2021', grape: 'シャルドネ', stock: 4 },
    { id: 6, name: 'バローロ', type: 'red', origin: 'イタリア・ピエモンテ', price: 12000, vintage: '2018', grape: 'ネッビオーロ', stock: 6 },
    { id: 7, name: 'プイィ・フュメ', type: 'white', origin: 'フランス・ロワール', price: 10000, vintage: '2020', grape: 'ソーヴィニヨン・ブラン', stock: 4 }
];

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', function() {
    console.log('メニュー生成ページが読み込まれました');
    
    // AIメッセージの表示
    try {
        displayAiMessage('myCellar', 'menuGeneration', null, '#ai-message-area');
    } catch (e) {
        console.error('AI message display error:', e);
    }
    
    // 各機能の初期化
    initializeWineSelection();
    initializeStepNavigation();
    initializeMenuSettings();
    initializeTemplateSelection();
    initializeCustomization();
    initializePreviewGeneration();
    
    // 現在の日付を設定
    const today = new Date().toISOString().split('T')[0];
    const menuDateInput = document.getElementById('menu-date');
    if (menuDateInput) {
        menuDateInput.value = today;
    }
    
    console.log('メニュー生成ページの初期化が完了しました');
});

/**
 * ワイン選択機能の初期化
 */
function initializeWineSelection() {
    renderWineSelectionGrid();
    
    // フィルタボタンのイベント
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filterType = this.getAttribute('data-type');
            filterWineSelection(filterType);
        });
    });
    
    // 全選択・選択解除ボタン
    document.getElementById('select-all-wines')?.addEventListener('click', selectAllWines);
    document.getElementById('clear-selection')?.addEventListener('click', clearWineSelection);
}

/**
 * ワイン選択グリッドのレンダリング
 */
function renderWineSelectionGrid(filterType = 'all') {
    const grid = document.getElementById('wine-selection-grid');
    if (!grid) return;
    
    const filteredWines = filterType === 'all' ? wineData : wineData.filter(wine => wine.type === filterType);
    
    grid.innerHTML = filteredWines.map(wine => `
        <div class="wine-selection-card ${selectedWines.includes(wine.id) ? 'selected' : ''}" data-wine-id="${wine.id}">
            <div class="wine-card-header">
                <div class="wine-type-indicator ${wine.type}"></div>
                <div class="wine-card-name">${wine.name}</div>
            </div>
            <div class="wine-card-details">
                ${wine.origin} | ${wine.vintage}年 | ${wine.grape}
            </div>
            <div class="wine-card-price">¥${wine.price.toLocaleString()}</div>
        </div>
    `).join('');
    
    // ワインカードのクリックイベント
    grid.querySelectorAll('.wine-selection-card').forEach(card => {
        card.addEventListener('click', function() {
            const wineId = parseInt(this.getAttribute('data-wine-id'));
            toggleWineSelection(wineId);
        });
    });
}

/**
 * ワイン選択のフィルタリング
 */
function filterWineSelection(filterType) {
    renderWineSelectionGrid(filterType);
}

/**
 * ワイン選択のトグル
 */
function toggleWineSelection(wineId) {
    const index = selectedWines.indexOf(wineId);
    if (index > -1) {
        selectedWines.splice(index, 1);
    } else {
        selectedWines.push(wineId);
    }
    
    updateSelectionUI();
    validateStep1();
}

/**
 * 全選択
 */
function selectAllWines() {
    const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-type');
    const filteredWines = activeFilter === 'all' ? wineData : wineData.filter(wine => wine.type === activeFilter);
    
    filteredWines.forEach(wine => {
        if (!selectedWines.includes(wine.id)) {
            selectedWines.push(wine.id);
        }
    });
    
    updateSelectionUI();
    validateStep1();
}

/**
 * 選択解除
 */
function clearWineSelection() {
    selectedWines = [];
    updateSelectionUI();
    validateStep1();
}

/**
 * 選択UIの更新
 */
function updateSelectionUI() {
    // 選択数の更新
    const countElement = document.getElementById('selected-wine-count');
    if (countElement) {
        countElement.textContent = selectedWines.length;
    }
    
    // カードの選択状態を更新
    document.querySelectorAll('.wine-selection-card').forEach(card => {
        const wineId = parseInt(card.getAttribute('data-wine-id'));
        if (selectedWines.includes(wineId)) {
            card.classList.add('selected');
        } else {
            card.classList.remove('selected');
        }
    });
}

/**
 * ステップ1の検証
 */
function validateStep1() {
    const nextBtn = document.getElementById('step1-next');
    if (nextBtn) {
        nextBtn.disabled = selectedWines.length === 0;
    }
}

/**
 * ステップナビゲーションの初期化
 */
function initializeStepNavigation() {
    // 次へボタン
    document.querySelectorAll('.btn-next').forEach(btn => {
        btn.addEventListener('click', function() {
            const nextStep = parseInt(this.getAttribute('data-next'));
            if (nextStep) {
                goToStep(nextStep);
            }
        });
    });
    
    // 戻るボタン
    document.querySelectorAll('.btn-prev').forEach(btn => {
        btn.addEventListener('click', function() {
            const prevStep = parseInt(this.getAttribute('data-prev'));
            if (prevStep) {
                goToStep(prevStep);
            }
        });
    });
}

/**
 * 指定ステップに移動
 */
function goToStep(step) {
    // 現在のステップを非表示
    document.getElementById(`step-${currentStep}`).style.display = 'none';
    
    // 新しいステップを表示
    document.getElementById(`step-${step}`).style.display = 'block';
    
    // ステップインジケーターを更新
    updateStepIndicator(step);
    
    // ステップ固有の処理
    handleStepChange(step);
    
    currentStep = step;
}

/**
 * ステップインジケーターの更新
 */
function updateStepIndicator(activeStep) {
    document.querySelectorAll('.step').forEach((step, index) => {
        const stepNumber = index + 1;
        step.classList.remove('active', 'completed');
        
        if (stepNumber === activeStep) {
            step.classList.add('active');
        } else if (stepNumber < activeStep) {
            step.classList.add('completed');
        }
    });
}

/**
 * ステップ変更時の処理
 */
function handleStepChange(step) {
    switch (step) {
        case 2:
            initializeStep2();
            break;
        case 3:
            // テンプレート選択ステップ
            break;
        case 4:
            loadRestaurantInfo();
            break;
        case 5:
            generateMenuPreview();
            break;
    }
}

/**
 * ステップ2の初期化
 */
function initializeStep2() {
    // カスタム順序設定の表示/非表示
    const sortOrderInputs = document.querySelectorAll('input[name="sort-order"]');
    const customOrderSection = document.getElementById('custom-order-section');
    
    sortOrderInputs.forEach(input => {
        input.addEventListener('change', function() {
            if (this.value === 'custom') {
                customOrderSection.style.display = 'block';
                renderSortableWineList();
            } else {
                customOrderSection.style.display = 'none';
            }
            menuSettings.sortOrder = this.value;
        });
    });
    
    // 表示オプションの設定
    const displayOptions = document.querySelectorAll('input[name="display-options"]');
    displayOptions.forEach(input => {
        input.addEventListener('change', function() {
            if (this.checked) {
                if (!menuSettings.displayOptions.includes(this.value)) {
                    menuSettings.displayOptions.push(this.value);
                }
            } else {
                const index = menuSettings.displayOptions.indexOf(this.value);
                if (index > -1) {
                    menuSettings.displayOptions.splice(index, 1);
                }
            }
        });
    });
}

/**
 * ソート可能なワインリストのレンダリング
 */
function renderSortableWineList() {
    const container = document.getElementById('sortable-wines');
    if (!container) return;
    
    const selectedWineData = wineData.filter(wine => selectedWines.includes(wine.id));
    
    container.innerHTML = selectedWineData.map((wine, index) => `
        <div class="sortable-wine-item" data-wine-id="${wine.id}">
            <div class="drag-handle">☰</div>
            <div class="wine-info">
                <div class="wine-type-indicator ${wine.type}"></div>
                <span class="wine-name">${wine.name}</span>
                <span class="wine-price">¥${wine.price.toLocaleString()}</span>
            </div>
        </div>
    `).join('');
    
    // ドラッグ&ドロップ機能（簡易実装）
    makeSortable(container);
}

/**
 * 簡易ドラッグ&ドロップ機能
 */
function makeSortable(container) {
    let draggedElement = null;
    
    container.querySelectorAll('.sortable-wine-item').forEach(item => {
        item.draggable = true;
        
        item.addEventListener('dragstart', function(e) {
            draggedElement = this;
            this.style.opacity = '0.5';
        });
        
        item.addEventListener('dragend', function() {
            this.style.opacity = '';
            draggedElement = null;
        });
        
        item.addEventListener('dragover', function(e) {
            e.preventDefault();
        });
        
        item.addEventListener('drop', function(e) {
            e.preventDefault();
            if (draggedElement && draggedElement !== this) {
                const rect = this.getBoundingClientRect();
                const midY = rect.top + rect.height / 2;
                
                if (e.clientY < midY) {
                    container.insertBefore(draggedElement, this);
                } else {
                    container.insertBefore(draggedElement, this.nextSibling);
                }
                
                updateCustomOrder();
            }
        });
    });
}

/**
 * カスタム順序の更新
 */
function updateCustomOrder() {
    const items = document.querySelectorAll('.sortable-wine-item');
    menuSettings.customOrder = Array.from(items).map(item => 
        parseInt(item.getAttribute('data-wine-id'))
    );
}

/**
 * メニュー設定の初期化
 */
function initializeMenuSettings() {
    // 並び順の初期設定は既にhandleStepChangeで処理
}

/**
 * テンプレート選択の初期化
 */
function initializeTemplateSelection() {
    const templateCards = document.querySelectorAll('.template-card');
    const step3NextBtn = document.getElementById('step3-next');
    
    templateCards.forEach(card => {
        card.addEventListener('click', function() {
            // 他のカードの選択を解除
            templateCards.forEach(c => c.classList.remove('selected'));
            
            // このカードを選択
            this.classList.add('selected');
            selectedTemplate = this.getAttribute('data-template');
            
            // 次へボタンを有効化
            if (step3NextBtn) {
                step3NextBtn.disabled = false;
            }
        });
    });
}

/**
 * カスタマイズ機能の初期化
 */
function initializeCustomization() {
    // ロゴアップロード機能
    initializeLogoUpload();
    
    // フォーム入力の保存
    const formInputs = document.querySelectorAll('#step-4 input, #step-4 textarea');
    formInputs.forEach(input => {
        input.addEventListener('change', saveCustomizationData);
    });
}

/**
 * ロゴアップロード機能の初期化
 */
function initializeLogoUpload() {
    const uploadArea = document.getElementById('logo-upload-area');
    const logoInput = document.getElementById('logo-input');
    const uploadBtn = document.querySelector('.upload-btn');
    const logoPreview = document.getElementById('logo-preview');
    const logoPreviewImage = document.getElementById('logo-preview-image');
    const removeLogo = document.querySelector('.remove-logo');
    
    if (!uploadArea || !logoInput) return;
    
    // ファイル選択ボタン
    uploadBtn?.addEventListener('click', () => logoInput.click());
    
    // ドラッグ&ドロップ
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleLogoFile(files[0]);
        }
    });
    
    // ファイル入力変更
    logoInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleLogoFile(e.target.files[0]);
        }
    });
    
    // ロゴ削除
    removeLogo?.addEventListener('click', () => {
        logoInput.value = '';
        uploadArea.style.display = 'block';
        logoPreview.style.display = 'none';
    });
}

/**
 * ロゴファイルの処理
 */
function handleLogoFile(file) {
    if (!file.type.startsWith('image/')) {
        alert('画像ファイルを選択してください。');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
        const logoPreviewImage = document.getElementById('logo-preview-image');
        const uploadArea = document.getElementById('logo-upload-area');
        const logoPreview = document.getElementById('logo-preview');
        
        logoPreviewImage.src = e.target.result;
        uploadArea.style.display = 'none';
        logoPreview.style.display = 'block';
    };
    reader.readAsDataURL(file);
}

/**
 * 店舗情報の読み込み
 */
function loadRestaurantInfo() {
    // LocalStorageから既存の店舗情報を読み込み
    const savedInfo = JSON.parse(localStorage.getItem('restaurantInfo') || '{}');
    
    if (savedInfo.name) {
        document.getElementById('restaurant-name').value = savedInfo.name;
    }
    if (savedInfo.subtitle) {
        document.getElementById('restaurant-subtitle').value = savedInfo.subtitle;
    }
    if (savedInfo.address) {
        document.getElementById('restaurant-address').value = savedInfo.address;
    }
    if (savedInfo.phone) {
        document.getElementById('restaurant-phone').value = savedInfo.phone;
    }
}

/**
 * カスタマイズデータの保存
 */
function saveCustomizationData() {
    const restaurantInfo = {
        name: document.getElementById('restaurant-name')?.value || '',
        subtitle: document.getElementById('restaurant-subtitle')?.value || '',
        address: document.getElementById('restaurant-address')?.value || '',
        phone: document.getElementById('restaurant-phone')?.value || '',
        menuTitle: document.getElementById('menu-title')?.value || 'Wine Selection',
        menuDate: document.getElementById('menu-date')?.value || '',
        menuDescription: document.getElementById('menu-description')?.value || ''
    };
    
    localStorage.setItem('restaurantInfo', JSON.stringify(restaurantInfo));
}

/**
 * プレビュー生成機能の初期化
 */
function initializePreviewGeneration() {
    // PDFダウンロードボタン
    document.getElementById('download-pdf')?.addEventListener('click', downloadMenuPDF);
    
    // 印刷ボタン
    document.getElementById('print-menu')?.addEventListener('click', printMenu);
    
    // ズーム機能
    document.getElementById('zoom-in')?.addEventListener('click', () => zoomPreview(1.1));
    document.getElementById('zoom-out')?.addEventListener('click', () => zoomPreview(0.9));
    
    // 完了ボタン
    document.getElementById('complete-generation')?.addEventListener('click', completeGeneration);
    
    // モーダルのボタン
    document.getElementById('back-to-cellar')?.addEventListener('click', () => {
        window.location.href = 'my_cellar.html';
    });
    
    document.getElementById('create-another')?.addEventListener('click', () => {
        location.reload();
    });
}

let currentZoom = 1;

/**
 * プレビューのズーム
 */
function zoomPreview(factor) {
    currentZoom *= factor;
    currentZoom = Math.max(0.5, Math.min(2.0, currentZoom)); // 50%～200%の範囲
    
    const preview = document.getElementById('menu-preview');
    const zoomLevel = document.querySelector('.zoom-level');
    
    if (preview) {
        preview.style.transform = `scale(${currentZoom})`;
    }
    
    if (zoomLevel) {
        zoomLevel.textContent = `${Math.round(currentZoom * 100)}%`;
    }
}

/**
 * メニュープレビューの生成
 */
function generateMenuPreview() {
    const preview = document.getElementById('menu-preview');
    if (!preview) return;
    
    const selectedWineData = getSelectedWinesData();
    const sortedWines = sortWines(selectedWineData);
    const restaurantInfo = JSON.parse(localStorage.getItem('restaurantInfo') || '{}');
    
    preview.innerHTML = generateMenuHTML(sortedWines, restaurantInfo);
}

/**
 * 選択されたワインデータの取得
 */
function getSelectedWinesData() {
    return wineData.filter(wine => selectedWines.includes(wine.id));
}

/**
 * ワインのソート
 */
function sortWines(wines) {
    switch (menuSettings.sortOrder) {
        case 'price-asc':
            return wines.sort((a, b) => a.price - b.price);
        case 'price-desc':
            return wines.sort((a, b) => b.price - a.price);
        case 'popularity':
            return wines.sort((a, b) => b.stock - a.stock); // 在庫数を人気の指標として使用
        case 'custom':
            return menuSettings.customOrder.map(id => wines.find(wine => wine.id === id)).filter(Boolean);
        case 'type-price':
        default:
            return wines.sort((a, b) => {
                if (a.type !== b.type) {
                    const typeOrder = ['sparkling', 'white', 'rose', 'red'];
                    return typeOrder.indexOf(a.type) - typeOrder.indexOf(b.type);
                }
                return a.price - b.price;
            });
    }
}

/**
 * メニューHTMLの生成
 */
function generateMenuHTML(wines, restaurantInfo) {
    const templateClass = `template-${selectedTemplate}`;
    
    return `
        <div class="menu-page ${templateClass}">
            ${generateMenuHeader(restaurantInfo)}
            ${generateWineList(wines)}
            ${generateMenuFooter(restaurantInfo)}
        </div>
    `;
}

/**
 * メニューヘッダーの生成
 */
function generateMenuHeader(restaurantInfo) {
    return `
        <div class="menu-header">
            <h1 class="restaurant-name">${restaurantInfo.name || 'Restaurant Name'}</h1>
            ${restaurantInfo.subtitle ? `<div class="restaurant-subtitle">${restaurantInfo.subtitle}</div>` : ''}
            <h2 class="menu-title">${restaurantInfo.menuTitle || 'Wine Selection'}</h2>
            ${restaurantInfo.menuDescription ? `<div class="menu-description">${restaurantInfo.menuDescription}</div>` : ''}
        </div>
    `;
}

/**
 * ワインリストの生成
 */
function generateWineList(wines) {
    const winesByType = groupWinesByType(wines);
    
    return Object.entries(winesByType).map(([type, typeWines]) => {
        const typeTitle = getWineTypeTitle(type);
        const wineItems = typeWines.map(wine => generateWineItem(wine)).join('');
        
        return `
            <div class="wine-section">
                <h3 class="wine-type-title">${typeTitle}</h3>
                <div class="wine-items">
                    ${wineItems}
                </div>
            </div>
        `;
    }).join('');
}

/**
 * ワインを種類別にグループ化
 */
function groupWinesByType(wines) {
    const grouped = {};
    wines.forEach(wine => {
        if (!grouped[wine.type]) {
            grouped[wine.type] = [];
        }
        grouped[wine.type].push(wine);
    });
    return grouped;
}

/**
 * ワイン種類のタイトルを取得
 */
function getWineTypeTitle(type) {
    const titles = {
        'sparkling': 'スパークリングワイン',
        'white': '白ワイン',
        'rose': 'ロゼワイン',
        'red': '赤ワイン'
    };
    return titles[type] || type;
}

/**
 * 個別ワインアイテムの生成
 */
function generateWineItem(wine) {
    const displayOptions = menuSettings.displayOptions;
    
    let details = [];
    if (displayOptions.includes('origin')) details.push(wine.origin);
    if (displayOptions.includes('vintage')) details.push(`${wine.vintage}年`);
    if (displayOptions.includes('grape')) details.push(wine.grape);
    
    const detailsText = details.join(' | ');
    
    return `
        <div class="wine-item">
            <div class="wine-main">
                <div class="wine-name">${wine.name}</div>
                <div class="wine-price">¥${wine.price.toLocaleString()}</div>
            </div>
            ${detailsText ? `<div class="wine-details">${detailsText}</div>` : ''}
            ${generateSommiaComment(wine)}
        </div>
    `;
}

/**
 * Sommiaコメントの生成
 */
function generateSommiaComment(wine) {
    const includeSommiaComments = document.getElementById('include-sommia-comments')?.checked;
    if (!includeSommiaComments) return '';
    
    const comments = {
        1: '深みのある味わいで、肉料理との相性が抜群です。',
        2: 'フレッシュで爽やかな酸味が特徴的な一本です。',
        3: '華やかな泡立ちで、特別な日の乾杯にぴったりです。',
        4: 'まろやかで飲みやすく、様々な料理に合わせやすいワインです。',
        5: 'エレガントな香りと濃厚な味わいが楽しめます。',
        6: '力強い味わいと長い余韻が印象的な逸品です。',
        7: 'ミネラル感豊かで、魚料理との相性が素晴らしいです。'
    };
    
    const comment = comments[wine.id];
    if (!comment) return '';
    
    return `<div class="sommia-comment">🍷 Sommia: ${comment}</div>`;
}

/**
 * メニューフッターの生成
 */
function generateMenuFooter(restaurantInfo) {
    const includeSommiaBranding = document.getElementById('include-sommia-branding')?.checked;
    
    return `
        <div class="menu-footer">
            ${restaurantInfo.address ? `<div class="restaurant-address">${restaurantInfo.address}</div>` : ''}
            ${restaurantInfo.phone ? `<div class="restaurant-phone">${restaurantInfo.phone}</div>` : ''}
            <div class="menu-date">更新日: ${document.getElementById('menu-date')?.value || new Date().toLocaleDateString('ja-JP')}</div>
            ${includeSommiaBranding ? '<div class="sommia-branding">🍷 Powered by Sommia AI</div>' : ''}
        </div>
    `;
}

/**
 * PDFダウンロード機能
 */
function downloadMenuPDF() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // メニューの内容をPDFに変換（簡易実装）
    const menuElement = document.getElementById('menu-preview');
    
    // html2canvasが利用できる場合の実装（実際の環境では追加のライブラリが必要）
    // html2canvas(menuElement).then(canvas => {
    //     const imgData = canvas.toDataURL('image/png');
    //     pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
    //     pdf.save('wine-menu.pdf');
    // });
    
    // 簡易実装：テキストベースのPDF生成
    generateTextBasedPDF(pdf);
}

/**
 * テキストベースのPDF生成
 */
function generateTextBasedPDF(pdf) {
    const restaurantInfo = JSON.parse(localStorage.getItem('restaurantInfo') || '{}');
    const selectedWineData = getSelectedWinesData();
    const sortedWines = sortWines(selectedWineData);
    
    let yPosition = 30;
    
    // ヘッダー
    pdf.setFontSize(20);
    pdf.text(restaurantInfo.name || 'Restaurant Name', 105, yPosition, { align: 'center' });
    yPosition += 15;
    
    pdf.setFontSize(16);
    pdf.text(restaurantInfo.menuTitle || 'Wine Selection', 105, yPosition, { align: 'center' });
    yPosition += 20;
    
    // ワインリスト
    const winesByType = groupWinesByType(sortedWines);
    
    Object.entries(winesByType).forEach(([type, typeWines]) => {
        pdf.setFontSize(14);
        pdf.text(getWineTypeTitle(type), 20, yPosition);
        yPosition += 10;
        
        typeWines.forEach(wine => {
            pdf.setFontSize(12);
            pdf.text(`${wine.name}`, 25, yPosition);
            pdf.text(`¥${wine.price.toLocaleString()}`, 180, yPosition, { align: 'right' });
            yPosition += 6;
            
            if (menuSettings.displayOptions.includes('origin')) {
                pdf.setFontSize(10);
                pdf.text(`${wine.origin} | ${wine.vintage}年`, 30, yPosition);
                yPosition += 5;
            }
            
            yPosition += 3;
            
            // ページの終わりに近づいたら新しいページを追加
            if (yPosition > 270) {
                pdf.addPage();
                yPosition = 30;
            }
        });
        
        yPosition += 5;
    });
    
    // フッター
    pdf.setFontSize(10);
    if (restaurantInfo.address) {
        pdf.text(restaurantInfo.address, 105, 280, { align: 'center' });
    }
    if (restaurantInfo.phone) {
        pdf.text(restaurantInfo.phone, 105, 285, { align: 'center' });
    }
    
    pdf.save('wine-menu.pdf');
}

/**
 * 印刷機能
 */
function printMenu() {
    const printWindow = window.open('', '_blank');
    const menuHTML = document.getElementById('menu-preview').innerHTML;
    
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Wine Menu</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .menu-page { max-width: 210mm; margin: 0 auto; }
                .restaurant-name { font-size: 24px; text-align: center; margin-bottom: 10px; }
                .menu-title { font-size: 20px; text-align: center; margin-bottom: 20px; }
                .wine-section { margin-bottom: 30px; }
                .wine-type-title { font-size: 18px; border-bottom: 2px solid #333; margin-bottom: 15px; }
                .wine-item { margin-bottom: 15px; }
                .wine-main { display: flex; justify-content: space-between; font-weight: bold; }
                .wine-details { font-size: 12px; color: #666; margin-top: 2px; }
                .sommia-comment { font-size: 11px; color: #8B4513; font-style: italic; margin-top: 3px; }
                .menu-footer { margin-top: 40px; text-align: center; font-size: 12px; }
                @media print {
                    body { margin: 0; }
                    .menu-page { margin: 0; }
                }
            </style>
        </head>
        <body>
            ${menuHTML}
        </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
}

/**
 * 生成完了処理
 */
function completeGeneration() {
    // 設定の保存
    const saveAsTemplate = document.getElementById('save-as-template')?.checked;
    const autoUpdateMenu = document.getElementById('auto-update-menu')?.checked;
    
    if (saveAsTemplate) {
        saveMenuTemplate();
    }
    
    if (autoUpdateMenu) {
        localStorage.setItem('autoUpdateMenu', 'true');
    }
    
    // 完了統計の更新
    document.getElementById('final-wine-count').textContent = selectedWines.length;
    document.getElementById('final-template').textContent = getTemplateDisplayName(selectedTemplate);
    
    // 完了モーダルを表示
    const modal = document.getElementById('completion-modal');
    if (modal) {
        modal.classList.add('active');
    }
}

/**
 * メニューテンプレートの保存
 */
function saveMenuTemplate() {
    const template = {
        selectedWines: selectedWines,
        menuSettings: menuSettings,
        selectedTemplate: selectedTemplate,
        restaurantInfo: JSON.parse(localStorage.getItem('restaurantInfo') || '{}'),
        createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('savedMenuTemplate', JSON.stringify(template));
}

/**
 * テンプレート表示名の取得
 */
function getTemplateDisplayName(template) {
    const names = {
        'classic': 'クラシック',
        'modern': 'モダン',
        'elegant': 'エレガント',
        'bistro': 'ビストロ'
    };
    return names[template] || template;
}

// AIシミュレーター用のメッセージ追加
if (typeof aiDialogue !== 'undefined') {
    aiDialogue.myCellar = aiDialogue.myCellar || {};
    aiDialogue.myCellar.menuGeneration = () => '素敵なワインメニューを作成しましょう！お店の雰囲気に合わせたデザインテンプレートをご用意しました。';
}