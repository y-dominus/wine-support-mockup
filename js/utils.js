/**
 * ユーティリティ関数群
 */

/**
 * DOM要素を取得する関数
 * @param {string} selector - CSSセレクタ
 * @param {Element} parent - 親要素（デフォルトはdocument）
 * @return {Element} 要素
 */
function qs(selector, parent = document) {
    return parent.querySelector(selector);
}

/**
 * 複数のDOM要素を取得する関数
 * @param {string} selector - CSSセレクタ
 * @param {Element} parent - 親要素（デフォルトはdocument）
 * @return {NodeList} 要素リスト
 */
function qsa(selector, parent = document) {
    return parent.querySelectorAll(selector);
}

/**
 * イベントリスナーを追加する関数
 * @param {string} selector - CSSセレクタ
 * @param {string} event - イベント名
 * @param {Function} handler - ハンドラ関数
 * @param {Element} parent - 親要素（デフォルトはdocument）
 */
function on(selector, event, handler, parent = document) {
    const elements = qsa(selector, parent);
    elements.forEach(element => {
        element.addEventListener(event, handler);
    });
}

/**
 * 要素を作成する関数
 * @param {string} tag - HTMLタグ名
 * @param {Object} attributes - 属性オブジェクト
 * @param {string|Element} content - 内容（文字列または要素）
 * @return {Element} 作成された要素
 */
function createElement(tag, attributes = {}, content = '') {
    const element = document.createElement(tag);
    
    // 属性の設定
    Object.entries(attributes).forEach(([key, value]) => {
        if (key === 'class') {
            value.split(' ').forEach(cls => {
                if (cls) element.classList.add(cls);
            });
        } else {
            element.setAttribute(key, value);
        }
    });
    
    // 内容の設定
    if (content) {
        if (typeof content === 'string') {
            element.innerHTML = content;
        } else {
            element.appendChild(content);
        }
    }
    
    return element;
}

/**
 * 要素を親要素に追加する関数
 * @param {Element} parent - 親要素
 * @param {...Element} children - 子要素
 */
function appendTo(parent, ...children) {
    children.forEach(child => {
        parent.appendChild(child);
    });
}

/**
 * ローカルストレージからデータを取得する関数
 * @param {string} key - キー
 * @param {any} defaultValue - デフォルト値
 * @return {any} 取得したデータ
 */
function getLocalData(key, defaultValue = null) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
        console.error('Local storage error:', e);
        return defaultValue;
    }
}

/**
 * ローカルストレージにデータを保存する関数
 * @param {string} key - キー
 * @param {any} value - 値
 * @return {boolean} 成功したかどうか
 */
function setLocalData(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (e) {
        console.error('Local storage error:', e);
        return false;
    }
}

/**
 * URLパラメータを解析する関数
 * @return {Object} パラメータオブジェクト
 */
function getUrlParams() {
    const params = {};
    const queryString = window.location.search.substring(1);
    const pairs = queryString.split('&');
    
    pairs.forEach(pair => {
        if (pair === '') return;
        const [key, value] = pair.split('=');
        params[decodeURIComponent(key)] = decodeURIComponent(value || '');
    });
    
    return params;
}

/**
 * URLパラメータを構築する関数
 * @param {Object} params - パラメータオブジェクト
 * @return {string} URLパラメータ文字列
 */
function buildUrlParams(params) {
    return Object.entries(params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
}

/**
 * デバウンス関数（短時間に何度も実行されないようにする）
 * @param {Function} func - 実行する関数
 * @param {number} wait - 待機時間（ミリ秒）
 * @return {Function} デバウンスされた関数
 */
function debounce(func, wait = 300) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(this, args);
        }, wait);
    };
}

/**
 * スロットル関数（一定時間に1回だけ実行する）
 * @param {Function} func - 実行する関数
 * @param {number} limit - 間隔（ミリ秒）
 * @return {Function} スロットルされた関数
 */
function throttle(func, limit = 300) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => {
                inThrottle = false;
            }, limit);
        }
    };
}

/**
 * 日付をフォーマットする関数
 * @param {Date} date - 日付
 * @param {string} format - フォーマット（例: 'YYYY-MM-DD'）
 * @return {string} フォーマットされた日付
 */
function formatDate(date, format = 'YYYY-MM-DD') {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return format
        .replace('YYYY', year)
        .replace('MM', month)
        .replace('DD', day)
        .replace('HH', hours)
        .replace('mm', minutes)
        .replace('ss', seconds);
}

/**
 * 数値を通貨形式にフォーマットする関数
 * @param {number} value - 数値
 * @param {string} locale - ロケール（例: 'ja-JP'）
 * @param {string} currency - 通貨コード（例: 'JPY'）
 * @return {string} フォーマットされた通貨
 */
function formatCurrency(value, locale = 'ja-JP', currency = 'JPY') {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency
    }).format(value);
}

/**
 * テキストを省略する関数
 * @param {string} text - テキスト
 * @param {number} maxLength - 最大長
 * @param {string} suffix - 省略記号
 * @return {string} 省略されたテキスト
 */
function truncateText(text, maxLength = 100, suffix = '...') {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - suffix.length) + suffix;
}

/**
 * ランダムなIDを生成する関数
 * @param {number} length - 長さ
 * @return {string} ランダムID
 */
function generateRandomId(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

/**
 * 要素をフェードインさせる関数
 * @param {Element} element - 対象要素
 * @param {number} duration - アニメーション時間（ミリ秒）
 * @param {Function} callback - コールバック関数
 */
function fadeIn(element, duration = 300, callback = null) {
    element.style.opacity = 0;
    element.style.display = 'block';
    
    let start = null;
    function animate(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const opacity = Math.min(progress / duration, 1);
        element.style.opacity = opacity;
        
        if (progress < duration) {
            window.requestAnimationFrame(animate);
        } else {
            if (callback) callback();
        }
    }
    
    window.requestAnimationFrame(animate);
}

/**
 * 要素をフェードアウトさせる関数
 * @param {Element} element - 対象要素
 * @param {number} duration - アニメーション時間（ミリ秒）
 * @param {Function} callback - コールバック関数
 */
function fadeOut(element, duration = 300, callback = null) {
    let start = null;
    function animate(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const opacity = Math.max(1 - (progress / duration), 0);
        element.style.opacity = opacity;
        
        if (progress < duration) {
            window.requestAnimationFrame(animate);
        } else {
            element.style.display = 'none';
            if (callback) callback();
        }
    }
    
    window.requestAnimationFrame(animate);
}