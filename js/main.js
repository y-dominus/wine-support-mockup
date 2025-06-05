// ワイサポ メイン JavaScript - GitHub Pages対応版
class WineSupportApp {
    constructor() {
        this.isGitHubPages = window.location.hostname.includes('github.io');
        this.basePath = this.getBasePath();
        this.initialized = false;
        
        // 環境情報をログ出力
        console.log('🍷 ワイサポ初期化中...', {
            isGitHubPages: this.isGitHubPages,
            basePath: this.basePath,
            location: window.location.href
        });
    }

    getBasePath() {
        if (this.isGitHubPages) {
            const pathParts = window.location.pathname.split('/');
            return pathParts.length > 2 ? '/' + pathParts[1] : '';
        }
        return '';
    }

    // アプリケーション初期化
    async init() {
        if (this.initialized) return;

        try {
            // PWA機能の初期化
            await this.initializePWA();
            
            // 共通UI要素の初期化
            this.initializeCommonElements();
            
            // ページ固有の機能初期化
            this.initializePageSpecific();
            
            // イベントリスナーの設定
            this.setupEventListeners();
            
            // Sommia AI機能の初期化
            this.initializeSommiaAI();
            
            this.initialized = true;
            console.log('✅ ワイサポ初期化完了');
            
        } catch (error) {
            console.error('❌ 初期化エラー:', error);
        }
    }

    // PWA機能の初期化
    async initializePWA() {
        // Service Worker の登録
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('./sw.js');
                console.log('✅ Service Worker 登録成功:', registration);
                
                // 更新チェック
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    if (newWorker) {
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                this.showUpdateNotification();
                            }
                        });
                    }
                });
            } catch (error) {
                console.log('⚠️ Service Worker 登録失敗:', error);
            }
        }

        // マニフェストの動的設定
        this.setupDynamicManifest();
    }

    // マニフェストの動的設定
    setupDynamicManifest() {
        const manifestLink = document.createElement('link');
        manifestLink.rel = 'manifest';
        manifestLink.href = './manifest.json';
        document.head.appendChild(manifestLink);

        // PWAインストールプロンプト
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            this.showInstallPrompt();
        });
    }

    // 共通UI要素の初期化
    initializeCommonElements() {
        // ローディング状態の管理
        this.setupLoadingStates();
        
        // ツールチップの初期化
        this.initializeTooltips();
        
        // モーダルの初期化
        this.initializeModals();
        
        // フォームの初期化
        this.initializeForms();
    }

    // ページ固有機能の初期化
    initializePageSpecific() {
        const pathname = window.location.pathname;
        
        if (pathname.includes('dashboard')) {
            this.initializeDashboard();
        } else if (pathname.includes('my_cellar')) {
            this.initializeMyCellar();
        } else if (pathname.includes('product_list')) {
            this.initializeProductList();
        } else if (pathname.includes('wine_optimization')) {
            this.initializeWineOptimization();
        }
    }

    // ダッシュボード初期化
    initializeDashboard() {
        console.log('📊 ダッシュボード機能を初期化中...');
        
        // KPIカウンターアニメーション
        this.animateKPICounters();
        
        // チャートの初期化
        this.initializeCharts();
        
        // フローティングチャット
        this.initializeFloatingChat();
    }

    // マイセラー初期化
    initializeMyCellar() {
        console.log('🍷 マイセラー機能を初期化中...');
        // マイセラー固有の機能
    }

    // 商品リスト初期化
    initializeProductList() {
        console.log('📦 商品リスト機能を初期化中...');
        // 商品リスト固有の機能
    }

    // ワイン最適化初期化
    initializeWineOptimization() {
        console.log('🤖 AI最適化機能を初期化中...');
        // AI最適化固有の機能
    }

    // KPIカウンターアニメーション
    animateKPICounters() {
        const counters = document.querySelectorAll('.stats-value[data-target]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateNumber(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });

        counters.forEach(counter => observer.observe(counter));
    }

    // 数値アニメーション
    animateNumber(element) {
        const target = parseFloat(element.dataset.target);
        const prefix = element.dataset.prefix || '';
        const suffix = element.dataset.suffix || '';
        const duration = 2000;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            
            const currentValue = target * easeProgress;
            let displayValue;
            
            if (target >= 1000) {
                displayValue = Math.floor(currentValue).toLocaleString();
            } else if (target % 1 !== 0) {
                displayValue = currentValue.toFixed(1);
            } else {
                displayValue = Math.floor(currentValue).toString();
            }
            
            element.textContent = prefix + displayValue + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    // チャート初期化
    initializeCharts() {
        if (typeof Chart === 'undefined') {
            console.log('⚠️ Chart.js が読み込まれていません');
            return;
        }

        // 売上トレンドチャート
        this.initializeSalesChart();
        
        // ワイン構成比チャート
        this.initializeWineCompositionChart();
    }

    // 売上トレンドチャート
    initializeSalesChart() {
        const canvas = document.getElementById('sales-chart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['1月', '2月', '3月', '4月', '5月'],
                datasets: [{
                    label: 'ワイン売上',
                    data: [180000, 195000, 185000, 218000, 245000],
                    borderColor: '#FF4D00',
                    backgroundColor: 'rgba(255, 77, 0, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: '売上金額（円）'
                        }
                    }
                }
            }
        });
    }

    // ワイン構成比チャート
    initializeWineCompositionChart() {
        const canvas = document.getElementById('wine-composition-chart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['赤ワイン', '白ワイン', 'ロゼ', 'スパークリング'],
                datasets: [{
                    data: [120000, 98000, 45000, 82000],
                    backgroundColor: [
                        '#DC2626',
                        '#FCD34D', 
                        '#F472B6',
                        '#A7F3D0'
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
                        position: 'bottom'
                    }
                }
            }
        });
    }

    // フローティングチャット初期化
    initializeFloatingChat() {
        const chatButton = document.getElementById('floating-chat-btn');
        const chatWindow = document.getElementById('floating-chat-window');
        
        if (!chatButton || !chatWindow) return;

        chatButton.addEventListener('click', () => {
            chatWindow.classList.toggle('show');
        });

        // チャット外クリックで閉じる
        document.addEventListener('click', (e) => {
            if (!chatWindow.contains(e.target) && !chatButton.contains(e.target)) {
                chatWindow.classList.remove('show');
            }
        });
    }

    // Sommia AI機能初期化
    initializeSommiaAI() {
        console.log('🤖 Sommia AI機能を初期化中...');
        
        // AIメッセージの表示制御
        this.setupAIMessages();
        
        // AI提案機能
        this.setupAISuggestions();
    }

    // AIメッセージ設定
    setupAIMessages() {
        // ページロード時のウェルカムメッセージ
        setTimeout(() => {
            this.showSommiaMessage('こんにちは！今日のワイン業務をサポートします。何かお手伝いできることはありますか？');
        }, 2000);
    }

    // AI提案設定
    setupAISuggestions() {
        // 定期的な提案表示（デモ用）
        if (window.location.pathname.includes('dashboard')) {
            setTimeout(() => {
                this.showOptimizationSuggestion();
            }, 10000);
        }
    }

    // Sommiaメッセージ表示
    showSommiaMessage(message, type = 'info') {
        const messageElement = document.createElement('div');
        messageElement.className = `sommia-message ${type}`;
        messageElement.innerHTML = `
            <div class="sommia-message-content">
                <img src="${this.getImagePath('sommia.png')}" alt="Sommia" class="sommia-avatar-small">
                <div class="sommia-text">${message}</div>
                <button class="sommia-close" onclick="this.closest('.sommia-message').remove()">&times;</button>
            </div>
        `;
        
        // メッセージエリアに追加
        const container = document.body;
        container.appendChild(messageElement);
        
        // 自動消去（10秒後）
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.remove();
            }
        }, 10000);
    }

    // 最適化提案表示
    showOptimizationSuggestion() {
        const suggestion = {
            title: 'ワインリスト最適化のご提案',
            message: '売上データを分析した結果、3銘柄の入替えで約15%の売上向上が期待できます。',
            action: () => {
                window.location.href = this.getPagePath('wine_optimization.html');
            }
        };

        this.showSommiaMessage(
            `<strong>${suggestion.title}</strong><br>${suggestion.message}<br>
            <button class="btn btn-sm btn-primary" onclick="window.location.href='${this.getPagePath('wine_optimization.html')}'">詳細を見る</button>`,
            'suggestion'
        );
    }

    // イベントリスナー設定
    setupEventListeners() {
        // グローバルエラーハンドリング
        window.addEventListener('error', (e) => {
            console.error('グローバルエラー:', e.error);
        });

        // 未実装機能のアラート
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[href="#"], button[data-mock]')) {
                e.preventDefault();
                this.showMockAlert();
            }
        });

        // レスポンシブ対応
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    // モック機能アラート
    showMockAlert() {
        this.showSommiaMessage('この機能はモックアップ版のため実装されていません。GitHub Pages で公開中のデモ版です。', 'warning');
    }

    // リサイズ処理
    handleResize() {
        // チャートのリサイズ等
        if (window.Chart && window.Chart.instances) {
            Object.values(window.Chart.instances).forEach(chart => {
                chart.resize();
            });
        }
    }

    // ローディング状態管理
    setupLoadingStates() {
        // ページ読み込み完了時にローディングを非表示
        window.addEventListener('load', () => {
            const loader = document.querySelector('.page-loader');
            if (loader) {
                loader.style.opacity = '0';
                setTimeout(() => loader.remove(), 300);
            }
        });
    }

    // ツールチップ初期化
    initializeTooltips() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', this.showTooltip.bind(this));
            element.addEventListener('mouseleave', this.hideTooltip.bind(this));
        });
    }

    // ツールチップ表示
    showTooltip(event) {
        const text = event.target.dataset.tooltip;
        if (!text) return;

        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = text;
        document.body.appendChild(tooltip);

        const rect = event.target.getBoundingClientRect();
        tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px';
    }

    // ツールチップ非表示
    hideTooltip() {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }

    // モーダル初期化
    initializeModals() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-modal]')) {
                const modalId = e.target.dataset.modal;
                this.openModal(modalId);
            }
            
            if (e.target.matches('.modal-close, .modal-backdrop')) {
                this.closeModal();
            }
        });
    }

    // モーダル開く
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    // モーダル閉じる
    closeModal() {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            activeModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // フォーム初期化
    initializeForms() {
        const forms = document.querySelectorAll('form[data-ajax]');
        forms.forEach(form => {
            form.addEventListener('submit', this.handleAjaxForm.bind(this));
        });
    }

    // Ajaxフォーム処理
    handleAjaxForm(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        
        // モックアップ用の処理
        this.showSommiaMessage('フォームが送信されました（モックアップ版のため実際の処理は行われません）', 'success');
    }

    // PWAインストールプロンプト表示
    showInstallPrompt() {
        const installPrompt = document.createElement('div');
        installPrompt.className = 'install-prompt';
        installPrompt.innerHTML = `
            <div class="install-prompt-content">
                <div class="install-prompt-text">
                    <h3>📱 ワイサポをインストール</h3>
                    <p>ホーム画面に追加してネイティブアプリのように使用できます</p>
                </div>
                <div class="install-prompt-actions">
                    <button class="btn btn-primary" id="install-app">インストール</button>
                    <button class="btn btn-outline-secondary" id="dismiss-install">後で</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(installPrompt);
        
        // インストールボタン
        document.getElementById('install-app').addEventListener('click', () => {
            if (this.deferredPrompt) {
                this.deferredPrompt.prompt();
                this.deferredPrompt.userChoice.then((choiceResult) => {
                    console.log('インストール選択:', choiceResult.outcome);
                    this.deferredPrompt = null;
                });
            }
            installPrompt.remove();
        });
        
        // 後でボタン
        document.getElementById('dismiss-install').addEventListener('click', () => {
            installPrompt.remove();
        });
    }

    // 更新通知表示
    showUpdateNotification() {
        this.showSommiaMessage(
            'ワイサポの新しいバージョンが利用可能です。<br><button class="btn btn-sm btn-primary" onclick="window.location.reload()">更新</button>',
            'update'
        );
    }

    // パスヘルパー関数
    getImagePath(imagePath) {
        const currentPath = window.location.pathname;
        const isInSubfolder = currentPath.includes('/html/');
        
        if (isInSubfolder) {
            return '../' + imagePath;
        }
        return './' + imagePath;
    }

    getPagePath(pagePath) {
        const currentPath = window.location.pathname;
        const isInSubfolder = currentPath.includes('/html/');
        
        if (isInSubfolder) {
            if (pagePath.startsWith('../')) {
                return pagePath;
            }
            return './' + pagePath;
        }
        return './html/' + pagePath;
    }
}

// アプリケーションインスタンス作成
const wineSupportApp = new WineSupportApp();

// DOM読み込み完了後に初期化
document.addEventListener('DOMContentLoaded', () => {
    wineSupportApp.init();
});

// グローバルに利用可能にする
window.WineSupportApp = wineSupportApp;

// レガシーサポート用の関数
window.trackEvent = (eventName, properties = {}) => {
    console.log('📊 イベント:', eventName, properties);
};

// エクスポート（モジュール対応）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WineSupportApp;
}