/**
 * 統一されたスクリプト読み込みシステム
 * 全ページで共通のヘッダー読み込み方法を提供
 */

class UnifiedScriptLoader {
    constructor() {
        this.cacheBuster = `UNIFIED_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        this.isInitialized = false;
        console.log('📦 UnifiedScriptLoader初期化:', this.cacheBuster);
    }

    /**
     * 必要なスクリプトを順序どおりに読み込み
     * @param {Array} scripts - 読み込むスクリプトのパス配列
     * @param {string} basePath - ベースパス（相対パス調整用）
     * @param {Function} callback - 全て読み込み完了後のコールバック
     */
    loadScripts(scripts, basePath = '', callback = null) {
        console.log('🚀 スクリプト読み込み開始:', { scripts, basePath });
        
        this.loadScriptsSequential(scripts, basePath, 0, callback);
    }

    /**
     * シーケンシャルにスクリプトを読み込む内部関数
     */
    loadScriptsSequential(scriptArray, basePath, index = 0, callback = null) {
        if (index >= scriptArray.length) {
            console.log('✅ 全スクリプト読み込み完了');
            if (callback && typeof callback === 'function') {
                callback();
            }
            return;
        }
        
        const scriptPath = basePath ? `${basePath}/${scriptArray[index]}` : scriptArray[index];
        const script = document.createElement('script');
        script.src = `${scriptPath}?v=${this.cacheBuster}`;
        
        script.onload = () => {
            console.log(`✅ ${scriptArray[index]} 読み込み完了`);
            // 次のスクリプトを読み込み
            this.loadScriptsSequential(scriptArray, basePath, index + 1, callback);
        };
        
        script.onerror = () => {
            console.error(`❌ ${scriptArray[index]} 読み込みエラー`);
            // エラーが発生しても次のスクリプトを読み込む
            this.loadScriptsSequential(scriptArray, basePath, index + 1, callback);
        };
        
        document.head.appendChild(script);
    }

    /**
     * ヘッダー初期化を実行
     */
    initializeHeader() {
        if (this.isInitialized) {
            console.log('⚠️ ヘッダーは既に初期化済みです');
            return;
        }

        console.log('🚀 ヘッダー初期化開始');
        
        try {
            if (typeof window.initializeCommonParts === 'function') {
                const result = window.initializeCommonParts();
                if (result) {
                    console.log('✅ ヘッダー初期化成功');
                    this.isInitialized = true;
                } else {
                    console.error('❌ ヘッダー初期化失敗');
                }
            } else {
                console.error('❌ initializeCommonParts関数が見つかりません');
            }
        } catch (error) {
            console.error('❌ ヘッダー初期化エラー:', error);
        }
    }

    /**
     * 標準的なページ用の初期化メソッド
     * @param {string} basePath - JSファイルへの相対パス
     * @param {Array} additionalScripts - 追加で読み込むスクリプト
     * @param {Function} callback - 初期化完了後のコールバック
     */
    initializePage(basePath = '..', additionalScripts = [], callback = null) {
        // 共通スクリプトの定義
        const commonScripts = [
            'js/common_parts.js',
            'js/main.js',
            'js/ai_simulator.js',
            'js/utils.js'
        ];
        
        // 追加スクリプトをマージ
        const allScripts = [...commonScripts, ...additionalScripts];
        
        // スクリプト読み込み開始
        this.loadScripts(allScripts, basePath, () => {
            // 全て読み込み完了後にヘッダー初期化
            this.initializeHeader();
            
            // コールバック実行
            if (callback && typeof callback === 'function') {
                callback();
            }
        });
    }
}

/**
 * 簡単に使用できるヘルパー関数
 * @param {string} basePath - JSファイルへの相対パス  
 * @param {Array} additionalScripts - 追加スクリプト
 * @param {Function} callback - 初期化完了後のコールバック
 */
function initializeWineSupportPage(basePath = '..', additionalScripts = [], callback = null) {
    const loader = new UnifiedScriptLoader();
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            console.log('📄 DOMContentLoaded - ページ初期化開始');
            loader.initializePage(basePath, additionalScripts, callback);
        });
    } else {
        console.log('📄 DOM既に読み込み済み - ページ初期化開始');
        loader.initializePage(basePath, additionalScripts, callback);
    }
}

// グローバルに公開
window.UnifiedScriptLoader = UnifiedScriptLoader;
window.initializeWineSupportPage = initializeWineSupportPage;

console.log('📦 統一スクリプトローダー読み込み完了');