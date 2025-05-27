/**
 * 請求管理ページの機能を制御するスクリプト
 */

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', function() {
    // AIメッセージの表示
    try {
        if (typeof displayAiMessage === 'function') {
            // 現在のページに応じたAIメッセージを表示
            const pathname = window.location.pathname;
            if (pathname.includes('billing_management')) {
                displayAiMessage('account', 'billingManagement', null, '#ai-message-area');
            } else if (pathname.includes('invoice_detail')) {
                displayAiMessage('account', 'invoiceDetail', null, '#ai-message-area');
            }
        }
    } catch (e) {
        console.error('AI message display error:', e);
    }
    
    // 請求書ダウンロードボタン
    setupDownloadButtons();
    
    // フィルター機能
    setupFilters();
    
    // 当月詳細モーダル
    setupModals();
});

/**
 * ダウンロードボタンの設定
 */
function setupDownloadButtons() {
    // 請求書ダウンロードボタン
    const invoiceButtons = document.querySelectorAll('.btn-download-invoice');
    if (invoiceButtons) {
        invoiceButtons.forEach(button => {
            button.addEventListener('click', function() {
                const invoiceId = this.getAttribute('data-invoice-id') || getInvoiceIdFromUrl();
                downloadInvoice(invoiceId);
            });
        });
    }
    
    // 領収書ダウンロードボタン
    const receiptButtons = document.querySelectorAll('.btn-download-receipt');
    if (receiptButtons) {
        receiptButtons.forEach(button => {
            button.addEventListener('click', function() {
                const invoiceId = this.getAttribute('data-invoice-id');
                downloadReceipt(invoiceId);
            });
        });
    }
}

/**
 * 請求書をダウンロードする関数
 * @param {string} invoiceId - 請求書ID
 */
function downloadInvoice(invoiceId) {
    showProcessingModal();
    
    // 実際の実装ではAPIリクエストを送信してPDFを取得する
    // ここではモック処理のためのタイマーを設定
    setTimeout(() => {
        hideProcessingModal();
        showNotification(`請求書 ${invoiceId} をダウンロードしました`, 'success');
    }, 1500);
}

/**
 * 領収書をダウンロードする関数
 * @param {string} invoiceId - 請求書ID
 */
function downloadReceipt(invoiceId) {
    showProcessingModal();
    
    // 実際の実装ではAPIリクエストを送信してPDFを取得する
    // ここではモック処理のためのタイマーを設定
    setTimeout(() => {
        hideProcessingModal();
        showNotification(`領収書 ${invoiceId} をダウンロードしました`, 'success');
    }, 1500);
}

/**
 * フィルター機能の設定
 */
function setupFilters() {
    const filterButton = document.getElementById('apply-filter');
    if (filterButton) {
        filterButton.addEventListener('click', function() {
            const year = document.getElementById('billing-year').value;
            const status = document.getElementById('billing-status').value;
            
            // 実際の実装ではここでフィルタリング処理を行う
            // ここではモック通知を表示
            showNotification(`フィルター適用: ${year}年 / ステータス: ${status}`, 'info');
            
            // テーブルの行を模擬的にフィルタリング
            mockFilterTable(year, status);
        });
    }
}

/**
 * モックフィルタリング処理
 * @param {string} year - 年
 * @param {string} status - 支払い状況
 */
function mockFilterTable(year, status) {
    const tableRows = document.querySelectorAll('.billing-table tbody tr');
    if (!tableRows.length) return;
    
    tableRows.forEach(row => {
        // ステータスによるフィルタリング
        if (status !== 'all') {
            const statusCell = row.querySelector('.payment-status');
            if (statusCell) {
                const isPaid = statusCell.classList.contains('paid');
                
                if ((status === 'paid' && !isPaid) || (status === 'unpaid' && isPaid)) {
                    row.style.display = 'none';
                    return;
                }
            }
        }
        
        // 年によるフィルタリング（実際のデータベースクエリに置き換える）
        // ここではすべて表示
        row.style.display = '';
    });
}

/**
 * モーダル関連の設定
 */
function setupModals() {
    // 当月注文詳細モーダル
    const currentOrdersBtn = document.getElementById('view-current-orders');
    const currentOrdersModal = document.getElementById('current-orders-modal');
    
    if (currentOrdersBtn && currentOrdersModal) {
        currentOrdersBtn.addEventListener('click', function() {
            currentOrdersModal.classList.add('active');
        });
    }
    
    // モーダルを閉じるボタン
    const modalCloseButtons = document.querySelectorAll('.modal-close, .modal-close-btn');
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.modal.active').forEach(modal => {
                modal.classList.remove('active');
            });
        });
    });
    
    // モーダルの外側をクリックしたときにモーダルを閉じる
    window.addEventListener('click', function(event) {
        document.querySelectorAll('.modal.active').forEach(modal => {
            if (event.target === modal || event.target.classList.contains('modal-overlay')) {
                modal.classList.remove('active');
            }
        });
    });
}

/**
 * 処理中モーダルを表示する関数
 */
function showProcessingModal() {
    const processingModal = document.getElementById('processing-modal');
    if (processingModal) {
        processingModal.classList.add('active');
    }
}

/**
 * 処理中モーダルを非表示にする関数
 */
function hideProcessingModal() {
    const processingModal = document.getElementById('processing-modal');
    if (processingModal) {
        processingModal.classList.remove('active');
    }
}

/**
 * 通知を表示する関数
 * @param {string} message - 通知メッセージ
 * @param {string} type - 通知タイプ（success, info, warning, error）
 */
function showNotification(message, type = 'info') {
    // 実際の実装では通知コンポーネントを使用
    // ここではモック用のアラートを表示
    alert(message);
}

/**
 * URLから請求書IDを取得する関数
 * @returns {string|null} 請求書ID
 */
function getInvoiceIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

/**
 * AIシミュレーター用のセリフ定義（aiDialogue）に請求管理関連のセリフを追加
 * 注意: この関数は実際のaiDialogueオブジェクトが既に存在する前提で動作します
 */
function extendAiDialogueForBilling() {
    try {
        // グローバルなaiDialogueオブジェクトが存在する場合に拡張
        if (typeof aiDialogue === 'object') {
            // accountオブジェクト内に追加
            aiDialogue.account = aiDialogue.account || {};
            
            // 請求管理関連のセリフを追加
            aiDialogue.account.billingManagement = (userName = "ゲスト") => 
                `こちらでは請求情報の確認や請求書のダウンロードができます。お支払い期限は翌月末日となっております。何かご不明な点があれば、お気軽にお問い合わせくださいね。`;
                
            aiDialogue.account.invoiceDetail = (userName = "ゲスト") => 
                `請求書の詳細情報です。ご不明な点がございましたら、お気軽にお問い合わせください。請求書はPDFでダウンロードして保存することもできますよ。`;
        }
    } catch (e) {
        console.error('AI dialogue extension error:', e);
    }
}