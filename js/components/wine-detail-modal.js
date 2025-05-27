// ワイン詳細モーダルの共通機能

class WineDetailModal {
    constructor() {
        this.modal = null;
        this.wineData = this.getWineDatabase();
        this.init();
    }
    
    init() {
        this.createModal();
        this.setupEventListeners();
    }
    
    // ワインデータベース（実際のアプリケーションではAPIから取得）
    getWineDatabase() {
        return {
            1: {
                id: 1,
                name: 'キャンティ クラシコ リゼルヴァ',
                type: 'red',
                producer: 'フォンティノ',
                year: '2018年',
                grape: 'サンジョヴェーゼ100%',
                region: 'イタリア / トスカーナ',
                price: 8800,
                sellPrice: 8000,
                body: 'ミディアムボディ',
                farming: '有機栽培',
                aging: 'フレンチオーク樽熟成24ヶ月',
                alcohol: '14.5%',
                taste: '辛口',
                stock: 2,
                stockStatus: 'low',
                description: '赤い果実やドライハーブの香り。タンニンはしっかりとしているが滑らかで、酷くない酸味とバランスがとれている。2時間ほどデキャンターすると香りが開き、より一層食事とおいしく合う。'
            },
            2: {
                id: 2,
                name: 'ソーヴィニヨン・ブラン',
                type: 'white',
                producer: 'クラウディ・ベイ',
                year: '2022年',
                grape: 'ソーヴィニヨン・ブラン100%',
                region: 'ニュージーランド / マールボロ',
                price: 7000,
                sellPrice: 7000,
                body: 'ライトボディ',
                farming: 'サステナブル栽培',
                aging: 'ステンレスタンク熟成',
                alcohol: '13.0%',
                taste: '辛口',
                stock: 1,
                stockStatus: 'critical',
                description: 'グレープフルーツやライムの爽やかな香りに、ハーブの香りが加わります。酸味がしっかりとしており、魚介類や野菜料理との相性が抜群です。'
            },
            3: {
                id: 3,
                name: 'プロセッコ',
                type: 'sparkling',
                producer: 'ルンガロッティ',
                year: '2023年',
                grape: 'グレラ100%',
                region: 'イタリア / ヴェネト',
                price: 6000,
                sellPrice: 6000,
                body: 'ライトボディ',
                farming: '伝統栽培',
                aging: 'シャルマ方式',
                alcohol: '11.5%',
                taste: '辛口',
                stock: 5,
                stockStatus: 'good',
                description: '白い花や洋梨の上品な香り。細やかな泡立ちで、フレッシュな酸味と果実味のバランスが絶妙。アペリティフに最適です。'
            },
            4: {
                id: 4,
                name: 'メルロー',
                type: 'red',
                producer: 'サンタ・リタ',
                year: '2020年',
                grape: 'メルロー85%、カベルネ・ソーヴィニヨン15%',
                region: 'チリ / マイポ・ヴァレー',
                price: 6000,
                sellPrice: 6000,
                body: 'ミディアムボディ',
                farming: 'サステナブル栽培',
                aging: 'アメリカンオーク樽熟成12ヶ月',
                alcohol: '14.0%',
                taste: '辛口',
                stock: 3,
                stockStatus: 'low',
                description: 'ブラックベリーやプラムの豊かな果実味に、バニラやスパイスのニュアンス。滑らかなタンニンで飲みやすく、肉料理全般によく合います。'
            },
            5: {
                id: 5,
                name: 'シャルドネ',
                type: 'white',
                producer: 'ケンダル・ジャクソン',
                year: '2021年',
                grape: 'シャルドネ100%',
                region: 'アメリカ / カリフォルニア',
                price: 7000,
                sellPrice: 7000,
                body: 'ミディアムボディ',
                farming: 'サステナブル栽培',
                aging: 'フレンチオーク樽熟成8ヶ月',
                alcohol: '13.5%',
                taste: '辛口',
                stock: 4,
                stockStatus: 'good',
                description: '桃やメロンの果実香に、バターやバニラの香りが調和。クリーミーな口当たりで、クリーム系の料理や鶏肉料理との相性が抜群です。'
            },
            6: {
                id: 6,
                name: 'バローロ',
                type: 'red',
                producer: 'マルケージ・ディ・バローロ',
                year: '2018年',
                grape: 'ネッビオーロ100%',
                region: 'イタリア / ピエモンテ',
                price: 12000,
                sellPrice: 12000,
                body: 'フルボディ',
                farming: '伝統栽培',
                aging: 'スラヴォニアンオーク樽熟成36ヶ月',
                alcohol: '14.5%',
                taste: '辛口',
                stock: 6,
                stockStatus: 'good',
                description: 'バラやスミレの花の香りに、タール、レザーの複雑なアロマ。力強いタンニンと高い酸味を持つ、ワインの王様と呼ばれる逸品です。'
            },
            7: {
                id: 7,
                name: 'プイィ・フュメ',
                type: 'white',
                producer: 'アンリ・ブルジョワ',
                year: '2022年',
                grape: 'ソーヴィニヨン・ブラン100%',
                region: 'フランス / ロワール',
                price: 10000,
                sellPrice: 10000,
                body: 'ミディアムボディ',
                farming: 'ビオディナミ栽培',
                aging: 'ステンレスタンク熟成',
                alcohol: '12.5%',
                taste: '辛口',
                stock: 4,
                stockStatus: 'good',
                description: '白い花やシトラスの香りに、独特のスモーキーなミネラル感。エレガントで複雑味があり、山羊チーズや貝類料理との相性が抜群です。'
            }
        };
    }
    
    // モーダルHTML要素を作成
    createModal() {
        if (document.getElementById('wine-detail-modal')) {
            this.modal = document.getElementById('wine-detail-modal');
            return;
        }
        
        const modalHTML = `
            <div class="wine-detail-modal" id="wine-detail-modal">
                <div class="wine-detail-modal-content">
                    <div class="wine-detail-header">
                        <h3 class="wine-detail-title" id="wine-detail-title">ワイン詳細</h3>
                        <button class="wine-detail-close">&times;</button>
                    </div>
                    <div class="wine-detail-body">
                        <div class="wine-detail-main">
                            <div class="wine-image-container">
                                <div class="wine-image" id="wine-detail-image">
                                    <div class="wine-label-text" id="wine-detail-label">ワイン名</div>
                                </div>
                            </div>
                            <div class="wine-detail-info">
                                <div class="wine-detail-grid">
                                    <div class="wine-detail-item">
                                        <div class="wine-detail-label">ワインタイプ</div>
                                        <div class="wine-detail-value" id="wine-detail-type">-</div>
                                    </div>
                                    <div class="wine-detail-item">
                                        <div class="wine-detail-label">生産者名</div>
                                        <div class="wine-detail-value" id="wine-detail-producer">-</div>
                                    </div>
                                    <div class="wine-detail-item">
                                        <div class="wine-detail-label">生産年</div>
                                        <div class="wine-detail-value" id="wine-detail-year">-</div>
                                    </div>
                                    <div class="wine-detail-item">
                                        <div class="wine-detail-label">主要品種名</div>
                                        <div class="wine-detail-value" id="wine-detail-grape">-</div>
                                    </div>
                                    <div class="wine-detail-item">
                                        <div class="wine-detail-label">産地</div>
                                        <div class="wine-detail-value" id="wine-detail-region">-</div>
                                    </div>
                                    <div class="wine-detail-item">
                                        <div class="wine-detail-label">納入価格</div>
                                        <div class="wine-detail-value" id="wine-detail-price">-</div>
                                    </div>
                                    <div class="wine-detail-item">
                                        <div class="wine-detail-label">ボディ</div>
                                        <div class="wine-detail-value" id="wine-detail-body">-</div>
                                    </div>
                                    <div class="wine-detail-item">
                                        <div class="wine-detail-label">栽培方法</div>
                                        <div class="wine-detail-value" id="wine-detail-farming">-</div>
                                    </div>
                                    <div class="wine-detail-item">
                                        <div class="wine-detail-label">発酵/熟成方法</div>
                                        <div class="wine-detail-value" id="wine-detail-aging">-</div>
                                    </div>
                                    <div class="wine-detail-item">
                                        <div class="wine-detail-label">アルコール度数</div>
                                        <div class="wine-detail-value" id="wine-detail-alcohol">-</div>
                                    </div>
                                    <div class="wine-detail-item">
                                        <div class="wine-detail-label">味わいタイプ</div>
                                        <div class="wine-detail-value" id="wine-detail-taste">-</div>
                                    </div>
                                    <div class="wine-detail-item">
                                        <div class="wine-detail-label">在庫状況</div>
                                        <div class="wine-detail-value" id="wine-detail-stock">-</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="wine-detail-description">
                            <h5>テイスティングノート</h5>
                            <p id="wine-detail-description">-</p>
                        </div>
                    </div>
                    <div class="wine-detail-footer">
                        <button class="btn btn-outline-secondary wine-detail-close">閉じる</button>
                        <button class="btn btn-primary" id="wine-detail-action-btn">発注へ追加</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.modal = document.getElementById('wine-detail-modal');
    }
    
    // イベントリスナーの設定
    setupEventListeners() {
        // 詳細ボタンのクリックイベントを設定
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('wine-detail-btn') || 
                e.target.closest('.wine-detail-btn')) {
                e.preventDefault();
                const button = e.target.classList.contains('wine-detail-btn') ? 
                              e.target : e.target.closest('.wine-detail-btn');
                const wineId = button.getAttribute('data-wine-id');
                this.showWineDetail(wineId);
            }
        });
        
        // モーダルを閉じるイベント
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('wine-detail-close') || 
                e.target === this.modal) {
                this.closeModal();
            }
        });
        
        // ESCキーでモーダルを閉じる
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }
    
    // ワイン詳細モーダルを表示
    showWineDetail(wineId) {
        const wine = this.wineData[wineId];
        if (!wine) {
            console.error('Wine not found:', wineId);
            return;
        }
        
        // モーダルの内容を更新
        this.updateModalContent(wine);
        
        // モーダルを表示
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // スクロールを無効化
    }
    
    // モーダルの内容を更新
    updateModalContent(wine) {
        // 基本情報の更新
        document.getElementById('wine-detail-title').textContent = wine.name;
        document.getElementById('wine-detail-label').textContent = wine.name;
        document.getElementById('wine-detail-type').textContent = this.getWineTypeText(wine.type);
        document.getElementById('wine-detail-producer').textContent = wine.producer;
        document.getElementById('wine-detail-year').textContent = wine.year;
        document.getElementById('wine-detail-grape').textContent = wine.grape;
        document.getElementById('wine-detail-region').textContent = wine.region;
        document.getElementById('wine-detail-price').textContent = this.formatCurrency(wine.price);
        document.getElementById('wine-detail-body').textContent = wine.body;
        document.getElementById('wine-detail-farming').textContent = wine.farming;
        document.getElementById('wine-detail-aging').textContent = wine.aging;
        document.getElementById('wine-detail-alcohol').textContent = wine.alcohol;
        document.getElementById('wine-detail-taste').textContent = wine.taste;
        document.getElementById('wine-detail-description').textContent = wine.description;
        
        // ワイン画像の更新
        const wineImage = document.getElementById('wine-detail-image');
        wineImage.className = `wine-image ${wine.type}`;
        
        // 在庫状況の更新
        const stockElement = document.getElementById('wine-detail-stock');
        const stockText = `残り${wine.stock}本`;
        const stockBadge = `<span class="stock-status-badge ${wine.stockStatus}">${stockText}</span>`;
        stockElement.innerHTML = stockBadge;
        
        // アクションボタンの設定
        const actionBtn = document.getElementById('wine-detail-action-btn');
        actionBtn.setAttribute('data-wine-id', wine.id);
        
        // ページによってボタンの表示を変更
        if (window.location.pathname.includes('dashboard') || 
            window.location.pathname.includes('orders')) {
            actionBtn.textContent = '発注へ追加';
            actionBtn.onclick = () => this.addToOrder(wine.id);
        } else if (window.location.pathname.includes('my_cellar')) {
            actionBtn.textContent = '売上入力';
            actionBtn.onclick = () => this.goToSalesInput(wine.id);
        } else {
            actionBtn.textContent = '詳細を見る';
            actionBtn.onclick = () => this.closeModal();
        }
    }
    
    // モーダルを閉じる
    closeModal() {
        if (this.modal) {
            this.modal.classList.remove('active');
            document.body.style.overflow = ''; // スクロールを有効化
        }
    }
    
    // 発注に追加
    addToOrder(wineId) {
        // 実際のアプリケーションでは発注システムとの連携
        console.log('Adding wine to order:', wineId);
        alert('発注リストに追加しました！');
        this.closeModal();
    }
    
    // 売上入力画面に遷移
    goToSalesInput(wineId) {
        const relativePath = this.getRelativePath();
        window.location.href = `${relativePath}my_cellar/sales_input.html?wineId=${wineId}`;
    }
    
    // 相対パスを取得（現在のページの位置に応じて）
    getRelativePath() {
        const path = window.location.pathname;
        if (path.includes('/my_cellar/')) return '../';
        if (path.includes('/reports/')) return '../';
        if (path.includes('/orders/')) return '../';
        if (path.includes('/products/')) return '../';
        return '';
    }
    
    // ワイン種類のテキスト変換
    getWineTypeText(type) {
        const typeMap = {
            'red': '赤ワイン',
            'white': '白ワイン',
            'sparkling': 'スパークリングワイン',
            'rose': 'ロゼワイン',
            'dessert': 'デザートワイン'
        };
        return typeMap[type] || type;
    }
    
    // 通貨フォーマット
    formatCurrency(amount) {
        return '¥' + amount.toLocaleString();
    }
}

// グローバルで使用できるように初期化
let wineDetailModal;

document.addEventListener('DOMContentLoaded', function() {
    wineDetailModal = new WineDetailModal();
});