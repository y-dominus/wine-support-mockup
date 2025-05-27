/**
 * ダッシュボード用JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // AIチャットの初期化
    initializeAiChat();
    
    // アラートアクションの初期化
    initializeAlertActions();
    
    // チャートの初期化
    initializeCharts();
    
    // ユーザーデータの復元
    restoreUserData();
});

/**
 * AIチャットの初期化
 */
function initializeAiChat() {
    const chatForm = document.querySelector('.ai-chat-form');
    if (!chatForm) return;
    
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
        
        // AIの応答を遅延表示（リアルなチャット体験のため）
        setTimeout(() => {
            // 「考え中」表示を削除
            removeAiThinking(thinkingId);
            
            // AIの応答を表示
            // メッセージの内容に応じて適切な応答を選択
            if (userMessage.toLowerCase().includes('在庫') || userMessage.toLowerCase().includes('ワイン')) {
                addChatMessage('myCellar', 'overview');
                
                // 提案チップを表示
                displaySuggestionChips(['在庫を確認する', '補充発注へ', 'ワインを探す']);
            } else if (userMessage.toLowerCase().includes('売上') || userMessage.toLowerCase().includes('レポート')) {
                addChatMessage('reports', 'salesReport');
                
                // 提案チップを表示
                displaySuggestionChips(['レポートを見る', '売れ筋ワインを確認']);
            } else if (userMessage.toLowerCase().includes('発注') || userMessage.toLowerCase().includes('注文')) {
                addChatMessage('orders', 'replenishOrder');
                
                // 提案チップを表示
                displaySuggestionChips(['補充発注へ', '発注履歴を確認']);
            } else {
                // デフォルトの応答
                addChatMessage('dashboard', 'greeting', localStorage.getItem('userName') || 'ゲスト');
                
                // 提案チップを表示
                displaySuggestionChips(['今日のおすすめは？', 'ワイン在庫を確認']);
            }
        }, 1000);
    });
    
    // 提案チップのクリックイベント
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('ai-suggestion-chip')) {
            const chipText = event.target.textContent;
            
            // ユーザーメッセージとして表示
            addChatMessage(null, null, chipText, '.ai-chat-body', true);
            
            // 提案チップを非表示
            const suggestionContainer = document.querySelector('.ai-suggestion-chips');
            if (suggestionContainer) {
                suggestionContainer.innerHTML = '';
            }
            
            // AIの「考え中」表示
            const thinkingId = addAiThinking();
            
            // AIの応答を遅延表示
            setTimeout(() => {
                // 「考え中」表示を削除
                removeAiThinking(thinkingId);
                
                // チップの内容に応じた処理
                if (chipText.includes('在庫を確認')) {
                    addChatMessage('myCellar', 'overview');
                    
                    // ページ遷移
                    setTimeout(() => {
                        window.location.href = 'my_cellar/my_cellar.html';
                    }, 1500);
                } else if (chipText.includes('補充発注')) {
                    addChatMessage('orders', 'replenishOrder');
                    
                    // ページ遷移
                    setTimeout(() => {
                        window.location.href = 'orders/replenish_order.html';
                    }, 1500);
                } else if (chipText.includes('ワインを探す') || chipText.includes('おすすめ')) {
                    addChatMessage('products', 'productList');
                    
                    // ページ遷移
                    setTimeout(() => {
                        window.location.href = 'products/product_list.html';
                    }, 1500);
                } else if (chipText.includes('レポート') || chipText.includes('売れ筋')) {
                    addChatMessage('reports', 'salesReport');
                    
                    // ページ遷移
                    setTimeout(() => {
                        window.location.href = 'reports/sales_report.html';
                    }, 1500);
                } else if (chipText.includes('発注履歴')) {
                    addChatMessage('orders', 'orderHistory');
                    
                    // ページ遷移
                    setTimeout(() => {
                        window.location.href = 'orders/order_history.html';
                    }, 1500);
                }
            }, 1000);
        }
    });
}

/**
 * 提案チップを表示
 * @param {Array} suggestions - 提案テキストの配列
 */
function displaySuggestionChips(suggestions) {
    const container = document.querySelector('.ai-suggestion-chips');
    if (!container) return;
    
    // コンテナをクリア
    container.innerHTML = '';
    
    // 提案チップを追加
    suggestions.forEach(suggestion => {
        const chip = document.createElement('div');
        chip.className = 'ai-suggestion-chip';
        chip.textContent = suggestion;
        container.appendChild(chip);
    });
}

/**
 * アラートアクションの初期化
 */
function initializeAlertActions() {
    // 補充ボタンのイベント処理
    const replenishButtons = document.querySelectorAll('.alert-action .btn');
    replenishButtons.forEach(button => {
        button.addEventListener('click', function() {
            window.location.href = 'orders/replenish_order.html';
        });
    });
    
    // ワインリスト最適化のイベント処理
    const skipOptimizationBtn = document.getElementById('skip-optimization');
    if (skipOptimizationBtn) {
        skipOptimizationBtn.addEventListener('click', function() {
            if (confirm('今回の最適化提案をスキップしますか？\n次回は1ヶ月後に再提案いたします。')) {
                // 最適化提案カードを非表示
                const optimizationCard = document.querySelector('.wine-optimization-card').closest('.dashboard-section');
                if (optimizationCard) {
                    optimizationCard.style.display = 'none';
                }
                
                // Sommiaからのメッセージを追加
                addChatMessage('wineOptimization', 'skipped', null, '.ai-chat-body', false);
            }
        });
    }
    
    // URLパラメータのチェック（最適化実行後のフィードバック）
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('optimization_started') === 'true') {
    // 最適化開始のフィードバックメッセージを表示
    setTimeout(() => {
    addChatMessage('wineOptimization', 'started', null, '.ai-chat-body', false);
    }, 1000);
    
    // URLパラメータをクリア
    window.history.replaceState({}, document.title, window.location.pathname);
        
                // 最適化進行中の表示を更新
                updateOptimizationProgress();
            }
            
            // 最適化スキップ後のフィードバック
            if (urlParams.get('optimization_skipped') === 'true') {
                setTimeout(() => {
                    addChatMessage('wineOptimization', 'skipped', null, '.ai-chat-body', false);
                }, 1000);
                
                // URLパラメータをクリア
                window.history.replaceState({}, document.title, window.location.pathname);
            }
            
            // ワインリスト最適化完了の確認
            if (urlParams.get('optimization_completed') === 'true') {
                setTimeout(() => {
                    addChatMessage('wineOptimization', 'completed', null, '.ai-chat-body', false);
                    
                    // 完了後の新しい売上データを表示
                    displayOptimizationResults();
                }, 1000);
                
                // URLパラメータをクリア
                window.history.replaceState({}, document.title, window.location.pathname);
            }
    
    // 自動発注の設定確認とイベント処理
    initializeAutoOrderSettings();
}

/**
 * 補充リストにワインを追加
 * @param {string} wineName - ワイン名
 */
function addToReplenishList(wineName) {
    let replenishList = JSON.parse(localStorage.getItem('replenishList') || '[]');
    
    // 既存のリストに追加
    if (!replenishList.includes(wineName)) {
        replenishList.push(wineName);
    }
    
    localStorage.setItem('replenishList', JSON.stringify(replenishList));
}

/**
 * チャートの初期化
 */
function initializeCharts() {
    // チャートの初期化処理
    // Chart.jsはHTMLに直接記述しているため、ここでは空にしておきます
}

/**
 * 自動発注の設定初期化
 */
function initializeAutoOrderSettings() {
    // 自動発注設定のチェック
    checkAutoOrderStatus();
    
    // 自動発注おすすめカードのイベント処理
    const autoOrderButton = document.querySelector('.auto-order-recommend .btn-primary');
    if (autoOrderButton) {
        autoOrderButton.addEventListener('click', function() {
            // 自動発注ページへ遷移
            window.location.href = 'orders/auto_order.html';
        });
    }
    
    // 自動発注おすすめカードの閉じるボタン
    const dismissAutoOrderBtn = document.querySelector('.auto-order-recommend .btn-secondary');
    if (dismissAutoOrderBtn) {
        dismissAutoOrderBtn.addEventListener('click', function() {
            const autoOrderCard = document.querySelector('.auto-order-recommend').closest('.dashboard-section');
            if (autoOrderCard) {
                autoOrderCard.style.display = 'none';
            }
            
            // 次回表示しないための設定を保存
            localStorage.setItem('autoOrderRecommendDismissed', Date.now().toString());
            
            // Sommiaからのメッセージ
            addChatMessage('autoOrder', 'dismissed', null, '.ai-chat-body', false);
        });
    }
}

/**
 * 自動発注状態のチェック
 */
function checkAutoOrderStatus() {
    const autoOrderEnabled = localStorage.getItem('autoOrderEnabled') === 'true';
    const lastDismissed = localStorage.getItem('autoOrderRecommendDismissed');
    
    // 自動発注が有効な場合の処理
    if (autoOrderEnabled) {
        displayAutoOrderStatus();
        checkPendingAutoOrders();
    }
    
    // おすすめカードの表示判定（1週間以内に閉じた場合は非表示）
    if (lastDismissed) {
        const oneWeekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
        if (parseInt(lastDismissed) > oneWeekAgo) {
            const autoOrderCard = document.querySelector('.auto-order-recommend');
            if (autoOrderCard) {
                autoOrderCard.closest('.dashboard-section').style.display = 'none';
            }
        }
    }
}

/**
 * 自動発注状態の表示
 */
function displayAutoOrderStatus() {
    const statusArea = document.querySelector('.auto-order-status');
    if (statusArea) {
        statusArea.innerHTML = `
            <div class="status-indicator active">
                <i class="icon-check"></i>
                <span>自動発注有効</span>
            </div>
        `;
    }
}

/**
 * 保留中の自動発注をチェック
 */
function checkPendingAutoOrders() {
    const pendingOrders = JSON.parse(localStorage.getItem('pendingAutoOrders') || '[]');
    
    if (pendingOrders.length > 0) {
        // 保留中の発注がある場合の通知
        setTimeout(() => {
            addChatMessage('autoOrder', 'pendingOrders', pendingOrders.length, '.ai-chat-body', false);
        }, 2000);
    }
}

/**
 * 最適化進行中の表示を更新
 */
function updateOptimizationProgress() {
    const optimizationCard = document.querySelector('.wine-optimization-card');
    if (optimizationCard) {
        // 進行中の表示に変更
        const cardContent = optimizationCard.querySelector('.card-content');
        if (cardContent) {
            cardContent.innerHTML = `
                <div class="optimization-progress">
                    <div class="progress-header">
                        <h3>📋 ワインリスト最適化実行中</h3>
                        <div class="progress-status">進行中...</div>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 25%;"></div>
                    </div>
                    <div class="progress-details">
                        <div class="progress-step active">
                            <span class="step-number">1</span>
                            <span class="step-text">準備フェーズ</span>
                        </div>
                        <div class="progress-step">
                            <span class="step-number">2</span>
                            <span class="step-text">発注フェーズ</span>
                        </div>
                        <div class="progress-step">
                            <span class="step-number">3</span>
                            <span class="step-text">実装フェーズ</span>
                        </div>
                        <div class="progress-step">
                            <span class="step-number">4</span>
                            <span class="step-text">完了</span>
                        </div>
                    </div>
                    <div class="estimated-completion">
                        予想完了日: ${getEstimatedCompletionDate()}
                    </div>
                </div>
            `;
        }
        
        // ボタンを非表示
        const cardActions = optimizationCard.querySelector('.card-actions');
        if (cardActions) {
            cardActions.style.display = 'none';
        }
    }
    
    // 進行状況を定期的に更新
    startOptimizationProgressUpdates();
}

/**
 * 最適化完了結果を表示
 */
function displayOptimizationResults() {
    const optimizationCard = document.querySelector('.wine-optimization-card');
    if (optimizationCard) {
        const cardContent = optimizationCard.querySelector('.card-content');
        if (cardContent) {
            cardContent.innerHTML = `
                <div class="optimization-completed">
                    <div class="completion-header">
                        <h3>✅ ワインリスト最適化完了</h3>
                        <div class="completion-date">完了日: ${new Date().toLocaleDateString('ja-JP')}</div>
                    </div>
                    <div class="results-summary">
                        <div class="result-item">
                            <div class="result-icon">📊</div>
                            <div class="result-content">
                                <div class="result-title">売上向上</div>
                                <div class="result-value">+18.5% (予想を上回る)</div>
                            </div>
                        </div>
                        <div class="result-item">
                            <div class="result-icon">🔄</div>
                            <div class="result-content">
                                <div class="result-title">在庫回転率</div>
                                <div class="result-value">1.8 → 2.4回/月</div>
                            </div>
                        </div>
                        <div class="result-item">
                            <div class="result-icon">🎆</div>
                            <div class="result-content">
                                <div class="result-title">達成率</div>
                                <div class="result-value">123% (目標を上回る)</div>
                            </div>
                        </div>
                    </div>
                    <div class="next-steps">
                        <h4>今後のアクション</h4>
                        <ul>
                            <li>新銘柄のパフォーマンス監視</li>
                            <li>3ヶ月後の次回最適化分析</li>
                            <li>スタッフフィードバック収集</li>
                        </ul>
                    </div>
                </div>
            `;
        }
        
        // アクションボタンを更新
        const cardActions = optimizationCard.querySelector('.card-actions');
        if (cardActions) {
            cardActions.innerHTML = `
                <button class="btn btn-outline-primary" onclick="window.location.href='wine_optimization.html'">
                    詳細レポートを見る
                </button>
                <button class="btn btn-primary" id="plan-next-optimization">
                    次回最適化をスケジュール
                </button>
            `;
            
            // 次回最適化ボタンのイベント
            const nextOptimizationBtn = document.getElementById('plan-next-optimization');
            if (nextOptimizationBtn) {
                nextOptimizationBtn.addEventListener('click', function() {
                    scheduleNextOptimization();
                });
            }
        }
    }
    
    // ダッシュボードの他の数値も更新
    updateDashboardMetrics();
}

/**
 * 最適化進行状況の定期更新を開始
 */
function startOptimizationProgressUpdates() {
    let progress = 25; // 初期進行率
    const progressInterval = setInterval(() => {
        progress += Math.random() * 15; // ランダムに進行
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            
            // 完了後にリロードして完了状態を表示
            setTimeout(() => {
                window.location.href = 'dashboard.html?optimization_completed=true';
            }, 2000);
        }
        
        // 進行バーを更新
        const progressFill = document.querySelector('.progress-fill');
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }
        
        // ステップ表示を更新
        updateProgressSteps(progress);
        
    }, 3000); // 3秒ごとに更新
}

/**
 * 進行ステップ表示を更新
 * @param {number} progress - 現在の進行率
 */
function updateProgressSteps(progress) {
    const steps = document.querySelectorAll('.progress-step');
    
    steps.forEach((step, index) => {
        const stepProgress = (index + 1) * 25;
        if (progress >= stepProgress) {
            step.classList.add('completed');
            step.classList.remove('active');
        } else if (progress >= stepProgress - 25) {
            step.classList.add('active');
            step.classList.remove('completed');
        } else {
            step.classList.remove('active', 'completed');
        }
    });
}

/**
 * 予想完了日を取得
 * @returns {string} 予想完了日
 */
function getEstimatedCompletionDate() {
    const now = new Date();
    const completionDate = new Date(now.getTime() + (14 * 24 * 60 * 60 * 1000)); // 2週間後
    return completionDate.toLocaleDateString('ja-JP');
}

/**
 * 次回最適化をスケジュール
 */
function scheduleNextOptimization() {
    // 3ヶ月後の日付を計算
    const nextDate = new Date();
    nextDate.setMonth(nextDate.getMonth() + 3);
    
    // スケジュールを保存
    localStorage.setItem('nextOptimizationDate', nextDate.toISOString());
    localStorage.setItem('optimizationScheduled', 'true');
    
    // 確認メッセージ
    alert(`次回のワインリスト最適化を${nextDate.toLocaleDateString('ja-JP')}にスケジュールしました。`);
    
    // Sommiaからのメッセージ
    setTimeout(() => {
        addChatMessage('wineOptimization', 'scheduled', nextDate.toLocaleDateString('ja-JP'), '.ai-chat-body', false);
    }, 500);
}

/**
 * ダッシュボードの数値を更新
 */
function updateDashboardMetrics() {
    // 売上数値を更新
    const salesMetric = document.querySelector('.metric-card .metric-value');
    if (salesMetric) {
        const currentSales = parseInt(salesMetric.textContent.replace(/[^\d]/g, ''));
        const newSales = Math.round(currentSales * 1.185); // 18.5%向上
        salesMetric.textContent = `¥${newSales.toLocaleString()}`;
    }
    
    // 在庫回転率を更新
    const turnoverMetrics = document.querySelectorAll('.metric-value');
    turnoverMetrics.forEach(metric => {
        if (metric.textContent.includes('回/月')) {
            metric.textContent = '2.4回/月';
        }
    });
}

/**
 * ユーザーデータの復元
 */
function restoreUserData() {
    // ユーザー名の復元
    const userName = localStorage.getItem('userName') || 'ゲスト';
    
    // AIメッセージ内のユーザー名を置換
    const aiMessageArea = document.getElementById('ai-message-area');
    if (aiMessageArea) {
        const aiText = aiMessageArea.querySelector('.ai-text');
        if (aiText) {
            const message = aiText.textContent;
            aiText.textContent = message.replace('ゲストさん', `${userName}さん`);
        }
    }
}