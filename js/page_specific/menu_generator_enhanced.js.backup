// メニュー生成機能の価格設定と他社ワイン管理

class MenuGeneratorEnhanced {
    constructor() {
        this.selectedWines = [];
        this.externalWines = [];
        this.currentStep = 1;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.loadWineData();
        this.renderStep1();
    }
    
    setupEventListeners() {
        // 価格設定関連
        document.getElementById('apply-markup')?.addEventListener('click', () => this.showMarkupModal());
        document.getElementById('enable-all-glass')?.addEventListener('click', () => this.toggleAllGlass(true));
        document.getElementById('disable-all-glass')?.addEventListener('click', () => this.toggleAllGlass(false));
        
        // 他社ワイン関連
        document.getElementById('add-external-wine')?.addEventListener('click', () => this.showExternalWineModal());
        document.getElementById('save-external-wine')?.addEventListener('click', () => this.saveExternalWine());
        
        // マークアップモーダル
        document.getElementById('apply-markup-confirm')?.addEventListener('click', () => this.applyMarkup());
        document.querySelectorAll('input[name="markup-method"]').forEach(radio => {
            radio.addEventListener('change', () => this.updateMarkupMethod());
        });
        document.getElementById('markup-percent')?.addEventListener('input', () => this.updateMarkupPreview());
        document.getElementById('markup-amount')?.addEventListener('input', () => this.updateMarkupPreview());
        
        // 他社ワインモーダル
        document.getElementById('external-glass-available')?.addEventListener('change', (e) => {
            const glassPriceGroup = document.querySelector('.glass-price-group');
            glassPriceGroup.style.display = e.target.checked ? 'block' : 'none';
        });
        
        // モーダル閉じる
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                this.closeModal(modal.id);
            });
        });
        
        // ステップナビゲーション
        this.setupStepNavigation();
    }
    
    setupStepNavigation() {
        document.querySelectorAll('.btn-next').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const nextStep = parseInt(e.target.dataset.next);
                if (this.validateCurrentStep()) {
                    this.goToStep(nextStep);
                }
            });
        });
        
        document.querySelectorAll('.btn-prev').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const prevStep = parseInt(e.target.dataset.prev);
                this.goToStep(prevStep);
            });
        });
    }
    
    loadWineData() {
        // 実際のアプリケーションではAPIから取得
        this.wineDatabase = {
            1: { id: 1, name: 'キャンティ クラシコ リゼルヴァ', type: 'red', origin: 'イタリア', purchasePrice: 4000 },
            2: { id: 2, name: 'ソーヴィニヨン・ブラン', type: 'white', origin: 'ニュージーランド', purchasePrice: 3500 },
            3: { id: 3, name: 'プロセッコ', type: 'sparkling', origin: 'イタリア', purchasePrice: 3000 },
            4: { id: 4, name: 'メルロー', type: 'red', origin: 'チリ', purchasePrice: 3000 },
            5: { id: 5, name: 'シャルドネ', type: 'white', origin: 'カリフォルニア', purchasePrice: 3500 },
            6: { id: 6, name: 'バローロ', type: 'red', origin: 'イタリア', purchasePrice: 6000 },
            7: { id: 7, name: 'プイィ・フュメ', type: 'white', origin: 'フランス', purchasePrice: 5000 }
        };
    }
    
    renderStep1() {
        const grid = document.getElementById('wine-selection-grid');
        if (!grid) return;
        
        const winesHtml = Object.values(this.wineDatabase).map(wine => `
            <div class="wine-selection-card" data-wine-id="${wine.id}">
                <div class="wine-selection-checkbox">
                    <input type="checkbox" id="wine-${wine.id}" value="${wine.id}">
                    <label for="wine-${wine.id}"></label>
                </div>
                <div class="wine-selection-info">
                    <div class="wine-type-indicator ${wine.type}"></div>
                    <div class="wine-details">
                        <h4>${wine.name}</h4>
                        <p>${this.getWineTypeText(wine.type)} | ${wine.origin}</p>
                        <div class="wine-purchase-price">仕入価格: ¥${wine.purchasePrice.toLocaleString()}</div>
                    </div>
                </div>
            </div>
        `).join('');
        
        grid.innerHTML = winesHtml;
        
        // チェックボックスイベント
        grid.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => this.updateWineSelection());
        });
    }
    
    updateWineSelection() {
        const checkboxes = document.querySelectorAll('#wine-selection-grid input[type="checkbox"]:checked');
        this.selectedWines = Array.from(checkboxes).map(cb => parseInt(cb.value));
        
        document.getElementById('selected-wine-count').textContent = this.selectedWines.length;
        document.getElementById('step1-next').disabled = this.selectedWines.length === 0;
        
        // ステップ2の価格設定画面を更新
        this.renderPricingStep();
    }
    
    renderPricingStep() {
        const pricingList = document.getElementById('wine-pricing-list');
        if (!pricingList) return;
        
        if (this.selectedWines.length === 0) {
            pricingList.innerHTML = '<div class="no-data-text">ワインを選択してください</div>';
            return;
        }
        
        const pricingHtml = this.selectedWines.map(wineId => {
            const wine = this.wineDatabase[wineId];
            const defaultBottlePrice = wine.purchasePrice * 2; // デフォルト2倍
            const defaultGlassPrice = Math.round(defaultBottlePrice / 5); // ボトル価格の1/5
            
            return `
                <div class="wine-pricing-card" data-wine-id="${wineId}">
                    <div class="wine-pricing-header">
                        <div class="wine-type-indicator ${wine.type}"></div>
                        <div class="wine-pricing-info">
                            <h4>${wine.name}</h4>
                            <div class="wine-origin">${wine.origin} | 仕入価格: ¥${wine.purchasePrice.toLocaleString()}</div>
                        </div>
                    </div>
                    <div class="wine-pricing-controls">
                        <div class="pricing-group">
                            <h5>ボトル価格</h5>
                            <div class="pricing-row">
                                <span class="pricing-label">販売価格:</span>
                                <div class="input-group">
                                    <span class="input-prefix">¥</span>
                                    <input type="number" class="form-input bottle-price" value="${defaultBottlePrice}" min="0">
                                </div>
                            </div>
                        </div>
                        <div class="pricing-group">
                            <h5>グラス提供</h5>
                            <div class="glass-toggle">
                                <input type="checkbox" id="glass-${wineId}" class="glass-checkbox">
                                <label for="glass-${wineId}">グラスでも提供</label>
                            </div>
                            <div class="glass-controls">
                                <div class="pricing-row">
                                    <span class="pricing-label">グラス価格:</span>
                                    <div class="input-group">
                                        <span class="input-prefix">¥</span>
                                        <input type="number" class="form-input glass-price" value="${defaultGlassPrice}" min="0" disabled>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
        pricingList.innerHTML = pricingHtml;
        
        // グラス提供チェックボックスのイベント
        pricingList.querySelectorAll('.glass-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const card = e.target.closest('.wine-pricing-card');
                const glassControls = card.querySelector('.glass-controls');
                const glassPriceInput = card.querySelector('.glass-price');
                
                if (e.target.checked) {
                    glassControls.classList.add('enabled');
                    glassPriceInput.disabled = false;
                } else {
                    glassControls.classList.remove('enabled');
                    glassPriceInput.disabled = true;
                }
            });
        });
    }
    
    toggleAllGlass(enable) {
        document.querySelectorAll('.glass-checkbox').forEach(checkbox => {
            checkbox.checked = enable;
            checkbox.dispatchEvent(new Event('change'));
        });
    }
    
    showMarkupModal() {
        this.showModal('markup-modal');
        this.updateMarkupPreview();
    }
    
    updateMarkupMethod() {
        const method = document.querySelector('input[name="markup-method"]:checked').value;
        const percentageGroup = document.getElementById('markup-percentage-group');
        const fixedGroup = document.getElementById('markup-fixed-group');
        
        if (method === 'percentage') {
            percentageGroup.style.display = 'block';
            fixedGroup.style.display = 'none';
        } else {
            percentageGroup.style.display = 'none';
            fixedGroup.style.display = 'block';
        }
        
        this.updateMarkupPreview();
    }
    
    updateMarkupPreview() {
        const method = document.querySelector('input[name="markup-method"]:checked')?.value;
        const exampleCost = 4000;
        let resultPrice;
        
        if (method === 'percentage') {
            const percent = parseInt(document.getElementById('markup-percent').value) || 200;
            resultPrice = Math.round(exampleCost * percent / 100);
        } else {
            const amount = parseInt(document.getElementById('markup-amount').value) || 3000;
            resultPrice = exampleCost + amount;
        }
        
        document.getElementById('markup-preview-price').textContent = `¥${resultPrice.toLocaleString()}`;
    }
    
    applyMarkup() {
        const method = document.querySelector('input[name="markup-method"]:checked').value;
        const percent = parseInt(document.getElementById('markup-percent').value) || 200;
        const amount = parseInt(document.getElementById('markup-amount').value) || 3000;
        
        document.querySelectorAll('.wine-pricing-card').forEach(card => {
            const wineId = parseInt(card.dataset.wineId);
            const wine = this.wineDatabase[wineId];
            const bottlePriceInput = card.querySelector('.bottle-price');
            const glassPriceInput = card.querySelector('.glass-price');
            
            let newBottlePrice;
            if (method === 'percentage') {
                newBottlePrice = Math.round(wine.purchasePrice * percent / 100);
            } else {
                newBottlePrice = wine.purchasePrice + amount;
            }
            
            bottlePriceInput.value = newBottlePrice;
            glassPriceInput.value = Math.round(newBottlePrice / 5);
        });
        
        this.closeModal('markup-modal');
    }
    
    showExternalWineModal() {
        document.getElementById('external-wine-form').reset();
        document.querySelector('.glass-price-group').style.display = 'none';
        this.showModal('external-wine-modal');
    }
    
    saveExternalWine() {
        const name = document.getElementById('external-wine-name').value.trim();
        const type = document.getElementById('external-wine-type').value;
        const origin = document.getElementById('external-wine-origin').value.trim();
        const bottlePrice = parseInt(document.getElementById('external-bottle-price').value);
        const glassAvailable = document.getElementById('external-glass-available').checked;
        const glassPrice = parseInt(document.getElementById('external-glass-price').value) || 0;
        const description = document.getElementById('external-wine-description').value.trim();
        
        if (!name || !bottlePrice) {
            alert('ワイン名とボトル価格は必須です。');
            return;
        }
        
        const externalWine = {
            id: Date.now(),
            name,
            type,
            origin: origin || '産地未指定',
            bottlePrice,
            glassAvailable,
            glassPrice: glassAvailable ? glassPrice : 0,
            description,
            isExternal: true
        };
        
        this.externalWines.push(externalWine);
        this.renderExternalWinesList();
        this.closeModal('external-wine-modal');
    }
    
    renderExternalWinesList() {
        const list = document.getElementById('external-wines-list');
        if (!list) return;
        
        if (this.externalWines.length === 0) {
            list.innerHTML = `
                <div class="no-external-wines">
                    <div class="no-data-icon">🍷</div>
                    <div class="no-data-text">他社ワインが追加されていません</div>
                    <div class="no-data-subtext">「ワインを追加」ボタンから他社ワインを追加できます</div>
                </div>
            `;
            return;
        }
        
        const winesHtml = this.externalWines.map(wine => `
            <div class="external-wine-card" data-wine-id="${wine.id}">
                <div class="external-wine-info">
                    <h4>${wine.name}</h4>
                    <div class="external-wine-meta">
                        <span class="wine-type-indicator ${wine.type}"></span>
                        <span>${this.getWineTypeText(wine.type)}</span>
                        <span>|</span>
                        <span>${wine.origin}</span>
                    </div>
                    <div class="external-wine-pricing">
                        <span>ボトル: ¥${wine.bottlePrice.toLocaleString()}</span>
                        ${wine.glassAvailable ? `<span>| グラス: ¥${wine.glassPrice.toLocaleString()}</span>` : ''}
                    </div>
                    ${wine.description ? `<div class="wine-description">${wine.description}</div>` : ''}
                </div>
                <div class="external-wine-actions">
                    <button class="btn btn-sm btn-outline-secondary" onclick="menuGenerator.editExternalWine(${wine.id})">編集</button>
                    <button class="btn btn-sm btn-light" onclick="menuGenerator.removeExternalWine(${wine.id})">削除</button>
                </div>
            </div>
        `).join('');
        
        list.innerHTML = winesHtml;
    }
    
    removeExternalWine(wineId) {
        if (confirm('この他社ワインを削除しますか？')) {
            this.externalWines = this.externalWines.filter(wine => wine.id !== wineId);
            this.renderExternalWinesList();
        }
    }
    
    editExternalWine(wineId) {
        const wine = this.externalWines.find(w => w.id === wineId);
        if (!wine) return;
        
        // フォームに現在の値を設定
        document.getElementById('external-wine-name').value = wine.name;
        document.getElementById('external-wine-type').value = wine.type;
        document.getElementById('external-wine-origin').value = wine.origin;
        document.getElementById('external-bottle-price').value = wine.bottlePrice;
        document.getElementById('external-glass-available').checked = wine.glassAvailable;
        document.getElementById('external-glass-price').value = wine.glassPrice;
        document.getElementById('external-wine-description').value = wine.description;
        
        // グラス価格フィールドの表示/非表示
        const glassPriceGroup = document.querySelector('.glass-price-group');
        glassPriceGroup.style.display = wine.glassAvailable ? 'block' : 'none';
        
        // 編集モードとして保存ボタンを変更
        const saveButton = document.getElementById('save-external-wine');
        saveButton.textContent = '更新';
        saveButton.onclick = () => this.updateExternalWine(wineId);
        
        this.showModal('external-wine-modal');
    }
    
    updateExternalWine(wineId) {
        const wine = this.externalWines.find(w => w.id === wineId);
        if (!wine) return;
        
        const name = document.getElementById('external-wine-name').value.trim();
        const bottlePrice = parseInt(document.getElementById('external-bottle-price').value);
        
        if (!name || !bottlePrice) {
            alert('ワイン名とボトル価格は必須です。');
            return;
        }
        
        // ワイン情報を更新
        wine.name = name;
        wine.type = document.getElementById('external-wine-type').value;
        wine.origin = document.getElementById('external-wine-origin').value.trim() || '産地未指定';
        wine.bottlePrice = bottlePrice;
        wine.glassAvailable = document.getElementById('external-glass-available').checked;
        wine.glassPrice = wine.glassAvailable ? (parseInt(document.getElementById('external-glass-price').value) || 0) : 0;
        wine.description = document.getElementById('external-wine-description').value.trim();
        
        this.renderExternalWinesList();
        this.closeModal('external-wine-modal');
        
        // 保存ボタンを元に戻す
        const saveButton = document.getElementById('save-external-wine');
        saveButton.textContent = '追加';
        saveButton.onclick = () => this.saveExternalWine();
    }
    
    goToStep(stepNumber) {
        // 現在のステップを非表示
        document.querySelectorAll('.step-content').forEach(step => {
            step.style.display = 'none';
        });
        
        // 指定のステップを表示
        const targetStep = document.getElementById(`step-${stepNumber}`);
        if (targetStep) {
            targetStep.style.display = 'block';
        }
        
        // プログレスステップの更新
        document.querySelectorAll('.progress-steps .step').forEach(step => {
            step.classList.remove('active');
        });
        
        const activeStep = document.querySelector(`[data-step="${stepNumber}"]`);
        if (activeStep) {
            activeStep.classList.add('active');
        }
        
        this.currentStep = stepNumber;
        
        // ステップ固有の処理
        if (stepNumber === 2) {
            this.renderPricingStep();
        } else if (stepNumber === 3) {
            this.renderExternalWinesList();
        }
    }
    
    validateCurrentStep() {
        switch (this.currentStep) {
            case 1:
                return this.selectedWines.length > 0;
            case 2:
                // 価格が全て設定されているかチェック
                const bottlePrices = document.querySelectorAll('.bottle-price');
                return Array.from(bottlePrices).every(input => parseInt(input.value) > 0);
            default:
                return true;
        }
    }
    
    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    getWineTypeText(type) {
        const typeMap = {
            'red': '赤ワイン',
            'white': '白ワイン',
            'sparkling': 'スパークリング',
            'rose': 'ロゼワイン'
        };
        return typeMap[type] || type;
    }
}

// グローバル変数として設定
let menuGenerator;

// 初期化
document.addEventListener('DOMContentLoaded', function() {
    menuGenerator = new MenuGeneratorEnhanced();
});