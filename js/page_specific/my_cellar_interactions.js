/**
 * マイセラーページの機能を制御するスクリプト
 */

// ページ読み込み時に実行
document.addEventListener('DOMContentLoaded', function() {
    // ビュー切り替え機能の初期化
    initializeViewToggle();
    
    // モーダル機能の初期化
    initializeSaleModal();
    
    // フィルタリング機能の初期化
    initializeFilters();
    
    // 補充ボタンの初期化
    initializeReplenishButtons();
});

/**
 * ビュー切り替え機能の初期化
 */
function initializeViewToggle() {
    const gridViewBtn = document.getElementById('grid-view-btn');
    const listViewBtn = document.getElementById('list-view-btn');
    const wineContainer = document.querySelector('.wine-container');
    
    if (!gridViewBtn || !listViewBtn || !wineContainer) return;
    
    // ローカルストレージから表示設定を取得
    const savedView = localStorage.getItem('wine-view-preference');
    if (savedView === 'list') {
        wineContainer.classList.remove('view-grid');
        gridViewBtn.classList.remove('active');
        listViewBtn.classList.add('active');
    }
    
    // グリッドビューボタンクリック時
    gridViewBtn.addEventListener('click', function() {
        wineContainer.classList.add('view-grid');
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
        localStorage.setItem('wine-view-preference', 'grid');
    });
    
    // リストビューボタンクリック時
    listViewBtn.addEventListener('click', function() {
        wineContainer.classList.remove('view-grid');
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
        localStorage.setItem('wine-view-preference', 'list');
    });
}

/**
 * 売上記録モーダルの初期化
 */
function initializeSaleModal() {
    // 売上ボタンのクリックイベント
    const saleButtons = document.querySelectorAll('.btn-record-sale');
    const saleModal = document.getElementById('sale-modal');
    const cancelSale = document.getElementById('cancel-sale');
    const confirmSale = document.getElementById('confirm-sale');
    const modalClose = document.querySelector('.modal-close');
    
    if (!saleModal) return;
    
    // ワインデータのサンプル（実際はAPIなどから取得）
    const wineData = {
        '1': { name: 'キャンティ クラシコ リゼルヴァ', price: 8000 },
        '2': { name: 'ソーヴィニヨン・ブラン', price: 7000 },
        '3': { name: 'プロセッコ', price: 6000 },
        '4': { name: 'メルロー', price: 6000 },
        '5': { name: 'シャルドネ', price: 7000 },
        '6': { name: 'バローロ', price: 12000 },
        '7': { name: 'プイィ・フュメ', price: 10000 }
    };
    
    // 売上ボタンのイベント設定
    saleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const wineId = this.getAttribute('data-wine-id');
            const wine = wineData[wineId];
            
            // モーダルにデータを設定
            document.getElementById('sale-wine-id').value = wineId;
            document.getElementById('sale-wine-name').value = wine.name;
            document.getElementById('sale-price').value = wine.price;
            
            // 日付に今日の日付を設定
            const today = new Date();
            document.getElementById('sale-date').value = formatDate(today);
            
            // モーダルを表示
            saleModal.classList.add('active');
        });
    });
    
    // モーダルを閉じる
    function closeModal() {
        saleModal.classList.remove('active');
    }
    
    // キャンセルボタン
    if (cancelSale) {
        cancelSale.addEventListener('click', closeModal);
    }
    
    // 閉じるボタン
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    // 確定ボタン
    if (confirmSale) {
        confirmSale.addEventListener('click', function() {
            // 売上記録の処理（実際はAPIなどに送信）
            alert('売上を記録しました');
            closeModal();
            
            // ページをリロード（実際はAJAXなどで部分更新）
            setTimeout(() => {
                location.reload();
            }, 500);
        });
    }
    
    // モーダル外クリックで閉じる
    window.addEventListener('click', function(event) {
        if (event.target === saleModal) {
            closeModal();
        }
    });
}

/**
 * フィルタリング機能の初期化
 */
function initializeFilters() {
    const applyFiltersBtn = document.getElementById('apply-filters');
    const resetFiltersBtn = document.getElementById('reset-filters');
    const wineTypeFilter = document.getElementById('wine-type-filter');
    const stockStatusFilter = document.getElementById('stock-status-filter');
    const searchInput = document.getElementById('search-wine');
    
    if (!applyFiltersBtn || !resetFiltersBtn) return;
    
    // フィルター適用ボタン
    applyFiltersBtn.addEventListener('click', function() {
        applyFilters();
    });
    
    // リセットボタン
    resetFiltersBtn.addEventListener('click', function() {
        if (wineTypeFilter) wineTypeFilter.value = 'all';
        if (stockStatusFilter) stockStatusFilter.value = 'all';
        if (searchInput) searchInput.value = '';
        
        applyFilters();
    });
    
    // フィルターの適用
    function applyFilters() {
        const wineType = wineTypeFilter ? wineTypeFilter.value : 'all';
        const stockStatus = stockStatusFilter ? stockStatusFilter.value : 'all';
        const searchText = searchInput ? searchInput.value.toLowerCase() : '';
        
        // フィルタリング処理（実際のデータベースクエリに置き換える）
        console.log('フィルター適用:', {
            wineType: wineType,
            stockStatus: stockStatus,
            searchText: searchText
        });
        
        // フィルタリングの代わりにアラートを表示（モックアップ用）
        alert(`フィルター適用:\nワインタイプ: ${wineType}\n在庫状況: ${stockStatus}\n検索キーワード: ${searchText}`);
    }
}

/**
 * 補充ボタンの初期化
 */
function initializeReplenishButtons() {
    const replenishButtons = document.querySelectorAll('.btn-replenish');
    
    // ワインデータのサンプル（実際はAPIなどから取得）
    const wineData = {
        '1': { name: 'キャンティ クラシコ リゼルヴァ', price: 8000 },
        '2': { name: 'ソーヴィニヨン・ブラン', price: 7000 },
        '3': { name: 'プロセッコ', price: 6000 },
        '4': { name: 'メルロー', price: 6000 },
        '5': { name: 'シャルドネ', price: 7000 },
        '6': { name: 'バローロ', price: 12000 },
        '7': { name: 'プイィ・フュメ', price: 10000 }
    };
    
    replenishButtons.forEach(button => {
        button.addEventListener('click', function() {
            const wineId = this.getAttribute('data-wine-id');
            const wine = wineData[wineId];
            
            // 設定したワインをURLパラメータに追加して補充発注ページへ遷移
            window.location.href = `../orders/replenish_order.html?wine_id=${wineId}&wine_name=${encodeURIComponent(wine.name)}`;
        });
    });
}

/**
 * 日付フォーマット関数
 * @param {Date} date - 日付オブジェクト
 * @returns {string} YYYY-MM-DD形式の日付文字列
 */
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}