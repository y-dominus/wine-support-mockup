/**
 * ワインメニュー提案ページ用JavaScript - 統合版
 */

document.addEventListener('DOMContentLoaded', function() {
    // ワインデータ（実際のシステムではAPIから取得）
    const wineProposalData = {
        title: 'バランスセレクション',
        description: 'お店の特色に合わせた、バランスの取れたワインセレクション。様々なお料理と相性良く、幅広いお客様にお楽しみいただけます。',
        wines: {
            red: [
                {
                    name: 'キャンティ・クラシコ リゼルヴァ',
                    origin: 'イタリア / トスカーナ',
                    vintage: '2019',
                    description: 'サンジョヴェーゼ主体',
                    tastingNotes: 'チェリーとスパイスの香り、エレガントなタンニン',
                    bottlePrice: 6000,
                    glassPrice: 900,
                    costPrice: 2800,
                    quantity: 3,
                    id: 1,
                    type: 'red'
                },
                {
                    name: 'リオハ・グラン・レゼルヴァ',
                    origin: 'スペイン / リオハ',
                    vintage: '2016',
                    description: 'テンプラニーリョ主体',
                    tastingNotes: 'バニラとスパイス、長期熟成による複雑味',
                    bottlePrice: 9500,
                    glassPrice: 1400,
                    costPrice: 4500,
                    quantity: 2,
                    id: 4,
                    type: 'red'
                }
            ],
            white: [
                {
                    name: 'ソーヴィニヨン・ブラン',
                    origin: 'ニュージーランド / マールボロ',
                    vintage: '2023',
                    description: 'ソーヴィニヨン・ブラン100%',
                    tastingNotes: 'グレープフルーツとハーブの爽やかな香り',
                    bottlePrice: 5000,
                    glassPrice: 800,
                    costPrice: 2200,
                    quantity: 4,
                    id: 2,
                    type: 'white'
                },
                {
                    name: 'シャルドネ',
                    origin: 'オーストラリア / アデレード・ヒルズ',
                    vintage: '2022',
                    description: 'シャルドネ100%',
                    tastingNotes: '白桃とバターのアロマ、一部樽発酵',
                    bottlePrice: 5500,
                    glassPrice: 850,
                    costPrice: 2600,
                    quantity: 3,
                    id: 5,
                    type: 'white'
                }
            ],
            sparkling: [
                {
                    name: 'プロセッコ・ディ・ヴァルドッビアデーネ',
                    origin: 'イタリア / ヴェネト',
                    vintage: 'NV',
                    description: 'グレーラ主体',
                    tastingNotes: '洋梨と白い花の香り、エレガントな泡立ち',
                    bottlePrice: 4000,
                    glassPrice: 650,
                    costPrice: 1800,
                    quantity: 2,
                    id: 3,
                    type: 'sparkling'
                },
                {
                    name: 'ランブルスコ・ディ・ソルバーラ',
                    origin: 'イタリア / エミリア・ロマーニャ',
                    vintage: '2022',
                    description: 'ランブルスコ100%',
                    tastingNotes: 'チェリーの香り、軽やかな赤いスパークリング',
                    bottlePrice: 4500,
                    glassPrice: 700,
                    costPrice: 2000,
                    quantity: 2,
                    id: 6,
                    type: 'sparkling'
                }
            ]
        },
        pairings: [
            {
                dish: '🥩 牛フィレ肉のグリル',
                wine: 'キャンティ・クラシコ リゼルヴァ',
                wineOrigin: 'イタリア / トスカーナ',
                description: 'しっかりとした肉の旨味に、サンジョヴェーゼの上品な酸味とタンニンが絶妙にマッチ',
                reason: 'なぜこのペアリング？',
                explanation: 'キャンティのエレガントな酸味が肉の脂を切り、タンニンが肉の旨味を引き立てます。トスカーナの伝統的な組み合わせで、相性は抜群です。'
            },
            {
                dish: '🐟 白身魚のカルパッチョ',
                wine: 'ソーヴィニヨン・ブラン',
                wineOrigin: 'ニュージーランド / マールボロ',
                description: '魚の繊細な味わいに、ハーブとシトラスの香りが爽やかなアクセントを加える',
                reason: 'なぜこのペアリング？',
                explanation: 'ソーヴィニヨン・ブランの爽やかな酸味とハーブ香が、カルパッチョのオリーブオイルとレモンを引き立て、魚の繊細さを損なわずに味わいを豊かにします。'
            },
            {
                dish: '🍕 マルゲリータピザ',
                wine: 'ランブルスコ・ディ・ソルバーラ',
                wineOrigin: 'イタリア / エミリア・ロマーニャ',
                description: 'トマトソースの酸味と軽やかな泡が見事に調和し、モッツァレラの味わいを引き立てる',
                reason: 'なぜこのペアリング？',
                explanation: 'ランブルスコの軽やかな泡立ちと程よい酸味が、ピザのトマトソースと絶妙にマッチ。イタリア・エミリア地方の伝統的な組み合わせです。'
            },
            {
                dish: '🦐 海老のアヒージョ',
                wine: 'シャルドネ',
                wineOrigin: 'オーストラリア / アデレード',
                description: 'オリーブオイルの芳醇さと樽香が重なり合い、海老の甘味を最大限に引き出す',
                reason: 'なぜこのペアリング？',
                explanation: 'シャルドネの一部樽発酵による複雑味が、アヒージョのガーリックとオリーブオイルの風味と調和し、海老の甘味を際立たせます。'
            }
        ]
    };

    // DOM要素の取得
    const sectionTabs = document.querySelectorAll('.wine-section-tabs .tab-button');
    const sectionContents = document.querySelectorAll('.wine-section-content');
    const menuPreview = document.getElementById('wine-menu-preview');
    const restaurantNameInput = document.getElementById('restaurant-name-input');
    const customizeBtn = document.getElementById('customize-btn');
    const previewBtn = document.getElementById('preview-btn');
    const downloadPdfBtn = document.getElementById('download-pdf-btn');
    const reasonsToggle = document.getElementById('reasonsToggle');
    const selectionContent = document.getElementById('selectionContent');
    const pairingGrid = document.getElementById('pairingGrid');
    const proposalTableBody = document.getElementById('proposalTableBody');
    const totalQuantityElement = document.getElementById('totalQuantity');
    const totalCostElement = document.getElementById('totalCost');
    const totalAmountElement = document.getElementById('totalAmount');
    const saveProposalBtn = document.getElementById('saveProposalBtn');
    const confirmOrderBtn = document.getElementById('confirmOrderBtn');

    // 現在の選択状態
    let currentSection = 'menu';
    let currentTemplate = 'classic';
    let menuSettings = {
        title: 'WINE LIST',
        description: '',
        address: ''
    };
    let displayOptions = {
        showVintage: true,
        showDescription: true,
        showTastingNotes: true,
        showPairing: false,
        showGlassPrice: true
    };

    // 全ワインデータ（フラットな配列として統合）
    let wineData = [];
    Object.values(wineProposalData.wines).forEach(categoryWines => {
        wineData = wineData.concat(categoryWines);
    });

    // 初期化
    init();

    function init() {
        // セクションタブイベントリスナー
        sectionTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const section = tab.dataset.section;
                selectSection(section);
            });
        });

        // メニュー関連のイベントリスナー
        if (restaurantNameInput) {
            restaurantNameInput.addEventListener('input', updateMenuPreview);
        }
        if (customizeBtn) {
            customizeBtn.addEventListener('click', openCustomizeModal);
        }
        if (previewBtn) {
            previewBtn.addEventListener('click', openPrintPreview);
        }
        if (downloadPdfBtn) {
            downloadPdfBtn.addEventListener('click', downloadPDF);
        }

        // その他のイベントリスナー
        if (reasonsToggle) {
            reasonsToggle.addEventListener('click', toggleReasons);
        }
        
        if (saveProposalBtn) {
            saveProposalBtn.addEventListener('click', saveProposal);
        }
        
        if (confirmOrderBtn) {
            confirmOrderBtn.addEventListener('click', confirmOrder);
        }

        // 初期表示
        updateMenuPreview();
        generatePairings();
        generateProposalTable();
        updateSummary();
    }

    function selectSection(section) {
        currentSection = section;
        
        // タブの状態更新
        sectionTabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.section === section) {
                tab.classList.add('active');
            }
        });

        // コンテンツの表示切り替え
        sectionContents.forEach(content => {
            content.style.display = 'none';
        });
        
        const targetContent = document.getElementById(`${section}-section`);
        if (targetContent) {
            targetContent.style.display = 'block';
        }

        // セクション固有の初期化
        if (section === 'report' && !document.querySelector('#salesChart').hasAttribute('data-initialized')) {
            setTimeout(initializeCharts, 100);
        }
    }

    function updateMenuPreview() {
        const restaurantName = restaurantNameInput.value || 'Restaurant Wine Berry';
        const menuHTML = generateMenuHTML(wineProposalData, restaurantName);
        menuPreview.innerHTML = menuHTML;
    }

    function generateMenuHTML(proposal, restaurantName) {
        const wineCategories = [
            { key: 'sparkling', title: 'SPARKLING WINES', icon: '🥂' },
            { key: 'white', title: 'WHITE WINES', icon: '🍷' },
            { key: 'red', title: 'RED WINES', icon: '🍇' }
        ];

        let menuHTML = `
            <div class="wine-menu-${currentTemplate}">
                <div class="menu-header">
                    <div class="restaurant-name">${restaurantName}</div>
                    <div class="menu-title">${menuSettings.title}</div>
                    <div class="qr-code-area">QR CODE</div>
                    ${menuSettings.description ? `<div class="menu-description">${menuSettings.description}</div>` : ''}
                    ${menuSettings.address ? `<div class="restaurant-address">${menuSettings.address}</div>` : ''}
                </div>
        `;

        wineCategories.forEach(category => {
            const wines = proposal.wines[category.key];
            if (wines && wines.length > 0) {
                menuHTML += `
                    <div class="wine-category">
                        <div class="category-header">
                            <span class="category-icon">${category.icon}</span>
                            <span class="category-title">${category.title}</span>
                        </div>
                        <table class="wine-menu-table">
                `;

                wines.forEach(wine => {
                    let wineDetailsHTML = '';
                    
                    // 産地とヴィンテージ
                    if (displayOptions.showVintage) {
                        wineDetailsHTML += `<div class="wine-origin">${wine.origin} ${wine.vintage}</div>`;
                    } else {
                        wineDetailsHTML += `<div class="wine-origin">${wine.origin}</div>`;
                    }
                    
                    // ワイン説明
                    if (displayOptions.showDescription) {
                        wineDetailsHTML += `<div class="wine-description">${wine.description}</div>`;
                    }
                    
                    // テイスティングノート
                    if (displayOptions.showTastingNotes) {
                        wineDetailsHTML += `<div class="wine-tasting-notes">${wine.tastingNotes}</div>`;
                    }
                    
                    // 価格表示
                    let priceHTML = '';
                    if (displayOptions.showGlassPrice && wine.glassPrice) {
                        priceHTML += `
                            <div class="wine-price glass">
                                <span class="price-label">Glass</span>
                                ¥${wine.glassPrice.toLocaleString()}
                            </div>
                        `;
                    }
                    priceHTML += `
                        <div class="wine-price bottle">
                            <span class="price-label">Bottle</span>
                            ¥${wine.bottlePrice.toLocaleString()}
                        </div>
                    `;

                    menuHTML += `
                        <tr class="wine-item-row">
                            <td class="wine-info">
                                <div class="wine-name">${wine.name}</div>
                                <div class="wine-details">
                                    ${wineDetailsHTML}
                                </div>
                            </td>
                            <td class="wine-prices">
                                ${priceHTML}
                            </td>
                        </tr>
                    `;
                });

                menuHTML += `
                        </table>
                    </div>
                `;
            }
        });

        menuHTML += `
                <div class="menu-footer">
                    <p>価格は税込表示です | Prices include tax</p>
                    <p>ワインのヴィンテージは変更になる場合がございます</p>
                </div>
            </div>
        `;

        return menuHTML;
    }

    function initializeCharts() {
        // Chart.jsが利用可能かチェック
        if (typeof Chart === 'undefined') {
            console.warn('Chart.js is not loaded');
            return;
        }

        // 売上構成比チャート
        const salesCanvas = document.getElementById('salesChart');
        if (salesCanvas && !salesCanvas.hasAttribute('data-initialized')) {
            const salesCtx = salesCanvas.getContext('2d');
            new Chart(salesCtx, {
                type: 'pie',
                data: {
                    labels: ['赤ワイン', '白ワイン', 'スパークリング'],
                    datasets: [{
                        data: [40, 45, 15],
                        backgroundColor: [
                            '#dc2626', // 赤
                            '#fbbf24', // 黄色
                            '#f472b6'  // ピンク
                        ],
                        borderWidth: 2,
                        borderColor: '#ffffff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 20,
                                font: {
                                    size: 14
                                }
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return context.label + ': ' + context.parsed + '%';
                                }
                            }
                        }
                    }
                }
            });
            salesCanvas.setAttribute('data-initialized', 'true');
        }

        // ワインタイプ別本数チャート
        const typeCanvas = document.getElementById('typeChart');
        if (typeCanvas && !typeCanvas.hasAttribute('data-initialized')) {
            const typeCtx = typeCanvas.getContext('2d');
            
            // ワインタイプ別の本数を計算
            const typeCounts = wineData.reduce((acc, wine) => {
                const type = wine.type;
                acc[type] = (acc[type] || 0) + wine.quantity;
                return acc;
            }, {});

            new Chart(typeCtx, {
                type: 'bar',
                data: {
                    labels: ['赤ワイン', '白ワイン', 'スパークリング'],
                    datasets: [{
                        label: '本数',
                        data: [
                            typeCounts.red || 0,
                            typeCounts.white || 0,
                            typeCounts.sparkling || 0
                        ],
                        backgroundColor: [
                            'rgba(220, 38, 38, 0.8)',
                            'rgba(251, 191, 36, 0.8)',
                            'rgba(244, 114, 182, 0.8)'
                        ],
                        borderColor: [
                            'rgb(220, 38, 38)',
                            'rgb(251, 191, 36)',
                            'rgb(244, 114, 182)'
                        ],
                        borderWidth: 2,
                        borderRadius: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1
                            }
                        }
                    }
                }
            });
            typeCanvas.setAttribute('data-initialized', 'true');
        }
    }

    function toggleReasons() {
        const isExpanded = selectionContent.classList.contains('expanded');
        
        if (isExpanded) {
            selectionContent.classList.remove('expanded');
            reasonsToggle.classList.remove('expanded');
            reasonsToggle.querySelector('span').textContent = '詳細を表示';
        } else {
            selectionContent.classList.add('expanded');
            reasonsToggle.classList.add('expanded');
            reasonsToggle.querySelector('span').textContent = '詳細を隠す';
        }
    }

    function generatePairings() {
        if (!pairingGrid) return;

        const pairingsHTML = wineProposalData.pairings.map(pairing => `
            <div class="pairing-card">
                <div class="pairing-header">
                    <div class="dish-icon">${pairing.dish.split(' ')[0]}</div>
                    <div class="pairing-details">
                        <div class="dish-name">${pairing.dish.substring(2)}</div>
                        <div class="wine-name">${pairing.wine}</div>
                        <div class="wine-origin">${pairing.wineOrigin}</div>
                    </div>
                    <div class="wine-icon">🍷</div>
                </div>
                <div class="pairing-description">
                    ${pairing.description}
                </div>
                <div class="pairing-reason">
                    <h4>${pairing.reason}</h4>
                    <p>${pairing.explanation}</p>
                </div>
            </div>
        `).join('');

        pairingGrid.innerHTML = pairingsHTML;
    }

    function generateProposalTable() {
        if (!proposalTableBody) return;

        const tableHTML = wineData.map((wine, index) => `
            <tr data-wine-id="${wine.id}">
                <td>${index + 1}</td>
                <td class="wine-cell">
                    <div class="wine-title">${wine.name}</div>
                    <div class="wine-subtitle">${wine.description}</div>
                </td>
                <td class="price-cell">¥${wine.costPrice.toLocaleString()}</td>
                <td class="price-cell">¥${wine.bottlePrice.toLocaleString()}</td>
                <td class="price-cell">¥${wine.glassPrice.toLocaleString()}</td>
                <td class="origin-cell">
                    ${wine.origin}<br>
                    <small>${wine.description}</small>
                </td>
                <td>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${wine.id}, -1)" ${wine.quantity <= 0 ? 'disabled' : ''}>-</button>
                        <input type="number" class="quantity-input" value="${wine.quantity}" min="0" max="99" onchange="setQuantity(${wine.id}, this.value)">
                        <button class="quantity-btn" onclick="updateQuantity(${wine.id}, 1)">+</button>
                    </div>
                </td>
                <td class="subtotal-cell">¥${(wine.costPrice * wine.quantity).toLocaleString()}</td>
            </tr>
        `).join('');

        proposalTableBody.innerHTML = tableHTML;
    }

    // グローバル関数として定義（onclickから呼び出されるため）
    window.updateQuantity = function(wineId, change) {
        const wine = wineData.find(w => w.id === wineId);
        if (wine) {
            wine.quantity = Math.max(0, wine.quantity + change);
            generateProposalTable();
            updateSummary();
        }
    };

    window.setQuantity = function(wineId, quantity) {
        const wine = wineData.find(w => w.id === wineId);
        if (wine) {
            wine.quantity = Math.max(0, parseInt(quantity) || 0);
            generateProposalTable();
            updateSummary();
        }
    };

    function updateSummary() {
        const totalQuantity = wineData.reduce((sum, wine) => sum + wine.quantity, 0);
        const totalCost = wineData.reduce((sum, wine) => sum + (wine.costPrice * wine.quantity), 0);
        const totalAmount = totalCost; // 仕入価格での計算

        if (totalQuantityElement) {
            totalQuantityElement.textContent = totalQuantity;
        }
        if (totalCostElement) {
            totalCostElement.textContent = `¥${totalCost.toLocaleString()}`;
        }
        if (totalAmountElement) {
            totalAmountElement.textContent = `¥${totalAmount.toLocaleString()}`;
        }
    }

    function saveProposal() {
        const proposalData = {
            wines: wineData.filter(wine => wine.quantity > 0),
            timestamp: new Date().toISOString(),
            totalQuantity: wineData.reduce((sum, wine) => sum + wine.quantity, 0),
            totalAmount: wineData.reduce((sum, wine) => sum + (wine.costPrice * wine.quantity), 0)
        };

        localStorage.setItem('wineProposal', JSON.stringify(proposalData));
        
        // 成功メッセージ表示
        showNotification('提案書を保存しました', 'success');
    }

    function confirmOrder() {
        const selectedWines = wineData.filter(wine => wine.quantity > 0);
        
        if (selectedWines.length === 0) {
            showNotification('注文するワインを選択してください', 'error');
            return;
        }

        // 注文確認モーダルを表示
        showOrderConfirmModal(selectedWines);
    }

    function showOrderConfirmModal(wines) {
        const modal = document.getElementById('order-confirm-modal');
        if (!modal) return;

        const orderSummary = document.getElementById('orderSummary');
        const totalQuantity = wines.reduce((sum, wine) => sum + wine.quantity, 0);
        const totalAmount = wines.reduce((sum, wine) => sum + (wine.costPrice * wine.quantity), 0);

        const summaryHTML = `
            <div class="order-summary-content">
                <h4>注文ワイン一覧</h4>
                <div class="order-items">
                    ${wines.map(wine => `
                        <div class="order-item">
                            <div class="item-details">
                                <strong>${wine.name}</strong>
                                <div class="item-info">${wine.origin} / ${wine.description}</div>
                            </div>
                            <div class="item-quantity">${wine.quantity}本</div>
                            <div class="item-price">¥${(wine.costPrice * wine.quantity).toLocaleString()}</div>
                        </div>
                    `).join('')}
                </div>
                <div class="order-total">
                    <div class="total-row">
                        <span>総本数：</span>
                        <span>${totalQuantity}本</span>
                    </div>
                    <div class="total-row">
                        <span>合計金額：</span>
                        <span>¥${totalAmount.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        `;

        orderSummary.innerHTML = summaryHTML;
        
        // モーダル表示
        modal.classList.add('active');
        modal.style.display = 'block';

        // 確定ボタンのイベント
        const finalConfirmBtn = document.getElementById('finalConfirmBtn');
        if (finalConfirmBtn) {
            finalConfirmBtn.onclick = function() {
                finalizeOrder(wines);
                closeModal(modal);
            };
        }

        // モーダル閉じるイベント
        const closeButtons = modal.querySelectorAll('.modal-close');
        closeButtons.forEach(btn => {
            btn.onclick = () => closeModal(modal);
        });
    }

    function finalizeOrder(wines) {
        const orderData = {
            wines: wines,
            orderDate: new Date().toISOString(),
            totalQuantity: wines.reduce((sum, wine) => sum + wine.quantity, 0),
            totalAmount: wines.reduce((sum, wine) => sum + (wine.costPrice * wine.quantity), 0),
            status: 'confirmed'
        };

        localStorage.setItem('confirmedOrder', JSON.stringify(orderData));
        
        showNotification('ご注文を確定いたしました', 'success');
        
        // 次のページへ遷移
        setTimeout(() => {
            window.location.href = '4_signup_form.html';
        }, 2000);
    }

    function closeModal(modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }

    function showNotification(message, type = 'info') {
        // 通知要素を作成
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">
                    ${type === 'success' ? '✓' : type === 'error' ? '⚠' : 'ℹ'}
                </span>
                <span class="notification-message">${message}</span>
            </div>
        `;

        // スタイルを設定
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

        document.body.appendChild(notification);

        // アニメーション
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // 自動削除
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // メニュー関連の既存機能
    function openCustomizeModal() {
        const modal = document.getElementById('customize-modal');
        if (modal) {
            // モーダル表示処理（既存のコードと同じ）
            modal.style.display = 'block';
            modal.classList.add('active');
            
            // 現在の設定を反映
            document.getElementById('menu-title').value = menuSettings.title;
            document.getElementById('menu-description').value = menuSettings.description;
            document.getElementById('restaurant-address').value = menuSettings.address;
            
            // テンプレート選択
            const currentTemplateRadio = document.querySelector(`input[name="template"][value="${currentTemplate}"]`);
            if (currentTemplateRadio) {
                currentTemplateRadio.checked = true;
            }
            
            // 表示オプション
            document.getElementById('show-vintage').checked = displayOptions.showVintage;
            document.getElementById('show-description').checked = displayOptions.showDescription;
            document.getElementById('show-tasting-notes').checked = displayOptions.showTastingNotes;
            document.getElementById('show-pairing').checked = displayOptions.showPairing;
            document.getElementById('show-glass-price').checked = displayOptions.showGlassPrice;
        }
    }

    function openPrintPreview() {
        window.print();
    }

    function downloadPDF() {
        // シンプルなPDF生成（実際の実装では html2canvas + jsPDF を使用）
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');
        
        pdf.setFontSize(20);
        pdf.text('Wine List', 105, 30, { align: 'center' });
        
        pdf.setFontSize(16);
        pdf.text(restaurantNameInput.value || 'Restaurant Wine Berry', 105, 45, { align: 'center' });
        
        let yPos = 70;
        
        Object.entries(wineProposalData.wines).forEach(([category, wines]) => {
            if (wines.length > 0) {
                pdf.setFontSize(14);
                pdf.text(category.toUpperCase() + ' WINES', 20, yPos);
                yPos += 10;
                
                wines.forEach(wine => {
                    pdf.setFontSize(11);
                    pdf.text(wine.name, 25, yPos);
                    pdf.text(`¥${wine.bottlePrice.toLocaleString()}`, 150, yPos);
                    yPos += 7;
                    
                    pdf.setFontSize(9);
                    pdf.text(wine.origin + ' ' + wine.vintage, 25, yPos);
                    yPos += 5;
                    
                    if (yPos > 270) {
                        pdf.addPage();
                        yPos = 20;
                    }
                });
                
                yPos += 10;
            }
        });
        
        pdf.save('wine-menu-proposal.pdf');
    }

    // カスタマイズモーダル関連の処理
    const customizeModal = document.getElementById('customize-modal');
    if (customizeModal) {
        // モーダルを閉じる処理
        const closeButtons = customizeModal.querySelectorAll('.modal-close');
        const overlay = customizeModal.querySelector('.modal-overlay');
        
        function closeCustomizeModal() {
            customizeModal.classList.remove('active');
            setTimeout(() => {
                customizeModal.style.display = 'none';
            }, 300);
        }
        
        closeButtons.forEach(btn => {
            btn.addEventListener('click', closeCustomizeModal);
        });
        
        if (overlay) {
            overlay.addEventListener('click', closeCustomizeModal);
        }

        // カスタマイズ適用処理
        const applyBtn = document.getElementById('apply-customization');
        if (applyBtn) {
            applyBtn.addEventListener('click', () => {
                // テンプレート変更
                const selectedTemplate = document.querySelector('input[name="template"]:checked');
                if (selectedTemplate) {
                    currentTemplate = selectedTemplate.value;
                }
                
                // メニュー設定更新
                menuSettings.title = document.getElementById('menu-title').value;
                menuSettings.description = document.getElementById('menu-description').value;
                menuSettings.address = document.getElementById('restaurant-address').value;
                
                // 表示オプション更新
                displayOptions.showVintage = document.getElementById('show-vintage').checked;
                displayOptions.showDescription = document.getElementById('show-description').checked;
                displayOptions.showTastingNotes = document.getElementById('show-tasting-notes').checked;
                displayOptions.showPairing = document.getElementById('show-pairing').checked;
                displayOptions.showGlassPrice = document.getElementById('show-glass-price').checked;
                
                // プレビュー更新
                updateMenuPreview();
                
                // モーダルを閉じる
                closeCustomizeModal();
            });
        }
    }

    // ESCキーでモーダルを閉じる
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                closeModal(activeModal);
            }
        }
    });

    // 「このワインで登録する」ボタンのイベント
    const acceptProposalBtn = document.getElementById('accept-proposal-btn');
    if (acceptProposalBtn) {
        acceptProposalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 現在の提案データを保存
            const finalProposal = {
                wines: wineData,
                pairings: wineProposalData.pairings,
                menuData: wineProposalData,
                menuSettings: menuSettings,
                template: currentTemplate,
                displayOptions: displayOptions,
                reportData: {
                    salesComposition: { red: 40, white: 45, sparkling: 15 },
                    totalWines: wineData.length,
                    totalQuantity: wineData.reduce((sum, wine) => sum + wine.quantity, 0)
                },
                timestamp: new Date().toISOString()
            };
            
            localStorage.setItem('finalWineProposal', JSON.stringify(finalProposal));
            
            // 次のページへ遷移
            window.location.href = '4_signup_form.html';
        });
    }
});

// CSS for notifications and modal styles（既存のスタイルを維持）
const notificationStyles = `
    .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    
    .notification-icon {
        font-size: 18px;
        font-weight: bold;
    }
    
    .notification-message {
        font-size: 14px;
        font-weight: 500;
    }
    
    .order-summary-content {
        max-height: 60vh;
        overflow-y: auto;
    }
    
    .order-items {
        margin: 20px 0;
    }
    
    .order-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 0;
        border-bottom: 1px solid #e5e7eb;
    }
    
    .order-item:last-child {
        border-bottom: none;
    }
    
    .item-details {
        flex: 1;
    }
    
    .item-info {
        font-size: 12px;
        color: #6b7280;
        margin-top: 4px;
    }
    
    .item-quantity {
        margin: 0 20px;
        font-weight: 600;
        color: #f97316;
    }
    
    .item-price {
        font-weight: 600;
        color: #1f2937;
        min-width: 100px;
        text-align: right;
    }
    
    .order-total {
        border-top: 2px solid #f97316;
        padding-top: 16px;
        margin-top: 20px;
    }
    
    .order-total .total-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
        font-size: 16px;
        font-weight: 600;
    }
    
    .order-total .total-row:last-child {
        color: #f97316;
        font-size: 18px;
        margin-bottom: 0;
    }
`;

// スタイルを追加
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);
