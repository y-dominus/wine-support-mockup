// 売上履歴ページのJavaScript

class SalesHistoryManager {
    constructor() {
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.currentPeriod = 'last3Months'; // 初期表示を「過去3ヶ月」に変更
        this.salesData = [];
        this.filteredData = [];
        
        this.init();
    }
    
    init() {
        this.loadSalesData();
        this.setupEventListeners();
        this.filterDataByPeriod();
        this.renderAll();
    }
    
    // 売上データの読み込み（localStorage + サンプルデータ）
    loadSalesData() {
        // localStorageから既存データを読み込み
        const storedData = localStorage.getItem('salesHistory');
        let salesHistory = storedData ? JSON.parse(storedData) : [];
        
        // サンプルデータがない場合や少ない場合は再生成
        if (salesHistory.length < 50) {
            salesHistory = this.generateSampleData();
            localStorage.setItem('salesHistory', JSON.stringify(salesHistory));
        }
        
        this.salesData = salesHistory;
    }
    
    // サンプルデータの生成
    generateSampleData() {
        const sampleData = [];
        const wines = [
            { id: 1, name: 'キャンティ クラシコ リゼルヴァ', price: 8000, type: 'red' },
            { id: 2, name: 'ソーヴィニョン・ブラン', price: 7000, type: 'white' },
            { id: 3, name: 'プロセッコ', price: 6000, type: 'sparkling' },
            { id: 4, name: 'メルロー', price: 6000, type: 'red' },
            { id: 5, name: 'シャルドネ', price: 7000, type: 'white' },
            { id: 6, name: 'ピノ・ノワール', price: 9000, type: 'red' },
            { id: 7, name: 'リースリング', price: 6500, type: 'white' },
            { id: 8, name: 'ロゼ・ドール', price: 5500, type: 'rose' },
            { id: 9, name: 'バローロ', price: 12000, type: 'red' },
            { id: 10, name: 'シャンパーニュ', price: 15000, type: 'sparkling' }
        ];
        
        // 過去90日のサンプルデータを生成（より多くのデータを確保）
        const today = new Date();
        for (let i = 0; i < 90; i++) {
            const salesDate = new Date(today);
            salesDate.setDate(today.getDate() - i);
            
            // 週末は売上が多い設定
            const isWeekend = salesDate.getDay() === 0 || salesDate.getDay() === 6;
            const itemCount = isWeekend ? Math.floor(Math.random() * 4) + 2 : Math.floor(Math.random() * 3) + 1;
            
            // 85%の確率で売上あり（より多くのデータを生成）
            if (Math.random() > 0.15) {
                const salesItems = [];
                const usedWines = new Set();
                
                for (let j = 0; j < itemCount; j++) {
                    let wine;
                    // 重複しないワインを選択
                    let attempts = 0;
                    do {
                        wine = wines[Math.floor(Math.random() * wines.length)];
                        attempts++;
                    } while (usedWines.has(wine.id) && attempts < 20); // 無限ループ防止
                    
                    if (!usedWines.has(wine.id)) {
                        usedWines.add(wine.id);
                        const quantity = Math.floor(Math.random() * 3) + 1;
                        
                        salesItems.push({
                            wineId: wine.id,
                            wineName: wine.name,
                            wineType: wine.type,
                            quantity: quantity,
                            price: wine.price,
                            subtotal: quantity * wine.price
                        });
                    }
                }
                
                if (salesItems.length > 0) { // アイテムがある場合のみデータを作成
                    const totalAmount = salesItems.reduce((sum, item) => sum + item.subtotal, 0);
                    const notes = [
                        '週末の特別コース',
                        'ワイン会イベント',
                        '記念日ディナー',
                        '常連様のご来店',
                        '新規のお客様',
                        'ビジネスディナー',
                        'カップルのお客様',
                        'グループでのお食事',
                        'お誕生日のお祝い',
                        'デートでご利用',
                        ''
                    ];
                    
                    sampleData.push({
                        id: `sales_${Date.now()}_${i}_${Math.random().toString(36).substr(2, 9)}`, // よりユニークID
                        date: salesDate.toISOString().split('T')[0],
                        items: salesItems,
                        totalAmount: totalAmount,
                        note: notes[Math.floor(Math.random() * notes.length)]
                    });
                }
            }
        }
        
        console.log(`生成された売上データ: ${sampleData.length}件`);
        return sampleData.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    
    // イベントリスナーの設定
    setupEventListeners() {
        // 期間フィルターボタン
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const period = e.target.dataset.period;
                this.handlePeriodChange(period);
            });
        });
        
        // カスタム期間の日付入力
        document.getElementById('start-date').addEventListener('change', () => {
            if (this.currentPeriod === 'custom') {
                this.filterDataByPeriod();
                this.renderAll();
            }
        });
        
        document.getElementById('end-date').addEventListener('change', () => {
            if (this.currentPeriod === 'custom') {
                this.filterDataByPeriod();
                this.renderAll();
            }
        });
        
        // 表示件数変更
        document.getElementById('items-per-page').addEventListener('change', (e) => {
            this.itemsPerPage = parseInt(e.target.value);
            this.currentPage = 1;
            this.renderTable();
            this.renderPagination();
        });
        
        // CSV出力
        document.getElementById('export-csv').addEventListener('click', () => {
            this.exportToCSV();
        });
        
        // ページネーション
        document.getElementById('prev-page').addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.renderTable();
                this.renderPagination();
            }
        });
        
        document.getElementById('next-page').addEventListener('click', () => {
            const totalPages = Math.ceil(this.getTableData().length / this.itemsPerPage);
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.renderTable();
                this.renderPagination();
            }
        });
        
        // モーダル関連
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', () => {
                this.closeModal();
            });
        });
        
        document.querySelector('.modal-overlay').addEventListener('click', () => {
            this.closeModal();
        });
    }
    
    // 期間変更ハンドラー
    handlePeriodChange(period) {
        // アクティブボタンの変更
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-period="${period}"]`).classList.add('active');
        
        // カスタム期間の表示/非表示
        const customDateRange = document.querySelector('.custom-date-range');
        if (period === 'custom') {
            customDateRange.style.display = 'flex';
        } else {
            customDateRange.style.display = 'none';
        }
        
        this.currentPeriod = period;
        this.currentPage = 1;
        this.filterDataByPeriod();
        this.renderAll();
    }
    
    // 期間によるデータフィルタリング
    filterDataByPeriod() {
        const today = new Date();
        let startDate, endDate;
        
        switch (this.currentPeriod) {
            case 'thisMonth':
                startDate = new Date(today.getFullYear(), today.getMonth(), 1);
                endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
                break;
            case 'lastMonth':
                startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
                endDate = new Date(today.getFullYear(), today.getMonth(), 0);
                break;
            case 'last3Months':
                startDate = new Date(today.getFullYear(), today.getMonth() - 2, 1);
                endDate = today;
                break;
            case 'custom':
                const startInput = document.getElementById('start-date').value;
                const endInput = document.getElementById('end-date').value;
                if (startInput && endInput) {
                    startDate = new Date(startInput);
                    endDate = new Date(endInput);
                    endDate.setHours(23, 59, 59, 999); // 終日まで含める
                } else {
                    this.filteredData = this.salesData;
                    return;
                }
                break;
            default:
                this.filteredData = this.salesData;
                return;
        }
        
        this.filteredData = this.salesData.filter(sale => {
            const saleDate = new Date(sale.date);
            return saleDate >= startDate && saleDate <= endDate;
        });
        
        console.log(`フィルタ後のデータ: ${this.filteredData.length}件`);
    }
    
    // 全体の描画
    renderAll() {
        this.renderSummary();
        this.renderAIAnalysis();
        this.renderTable();
        this.renderPagination();
    }
    
    // サマリーの描画
    renderSummary() {
        const totalSales = this.filteredData.reduce((sum, sale) => sum + sale.totalAmount, 0);
        const totalBottles = this.filteredData.reduce((sum, sale) => 
            sum + sale.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0);
        const salesDays = this.filteredData.length;
        const averageSale = salesDays > 0 ? Math.round(totalSales / salesDays) : 0;
        
        document.getElementById('total-sales').textContent = this.formatCurrency(totalSales);
        document.getElementById('total-bottles').textContent = `${totalBottles}本`;
        document.getElementById('average-sale').textContent = this.formatCurrency(averageSale);
        document.getElementById('sales-days').textContent = `${salesDays}日`;
    }
    
    // AI分析コメントの描画
    renderAIAnalysis() {
        const analysisContent = document.getElementById('ai-analysis-content');
        
        if (this.filteredData.length === 0) {
            analysisContent.innerHTML = '<p>この期間の売上データがありません。売上を入力して分析を開始しましょう。</p>';
            return;
        }
        
        const totalSales = this.filteredData.reduce((sum, sale) => sum + sale.totalAmount, 0);
        const totalBottles = this.filteredData.reduce((sum, sale) => 
            sum + sale.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0);
        const averagePerDay = Math.round(totalSales / this.filteredData.length);
        
        // ワイン種類別分析
        const wineTypes = {};
        this.filteredData.forEach(sale => {
            sale.items.forEach(item => {
                if (!wineTypes[item.wineType]) {
                    wineTypes[item.wineType] = { quantity: 0, amount: 0 };
                }
                wineTypes[item.wineType].quantity += item.quantity;
                wineTypes[item.wineType].amount += item.subtotal;
            });
        });
        
        const topWineType = Object.keys(wineTypes).length > 0 ? 
            Object.keys(wineTypes).reduce((a, b) => 
                wineTypes[a].quantity > wineTypes[b].quantity ? a : b) : null;
        
        const wineTypeNames = {
            red: '赤ワイン',
            white: '白ワイン',
            sparkling: 'スパークリング',
            rose: 'ロゼ'
        };
        
        let analysis = `
            <p>選択した期間の売上分析をお伝えします。</p>
            <p><span class="highlight">合計${this.formatCurrency(totalSales)}</span>の売上があり、
            <span class="highlight">${totalBottles}本</span>のワインが売れました。
            1日平均では<span class="highlight">${this.formatCurrency(averagePerDay)}</span>の売上です。</p>
        `;
        
        if (topWineType) {
            analysis += `<p>最も人気だったのは<span class="highlight">${wineTypeNames[topWineType]}</span>で、
            ${wineTypes[topWineType].quantity}本売れています。</p>`;
        }
        
        // 売上傾向のアドバイス
        if (averagePerDay >= 30000) {
            analysis += '<p>💡 優秀な売上です！この調子で高品質なワインの提案を続けましょう。</p>';
        } else if (averagePerDay >= 15000) {
            analysis += '<p>💡 良好な売上です。季節性やお客様の好みを分析して、さらなる向上を目指しましょう。</p>';
        } else {
            analysis += '<p>💡 売上向上のチャンスです。ワインペアリングの提案や季節に合った銘柄の充実を検討してみませんか？</p>';
        }
        
        analysisContent.innerHTML = analysis;
    }
    
    // テーブル用データの取得（ページネーション対応）
    getTableData() {
        const tableData = [];
        this.filteredData.forEach(sale => {
            sale.items.forEach(item => {
                tableData.push({
                    date: sale.date,
                    wineId: item.wineId,
                    wineName: item.wineName,
                    wineType: item.wineType,
                    quantity: item.quantity,
                    price: item.price,
                    subtotal: item.subtotal,
                    note: sale.note,
                    saleId: sale.id
                });
            });
        });
        return tableData.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    
    // テーブルの描画
    renderTable() {
        const tableBody = document.getElementById('history-table-body');
        const tableData = this.getTableData();
        
        if (tableData.length === 0) {
            tableBody.innerHTML = `
                <tr class="no-data">
                    <td colspan="7">
                        <div class="no-data-message">
                            <div class="no-data-icon">📊</div>
                            <div class="no-data-text">この期間の売上データがありません</div>
                            <div class="no-data-subtext">別の期間を選択するか、売上を入力してみましょう</div>
                            <a href="../my_cellar/sales_input.html" class="btn btn-primary btn-sm">売上を入力</a>
                        </div>
                    </td>
                </tr>
            `;
            return;
        }
        
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const pageData = tableData.slice(startIndex, endIndex);
        
        const rows = pageData.map(item => `
            <tr>
                <td>${this.formatDate(item.date)}</td>
                <td class="wine-name-cell">
                    <div class="wine-color-indicator ${item.wineType}"></div>
                    ${item.wineName}
                </td>
                <td class="quantity-cell">${item.quantity}本</td>
                <td class="price-cell">${this.formatCurrency(item.price)}</td>
                <td class="subtotal-cell">${this.formatCurrency(item.subtotal)}</td>
                <td class="note-cell" title="${item.note}">${item.note || '-'}</td>
                <td class="action-cell">
                    <button class="btn btn-sm btn-outline-primary" onclick="salesHistoryManager.showSalesDetail('${item.saleId}')">
                        詳細
                    </button>
                </td>
            </tr>
        `).join('');
        
        tableBody.innerHTML = rows;
    }
    
    // ページネーションの描画
    renderPagination() {
        const tableData = this.getTableData();
        const totalItems = tableData.length;
        const totalPages = Math.ceil(totalItems / this.itemsPerPage);
        const paginationContainer = document.getElementById('pagination-container');
        
        if (totalItems === 0) {
            paginationContainer.style.display = 'none';
            return;
        }
        
        paginationContainer.style.display = 'flex';
        
        // ページ情報の更新
        const startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
        const endItem = Math.min(this.currentPage * this.itemsPerPage, totalItems);
        document.getElementById('pagination-info-text').textContent = `${startItem}-${endItem} / ${totalItems}件`;
        
        // 前へボタンの状態
        const prevBtn = document.getElementById('prev-page');
        prevBtn.disabled = this.currentPage === 1;
        
        // 次へボタンの状態
        const nextBtn = document.getElementById('next-page');
        nextBtn.disabled = this.currentPage === totalPages;
        
        // ページ番号の描画
        const pageNumbers = document.getElementById('pagination-numbers');
        let numberHtml = '';
        
        const startPage = Math.max(1, this.currentPage - 2);
        const endPage = Math.min(totalPages, this.currentPage + 2);
        
        for (let i = startPage; i <= endPage; i++) {
            const activeClass = i === this.currentPage ? 'active' : '';
            numberHtml += `
                <a href="#" class="pagination-number ${activeClass}" data-page="${i}">${i}</a>
            `;
        }
        
        pageNumbers.innerHTML = numberHtml;
        
        // ページ番号クリックイベント
        pageNumbers.querySelectorAll('.pagination-number').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.currentPage = parseInt(e.target.dataset.page);
                this.renderTable();
                this.renderPagination();
            });
        });
    }
    
    // 売上詳細モーダルの表示
    showSalesDetail(saleId) {
        const sale = this.salesData.find(s => s.id === saleId);
        if (!sale) return;
        
        // モーダルの内容を設定
        document.getElementById('detail-date').textContent = this.formatDate(sale.date);
        document.getElementById('detail-note').textContent = sale.note || '-';
        document.getElementById('detail-total').textContent = this.formatCurrency(sale.totalAmount);
        
        // 売上アイテムリストの生成
        const itemsList = document.getElementById('modal-sales-items');
        const itemsHtml = sale.items.map(item => `
            <div class="modal-sales-item">
                <div class="modal-item-info">
                    <div class="wine-color-indicator ${item.wineType}"></div>
                    <div>
                        <div class="modal-item-name">${item.wineName}</div>
                        <div class="modal-item-details">${item.quantity}本 × ${this.formatCurrency(item.price)}</div>
                    </div>
                </div>
                <div class="modal-item-amount">
                    <div class="modal-item-subtotal">${this.formatCurrency(item.subtotal)}</div>
                </div>
            </div>
        `).join('');
        
        itemsList.innerHTML = itemsHtml;
        
        // モーダル表示
        document.getElementById('sales-detail-modal').classList.add('active');
    }
    
    // モーダルを閉じる
    closeModal() {
        document.getElementById('sales-detail-modal').classList.remove('active');
    }
    
    // CSV出力
    exportToCSV() {
        const tableData = this.getTableData();
        if (tableData.length === 0) {
            alert('出力するデータがありません。');
            return;
        }
        
        const headers = ['日付', 'ワイン名', '数量', '単価', '小計', 'メモ'];
        const csvContent = [
            headers.join(','),
            ...tableData.map(item => [
                item.date,
                `"${item.wineName}"`,
                item.quantity,
                item.price,
                item.subtotal,
                `"${item.note || ''}"`
            ].join(','))
        ].join('\n');
        
        const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `売上履歴_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
    // ユーティリティメソッド
    formatCurrency(amount) {
        return '¥' + amount.toLocaleString();
    }
    
    formatDate(dateString) {
        const date = new Date(dateString);
        return `${date.getMonth() + 1}/${date.getDate()}`;
    }
}

// 売上データを追加するメソッド（売上入力画面から呼び出される）
function addSalesRecord(salesData) {
    const salesHistory = JSON.parse(localStorage.getItem('salesHistory') || '[]');
    salesHistory.unshift(salesData); // 新しいデータを先頭に追加
    localStorage.setItem('salesHistory', JSON.stringify(salesHistory));
}

// グローバル変数として設定
let salesHistoryManager;

// 初期化
document.addEventListener('DOMContentLoaded', function() {
    salesHistoryManager = new SalesHistoryManager();
});