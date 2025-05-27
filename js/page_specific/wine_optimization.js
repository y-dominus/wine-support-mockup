/**
 * ワインリスト最適化機能のJavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('ワイン最適化ページが読み込まれました');
    
    // AIメッセージの表示
    try {
        if (typeof displayAiMessage === 'function') {
            displayAiMessage('wineOptimization', 'analysis', null, '#ai-message-area');
        }
    } catch (e) {
        console.error('AI message display error:', e);
    }
    
    // パフォーマンスチャートの初期化
    initializePerformanceChart();
    
    // モーダル機能の初期化
    initializeModal();
    
    // アクションボタンの初期化
    initializeActionButtons();
    
    console.log('ワイン最適化ページの初期化が完了しました');
});

/**
 * パフォーマンスチャートの初期化
 */
function initializePerformanceChart() {
    const ctx = document.getElementById('performance-chart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['シラーズ 2021', 'リースリング 2022', 'プロセッコ', 'バローロ', 'キャンティ', 'シャルドネ'],
            datasets: [{
                label: '月平均売上本数',
                data: [0, 1, 8, 6, 12, 5],
                backgroundColor: [
                    '#ffcdd2', // 削除推奨 - 薄い赤
                    '#ffcdd2', // 削除推奨 - 薄い赤
                    '#c8e6c9', // 良好 - 薄い緑
                    '#c8e6c9', // 良好 - 薄い緑
                    '#a5d6a7', // 優秀 - 緑
                    '#c8e6c9'  // 良好 - 薄い緑
                ],
                borderColor: [
                    '#d32f2f',
                    '#d32f2f',
                    '#388e3c',
                    '#388e3c',
                    '#2e7d32',
                    '#388e3c'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        afterLabel: function(context) {
                            const wineNames = ['シラーズ 2021', 'リースリング 2022', 'プロセッコ', 'バローロ', 'キャンティ', 'シャルドネ'];
                            const recommendations = [
                                '削除推奨: 売上なし', 
                                '削除推奨: 売上低迷', 
                                '良好: 安定した売上', 
                                '良好: 人気銘柄', 
                                '優秀: トップセラー', 
                                '良好: 定番人気'
                            ];
                            return recommendations[context.dataIndex];
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '売上本数'
                    }
                }
            }
        }
    });
}

/**
 * モーダル機能の初期化
 */
function initializeModal() {
    const modal = document.getElementById('execution-modal');
    const executeBtn = document.getElementById('execute-plan');
    const confirmBtn = document.getElementById('confirm-execution');
    const closeButtons = document.querySelectorAll('.modal-close');
    
    if (!modal || !executeBtn) {
        console.warn('モーダルまたは実行ボタンが見つかりません');
        return;
    }
    
    // モーダルを初期状態に設定
    modal.style.display = 'none';
    modal.classList.remove('active');
    
    // 実行ボタンクリック時
    executeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('実行ボタンがクリックされました');
        
        // モーダルを表示
        modal.style.display = 'block';
        modal.classList.add('active');
        
        // bodyのスクロールを無効化
        document.body.style.overflow = 'hidden';
    });
    
    // 確認ボタンクリック時
    if (confirmBtn) {
        confirmBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const gradualExecution = document.getElementById('gradual-execution')?.checked || false;
            const autoOrder = document.getElementById('auto-order')?.checked || false;
            
            console.log('最適化プランを実行します:', { gradualExecution, autoOrder });
            
            // モーダルを閉じる
            closeModal();
            
            // 最適化プランを実行
            executeOptimizationPlan(gradualExecution, autoOrder);
        });
    }
    
    // モーダルを閉じるボタン
    closeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            closeModal();
        });
    });
    
    // オーバーレイクリックで閉じる
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target.classList.contains('modal-overlay')) {
            closeModal();
        }
    });
    
    // ESCキーで閉じる
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    /**
     * モーダルを閉じる内部関数
     */
    function closeModal() {
        modal.style.display = 'none';
        modal.classList.remove('active');
        
        // bodyのスクロールを有効化
        document.body.style.overflow = '';
    }
}

/**
 * アクションボタンの初期化
 */
function initializeActionButtons() {
    const saveBtn = document.getElementById('save-analysis');
    const skipBtn = document.getElementById('skip-optimization');
    
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            saveAnalysisResults();
        });
    }
    
    if (skipBtn) {
        skipBtn.addEventListener('click', function() {
            skipOptimization();
        });
    }
}

/**
 * 最適化プランの実行
 */
function executeOptimizationPlan(gradual, autoOrder) {
    // 実行オプションに基づいた処理
    const executionType = gradual ? '段階的実行' : '一括実行';
    const orderType = autoOrder ? '自動発注あり' : '手動発注';
    
    // 実際の実装では、ここでAPIコールを行う
    console.log('最適化プラン実行:', {
        type: executionType,
        autoOrder: orderType,
        removeWines: ['シラーズ 2021', 'リースリング 2022'],
        addWines: ['ヴェルメンティーノ 2023', 'サンジョヴェーゼ 2021', 'アルバリーニョ 2023']
    });
    
    // 成功メッセージの表示
    showSuccessMessage('最適化プランの実行を開始しました！', 
        '進捗状況はダッシュボードで確認できます。実行完了まで1-2週間程度お待ちください。');
    
    // 少し遅延してからダッシュボードに戻る
    setTimeout(() => {
        window.location.href = 'dashboard.html?optimization_started=true';
    }, 3000);
}

/**
 * 分析結果の保存
 */
function saveAnalysisResults() {
    // 実際の実装では、ここでAPIコールを行う
    console.log('分析結果を保存しました');
    
    // ユーザーフィードバック
    showSuccessMessage('分析結果を保存しました', 
        'いつでもマイページから分析結果を確認できます。');
}

/**
 * 最適化のスキップ
 */
function skipOptimization() {
    if (confirm('今回の最適化提案をスキップしますか？\n次回は1ヶ月後に再提案いたします。')) {
        // 実際の実装では、ここでスキップ情報をAPIに送信
        console.log('最適化提案をスキップしました');
        
        // ダッシュボードに戻る
        window.location.href = 'dashboard.html?optimization_skipped=true';
    }
}

/**
 * 成功メッセージの表示
 */
function showSuccessMessage(title, message) {
    // 簡易的な成功メッセージ表示
    // 実際の実装では、より洗練されたトースト通知などを使用
    const messageHtml = `
        <div class="success-message" style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #4caf50, #66bb6a);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            max-width: 300px;
        ">
            <div style="font-weight: bold; margin-bottom: 0.5rem;">${title}</div>
            <div style="font-size: 0.9rem; opacity: 0.9;">${message}</div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', messageHtml);
    
    // 5秒後に自動削除
    setTimeout(() => {
        const messageEl = document.querySelector('.success-message');
        if (messageEl) {
            messageEl.remove();
        }
    }, 5000);
}

/**
 * AIシミュレーター用のセリフ定義を追加
 */
if (typeof aiDialogue !== 'undefined') {
    aiDialogue.wineOptimization = {
        analysis: () => `売上データを詳しく分析して、最適なワインリストの提案をお作りしました。データに基づいた戦略的な銘柄入替えで、売上向上を目指しましょう！`,
        
        recommendation: () => `3ヶ月のデータ分析から、2銘柄の削除と3銘柄の追加をお勧めします。この変更で約15%の売上向上が期待できますよ。`,
        
        execution: () => `段階的な実行がお勧めです。まず1-2銘柄から始めて、お客様の反応を見ながら調整していきましょう。私がしっかりサポートします！`
    };
}