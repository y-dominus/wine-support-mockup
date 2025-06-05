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
 * アクションボタンの初期化
 */
function initializeActionButtons() {
    const saveBtn = document.getElementById('save-analysis');
    const addToCartBtn = document.getElementById('add-to-cart');
    
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            saveAnalysisResults();
        });
    }
    
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function(e) {
            // リンクのデフォルト動作を防ぐ
            e.preventDefault();
            
            // 推奨銘柄をカートに追加
            addRecommendedWinesToCart();
            
            // 少し遅延してからカートページに移動
            setTimeout(() => {
                window.location.href = 'cart.html?optimization=true';
            }, 1000);
        });
    }
}

/**
 * 推奨銘柄をカートに追加
 */
function addRecommendedWinesToCart() {
    // 推奨銘柄のデータ
    const recommendedWines = [
        {
            name: 'ヴェルメンティーノ 2023',
            region: 'イタリア・サルデーニャ',
            type: '白ワイン',
            price: 6800,
            quantity: 6 // 初回推奨数量
        },
        {
            name: 'サンジョヴェーゼ 2021',
            region: 'イタリア・トスカーナ',
            type: '赤ワイン',
            price: 5200,
            quantity: 6
        },
        {
            name: 'アルバリーニョ 2023',
            region: 'スペイン・リアス・バイシャス',
            type: '白ワイン',
            price: 7500,
            quantity: 4
        }
    ];
    
    // ローカルストレージにカート情報を保存（実際の実装ではサーバーへAPIコール）
    try {
        let cart = JSON.parse(localStorage.getItem('wineCart') || '[]');
        
        recommendedWines.forEach(wine => {
            // 既存のアイテムかどうかチェック
            const existingIndex = cart.findIndex(item => item.name === wine.name);
            
            if (existingIndex >= 0) {
                // 既存の場合は数量を更新
                cart[existingIndex].quantity += wine.quantity;
            } else {
                // 新規追加
                cart.push({
                    ...wine,
                    id: Date.now() + Math.random(), // 簡易ID
                    addedFromOptimization: true // 最適化からの追加フラグ
                });
            }
        });
        
        localStorage.setItem('wineCart', JSON.stringify(cart));
        
        console.log('推奨銘柄をカートに追加しました:', recommendedWines);
        
        // 成功メッセージを表示
        showSuccessMessage('推奨銘柄をカートに追加しました！', 
            '発注管理画面で一括発注できます。');
        
    } catch (error) {
        console.error('カート追加エラー:', error);
        showErrorMessage('カートへの追加に失敗しました', 'しばらくしてから再度お試しください。');
    }
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
 * エラーメッセージの表示
 */
function showErrorMessage(title, message) {
    // 簡易的なエラーメッセージ表示
    const messageHtml = `
        <div class="error-message" style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #f44336, #e57373);
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
        const messageEl = document.querySelector('.error-message');
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
        
        cartAdd: () => `追加推奨銘柄をカートに追加しました！発注管理画面で一括発注できます。最初は少なめの数量から始めて、お客様の反応を見ながら調整していきましょう！`
    };
}