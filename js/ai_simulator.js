/**
 * AI Simulator - Sommiaのセリフと振る舞いをシミュレートするスクリプト
 */

// AIのセリフ定義
const aiDialogue = {
    // インデックスページ
    index: {
        welcome: (userName = "ゲスト") => `ようこそ！ワイサポへ！ワイン畑の妖精、ソムリエAIのSommiaがお手伝いします。`
    },
    
    // オンボーディング
    onboarding: {
        welcome: (userName = "ゲスト") => `こんにちは！ワイン畑の妖精、ソムリエAIのSommiaです。${userName}さん。ワイサポへようこそ！あなたのレストランにぴったりのワイン選び、喜んでお手伝いします！まずはお店のことを教えていただけますか？`,
        
        storeInfoPrompt: "お店の基本的な情報を教えてくださいね。この情報をもとに、お店の個性に合わせたワインをSommiaが見つけます！",
        
        menuInfoPrompt: "ありがとうございます！次にお店の主要な料理メニューを教えてください。お料理との素敵なマリアージュ、Sommiaにお任せあれ！",
        
        initialProposal: "お待たせしました！お店のデータとSommiaの魔法で、おすすめのワインリストを3パターン考えてみました。いかがですか？",
        
        signupPrompt: "そのリスト、きっとお店を輝かせますね！最後に、ワイサポを利用するためのアカウント情報を登録してください。",
        
        orderConfirmation: (userName = "ゲスト") => `ご登録ありがとうございます！${userName}さん。選んでいただいたワインで、お店に美味しい魔法をかけましょう！Sommiaが全力でサポートします。さあ、ダッシュボードへどうぞ！`
    },
    
    // ダッシュボード
    dashboard: {
        greeting: (userName = "ゲスト") => `おはようございます、${userName}さん！今日のワイン業務もSommiaにお任せください。まずはこれ、チェックしませんか？`,
        
        lowStockAlert: "あら、いくつかのワインの在庫が少なくなっているみたいです。補充発注しておきましょうか？",
        
        salesInsight: "先週の売上データを分析してみました。赤ワインの人気が高まっていますね。メニューでの推奨を強化すると、さらに売上がアップするかもしれませんよ！"
    },
    
    // マイセラー（在庫管理）
    myCellar: {
        overview: "現在のワイン在庫はこちらです。Sommiaと一緒に、売上を入力して在庫をピカピカにしましょう！",
        
        salesInput: "今日の売上ですね、ありがとうございます！どのワインがたくさん笑顔を届けましたか？",
        
        lowStock: "このワインはあと3本しかありませんね。お客様に人気のようですから、そろそろ補充を考えましょうか？",
        
        recommendations: "こちらのワインの在庫がやや多いようです。週末の「ソムリエおすすめ」としてピックアップしてみてはいかがでしょう？"
    },
    
    // 商品一覧・検索
    products: {
        productList: "新しいワインをお探しですか？Sommiaの魔法のリストから、お店にぴったりの一本を見つけましょう！",
        
        productDetail: (wineName = "このワイン") => `${wineName}は、芳醇な香りとエレガントな味わいが特徴。まるでワイン畑からの贈り物のよう。特に赤身肉料理と合わせると、お客様もきっとうっとりしますよ！`,
        
        searchPrompt: "どんなワインをお探しですか？産地、ブドウ品種、価格帯など、Sommiaがあなたのご要望にぴったりのワインを見つけます！",
        
        recommendationReason: "あなたのお店のイタリアンメニューには、このトスカーナ産キャンティがぴったりですよ。濃厚なソースとの相性は抜群です！"
    },
    
    // 発注管理
    orders: {
        replenishOrder: "補充するワインと本数はこちらでよろしいですか？確認したら、Sommiaがサッと手配しますね。",
        
        orderHistory: "これまでのご注文の記録です。しっかり管理していますよ。",
        
        orderSuccess: "発注完了しました！魔法の箒で急いでお届けします...なんて冗談ですが、指定納期までにしっかりお届けしますね。",
        
        orderRecommendation: "季節の変わり目ですね。これからの季節に合わせて、軽やかな白ワインの比率を増やしてみては？お客様の気分もきっと明るくなりますよ！"
    },
    
    // 自動発注
    autoOrder: {
        introduction: "自動発注機能をご紹介します！在庫が設定した数を下回ったときに、Sommiaが自動でワインを発注します。もう在庫切れを心配する必要はありませんよ。",
        
        setupComplete: "自動発注の設定が完了しました！これで在庫管理はSommiaにお任せですね。安心してお店の運営に集中してください。",
        
        triggered: (wineName) => `${wineName}の在庫が設定値を下回りました。自動発注を実行します。配送は3営業日後の予定です！`,
        
        pendingOrders: (count) => `保留中の自動発注が${count}件あります。内容を確認して承認をお願いします。`,
        
        dismissed: "承知いたしました。自動発注のご提案は1週間後に再度お声がけしますね。いつでもご質問があればお気軽にどうぞ！",
        
        enabled: "自動発注機能が有効になりました！在庫の監視を開始します。何かご不明な点があれば、いつでもお声がけくださいね。",
        
        disabled: "自動発注機能を無効にしました。手動での発注管理に戻ります。また必要になりましたら、いつでも再設定できますよ。",
        
        setupGuide: "自動発注の設定は簡単ですよ！まずは各ワインの在庫闾値を設定してください。その後、自動発注を有効にするだけです。Sommiaがしっかり監視しますね！",
        
        pricing: "自動発注機能は追加料金なしでご利用いただけます。基本プランに含まれているサービスですよ。お店の効率化と売上向上をサポートします！"
    },
    
    // ワイン最適化
    wineOptimization: {
        started: "ワインリスト最適化を開始しました！お店のデータを分析して、最適なワイン構成を提案いたします。少々お時間をいただきますね。",
        
        skipped: "承知いたしました。今回の最適化提案はスキップしますね。次回は1ヶ月後にまたご提案させていただきます。",
        
        completed: "ワインリスト最適化が完了しました！新しい提案をご確認ください。きっとお店の売上アップに繋がりますよ。",
        
        recommendation: "分析の結果、こちらのワインを追加することで売上が15%向上する可能性があります。いかがでしょうか？",
        
        analysis: "お店のデータを分析した結果、こちらの最適化提案をご用意しました。実現することで、売上と効率の大幅な改善が期待できますよ！",
        
        scheduled: (date) => `次回のワインリスト最適化を${date}にスケジュールしました。それまでに、新しい銘柄のパフォーマンスをしっかり監視していきますね！`
    },
    
    // レポート
    reports: {
        salesReport: "期間内の売上レポートをお持ちしました！お店のワイン戦略、一緒に考えましょう。",
        
        insight: "このシャルドネが特に好調ですね。女性のお客様からの支持が高いようです。メニューの目立つ位置に配置すると、さらに売上が伸びるかもしれませんよ。",
        
        trend: "最近、自然派ワインへの関心が高まっているようです。品揃えを少し増やしてみると、新しいお客様の獲得につながるかもしれませんね。"
    },
    
    // アカウント設定
    account: {
        accountSettings: "アカウント情報やお店の情報はこちらで変更できます。何かお手伝いできることはありますか？",
        
        profileUpdateSuccess: "プロフィール情報を更新しました！いつでもSommiaにお声がけくださいね。",

        login: "お帰りなさい！今日はどんなワインの魔法をかけましょうか？",

        mypage: (userName = "ゲスト") => `ようこそ、${userName}さん！今日はどのようなお手伝いができますか？注文履歴や請求の確認、アカウント設定などこちらからアクセスできますよ。`,

        billingManagement: (userName = "ゲスト") => `こちらでは請求情報の確認や請求書のダウンロードができます。お支払い期限は翌月末日となっております。何かご不明な点があれば、お気軽にお問い合わせくださいね。`,

        invoiceDetail: (userName = "ゲスト") => `請求書の詳細情報です。ご不明な点がございましたら、お気軽にお問い合わせください。請求書はPDFでダウンロードして保存することもできますよ。`
    }
};

/**
 * AIメッセージを表示する関数
 * @param {string} pageKey - ページの種類のキー
 * @param {string} messageKey - メッセージのキー
 * @param {any} params - メッセージに渡すパラメータ（オプション）
 * @param {string} targetElementSelector - メッセージを表示する要素のセレクタ
 */
function displayAiMessage(pageKey, messageKey, params = null, targetElementSelector = '#ai-message-area') {
    let message = '';
    try {
        // ダイアログエントリを取得
        let dialogueEntry = aiDialogue[pageKey]?.[messageKey];
        
        // 関数の場合は実行、文字列の場合はそのまま使用
        if (typeof dialogueEntry === 'function') {
            message = dialogueEntry(...(Array.isArray(params) ? params : (params !== null ? [params] : [])));
        } else if (typeof dialogueEntry === 'string') {
            message = dialogueEntry;
        } else {
            throw new Error("Dialogue not found or not a function/string");
        }
    } catch (e) {
        console.error("AI Dialogue error:", e.message, "for:", pageKey, messageKey);
        message = "Sommiaです。何かお困りですか？"; // デフォルトメッセージ
    }
    
    // メッセージを表示
    const targetElement = document.querySelector(targetElementSelector);
    if (targetElement) {
        // 現在のパスに基づいてアバター画像のパスを設定
        const avatarPath = getAvatarPath();
        
        // アバターコンテナとメッセージを表示
        targetElement.innerHTML = `
            <div class="ai-avatar-container">
                <img src="${avatarPath}" alt="Sommia - ソムリエAI" class="ai-avatar-small">
                <span class="ai-name">Sommia</span>
            </div>
            <span class="ai-text">${message}</span>
        `;
    }
}

/**
 * AIのチャットメッセージを表示する関数
 * @param {string} pageKey - ページの種類のキー
 * @param {string} messageKey - メッセージのキー
 * @param {any} params - メッセージに渡すパラメータ（オプション）
 * @param {string} containerSelector - チャットコンテナのセレクタ
 * @param {boolean} isUser - ユーザーメッセージかどうか
 */
function addChatMessage(pageKey, messageKey, params = null, containerSelector = '.ai-chat-body', isUser = false) {
    // ユーザーメッセージの場合は直接表示
    if (isUser) {
        const container = document.querySelector(containerSelector);
        if (container) {
            const messageHTML = `
                <div class="ai-message-block text-right">
                    <div class="user-chat-bubble">
                        ${params}
                    </div>
                </div>
            `;
            container.innerHTML += messageHTML;
        }
        return;
    }
    
    // AIメッセージの場合はaiDialogueから取得
    let message = '';
    try {
        let dialogueEntry = aiDialogue[pageKey]?.[messageKey];
        if (typeof dialogueEntry === 'function') {
            message = dialogueEntry(...(Array.isArray(params) ? params : (params !== null ? [params] : [])));
        } else if (typeof dialogueEntry === 'string') {
            message = dialogueEntry;
        } else {
            throw new Error("Dialogue not found");
        }
    } catch (e) {
        console.error("AI Chat Dialogue error:", e.message);
        message = "Sommiaです。何かお困りですか？";
    }
    
    // メッセージを表示
    const container = document.querySelector(containerSelector);
    if (container) {
        const avatarPath = getAvatarPath();
        const messageHTML = `
            <div class="ai-message-block">
                <div class="ai-chat-bubble">
                    <img src="${avatarPath}" alt="Sommia" class="ai-avatar-chat">
                    ${message}
                </div>
            </div>
        `;
        container.innerHTML += messageHTML;
    }
}

/**
 * AIの「考え中」表示を追加する関数
 * @param {string} containerSelector - チャットコンテナのセレクタ
 * @return {string} 追加された要素のID
 */
function addAiThinking(containerSelector = '.ai-chat-body') {
    const container = document.querySelector(containerSelector);
    if (container) {
        const thinkingId = 'ai-thinking-' + Date.now();
        const thinkingHTML = `
            <div id="${thinkingId}" class="ai-thinking">
                Sommiaが考え中
                <div class="dots">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            </div>
        `;
        container.innerHTML += thinkingHTML;
        return thinkingId;
    }
    return null;
}

/**
 * AIの「考え中」表示を削除する関数
 * @param {string} thinkingId - 削除する要素のID
 */
function removeAiThinking(thinkingId) {
    const thinkingElement = document.getElementById(thinkingId);
    if (thinkingElement) {
        thinkingElement.remove();
    }
}

/**
 * 現在のページパスに基づいてAIアバター画像のパスを取得する関数
 * @return {string} アバター画像へのパス
 */
function getAvatarPath() {
    // 現在のパスがhtml/内かどうかをチェック
    const currentPath = window.location.pathname;
    
    if (currentPath.includes('/html/')) {
        // サブディレクトリの深さに基づいてパスを調整
        const parts = currentPath.split('/');
        const depth = parts.length - (currentPath.endsWith('/') ? 1 : 0);
        
        if (depth > 2) { // html/subdir/page.html の場合
            return '../'.repeat(depth - 2) + '../sommia.png';
        } else {
            return '../../sommia.png';
        }
    }
    
    // ルートディレクトリの場合
    return 'sommia.png';
}

/**
 * AIの提案チップを表示する関数
 * @param {Array} suggestions - 提案テキストの配列
 * @param {string} containerSelector - 提案を表示するコンテナのセレクタ
 * @param {Function} callback - チップクリック時のコールバック関数
 */
function displayAiSuggestions(suggestions, containerSelector = '.ai-suggestion-chips', callback = null) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    
    // コンテナをクリア
    container.innerHTML = '';
    
    // 提案チップを追加
    suggestions.forEach((suggestion, index) => {
        const chip = document.createElement('div');
        chip.className = 'ai-suggestion-chip';
        chip.textContent = suggestion;
        chip.dataset.index = index;
        
        // クリックイベントの追加
        if (callback) {
            chip.addEventListener('click', () => {
                callback(suggestion, index);
            });
        }
        
        container.appendChild(chip);
    });
}

/**
 * AI提案プロンプトボックスを表示する関数
 * @param {string} title - プロンプトのタイトル
 * @param {string} content - プロンプトの内容
 * @param {string} containerSelector - プロンプトを表示するコンテナのセレクタ
 */
function displayAiPromptBox(title, content, containerSelector = '.ai-prompt-container') {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    
    const avatarPath = getAvatarPath();
    const promptHTML = `
        <div class="ai-prompt-box">
            <div class="ai-prompt-title">
                <img src="${avatarPath}" alt="Sommia" class="ai-avatar-inline">
                ${title}
            </div>
            <div class="ai-prompt-content">
                ${content}
            </div>
        </div>
    `;
    
    container.innerHTML = promptHTML;
}

/**
 * ページ読み込み時に実行
 */
document.addEventListener('DOMContentLoaded', function() {
    // チャット入力フォームの初期化
    initializeChatInput();
});

/**
 * チャット入力フォームの初期化
 */
function initializeChatInput() {
    const chatForm = document.querySelector('.ai-chat-form');
    if (!chatForm) return;
    
    chatForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const inputField = this.querySelector('.ai-chat-input');
        if (!inputField) return;
        
        const userMessage = inputField.value.trim();
        if (userMessage === '') return;
        
        // ユーザーメッセージを表示
        addChatMessage(null, null, userMessage, '.ai-chat-body', true);
        
        // 入力フィールドをクリア
        inputField.value = '';
        
        // AIの「考え中」表示を追加
        const thinkingId = addAiThinking();
        
        // AIの応答を遅延表示（リアルなチャット体験のため）
        setTimeout(() => {
            // 「考え中」表示を削除
            removeAiThinking(thinkingId);
            
            // AIの応答を表示（ページとコンテキストに基づいて適切なメッセージを選択）
            const currentPath = window.location.pathname;
            let pageKey = 'dashboard';
            let messageKey = 'greeting';
            
            if (currentPath.includes('/products/')) {
                pageKey = 'products';
                messageKey = 'searchPrompt';
            } else if (currentPath.includes('/my_cellar/')) {
                pageKey = 'myCellar';
                messageKey = 'recommendations';
            } else if (currentPath.includes('/orders/')) {
                pageKey = 'orders';
                messageKey = 'orderRecommendation';
            } else if (currentPath.includes('/reports/')) {
                pageKey = 'reports';
                messageKey = 'insight';
            }
            
            addChatMessage(pageKey, messageKey);
            
            // 必要に応じて提案チップを表示
            if (userMessage.toLowerCase().includes('おすすめ') || userMessage.toLowerCase().includes('提案')) {
                displayAiSuggestions([
                    'ワインと料理のペアリング',
                    '季節のおすすめワイン',
                    '売れ筋ワインの傾向',
                    'ワインリストの最適化'
                ], '.ai-suggestion-chips', (suggestion) => {
                    console.log('Selected suggestion:', suggestion);
                    // 選択された提案に基づいて追加のアクションを実行
                });
            }
        }, 1500);
    });
}