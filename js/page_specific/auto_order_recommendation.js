/**
 * 自動発注レコメンド機能用JavaScript
 */

// ページ読み込み時に実行
document.addEventListener('DOMContentLoaded', function() {
    // 自動発注レコメンド機能の初期化
    initAutoOrderRecommendation();
    
    // AIチャットの初期化
    initializeAiChat();
    
    // 自動発注設定の初期化
    initializeAutoOrderForm();
});

/**
 * 自動発注レコメンド機能の初期化
 */
function initAutoOrderRecommendation() {
    // ワイン詳細ボタンのイベント設定
    const wineDetailButtons = document.querySelectorAll('.wine-detail-btn');
    const wineDetailModal = document.getElementById('wine-detail-modal');
    const wineDetailCloseButtons = document.querySelectorAll('.wine-detail-close');
    const addToOrderBtnModal = document.querySelector('.add-to-order-btn-modal');
    
    // ワインデータのサンプル（実際はデータベースから取得）
    const wineData = {
        '1': {
            name: 'キャンティ クラシコ リゼルヴァ',
            type: '赤ワイン',
            producer: 'フォンティノ',
            year: '2018年',
            grape: 'サンジョヴェーゼ100%',
            region: 'イタリア / トスカーナ',
            price: 8800,
            body: 'ミディアムボディ',
            farming: '有機栓培',
            aging: 'フレンチオーク樹齢24ヶ月',
            alcohol: '14.5%',
            taste: '辛口',
            stock: '残り2本',
            description: '赤い果実やドライハーブの香り。タンニンはしっかりとしているが滑らかで、酷くない酸味とバランスがとれている。2時間ほどデキャンターすると香りが開き、より一層食事とおいしく合う。'
        },
        '2': {
            name: 'ソーヴィニヨン・ブラン',
            type: '白ワイン',
            producer: 'クラウドベイ',
            year: '2022年',
            grape: 'ソーヴィニヨン・ブラン100%',
            region: 'ニュージーランド / マールボロ',
            price: 7000,
            body: 'ミディアムボディ',
            farming: '持続可能栓培',
            aging: 'ステンレスタンク6ヶ月',
            alcohol: '13.0%',
            taste: '辛口',
            stock: '残り1本',
            description: 'パッションフルーツやグレープフルーツのフレッシュな香り。ハーブのニュアンスもあり、バランスのとれた酸味と細かいミネラル感が特徴。魚料理やサラダと相性が良い。'
        },
        '3': {
            name: 'メルロー',
            type: '赤ワイン',
            producer: 'コンチャ・イ・トロ',
            year: '2020年',
            grape: 'メルロー100%',
            region: 'チリ / セントラルバレー',
            price: 6500,
            body: 'ミディアムボディ',
            farming: 'サスティナブル農法',
            aging: 'フレンチオーク樹齢12ヶ月',
            alcohol: '13.5%',
            taste: '中辛口',
            stock: '残り3本',
            description: 'プラムやブラックベリーの果実の香りに、スパイスのニュアンス。滑らかな口当たりでタンニンは積極的だが不快ではない。赤身の肉料理やチーズと相性が良い。'
        }
    };
    
    // ワイン詳細ボタンのクリックイベント
    wineDetailButtons.forEach(button => {
        button.addEventListener('click', function() {
            const wineId = this.getAttribute('data-wine-id');
            const wine = wineData[wineId];
            
            if (wine) {
                // モーダルにワイン詳細を表示
                document.getElementById('wine-detail-title').textContent = wine.name;
                document.getElementById('wine-detail-type').textContent = wine.type;
                document.getElementById('wine-detail-producer').textContent = wine.producer;
                document.getElementById('wine-detail-year').textContent = wine.year;
                document.getElementById('wine-detail-grape').textContent = wine.grape;
                document.getElementById('wine-detail-region').textContent = wine.region;
                document.getElementById('wine-detail-price').textContent = `¥${wine.price.toLocaleString()}`;
                document.getElementById('wine-detail-body').textContent = wine.body;
                document.getElementById('wine-detail-farming').textContent = wine.farming;
                document.getElementById('wine-detail-aging').textContent = wine.aging;
                document.getElementById('wine-detail-alcohol').textContent = wine.alcohol;
                document.getElementById('wine-detail-taste').textContent = wine.taste;
                document.getElementById('wine-detail-stock').textContent = wine.stock;
                document.getElementById('wine-detail-description').textContent = wine.description;
                
                // 発注ボタンにwineIdを設定
                addToOrderBtnModal.setAttribute('data-wine-id', wineId);
                
                // モーダルを表示
                wineDetailModal.style.display = 'flex';
            }
        });
    });
    
    // モーダルを閉じるボタンのイベント
    wineDetailCloseButtons.forEach(button => {
        button.addEventListener('click', function() {
            wineDetailModal.style.display = 'none';
        });
    });
    
    // モーダル外クリックで閉じる
    window.addEventListener('click', function(event) {
        if (event.target === wineDetailModal) {
            wineDetailModal.style.display = 'none';
        }
    });
    
    // モーダル内の発注へ追加ボタンのイベント
    addToOrderBtnModal.addEventListener('click', function() {
        const wineId = this.getAttribute('data-wine-id');
        const wine = wineData[wineId];
        
        if (wine) {
            alert(`${wine.name}を発注リストに追加しました。発注管理画面で確認できます。`);
            wineDetailModal.style.display = 'none';
        }
    });
    
    // レコメンドリストの発注へ追加ボタンのイベント
    const addToOrderButtons = document.querySelectorAll('.add-to-order-btn');
    addToOrderButtons.forEach(button => {
        button.addEventListener('click', function() {
            const wineId = this.getAttribute('data-wine-id');
            const wine = wineData[wineId];
            
            if (wine) {
                alert(`${wine.name}を発注リストに追加しました。発注管理画面で確認できます。`);
            }
        });
    });
    
    // スキップボタンのイベント
    const skipButton = document.querySelector('.skip-recommendation');
    if (skipButton) {
        skipButton.addEventListener('click', function() {
            const autoOrderSection = this.closest('.dashboard-section');
            if (autoOrderSection) {
                autoOrderSection.style.display = 'none';
                alert('自動発注レコメンドをスキップしました。次回の売上入力時まで非表示になります。');
            }
        });
    }
}

/**
 * AIチャットの初期化
 */
function initializeAiChat() {
    // ページ読み込み時にAIメッセージを表示
    setTimeout(() => {
        addChatMessage('autoOrder', 'introduction', null, '.ai-chat-body', false);
    }, 1000);
    
    // チャットフォームの初期化
    const chatForm = document.querySelector('.ai-chat-form');
    if (chatForm) {
        chatForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const inputField = this.querySelector('.ai-chat-input');
            if (!inputField || inputField.value.trim() === '') return;
            
            const userMessage = inputField.value.trim();
            
            // ユーザーメッセージを表示
            addChatMessage(null, null, userMessage, '.ai-chat-body', true);
            
            // 入力フィールドをクリア
            inputField.value = '';
            
            // AIの「考え中」表示
            const thinkingId = addAiThinking();
            
            // AIの応答を遅延表示
            setTimeout(() => {
                removeAiThinking(thinkingId);
                
                // メッセージの内容に応じた応答
                if (userMessage.toLowerCase().includes('設定') || userMessage.toLowerCase().includes('設定方法')) {
                    addChatMessage('autoOrder', 'setupGuide', null, '.ai-chat-body', false);
                } else if (userMessage.toLowerCase().includes('価格') || userMessage.toLowerCase().includes('料金')) {
                    addChatMessage('autoOrder', 'pricing', null, '.ai-chat-body', false);
                } else if (userMessage.toLowerCase().includes('停止') || userMessage.toLowerCase().includes('無効')) {
                    addChatMessage('autoOrder', 'disabled', null, '.ai-chat-body', false);
                } else {
                    addChatMessage('autoOrder', 'introduction', null, '.ai-chat-body', false);
                }
            }, 1500);
        });
    }
}

/**
 * 自動発注設定フォームの初期化
 */
function initializeAutoOrderForm() {
    // 自動発注設定の状態をチェック
    checkAutoOrderSettings();
    
    // 自動発注有効化ボタン
    const enableAutoOrderBtn = document.getElementById('enable-auto-order');
    if (enableAutoOrderBtn) {
        enableAutoOrderBtn.addEventListener('click', function() {
            // 自動発注を有効化
            localStorage.setItem('autoOrderEnabled', 'true');
            localStorage.setItem('autoOrderSetupDate', new Date().toISOString());
            
            // UIを更新
            updateAutoOrderUI(true);
            
            // Sommiaからのメッセージ
            setTimeout(() => {
                addChatMessage('autoOrder', 'enabled', null, '.ai-chat-body', false);
            }, 500);
        });
    }
    
    // 自動発注無効化ボタン
    const disableAutoOrderBtn = document.getElementById('disable-auto-order');
    if (disableAutoOrderBtn) {
        disableAutoOrderBtn.addEventListener('click', function() {
            if (confirm('自動発注機能を無効にしますか？')) {
                // 自動発注を無効化
                localStorage.setItem('autoOrderEnabled', 'false');
                
                // UIを更新
                updateAutoOrderUI(false);
                
                // Sommiaからのメッセージ
                setTimeout(() => {
                    addChatMessage('autoOrder', 'disabled', null, '.ai-chat-body', false);
                }, 500);
            }
        });
    }
    
    // 在庫闾値設定の保存ボタン
    const saveThresholdBtn = document.getElementById('save-threshold-settings');
    if (saveThresholdBtn) {
        saveThresholdBtn.addEventListener('click', function() {
            saveThresholdSettings();
        });
    }
    
    // 発注承認ボタン
    const approveOrderBtns = document.querySelectorAll('.approve-order-btn');
    approveOrderBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const orderId = this.getAttribute('data-order-id');
            approveAutoOrder(orderId);
        });
    });
    
    // 発注拒否ボタン
    const rejectOrderBtns = document.querySelectorAll('.reject-order-btn');
    rejectOrderBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const orderId = this.getAttribute('data-order-id');
            rejectAutoOrder(orderId);
        });
    });
}

/**
 * 自動発注設定の状態をチェック
 */
function checkAutoOrderSettings() {
    const isEnabled = localStorage.getItem('autoOrderEnabled') === 'true';
    updateAutoOrderUI(isEnabled);
    
    if (isEnabled) {
        // 保留中の発注をチェック
        checkPendingOrders();
    }
}

/**
 * 自動発注UIの更新
 * @param {boolean} isEnabled - 自動発注が有効かどうか
 */
function updateAutoOrderUI(isEnabled) {
    const statusIndicator = document.querySelector('.auto-order-status-indicator');
    const enableBtn = document.getElementById('enable-auto-order');
    const disableBtn = document.getElementById('disable-auto-order');
    const settingsSection = document.querySelector('.threshold-settings');
    
    if (statusIndicator) {
        statusIndicator.className = `auto-order-status-indicator ${isEnabled ? 'enabled' : 'disabled'}`;
        statusIndicator.textContent = isEnabled ? '自動発注: 有効' : '自動発注: 無効';
    }
    
    if (enableBtn) enableBtn.style.display = isEnabled ? 'none' : 'inline-block';
    if (disableBtn) disableBtn.style.display = isEnabled ? 'inline-block' : 'none';
    if (settingsSection) settingsSection.style.display = isEnabled ? 'block' : 'none';
}

/**
 * 在庫闾値設定の保存
 */
function saveThresholdSettings() {
    const thresholdInputs = document.querySelectorAll('.threshold-input');
    const thresholdSettings = {};
    
    thresholdInputs.forEach(input => {
        const wineId = input.getAttribute('data-wine-id');
        const threshold = parseInt(input.value) || 0;
        thresholdSettings[wineId] = threshold;
    });
    
    localStorage.setItem('autoOrderThresholds', JSON.stringify(thresholdSettings));
    
    // 成功メッセージを表示
    alert('在庫闾値設定を保存しました。');
    
    // Sommiaからのメッセージ
    setTimeout(() => {
        addChatMessage('autoOrder', 'setupComplete', null, '.ai-chat-body', false);
    }, 1000);
}

/**
 * 保留中の発注をチェック
 */
function checkPendingOrders() {
    const pendingOrders = JSON.parse(localStorage.getItem('pendingAutoOrders') || '[]');
    
    if (pendingOrders.length > 0) {
        // 保留中の発注がある場合の通知
        setTimeout(() => {
            addChatMessage('autoOrder', 'pendingOrders', pendingOrders.length, '.ai-chat-body', false);
        }, 2000);
    }
}

/**
 * 自動発注を承認
 * @param {string} orderId - 発注ID
 */
function approveAutoOrder(orderId) {
    // 保留中の発注から削除
    let pendingOrders = JSON.parse(localStorage.getItem('pendingAutoOrders') || '[]');
    pendingOrders = pendingOrders.filter(order => order.id !== orderId);
    localStorage.setItem('pendingAutoOrders', JSON.stringify(pendingOrders));
    
    // 承認済み発注に追加
    let approvedOrders = JSON.parse(localStorage.getItem('approvedAutoOrders') || '[]');
    approvedOrders.push({
        id: orderId,
        approvedAt: new Date().toISOString(),
        status: 'approved'
    });
    localStorage.setItem('approvedAutoOrders', JSON.stringify(approvedOrders));
    
    alert('発注を承認しました。');
    
    // UIを更新
    const orderItem = document.querySelector(`[data-order-id="${orderId}"]`).closest('.pending-order-item');
    if (orderItem) {
        orderItem.remove();
    }
    
    // Sommiaからのメッセージ
    setTimeout(() => {
        addChatMessage('orders', 'orderSuccess', null, '.ai-chat-body', false);
    }, 500);
}

/**
 * 自動発注を拒否
 * @param {string} orderId - 発注ID
 */
function rejectAutoOrder(orderId) {
    if (confirm('この発注を拒否しますか？')) {
        // 保留中の発注から削除
        let pendingOrders = JSON.parse(localStorage.getItem('pendingAutoOrders') || '[]');
        pendingOrders = pendingOrders.filter(order => order.id !== orderId);
        localStorage.setItem('pendingAutoOrders', JSON.stringify(pendingOrders));
        
        alert('発注を拒否しました。');
        
        // UIを更新
        const orderItem = document.querySelector(`[data-order-id="${orderId}"]`).closest('.pending-order-item');
        if (orderItem) {
            orderItem.remove();
        }
    }
}